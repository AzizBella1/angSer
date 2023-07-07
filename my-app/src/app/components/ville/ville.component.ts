import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from 'src/app/models/vehicule';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {
  villeSelected: any={
    name:''
  }

  

  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.addButton=true
    this.villeSelected = {
      name:''
    }

   
    this.hideAdd=!this.hideAdd
    
  }

 

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
  }

  showAll() {
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        
        this.dataSource = new MatTableDataSource<Element>(data)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    )

  }


  filter(event:any){
    this.dataSource.filter = event.value
  }

  
  addVille = new FormGroup({
    ville: new FormControl('',[Validators.required, Validators.pattern("[a-z A-Z 0-9]*")])
  })

  get ville() {
    return this.addVille.controls['ville'];
  }


  vehicules:any=[]


  displayedColumns = ['id','name'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  addNew(){
    this.villeSelected.name=this.addVille.value.ville
    
    this.dataservice.addVille( this.villeSelected).subscribe(
      (data:any) => {
        
        this.showAll()
      }
    )
    this.hideAdd=!this.hideAdd
  }

  onMod(ville:any){
    this.addButton=false
    this.hideAdd=false
    this.villeSelected.name = ville.name
    this.villeSelected.id = ville.id


    
  }
  
  modVille(ville:any){
   
    this.dataservice.addVille(this.villeSelected).subscribe(()=>{
      
      ville = this.villeSelected
      this.showAll()
    })
    this.hideAdd=!this.hideAdd
    
  }

  onDelete(id:any){
    this.dataservice.deleteVille(id).subscribe(
      ()=>{
        this.showAll()

      }
    )
  }
  
}
