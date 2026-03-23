function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    errors: err.errors || null
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
