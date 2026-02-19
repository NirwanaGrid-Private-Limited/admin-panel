const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');

const uri = "mongodb+srv://iamshanipandey:cqOZe2ZvXZs0rkg5@cluster0.b1td6.mongodb.net/nirwanagridadminpanel";

mongoose.connect(uri)
  .then(() => console.log("Connected!"))
  .catch(err => console.log("Error:", err));