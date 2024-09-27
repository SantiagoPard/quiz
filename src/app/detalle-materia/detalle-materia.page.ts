import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormsModule, Validators, FormControl } from '@angular/forms';
import { AppStorageService } from '../services/app-storage.service';
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
  notas: any = [];
  
  
  porcientoNota: number = 0;
  constructor(private storage: AppStorageService, private activatedRoute: ActivatedRoute) { }


  notaForm = new FormGroup({
    fechaEntrega: new FormControl('', [Validators.required]),
    descripcionNota: new FormControl('', [Validators.required]),
    nota: new FormControl('', [Validators.required]),
    observacionesNota: new FormControl('', [Validators.required]),

  })
  async ngOnInit() {
    await this.datos()
  }

  async datos() {
    this.id = await this.storage.get("matActual")
    this.materia = await this.storage.get('materia')
    this.materia = await this.materia[this.id]
    this.notas = await this.storage.get('detalleMateria')
    console.log(await this.storage.get("matActual"))
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
        if (this.notas == null) {
          let detalleMateria =
            [{
              'id': this.id,
              'fechaEntrega': fechaEntrega,
              'descripcionNota': descripcionNota,
              'notaPve': nota,
              'observacionesNota': observacionesNota
            }]

          this.storage.set('dettalleMateria', detalleMateria)
          this.modal.dismiss(null, 'confirm');
        }else{
          this.notas.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega,
            'descripcionNota': descripcionNota,
            'notaPve': nota,
            'observacionesNota': observacionesNota
          })
          this.storage.set('detalleMateria', this.notas)
          this.modal.dismiss(null, 'confirm');

        }
        break;
      }
      case 2: {
        console.log("hola")
        if (this.notas == null) {
          let detalleMateria =
            [{
              'id': this.id,
              'fechaEntrega': fechaEntrega,
              'descripcionNota': descripcionNota,
              'notaSve': nota,
              'observacionesNota': observacionesNota
            }]

          this.storage.set('dettalleMateria', detalleMateria)
          this.modal.dismiss(null, 'confirm');
        }else{
          this.notas.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega,
            'descripcionNota': descripcionNota,
            'notaSve': nota,
            'observacionesNota': observacionesNota
          })
          this.storage.set('detalleMateria', this.notas)
          this.modal.dismiss(null, 'confirm');

        }
        break;
      }
      case 3: {
        console.log("hola")
        if (this.notas == null) {
          let detalleMateria =
            [{
              'id': this.id,
              'fechaEntrega': fechaEntrega,
              'descripcionNota': descripcionNota,
              'notaTve': nota,
              'observacionesNota': observacionesNota
            }]

          this.storage.set('dettalleMateria', detalleMateria)
          this.modal.dismiss(null, 'confirm');
        }else{
          this.notas.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega,
            'descripcionNota': descripcionNota,
            'notaTve': nota,
            'observacionesNota': observacionesNota
          })
          this.storage.set('detalleMateria', this.notas)
          this.modal.dismiss(null, 'confirm');

        }
        break;
      }
      case 4: {
        console.log("hola")
        if (this.notas == null) {
          let detalleMateria =
            [{
              'id': this.id,
              'fechaEntrega': fechaEntrega,
              'descripcionNota': descripcionNota,
              'notaCu': nota,
              'observacionesNota': observacionesNota
            }]

          this.storage.set('dettalleMateria', detalleMateria)
          this.modal.dismiss(null, 'confirm');
        }else{
          this.notas.push({
            'id': this.id,
            'fechaEntrega': fechaEntrega,
            'descripcionNota': descripcionNota,
            'notaCu': nota,
            'observacionesNota': observacionesNota
          })
          this.storage.set('detalleMateria', this.notas)
          this.modal.dismiss(null, 'confirm');
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
    console.log(await this.storage.get('detalleMateria'))
    this.modal.dismiss(null, 'cancel');

  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }



}
