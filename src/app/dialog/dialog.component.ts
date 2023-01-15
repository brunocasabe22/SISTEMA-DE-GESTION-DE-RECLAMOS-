import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog'; '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {
  reclamoForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>){}
ngOnInit(): void {
    this.reclamoForm =  this.formBuilder.group({
      reclamoNombre : ['',Validators.required],
      area : ['',Validators.required],
      status : ['',Validators.required],
      dates  : ['',Validators.required],
      comentario : ['',Validators.required]
    })
}
addReclamo(){
  if(this.reclamoForm.valid){
    this.api.postProduct(this.reclamoForm.value)
    .subscribe({
      next:(res)=>{
        alert("Reclamo añadido con exito")
        this.reclamoForm.reset();
        this.dialogRef.close("save");
      },
      error:()=>{
        alert("Error al cargar reclamo")

      }
      
    })
  }
}
}