import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {map, catchError, switchMap} from 'rxjs/operators';
import { AppService } from './app.service';
import {tabsLoaded} from './app.actions';

@Injectable()
export class AppEffects {

  loadTabs = createEffect(() => this.actions$.pipe(
    ofType('[Form Component] Load Tabs'),
    switchMap(() => this.appService.getTabs()
      .pipe(
        map(tabs => tabsLoaded({ tabs })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private appService: AppService
  ) {}
}
