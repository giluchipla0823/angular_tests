import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-datatables-form',
  templateUrl: './datatables-form.component.html',
  styleUrls: ['./datatables-form.component.css']
})
export class DatatablesFormComponent implements OnInit {
  @Output() cambioValor: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  testEvent() {
    console.log('test event');
    this.cambioValor.emit(true);
  }

}
