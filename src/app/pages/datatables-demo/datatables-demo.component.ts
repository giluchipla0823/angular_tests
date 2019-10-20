import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Datatables as DatatablesUtils } from '../../utils/Datatables';
import { AuthorsService } from '../../services/authors.service';
import { Select2OptionData } from 'ng2-select2';
import Swal from 'sweetalert2';
import { BooksService } from 'src/app/services/books.service';
import { Select2 as Select2Utils } from '../../utils/Select2';

declare var $;

@Component({
  selector: 'app-datatables-demo',
  templateUrl: './datatables-demo.component.html',
  styleUrls: ['./datatables-demo.component.css']
})
export class DatatablesDemoComponent implements OnInit, AfterViewInit {
  @ViewChild('selectSearchAuthor', {static: false}) select2Author: any;
  @ViewChild('dataTable', {static: false}) table: ElementRef;


  public select2Options: Select2Options = Select2Utils.getDefaultOptions();

  nested: ContainerDatatables = {
    dtOptions: {}
  };

  authors: Data = {
    data: [],
    selected: null,
    loading: false
  };

  publishers: Data = {
    data: [],
    selected: null,
    loading: false
  };

  form: Form = {
    data: {}
  };

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService
  ) { }

  updateEmitter($event) {
    console.log('event emitter', $event);
  }

  ngOnInit() {
    this.loadDatatableOptions();
    this.getAuthors();
  }

  ngAfterViewInit() {
    const vm = this;
    this.nested.table = $(this.table.nativeElement);
    this.nested.dtInstance = this.nested.table.DataTable(this.nested.dtOptions);

    this.nested.table
      .on('click', '.opt-edit', function(event: JQuery.Event) {
        const $this: any = $(this);
        const $row: any = $this.parents('tr[role="row"]');

        console.log('edit');
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

  reloadData(resetPaging: boolean): void {
    DatatablesUtils.reloadData(this.nested.dtInstance, resetPaging);
  }

  getAuthors(): void {
    this.authors.loading = true;

    this.authorsService.getAuthors()
        .subscribe((response: Api) => {
          const authors: Array<Select2OptionData> = response.data.map((author: Author) => {
            return {
              id: author.id,
              text: author.name,
            };
          });

          this.authors.data = authors;
          this.authors.loading = false;
        });
  }

  eventChangeSelect(e: any, field: string): void {
    const value = e.value;

    delete this.form.data[field];

    if (value) {
      this.form.data[field] = {
        id: value
      };
    }

    this.reloadData(true);
  }

  clearForm(): void {
    const select2Elements: any[] = [
      {
        element: this.select2Author.element,
        field: 'author'
      }
    ];

    select2Elements.forEach( item  => {
      item.element.val(null).trigger('change');

      this.eventChangeSelect({value: null, data: []}, item.field);
    });
  }

}
