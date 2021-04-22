const express = require("express");
const path = require('path');
const router = express.Router();
const QRCode = require('qrcode');
const Test = require('./fetchData.js');
const fs = require('fs');
const MongoSave = require('../Controllers/Booking.Controller');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const BookingModel = require('../Model/Booking.model');

const auth = {
    auth: {
        api_key: process.env.API_KEY || 'mailgun_api_key', // TODO: 
        domain: process.env.DOMAIN || 'mailgun_domain' // TODO:
    }
};

const generateQR = async (email, bookingID, userName) => {
    try {
      QRCode.toFile(
        `${email}-qr-image.png`,
        [{ data: [email,bookingID,userName], mode: 'byte' }],
      )
    } catch (err) {
      console.error(err)
    }
  }

router.post("/check-booking", async (req, res) => {
    try {   
      const { bookingID, userName, userEmail } = req.body;
  
      const result = await Test.getBookingRecord(bookingID);
    //  generateQR(result);
    //  await MongoSave.saveBookingData(result);
    if(!result) {
      res.status(200).json({
        message: `No Record Found with this booking Id ${bookingID}`
      })
    }
    require("fs").writeFile("out.png", generateQR(userEmail, bookingID, userName), 'base64', function(err) {
      console.log(err);
    });
      const bookingData = new BookingModel({
          Name: result.guestNamesForScheduleMap,
          BookingID: result.BU_DAUER,
          Email: userEmail,
          imagePath:path.join(__dirname, `../../${userEmail}-qr-image.png`)
      });

    // console.log('booking data:', bookingData);
    const save = await bookingData.save()
    if(save){
   
        let transporter = nodemailer.createTransport(
          {
              service: 'gmail',
              auth: {
                user: 'usmanrehmat15@gmail.com',
                pass: '41526374aa'
              }
          }
      );
  
// strip off the data: url prefix to get just the base64-encoded bytes
      // Step 3
    
      var mailOptions = {
          from: 'usmanrehmat15@gmail.com',
          to: userEmail,
          subject: 'Sending Email using Node.js',
          text: `Hi Smartherd, thank you for your nice Node.js tutorials.
                  I will donate 50$ for this course. Please send me payment options.`,
           html: `<!DOCTYPE html>
           <html lang="en">
           <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <meta http-equiv="X-UA-Compatible" content="ie=edge">
             <title>Document</title>
           </head>
           <body>
           Hi! 
           Thanks for check in, please find the attachment of QR code.
           <img src="cid:logo">
           </body>
           </html> `,
           attachments: [{
            filename: 'qr-code.png',
            path: path.join(__dirname, `../../${userEmail}-qr-image.png`),
            cid: 'qr-code' //my mistake was putting "cid:logo@cid" here! 
       }]
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    res.status(200).json({message: `Record Found! <br> Name: ${save.Name} <br> Email: ${save.Email} <br> Booking ID: ${save.BookingID}`, save}) 
    } catch (e) {
      res.status(500).send();
    }
  });

  router.post('/checkout-user', async (req, res, next) => {
      try{
        const { bookingID, userName, userEmail } = req.body;
  
        const result = await Test.getBookingRecord(bookingID);
        if(!result){
          res.status(200).json({
            success: 0,
            message: `No Record Found with this ${bookingID}`
          })
        }
        const delRecord = await BookingModel.findOneAndUpdate({
          BookingID: bookingID
        }, {
          imagePath: ''
        },{
          new: true
        });
        if(delRecord){
          res.status(200).json({
            success:1,
            message: `Record Found! You have been successfully check out with Booking ID: ${bookingID}`,
            save: delRecord
          })
        }
      } catch(err) {
        next(err);
      }
   
  })

//   module.exports = db
module.exports = router;