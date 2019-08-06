const render = (filename) => fs.readFileSync(__dirname + filename);

class userController {
  // Get all client-users
  static getAllClients(req, res) {}
  
  // Get a single client-user
  static getUniqueClient(req, res) {}

  // create a user
  static addUser(req, res) {}

  // Sign in user
  static siginUser(res, req) {}

  // update user info
  static updateUser(req, res) {}

  // delete single client-user
  static removeUniqueClient(req, res) {}

  //delete all client-users
  static removeAllClients(req, res) {}
}

export default userController;
