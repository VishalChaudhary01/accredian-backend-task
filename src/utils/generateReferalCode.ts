import { v4 as uuidv4 } from 'uuid';

export function generateReferralCode(username: string) {
    if (username.length < 3) {
        throw new Error("Username must have at least 3 characters");
    }
    const usernamePrefix = username.substring(0, 3).toUpperCase();
    const uniqueId = uuidv4().replace(/-/g, '').substring(0, 6);
    const referralCode = `${usernamePrefix}REFER${uniqueId}`;
    return referralCode;
}