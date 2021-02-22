import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { OnFailService } from "../../services/on-fail.service";
import { LookupService } from "../../lookup/lookup.service";
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-user-view',
  templateUrl: './demo-view.component.html',
  styleUrls: ['./demo-view.component.css']
})

export class DemoViewComponent implements OnInit {

  // All Component Level Variables Declaration
  entitylist=[];
  lookup={
    id: 0,
    entityname: '',
    code: '',
    description: '',
    entity_STATUS: '',
    isactive: true
  };

  constructor(
    private lookupservice: LookupService,
    private activeroute: ActivatedRoute,
    private onfailservice: OnFailService,
    private toastrservice: ToastrService
  ) { }

  ngOnInit() {
    const routeParams = this.activeroute.snapshot.params;
    this.getOne(routeParams.id);
  }

  Edit() {
    $("#editModal").modal("show");
  }

  // APIs Call Functions

  getOne(id) {
    this.lookupservice.getOne(id).subscribe(response => {
      if(response) {
        this.lookup = response;
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  update(lookup) {
    this.lookupservice.update(lookup, lookup.id).subscribe(response => {
      if(response) {
        this.lookup = response;
        $("#editModal").modal("hide");
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
