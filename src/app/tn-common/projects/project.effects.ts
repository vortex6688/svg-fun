import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import { ProjectService } from './project.service';
import { ProjectActions } from './project.actions';
import { Project } from './project.model';

@Injectable()
export class ProjectEffects {

  @Effect()
  public loadData$: Observable<any> = defer(() => this.projectService.find({})
    .map((projects) => this.projectActions.addProjects(projects))
    .catch(() => of())
  );

  @Effect()
  public createProject$: Observable<Action> = this.actions$
    .ofType(ProjectActions.CREATE_PROJECT)
    .map((action) => action.payload as Project)
    .switchMap((project) =>
      this.projectService.save(project)
        .map((addedProject) => this.projectActions.createProjectSuccess(addedProject))
        .catch(() => of(this.projectActions.createProjectFail(project)))
    );

  @Effect()
  public updateProject$: Observable<Action> = this.actions$
    .ofType(ProjectActions.UPDATE_PROJECT)
    .map((action) => action.payload as Project)
    .switchMap((project) =>
      this.projectService.save(project)
        .map((updatedProject) => this.projectActions.updateProjectSuccess(updatedProject))
        .catch(() => of(this.projectActions.updateProjectFail(project)))
    );

  @Effect()
  public removeProject$: Observable<Action> = this.actions$
    .ofType(ProjectActions.REMOVE_PROJECT)
    .map((action) => action.payload as Project)
    .switchMap((project) =>
      this.projectService.delete(project)
        .map(() => this.projectActions.removeProjectSuccess(project))
        .catch(() => of(this.projectActions.removeProjectFail(project)))
    );

  constructor(private actions$: Actions, private projectService: ProjectService,
              private projectActions: ProjectActions) {}
}
