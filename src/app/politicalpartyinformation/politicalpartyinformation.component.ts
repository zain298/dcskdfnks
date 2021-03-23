import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { PoliticalpartyinformationService } from "../politicalpartyinformation/politicalpartyinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-politicalpartyinformation',
  templateUrl: './politicalpartyinformation.component.html',
  styleUrls: ['./politicalpartyinformation.component.css']
})
export class PoliticalpartyinformationComponent implements OnInit {

  entitylist=[];
  politicalpartyinformationAll=[];
  drivertypeActive=[];
  politicalpartyinformation={
    driver_ID: 0,
    title: '',
    surname: '',
    forenames: '',
    drivertype_ID: {},
    drivering_PATH: '',
    isactive: true

  };
  orderno=[];
  constructor(
    private politicalpartyinformationservice:PoliticalpartyinformationService,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService,
    private lookupservice: LookupService,

  ) { }

  ngOnInit() {
    this.getAll();

    for (var i = 0; i <= 50; i++) {
      this.orderno.push({ value: i });
    }
  }


  // Frontend Actions 

  View(politicalpartyinformation) {
    const url = "view/demo/" + politicalpartyinformation.data.driver_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.politicalpartyinformation={
      driver_ID: 0,
      title: '',
      surname: '',
     forenames: '',
     drivertype_ID: {},
     drivering_PATH: '',
     isactive: true
    };
    this.getDriverType();
    $("#addModal").modal("show");
  }

  uploadorder(){
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.politicalpartyinformation = {
      driver_ID: row.data.driver_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      drivertype_ID: row.data.drivertype_ID!=null?row.data.drivertype_ID.id:null,
      drivering_PATH: row.data.drivering_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.politicalpartyinformation.isactive = true;
    } else {
      this.politicalpartyinformation.isactive = false;
    }
    this.getDriverType();
    $("#editModal").modal("show");
  }


  // APIs Call Functions

  getAll() {
    this.politicalpartyinformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.politicalpartyinformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(politicalpartyinformation) {
    if (politicalpartyinformation.drivertype_ID!=null) {
      politicalpartyinformation.drivertype_ID = politicalpartyinformation.drivertype_ID.id;
    } else {
      politicalpartyinformation.drivertype_ID== null;
    }
    this.politicalpartyinformationservice.add(politicalpartyinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.driver_ID) {
          this.toastrservice.success("Success", "New Driver Information Added");
          this.politicalpartyinformation = response;
          this.getAll();

          $("#addModal").modal("hide");
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  update(politicalpartyinformation) {
    if (politicalpartyinformation.isactive == true) {
      politicalpartyinformation.isactive = 'Y';
    } else {
      politicalpartyinformation.isactive = 'N';
    }
    if (politicalpartyinformation.drivertype_ID!=null) {
      politicalpartyinformation.drivertype_ID = politicalpartyinformation.drivertype_ID.id;
    } else {
      politicalpartyinformation.drivertype_ID== null;
    }
    this.politicalpartyinformationservice.update(politicalpartyinformation, politicalpartyinformation.driver_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.driver_ID) {
          this.toastrservice.success("Success", "Driver Information Updated");
          this.politicalpartyinformation = response;
          this.getAll();
          $("#editModal").modal("hide");
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  getDriverType() {
    this.lookupservice.lookup("DRIVERTYPE").subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.drivertypeActive = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

}
