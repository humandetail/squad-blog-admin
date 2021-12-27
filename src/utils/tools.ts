import { JSEncrypt } from 'jsencrypt';
import publicKey from '@/config/publicKey';
import { LocationQuery } from 'vue-router';
import _ from 'lodash';
import { customAlphabet } from 'nanoid';

export const encryptPassword = (plain: string) => {
  const enc = new JSEncrypt();
  enc.setPublicKey(publicKey);
  return enc.encrypt(plain) || plain;
}

export const getQueryString = (query: LocationQuery, key: string): string => {
  const item = query[key];
  if (!item) {
    return '';
  }

  if (_.isArray(item)) {
    return item.pop()!;
  }

  return item;
}

export const getNanoId = (size = 20, alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string => {
  const nanoid = customAlphabet(alphabet, size);
  return nanoid();
}
