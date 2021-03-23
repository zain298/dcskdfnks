import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { PersoninformationService } from "../personinformation/personinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-personinformation',
  templateUrl: './personinformation.component.html',
  styleUrls: ['./personinformation.component.css']
})
export class PersoninformationComponent implements OnInit {

  entitylist=[];
  personinformationAll=[];
  drivertypeActive=[];
  personinformation={
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
    private personinformationservice:PersoninformationService,
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

  View(personinformation) {
    const url = "view/demo/" + personinformation.data.driver_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.personinformation={
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
    this.personinformation = {
      driver_ID: row.data.driver_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      drivertype_ID: row.data.drivertype_ID!=null?row.data.drivertype_ID.id:null,
      drivering_PATH: row.data.drivering_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.personinformation.isactive = true;
    } else {
      this.personinformation.isactive = false;
    }
    this.getDriverType();
    $("#editModal").modal("show");
  }


  // APIs Call Functions

  getAll() {
    this.personinformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.personinformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(personinformation) {
    if (personinformation.drivertype_ID!=null) {
      personinformation.drivertype_ID = personinformation.drivertype_ID.id;
    } else {
      personinformation.drivertype_ID== null;
    }
    this.personinformationservice.add(personinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.driver_ID) {
          this.toastrservice.success("Success", "New Driver Information Added");
          this.personinformation = response;
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

  update(personinformation) {
    if (personinformation.isactive == true) {
      personinformation.isactive = 'Y';
    } else {
      personinformation.isactive = 'N';
    }
    if (personinformation.drivertype_ID!=null) {
      personinformation.drivertype_ID = personinformation.drivertype_ID.id;
    } else {
      personinformation.drivertype_ID== null;
    }
    this.personinformationservice.update(personinformation, personinformation.driver_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.driver_ID) {
          this.toastrservice.success("Success", "Driver Information Updated");
          this.personinformation = response;
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
