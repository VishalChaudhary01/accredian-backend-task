import express from 'express';
import { submitReferral } from '../controllers/referral.controller';

const router = express.Router();

router.post('/', submitReferral);

export default router;
