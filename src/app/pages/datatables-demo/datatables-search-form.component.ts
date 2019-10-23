import { Component, OnInit, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { Select2 as Select2Utils } from '../../utils/Select2';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-datatables-search-form',
  templateUrl: './datatables-search-form.component.html',
  styleUrls: ['./datatables-search-form.component.css']
})
export class DatatablesSearchFormComponent implements OnInit, AfterViewInit {
  @ViewChild('selectSearchAuthor', {static: false}) select2Author: any;
  @Output() updateForm: EventEmitter<any> = new EventEmitter();

  form: Form = {
    data: {}
  };

  authors: Select2Data = {
    data: [],
    options: Select2Utils.getDefaultOptions(),
    selected: null,
    disabled: false
  };

  constructor(
    private authorsService: AuthorsService
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  ngAfterViewInit() {
    // console.log(this.select2Author);
    // Select2Utils.setEventToCloseWhenUnselecting(this.select2Author.element);
    //setTimeout(() => {
      Select2Utils.setEventToCloseWhenUnselecting();
    //}, 0);
  }

  search() {
    this.updateForm.emit(this.form.data);
  }

  getAuthors(): void {
    this.authors.disabled = true;

    this.authorsService.getAuthors()
        .subscribe((response: Api) => {
          const authors: Array<Select2OptionData> = response.data.map((author: Author) => {
            return {
              id: author.id,
              text: author.name,
            };
          });

          this.authors.data = authors;
          this.authors.disabled = false;
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
