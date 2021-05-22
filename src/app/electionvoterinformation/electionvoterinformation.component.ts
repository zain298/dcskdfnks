import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { ElectionvoterinformationService } from "../Electionvoterinformation/Electionvoterinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: 'app-Electionvoterinformation',
  templateUrl: './Electionvoterinformation.component.html',
  styleUrls: ['./Electionvoterinformation.component.css']
})
export class ElectionvoterinformationComponent implements OnInit {

  entitylist=[];
  ElectionvoterinformationAll=[];
  electiontypeActive=[];
  Electionvoterinformation={
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
    private Electionvoterinformationservice:ElectionvoterinformationService,
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

  View(Electionvoterinformation) {
    const url = "view/demo/" + Electionvoterinformation.data.election_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.Electionvoterinformation={
      election_ID: 0,
      title: '',
      surname: '',
     forenames: '',
     electiontype_ID: {},
     electioning_PATH: '',
     isactive: true
    };
    this.getelectionType();
    $("#addModal").modal("show");
  }

  uploadorder(){
    $("#addModal").modal("show");
  }
  Delete(row){
    console.log(row.data.election_ID)
    this.Electionvoterinformationservice.delete(row.data.election_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "election record deleted");
          this.Electionvoterinformation = response;
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
    this.Electionvoterinformation = {
      election_ID: row.data.election_ID,
      title: row.data.title, 
      surname: row.data.surname,
      forenames: row.data.forenames,
      electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      electioning_PATH: row.data.electioning_PATH,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.Electionvoterinformation.isactive = true;
    } else {
      this.Electionvoterinformation.isactive = false;
    }
    this.getelectionType();
    $("#editModal").modal("show");
  }


  // APIs Call Functions

  getAll() {
    this.Electionvoterinformationservice.getAll().subscribe(response => {
      if(response) {
        console.log(response);
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.ElectionvoterinformationAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  add(Electionvoterinformation) {
    if (Electionvoterinformation.electiontype_ID!=null) {
      Electionvoterinformation.electiontype_ID = Electionvoterinformation.electiontype_ID.id;
    } else {
      Electionvoterinformation.electiontype_ID== null;
    }
    this.Electionvoterinformationservice.add(Electionvoterinformation).subscribe(response => {
      if(response) {
        console.log(response);

        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "New election Information Added");
          this.Electionvoterinformation = response;
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

  update(Electionvoterinformation) {
    if (Electionvoterinformation.isactive == true) {
      Electionvoterinformation.isactive = 'Y';
    } else {
      Electionvoterinformation.isactive = 'N';
    }
    if (Electionvoterinformation.electiontype_ID!=null) {
      Electionvoterinformation.electiontype_ID = Electionvoterinformation.electiontype_ID.id;
    } else {
      Electionvoterinformation.electiontype_ID== null;
    }
    this.Electionvoterinformationservice.update(Electionvoterinformation, Electionvoterinformation.election_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.election_ID) {
          this.toastrservice.success("Success", "election Information Updated");
          this.Electionvoterinformation = response;
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

  getelectionType() {
    this.lookupservice.lookup("electionTYPE").subscribe(response => {
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
