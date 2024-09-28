import { arrowForwardOutline, alertCircleOutline, trashOutline } from 'ionicons/icons';
import { Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormGroup, FormsModule, Validators, FormControl } from '@angular/forms';
import { AppStorageService } from '../services/app-storage.service';
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
  IonCol, 
  IonButton,
  IonModal, 
  IonInput, 
  IonTextarea,
  
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonTextarea, 
    IonInput, 
    IonButton, 
    IonCol, 
    IonNote, 
    IonLabel, 
    IonList, 
    IonGrid, 
    IonIcon, 
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
    IonModal,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
  ]
})
export class HomePage implements OnInit {

  constructor( private storage: AppStorageService) { 
    addIcons({arrowForwardOutline,trashOutline,alertCircleOutline});
  }
  
  mats:any = []

  ngOnInit() {
    this.datos()  
  }

  async datos(){
    this.mats = await this.storage.get('materia')
  }
  
  indexMat(i:number){
    this.storage.set('matActual',i)
  }

  // toggleMenu(){}
  @ViewChild(IonModal) modal!: IonModal;


  cancel() {

    this.modal.dismiss(null, 'cancel');
  console.log(this.mats)
  }

  // confirm() {
  //   this.modal.dismiss(null, 'confirm');
  // }
  
  materiaForm = new FormGroup({
    nombreMateria: new FormControl('',[Validators.required]),
    semestreMat: new FormControl('',[Validators.required]),
    codigoMateria: new FormControl('',[Validators.required]),
    horarioMateria: new FormControl('',[Validators.required]),
    observacionesMateria: new FormControl('',[Validators.required])
  })
  


  crear(){
    const nombreMateria = this.materiaForm.get('nombreMateria')?.value;
    const semestreMat = this.materiaForm.get('semestreMat')?.value;
    console.log(semestreMat)
    const codigoMateria = this.materiaForm.get('codigoMateria')?.value;
    const horarioMateria = this.materiaForm.get('horarioMateria')?.value;
    const observacionesMateria = this.materiaForm.get('observacionesMateria')?.value;

    if (this.mats == null){
      console.log(semestreMat)
      const materia = [{
        'nombreMateria': nombreMateria, 
        'semestreMat': semestreMat, 
        'codigoMateria': codigoMateria,
        'horarioMateria':horarioMateria,
        'observacionesMateria':observacionesMateria,
        'notaFinal': 0}
      ];
      
       this.storage.set('materia',materia)
       location.reload();
       console.log(this.storage.get('materia'))
      
    }else {
      this.mats.push({
        'nombreMateria': nombreMateria, 
        'semestreMat': semestreMat, 
        'codigoMateria': codigoMateria,
        'horarioMateria':horarioMateria,
        'observacionesMateria':observacionesMateria,
        'notaFinal': 0})

       this.storage.set('materia',this.mats)
      console.log(this.storage.get('materia'))

    }
    
    this.modal.dismiss(null, 'confirm');
  }

}
