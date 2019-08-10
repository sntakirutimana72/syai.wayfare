import users from '../models/users';

export default class {
  static uniqueID(arr) {
    return arr.length + 1;
  }

  static uniquEmail(email) {
    return !(users.find( user => {
      return user ? (user.email == email) : null;
    }));
  }
}
