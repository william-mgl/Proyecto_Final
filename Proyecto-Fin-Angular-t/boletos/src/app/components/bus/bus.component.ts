import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { MiServicioBusService } from '../../services/mi-servicio-bus.service';
@Component({
  selector: 'app-bus',
  standalone: false,
  
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.scss'
})
export class BusComponent {
  
    title = 'Boleteria';
    profileForm!: FormGroup;
    busForm!: FormGroup;
    objeto: any = [];
    objeto_tabla: any = [];
    graba:String = "S";
  
    constructor(
      private fb: FormBuilder,
      private miServicio: MiServicioBusService
    ) { 
  
      this.busForm = this.fb.group({
        autobus_id: [-1], 
        modelo: ["", [Validators.required]], 
        capacidad: ["", [Validators.required]], 
        placa:["", [Validators.required]]  //Validación para precio como un número decimal válido
      });
      
      console.log("Te amo");
    }
    
    ngOnInit(): void {
      if (typeof localStorage !== 'undefined') {
        let data_nueva = localStorage.getItem("base_nueva");
        if (data_nueva) {
          this.objeto = JSON.parse(data_nueva);
        }
      } else {
        console.warn('localStorage no está disponible en este entorno');
      }
  
      this.miServicio.obtener_bus().subscribe(
        (resp) => {
          console.table(resp); 
          this.objeto_tabla = resp;
        },
        (err) => {
          console.error('Error al obtener los buses:', err);
        }
      );    
    }
  
    onSubmit() {
      console.warn(this.profileForm.value);
      console.warn(moment().format("DD/MM/YYYY HH:mm:ss"));
  
      console.table(this.objeto);
      localStorage.setItem("base_nueva", JSON.stringify(this.objeto));
    }
  
    guardar_bus() {
    
      if(this.busForm.value.autobus_id === -1) {
     
      this.miServicio.guardar_bus(this.busForm.value).subscribe(
        (resp) => {
          console.log('Bus guardado:', resp);
          this.ngOnInit();
          this.graba = "S";
          alert('Bus guardado con éxito!');
          this.busForm.reset();
        },
        (err: any) => {
          console.error('Error al guardar bus:', err);
          alert('Hubo un error al guardar el bus. Intenta nuevamente.');
          this.busForm.reset();
        }
      );
    } else {
      this.miServicio.actualizar_bus(this.busForm.value).subscribe(
        (resp) => {
          console.log('Bus actualizado:', resp);
          this.ngOnInit();
          this.graba = "S";
          alert('Bus actualizado con éxito!');
          this.busForm.reset();
        },
        (err: any) => {
          console.error('Error al actualizar bus:', err);
          alert('Hubo un error al actualizar el bus. Intenta nuevamente.');
          this.busForm.reset();
        }
      );
    }
    }
  
    eliminar_bus(item: any) {
      if (!item || !item.autobus_id) {
        console.warn('El ID del ruta es necesario para eliminarlo.');
        alert('El ID del ruta es necesario para eliminarlo.');
        return;
      }
    
      this.miServicio.eliminar_bus(item.autobus_id).subscribe(
        (resp) => {
          console.log('bus eliminado:', resp);
          if (resp.status) {
            this.ngOnInit();
            alert('bus eliminado con éxito!');
          } else {
            alert(resp.message || 'Error al eliminar el bus.');
          }
        },
        (err: any) => {
          console.error('Error al eliminar bus:', err);
          alert('Hubo un error al eliminar el bus. Intenta nuevamente.');
        }
      );
    }
  
    cargardatos(item: any) {
      console.log(item);
      this.busForm = this.fb.group({
        autobus_id: [item.autobus_id],
        modelo: [item.modelo, Validators.required],
        capacidad: [item.capacidad, Validators.required],
        placa: [item.placa, Validators.required]
      });
      this.graba = "N";
  }
  
  }
  


