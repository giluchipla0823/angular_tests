import { FormGroup } from '@angular/forms';

export class ReactiveForm {
    public container?: FormGroup;
    public submitted?: boolean;

    constructor() {
        this.submitted = false;
    }
}