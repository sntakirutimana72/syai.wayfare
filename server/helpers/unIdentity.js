import users from '../models/users';

export default class {
  /**
    * @param {Array} arr Takes an array data structure to compute an ID number
  */
  static uniqueID(arr) {
    return arr.length + 1;
  }

  /**
    * @param {String} email Takes a valid email structure-based string
  */
  static uniquEmail(email) {
    return !(users.find( user => {
      return user ? (user.email == email) : null;
    }));
  }
}
