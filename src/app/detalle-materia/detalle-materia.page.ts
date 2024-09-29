import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormsModule, Validators, FormControl } from '@angular/forms';
import { AppStorageService } from '../services/app-storage.service';
import { arrowForwardOutline, alertCircleOutline, trashOutline, createOutline } from 'ionicons/icons';
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
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
  IonList,
  IonIcon,
  IonModal,
  IonInput,
  IonText,
  IonTextarea
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-detalle-materia',
  templateUrl: './detalle-materia.page.html',
  styleUrls: ['./detalle-materia.page.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonText,
    IonInput,
    IonModal,
    IonIcon,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonLabel,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    IonButtons,
    IonSearchbar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    IonMenu,
    ReactiveFormsModule,
    IonMenuButton]

})
export class DetalleMateriaPage implements OnInit {

  id: number = 0;
  materia: any = [];
  notasPve: any =[];
  notasSve:any = [];
  notasTve: any =[];
  notasCu: any =[];


  promedioPve:number = 0;
  promedioSve:number = 0;
  promedioTve:number = 0;
  promedioCu:number = 0;

  promedioTotal:number = 0;


  
  
  porcientoNota: number = 0;
  constructor(private storage: AppStorageService, private activatedRoute: ActivatedRoute) { 
    addIcons({arrowForwardOutline,trashOutline,createOutline,alertCircleOutline});
    
  }


  notaForm = new FormGroup({
    fechaEntrega: new FormControl('', [Validators.required]),
    descripcionNota: new FormControl('', [Validators.required]),
    nota: new FormControl('', [Validators.required]),
    observacionesNota: new FormControl('', [Validators.required]),

  })
  async ngOnInit() {
    // Suscribirse a los cambios de parámetros de la ruta
    this.activatedRoute.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        await this.datos(); 
      }
      this.promedio()
    });
  }

  async datos() {
    const materias = await this.storage.get('materia');
    this.materia = materias[this.id];
    
    this.notasPve = await this.storage.get('detalleMateriasPve') ;
    this.notasSve = await this.storage.get('detalleMateriasSve') ;
    this.notasTve = await this.storage.get('detalleMateriasTve') ;
    this.notasCu = await this.storage.get('detalleMateriasCu') ;

  }
  promedio(){
    this.promedioTotal = 0;

    let promedioP = this.notasPve?.filter((nota:any) => nota.id == this.id) ?? [];
    let promedioS = this.notasSve?.filter((nota:any) => nota.id == this.id) ?? [];
    let promedioT = this.notasTve?.filter((nota:any) => nota.id == this.id) ?? [];
    let promedioC = this.notasCu?.filter((nota:any) => nota.id == this.id) ?? [];

    

    if(promedioP.length == 1){
      this.promedioPve = promedioP[0]['notaPve']
    }else if(promedioP.length > 1){
      this.promedioPve = 0
      promedioP.forEach((nota:any) => {
        this.promedioPve += nota.notaPve
  
      })
      this.promedioPve = this.promedioPve / promedioP.length
    }
   
    if(promedioS.length == 1){
      this.promedioSve = promedioS[0]['notaSve']
    }else if(promedioS.length > 1){
      this.promedioSve = 0
      promedioS.forEach((nota:any) => {
        this.promedioSve += nota.notaSve
   
      })
      this.promedioSve = this.promedioSve / promedioS.length
    }

    if(promedioT.length == 1){
      this.promedioTve = promedioT[0]['notaTve']
    }else if(promedioT.length > 1){
      this.promedioTve = 0
      promedioS.forEach((nota:any) => {
        this.promedioTve += nota.notaTve
   
      })
      this.promedioTve = this.promedioTve / promedioT.length
    }

    if(promedioC.length == 1){
      this.promedioCu = promedioC[0]['notaCu']
    }else if(promedioC.length > 1){
      this.promedioCu = 0
      promedioC.forEach((nota:any) => {
        this.promedioCu += nota.notaCu
       
      })
      this.promedioCu = this.promedioCu / promedioC.length
    }

    this.promedioTotal = (this.promedioPve * 0.20) + (this.promedioSve * 0.20) + (this.promedioTve * 0.20) + (this.promedioCu * 0.40)
    

  this.notaFinal()
    
  } 


async notaFinal(){
  let notaFinalAct = await  this.storage.get('materia')
  notaFinalAct[this.id].notaFinal = this.promedioTotal
  this.storage.set('materia',notaFinalAct)
  console.log(await this.storage.get('materia'))
}

  crear() {
    const fechaEntrega = this.notaForm.get('fechaEntrega')?.value;
    const descripcionNota = this.notaForm.get('descripcionNota')?.value;
    const nota = this.notaForm.get('nota')?.value;
    const observacionesNota = this.notaForm.get('observacionesNota')?.value;
   console.log(this.porcientoNota)
    
    switch (this.porcientoNota) {
      case 1: {
        console.log("hola")
        if (this.notasPve == null) {
          this.notasPve =
            [{
              'id': this.id,
              'fechaEntrega': fechaEntrega,
              'descripcionNota': descripcionNota,
              'notaPve': nota,
              'observacionesNota': observacionesNota
            }]
       
          
          this.storage.set('detalleMateriasPve', this.notasPve)
          this.modal.dismiss(null, 'confirm');
     
        }else{
          console.log('hola')
          this.notasPve.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega,
            'descripcionNota': descripcionNota,
            'notaPve': nota,
            'observacionesNota': observacionesNota
          })
          this.storage.set('detalleMateriasPve', this.notasPve)
          this.modal.dismiss(null, 'confirm');
          this.promedio()
        

        }
        break;
      }
      case 2: {
        console.log("hola")
        if (this.notasSve == null) {
          this.notasSve =
            [{
              'id': this.id,
              'fechaEntrega': fechaEntrega,
              'descripcionNota': descripcionNota,
              'notaSve': nota,
              'observacionesNota': observacionesNota
            }]

          this.storage.set('detalleMateriasSve', this.notasSve)
          this.modal.dismiss(null, 'confirm');

        }else{
          this.notasSve.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega,
            'descripcionNota': descripcionNota,
            'notaSve': nota,
            'observacionesNota': observacionesNota
          })
          this.storage.set('detalleMateriasSve', this.notasSve)
          this.modal.dismiss(null, 'confirm');
          this.promedio()

        }
        break;
      }
      case 3: {
        console.log("hola")
        if (this.notasTve == null) {
          this.notasTve =
            [{
              'id': this.id,
              'fechaEntrega': fechaEntrega,
              'descripcionNota': descripcionNota,
              'notaTve': nota,
              'observacionesNota': observacionesNota
            }]

          this.storage.set('detalleMateriasTve', this.notasTve)
          this.modal.dismiss(null, 'confirm');
  
        }else{
          this.notasTve.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega,
            'descripcionNota': descripcionNota,
            'notaTve': nota,
            'observacionesNota': observacionesNota
          })
          this.storage.set('detalleMateriasTve', this.notasTve)
          this.modal.dismiss(null, 'confirm');
          this.promedio()
        }
        break;
      }
      case 4: {
        console.log("hola")
        if (this.notasCu== null) {
          this.notasCu =
            [{
              'id': this.id,
              'fechaEntrega': fechaEntrega,
              'descripcionNota': descripcionNota,
              'notaCu': nota,
              'observacionesNota': observacionesNota
            }]

          this.storage.set('detalleMateriasCu', this.notasCu)
          this.modal.dismiss(null, 'confirm');
          this.promedio()
        }else{
          this.notasCu.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega,
            'descripcionNota': descripcionNota,
            'notaCu': nota,
            'observacionesNota': observacionesNota
          })
          this.storage.set('detalleMateriasCu', this.notasCu)
          this.modal.dismiss(null, 'confirm');
          this.promedio()
        }
        break;
      }
    }
  }

  addNote(tipoNota: number) {
    switch (tipoNota) {
      case 1: {
        console.log("caso 1")
        this.porcientoNota = tipoNota;
        this.modal.present();
        break;
      }
      case 2: {
        console.log("caso 2")
        this.porcientoNota = tipoNota;
        this.modal.present();
        break
      }
      case 3: {
        console.log("caso 3")
        this.porcientoNota = tipoNota;
        this.modal.present();
        break
      }
      case 4: {
        console.log("caso 4")
        this.porcientoNota = tipoNota;
        this.modal.present();
        break
      }
    }
  }


  @ViewChild(IonModal) modal!: IonModal;


  async cancel() {
    console.log(this.notasPve)
    this.modal.dismiss(null, 'cancel');

  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }



}
