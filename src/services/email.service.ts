import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
  const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken as string,
    },
  });

  return transporter;
};

export const sendReferralEmail = async (to: string, name: string, referralCode: string) => {
  const transporter = await createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your Referral Code',
    text: `Hi ${name}, your referral code is ${referralCode}.`,
  };

  await transporter.sendMail(mailOptions);
};