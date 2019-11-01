import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {loadTabs, resetForm, saveForm, switchTab} from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentTab: number;
  formValue: { name: string, email: string, phone: string } = {
    name: '',
    email: '',
    phone: ''
  };
  tabs: { id: number, title: string, placeholder: string, ref: string }[];
  signUpForm: FormGroup;

  constructor(private store: Store<{ form: object }>) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', Validators.required),
    });

    store.pipe(select('form')).subscribe(data => {
      this.currentTab = data.currentTab;

      this.tabs = data.tabs;

      this.formValue.name = data.name;

      this.formValue.email = data.email;

      this.formValue.phone = data.phone;
    });
  }

  ngOnInit() {
    this.store.dispatch(loadTabs());
  }

  isErrorVisible(field: string, error: string) {
    return this.signUpForm.controls[field].dirty
      && this.signUpForm.controls[field].errors
      && this.signUpForm.controls[field].errors[error];
  }

  switchTab(currentTab) {
    this.store.dispatch(switchTab({ currentTab }));
  }

  onSubmit(formValue) {
    this.store.dispatch(switchTab({ currentTab: 0 }));

    this.store.dispatch(saveForm({ formValue }));
  }

  onReset() {
    this.store.dispatch(switchTab({ currentTab: 1 }));

    this.store.dispatch(resetForm());

    this.signUpForm.reset();
  }
}
