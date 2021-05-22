import { Component, OnInit } from "@angular/core";
import { OnFailService } from "../services/on-fail.service";
import { PoliticalpartycandidateinformationService } from "../politicalpartycandidateinformation/politicalpartycandidateinformation.service";
import { ToastrService } from "ngx-toastr";
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: "app-politicalpartycandidateinformation",
  templateUrl: "./politicalpartycandidateinformation.component.html",
  styleUrls: ["./politicalpartycandidateinformation.component.css"],
})
export class PoliticalpartycandidateinformationComponent implements OnInit {
  entitylist = [];
  politicalpartycandidateinformationAll = [];
  electiontypeActive = [];
  politicalpartycandidateinformation = {
    candidate_ID: 0,
    forenames: "",
    surname: "",
    description: "", //province
    // electiontype_ID: {},
    politicalparty_NAME: "",
    contituency_DESC: "",
    contituency_CODE: "",
    politicalpartyleader_NAME: "",
    politicalpartyleader_DESINATION: "",
    politicalparty_SYMBOL: "",
    politicalparty_ADDRESS: "",
    //description: "", //assembly
    contituency_ID: 0,
    person_ID: 0,
    politicalparty_ID: 0,
    isactive: true,
  };
  orderno = [];
  constructor(
    private politicalpartycandidateinformationservice: PoliticalpartycandidateinformationService,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService,
    private lookupservice: LookupService
  ) {}

  ngOnInit() {
    this.getAll();

    for (var i = 0; i <= 50; i++) {
      this.orderno.push({ value: i });
    }
  }

  // Frontend Actions

  View(politicalpartycandidateinformation) {
    const url =
      "view/demo/" +
      politicalpartycandidateinformation.data.candidate_ID +
      "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  // AddNew() {
  //   this.politicalpartycandidateinformation = {
  //     candidate_ID: 0,
  //     description: "",
  //     surname: "",
  //     forenames: "",
  //     //  electiontype_ID: {},
  //     politicalparty_NAME: "",
  //     contituency: "",
  //     contituencyCode: "",
  //     assembly: "",
  //     isactive: true,
  //   };
  //   // this.getelectionType();
  //   $("#addModal").modal("show");
  // }

  uploadorder() {
    $("#addModal").modal("show");
  }

  // Edit(row) {
  //   this.politicalpartycandidateinformation = {
  //     candidate_ID: row.data.candidate_ID,
  //     description: row.data.description,
  //     surname: row.data.surname,
  //     forenames: row.data.forenames,
  //     // electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
  //     politicalparty_NAME: row.data.politicalparty_NAME,
  //     contituency: row.data.contituency,
  //     contituencyCode: row.data.contituencyCode,
  //     assembly: row.data.assembly,
  //     isactive: true,
  //   };
  //   if (row.data.isactive == "Y") {
  //     this.politicalpartycandidateinformation.isactive = true;
  //   } else {
  //     this.politicalpartycandidateinformation.isactive = false;
  //   }
  //   // this.getelectionType();
  //   $("#editModal").modal("show");
  // }

  // APIs Call Functions

  getAll() {
    this.politicalpartycandidateinformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.politicalpartycandidateinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }

  add(politicalpartycandidateinformation) {
    if (politicalpartycandidateinformation.electiontype_ID != null) {
      politicalpartycandidateinformation.electiontype_ID =
        politicalpartycandidateinformation.electiontype_ID.id;
    } else {
      politicalpartycandidateinformation.electiontype_ID == null;
    }
    this.politicalpartycandidateinformationservice
      .add(politicalpartycandidateinformation)
      .subscribe(
        (response) => {
          if (response) {
            console.log(response);

            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.candidate_ID) {
              this.toastrservice.success(
                "Success",
                "New election Information Added"
              );
              this.politicalpartycandidateinformation = response;
              this.getAll();

              $("#addModal").modal("hide");
            } else {
              this.toastrservice.error("Some thing went wrong");
            }
          }
        },
        (error) => {
          this.onfailservice.onFail(error);
        }
      );
  }
  Delete(row) {
    this.politicalpartycandidateinformationservice
      .delete(row.data.candidate_ID)
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.candidate_ID) {
              this.toastrservice.success(
                "Success",
                "election Information Updated"
              );
              this.politicalpartycandidateinformation = response;
              this.getAll();
              $("#editModal").modal("hide");
            } else {
              this.toastrservice.error("Some thing went wrong");
            }
          }
        },
        (error) => {
          this.onfailservice.onFail(error);
        }
      );
  }
  update(politicalpartycandidateinformation) {
    if (politicalpartycandidateinformation.isactive == true) {
      politicalpartycandidateinformation.isactive = "Y";
    } else {
      politicalpartycandidateinformation.isactive = "N";
    }
    if (politicalpartycandidateinformation.electiontype_ID != null) {
      politicalpartycandidateinformation.electiontype_ID =
        politicalpartycandidateinformation.electiontype_ID.id;
    } else {
      politicalpartycandidateinformation.electiontype_ID == null;
    }
    this.politicalpartycandidateinformationservice
      .update(
        politicalpartycandidateinformation,
        politicalpartycandidateinformation.candidate_ID
      )
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.candidate_ID) {
              this.toastrservice.success(
                "Success",
                "election Information Updated"
              );
              this.politicalpartycandidateinformation = response;
              this.getAll();
              $("#editModal").modal("hide");
            } else {
              this.toastrservice.error("Some thing went wrong");
            }
          }
        },
        (error) => {
          this.onfailservice.onFail(error);
        }
      );
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
