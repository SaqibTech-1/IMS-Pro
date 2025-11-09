import { Component, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() form!: FormGroup;
  @Input() fields:{name:string; label:string;type:string}[]= [];
  @Input() submitForm= new EventEmitter<any>();

  OnSubmit(){
    if (this.form.valid) {
      this.submitForm.emit(this.form.value)
    }
  }

}
