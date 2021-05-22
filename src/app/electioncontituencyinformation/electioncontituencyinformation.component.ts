import { DistrictinformationService } from "./../districtinformation/districtinformation.service";

import { Component, OnInit } from "@angular/core";
import { OnFailService } from "../services/on-fail.service";
import { ElectioncontituencyinformationService } from "../electioncontituencyinformation/electioncontituencyinformation.service";
import { ToastrService } from "ngx-toastr";
import { LookupService } from "../lookup/lookup.service";
import { ElectioninformationService } from "./../electioninformation/electioninformation.service";

// import {ElectioninformationService} from "../electioninformation/electioninformation.service";
declare var $: any;

@Component({
  selector: "app-electioncontituencyinformation",
  templateUrl: "./electioncontituencyinformation.component.html",
  styleUrls: ["./electioncontituencyinformation.component.css"],
})
export class ElectioncontituencyinformationComponent implements OnInit {
  entitylist = [];
  electioncontituencyinformationAll = [];
  electioninformationAll = [];
  districtinformationAll = [];
  assemblyType = [];
  currenctRecordData: {};
  electioncontituencyinformation = {
    assembly_ID: 0,
    district_ID: 0,
    contituency_ID: 0,
    election_ID: 0,
    contituency_CODE: "",
    contituency_DESC: "",
    district_NAME: "",
    description: "National Assembly",
    isactive: true,
  };
  orderno = [];
  constructor(
    private electioncontituencyinformationservice: ElectioncontituencyinformationService,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService,
    private lookupservice: LookupService,
    private electioninformationservice: ElectioninformationService,
    private districtinformationService: DistrictinformationService
  ) {}

  ngOnInit() {
    this.getAll();

    for (var i = 0; i <= 50; i++) {
      this.orderno.push({ value: i });
    }
  }

  // Frontend Actions

  View(electioncontituencyinformation) {
    const url =
      "view/demo/" +
      electioncontituencyinformation.data.assembly_ID +
      "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.getDistrictData();
    console.log(this.districtinformationAll);
    this.electioncontituencyinformation = {
      assembly_ID: 0,
      district_ID: 0,
      contituency_ID: 0,
      election_ID: 0,
      contituency_CODE: "",
      contituency_DESC: "",
      description: "",
      district_NAME: "",
      isactive: true,
    };

    this.getAssemblyType();
    $("#addModal").modal("show");
  }

  uploadorder() {
    $("#addModal").modal("show");
  }

  Edit(row) {
    console.log(row);
    this.getContituencyId(row.data.contituency_ID);
    this.getDistrictData();
    this.electioncontituencyinformation = {
      assembly_ID: row.data.assembly_ID,
      district_NAME: row.data.district_NAME,
      district_ID: row.data.district_ID,
      contituency_ID: row.data.contiuency_ID,
      election_ID: row.data.contiuency_ID,
      contituency_CODE: row.data.contituency_CODE,
      contituency_DESC: row.data.contituency_DESC,
      description: row.data.description,
      // electiontype_ID: row.data.electiontype_ID!=null?row.data.electiontype_ID.id:null,
      isactive: true,
    };
    console.log(row);
    if (row.data.isactive == "Y") {
      this.electioncontituencyinformation.isactive = true;
    } else {
      this.electioncontituencyinformation.isactive = false;
    }
    this.getAssemblyType();
    $("#editModal").modal("show");
  }
  // console.log("currentRecordData");
  // console.log(currenctRecordData);
  // APIs Call Functions

  getAll() {
    this.electioncontituencyinformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.electioncontituencyinformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }

  add(electioncontituencyinformation) {
    if ((electioncontituencyinformation.description = "")) {
      electioncontituencyinformation.assembly_ID = this.assemblyType[0].id;
    } else {
      for (let assembly in this.assemblyType) {
        if (
          electioncontituencyinformation.description ==
          this.assemblyType[assembly].description
        ) {
          electioncontituencyinformation.assembly_ID =
            this.assemblyType[assembly].id;
        }
      }
    }
    if ((electioncontituencyinformation.district_NAME = "")) {
      electioncontituencyinformation.district_ID =
        this.districtinformationAll[0].district_ID;
    } else {
      for (let district in this.districtinformationAll) {
        if (
          this.electioncontituencyinformation.district_NAME ==
          this.districtinformationAll[district].district_NAME
        ) {
          electioncontituencyinformation.district_ID =
            this.districtinformationAll[district].district_ID;
        }
      }
    }
    // if (electionblockcodeinformation.areaType == "") {
    //   electionblockcodeinformation.areatype_ID = this.areatypeActive[0].id;
    // } else {
    //   for (let areaType in this.areatypeActive) {
    //     if (
    //       electionblockcodeinformation.areaType ==
    //       this.areatypeActive[areaType].description
    //     ) {
    //       electionblockcodeinformation.areatype_ID =
    //         this.areatypeActive[areaType].id;
    //     }
    //   }
    // }

    if (electioncontituencyinformation.electiontype_ID != null) {
      electioncontituencyinformation.electiontype_ID =
        electioncontituencyinformation.electiontype_ID.id;
    } else {
      electioncontituencyinformation.electiontype_ID == null;
    }
    this.electioncontituencyinformationservice
      .add(electioncontituencyinformation)
      .subscribe(
        (response) => {
          if (response) {
            console.log(response);

            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.assembly_ID) {
              this.toastrservice.success(
                "Success",
                "New Contituency Information Added"
              );
              this.electioncontituencyinformation = response;
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

  update(electioncontituencyinformation) {
    console.log(electioncontituencyinformation);
    if ((electioncontituencyinformation.district_NAME = "")) {
      electioncontituencyinformation.district_ID =
        this.districtinformationAll[0].district_ID;
    } else {
      for (let district in this.districtinformationAll) {
        if (
          this.electioncontituencyinformation.district_NAME ==
          this.districtinformationAll[district].district_NAME
        ) {
          electioncontituencyinformation.district_ID =
            this.districtinformationAll[district].district_ID;
        }
      }
    }
    if ((electioncontituencyinformation.description = "")) {
      electioncontituencyinformation.assembly_ID = this.assemblyType[0].id;
    } else {
      for (let assembly in this.assemblyType) {
        if (
          electioncontituencyinformation.description ==
          this.assemblyType[assembly].description
        ) {
          electioncontituencyinformation.assembly_ID =
            this.assemblyType[assembly].id;
        }
      }
    }
    if (electioncontituencyinformation.isactive == true) {
      electioncontituencyinformation.isactive = "Y";
    } else {
      electioncontituencyinformation.isactive = "N";
    }
    if (electioncontituencyinformation.electiontype_ID != null) {
      electioncontituencyinformation.electiontype_ID =
        electioncontituencyinformation.electiontype_ID.id;
    } else {
      electioncontituencyinformation.electiontype_ID == null;
    }
    this.electioncontituencyinformationservice
      .update(
        electioncontituencyinformation,
        electioncontituencyinformation.assembly_ID
      )
      .subscribe(
        (response) => {
          if (response) {
            if (response.error && response.status) {
              this.toastrservice.warning("Message", " " + response.message);
            } else if (response.assembly_ID) {
              this.toastrservice.success(
                "Success",
                "Contituency Information Updated"
              );
              this.electioncontituencyinformation = response;
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
  getContituencyId(id) {
    console.log("Contituency_ID:" + id);

    this.electioncontituencyinformationservice.getOne(id).subscribe(
      (response) => {
        if (response) {
          console.log("Response" + response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.currenctRecordData = response;
            console.log(this.currenctRecordData);
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }
  getElectionData() {
    this.electioninformationservice.getAll().subscribe(
      (response) => {
        if (response) {
          console.log(response);
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else {
            this.electioninformationAll = response;
          }
        }
      },
      (error) => {
        this.onfailservice.onFail(error);
      }
    );
  }
  getDistrictData() {
    this.districtinformationService.getAll().subscribe(
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
  getAssemblyType() {
    this.assemblyType = [
      {
        id: 1010,
        description: "National Assembly",
      },
      {
        id: 1011,
        description: "Provincnal Assembly",
      },
    ];
  }
}
