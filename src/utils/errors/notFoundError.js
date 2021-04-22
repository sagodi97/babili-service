import BaseCustomError from './baseCustom.error';

class NotFoundError extends BaseCustomError {
  constructor(payload) {
    super(payload);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}
export default NotFoundError;
