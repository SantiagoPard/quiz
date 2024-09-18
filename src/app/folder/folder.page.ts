import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormsModule,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonTitle, 
  IonContent,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonModal,
  IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonMenuButton, 
    IonTitle, 
    IonContent,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonModal,
    IonInput,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  showAlertError: boolean = false;

  loginForm: FormGroup = new FormGroup({
    nombreMateria: new FormControl('', [Validators.required]),
    semestre: new FormControl(0, [Validators.required,Validators.min(1),Validators.max(10)]),
    codigoMateria: new FormControl('', [Validators.required]),
    horarioMateria: new FormControl('', [Validators.required]),
    observacionesMateria: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    
  });

  constructor(private router: Router) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  onLoginBtn(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.get('user')?.value;
      const pwd = this.loginForm.get('pwd')?.value;
      if (user === 'admin' && pwd === '12345') {
        // this.AppStorage.set<String>('sesion', 'Activo');
        // this.AppStorage.set<String>('username', 'Administrador');
        this.router.navigate(['/home']);
      } else {
        this.showAlertError = true;
      }
    }
  }
  
}
