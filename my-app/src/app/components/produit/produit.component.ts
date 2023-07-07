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
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produitSelected: any={
    name:'',problemes:[]
  }
  
  probleme: any;
  problemes: any=[]
  hideAdd:boolean=true
  addButton:boolean=true
  problemeCopy: any=[]

  add(){
    this.addButton=true
    this.problemes=[]
    this.produitSelected = {
      name:'',problemes:[]
    }

   
    this.hideAdd=!this.hideAdd
    
  }

  fProbleme(e:any){
    //console.log(e.target.value);
    
    this.probleme=this.problemeCopy

    //console.log("fV",this.vehicule);
    this.probleme=this.probleme.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value) > -1)
       
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
    this.getProbleme()
    this.showAll()
  }


  
  showAll() {
    this.dataservice.getProduit().subscribe(
      (data:any) => {
        this.dataSource = new MatTableDataSource<Element>(data)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    )

  }

  getProbleme() {
    
    this.dataservice.getProbleme().subscribe(
      (data:any) => {
        this.problemeCopy=this.probleme = data
        //console.log(data);
        
      }
    )
    //console.log("111",this.probleme);
    

  }

  filter(event:any){
    this.dataSource.filter = event.value
  }

  addProduit = new FormGroup({
    produit: new FormControl('',Validators.required),
    Probleme:new FormControl('',Validators.required)
  })

  get produit() {
    return this.addProduit.controls['produit'];
  }

  get Probleme() {
    return this.addProduit.controls['Probleme'];
  }



  displayedColumns = ['id','name','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  addNew(){
    this.problemes.forEach((element:any) => {
      this.produitSelected.problemes.push({id:element})
    });
    
    this.dataservice.addProduit( this.produitSelected).subscribe(
      (data:any) => {
        this.ngOnInit()
      }
    )
    
    this.hideAdd=!this.hideAdd
  }

  onMod(produit:any){
    this.addButton=false
    this.hideAdd=false
    this.problemes=[]
    this.produitSelected.name = produit.name
    this.produitSelected.id = produit.id
    produit.problemes.forEach((element:any) => {
      const result = this.problemes.filter((i:any) => i === element.id).length;
      if (result==0) {
        
        this.problemes.push(element.id)
      }
      
    });

   //console.log(this.problemes);
   
    
  }

  modProduit(produit:any){
    this.problemes.forEach((element:any) => {
      this.produitSelected.problemes.push({id:element})
    });
    //console.log("*****",this.produitSelected);
    this.dataservice.editProduit(this.produitSelected).subscribe(()=>{
      this.showAll()
    })
    this.hideAdd=!this.hideAdd
    
  }

  onDelete(id:any){
    this.dataservice.deleteProduit(id).subscribe(
      ()=>{this.showAll()}
    )
    
  }

 
}
