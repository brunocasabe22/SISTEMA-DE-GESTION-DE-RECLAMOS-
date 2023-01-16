import { Component,OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from './../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog'; 
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {
  reclamoForm !: FormGroup;
  actionBtn : string = "Guardar"
  constructor(private formBuilder : FormBuilder,     private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>){}
ngOnInit(): void {
    this.reclamoForm =  this.formBuilder.group({
      reclamoNombre : ['',Validators.required],
      area : ['',Validators.required],
      status : ['',Validators.required],
      dates  : ['',Validators.required],
      comentario : ['',Validators.required]
    });
    if(this.editData){
      this.actionBtn = "Actualizar"
      this.reclamoForm.controls['reclamoNombre'].setValue(this.editData.reclamoNombre);
      this.reclamoForm.controls['area'].setValue(this.editData.area);
      this.reclamoForm.controls['status'].setValue(this.editData.status);
      this.reclamoForm.controls['dates'].setValue(this.editData.dates);
      this.reclamoForm.controls['comentario'].setValue(this.editData.comentario);
     
    }
}
addReclamo(){
if(!this.editData){
  if(this.reclamoForm.valid){
    this.api.postProduct(this.reclamoForm.value)
    .subscribe({
      next:(res)=>{
        alert("Reclamo añadido con exito")
        this.reclamoForm.reset();
        this.dialogRef.close("guardar");
      },
      error:()=>{
        alert("Error al cargar reclamo")

      }
      
    })
  }
} else{
  this.updateReclamo()
}
}
updateReclamo(){
  this.api.putReclamo(this.reclamoForm.value,this.editData.id) 
  .subscribe({
    next:(res)=>{
      alert("Reclamo actualizado Exitosamente");
      this.reclamoForm.reset();
      this.dialogRef.close("update");
    },
    error:()=>{
      alert("Error al actualizar")
    }
  })
}
}