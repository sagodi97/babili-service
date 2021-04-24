import Validator from 'validatorjs';
import UnprocessableEntityError from '../utils/errors/unprocessableEntity.error';

const UserSchema = {
  name: 'required|string',
  email: 'required|email',
  username: 'required|string',
  password: 'required|string',
};

export default (data) => {
  const validator = new Validator(data, UserSchema);
  const isValid = validator.passes();
  const errorsObject = validator.errors.all();
  const errors = Object.values(errorsObject).flat();
  if (!isValid) {
    throw new UnprocessableEntityError(errors.join(' '));
  }
  return true;
};
