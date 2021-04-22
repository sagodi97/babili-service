import BaseCustomError from './baseCustom.error';

class BadRequestError extends BaseCustomError {
  constructor(payload) {
    super(payload);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}
export default BadRequestError;
