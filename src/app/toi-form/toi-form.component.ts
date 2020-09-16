import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-toi-form',
  templateUrl: './toi-form.component.html',
  styleUrls: ['./toi-form.component.scss']
})
export class ToiFormComponent implements OnInit {
  contactForm: FormGroup;
  submitted:boolean = false;
  buttonData:string = "Submit"
  gender: string[] = ['Male','Female'];
  selectedNewspaper:any=[];
  paperType1:any = [];
  marked:boolean = false;
  NewsOptions: any =  [{paperType: 'Business',checked:false, id: 1}, {paperType:'Sports',checked:false, id: 2}, {paperType:'City',checked:false, id: 3},{paperType:'Nation',checked:false, id: 4},{paperType:'Politics',checked:false, id: 5},{paperType:'International',checked:false, id: 6},{paperType:'Opinion',checked:false, id: 7},{paperType:'Times Life',checked:false, id: 8},{paperType:'Education Times',checked:false, id: 9},{paperType:"I don't read TOI",checked:false, id: 10}]
  constructor(private formBuilder: FormBuilder,private data:DataService) { }

  ngOnInit() {
    this.createContactForm()
  }
  createContactForm(){
    this.contactForm = this.formBuilder.group({
      mobileNumber: ['',Validators.required],
      fullName:['',Validators.required],
      pincode: ['',Validators.required],
      Gender: ['',Validators.required],
      Age: ['',Validators.required],
      City: ['',Validators.required],
      NewsType: ['',],
      Opinion: [''],
      // Doc_proof: ['',Validators.required],
      // Doc_proof_opt: [{value:'',disabled: true}]
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
      console.log(data)
      this.paperType1.push(data.paperType)
    }

    this.data.eventFormData('181','7311648697',this.paperType1.join(','),this.selectedNewspaper[0].City,this.selectedNewspaper[0].Age,
    this.selectedNewspaper[0].Gender,this.selectedNewspaper[0].fullName,this.selectedNewspaper[0].Opinion,
     this.selectedNewspaper[0].mobileNumber,this.selectedNewspaper[0].pincode
    ).subscribe(data =>{})
    
    //  alert( JSON.stringify(this.contactForm.value))
    }
    
}
