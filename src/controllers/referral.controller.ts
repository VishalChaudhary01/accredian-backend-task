import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { referralValidator } from '../validators/referral.validator';
import { ZodError } from 'zod';
import { sendReferralEmail } from '../services/email.service';
import { generateReferralCode } from '../utils/generateReferalCode';
const prisma = new PrismaClient();

export const submitReferral = async (req: Request, res: Response) => {
  try {
    const data = referralValidator.parse(req.body);
    const { name, email } = data;
    const isAlreadyRegister = await prisma.referral.findFirst({ where: { email } });
    if (isAlreadyRegister) {
     res.status(400).json({ success: false, message: "Email is already register" });
     return;
    }
    const referralCode = generateReferralCode(name);
    const referral = await prisma.referral.create({
      data: { name, email, referralCode },
    });
    // send email to the user
    // await sendReferralEmail(email, name, referralCode);
    res.status(201).json({ success: true, message: 'Referral submitted successfully', referral });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      res.status(403).json({ success: false, message: error.issues[0].message });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};