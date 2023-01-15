import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {
  reclamoForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private api : ApiService){}
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
  console.log(this.reclamoForm.value);
}
}