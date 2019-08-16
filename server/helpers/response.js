export default class {
  /**
    * @param {Response} res Mechanism to carry response to the other end
    * @param {Number} statusCode State code for the operation carried out
    * @param {{Object}} data Information to be sent with response
    * @param {Boolean} error Boolean to inform that an error has occurred during processing
  */
  static response(res, statusCode, data, error=false) {
    if (error) {
      return res.status(statusCode).json({
        status: statusCode, error: data
      });
    }
    return res.status(statusCode).json({
      status: statusCode, data: data
    });
  }
}
