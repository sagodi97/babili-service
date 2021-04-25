import Validator from 'validatorjs';
import UnauthorizedError from '../utils/errors/unauthorized.error';

const LoginSchema = {
  email: 'required|email',
  password: 'required|string',
};

export default (data) => {
  const validator = new Validator(data, LoginSchema);
  const isValid = validator.passes();
  const errorsObject = validator.errors.all();
  const errors = Object.values(errorsObject).flat();
  if (!isValid) {
    throw new UnauthorizedError(errors.join(' '));
  }
  return true;
};
