import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { DriverinformationService } from "../driverinformation/driverinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-driverinformation',
  templateUrl: './driverinformation.component.html',
  styleUrls: ['./driverinformation.component.css']
})
export class DriverinformationComponent implements OnInit {

  entitylist=[];
  driverinformationAll=[];
  drivertypeActive=[];
  driverinformation={
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
    private driverinformationservice:DriverinformationService,
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

  View(driverinformation) {
    const url = "view/demo/" + driverinformation.data.driver_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.driverinformation={
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
    this.driverinformation = {
      driver_ID: row.data.driver_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      drivertype_ID: row.data.drivertype_ID!=null?row.data.drivertype_ID.id:null,
      drivering_PATH: row.data.drivering_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.driverinformation.isactive = true;
    } else {
      this.driverinformation.isactive = false;
    }
    this.getDriverType();
    $("#editModal").modal("show");
  }


  // APIs Call Functions

  getAll() {
    this.driverinformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.driverinformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(driverinformation) {
    if (driverinformation.drivertype_ID!=null) {
      driverinformation.drivertype_ID = driverinformation.drivertype_ID.id;
    } else {
      driverinformation.drivertype_ID== null;
    }
    this.driverinformationservice.add(driverinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.driver_ID) {
          this.toastrservice.success("Success", "New Driver Information Added");
          this.driverinformation = response;
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

  update(driverinformation) {
    if (driverinformation.isactive == true) {
      driverinformation.isactive = 'Y';
    } else {
      driverinformation.isactive = 'N';
    }
    if (driverinformation.drivertype_ID!=null) {
      driverinformation.drivertype_ID = driverinformation.drivertype_ID.id;
    } else {
      driverinformation.drivertype_ID== null;
    }
    this.driverinformationservice.update(driverinformation, driverinformation.driver_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.driver_ID) {
          this.toastrservice.success("Success", "Driver Information Updated");
          this.driverinformation = response;
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
