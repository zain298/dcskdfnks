import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { ElectioncontituencyinformationService } from "../electioncontituencyinformation/electioncontituencyinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-electioncontituencyinformation',
  templateUrl: './electioncontituencyinformation.component.html',
  styleUrls: ['./electioncontituencyinformation.component.css']
})
export class ElectioncontituencyinformationComponent implements OnInit {

  entitylist=[];
  electioncontituencyinformationAll=[];
  electiontypeActive=[];
  electioncontituencyinformation={
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
    private electioncontituencyinformationservice:ElectioncontituencyinformationService,
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

  View(electioncontituencyinformation) {
    const url = "view/demo/" + electioncontituencyinformation.data.election_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.electioncontituencyinformation={
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
    this.electioncontituencyinformation = {
      election_ID: row.data.election_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      electioning_PATH: row.data.electioning_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.electioncontituencyinformation.isactive = true;
    } else {
      this.electioncontituencyinformation.isactive = false;
    }
    this.getElectionType();
    $("#editModal").modal("show");
  }


  // APIs Call Functions

  getAll() {
    this.electioncontituencyinformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.electioncontituencyinformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(electioncontituencyinformation) {
    if (electioncontituencyinformation.electiontype_ID!=null) {
      electioncontituencyinformation.electiontype_ID = electioncontituencyinformation.electiontype_ID.id;
    } else {
      electioncontituencyinformation.electiontype_ID== null;
    }
    this.electioncontituencyinformationservice.add(electioncontituencyinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "New Election Information Added");
          this.electioncontituencyinformation = response;
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

  update(electioncontituencyinformation) {
    if (electioncontituencyinformation.isactive == true) {
      electioncontituencyinformation.isactive = 'Y';
    } else {
      electioncontituencyinformation.isactive = 'N';
    }
    if (electioncontituencyinformation.electiontype_ID!=null) {
      electioncontituencyinformation.electiontype_ID = electioncontituencyinformation.electiontype_ID.id;
    } else {
      electioncontituencyinformation.electiontype_ID== null;
    }
    this.electioncontituencyinformationservice.update(electioncontituencyinformation, electioncontituencyinformation.election_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "Election Information Updated");
          this.electioncontituencyinformation = response;
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
