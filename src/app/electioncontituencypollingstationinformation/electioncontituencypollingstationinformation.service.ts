import { Injectable } from '@angular/core';
import { setting } from "../setting";
import { HttpCallServieService } from "../services/http-call-servie.service";
@Injectable({
  providedIn: 'root'
})

export class ElectioncontituencypollingstationinformationService {

  constructor(   
     private _HttpCallServieService_: HttpCallServieService
    ) { }
    get() {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "GET",
        request_URI: "pollingstation",
        request_BODY: ""
      }
      console.log("Election Polling Station API: "+postData);
      return this._HttpCallServieService_.api(postData);
    }
  
    getAll() {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "GET",
        request_URI: "pollingstation/all",
        request_BODY: ""
      }
      return this._HttpCallServieService_.api(postData);
    }
  
  
    getOne(id) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "GET",
        request_URI: "pollingstation/" + id,
        request_BODY: ""
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    add(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "pollingstation",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    update(data, id) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "PUT",
        request_URI: "pollingstation/" + id,
        request_BODY: JSON.stringify(data)
  
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    delete(id) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "DELETE",
        request_URI: "pollingstation/" + id,
        request_BODY: ""
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    search(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "pollingstation/search",
        request_BODY: JSON.stringify(data)
  
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    searchAll(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "pollingstation/search/all",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    advancedSearch(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "pollingstation/advancedsearch",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    advancedSearchAll(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "pollingstation/advancedsearch/all",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
}
