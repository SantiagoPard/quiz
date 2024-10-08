
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Materias } from '../models/materias';
import { NotasPve } from '../models/notas-pve';
import { NotasSve } from '../models/notas-sve';
import { NotasTve } from '../models/notas-tve';
import { NotasCu } from '../models/notas-cu';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormsModule, Validators, FormControl } from '@angular/forms';
import { AppStorageService } from '../services/app-storage.service';
import { AlertController } from '@ionic/angular';
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

  materia: Materias ={} as Materias;
  
  mats: Array<Materias> = [];

  notasPve: Array<NotasPve> = [];
  
  notasSve: Array<NotasSve> = [];
  notasTve: Array<NotasTve> = [];
  notasCu: Array<NotasCu> = [];
  idNotaMod: number = 0;

  promedioPve: number = 0;
  promedioSve: number = 0;
  promedioTve: number = 0;
  promedioCu: number = 0;

  promedioTotal: number = 0;
  porcientoNotaMod: number = 0;




  porcientoNota: number = 0;
  constructor(private storage: AppStorageService, private activatedRoute: ActivatedRoute, private alertController: AlertController) {
    addIcons({ arrowForwardOutline, trashOutline, createOutline, alertCircleOutline });

  }

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('crearNota') crearNota!: IonModal;
  @ViewChild('editModalNota') editModalNota!: IonModal;
  @ViewChild('crearMateriaModal') crearMateriaModal!: IonModal;


  notaForm = new FormGroup({
    fechaEntrega: new FormControl('', [Validators.required]),
    descripcionNota: new FormControl('', [Validators.required]),
    nota: new FormControl('', [Validators.min(0), Validators.max(5)]),
    observacionesNota: new FormControl('', []),

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
    this.mats = materias;
    this.materia = materias[this.id];
    console.log(this.materia)

    this.notasPve = await this.storage.get('detalleMateriasPve');
    this.notasSve = await this.storage.get('detalleMateriasSve');
    this.notasTve = await this.storage.get('detalleMateriasTve');
    this.notasCu = await this.storage.get('detalleMateriasCu');

  }
  promedio() {
    this.promedioTotal = 0;

    let promedioP = this.notasPve?.filter((nota: any) => nota.id == this.id) ?? [];
    let promedioS = this.notasSve?.filter((nota: any) => nota.id == this.id) ?? [];
    let promedioT = this.notasTve?.filter((nota: any) => nota.id == this.id) ?? [];
    let promedioC = this.notasCu?.filter((nota: any) => nota.id == this.id) ?? [];



    if (promedioP.length == 1) {
      this.promedioPve = promedioP[0]['notaPve']
    } else if (promedioP.length > 1) {
      this.promedioPve = 0
      promedioP.forEach((nota: any) => {
        this.promedioPve += nota.notaPve

      })
      this.promedioPve = this.promedioPve / promedioP.length
    }

    if (promedioS.length == 1) {
      this.promedioSve = promedioS[0]['notaSve']
    } else if (promedioS.length > 1) {
      this.promedioSve = 0
      promedioS.forEach((nota: any) => {
        this.promedioSve += nota.notaSve

      })
      this.promedioSve = this.promedioSve / promedioS.length
    }

    if (promedioT.length == 1) {
      this.promedioTve = promedioT[0]['notaTve']
    } else if (promedioT.length > 1) {
      this.promedioTve = 0
      promedioS.forEach((nota: any) => {
        this.promedioTve += nota.notaTve

      })
      this.promedioTve = this.promedioTve / promedioT.length
    }

    if (promedioC.length == 1) {
      this.promedioCu = promedioC[0]['notaCu']
    } else if (promedioC.length > 1) {
      this.promedioCu = 0
      promedioC.forEach((nota: any) => {
        this.promedioCu += nota.notaCu

      })
      this.promedioCu = this.promedioCu / promedioC.length
    }

    this.promedioTotal = (this.promedioPve * 0.20) + (this.promedioSve * 0.20) + (this.promedioTve * 0.20) + (this.promedioCu * 0.40)


    this.notaFinal()

  }

  editNote(i: number, porcentaje: number) {
    this.idNotaMod = i
    this.porcientoNota = porcentaje
    switch (porcentaje) {
      case 1: {

        const notaMod = this.notasPve[i]
        this.notaForm.patchValue({
          fechaEntrega: notaMod.fechaEntrega ,
          descripcionNota: notaMod.descripcionNota,
          nota: notaMod.notaPve.toString(),
          observacionesNota: notaMod.observacionesNota
        })
        this.editModalNota.present()
        break;
      }
      case 2: {
        const notaMod = this.notasSve[i]
        this.notaForm.patchValue({
          fechaEntrega: notaMod.fechaEntrega,
          descripcionNota: notaMod.descripcionNota,
          nota: notaMod.notaSve.toString(),
          observacionesNota: notaMod.observacionesNota
        })
        this.editModalNota.present()
        break;
      }
      case 3: {
        const notaMod = this.notasTve[i]
        this.notaForm.patchValue({
          fechaEntrega: notaMod.fechaEntrega,
          descripcionNota: notaMod.descripcionNota,
          nota: notaMod.notaTve.toString(),
          observacionesNota: notaMod.observacionesNota
        })
        this.editModalNota.present()
        break;
      }
      case 4: {
        const notaMod = this.notasCu[i]
        this.notaForm.patchValue({
          fechaEntrega: notaMod.fechaEntrega,
          descripcionNota: notaMod.descripcionNota,
          nota: notaMod.notaCu.toString(),
          observacionesNota: notaMod.observacionesNota
        })
        this.editModalNota.present()
        break;
      }
    }
  }

  editar() {
    const fechaEntrega = this.notaForm.get('fechaEntrega')?.value;
    const descripcionNota = this.notaForm.get('descripcionNota')?.value;
    const nota = this.notaForm.get('nota')?.value;
    const observacionesNota = this.notaForm.get('observacionesNota')?.value;

    switch (this.porcientoNota) {
      case 1: {
        this.notasPve[this.idNotaMod].fechaEntrega = fechaEntrega ?? ''
        this.notasPve[this.idNotaMod].descripcionNota = descripcionNota ?? ''
        this.notasPve[this.idNotaMod].notaPve = Number(nota) || 0
        this.notasPve[this.idNotaMod].observacionesNota = observacionesNota ?? ''

        this.storage.set('detalleMateriasPve', this.notasPve)
        this.promedio()
        this.editModalNota.dismiss(null, 'confirm');
        break;
      }
      case 2: {
        this.notasSve[this.idNotaMod].fechaEntrega = fechaEntrega ?? ''
        this.notasSve[this.idNotaMod].descripcionNota = descripcionNota ?? ''
        this.notasSve[this.idNotaMod].notaSve = Number(nota) || 0
        this.notasSve[this.idNotaMod].observacionesNota = observacionesNota ?? ''

        this.storage.set('detalleMateriasSve', this.notasSve)
        this.promedio()
        this.editModalNota.dismiss(null, 'confirm');
        break;
      }
      case 3: {
        this.notasTve[this.idNotaMod].fechaEntrega = fechaEntrega ?? '' 
        this.notasTve[this.idNotaMod].descripcionNota = descripcionNota ?? ''
        this.notasTve[this.idNotaMod].notaTve = Number(nota) || 0
        this.notasTve[this.idNotaMod].observacionesNota = observacionesNota ?? ''

        this.storage.set('detalleMateriasTve', this.notasTve)
        this.promedio()
        this.editModalNota.dismiss(null, 'confirm');
        break;
      }
      case 4: {
        this.notasCu[this.idNotaMod].fechaEntrega = fechaEntrega ?? ''
        this.notasCu[this.idNotaMod].descripcionNota = descripcionNota ?? ''
        this.notasCu[this.idNotaMod].notaCu = Number(nota) || 0
        this.notasCu[this.idNotaMod].observacionesNota = observacionesNota ?? ''

        this.storage.set('detalleMateriasCu', this.notasCu)
        this.promedio()
        this.editModalNota.dismiss(null, 'confirm');
      }
    }
  }


  async eliminar(i: number, porcentaje: number) {
    switch (porcentaje) {
      case 1: {

        const alert = await this.alertController.create({
          header: 'Estas seguro que deseas eliminar esta nota?',
          message: 'Esta acción no se puede deshacer',
          buttons: [{ text: 'Cancelar', role: 'cancel' }, {
            text: 'confirmar', role: 'ok', handler: () => {
              this.notasPve.splice(i, 1)
              this.promedio()
              this.storage.set('detalleMateriasPve', this.notasPve)
            }
          }],
        });
        await alert.present();
        break;
      }
      case 2: {
        const alert = await this.alertController.create({
          header: 'Estas seguro que deseas eliminar esta nota?',
          message: 'Esta acción no se puede deshacer',
          buttons: [{ text: 'Cancelar', role: 'cancel' }, {
            text: 'confirmar', role: 'ok', handler: () => {
              this.notasSve.splice(i, 1)
              this.promedio()
              this.storage.set('detalleMateriasSve', this.notasSve)
            }
          }],
        });
        await alert.present();
        break;
      }
      case 3: {
        const alert = await this.alertController.create({
          header: 'Estas seguro que deseas eliminar esta nota?',
          message: 'Esta acción no se puede deshacer',
          buttons: [{ text: 'Cancelar', role: 'cancel' }, {
            text: 'confirmar', role: 'ok', handler: () => {
              this.notasTve.splice(i, 1)
              this.promedio()
              this.storage.set('detalleMateriasTve', this.notasTve)
            }
          }],
        });
        await alert.present();
        break;
      }
      case 4: {
        const alert = await this.alertController.create({
          header: 'Estas seguro que deseas eliminar esta nota?',
          message: 'Esta acción no se puede deshacer',
          buttons: [{ text: 'Cancelar', role: 'cancel' }, {
            text: 'confirmar', role: 'ok', handler: () => {
              this.notasCu.splice(i, 1)
              this.promedio()
              this.storage.set('detalleMateriasCu', this.notasCu)
            }
          }],
        });
        await alert.present();
        break;
      }
    }
  }





  async notaFinal() {
    let notaFinalAct = await this.storage.get('materia')
    notaFinalAct[this.id].notaFinal = this.promedioTotal
    this.storage.set('materia', notaFinalAct)
 
  }

  crear() {
    const fechaEntrega = this.notaForm.get('fechaEntrega')?.value;
    const descripcionNota = this.notaForm.get('descripcionNota')?.value;
    const nota = this.notaForm.get('nota')?.value || 0;
    const observacionesNota = this.notaForm.get('observacionesNota')?.value;
    console.log(this.porcientoNota)

    switch (this.porcientoNota) {
      case 1: {
        console.log("hola")
        if (this.notasPve == null) {
          this.notasPve =
            [{
              'id': this.id,
              'fechaEntrega': fechaEntrega ?? '',
              'descripcionNota': descripcionNota ?? '',
              'notaPve': Number(nota) || 0,
              'observacionesNota': observacionesNota ?? ''
            }]


          this.storage.set('detalleMateriasPve', this.notasPve)
          this.promedio()
          this.crearNota.dismiss(null, 'confirm');

        } else {
          console.log('hola')
          this.notasPve.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega ?? '',
            'descripcionNota': descripcionNota ?? '',
            'notaPve': Number(nota) || 0,
            'observacionesNota': observacionesNota ?? ''
          })
          this.storage.set('detalleMateriasPve', this.notasPve)
          this.crearNota.dismiss(null, 'confirm');
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
              'fechaEntrega': fechaEntrega ?? '',
              'descripcionNota': descripcionNota ?? '',
              'notaSve': Number(nota) || 0,
              'observacionesNota': observacionesNota ?? ''
            }]

          this.storage.set('detalleMateriasSve', this.notasSve)
          this.promedio()
          this.crearNota.dismiss(null, 'confirm');

        } else {
          this.notasSve.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega ?? '',
            'descripcionNota': descripcionNota ?? ''  ,
            'notaSve': Number(nota) || 0,
            'observacionesNota': observacionesNota ?? ''
          })
          this.storage.set('detalleMateriasSve', this.notasSve)
          this.crearNota.dismiss(null, 'confirm');
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
              'fechaEntrega': fechaEntrega ?? '',
              'descripcionNota': descripcionNota ?? '',
              'notaTve': Number(nota) || 0,
              'observacionesNota': observacionesNota ?? ''
            }]

          this.storage.set('detalleMateriasTve', this.notasTve)
          this.promedio()
          this.crearNota.dismiss(null, 'confirm');

        } else {
          this.notasTve.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega ?? '',
            'descripcionNota': descripcionNota ?? '',
            'notaTve': Number(nota) || 0,
            'observacionesNota': observacionesNota ?? ''
          })
          this.storage.set('detalleMateriasTve', this.notasTve)
          this.promedio()
          this.crearNota.dismiss(null, 'confirm');
        }
        break;
      }
      case 4: {
        console.log("hola")
        if (this.notasCu == null) {
          this.notasCu =
            [{
              'id': this.id,
              'fechaEntrega': fechaEntrega ?? '',
              'descripcionNota': descripcionNota ?? '',
              'notaCu': Number(nota) || 0,
              'observacionesNota': observacionesNota ?? ''
            }]

          this.storage.set('detalleMateriasCu', this.notasCu)
          this.promedio()
  
          this.crearNota.dismiss(null, 'confirm');
        } else {
          this.notasCu.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega ?? '',
            'descripcionNota': descripcionNota ?? '',
            'notaCu': Number(nota) || 0,
            'observacionesNota': observacionesNota ?? ''
          })
          this.storage.set('detalleMateriasCu', this.notasCu)
          this.crearNota.dismiss(null, 'confirm');
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
        this.crearNota.present();
        break;
      }
      case 2: {
        console.log("caso 2")
        this.porcientoNota = tipoNota;
        this.crearNota.present();
        break
      }
      case 3: {
        console.log("caso 3")
        this.porcientoNota = tipoNota;
        this.crearNota.present();
        break
      }
      case 4: {
        console.log("caso 4")
        this.porcientoNota = tipoNota;
        this.crearNota.present();
        break
      }
    }
  }




  async cancel() {
    console.log(this.notasPve)
    this.crearNota.dismiss(null, 'cancel');

  }

  cancelEditar() {
    this.editModalNota.dismiss(null, 'cancel');
    console.log(this.notasPve)
  }
  confirm() {
    this.crearNota.dismiss(null, 'confirm');
  }





  materiaForm = new FormGroup({
    nombreMateria: new FormControl('',[Validators.required]),
    semestreMat: new FormControl(1,[Validators.required,Validators.min(1)]),
    codigoMateria: new FormControl('',[Validators.required]),
    horarioMateria: new FormControl('',[Validators.required]),
    observacionesMateria: new FormControl('',[Validators.required])
  })

  crearMateria() {
    const nombreMateria = this.materiaForm.get('nombreMateria')?.value;
    const semestreMat = this.materiaForm.get('semestreMat')?.value;
    const codigoMateria = this.materiaForm.get('codigoMateria')?.value;
    const horarioMateria = this.materiaForm.get('horarioMateria')?.value;
    const observacionesMateria = this.materiaForm.get('observacionesMateria')?.value;

    
      this.mats.push({
        'nombreMateria': nombreMateria ?? '', 
        'semestreMat': semestreMat ?? 0, 
        'codigoMateria': codigoMateria ?? '',
        'horarioMateria': horarioMateria ?? '',
        'observacionesMateria': observacionesMateria ?? '',
        'notaFinal': 0
      });

      this.storage.set('materia', this.mats);
      this.crearMateriaModal.dismiss();
    
    
    // Resetea el formulario
    
  }

  cancelCrearMateria() {
    this.crearMateriaModal.dismiss();

  }
}
