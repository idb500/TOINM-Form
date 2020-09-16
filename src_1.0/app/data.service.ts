import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
// name,winningId,mobileNo,age,gender,city,pincode,preferred_content,file
  SearchData(formData):Observable<any[]>{
    return this.http.post<any[]>('http://127.0.0.1:8000/file/upload/', formData);
  }
  getListData(list, id):Observable<any[]>{
    return this.http.post<any[]>('https://toinm.com/submitfile/getdata.php', {list, id});
  }
}
