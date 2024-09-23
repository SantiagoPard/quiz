import { Component , OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AppStorageService } from './services/app-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{
  constructor(private appStorage: AppStorageService ) {}

    ngOnInit(): void {
      this.appStorage.init();
    
  }
}
