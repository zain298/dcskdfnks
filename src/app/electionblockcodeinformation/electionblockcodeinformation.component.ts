import { Component, OnInit } from "@angular/core";
import { OnFailService } from "../services/on-fail.service";
import { ElectionblockcodeinformationService } from "../electionblockcodeinformation/electionblockcodeinformation.service";
import { ToastrService } from "ngx-toastr";
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: "app-electionblockcodeinformation",
  templateUrl: "./electionblockcodeinformation.component.html",
  styleUrls: ["./electionblockcodeinformation.component.css"],
})
export class ElectionblockcodeinformationComponent implements OnInit {
  entitylist = [];
  electionblockcodeinformationAll = [];
  areatypeActive = [];
  electionblockcodeinformation = {
    blockcode_ID: 0,
    areatype_ID: 0,
    electoralarea: "",
    blockcode: "",
    areaType: "",
    isactive: true,
  };
  orderno = [];
  constructor(
    private electionblockcodeinformationservice: ElectionblockcodeinformationService,
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

  View(electionblockcodeinformation) {
    const url =
      "view/demo/" +
      electionblockcodeinformation.data.election_ID +
      "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.electionblockcodeinformation = {
      blockcode_ID: 0,
      areatype_ID: 0,
      electoralarea: "",
      blockcode: "",
      areaType: "Rural",
      isactive: true,
    };
    this.getAreaType();
    $("#addModal").modal("show");
  }

  uploadorder() {
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.electionblockcodeinformation = {
      areatype_ID: row.data.areatype_ID,
      blockcode_ID: row.data.blockcode_ID,
      electoralarea: row.data.electoralarea,
      blockcode: row.data.blockcode,
      areaType: row.data.areatype_ID.description,
      isactive: true,
    };
    if (row.data.isactive == "Y") {
      this.electionblockcodeinformation.isactive = true;
    } else {
      this.electionblockcodeinformation.isactive = false;
    }
    this.getAreaType();
    $("#editModal").modal("show");
  }

  // APIs Call Functions
  getAll() {
    this.electionblockcodeinformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.electionblockcodeinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }

  add(electionblockcodeinformation) {
    if (electionblockcodeinformation.areaType == "") {
      electionblockcodeinformation.areatype_ID = this.areatypeActive[0].id;
    } else {
      for (let areaType in this.areatypeActive) {
        if (
          electionblockcodeinformation.areaType ==
          this.areatypeActive[areaType].description
        ) {
          electionblockcodeinformation.areatype_ID =
            this.areatypeActive[areaType].id;
        }
      }
    }

    this.electionblockcodeinformationservice
      .add(electionblockcodeinformation)
      .subscribe(
        (response) => {
          if (response) {
            console.log(response);

            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.blockcode_ID) {
              this.toastrservice.success(
                "Success",
                "New Election Information Added"
              );
              this.electionblockcodeinformation = response;
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

  update(electionblockcodeinformation) {
    console.log(electionblockcodeinformation.blockcode_ID);
    if (electionblockcodeinformation.areaType == "") {
      electionblockcodeinformation.areatype_ID = this.areatypeActive[0].id;
    } else {
      for (let areaType in this.areatypeActive) {
        if (
          electionblockcodeinformation.areaType ==
          this.areatypeActive[areaType].description
        ) {
          electionblockcodeinformation.areatype_ID =
            this.areatypeActive[areaType].id;
        }
      }
    }
    if (electionblockcodeinformation.isactive == true) {
      electionblockcodeinformation.isactive = "Y";
    } else {
      electionblockcodeinformation.isactive = "N";
    }
    console.log(electionblockcodeinformation.blockcode_ID);

    this.electionblockcodeinformationservice
      .update(
        electionblockcodeinformation,
        electionblockcodeinformation.blockcode_ID
      )
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.blockcode_ID) {
              this.toastrservice.success(
                "Success",
                "Block Code Information Updated"
              );
              this.electionblockcodeinformation = response;
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
  Delete(row) {
    this.electionblockcodeinformationservice
      .delete(row.data.blockcode_ID)
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.blockcode_ID) {
              this.toastrservice.success("Success", "Block Record Deleted");
              this.electionblockcodeinformation = response;
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
  getAreaType() {
    // this.lookupservice.lookup("ELECTORALAREATYPE").subscribe(response => {
    //   if(response) {
    //     if (response.error && response.status) {
    //       this.toastrservice.warning("Message", " " + response.message);
    //     } else {
    //       this.electiontypeActive = response;
    //     }
    //   }
    // }, error => {
    //   this.onfailservice.onFail(error);
    // })
    this.areatypeActive = [
      {
        id: 1012,
        description: "Rural",
      },
      {
        id: 1013,
        description: "Urban",
      },
    ];
  }
}
