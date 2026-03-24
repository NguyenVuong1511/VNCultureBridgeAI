const authService = require('./auth.service');
const { successResponse } = require('../../utils/apiResponse');

async function login(req, res, next) {
  try {
    const data = await authService.login({
      username: req.body.username,
      password: req.body.password
    });

    res.json(successResponse({ message: 'Đăng nhập thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getMe(req, res, next) {
  try {
    const data = await authService.getMe(req.user);
    res.json(successResponse({ message: 'Lấy thông tin người dùng thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function changePassword(req, res, next) {
  try {
    const data = await authService.changePassword(req.user.id, {
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword
    });
    res.json(successResponse({ message: 'Đổi mật khẩu thành công', data }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  getMe,
  changePassword
};
