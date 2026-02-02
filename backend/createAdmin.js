// Script to create an admin user in the database
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  await mongoose.connect(MONGO_URI);
  const username = 'admin'; // Change as needed
  const password = 'admin123'; // Change as needed
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ username });
  if (existing) {
    console.log('Admin user already exists.');
    process.exit(0);
  }

  const user = new User({
    username,
    password: hashedPassword,
    role: 'admin',
    isVerified: true,
  });
  await user.save();
  console.log('Admin user created:', username);
  process.exit(0);
}

createAdmin();
