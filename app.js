const express = require("express");
const app = express();

require("dotenv").config();

const connectDB = require("./config/db");

connectDB();
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/',router);
app.use("/api/spread", require("./routes/spread"));
app.use("/api/users", require("./routes/users"));

// const data = {
//     firstName: 'John',
//     secondName: 'Doe',
//     nationalIdentityNumber: 123456789,
//     voterNumber: 987654321,
//     dateOfBirth: '1990-01-01',
//     placeOfBrith: 'City',
//     votingPlace: 'Polling Station'
// };

// fetch('http://localhost:8000/api/spread', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
// })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));

module.exports = app;
