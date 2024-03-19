const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const List = require('./List');

const emailRegex = [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Must match an email address!'];

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegex,
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  lists: [List.schema]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// highlight entire code snippet and "cntrl+?" to uncomment what needs to be uncommented. commented out for temporary testing and setup

// // email verification email (comment out if issues pop up. may need to be adjusted as we continue.)
//   // nodemailer transporter
// const createTransporter = (emailService, auth) => {
//   return nodemailer.createTransport({
//     service: emailService,
//     auth: auth
//   });
// };

// // send verification email
// const sendVerificationEmail = (Transporter, fromEmail, toEmail, subject, htmlContent) => {
//   // compose email message
//   const mailOptions = {
//     from: fromEmail,
//     to: toEmail,
//     subject: subject,
//     html: htmlContent
//   };

//   // send email
//   Transporter.sendMail(mailOptiions, (error, info) => {
//     if (error) {
//       console.log('Error sending verification email:', error);
//     } else {
//       console.log('Verification email sent:', info.response);
//     }
//   });
// };

//   // example usage
//   const emailServiceConfig = {
//     service: 'gmail',
//     auth: {
//       user: 'your_email@gmail.com',
//       pass: 'your_password'
//     }
//   };

// const transporter = createTransporter(emailServiceConfig.service, emailServiceConfig.auth);

// const userEmail = 'example@example.com';
// const subject = 'Verify Your Email Address';
// const verificationToken = 'random_generated_token';
// const htmlContent = `
// <p>Thank you for signing up to join our App!</p>
// <p>Please click the following l;ink to verify your email address:</P>
// <a href="http://OUR-URL-HERE/verify/${verificationToken}"> Verify Email.</a>`;


// sendVerificationEmail(transporter, emailServiceConfig.auth.user, userEmail, subject, htmlContent)

const User = mongoose.model('User', userSchema);

module.exports = User;
