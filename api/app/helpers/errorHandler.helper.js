module.exports = function (error, request, response, next) {
  console.log('HUBO UN ERROR')
  console.error(error.stack)
  next(error)
}