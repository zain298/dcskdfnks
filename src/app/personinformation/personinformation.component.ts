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
  electiontypeActive=[];
  personinformation={
    person_ID: 0,
    title: '',
    surname: '',
    forenames: '',
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
    const url = "view/demo/" + personinformation.data.election_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.personinformation={
      person_ID: 0,
      title: '',
      surname: '',
     forenames: '',
     isactive: true
    };
    //this.getelectionType();
    $("#addModal").modal("show");
  }

  uploadorder(){
    $("#addModal").modal("show");
  }
  Delete(row){
    console.log(row.data.person_ID)
    this.personinformationservice.delete(row.data.person_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.person_ID) {
          this.toastrservice.show("Success", "Person Record Deleted");
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
  Edit(row) {
    this.personinformation = {
      person_ID: row.data.person_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      // electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      // electioning_PATH: row.data.electioning_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.personinformation.isactive = true;
    } else {
      this.personinformation.isactive = false;
    }
   // this.getelectionType();
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
    // if (personinformation.electiontype_ID!=null) {
    //   personinformation.electiontype_ID = personinformation.electiontype_ID.id;
    // } else {
    //   personinformation.electiontype_ID== null;
    // }
    this.personinformationservice.add(personinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.person_ID) {
          this.toastrservice.success("Success", "New election Information Added");
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
    // if (personinformation.electiontype_ID!=null) {
    //   personinformation.electiontype_ID = personinformation.electiontype_ID.id;
    // } else {
    //   personinformation.electiontype_ID== null;
    // }
    this.personinformationservice.update(personinformation, personinformation.person_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.person_ID) {
          this.toastrservice.success("Success", "election Information Updated");
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

  // getelectionType() {
  //   this.lookupservice.lookup("electionTYPE").subscribe(response => {
  //     if(response) {
  //       if (response.error && response.status) {
  //         this.toastrservice.warning("Message", " " + response.message);
  //       } else {
  //         this.electiontypeActive = response;
  //       }
  //     }
  //   }, error => {
  //     this.onfailservice.onFail(error);
  //   })
  // }

}
