import trips from '../models/trips'
import users from '../models/users'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class bookingController {
  // get All bookings
  static async getAll(req, res) {
    return res.status(200).json({
      status: 200, data: bookings
    });
  }
  
  // Get a booking by id
  static async getUnique(req, res) {
    const { booking_id } = req.params;
    if (!booking_id) return res.status(400).json({
      status: 400, error: "Invalid request parameter"
    });
    
    const booking = bookings.find((book) => {
      return Object.keys(book)[0] === booking_id;
    });

    if (!booking) return res.status(404).json(
      {status: 404, error: "No record found"});

    return  res.status(200).json(
      {status: 200, data: [booking]
    });
  }

  // Book a seat on a trip
  static book(req, res, next) {
    let { body: boookData } = req;
    
    const id = bookings.length + 1; // Will implement a smart helper for that 
    boookData.created_on = fDate(Date());
    bookings.push({[id]: boookData});

    const ibookD = {...boookData};
    return jwt.sign({
      data: ibookD}, process.env.SECRET_KEY, (err, token) => {
        if (err) return res.status(401).json({
          status: 401, error: 'Invalid Auth token'});

        return res.status(201).json({
          status: 201, data: {
            token, data: ibookD
          }}
        );;
      }
    );
  }

  // Update single booking status and info
  static async updateBooking(req, res) {
    const { book_id } = req.params;
    const booking = bookings.find((book) => {
      return Object.keys(book)[0] === booking_id;
    });

    if (!booking) return res.status(404).json({
      status: 404, error: 'No record found'})

    const { status } = req.body;
    const id = Object.keys(booking)[0];
    booking[id].status = status

    return res.status(200).json({
      status: 200, message: 'Succeccefully updated!'
    });
  }

  // Cancel single booking
  static async deleteUnique(req, res) {
    const { book_id } = req.params;
    const booking = bookings[book_id];

    if (!booking) return res.status(404).json({
      status: 404, error: 'No record found'})

    bookings.splice(bookings.indexOf(booking), 1);
    return res.status(200).json({
      status: 200, message: 'Succeccefully deleted!'
    });
  }

  // cancel all booking
  static async deleteAll(req, res) {}
}

class tripController {
  // Get all trips
  static getAll(req, res) {}
  
  // Get a single trip
  static getUnique(req, res) {}

  // create a trip
  static addTrip(req, res) {}

  // update trip info
  static updateTrip(req, res) {}

  // delete single trip
  static deleteUnique(req, res) {}

  //delete all
  static deleteAll(req, res) {}
}

export default tripController;
