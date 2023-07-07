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
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  Probleme: any={
    name:'',solutions:[]
  }

  solution: any;
  

  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.addButton=true
    this.Probleme = {
      name:'',solutions:[]
    }

    this.solutions=[]
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

  solutions:any=[]

  test(x:any){
    
    
    //console.log("p ",this.Probleme);
    
    //console.log(x);
    
  }

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
    this.getProbleme()
  }

  
  showAll() {

    
    
    this.dataservice.getSolution().subscribe(
      (data:any) => {
        this.solutionCopy=this.solution = data
        //console.log(data);
        
      }
    )

  }

  solutionCopy:any=[]

  fSolution(e:any){
    //console.log(e.target.value);
    
    this.solution=this.solutionCopy

    //console.log("fV",this.vehicule);
    this.solution=this.solution.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value) > -1)
       
  }

  addProbleme = new FormGroup({
    probleme: new FormControl('',[Validators.required, Validators.pattern("[a-z A-Z 0-9]*")]),
    Solution:new FormControl('',Validators.required)
  })

  get probleme() {
    return this.addProbleme.controls['probleme'];
  }
  get Solution() {
    return this.addProbleme.controls['Solution'];
  }



  displayedColumns = ['id','name','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getProbleme() {
    this.dataservice.getProbleme().subscribe(
      (data:any) => {
        //console.log(data);
        this.dataSource = new MatTableDataSource<Element>(data)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    )

  }

  filter(event:any){
    this.dataSource.filter = event.value
  }
  
  

  addNew(){
    this.solutions.forEach((element:any) => {
      this.Probleme.solutions.push({id:element})
    });
    
    
    this.dataservice.addProbleme( this.Probleme).subscribe(
      (data:any) => {
        this.ngOnInit()
      }
    )
    
    this.hideAdd=!this.hideAdd
  }

  onMod(probleme:any){
    this.addButton=false
    this.hideAdd=false
    this.solutions=[]
    this.Probleme.name = probleme.name
    this.Probleme.id = probleme.id
    probleme.solutions.forEach((element:any) => {
      const result = this.solutions.filter((i:any) => i === element.id).length;
      if (result==0) {
        
        this.solutions.push(element.id)
      }
    });
    //this.Probleme.solutions = probleme.solutions

    //console.log(this.solutions);
    
    
  }

  modProbleme(probleme:any){
    this.solutions.forEach((element:any) => {
      this.Probleme.solutions.push({id:element})
    });
    this.dataservice.editProbleme(this.Probleme).subscribe(()=>{
      
      this.getProbleme()
    })
    this.hideAdd=!this.hideAdd
    
  }

  onDelete(id:any){
    this.dataservice.deleteProbleme(id).subscribe(
      ()=>{this.getProbleme()}
    )
    
  }
}
