import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { Select2 as Select2Utils } from '../../utils/Select2';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-datatables-search-form',
  templateUrl: './datatables-search-form.component.html',
  styleUrls: ['./datatables-search-form.component.css']
})
export class DatatablesSearchFormComponent implements OnInit {
  @ViewChild('selectSearchAuthor', {static: false}) select2Author: any;
  @Output() updateForm: EventEmitter<any> = new EventEmitter();

  public select2Options: Select2Options = Select2Utils.getDefaultOptions();

  form: Form = {
    data: {}
  };

  authors: Data = {
    data: [],
    selected: null,
    loading: false
  };

  constructor(
    private authorsService: AuthorsService
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  search() {
    this.updateForm.emit(this.form.data);
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

    this.search();
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
