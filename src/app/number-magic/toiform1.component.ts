
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from  '@angular/forms';
import { DataService } from '../data.service';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { DeviceDetectorService } from 'ngx-device-detector';
import Swal from 'sweetalert2';

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
  formResult:any
  file_doc:boolean = false;allFields:boolean = false;

  constructor(private formBuilder: FormBuilder,private data:DataService,private route: ActivatedRoute,
    private router: Router,private deviceService: DeviceDetectorService,private ngZone: NgZone) {
      this.getDeviceInfo()
      this.route.queryParams.subscribe(params => {
      this.paramsValue = params;});
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
      Age: ['',[Validators.required,Validators.maxLength(3), Validators.max(120), Validators.min(1)]],
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
        this.event_tracking("file",'proof_size_exceeded',file.size)

         // alert("proof is required");
    }
    else{
      this.fileInfo = `${file.name} (${formatBytes(file.size)})`;
      this.event_tracking("file",'proof',file.size)
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
      this.event_tracking("file",'selfie_size_exceeded',file.size)
    }
    else{
     
      this.fileInfo1 = `${file.name} (${formatBytes(file.size)})`;
      this.event_tracking("file",'selfie',file.size)
     
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
        this.fileInfo1 = ''
        this.event_tracking("radio_button",'Selfie_unchecked')
        this.contactForm.controls['Doc_proof_opt'].disable();
      }
      else
      { 
        this.event_tracking("radio_button",'Selfie_checked')
        this.contactForm.controls['Doc_proof_opt'].enable();
      }
     
    }

    getListData(){
      this.list = this.paramsValue.list
      this.id = this.paramsValue.id
      this.data.getListData(this.list, this.id).subscribe(res =>{
          this.listDataRes = res;  
         // this.event_tracking("event",'get_data')

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
    if(this.fileInfo == 'File size has exceeded'  ){
     // alert('File size has exceeded')
      return
    }
    if(this.fileInfo1 == "File size has exceeded"  ){
     // alert('File size has exceeded')
      return
    }
   // this.fileInfo1 == 
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
      formData.append('doc_1',this.ImageFile, this.ImageFile.name );
      formData.append('browser_info', this.deviceService.browser );
      formData.append('device_info',this.device_type );
      formData.append('location', '');
      formData.append('os_type', this.deviceService.os);


      // try {}
      // catch { formData.append('doc_2', '');}
      if(this.marked == false){
        formData.append('doc_2', '');
      }
      else(formData.append('doc_2', this.ImageFile_optional, this.ImageFile_optional.name ))
      this.disabledBtn = true

      this.data.SearchData(formData).subscribe(result => {
       if(result){
         this.formResult = result
         if(this.formResult.status == 404){
          this.buttonData = "Submit"
          this.file_doc = true;
          // alert("please select document")
           return

         }
         else if(this.formResult.status == 201){
          this.event_tracking("button",'submit_form')
          this.buttonData = "Submit"
          //   window.location.href = "https://wantmypaper.com/submitted.html";
          this.router.navigate(['/thank-you']);
          
           
         }
         else if(this.formResult.status == 405){
          this.buttonData = "Submit"
          this.disabledBtn = false
          this.allFields = true
          return
         }
         else {
          this.buttonData = "Submit"
          this.disabledBtn = false
          Swal.fire({
            title: 'Oops! something went wrong',
            text: 'Please fill the form again',
            icon: 'warning',
            confirmButtonText: 'OK'
          })
           return
         }
       
      }
     },
     (error) => { 
      this.disabledBtn = false
      this.buttonData = "Submit"
     })
}
event_tracking(event_type, event_name,file_size?){
  this.data.eventTracking(this.listDataRes.data.phone,this.id,event_type,event_name,'front_end', this.list,file_size,'','','','').subscribe(data =>{})
}

}
