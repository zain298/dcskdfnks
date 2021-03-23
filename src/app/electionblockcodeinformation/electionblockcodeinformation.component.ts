import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { ElectionblockcodeinformationService } from "../electionblockcodeinformation/electionblockcodeinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-electionblockcodeinformation',
  templateUrl: './electionblockcodeinformation.component.html',
  styleUrls: ['./electionblockcodeinformation.component.css']
})
export class ElectionblockcodeinformationComponent implements OnInit {

  entitylist=[];
  electionblockcodeinformationAll=[];
  electiontypeActive=[];
  electionblockcodeinformation={
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
    private electionblockcodeinformationservice:ElectionblockcodeinformationService,
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

  View(electionblockcodeinformation) {
    const url = "view/demo/" + electionblockcodeinformation.data.election_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.electionblockcodeinformation={
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
    this.electionblockcodeinformation = {
      election_ID: row.data.election_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      electioning_PATH: row.data.electioning_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.electionblockcodeinformation.isactive = true;
    } else {
      this.electionblockcodeinformation.isactive = false;
    }
    this.getElectionType();
    $("#editModal").modal("show");
  }


  // APIs Call Functions

  getAll() {
    this.electionblockcodeinformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.electionblockcodeinformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(electionblockcodeinformation) {
    if (electionblockcodeinformation.electiontype_ID!=null) {
      electionblockcodeinformation.electiontype_ID = electionblockcodeinformation.electiontype_ID.id;
    } else {
      electionblockcodeinformation.electiontype_ID== null;
    }
    this.electionblockcodeinformationservice.add(electionblockcodeinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "New Election Information Added");
          this.electionblockcodeinformation = response;
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

  update(electionblockcodeinformation) {
    if (electionblockcodeinformation.isactive == true) {
      electionblockcodeinformation.isactive = 'Y';
    } else {
      electionblockcodeinformation.isactive = 'N';
    }
    if (electionblockcodeinformation.electiontype_ID!=null) {
      electionblockcodeinformation.electiontype_ID = electionblockcodeinformation.electiontype_ID.id;
    } else {
      electionblockcodeinformation.electiontype_ID== null;
    }
    this.electionblockcodeinformationservice.update(electionblockcodeinformation, electionblockcodeinformation.election_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "Election Information Updated");
          this.electionblockcodeinformation = response;
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
