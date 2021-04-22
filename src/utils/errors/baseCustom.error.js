class BaseCustomError extends Error {
  constructor(errorOrMessage) {
    if (typeof errorOrMessage === 'string') {
      super(errorOrMessage);
    } else {
      super(errorOrMessage.message);
    }
  }
}
export default BaseCustomError;
