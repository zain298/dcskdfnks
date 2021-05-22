import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map, catchError } from "rxjs/operators";
import { setting } from "../setting";
import { LoginService } from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class HttpCallServieService {


  constructor(
    private http: Http,
    private loginService: LoginService
  ) { }

  BaseUrl: any = this.loginService.loaddetail().applicationservice_PATH;

  api(postData){
    console.log(postData);
    return this.http.post(
      this.BaseUrl + "service/apigateway", postData
    ).pipe(map(res => res.json()));  
  }

  // apilogistics(postData){
  //   var baselogisticsurl = this.BaseUrl.replace("SGW", "LOGISTICS");
  //   return this.http.post(
  //     baselogisticsurl + "orderraw/upload", postData
  //   ).pipe(map(res => res.json()));  
  // }

}

