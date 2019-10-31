import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {resetForm, saveForm, switchTab} from './app.actions';
import {stringify} from 'querystring';

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
  tabs: { id: number, title: string, placeholder: string, ref: string }[] = [
    {
      id: 1,
      title: 'Name',
      placeholder: 'Enter your name...',
      ref: 'name'
    },
    {
      id: 2,
      title: 'Email',
      placeholder: 'Enter your email...',
      ref: 'email'
    },
    {
      id: 3,
      title: 'Phone',
      placeholder: 'Enter your phone...',
      ref: 'phone'
    }
  ];
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

      this.formValue.name = data.name;

      this.formValue.email = data.email;

      this.formValue.phone = data.phone;
    });
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
