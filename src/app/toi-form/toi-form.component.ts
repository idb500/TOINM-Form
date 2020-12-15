// https://stackblitz.com/edit/example-angular-material-reactive-form?file=app%2Fapp.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-toi-form',
  templateUrl: './toi-form.component.html',
  styleUrls: ['./toi-form.component.scss']
})
export class ToiFormComponent implements OnInit {
  contactForm: FormGroup;
  submitted:boolean = false;
  buttonData:string = "Submit"
  parmsUrl:any
  gender: string[] = ['Male','Female'];
  selectedNewspaper:any=[];
  paperType1:any = [];
  marked:boolean = false;
  device_type:any='';
  
  NewsOptions: any =  [{paperType: 'Business',checked:false, id: 1}, {paperType:'Sports',checked:false, id: 2}, {paperType:'City',checked:false, id: 3},{paperType:'Nation',checked:false, id: 4},{paperType:'Politics',checked:false, id: 5},{paperType:'International',checked:false, id: 6},{paperType:'Opinion',checked:false, id: 7},{paperType:'Times Life',checked:false, id: 8},{paperType:'Education Times',checked:false, id: 9},{paperType:"I don't read TOI",checked:false, id: 10}]
  constructor(private formBuilder: FormBuilder,private data:DataService,private deviceService: DeviceDetectorService,private router: Router) {
    
   }

  ngOnInit() {
    this.parmsUrl =  window.location.href;

    this.getDeviceInfo()
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
    let pincode : RegExp =      /^[1-9]\d{5}$/
    let phone : RegExp = /^[6-9]\d{9}$/
    let age1: RegExp = /^\d/
    let charValue: RegExp = /^[a-zA-Z\s]*$/
    this.contactForm = this.formBuilder.group({
      mobileNumber: ['',[Validators.required,Validators.pattern(phone),Validators.maxLength(10)]],
      fullName:['',[Validators.required,Validators.maxLength(50),Validators.minLength(5),Validators.pattern(charValue)]],
      pincode: ['',[Validators.required,Validators.maxLength(6),Validators.pattern(pincode)]],
      Gender: ['',Validators.required],
      Age: ['',[Validators.required,Validators.maxLength(3),Validators.minLength(3),Validators.pattern(age1)]],
      City: ['',[Validators.required,Validators.pattern(charValue)]],
      NewsType: ['',],
      Opinion: [''],
      // Doc_proof: ['',Validators.required],
      // Doc_proof_opt: [{value:'',disabled: true}]
    });
    // this.contactForm.get('Opinion').valueChanges.subscribe((value) => {
    //   let datavalue = value
    // //  console.log(datavalue.length)
    //   if(datavalue.length != 0){
    //     this.contactForm.controls['Opinion'].setValidators([Validators.required, Validators.maxLength(200)]);
    //     this.contactForm.controls["Opinion"].updateValueAndValidity();
    //   }
    //   else{
    //     console.log('hiii',value)
    //     this.contactForm.controls['Opinion'].clearValidators();
    //   }

      
    // })
       }
      onCheckBoxChanges(e: HTMLInputElement, id: number) {
        const index = this.NewsOptions.findIndex(_ => _.id === id);
        if (!(index > -1)) return;
        this.NewsOptions[index].isChecked = e.checked;
       }
       get f() { return this.contactForm.controls; }
    toggleVisibility(e){
        this.marked= e.target.checked;
      }
    getErrorPhone() {
        return this.contactForm.get('mobileNumber').hasError('required') ? 'Field is required' :
          this.contactForm.get('mobileNumber').hasError('pattern') ? 'Not a valid number' :'';
      }
    getErrorPincode() {
        return this.contactForm.get('pincode').hasError('required') ? 'Field is required' :
          this.contactForm.get('pincode').hasError('pattern') ? 'Not a valid pincode' :'';
      }
    getErrorName() {
        return this.contactForm.get('fullName').hasError('required') ? 'Field is required' :
          this.contactForm.get('fullName').hasError('pattern') ? 'Not a valid name' :
          this.contactForm.get('fullName').hasError('minlength')? 'You need to specify at least 5 characters':
          this.contactForm.get('fullName').hasError('maxlength')? 'maximun 50 characters are allowed':'';
      }
    getErrorCity() {
        return this.contactForm.get('City').hasError('required') ? 'Field is required' :
          this.contactForm.get('City').hasError('pattern') ? 'Not a valid City' :'';
      }
    getErrorAge() {
        return this.contactForm.get('Age').hasError('required') ? 'Field is required' :'';
          // this.contactForm.get('Age').hasError('pattern') ? 'Not a valid Age' :'';
      }
    onSubmit() {
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
    if(this.parmsUrl === 'https://toinm.com/formevent/'){
      this.parmsUrl = ''
    }
    const data = {
      question1:this.paperType1.join(','),
      city:this.selectedNewspaper[0].City,
      age:this.selectedNewspaper[0].Age,
      gender:this.selectedNewspaper[0].Gender,
      name:this.selectedNewspaper[0].fullName,
      question2:this.selectedNewspaper[0].Opinion,
      mobile:this.selectedNewspaper[0].mobileNumber,
      pincode:this.selectedNewspaper[0].pincode,
      current_url: this.parmsUrl,
      browser_info: this.deviceService.browser ,
      device_info: this.device_type,
      location:'',
      os_type :this.deviceService.os
    }
    this.data.eventFormData(data
    //   this.paperType1.join(','),this.selectedNewspaper[0].City,this.selectedNewspaper[0].Age,
    // this.selectedNewspaper[0].Gender,this.selectedNewspaper[0].fullName,this.selectedNewspaper[0].Opinion,
    //  this.selectedNewspaper[0].mobileNumber,this.selectedNewspaper[0].pincode
     ).subscribe(data =>{
      if(data){
        this.router.navigate(['/thank-you']);
      // window.location.replace("https://toinm.com/form/thankyou.html");

    }
  },
  error => {this.buttonData = "Submit"}
  )

  }
    
}
