import { createReducer, on } from '@ngrx/store';
import {loadTabs, resetForm, saveForm, switchTab, tabsLoaded} from './app.actions';

export const initialState = {
  currentTab: 1,
  name: '',
  email: '',
  phone: ''
};

const _formReducer = createReducer(initialState,
  on(switchTab, (state, { currentTab }) => ({ ...state, currentTab })),
  on(tabsLoaded, (state, { tabs }) => ({ ...state, tabs })),
  on(saveForm, (state, { formValue }) => ({
    ...state,
    name: formValue['name'],
    email: formValue['email'],
    phone: formValue['phone']
  })),
  on(resetForm, state => ({ ...state, name: '', email: '', phone: '' }))
);

export function formReducer(state, action) {
  return _formReducer(state, action);
}
