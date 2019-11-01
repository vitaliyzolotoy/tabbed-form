import {createAction, props} from '@ngrx/store';

export const loadTabs = createAction('[Form Component] Load Tabs');
export const tabsLoaded = createAction('[Tabs API] Tabs Loaded Success', props<{ tabs: object[] }>());
export const switchTab = createAction('[Form Component] Switch Tab', props<{ currentTab: number }>());
export const saveForm = createAction('[Form Component] Save Form', props<{ formValue: object }>());
export const resetForm = createAction('[Form Component] Reset Form');
