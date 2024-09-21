const express = require("express");
const cors = require('cors');
const bodyparser = require('body-parser');
const dotEnv = require('dotenv');
dotEnv.config();
const mongoose = require('mongoose');
const vendorRouter = require('./routes/VendorRoutes');
const firmRouter = require('./routes/FirmRoutes');
const productRouter = require('./routes/ProductRoutes');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use(cors());
app.use(bodyparser.json());
app.use('/vendor', vendorRouter);
app.use('/firm', firmRouter);
app.use('/product', productRouter);

app.listen(PORT,() => {
  console.log(`Server is running at ${PORT}`);
});

app.use('/home', (req, res) => {
  res.send('Waste Fellow');
});
