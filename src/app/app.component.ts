import { Component , OnInit,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'sgr';
  displayedColumns: string[] = ['reclamoNombre', 'area', 'status', 'dates', 'comentario', 'action' ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort
  fileName= 'ExcelSheet.xlsx';
  reclamoList =[{

  }]
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('reclamo-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
  constructor(private dialog : MatDialog, private api : ApiService ){

  }
  ngOnInit(): void  {
    this.getAllReclamos();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
    width:"30%"
    }).afterClosed().subscribe(val=>{
      if(val ==="guardar"){
        this.getAllReclamos();
      }
    })
  }
  getAllReclamos(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
     this.dataSource = new MatTableDataSource(res);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error a guardar los reclamos")
      }
    })

  }
  editReclamo(row : any){
    this.dialog.open(DialogComponent,{
      width:"30",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==="update"){
        this.getAllReclamos();
      }
    })
  }
  deleteReclamo(id:number){
    this.api.deleteReclamo(id)
    .subscribe({
      next:(res)=>{
        alert("Reclamo borrado")
        this.getAllReclamos();
      },
      error:()=>{
        alert("Error al borrar")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}

 