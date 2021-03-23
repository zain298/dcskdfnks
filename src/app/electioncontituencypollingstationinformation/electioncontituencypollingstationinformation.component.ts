import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { ElectioncontituencypollingstationinformationService } from "../electioncontituencypollingstationinformation/electioncontituencypollingstationinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-electioncontituencypollingstationinformation',
  templateUrl: './electioncontituencypollingstationinformation.component.html',
  styleUrls: ['./electioncontituencypollingstationinformation.component.css']
})
export class ElectioncontituencypollingstationinformationComponent implements OnInit {

  entitylist=[];
  electioncontituencypollingstationinformationAll=[];
  electiontypeActive=[];
  electioncontituencypollingstationinformation={
    election_ID: 0,
    title: '',
    surname: '',
    forenames: '',
    electiontype_ID: {},
    electioning_PATH: '',
    isactive: true

  };
  orderno=[];
  constructor(
    private electioncontituencypollingstationinformationservice:ElectioncontituencypollingstationinformationService,
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

  View(electioncontituencypollingstationinformation) {
    const url = "view/demo/" + electioncontituencypollingstationinformation.data.election_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.electioncontituencypollingstationinformation={
      election_ID: 0,
      title: '',
      surname: '',
     forenames: '',
     electiontype_ID: {},
     electioning_PATH: '',
     isactive: true
    };
    this.getElectionType();
    $("#addModal").modal("show");
  }

  uploadorder(){
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.electioncontituencypollingstationinformation = {
      election_ID: row.data.election_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      electioning_PATH: row.data.electioning_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.electioncontituencypollingstationinformation.isactive = true;
    } else {
      this.electioncontituencypollingstationinformation.isactive = false;
    }
    this.getElectionType();
    $("#editModal").modal("show");
  }


  // APIs Call Functions

  getAll() {
    this.electioncontituencypollingstationinformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.electioncontituencypollingstationinformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(electioncontituencypollingstationinformation) {
    if (electioncontituencypollingstationinformation.electiontype_ID!=null) {
      electioncontituencypollingstationinformation.electiontype_ID = electioncontituencypollingstationinformation.electiontype_ID.id;
    } else {
      electioncontituencypollingstationinformation.electiontype_ID== null;
    }
    this.electioncontituencypollingstationinformationservice.add(electioncontituencypollingstationinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "New Election Information Added");
          this.electioncontituencypollingstationinformation = response;
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

  update(electioncontituencypollingstationinformation) {
    if (electioncontituencypollingstationinformation.isactive == true) {
      electioncontituencypollingstationinformation.isactive = 'Y';
    } else {
      electioncontituencypollingstationinformation.isactive = 'N';
    }
    if (electioncontituencypollingstationinformation.electiontype_ID!=null) {
      electioncontituencypollingstationinformation.electiontype_ID = electioncontituencypollingstationinformation.electiontype_ID.id;
    } else {
      electioncontituencypollingstationinformation.electiontype_ID== null;
    }
    this.electioncontituencypollingstationinformationservice.update(electioncontituencypollingstationinformation, electioncontituencypollingstationinformation.election_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "Election Information Updated");
          this.electioncontituencypollingstationinformation = response;
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

  getElectionType() {
    this.lookupservice.lookup("DRIVERTYPE").subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.electiontypeActive = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

}
