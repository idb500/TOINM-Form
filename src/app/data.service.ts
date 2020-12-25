import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = "https://toinm.com/submitfile/"

  constructor(private http: HttpClient) { }
// name,winningId,mobileNo,age,gender,city,pincode,preferred_content,file
  SearchData(formData):Observable<any[]>{
    return this.http.post<any[]>(`${this.baseUrl}file.php`, formData);
  }
  getListData(list, id):Observable<any[]>{
    return this.http.post<any[]>(`${this.baseUrl}getdata.php`, {list, id});
  }

  // eventFormData(question1,city,age,gender,name,question2,mobile,pincode):Observable<any[]>{
  //   return this.http.post<any[]>(`${this.baseUrl}formsevent.php`,{question1,city,age,gender,name,question2,mobile,pincode});
  // }
  eventFormData(data):Observable<any[]>{
    return this.http.post<any[]>(`${this.baseUrl}formsevent.php`,data);
  }
  eventTracking(mobile,message_id,event_type,event_name,origin, list_id,remark_1,remark_2,remark_3,remark_4,remark_5):Observable<any[]>{
    return this.http.post<any[]>(`${this.baseUrl}event.php`,{mobile,message_id,event_type,event_name,origin, list_id,remark_1,remark_2,remark_3,remark_4,remark_5})
  }
}
