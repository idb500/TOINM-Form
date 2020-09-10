// https://stackblitz.com/edit/angular-file-upload-button?file=src%2Fapp%2Ffile-upload-button%2Ffile-upload-button.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from  '@angular/forms';
import { DataService } from '../data.service';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-toiform1',
  templateUrl: './toiform1.component.html',
  styleUrls: ['./toiform1.component.scss']
})
export class Toiform1Component implements OnInit {
  @ViewChild('Doc_proof') Doc_proof;
  @ViewChild('Doc_proof_opt') Doc_proof_opt;
  contactForm: FormGroup;
  Doc_proof1: File;
  ImageFile: File;
  Doc_optional: File;
  ImageFile_optional: File

  NewsOptions: any =  [{paperType: 'Business',checked:false, id: 1}, {paperType:'Sports',checked:false, id: 2}, {paperType:'City',checked:false, id: 3},{paperType:'Nation',checked:false, id: 4},{paperType:'Politics',checked:false, id: 5},{paperType:'International',checked:false, id: 6},{paperType:'Opinion',checked:false, id: 7},{paperType:'Times Life',checked:false, id: 8},{paperType:'Education Times',checked:false, id: 9},{paperType:"I don't read TOI",checked:false, id: 10}]
  // ageSelection: string[] = ['15-20','20-25'];
  gender: string[] = ['Male','Female'];
  selectedNewspaper:any=[];
  paperType1:any = [];
  submitted:boolean = false;
  base64File: string = null;
  filename: string = null;
  paramsValue:any;
  listDataRes:any;
  marked = true;
  list:any
  id:any
  pincode: any

  constructor(private formBuilder: FormBuilder,private data:DataService,private route: ActivatedRoute,
    private router: Router) {
      this.route.queryParams.subscribe(params => {
      this.paramsValue = params;
      console.log(this.paramsValue)
     // if (params["term"]) {}
      });
     }

  ngOnInit() {
    this.getListData()
    this.createContactForm()
    
    
  }
  createContactForm(){
    this.contactForm = this.formBuilder.group({
      mobileNumber: [{ value: '', disabled: true }],
      fullName:['',Validators.required],
      pincode: [{value:'',disabled: true}],
      Gender: ['',Validators.required],
      Age: ['',Validators.required],
      City: ['',Validators.required],
      NewsType: ['',],
      Opinion: [''],
      Doc_proof: ['',Validators.required],
      Doc_proof_opt: [{value:'',disabled: true}]
    });
     }
   
     onCheckBoxChanges(e: HTMLInputElement, id: number) {
      const index = this.NewsOptions.findIndex(_ => _.id === id);
      if (!(index > -1)) return;
      this.NewsOptions[index].isChecked = e.checked;
     }
     get f() { return this.contactForm.controls; }
     toggleVisibility(e){
      this.marked= e.target.checked;
      if(this.marked == false){
        this.contactForm.controls['Doc_proof_opt'].disable();
      }
      else
      {this.contactForm.controls['Doc_proof_opt'].enable();}
     
    }
    getListData(){
      this.list = this.paramsValue.list
      this.id = this.paramsValue.id
      
      this.data.getListData(this.list, this.id).subscribe(res =>
        {
          this.listDataRes = res;
          console.log(this.listDataRes.status)
          if(this.listDataRes.status === 205)
          {
            // doc
            this.router.navigate(['/doc']);
            return
          }
          if(this.listDataRes.status === 204)
          {
            // winner
            this.router.navigate(['/submit']);
            return
          }
          if(this.listDataRes.status === 404)
          {
            this.router.navigate(['/linkExpire']);
            return
          }
          if(this.listDataRes.status === 200)
          {
            // data
          let value = this.listDataRes.data;

          // console.log(value.city);
          // value.city = ''
          if(value.city != '')
          {
            this.contactForm.controls.City.setValue(value.city)
            this.contactForm.controls['City'].disable();
          }
         
          this.contactForm.controls.mobileNumber.setValue(value.phone);
          this.contactForm.controls.pincode.setValue(value.pincode);
         
          }

        })
      
    }

  onSubmit() {
    
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
  }
  
    this.selectedNewspaper = []
    this.contactForm.value['NewsType'] = this.NewsOptions.filter(_=>_.isChecked);
     
    this.selectedNewspaper.push( this.contactForm.value)
    
    let newsArticle = this.selectedNewspaper[0].NewsType
    for (let data of newsArticle)
    {
      this.paperType1.push(data.paperType)
      
    }
    const Image = this.Doc_proof.nativeElement;
    if(Image.files && Image.files[0])
    {
      
      this.Doc_proof1 = Image.files[0];
      this.ImageFile = this.Doc_proof1
      }
     const Image_opt = this.Doc_proof_opt.nativeElement
     if(Image_opt.files && Image_opt.files[0])
     {
      this.Doc_optional = Image_opt.files[0];
      this.ImageFile_optional = this.Doc_optional
    } 
      const formData: FormData = new FormData();
      // name,winningId,mobileNo,age,gender,city,pincode,preferred_content,file
      console.log(this.selectedNewspaper[0].fullName)
      formData.append('messageid', this.id );
      formData.append('listid', this.list);
      formData.append('name', this.selectedNewspaper[0].fullName);
      formData.append('age', this.selectedNewspaper[0].Age);
      formData.append('gender', this.selectedNewspaper[0].Gender);
      formData.append('city', this.selectedNewspaper[0].City);
      formData.append('pincode', this.pincode );
      formData.append('question1', this.paperType1.join(','));
      formData.append('question2', this.selectedNewspaper[0].Opinion);
      formData.append('doc_1', this.ImageFile, this.ImageFile.name);
      try {formData.append('doc_2', this.ImageFile_optional, this.ImageFile_optional.name );}
      catch { formData.append('doc_2', '' );}
      
     
    
     this.data.SearchData(formData).subscribe(result => {
       if(result)
       {
       let res = result
        this.router.navigate(['/submit']);
       console.log(res)
       }
     })
}

}
