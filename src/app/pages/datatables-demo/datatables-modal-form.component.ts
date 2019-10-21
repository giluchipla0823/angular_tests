import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Select2 as Select2Utils } from '../../utils/Select2';
import { AuthorsService } from '../../services/authors.service';
import { Select2OptionData } from 'ng2-select2';
import { ReactiveForm } from '../../utils/ReactiveForm';
import { BooksService } from '../../services/books.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-datatables-modal-form',
  templateUrl: './datatables-modal-form.component.html',
  styleUrls: ['./datatables-modal-form.component.css']
})
export class DatatablesModalFormComponent implements OnInit, AfterViewInit {
  @Input() modalRef: BsModalRef;
  @Output() reloadData: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('selectAuthor', {static: false}) selectAuthor: any;

  public select2Options: Select2Options = Select2Utils.getDefaultOptions();

  authors: Data = {
    data: [],
    selected: null,
    loading: false
  };

  id: number;
  form: ReactiveForm = new ReactiveForm();

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.getAuthors();
  }

  ngAfterViewInit() {
    Select2Utils.setAttributesToValidate(this.selectAuthor.element, 'author_id');
  }

  initializeForm(): void {
    const data: any = this.modalRef.content.data;

    this.id = data.id || null;

    this.form.container = this.formBuilder.group({
      author_id: [data.authorId || '', Validators.required],
      publisher_id: [data.publisherId || 1, Validators.required],
      title: [data.title || '', Validators.required],
      summary: [data.summary || '', Validators.required],
      description: [data.description || '', Validators.required],
      quantity: [data.quantity || 5, Validators.required],
      price: [data.price || '10.00', Validators.required],
      genres: [data.genres || 1, Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.form.container.controls; }

  accept(): void {
    const data: any = this.form.container.value;
    const isNewRecord: boolean = this.id ? false : true;

    this.booksService.createOrUpdateBook(data, this.id)
        .subscribe((response: Api) => {
            Swal.fire({
              title: 'Success',
              text: response.message,
              type: 'success'
            });

            this.reloadData.emit(isNewRecord);
            this.close();
        });
  }

  close() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
  }

  getAuthors(): void {
    this.authors.loading = true;

    this.authorsService.getAuthors()
        .subscribe((response: Api) => {
        
          const authors: Array<Select2OptionData> = response.data.map((author: Author) => {
            const id: number = author.id;
            
            return {
              id,
              text: author.name,
              selected: this.f.author_id.value === id
            };
          });

          this.authors.data = authors;
          this.authors.loading = false;
        });
  }

  eventChangeSelect(e: any, field: string): void {
    const value = e.value;
    const control = this.f[field];

    control.setValue('');

    if (value) {
      control.markAsDirty();
      control.setValue(value);
    }
  }
}