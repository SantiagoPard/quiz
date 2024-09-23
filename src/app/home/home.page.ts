import { arrowForwardOutline } from 'ionicons/icons';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonSearchbar, 
  IonButtons, 
  IonMenu, 
  IonMenuButton, 
  IonIcon, 
  IonGrid, 
  IonRow, 
  IonItem, 
  IonList, 
  IonLabel, 
  IonNote, 
  IonCol, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonCol, IonNote, IonLabel, IonList, IonGrid, IonIcon, 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonSearchbar,
    IonMenu,
    IonMenuButton,
    IonGrid,
    IonRow,
    IonItem,
  ]
})
export class HomePage implements OnInit {

  constructor() { 
    addIcons({arrowForwardOutline})
  }

  ngOnInit() {
  }

  // toggleMenu(){}

}
