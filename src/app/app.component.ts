import { Component , OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'sgr';
  constructor(private dialog : MatDialog, private api : ApiService ){

  }
  ngOnInit(): void  {
    this.getAllReclamos();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
    width:"30%"
    });
  }
  getAllReclamos(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        alert("Error a guardar los reclamos")
      }
    })

  }
}
