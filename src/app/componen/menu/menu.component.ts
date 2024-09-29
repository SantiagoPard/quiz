import { Component, OnInit, OnDestroy,ViewChild} from '@angular/core';
import { IonContent, IonTitle, IonToolbar, IonHeader, IonMenu, IonMenuButton, IonButtons, IonList, IonItem, IonLabel, IonButton } from "@ionic/angular/standalone";
import { AppStorageService } from '../../services/app-storage.service';
import { IonModal } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, RouterModule, IonButtons, IonContent, IonTitle, IonToolbar, IonHeader, IonMenu, IonMenuButton, IonList, IonItem, IonLabel],
})
export class MenuComponent implements OnInit, OnDestroy {
  mats: any[] = [];
  private updateInterval: any;

  constructor(private storage: AppStorageService) { }

  async ngOnInit() {
    await this.initializeData();
    this.updateInterval = setInterval(() => this.datos(), 5000);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }   
  private async initializeData() {
    try {
      await this.storage.init(); // Asegúrate de que el almacenamiento esté inicializado
      await this.datos();
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  }

  async datos() {
    try {
      const materias = await this.storage.get('materia');
      console.log('Materias obtenidas del almacenamiento:', materias);
      this.mats = materias || [];
      console.log('this.mats después de la asignación:', this.mats);
    } catch (error) {
      console.error('Error al obtener materias:', error);
    }
  }
}
