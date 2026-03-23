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

async function login({ username, password }) {
  if (!username || !password) {
    throw new AppError('Tên đăng nhập và mật khẩu là bắt buộc', 400);
  }

  const user = await authRepository.findUserByUsername(username);

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

  const payload = buildTokenPayload(user, roles, permissions);
  const accessToken = jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

  await authRepository.updateLastLogin(user.id);

  return {
    accessToken,
    tokenType: 'Bearer',
    expiresIn: env.jwtExpiresIn,
    user: payload
  };
}

async function getMe(user) {
  return user;
}

module.exports = {
  login,
  getMe
};
