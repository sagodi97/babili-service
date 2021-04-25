/* eslint-disable no-unused-vars */
export default (err, req, res, next) => {
  const { statusCode, message } = err;

  if (statusCode === undefined) {
    return res.status(500).json({ message });
  }

  if (statusCode === 404) {
    return res.status(statusCode).end();
  }

  return res.status(statusCode).json({ message });
};
