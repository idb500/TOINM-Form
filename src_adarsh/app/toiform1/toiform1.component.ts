import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from  '@angular/forms';
@Component({
  selector: 'app-toiform1',
  templateUrl: './toiform1.component.html',
  styleUrls: ['./toiform1.component.scss']
})
export class Toiform1Component implements OnInit {
  contactForm: FormGroup;
  NewsOptions: any =  [{paperType: 'Business',checked:false, id: 1,}, {paperType:'Sports',checked:false, id: 2,}, {paperType:'City',checked:false, id: 3,},{paperType:'Nation',checked:false, id: 4,},{paperType:'Politics',checked:false, id: 5,},{paperType:'International',checked:false, id: 6,},{paperType:'Opinion',checked:false, id: 7,},{paperType:'Times Life',checked:false, id: 8,},{paperType:'Education Times',checked:false, id: 9,},{paperType:"I don't read TOI",checked:false, id: 10,}]
  ageSelection: string[] = ['15-20','20-25'];
  gender: string[] = ['Male','Female'];
  selectedNewspaper:any=[];
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder,private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.createContactForm()
    
  }
  createContactForm(){
    this.contactForm = this.formBuilder.group({
      fullName: ['',Validators.required],  
      mobileNumber: ['',Validators.required],
      pincode: ['',Validators.required],
      Gender: ['',Validators.required],
      Age: ['',Validators.required],
      City: ['',Validators.required],
      NewsType: [''],
      Opinion: [''],
      file: [null, Validators.required]


    });
     }
     onCheckBoxChanges(e: HTMLInputElement, id: number) {
       
      // get current position of the changes element by ID
      const index = this.NewsOptions.findIndex(_ => _.id === id);
      if (!(index > -1)) return;
  
        // const isChecked = this.checkBoxes[index].isChecked;
      this.NewsOptions[index].isChecked = e.checked;
     }
     get f() { return this.contactForm.controls; }
     onFileChange(event) {
       debugger
      let reader = new FileReader();
     
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
      
        reader.onload = () => {
          this.contactForm.patchValue({
            file: reader.result
          });
          
          // need to run CD since file load runs outside of zone
          this.cd.markForCheck();
        };
      }
    }
  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
  }
    this.selectedNewspaper = []
    this.contactForm.value['NewsType'] = this.NewsOptions.filter(_=>_.isChecked);
    alert(JSON.stringify(this.contactForm.value) )
    // this.selectedNewspaper.push( this.contactForm.value)
    
    // let x = this.selectedNewspaper[0].NewsType
    // for (let data of x)
    // {
    //   console.log(data.paperType)
    // }
  
    
}




















// onCheckboxChange(option, event) {
//   console.log(option)
//   if(event.target.checked) {
//     this.checkedList.push(option.id);
//   } else {
//   for(var i=0 ; i < this.NewsOptions.length; i++) {
//     if(this.checkedList[i] == option.id) {
//       this.checkedList.splice(i,1);
//    }
//  }
// }
// console.log(this.checkedList);
// }

}
