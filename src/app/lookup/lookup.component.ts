import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../services/on-fail.service";
import { LookupService } from "./lookup.service";
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {

  // All Component Level Variables Declaration
  entitylist=[];
  lookupAll=[];
  lookup={
      id: 0,
      entityname: '',
      code: '',
      description: '',
      entity_STATUS: '',
      isactive: true
  };
  orderno=[];

  constructor(
    private lookupservice: LookupService,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService
  ) { }

  ngOnInit() {
    this.getAll();
    this.getAllEntityList();

    for (var i = 0; i <= 50; i++) {
      this.orderno.push({ value: i });
    }
  }


  // Frontend Actions 

  View(lookup) {
    const url = "view/demo/" + lookup.data.id + "/DemoviewOne";
    window.open(location.origin + location.pathname + "#/" + url);
  }

  AddNew() {
    this.lookup = {
      id: 0,
      entityname: '',
      code: '',
      description: '',
      entity_STATUS: '',
      isactive: true
    };
    $("#addModal").modal("show");
  }

  Edit(row) {
    this.lookup = {
      id: row.data.id,
      entityname: row.data.entityname,
      code: row.data.code,
      description: row.data.description,
      entity_STATUS: row.data.entity_STATUS,
      isactive: true
    };
    if (row.data.isactive == "Y") {
      this.lookup.isactive = true;
    } else {
      this.lookup.isactive = false;
    }

    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getAll() {
    this.lookupservice.getAll().subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.lookupAll = response;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  add(lookup) {
    this.lookupservice.add(lookup).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.id) {
          this.toastrservice.success("Success", "New Product Category Added");
          this.lookup = response;
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

  update(lookup) {
    if (lookup.isactive == true) {
      lookup.isactive = 'Y';
    } else {
      lookup.isactive = 'N';
    }

    this.lookupservice.update(lookup, lookup.id).subscribe(response => {
      if(response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.id) {
          this.toastrservice.success("Success", "Product Category Updated");
          this.lookup = response;
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

  getAllEntityList(){
    this.lookupservice.entityList().subscribe(res => {
      if(res) {
        this.entitylist = res;
      }
    } , error => {
      this.onfailservice.onFail(error);
    })
  }
}
