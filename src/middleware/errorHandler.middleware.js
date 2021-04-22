/* eslint-disable no-unused-vars */
export default (err, req, res, next) => {
  const { statusCode, message } = err;
  if (statusCode === 404) {
    res.status(statusCode).end();
  } else {
    res.status(statusCode).json({ message });
  }
};
