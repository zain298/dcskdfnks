
import { Injectable } from '@angular/core';
import { setting } from "../setting";
import { HttpCallServieService } from "../services/http-call-servie.service";
@Injectable({
  providedIn: 'root'
})

export class ElectioncontituencyinformationService {

  constructor(  
     private _HttpCallServieService_: HttpCallServieService
    ) { }
    get() {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "GET",
        request_URI: "contituency",
        request_BODY: ""
      }
      console.log("Election Contituency API: "+postData);
      return this._HttpCallServieService_.api(postData);
    }
  
    getAll() {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "GET",
        request_URI: "contituency/all",
        request_BODY: ""
      }
      return this._HttpCallServieService_.api(postData);
    }
  
  
    getOne(id) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "GET",
        request_URI: "contituency/" + id,
        request_BODY: ""
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    add(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "contituency",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    update(data, id) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "PUT",
        request_URI: "contituency/" + id,
        request_BODY: JSON.stringify(data)
  
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    delete(id) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "DELETE",
        request_URI: "contituency/" + id,
        request_BODY: ""
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    search(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "contituency/search",
        request_BODY: JSON.stringify(data)
  
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    searchAll(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "contituency/search/all",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    advancedSearch(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "contituency/advancedsearch",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    advancedSearchAll(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "contituency/advancedsearch/all",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
}
