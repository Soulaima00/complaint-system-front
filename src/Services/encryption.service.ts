import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private secretKey: string = 'votre_clé_secrète'; // Remplacez par votre clé secrète

  constructor() { }

  // Fonction pour chiffrer les données
  encryptData(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, this.secretKey).toString();
    return encrypted;
  }

  // Fonction pour déchiffrer les données
  decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
}
