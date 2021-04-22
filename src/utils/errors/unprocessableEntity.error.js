import BaseCustomError from './baseCustom.error';

class UnprocessableEntityError extends BaseCustomError {
  constructor(payload) {
    super(payload);
    this.name = 'UnprocessableEntityError';
    this.statusCode = 422;
  }
}
export default UnprocessableEntityError;
