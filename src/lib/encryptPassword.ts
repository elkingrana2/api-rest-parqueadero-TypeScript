/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

export const validatePassword = async (
  password1: string,
  password: string
): Promise<boolean> => {
  return await bcrypt.compare(password1, password);
};
