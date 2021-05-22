import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { ElectioninformationService } from "../electioninformation/electioninformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-electioninformation',
  templateUrl: './electioninformation.component.html',
  styleUrls: ['./electioninformation.component.css'],
  // providers:[ElectioninformationService]
})
export class ElectioninformationComponent implements OnInit {

  value: Date = new Date(1981, 3, 27);
  now: Date = new Date();
  entitylist=[];
  electioninformationAll=[];
  electiontypeActive=[];
  electioninformation={
    election_ID: 0,
    election_DATE:'',
      election_TYPE:0,
    isactive: true

  };
  orderno=[];
  constructor(
    private electioninformationservice:ElectioninformationService,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService,
    private lookupservice: LookupService,

  ) { }
  get diffInDay() {
    return Math.floor(Math.abs(((new Date()).getTime() - this.value.getTime())/(24*60*60*1000))) + " days";
}
  ngOnInit() {
    this.getAll();

    for (var i = 0; i <= 50; i++) {
      this.orderno.push({ value: i });
    }
  }


  // Frontend Actions 

  View(electioninformation) {
    const url = "view/demo/" + electioninformation.data.election_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.getElectionType();
    this.electioninformation={
      
      election_ID: 0,
      // title: '',
      // surname: '',
      election_DATE:'',
      election_TYPE:0,
     isactive: true
    };
    console.log(this.electiontypeActive)
    // this.getElectionType();
    $("#addModal").modal("show");
  }

  uploadorder(){
    $("#addModal").modal("show");
  }
  Delete(row){
        
    this.electioninformationservice.delete(row.data.election_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "Election Information Updated");
          this.electioninformation = response;
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
  Edit(row) {
    console.log(row)
    this.electioninformation = {
      election_ID: row.data.election_ID,
      // title: row.data.title, 
      // surname: row.data.surname,
      election_DATE:row.data.election_DATE,
      election_TYPE:row.data.election_TYPE.description,
      isactive: true
    };

    if (row.data.isactive == "Y") {
      this.electioninformation.isactive = true;
    } else {
      this.electioninformation.isactive = false;
    }
    this.getElectionType();
    $("#editModal").modal("show");

  }


  // APIs Call Functions

  getAll() {
    this.electioninformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.electioninformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(electioninformation) {
electioninformation.election_TYPE=2;
// console.log(electioninformation.election_TYPE)
    this.electioninformationservice.add(electioninformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "New Election Information Added");
          this.electioninformation = response;
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

  update(electioninformation) {
    if (electioninformation.isactive == true) {
      electioninformation.isactive = 'Y';
    } else {
      electioninformation.isactive = 'N';
    }
    electioninformation.election_TYPE=2
    this.electioninformationservice.update(electioninformation, electioninformation.election_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "Election Information Updated");
          this.electioninformation = response;
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
    // this.lookupservice.lookup("election_TYPE").subscribe(response => {
    //   if(response) {
    //     if (response.error && response.status) {
    //       this.toastrservice.warning("Message", " " + response.message);
    //     } else {
          this.electiontypeActive = [
            "GENERAL"
          ];
    //     }
    //   }
    // }, error => {
    //   this.onfailservice.onFail(error);
    // })
  }

}
