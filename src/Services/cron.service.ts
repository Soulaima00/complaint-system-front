import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CronService {

  constructor() { 
    this.startCronJob();
  }

  // Fonction pour démarrer la tâche cron
  startCronJob() {
    const threeHours = 3 * 60 * 60 * 1000; // 3 heures en millisecondes

    // Vérifier et nettoyer le localStorage toutes les 3 heures
    setInterval(() => {
      this.clearLocalStorage();
    }, threeHours);
  }

  // Fonction pour vider le localStorage
  clearLocalStorage() {
    localStorage.clear();
    console.log('localStorage a été vidé');
  }
}
