const BookingModel = require('../Model/Booking.model');

class MongoOperations {
     async saveBookingData(dataObject) {
        console.log('controller data:', dataObject);
        try {
             const bookingData = await new BookingModel({
                Name: dataObject.guestNamesForScheduleMap,
                BookingID: dataObject.BU_DAUER
            });
             await bookingData.save();
             return bookingData;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new MongoOperations();