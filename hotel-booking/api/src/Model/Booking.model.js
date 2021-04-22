const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// user schema
const bookingSchema = new Schema({
    Name: {
        type: String,
        require: true
      },
    Email: {
        type: String,
        require: true,
        trim: true
    },
    BookingID: {
      type: String,
      require: true
    },
    imagePath : {
      type: String,
      default: ''
    }

});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;

