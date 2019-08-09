import users from '../models/users';

export default class {
  static uniqueID(arr) {
    return arr.length + 1;
  }

  static uniquEmail(email) {
    return !(users.find( user => {
      if (user && user.email == email) return true;
    }));
  }
}