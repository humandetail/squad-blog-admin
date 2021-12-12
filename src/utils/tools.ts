import { JSEncrypt } from 'jsencrypt';
import publicKey from '@/config/publicKey';

export const encryptPassword = (plain: string) => {
  const enc = new JSEncrypt();
  enc.setPublicKey(publicKey);
  return enc.encrypt(plain);
}
