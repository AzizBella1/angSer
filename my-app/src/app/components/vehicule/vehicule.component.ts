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
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit {
  device: any={
    name:'',
    ville:{id:0},
    disabled:0   
  }

  editVehicule:Vehicule[]=[]
  Ville: any;
  villeTrue:boolean=true
  selectedville: any ={
    id:0,name:''
  }

 

  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.addButton=true
    this.device = {
      name:'',
      ville:{id:0},
      disabled:0     

    }
    

    this.selectedville = {
      id:0,name:''
    }
    this.hideAdd=!this.hideAdd
    
  }

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAllVille()
    this.getVehicule()
  }

  onChange(event:any){
    this.selectedville.id=event.value
  }
  showAllVille() {
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.Ville = data
      }
    )

  }

  addVehicule = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.pattern("[a-z A-Z 0-9]*")]),
    ville:new FormControl(),
    
    disabled:new FormControl()
    
  })

  
  get name() {
    return this.addVehicule.controls['name'];
  }

  get ville() {
    return this.addVehicule.controls['ville'];
  }

  get disabled() {
    return this.addVehicule.controls['disabled'];
  }
  
  
  



  vehicules:any=[]


  displayedColumns = ['id','name','ville','disabled'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getVehicule() {
    this.dataservice.getVehicule().subscribe(
      (data:any) => {
        //console.log(data);
        data.forEach((l:any) => {
          l.ville=l.ville.name
          
        });
        this.dataSource = new MatTableDataSource<Element>(data)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    )

  }

  filter(event:any){
    this.dataSource.filter = event.value
  }

  addNewVehicule(){
    
    
    this.dataservice.addVehicule( this.device).subscribe(
      (data:any) => {
        
        this.getVehicule()
      }
    )
    this.hideAdd=!this.hideAdd
  }

  onMod(vehicule:any){
    this.addButton=false
    this.hideAdd=false
    this.device.ville.id = vehicule.ville.id
    this.device.name = vehicule.name
    this.device.id = vehicule.id
    
    //console.log(this.device);
    
    
    this.selectedville = {
      id:vehicule.ville.id
    }
  }

  modVehicule(vehicule:any){
   
    this.dataservice.editVehicule(this.device).subscribe(()=>{
      
      vehicule = this.device
      this.getVehicule()
    })
    this.hideAdd=!this.hideAdd
    
  }

  onDelete(id:any){
    this.dataservice.deleteVehicule(id).subscribe(
      ()=>{ this.getVehicule()}
    )
   
  }
}
