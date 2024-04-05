import bcryptjs from 'bcryptjs';

export const hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
}

export const comparePassword = async (password, hashedPassword) => {
    const checkPassword = await bcryptjs.compare(password, hashedPassword);
    if (checkPassword) return checkPassword;
    return false;
}