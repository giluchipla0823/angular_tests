import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Datatables as DatatablesUtils } from '../../utils/Datatables';

import Swal from 'sweetalert2';

import { BooksService } from '../../services/books.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

declare var $;

@Component({
  selector: 'app-datatables-demo',
  templateUrl: './datatables-demo.component.html',
  styleUrls: ['./datatables-demo.component.css']
})
export class DatatablesDemoComponent implements OnInit, AfterViewInit {
  @ViewChild('template', {static: false}) template: TemplateRef<any>;
  @ViewChild('dataTable', {static: false}) table: ElementRef;

  public modalRef: BsModalRef;

  nested: ContainerDatatables = {
    dtOptions: {}
  };

  form: Form = {
    data: {}
  };


  constructor(
    private modalService: BsModalService,
    private booksService: BooksService
  ) { }

  ngOnInit() {
    this.loadDatatableOptions();
  }

  ngAfterViewInit() {
    const vm = this;
    this.nested.table = $(this.table.nativeElement);
    this.nested.dtInstance = this.nested.table.DataTable(this.nested.dtOptions);

    this.nested.table
      .on('click', '.opt-edit', function(event: JQuery.Event) {
        const id: number = $(this).data('id');

        vm.getBook(id);
      })
      .on('click', '.opt-delete', function(event: JQuery.Event) {
        const id: number = $(this).data('id');

        Swal.fire({
          title: 'Confirm',
          text: 'Do you want to delete the selected book?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then(confirm => {
          console.log('confirm', confirm);

          if (confirm.value) {
            vm.deleteBook(id);
          }
        });
      });
  }

  deleteBook(id: number): void {
    this.booksService.deleteBook(id)
        .subscribe((response: Api) => {
            Swal.fire(
              'Success',
              response.message,
              'success'
            );

            this.reloadData(false);
        });
  }

  loadDatatableOptions(): void {
    this.nested.dtOptions = {
      initComplete: DatatablesUtils.initComplete,
      responsive: true,
      dom: DatatablesUtils.DOM,
      lengthMenu: DatatablesUtils.LENGTH_MENU,
      serverSide: true,
      processing: true,
      ajax: {
        url: 'http://127.0.0.1:8000/api/books',
        method: 'GET',
        data: (d: any) => {
          d.listFormat = 'datatables';
          d.includes = 'author,genres';

          for (const i in this.form.data) {
            if (this.form.data[i]) {
              d[i] = this.form.data[i];
            }
          }
        },
        dataFilter: DatatablesUtils.getAjaxDataFilter,
        dataSrc: DatatablesUtils.getAjaxDataSrc,
      },
      columns: [
        {
          title: 'ID',
          data: 'id',
          name: 'id',
          className: 'dt-body-center'
        },
        {
          title: 'Title',
          data: 'title',
          name: 'title',
          width: '25%'
        },
        {
          title: 'Description',
          data: 'description',
          name: 'description'
        },
        {
          title: 'Author',
          data: 'author',
          name: 'author.name',
          render: (data: Author, type: any, full: any) => {
            return data.name;
          }
        },
        {
          title: 'Actions',
          render: (data: any, type: string, full: Book) => {
            const id = full.id;

            return `<div class="dt-actions">
                      <i class="fa fa-pencil icon-dt opt-edit blue"
                         data-toggle="tooltip"
                         data-placement="top"
                         title="Edit"
                         data-id="${id}"></i>
                      <i class="fa fa-trash icon-dt opt-delete grey"
                         data-toggle="tooltip"
                         data-placement="top"
                         title="Delete"
                         data-id="${id}"></i>
                    </div>`;
          }
        }
      ],
      drawCallback: (settings: any) => {

      },
      rowCallback: (row: Node, data: Book[] | Object, index: number) => {
        $(row).data(data);

        return row;
      }
    };
  }

  getBook(id: number) {
    this.booksService.getBook(id)
        .subscribe((response: Api) => {
            this.openModal(response.data);
        });
  }

  reloadData(resetPaging: boolean): void {
    console.log('reloadData', resetPaging);

    DatatablesUtils.reloadData(this.nested.dtInstance, resetPaging);
  }

  updateSearchForm($event: any): void {
    this.form.data = $event;

    this.reloadData(true);
  }

  openModal(data: any) {
    this.modalRef = this.modalService.show(
      this.template,
      {
        backdrop: 'static',
        keyboard: false
      }
    );

    this.modalRef.content = {
      title: 'Create Book',
      data
    };
  }
}
