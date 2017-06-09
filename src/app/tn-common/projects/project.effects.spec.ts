import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { ProjectService } from './project.service';
import { ProjectActions } from './project.actions';
import { ProjectEffects } from './project.effects';
import { Project } from './project.model';
import { License } from '../licenses';
import { initialProjectState } from './project.state';

describe('ProjectEffects', () => {
  const licenseMock: License = {
    id: 123,
    order: 1,
    price: '22.0000',
    price_paid: '22.0000',
    qty: 2,
    start: null,
    end: null,
    style: 286,
    years: null,
    active: true,
    license_type: 'app'
  };

  const projectMock: Project = {
    id: 123,
    name: 'Project 1',
    user: 1,
    domains: '["project1.com"]',
    created: '2017-03-05T18:16:50Z',
    licenses: [licenseMock],
    family_count: 1,
    style_count: 1,
  };

  const mockProjects = [
    { ...projectMock, id: 12345 },
    { ...projectMock, id: 234543123 },
  ];

  let runner: EffectsRunner;
  let projectEffects: ProjectEffects;
  let projectActions: ProjectActions;
  let projectService: MockProjectService;

  class MockProjectService {
    public find(query: object): Observable<Project[]> {
      return Observable.of(mockProjects);
    }
    public save(project: Project): Observable<Project> {
      return Observable.of(project);
    }
    public delete(project: Project): Observable<Project> {
      return Observable.of(project);
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      ProjectActions,
      ProjectEffects,
      {
        provide: ProjectService,
        useClass: MockProjectService,
      },
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    projectService = TestBed.get(ProjectService);
    projectActions = TestBed.get(ProjectActions);
    projectEffects = TestBed.get(ProjectEffects);
  });

  describe('loadProjects$', () => {
    it('should return loadProjectsSuccess on load success', () => {
      const expectedResult = projectActions.loadProjectsSuccess(mockProjects);
      runner.queue(projectActions.loadProjects());

      let result = null;
      projectEffects.loadProjects$.subscribe((data) => result = data);
      expect(result).toEqual(expectedResult);
    });

    it('should return loadProjectsFail on load failure', () => {
      const errorValue = 'error';
      spyOn(projectService, 'find').and.returnValue(Observable.throw(errorValue));
      runner.queue(projectActions.loadProjects());
      projectEffects.loadProjects$.subscribe((result) => {
        expect(result).toEqual(projectActions.loadProjectsFail(errorValue));
      });
    });
  });

  describe('createProject$', () => {
    it('should return a createProjectSuccess, with the project, on success add', () => {
      runner.queue(projectActions.createProject(projectMock));
      projectEffects.createProject$.subscribe((result) => {
        expect(result).toEqual(projectActions.createProjectSuccess(projectMock));
      });
    });

    it('should return a createProjectFail action, on service error', () => {
      spyOn(projectService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(projectActions.createProject(projectMock));
      projectEffects.createProject$.subscribe((result) => {
        expect(result).toEqual(projectActions.createProjectFail(projectMock));
      });
    });
  });

  describe('updateProject$', () => {
    it('should return a updateProjectSuccess action, with the project, on success update', () => {
      runner.queue(projectActions.updateProject(projectMock));
      projectEffects.updateProject$.subscribe((result) => {
        expect(result).toEqual(projectActions.updateProjectSuccess(projectMock));
      });
    });

    it('should return a updateProjectFail action, on service error', () => {
      spyOn(projectService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(projectActions.updateProject(projectMock));
      projectEffects.updateProject$.subscribe((result) => {
        expect(result).toEqual(projectActions.updateProjectFail(projectMock));
      });
    });
  });

  describe('removeProject$', () => {
    it('should return a removeProjectSuccess action, with the project, on success remove', () => {
      runner.queue(projectActions.removeProject(projectMock));
      projectEffects.removeProject$.subscribe((result) => {
        expect(result).toEqual(projectActions.removeProjectSuccess(projectMock));
      });
    });

    it('should return a removeProjectFail, on service error', () => {
      spyOn(projectService, 'delete').and.returnValue(Observable.throw('error'));
      runner.queue(projectActions.removeProject(projectMock));
      projectEffects.removeProject$.subscribe((result) => {
        expect(result).toEqual(projectActions.removeProjectFail(projectMock));
      });
    });
  });
});
