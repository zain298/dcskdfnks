import { Injectable } from '@angular/core';
import { setting } from "../setting";
import { HttpCallServieService } from "../services/http-call-servie.service";
@Injectable({
  providedIn: 'root'
})

export class ElectioncontituencypollingstationresultinformationService {

  constructor(   
     private _HttpCallServieService_: HttpCallServieService
    ) { }
    get() {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "GET",
        request_URI: "pollingstationresults",
        request_BODY: ""
      }
      console.log("Election Polling Station Results API: "+postData);
      return this._HttpCallServieService_.api(postData);
    }
  
    getAll() {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "GET",
        request_URI: "pollingstationresults/all",
        request_BODY: ""
      }
      return this._HttpCallServieService_.api(postData);
    }
  
  
    getOne(id) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "GET",
        request_URI: "pollingstationresults/" + id,
        request_BODY: ""
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    add(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "pollingstationresults",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    update(data, id) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "PUT",
        request_URI: "pollingstationresults/" + id,
        request_BODY: JSON.stringify(data)
  
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    delete(id) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "DELETE",
        request_URI: "pollingstationresults/" + id,
        request_BODY: ""
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    search(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "pollingstationresults/search",
        request_BODY: JSON.stringify(data)
  
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    searchAll(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "pollingstationresults/search/all",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    advancedSearch(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "pollingstationresults/advancedsearch",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
  
    advancedSearchAll(data) {
      var postData = {
        service_NAME: setting.service_NAME,
        request_TYPE: "POST",
        request_URI: "pollingstationresults/advancedsearch/all",
        request_BODY: JSON.stringify(data)
      }
      return this._HttpCallServieService_.api(postData);
    }
}
