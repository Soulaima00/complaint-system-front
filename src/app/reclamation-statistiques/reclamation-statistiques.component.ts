import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReclamationStatistiqueService } from 'src/Services/reclamation-statistique.service'; 
@Component({
  selector: 'app-reclamation-statistiques',
  templateUrl: './reclamation-statistiques.component.html',
  styleUrls: ['./reclamation-statistiques.component.css']
})
export class ReclamationStatistiquesComponent implements OnInit {
  barChart: any;
  lineChart: any;
  barChartLabels: string[] = [];
  barChartData: any[] = [{ data: [], label: 'Réclamations par Situation' }];
  lineChartLabels: string[] = [];
  lineChartData: any[] = [{ data: [], label: 'Réclamations par Mois' }];
  pieChartLabels: any[]=[];
  pieChartData: any[]=[];
  pieChart: any;

  constructor(private reclamationStatistiqueService: ReclamationStatistiqueService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.loadStatistiques();
  }

  loadStatistiques(): void {
    this.getStatistiquesParSituation();
    this.getStatistiquesParMois();
 this.   getStatistiquesParCreator();
 this.getSousReclamationsStatistiques();
  }
  getSousReclamationsStatistiques(): void {
    this.reclamationStatistiqueService.getSousReclamationsStatistiques().subscribe(data => {
      this.pieChartLabels = data.map(stat => stat[0]); // Libellé des sous-réclamations
      this.pieChartData = data.map(stat => stat[1]);  // Occurrences des sous-réclamations
      this.renderPieChart();
    });
  }

  renderPieChart(): void {
    Chart.register(...registerables);
    new Chart('pieChart2', {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,
        datasets: [{
          data: this.pieChartData,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED'], // Couleurs pour les segments
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ' + context.raw;
                }
                return label;
              }
            }
          }
        }
      }
    });
  }
  createPieChart(): void {
    if (this.pieChart) {
      this.pieChart.destroy(); // Détruisez le graphique précédent s'il existe
    }
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,
        datasets: [{
          data: this.pieChartData,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem: any) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    });
  }
  getStatistiquesParCreator(): void {
    this.reclamationStatistiqueService.getReclamationsByCreator().subscribe(data => {
      this.pieChartLabels = data.map((stat: any[]) => stat[0]); // Les créateurs
      this.pieChartData = data.map((stat: any[]) => stat[1]); // Comptes de réclamations

      // Créez ou mettez à jour le graphique à secteurs
      this.createPieChart();
    });
  }
  
  getStatistiquesParSituation(): void {
    this.reclamationStatistiqueService.getReclamationsBySituation().subscribe(data => {
      this.barChartLabels = data.map((stat: any[]) => {
        // Condition pour afficher le texte basé sur la valeur de stat[0]
        return stat[0] === 0 ? 'Situation non clôturée' : 'Situation clôturée';
      });
      this.barChartData[0].data = data.map((stat: any[]) => stat[1]);
  
      // Créez ou mettez à jour le graphique à barres
      this.createBarChart();
    });
  }
  

  getStatistiquesParMois(): void {
    this.reclamationStatistiqueService.getReclamationsByMonth().subscribe(data => {
      this.lineChartLabels = data.map((stat: any[]) => `Mois: ${stat[1]}/${stat[0]}`);
      this.lineChartData[0].data = data.map((stat: any[]) => stat[2]);

      // Créez ou mettez à jour le graphique linéaire
      this.createLineChart();
    });
  }

  createBarChart(): void {
    if (this.barChart) {
      this.barChart.destroy(); // Détruisez le graphique précédent s'il existe
    }
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.barChartLabels,
        datasets: this.barChartData
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChart(): void {
    if (this.lineChart) {
      this.lineChart.destroy(); // Détruisez le graphique précédent s'il existe
    }
    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: this.lineChartData
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}