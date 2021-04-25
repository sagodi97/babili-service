import BaseCustomError from './baseCustom.error';

class UnauthorizedError extends BaseCustomError {
  constructor(payload) {
    super(payload);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}
export default UnauthorizedError;
