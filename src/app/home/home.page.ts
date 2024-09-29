import { Materias } from './../models/materias';
import { NotasPve } from './../models/notas-pve';
import { NotasSve } from './../models/notas-sve';
import { NotasTve } from './../models/notas-tve';
import { NotasCu } from './../models/notas-cu';
import { arrowForwardOutline, alertCircleOutline, trashOutline, createOutline } from 'ionicons/icons';
import { Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormGroup, FormsModule, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MenuComponent } from '../componen/menu/menu.component';
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
  IonCardHeader, 
  IonCardSubtitle, 
  IonCard, 
  IonCardContent, 
  IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardContent, IonCard, IonCardSubtitle, IonCardHeader, 
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
    MenuComponent
  ]
})
export class HomePage implements OnInit {

  constructor( private storage: AppStorageService,private alertController: AlertController ) { 
    addIcons({arrowForwardOutline,trashOutline,createOutline,alertCircleOutline});
  }

  
  mats: Array<Materias> = [];

  index:any = []
  results:Array<Materias> = [];

  notasPve: Array<NotasPve> =[];
  notasSve: Array<NotasSve> = [];
  notasTve: Array<NotasTve> =[];
  notasCu: Array<NotasCu> =[];

  


  idMatMod:number = 0;

  handleInput(event: any) {
   if(document.getElementById('div-results') != null){
    document.getElementById('div-results')!.style.visibility = 'visible';
   }
    const query = event.target.value.toLowerCase();
    this.results = this.mats
      .map((mat: any, index: any) => ({ ...mat, index }))
      .filter((d: any) => d.nombreMateria.toLowerCase().indexOf(query) > -1);

      console.log(this.results)

    if (query === '') {
      console.log('query vacio');
      this.results = [];
    }
  }



  ngOnInit() {
    this.datos()  
  }

  ionViewWillEnter() {
    this.datos();
  }

  async datos(){
    this.mats = await this.storage.get('materia') || [];
    
    this.notasPve = await this.storage.get('detalleMateriasPve') ;
    this.notasSve = await this.storage.get('detalleMateriasSve') ;
    this.notasTve = await this.storage.get('detalleMateriasTve') ;
    this.notasCu = await this.storage.get('detalleMateriasCu') ;

  }
  indexMat(i:number){
    this.storage.set('matActual',i)
  }

  // toggleMenu(){}
  @ViewChild('crearMateria') modal!: IonModal;
  @ViewChild('editModal') editModal!: IonModal;

  abrirModalCrear(){
    this.modal.present();
  }

  cancel() {
  this.modal.dismiss(null, 'cancel');
  console.log(this.mats)
  }

  cancelEditar(){
    this.editModal.dismiss(null, 'cancel');
  }

  async editar(i:number){
    this.idMatMod = i
    const selectedMateria = this.mats[i]
 
    console.log(selectedMateria['codigoMateria'])
    this.materiaForm.patchValue({
      nombreMateria: selectedMateria.nombreMateria,
      semestreMat: selectedMateria.semestreMat,
      codigoMateria: selectedMateria.codigoMateria,
      horarioMateria: selectedMateria.horarioMateria,
      observacionesMateria: selectedMateria.observacionesMateria
    });
    this.editModal.present()
  }

  
  materiaForm = new FormGroup({
    nombreMateria: new FormControl('',[Validators.required]),
    semestreMat: new FormControl(1,[Validators.required,Validators.min(1)]),
    codigoMateria: new FormControl('',[Validators.required]),
    horarioMateria: new FormControl('',[Validators.required]),
    observacionesMateria: new FormControl('',[Validators.required])
  })
  


  Modificar(){
    const nombreMateria = this.materiaForm.get('nombreMateria')?.value;
    const semestreMat = this.materiaForm.get('semestreMat')?.value;
    const codigoMateria = this.materiaForm.get('codigoMateria')?.value;
    const horarioMateria = this.materiaForm.get('horarioMateria')?.value;
    const observacionesMateria = this.materiaForm.get('observacionesMateria')?.value;

    this.mats[this.idMatMod].nombreMateria = nombreMateria ?? ''
    this.mats[this.idMatMod].semestreMat = semestreMat ?? 0
    this.mats[this.idMatMod].codigoMateria = codigoMateria ?? ''
    this.mats[this.idMatMod].horarioMateria = horarioMateria ?? ''
    this.mats[this.idMatMod].observacionesMateria = observacionesMateria ?? ''
      

    this.storage.set('materia',this.mats)
    this.editModal.dismiss(null, 'confirm');
  }
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
        'nombreMateria': nombreMateria ?? '', 
        'semestreMat': semestreMat ?? 0, 
        'codigoMateria': codigoMateria ?? '',
        'horarioMateria':horarioMateria ?? '',
        'observacionesMateria':observacionesMateria ?? '',
        'notaFinal': 0})

       this.storage.set('materia',this.mats)
      console.log(this.storage.get('materia'))

    }
    
    this.modal.dismiss(null, 'confirm');
  }

  eliminar(i:number){
   
    let notasPve = this.notasPve?.filter((nota:any)=>nota.id == i) || []
    let notasSve = this.notasSve?.filter((nota:any)=>nota.id == i) || []
    let notasTve = this.notasTve?.filter((nota:any)=>nota.id == i) || []
    let notasCu = this.notasCu?.filter((nota:any)=>nota.id == i) || []

   
    if(notasPve.length == 0 && notasSve.length == 0 && notasTve.length == 0 && notasCu.length == 0){
      this.presentAlertWithoutNotes(i)
    }else{
      this.presentAlertWithNotes()
    }
  }
  
  async presentAlertWithNotes() {

    const alert = await this.alertController.create({
      header: 'No se puede eliminar una materia con notas',
      message: 'Para borrar una materia con notas, primero borra las notas de la materia',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async presentAlertWithoutNotes(i:number) {

    const alert = await this.alertController.create({
      header: 'Estas seguro que deseas eliminar esta materia?',
      message: 'Si quieres eliminar la materia, presiona confirmar',
      buttons: [{text:'Cancelar',role:'cancel'},{text:'confirmar',role:'ok',handler:()=>{
        this.mats.splice(i,1)
        this.storage.set('materia',this.mats)
      }}],
    });

    await alert.present();
  }
}
