import { Component , OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonContent, IonButtons, IonTitle, IonToolbar,IonMenu,IonMenuButton } from '@ionic/angular/standalone';
import { AppStorageService } from './services/app-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonToolbar, IonTitle, IonButtons, IonContent, IonHeader, IonApp, IonRouterOutlet,IonMenu,IonMenuButton],
})
export class AppComponent implements OnInit{
  constructor(private appStorage: AppStorageService ) {}

    ngOnInit(): void {
      this.appStorage.init();
    
  }
}
