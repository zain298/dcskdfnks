import { Component, OnInit } from "@angular/core";
import { OnFailService } from "../services/on-fail.service";
import { PoliticalpartyinformationService } from "../politicalpartyinformation/politicalpartyinformation.service";
import { ToastrService } from "ngx-toastr";
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: "app-politicalpartyinformation",
  templateUrl: "./politicalpartyinformation.component.html",
  styleUrls: ["./politicalpartyinformation.component.css"],
})
export class PoliticalpartyinformationComponent implements OnInit {
  entitylist = [];
  politicalpartyinformationAll = [];
  electiontypeActive = [];
  politicalpartyinformation = {
    politicalparty_ID: 0,
    politicalparty_NAME: "",
    politicalparty_SYMBOL: "",
    politicalpartyleader_NAME: "",
    // electiontype_ID: {},
    politicalparty_ADDRESS: "",
    isactive: true,
  };
  orderno = [];
  constructor(
    private politicalpartyinformationservice: PoliticalpartyinformationService,
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

  View(politicalpartyinformation) {
    const url =
      "view/demo/" +
      politicalpartyinformation.data.politicalparty_ID +
      "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.politicalpartyinformation = {
      politicalparty_ID: 0,
      politicalparty_NAME: "",
      politicalparty_SYMBOL: "",
      politicalpartyleader_NAME: "",
      //  electiontype_ID: {},
      politicalparty_ADDRESS: "",
      isactive: true,
    };
    // this.getelectionType();
    $("#addModal").modal("show");
  }

  uploadorder() {
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.politicalpartyinformation = {
      politicalparty_ID: row.data.politicalparty_ID,
      politicalparty_NAME: row.data.politicalparty_NAME,
      politicalparty_SYMBOL: row.data.politicalparty_SYMBOL,
      politicalpartyleader_NAME: row.data.politicalpartyleader_NAME,
      // electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      politicalparty_ADDRESS: row.data.politicalparty_ADDRESS,
      isactive: true,
    };
    if (row.data.isactive == "Y") {
      this.politicalpartyinformation.isactive = true;
    } else {
      this.politicalpartyinformation.isactive = false;
    }
    // this.getelectionType();
    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.politicalpartyinformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.politicalpartyinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }

  add(politicalpartyinformation) {
    if (politicalpartyinformation.electiontype_ID != null) {
      politicalpartyinformation.electiontype_ID =
        politicalpartyinformation.electiontype_ID.id;
    } else {
      politicalpartyinformation.electiontype_ID == null;
    }
    this.politicalpartyinformationservice
      .add(politicalpartyinformation)
      .subscribe(
        (response) => {
          if (response) {
            console.log(response);

            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.politicalparty_ID) {
              this.toastrservice.success(
                "Success",
                "New election Information Added"
              );
              this.politicalpartyinformation = response;
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
    this.politicalpartyinformationservice
      .delete(row.data.politicalparty_ID)
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.politicalparty_ID) {
              this.toastrservice.success(
                "Success",
                "election Information Updated"
              );
              this.politicalpartyinformation = response;
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
  update(politicalpartyinformation) {
    if (politicalpartyinformation.isactive == true) {
      politicalpartyinformation.isactive = "Y";
    } else {
      politicalpartyinformation.isactive = "N";
    }
    if (politicalpartyinformation.electiontype_ID != null) {
      politicalpartyinformation.electiontype_ID =
        politicalpartyinformation.electiontype_ID.id;
    } else {
      politicalpartyinformation.electiontype_ID == null;
    }
    this.politicalpartyinformationservice
      .update(
        politicalpartyinformation,
        politicalpartyinformation.politicalparty_ID
      )
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.politicalparty_ID) {
              this.toastrservice.success(
                "Success",
                "election Information Updated"
              );
              this.politicalpartyinformation = response;
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
