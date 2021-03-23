import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { PoliticalpartycandidateinformationService } from "../politicalpartycandidateinformation/politicalpartycandidateinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-politicalpartycandidateinformation',
  templateUrl: './politicalpartycandidateinformation.component.html',
  styleUrls: ['./politicalpartycandidateinformation.component.css']
})
export class PoliticalpartycandidateinformationComponent implements OnInit {

  entitylist=[];
  politicalpartycandidateinformationAll=[];
  drivertypeActive=[];
  politicalpartycandidateinformation={
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
    private politicalpartycandidateinformationservice:PoliticalpartycandidateinformationService,
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

  View(politicalpartycandidateinformation) {
    const url = "view/demo/" + politicalpartycandidateinformation.data.driver_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.politicalpartycandidateinformation={
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
    this.politicalpartycandidateinformation = {
      driver_ID: row.data.driver_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      drivertype_ID: row.data.drivertype_ID!=null?row.data.drivertype_ID.id:null,
      drivering_PATH: row.data.drivering_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.politicalpartycandidateinformation.isactive = true;
    } else {
      this.politicalpartycandidateinformation.isactive = false;
    }
    this.getDriverType();
    $("#editModal").modal("show");
  }


  // APIs Call Functions

  getAll() {
    this.politicalpartycandidateinformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.politicalpartycandidateinformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(politicalpartycandidateinformation) {
    if (politicalpartycandidateinformation.drivertype_ID!=null) {
      politicalpartycandidateinformation.drivertype_ID = politicalpartycandidateinformation.drivertype_ID.id;
    } else {
      politicalpartycandidateinformation.drivertype_ID== null;
    }
    this.politicalpartycandidateinformationservice.add(politicalpartycandidateinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.driver_ID) {
          this.toastrservice.success("Success", "New Driver Information Added");
          this.politicalpartycandidateinformation = response;
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

  update(politicalpartycandidateinformation) {
    if (politicalpartycandidateinformation.isactive == true) {
      politicalpartycandidateinformation.isactive = 'Y';
    } else {
      politicalpartycandidateinformation.isactive = 'N';
    }
    if (politicalpartycandidateinformation.drivertype_ID!=null) {
      politicalpartycandidateinformation.drivertype_ID = politicalpartycandidateinformation.drivertype_ID.id;
    } else {
      politicalpartycandidateinformation.drivertype_ID== null;
    }
    this.politicalpartycandidateinformationservice.update(politicalpartycandidateinformation, politicalpartycandidateinformation.driver_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.driver_ID) {
          this.toastrservice.success("Success", "Driver Information Updated");
          this.politicalpartycandidateinformation = response;
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
