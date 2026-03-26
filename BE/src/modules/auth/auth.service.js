const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepository = require('./auth.repository');
const { env } = require('../../config/env');
const { AppError } = require('../../utils/appError');

function buildTokenPayload(user, roles, permissions) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    roles: roles.map((role) => role.code),
    permissions: permissions.map((permission) => permission.code)
  };
}

function buildAuthResponse(user, roles, permissions) {
  const payload = buildTokenPayload(user, roles, permissions);
  const accessToken = jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

  return {
    accessToken,
    tokenType: 'Bearer',
    expiresIn: env.jwtExpiresIn,
    user: payload
  };
}

async function register({ username, email, password }) {
  if (!username || !email || !password) {
    throw new AppError('Tên đăng nhập, email và mật khẩu là bắt buộc', 400);
  }

  if (String(password).length < 6) {
    throw new AppError('Mật khẩu phải có ít nhất 6 ký tự', 400);
  }

  const normalizedUsername = String(username).trim();
  const normalizedEmail = String(email).trim().toLowerCase();

  if (!normalizedUsername || !normalizedEmail) {
    throw new AppError('Tên đăng nhập và email không hợp lệ', 400);
  }

  const [existingUserByUsername, existingUserByEmail] = await Promise.all([
    authRepository.findUserByUsername(normalizedUsername),
    authRepository.findUserByEmail(normalizedEmail)
  ]);

  if (existingUserByUsername) {
    throw new AppError('Tên đăng nhập đã tồn tại', 409);
  }

  if (existingUserByEmail) {
    throw new AppError('Email đã được sử dụng', 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await authRepository.createUser({
    username: normalizedUsername,
    email: normalizedEmail,
    passwordHash,
    fullName: normalizedUsername
  });

  const roles = await authRepository.findRolesByUserId(user.id);
  const permissions = await authRepository.findPermissionsByUserId(user.id);

  return buildAuthResponse(user, roles, permissions);
}

async function login({ username, password }) {
  if (!username || !password) {
    throw new AppError('Tên đăng nhập và mật khẩu là bắt buộc', 400);
  }

  const user = await authRepository.findUserByUsername(String(username).trim());

  if (!user) {
    throw new AppError('Sai tên đăng nhập hoặc mật khẩu', 401);
  }

  if (user.status !== 'HOAT_DONG') {
    throw new AppError('Tài khoản không hoạt động', 403);
  }

  const isMatched = await bcrypt.compare(password, user.passwordHash);

  if (!isMatched) {
    throw new AppError('Sai tên đăng nhập hoặc mật khẩu', 401);
  }

  const [roles, permissions] = await Promise.all([
    authRepository.findRolesByUserId(user.id),
    authRepository.findPermissionsByUserId(user.id)
  ]);

  await authRepository.updateLastLogin(user.id);

  return buildAuthResponse(user, roles, permissions);
}

async function getMe(user) {
  return user;
}

async function changePassword(userId, { currentPassword, newPassword }) {
  if (!currentPassword || !newPassword) {
    throw new AppError('Mật khẩu hiện tại và mật khẩu mới là bắt buộc', 400);
  }

  if (String(newPassword).length < 6) {
    throw new AppError('Mật khẩu mới phải có ít nhất 6 ký tự', 400);
  }

  const user = await authRepository.findUserById(userId);
  if (!user) {
    throw new AppError('Không tìm thấy người dùng', 404);
  }

  const isMatched = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isMatched) {
    throw new AppError('Mật khẩu hiện tại không đúng', 401);
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10);
  await authRepository.updatePassword(userId, newPasswordHash);

  return { success: true };
}

module.exports = {
  register,
  login,
  getMe,
  changePassword
};
