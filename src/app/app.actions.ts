import {createAction, props} from '@ngrx/store';

export const switchTab = createAction('[Form Component] Switch Tab', props<{ currentTab: number }>());
export const saveForm = createAction('[Form Component] Save Form', props<{ formValue: object }>());
export const resetForm = createAction('[Form Component] Reset Form');
