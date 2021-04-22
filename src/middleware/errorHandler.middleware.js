/* eslint-disable no-unused-vars */
export default (err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({ message });
};
