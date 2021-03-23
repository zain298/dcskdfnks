import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { ElectioncontituencypollingstationdetailinformationService } from "../electioncontituencypollingstationdetailinformation/electioncontituencypollingstationdetailinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-electioncontituencypollingstationdetailinformation',
  templateUrl: './electioncontituencypollingstationdetailinformation.component.html',
  styleUrls: ['./electioncontituencypollingstationdetailinformation.component.css']
})
export class ElectioncontituencypollingstationdetailinformationComponent implements OnInit {

  entitylist=[];
  electioncontituencypollingstationdetailinformationAll=[];
  electiontypeActive=[];
  electioncontituencypollingstationdetailinformation={
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
    private electioncontituencypollingstationdetailinformationservice:ElectioncontituencypollingstationdetailinformationService,
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

  View(electioncontituencypollingstationdetailinformation) {
    const url = "view/demo/" + electioncontituencypollingstationdetailinformation.data.election_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.electioncontituencypollingstationdetailinformation={
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
    this.electioncontituencypollingstationdetailinformation = {
      election_ID: row.data.election_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      electioning_PATH: row.data.electioning_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.electioncontituencypollingstationdetailinformation.isactive = true;
    } else {
      this.electioncontituencypollingstationdetailinformation.isactive = false;
    }
    this.getElectionType();
    $("#editModal").modal("show");
  }


  // APIs Call Functions

  getAll() {
    this.electioncontituencypollingstationdetailinformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.electioncontituencypollingstationdetailinformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(electioncontituencypollingstationdetailinformation) {
    if (electioncontituencypollingstationdetailinformation.electiontype_ID!=null) {
      electioncontituencypollingstationdetailinformation.electiontype_ID = electioncontituencypollingstationdetailinformation.electiontype_ID.id;
    } else {
      electioncontituencypollingstationdetailinformation.electiontype_ID== null;
    }
    this.electioncontituencypollingstationdetailinformationservice.add(electioncontituencypollingstationdetailinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "New Election Information Added");
          this.electioncontituencypollingstationdetailinformation = response;
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

  update(electioncontituencypollingstationdetailinformation) {
    if (electioncontituencypollingstationdetailinformation.isactive == true) {
      electioncontituencypollingstationdetailinformation.isactive = 'Y';
    } else {
      electioncontituencypollingstationdetailinformation.isactive = 'N';
    }
    if (electioncontituencypollingstationdetailinformation.electiontype_ID!=null) {
      electioncontituencypollingstationdetailinformation.electiontype_ID = electioncontituencypollingstationdetailinformation.electiontype_ID.id;
    } else {
      electioncontituencypollingstationdetailinformation.electiontype_ID== null;
    }
    this.electioncontituencypollingstationdetailinformationservice.update(electioncontituencypollingstationdetailinformation, electioncontituencypollingstationdetailinformation.election_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "Election Information Updated");
          this.electioncontituencypollingstationdetailinformation = response;
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
