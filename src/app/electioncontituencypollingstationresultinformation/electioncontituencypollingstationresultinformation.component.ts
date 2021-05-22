import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { ElectioncontituencypollingstationresultinformationService } from "../electioncontituencypollingstationresultinformation/electioncontituencypollingstationresultinformation.service";
import { ToastrService } from 'ngx-toastr';
import { LookupService } from "../lookup/lookup.service";
// import { }

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
    pollingstationresult_ID: 0,
    stationName: '',
    votesObtained: '',
    contituencyCode: '',
    // electiontype_ID: {},
    electionDATE: '',
    district: '',
    province: '',
    isactive: true

  };

  pollingStationResultInformationPostObject={
    pollingstationresult_ID: 0,
    pollingstation_ID: 0,
    obtained_VOTES: 0,
    candidate_ID: 0,
    resultfrom_ID:0
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
    const url = "view/demo/" + electioncontituencypollingstationresultinformation.data.pollingstationresult_ID  + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {

    this.electioncontituencypollingstationresultinformation={
      pollingstationresult_ID: 0,
      stationName: '',
      votesObtained: '',
     contituencyCode: '',
    //  electiontype_ID: {},
     electionDATE: '',
     district: '',
     province: '',
     isactive: true
    };
    // this.getElectionType();
    $("#addModal").modal("show");
  }

  uploadorder(){
    $("#addModal").modal("show");
  }

  Edit(row) {
    console.log(row.data.pollingstation_ID.assembly_ID.contituency_CODE)
    console.log(row.data.obtained_VOTES)
    this.electioncontituencypollingstationresultinformation = {
      pollingstationresult_ID: row.data.pollingstationresult_ID,
      stationName: row.data.stationName, 
      votesObtained: row.data.obtained_VOTES,
      contituencyCode: row.data.pollingstation_ID.assembly_ID.contituency,
      // electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      electionDATE: row.data.electionDATE,
      district: row.data.district,
     province: row.data.province,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.electioncontituencypollingstationresultinformation.isactive = true;
    } else {
      this.electioncontituencypollingstationresultinformation.isactive = false;
    }
    // this.getElectionType();
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
        } else if (response.pollingstationresult_ID) {
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
  Delete(row){
    this.electioncontituencypollingstationresultinformationservice.delete(row.data.pollingstationresult_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.pollingstationresult_ID) {
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
    this.electioncontituencypollingstationresultinformationservice.update(electioncontituencypollingstationresultinformation, electioncontituencypollingstationresultinformation.pollingstationresult_ID).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.pollingstationresult_ID) {
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

  // getElectionType() {
  //   this.lookupservice.lookup("DRIVERTYPE").subscribe(response => {
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
