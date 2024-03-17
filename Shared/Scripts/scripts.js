const errorSend = (res,statusCode, errorData) => {
  console.error(errorData);
  res.status(statusCode).json({ error:errorData });
};

module.exports = {
    errorSend
}