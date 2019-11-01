import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {loadTabs, resetForm, saveForm, switchTab} from './app.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  public currentTab: number;
  public formValue: { name: string, email: string, phone: string } = {
    name: '',
    email: '',
    phone: ''
  };
  public tabs: { id: number, title: string, placeholder: string, ref: string }[];
  public signUpForm: FormGroup;

  constructor(private store: Store<{ form: object }>) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', Validators.required),
    });

    this.subscription.add(this.store.pipe(select('form')).subscribe(data => {
      this.currentTab = data.currentTab;

      this.tabs = data.tabs;

      this.formValue.name = data.name;

      this.formValue.email = data.email;

      this.formValue.phone = data.phone;
    }));

    this.store.dispatch(loadTabs());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
