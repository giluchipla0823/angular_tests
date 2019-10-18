import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-datatables-demo',
  templateUrl: './datatables-demo.component.html',
  styleUrls: ['./datatables-demo.component.css']
})
export class DatatablesDemoComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      initComplete: (settings: any, json: any) => {
          
          const tableId = settings.sTableId;
          const $_table = $('#' + tableId);
          const $_panel = $_table.parents('.card');
  
          // const $_containerLength = $_panel.find('.dt-select-length');
          const $_containerInfoResults = $_panel.find('.dt-info-results');
          const $_containerPagination = $_panel.find('.dt-pagination');
  
          // $_containerLength.children().remove();
          $_containerInfoResults.children().remove();
          $_containerPagination.children().remove();
  
          // const $_datatableLength = $_panel.find('.dataTables_length');
          const $_datatableInfo = $_panel.find('.dataTables_info');
          const $_datatablePaginate = $_panel.find('.dataTables_paginate');
  
          // $_datatableLength.appendTo($_containerLength);
          $_containerInfoResults.append($_datatableInfo);
          $_containerPagination.append($_datatablePaginate);
          
      },
      dom: `<\'hide\'lt><\'row\'<\'col-sm-12\'tr>><\'hide\'ip>`,
      ajax: 'assets/data/persons.json',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }]
    };
  }

}
