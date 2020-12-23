
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from  '@angular/forms';
import { DataService } from '../data.service';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { DeviceDetectorService } from 'ngx-device-detector';
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

  NewsOptions: any =  [{paperType: 'Business',checked:false, id: 1,isChecked : false}, {paperType:'Sports',checked:false, id: 2,isChecked : false}, {paperType:'City',checked:false, id: 3,isChecked : false},{paperType:'Nation',checked:false, id: 4,isChecked : false},{paperType:'Politics',checked:false, id: 5,isChecked : false},{paperType:'International',checked:false, id: 6,isChecked : false},{paperType:'Opinion',checked:false, id: 7,isChecked : false},{paperType:'Times Life',checked:false, id: 8,isChecked : false},{paperType:'Education Times',checked:false, id: 9,isChecked : false},{paperType:"I don't read TOI",checked:false, id: 10,isChecked : false}]
  // ageSelection: string[] = ['15-20','20-25'];
  gender: string[] = ['Male','Female'];
  selectedNewspaper:any=[];
  paperType1:any = [];
  submitted:boolean = false;disabledBtn:boolean = false;
  base64File: string = null;
  paramsValue:any;
  listDataRes:any;
  marked:boolean = false;
  list:any
  id:any
  pincode: any
  buttonData:string = "Submit"
  styleObject;
  cityData:any
  // file name
  fileInfo1: string;
  fileInfo: string;device_type:any='';

  constructor(private formBuilder: FormBuilder,private data:DataService,private route: ActivatedRoute,
    private router: Router,private deviceService: DeviceDetectorService,private ngZone: NgZone) {
      this.getDeviceInfo()
      this.route.queryParams.subscribe(params => {
      this.paramsValue = params;
  
      });
     }

  ngOnInit() {
     this.getListData()
      this.createContactForm()
  }
  
  getDeviceInfo(){
    let info = this.deviceService.getDeviceInfo();
    if(info){
      if(this.deviceService.isMobile()){this.device_type='Mobile'}
      else if(this.deviceService.isTablet()){this.device_type='Tablet'}
      else if(this.deviceService.isDesktop()){this.device_type='Desktop'}       
           
    }
  }
  createContactForm(){
    this.contactForm = this.formBuilder.group({
      mobileNumber: [{ value: '', disabled: true }], // 
      fullName:['',Validators.required],
      pincode: [{value:'',disabled: true}],  // 
      Gender: ['',Validators.required],
      Age: ['',Validators.required],
      City: ['',Validators.required],
      NewsType: ['',Validators.required],
      Opinion: ['',Validators.required],
      Doc_proof: ['',Validators.required],
      Doc_proof_opt: [{value:'',disabled: true}]
    });
      }

  onFileSelect(input: HTMLInputElement): void {
    this.fileInfo = ''
   
    function formatBytes(bytes: number): string {
      const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const factor = 1024;
      let index = 0;
      while (bytes >= factor) {
        bytes /= factor;
        index++;
      }
    return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
    }
    try
    {
    const file = input.files[0];
    if(Number(file.size) >= Number(5254872)){
          this.fileInfo = "File size has exceeded";
         // alert("proof is required");
    }
    else{
      this.fileInfo = `${file.name} (${formatBytes(file.size)})`;
    }
    }
  catch { }

  }
  onFileSelect1(input: HTMLInputElement): void {
    this.fileInfo1 = ''
    function formatBytes(bytes: number): string {
      const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const factor = 1024;
      let index = 0;
      while (bytes >= factor) {
        bytes /= factor;
        index++;
      }
    return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
    }
    try {
    const file = input.files[0];
    if(Number(file.size) >= Number(5254872)){
      this.fileInfo1 = "File size has exceeded";
    }
    else{
      this.fileInfo1 = `${file.name} (${formatBytes(file.size)})`;
    }
    }
    catch {}
 
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
      this.data.getListData(this.list, this.id).subscribe(res =>{
          this.listDataRes = res;      
          if(this.listDataRes.status === 205){
            // doc
            this.router.navigate(['/duplicate-entry']);
            return
            }
          if(this.listDataRes.status === 204){
            // winner
            this.router.navigate(['/thank-you']);
            return
          }
          if(this.listDataRes.status === 404){
            this.router.navigate(['/linkExpire']);
            return
          }
          if(this.listDataRes.status === 200){
            // data
          let value = this.listDataRes.data;
          if(value.city != '' && value.city != null ){
            this.cityData = value.city
            this.contactForm.controls.City.setValue(value.city)
            this.contactForm.controls['City'].disable();
          }
          this.pincode = value.pincode
          this.contactForm.controls.mobileNumber.setValue(value.phone);
          this.contactForm.controls.pincode.setValue(value.pincode);
        }
      });
    }

  onSubmit() {
    if(this.fileInfo == 'File size has exceeded'){
      alert('File size has exceeded')
      return
    }
    this.buttonData = "Please wait.."
    this.submitted = true;
    if (this.contactForm.invalid){
      return;
  }
    this.selectedNewspaper = []
    this.contactForm.value['NewsType'] = this.NewsOptions.filter(_=>_.isChecked);
    this.selectedNewspaper.push( this.contactForm.value)
    let newsArticle = this.selectedNewspaper[0].NewsType
    for (let data of newsArticle){
      this.paperType1.push(data.paperType)
    }
    if(this.contactForm.value['NewsType'].length == 0){
        this.contactForm.controls['NewsType'].setValidators([Validators.required])
          this.contactForm.controls["NewsType"].updateValueAndValidity();
          this.buttonData = "Submit"
          alert ("please select all required field")
          return
    }
    const Image = this.Doc_proof.nativeElement;
    if(Image.files && Image.files[0]){
      this.Doc_proof1 = Image.files[0];
      this.ImageFile = this.Doc_proof1
    }
     const Image_opt = this.Doc_proof_opt.nativeElement
     if(Image_opt.files && Image_opt.files[0]){
      this.Doc_optional = Image_opt.files[0];
      this.ImageFile_optional = this.Doc_optional
      } 
      const formData: FormData = new FormData();
      // name,winningId,mobileNo,age,gender,city,pincode,preferred_content,file
      formData.append('messageid', this.id );
      formData.append('listid', this.list);
      formData.append('name', this.selectedNewspaper[0].fullName);
      formData.append('age', this.selectedNewspaper[0].Age);
      formData.append('gender', this.selectedNewspaper[0].Gender);
      formData.append('city', this.selectedNewspaper[0].City ? this.selectedNewspaper[0].City : this.cityData );
      formData.append('pincode', this.pincode );
      formData.append('question1', this.paperType1.join(','));
      formData.append('question2', this.selectedNewspaper[0].Opinion);
      formData.append('doc_1', this.ImageFile, this.ImageFile.name);
      formData.append('browser_info', this.deviceService.browser );
      formData.append('device_info',this.device_type );
      formData.append('location', '');
      formData.append('os_type', this.deviceService.os);


      try {formData.append('doc_2', this.ImageFile_optional, this.ImageFile_optional.name );}
      catch { formData.append('doc_2', '');}
      this.disabledBtn = true

      this.data.SearchData(formData).subscribe(result => {
       if(result){
        this.event_tracking()
        this.buttonData = "Submit"
        //   window.location.href = "https://wantmypaper.com/submitted.html";
        this.router.navigate(['/thank-you']);
        this.disabledBtn = false
      }
     },
     (error) => { 
      this.disabledBtn = false
      this.buttonData = "Submit"
     })
}
event_tracking(){
  this.data.eventTracking(this.listDataRes.data.phone,this.id,"button",'submit_form','front_end', this.list,'','','','','').subscribe(data =>{})
}

}
