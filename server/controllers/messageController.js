const render = (filename) => fs.readFileSync(__dirname + filename);

class messageController {
  // Get all messages
  static getAll(req, res) {}
  
  // Get a single message
  static getUnique(req, res) {}

  // Ask a question or comment on a message
  static sendToAll(req, res) {}

  // Direct message
  static directSend(req, res) {}
}

export default messageController;
