import { Component, OnInit } from "@angular/core";
import { OnFailService } from "../services/on-fail.service";
import { DistrictinformationService } from "../districtinformation/districtinformation.service";
import { ToastrService } from "ngx-toastr";
import { LookupService } from "../lookup/lookup.service";

declare var $: any;

@Component({
  selector: "app-districtinformation",
  templateUrl: "./districtinformation.component.html",
  styleUrls: ["./districtinformation.component.css"],
})
export class DistrictinformationComponent implements OnInit {
  entitylist = [];
  districtinformationAll = [];
  provincetypeActive = [];
  districtinformation = {
    district_ID: 0,
    district_CODE: "",
    district_NAME: "",
    description: "",
    provinces_ID: 0,
    // electiontype_ID: {},
    // electioning_PATH: '',
    isactive: true,
  };
  orderno = [];
  constructor(
    private districtinformationservice: DistrictinformationService,
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

  View(districtinformation) {
    const url =
      "view/demo/" + districtinformation.data.district_ID + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.districtinformation = {
      district_ID: 0,
      district_CODE: "",
      district_NAME: "",
      description: "",
      provinces_ID: 0,
      //  electioning_PATH: '',
      isactive: true,
    };
    this.getProvinceType();
    $("#addModal").modal("show");
  }

  uploadorder() {
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.districtinformation = {
      district_ID: row.data.district_ID,
      district_CODE: row.data.district_CODE,
      district_NAME: row.data.district_NAME,
      provinces_ID: row.data.provinces_ID,
      description: row.data.description,
      // electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      // electioning_PATH: row.data.electioning_PATH,
      isactive: true,
    };
    if (row.data.isactive == "Y") {
      this.districtinformation.isactive = true;
    } else {
      this.districtinformation.isactive = false;
    }
    this.getProvinceType();
    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.districtinformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.districtinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }

  add(districtinformation) {
    if ((districtinformation.description = "")) {
      districtinformation.provinces_ID = this.provincetypeActive[0].id;
    } else if (districtinformation.descripton != "") {
      for (let province in this.provincetypeActive) {
        if (
          (districtinformation.description =
            this.provincetypeActive[province].description)
        ) {
          districtinformation.provinces_ID =
            this.provincetypeActive[province].id;
        }
      }
    }
    if (districtinformation.electiontype_ID != null) {
      districtinformation.electiontype_ID =
        districtinformation.electiontype_ID.id;
    } else {
      districtinformation.electiontype_ID == null;
    }
    this.districtinformationservice.add(districtinformation).subscribe(
      (response) => {
        if (response) {
          console.log(response);

          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else if (response.district_ID) {
            this.toastrservice.success(
              "Success",
              "New election Information Added"
            );
            this.districtinformation = response;
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
    this.districtinformationservice.delete(row.data.district_ID).subscribe(
      (response) => {
        if (response) {
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else if (response.district_ID) {
            this.toastrservice.success(
              "Success",
              "election Information Updated"
            );
            this.districtinformation = response;
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
  update(districtinformation) {
    if ((districtinformation.description = "")) {
      districtinformation.provinces_ID = this.provincetypeActive[0].id;
    } else if (districtinformation.descripton != "") {
      for (let province in this.provincetypeActive) {
        if (
          (districtinformation.description =
            this.provincetypeActive[province].description)
        ) {
          districtinformation.provinces_ID =
            this.provincetypeActive[province].id;
        }
      }
    }

    // if ((electioncontituencyinformation.description = "")) {
    //   electioncontituencyinformation.assembly_ID = this.assemblyType[0].id;
    // } else {
    //   for (let assembly in this.assemblyType) {
    //     if (
    //       electioncontituencyinformation.description ==
    //       this.assemblyType[assembly].description
    //     ) {
    //       electioncontituencyinformation.assembly_ID =
    //         this.assemblyType[assembly].id;
    //     }
    //   }
    // }

    if (districtinformation.isactive == true) {
      districtinformation.isactive = "Y";
    } else {
      districtinformation.isactive = "N";
    }
    // if (districtinformation.electiontype_ID != null) {
    //   districtinformation.electiontype_ID =
    //     districtinformation.electiontype_ID.id;
    // } else {
    //   districtinformation.electiontype_ID == null;
    // }
    this.districtinformationservice
      .update(districtinformation, districtinformation.district_ID)
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.district_ID) {
              this.toastrservice.success(
                "Success",
                "election Information Updated"
              );
              this.districtinformation = response;
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
  getProvinceType() {
    this.provincetypeActive = [
      {
        id: 102,
        description: "Punjab",
      },
      {
        id: 1003,
        description: "Balochistan",
      },
      {
        id: 1004,
        description: "KPK",
      },
      {
        id: 1005,
        description: "Sindh",
      },
    ];
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
