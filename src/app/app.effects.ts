import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppService } from './app.service';
import {switchTab, tabsLoaded} from './app.actions';
import {Store} from '@ngrx/store';

@Injectable()
export class AppEffects {

  loadTabs = createEffect(() => this.actions$.pipe(
    ofType('[Form Component] Load Tabs'),
    mergeMap(() => this.appService.getTabs()
      .pipe(
        map(tabs => this.store.dispatch(tabsLoaded({ tabs }))),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private appService: AppService,
    private store: Store<{ form: object }>
  ) {}
}
