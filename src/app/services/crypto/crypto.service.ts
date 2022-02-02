import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encryptData(data: string, key: string): string {
    return CryptoJS.AES.encrypt(data, key);
  }

  desencryptData(data: string, key: string): string {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  }
}
