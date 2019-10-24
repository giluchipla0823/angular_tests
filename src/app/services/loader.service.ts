import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject(false);
  private active: boolean = true;

  constructor() { }

  setActive(active: boolean) {
    this.active = active;
  }

  isActivated() {
    return this.active;
  }
}
