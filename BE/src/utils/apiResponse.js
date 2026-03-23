function successResponse({ message = 'Success', data = null, meta = null }) {
  return {
    success: true,
    message,
    data,
    meta
  };
}

module.exports = {
  successResponse
};
