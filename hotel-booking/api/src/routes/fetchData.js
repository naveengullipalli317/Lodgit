var sqlite3 = require('sqlite3').verbose()
const path = require('path');
const mongoose = require('mongoose');
const DBSOURCE = path.join(__dirname, '../../db.sqlite');
class Test { 
   async getBookingRecord(bookingID) {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database(DBSOURCE, (err) => {
                if (err) {
                    // Cannot open database
                    console.error(err.message)
                    throw err
                } else {
                    console.log('Connected to the SQLite database.')
                    var query = 'SELECT BU_DAUER,guestNamesForScheduleMap from b_buchungen where BU_DAUER = ?';
                    db.get(query,[bookingID],(err, row) => {
                        if (err) {
                            reject(err);
                        }
                        console.log('row', row);
                        resolve(row);
                    });
                }
            }
            );
        })

    }
}




module.exports = new Test();