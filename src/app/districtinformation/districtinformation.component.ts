import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { DistrictinformationService } from "../districtinformation/districtinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-districtinformation',
  templateUrl: './districtinformation.component.html',
  styleUrls: ['./districtinformation.component.css']
})
export class DistrictinformationComponent implements OnInit {

  entitylist=[];
  districtinformationAll=[];
  drivertypeActive=[];
  districtinformation={
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
    private districtinformationservice:DistrictinformationService,
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

  View(districtinformation) {
    const url = "view/demo/" + districtinformation.data.driver_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.districtinformation={
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
    this.districtinformation = {
      driver_ID: row.data.driver_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      drivertype_ID: row.data.drivertype_ID!=null?row.data.drivertype_ID.id:null,
      drivering_PATH: row.data.drivering_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.districtinformation.isactive = true;
    } else {
      this.districtinformation.isactive = false;
    }
    this.getDriverType();
    $("#editModal").modal("show");
  }


  // APIs Call Functions

  getAll() {
    this.districtinformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.districtinformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(districtinformation) {
    if (districtinformation.drivertype_ID!=null) {
      districtinformation.drivertype_ID = districtinformation.drivertype_ID.id;
    } else {
      districtinformation.drivertype_ID== null;
    }
    this.districtinformationservice.add(districtinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.driver_ID) {
          this.toastrservice.success("Success", "New Driver Information Added");
          this.districtinformation = response;
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

  update(districtinformation) {
    if (districtinformation.isactive == true) {
      districtinformation.isactive = 'Y';
    } else {
      districtinformation.isactive = 'N';
    }
    if (districtinformation.drivertype_ID!=null) {
      districtinformation.drivertype_ID = districtinformation.drivertype_ID.id;
    } else {
      districtinformation.drivertype_ID== null;
    }
    this.districtinformationservice.update(districtinformation, districtinformation.driver_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.driver_ID) {
          this.toastrservice.success("Success", "Driver Information Updated");
          this.districtinformation = response;
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
