import { Component, ElementRef, OnInit,QueryList,ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from 'src/app/models/vehicule';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  
  /*
  ville: any;
  vehicule: any;
  produit:any;
  probleme:any;
  solution:any;

  selectedville:any=-1
  


  villes: any[]=[];
  curDate=new Date();
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');


  asec:any
  desc:any

  forms:any;
  formsMod:any;
  formsEmpty:any;
  formsModVille:any=[];
  form: any = {
    vehiculeId:'',user: '', villeId: '' ,ville: '', produitId: '', problemeId: '' , solutionId: '', description:'' ,statut:'',dateCreation: null,dateModification: null
  }

  constructor(private dataservice:DataService, private router: Router){}
  ngOnInit() :void {
    //this.showAll();
    this.getForm();
    this.showAll()
    
    
    
    //this.onSelect(this.selectedville.id);
    
  }

  
  showAll() {
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.ville = data
        //console.log(this.ville.length)
      }
    )
    
    
    

  }
  

  getForm(){
    this.dataservice.getReclamation().subscribe(
      (data:any) => {
        this.forms = data,
        console.log(this.forms)
      }
    )
    
  }

 
  selected:boolean=false
  


  test(){
    for (let obj of this.forms) {
      this.dataservice.getFormVehicule(obj.vehiculeId).subscribe(
        (data:any) => {
          obj.vehiculeId=data.title
          
         // console.log('data : '+ obj.vehiculeId);
          
        }
      )
    }
    
    
  }
  ne:Number=0
  empty:boolean=false
  afficherTest() {
    this.selected=true
    if (this.selectedville==0) {
      this.ne=1
      if (this.formsMod!=null) {
        this.forms=this.formsMod
      }
      alert('d='+this.desc+' '+'a='+this.asec)
      if (this.asec=='') {
        this.forms.sort((a:any,b:any) =>  new Date(a.dateCreation).getDate() - new Date(b.dateCreation).getDate())
      } else {
        this.forms.sort((a:any,b:any) =>  new Date(b.dateCreation).getDate() - new Date(a.dateCreation).getDate())
      }
      
      this.boucle(this.forms)
      
    } else if(this.selectedville==-1){
      
      this.selected=false
      this.formsModVille=[]
      this.selectedville=-1
    }else{
      if (this.formsMod!=null) {
        this.forms=this.formsMod
      }
      
      this.ne=0
      for (let obj of this.forms){
        if (obj.villeId==this.selectedville) {
          this.formsModVille.push(obj),
          
          this.ne=(this.ne.valueOf() + 1)
          //console.log(this.ne);
          
        }
      }
      if (this.formsModVille=='') {
        this.empty==true
      }


      //this.forms.sort((a:any,b:any) =>  new Date(b.dateCreation).getDate() - new Date(a.dateCreation).getDate())
      
      this.boucle(this.forms)
      this.formsMod=this.forms
      this.forms=this.formsModVille
      //console.log("lod"+this.formsMod);
      
      
      this.formsModVille=[]
    }

    
    
    

  }


  boucle(x:any){
    for (let obj of x) {
      //console.log('data : '+obj.villeId);
      this.dataservice.getFormVehicule(obj.vehiculeId).subscribe(
        (data:any) => {
          obj.vehicule=data.title
          
          //console.log('data : '+ obj.vehiculeId);
          
        }
      )
      this.dataservice.getFormVille(obj.villeId).subscribe(
        (data:any) => {
          obj.ville=data.title
          
        }//,console.log('ville'+obj.ville)
        
        
      )
      this.dataservice.getFormProduit(obj.produitId).subscribe(
        (data:any) => {
          obj.produit=data.title
          
        }
      )
      this.dataservice.getFormProbleme(obj.problemeId).subscribe(
        (data:any) => {
          obj.probleme=data.title
          
        }
      )
      this.dataservice.getFormUser(obj.user).subscribe(
        (data:any) => {
          obj.username=data.username
          
        }
      )
      if (obj.solutionId!=0) {
        
        this.dataservice.getFormSolution(obj.solutionId).subscribe(
          (data:any) => {
            obj.solution=data.title
            
          }
        )
      }
      
    }
  }


  
  valider(id:any){
    this.dataservice.validStatut(id.target.value,2).subscribe(()=>{
      this.forms[id.target.value-1].statut=2
    })
    //this.router.navigate(['/acceuil'])

  }
  invalider(id:any){
    this.dataservice.validStatut(id.target.value,0).subscribe(()=>{
      this.forms[id.target.value-1].statut=0
    })

  }*/

  
  

  
 
  

  constructor(private dataservice:DataService,private router: Router){}

  ngOnInit(): void {
    //this.router.navigate(['/acceuil'])
    this.showAll()
    
    //this.timer.subscribe((t) => this.showAll());
    
   
  }

  
  

  data:any=[]
  showAll() {
    this.dataservice.getReclamation().subscribe(
      (data:any) => {
        
        let i=0
        data.forEach((l:any) => {
          var val={id:l.id,statut:l.statut,ville:l.device.ville.name,description:l.description,vehicule:l.device.name,user:l.client.username,dateCreation:l.date_creation,dateModification:l.date_modification}
          this.data[i]=val
          i++
        });
        //console.log(this.data);
        
        this.dataSource = new MatTableDataSource<Element>(this.data)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        this.acc=true
        
      }
    )
    this.acctualiser()

  }
 

  filter(event:any){
    this.dataSource.filter = event.value
    
  }

  


  displayedColumns = ['id','user','ville','vehicule','dateCreation','dateModification','statut','description'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  valider(id:any){
    this.dataservice.validStatut(id,2).subscribe(()=>{
      this.dataSource.data[id-1].statut=2
    })
    //this.router.navigate(['/acceuil'])

  }
  invalider(id:any){
    this.dataservice.validStatut(id,0).subscribe(()=>{
      this.dataSource.data[id-1].statut=0
    })

  }
 
  description:any
  hide:boolean=true
  style:any
  detail(d:any){
    this.hide=false
    let desc=d
    //console.log(desc);
    this.description=d
    this.style='opacity:0.5;pointer-events:none;'
    
    
    
    
    //this.elem.first.nativeElement.setAttribute("style", "opacity:0.5;")
    
  }
  

  

  hideDetail(){
    this.style='opacity:1;'
    this.hide=true
  }

  acc:boolean=false
  acctualiser(){
    if (this.acc) {
      this.router.navigate(['/acceuil'])
    }
  }


 
}


