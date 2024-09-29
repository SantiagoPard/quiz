import { Component , OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonContent, IonButtons, IonTitle, IonToolbar,IonMenu,IonMenuButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { AppStorageService } from './services/app-storage.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './componen/menu/menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonLabel, MenuComponent,IonItem, IonList, IonToolbar,CommonModule, RouterModule, IonTitle, IonButtons, IonContent, IonHeader, IonApp, IonRouterOutlet,IonMenu,IonMenuButton],
})
export class AppComponent implements OnInit{
  mats: any[] = [];
  constructor(private appStorage: AppStorageService ) {
    
  }
    ngOnInit(): void {
      this.appStorage.init();
  }


  
}
