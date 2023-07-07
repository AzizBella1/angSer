import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {

  referenceSelected: any={
    name:''
  }
  
  reference: any;
  references: any=[]
  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.addButton=true
    this.referenceSelected = {
      name:''
    }

   
    this.hideAdd=!this.hideAdd
    
  }

  existe:boolean=false
  chercher(event:any){
    this.existe=false
    let dataCherche=this.dataSource
    dataCherche.filter = event.value
    if (dataCherche.filteredData.length != 0 ) {
      if (event.value=='') {
        this.existe=false
      }else{
        this.existe=true
      }
      
    }
  }
  
  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
  }


  
  showAll() {
    this.dataservice.getReference().subscribe(
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

  addRef = new FormGroup({
    ref: new FormControl('',[Validators.required, Validators.pattern("[a-z A-Z 0-9]*")])
  })

  get ref() {
    return this.addRef.controls['ref'];
  }

  


  displayedColumns = ['id','name','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  addNew(){
    
    
    this.dataservice.addReference( this.referenceSelected).subscribe(
      (data:any) => {
        this.ngOnInit()
      }
    )
    
    this.hideAdd=!this.hideAdd
  }

  onMod(produit:any){
    this.addButton=false
    this.hideAdd=false
    this.referenceSelected.name = produit.name
    this.referenceSelected.id = produit.id
    
    
    
   
    
  }

  modRef(produit:any){
   
    this.dataservice.editReference(this.referenceSelected).subscribe(()=>{
      this.showAll()
    })
    this.hideAdd=!this.hideAdd
    
  }

  onDelete(id:any){
    this.dataservice.deleteReference(id).subscribe(
      ()=>{this.showAll()}
    )
    
  }
}
