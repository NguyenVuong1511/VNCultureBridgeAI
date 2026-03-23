const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { AppError } = require('../utils/appError');

function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AppError('Bạn chưa đăng nhập', 401);
    }

    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, env.jwtSecret);

    req.user = payload;
    next();
  } catch (error) {
    next(error.statusCode ? error : new AppError('Token không hợp lệ hoặc đã hết hạn', 401));
  }
}

function authorize(requiredPermissions = []) {
  return (req, res, next) => {
    const permissions = req.user?.permissions || [];
    const hasPermission = requiredPermissions.every((permission) => permissions.includes(permission));

    if (!hasPermission) {
      return next(new AppError('Bạn không có quyền thực hiện chức năng này', 403));
    }

    next();
  };
}

module.exports = {
  authenticate,
  authorize
};
