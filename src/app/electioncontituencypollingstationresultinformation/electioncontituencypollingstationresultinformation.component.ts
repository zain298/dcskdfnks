import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { ElectioncontituencypollingstationresultinformationService } from "../electioncontituencypollingstationresultinformation/electioncontituencypollingstationresultinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-electioncontituencypollingstationresultinformation',
  templateUrl: './electioncontituencypollingstationresultinformation.component.html',
  styleUrls: ['./electioncontituencypollingstationresultinformation.component.css']
})
export class ElectioncontituencypollingstationresultinformationComponent implements OnInit {

  entitylist=[];
  electioncontituencypollingstationresultinformationAll=[];
  electiontypeActive=[];
  electioncontituencypollingstationresultinformation={
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
    private electioncontituencypollingstationresultinformationservice:ElectioncontituencypollingstationresultinformationService,
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

  View(electioncontituencypollingstationresultinformation) {
    const url = "view/demo/" + electioncontituencypollingstationresultinformation.data.election_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.electioncontituencypollingstationresultinformation={
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
    this.electioncontituencypollingstationresultinformation = {
      election_ID: row.data.election_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      electioning_PATH: row.data.electioning_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.electioncontituencypollingstationresultinformation.isactive = true;
    } else {
      this.electioncontituencypollingstationresultinformation.isactive = false;
    }
    this.getElectionType();
    $("#editModal").modal("show");
  }


  // APIs Call Functions

  getAll() {
    this.electioncontituencypollingstationresultinformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.electioncontituencypollingstationresultinformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(electioncontituencypollingstationresultinformation) {
    if (electioncontituencypollingstationresultinformation.electiontype_ID!=null) {
      electioncontituencypollingstationresultinformation.electiontype_ID = electioncontituencypollingstationresultinformation.electiontype_ID.id;
    } else {
      electioncontituencypollingstationresultinformation.electiontype_ID== null;
    }
    this.electioncontituencypollingstationresultinformationservice.add(electioncontituencypollingstationresultinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "New Election Information Added");
          this.electioncontituencypollingstationresultinformation = response;
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

  update(electioncontituencypollingstationresultinformation) {
    if (electioncontituencypollingstationresultinformation.isactive == true) {
      electioncontituencypollingstationresultinformation.isactive = 'Y';
    } else {
      electioncontituencypollingstationresultinformation.isactive = 'N';
    }
    if (electioncontituencypollingstationresultinformation.electiontype_ID!=null) {
      electioncontituencypollingstationresultinformation.electiontype_ID = electioncontituencypollingstationresultinformation.electiontype_ID.id;
    } else {
      electioncontituencypollingstationresultinformation.electiontype_ID== null;
    }
    this.electioncontituencypollingstationresultinformationservice.update(electioncontituencypollingstationresultinformation, electioncontituencypollingstationresultinformation.election_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "Election Information Updated");
          this.electioncontituencypollingstationresultinformation = response;
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
