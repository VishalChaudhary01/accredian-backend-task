import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { referralValidator } from '../validators/referral.validator';
import { ZodError } from 'zod';
import { sendReferralEmail } from '../services/email.service';
const prisma = new PrismaClient();

export const submitReferral = async (req: Request, res: Response) => {
  try {
    const data = referralValidator.parse(req.body);
    const { name, email, phone, referralCode } = data;
    const isAlreadyRegister = await prisma.referral.findFirst({ where: { email } });
    if (isAlreadyRegister) {
     res.status(400).json({ success: false, message: "Email is already register" });
     return;
    }
    const referral = await prisma.referral.create({
      data: { name, email, phone, referralCode },
    });
    // send email to the user
//     await sendReferralEmail(email, name, referralCode);
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