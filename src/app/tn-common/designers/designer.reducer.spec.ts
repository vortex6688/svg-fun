import {
  inject,
  async,
} from '@angular/core/testing';

import { Designer } from './designer.model';
import { DesignerReducer } from './designer.reducer';
import { DesignerActions } from './designer.actions';
import { DesignerState, initialDesignerState } from './designer.state';
import {
  getEntities,
  getIds,
  getSelectedId,
  getSelected,
  getAll,
  getDesignerById,
  getDesignerByName,
  getDesignerBySlug,
  getDesignersByBirth,
  getDesignersByDeath,
  getDesignersByDescription,
  getDesignersByFoundry,
  getDesignersByTitle,
 } from './designer.selectors';

const designerMock: Designer = {
  id: 1,
  name: 'mega designer',
  slug: 'mega-designer',
  description: 'loves design',
  birth_date: '1999/11/30',
  death_date: '1999/12/30',
  foundry: [2],
  title: [1],
};

const addItems: Designer[] = [
  {
    ...designerMock,
    id: 2,
    name: 'any',
    slug: 'any',
    description: 'any designer',
    death_date: '2000/01/01',
    foundry: [2, 3],
    title: [1, 2],
  },
  {
    ...designerMock,
    id: 3,
    name: 'test',
    slug: 'test',
    description: 'nan',
    birth_date: '1000/01/01',
    death_date: '2100/01/01',
    foundry: [5],
    title: [5],
  },
];
const addedData = {
  ids: addItems.map((item) => item.id),
  entities: addItems.reduce((result, item) => ({ ... result, [item.id]: item }), {}),
};
const nonEmptyState: DesignerState = {
  ...addedData,
  selectedDesignerId: null,
};

describe('DesignerReducer', () => {
  const mockedState = (results = []): DesignerState => (initialDesignerState);

  const designerActions = new DesignerActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = DesignerReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should GET_DESIGNERS when there is no Designer on the state', () => {
    const state = mockedState();
    const actual = DesignerReducer(state, designerActions.getDesigners());
    const expected = {
      ids: [],
      entities: {},
      selectedDesignerId: null,
    };
    expect(actual).toEqual(expected);
  });

  it('should be able to CREATE_DESIGNER_SUCCESS', () => {
    const state = mockedState();
    const actual = DesignerReducer(state, designerActions.createDesignerSuccess(designerMock));
    const expected = {
      ids: [...state.ids, ...[designerMock.id]],
      entities: Object.assign({}, state.entities, { [designerMock.id]: designerMock }),
      selectedDesignerId: designerMock.id,
    };
    expect(actual).toEqual(expected);
  });

  it('should be NOT add a designer on CREATE_DESIGNER_FAIL', () => {
    const state = mockedState();
    const actual = DesignerReducer(state, designerActions.createDesignerFail(designerMock));
    expect(actual).toEqual(state);
  });

  it('should add items on LOAD_DESIGNERS_SUCCESS', () => {
    const state = mockedState();
    const actual = DesignerReducer(state, designerActions.loadDesignersSuccess(addItems));
    const expected: DesignerState = nonEmptyState;
    expect(actual).toEqual(expected, 'Didn\'t add items');
  });

  describe('when a Designer already exists in the state', () => {
    const state = mockedState();
    let addedState = initialDesignerState;

    beforeEach(() => {
      addedState = DesignerReducer(state, designerActions.loadDesignersSuccess([...addItems, designerMock]));
    });

    it('should GET_DESIGNERS when there already exists a Designer on the state', () => {
      const actual = DesignerReducer(addedState, designerActions.getDesigners());
      const expected = addedState;
      expect(actual).toEqual(expected);
    });

    it('should GET_DESIGNER will return the selected Designer', () => {
      const actual = DesignerReducer(addedState, designerActions.getDesigner(designerMock));
      const expected = {
        ids: [designerMock.id],
        entities: { [designerMock.id]: designerMock },
        selectedDesignerId: designerMock.id,
      };
      expect(actual).toEqual(expected);
    });

    it('should update the given designer on UPDATE_DESIGNER', () => {
      const updatedDesigner = { ...designerMock, description: 'derp', title: [] };
      const actual = DesignerReducer(addedState, designerActions.updateDesignerSuccess(updatedDesigner));
      const expected = {
        ...addedState,
        entities: { ...addedState.entities,  [updatedDesigner.id]: updatedDesigner },
        selectedDesignerId: updatedDesigner.id,
      };
      expect(actual).toEqual(expected);
    });

    it('should NOT update the given designer on UPDATE_DESIGNER_FAIL', () => {
      const updatedDesigner = { ...designerMock, description: 'derp', title: [] };
      const actual = DesignerReducer(addedState, designerActions.updateDesignerFail(updatedDesigner));
      expect(actual).toEqual(addedState);
    });

    it('should remove the given designer on REMOVE_DESIGNER_SUCCESS', () => {
      const actual = DesignerReducer(addedState, designerActions.removeDesignerSuccess(designerMock));
      delete addedState.entities[designerMock.id];
      const expected = {
        ...addedState,
        ids: addedState.ids.filter((id) => id !== designerMock.id),
      };
      expect(actual).toEqual(expected);
    });

    it('should NOT remove the given designer on REMOVE_DESIGNER_FAIL', () => {
      const actual = DesignerReducer(addedState, designerActions.removeDesignerFail(designerMock));
      expect(actual).toEqual(addedState);
    });

    it('getEntities should return all the entities of a DesignerState', () => {
      const entities = getEntities(addedState);
      expect(entities).toEqual(addedState.entities);
    });

    it('getIds should return all the ids of a DesignerState', () => {
      const ids = getIds(addedState);
      expect(ids).toEqual(addedState.ids);
    });

    it('getSelectedId should return the id of the selected DesignerState', () => {
      const selectedDesignerId = getSelectedId(addedState);
      expect(selectedDesignerId).toEqual(addedState.selectedDesignerId);
    });

    it('getSelected should return the entity of the selected DesignerState', () => {
      const selectedDesigner = getSelected(addedState);
      const selected = addedState.entities[addedState.selectedDesignerId];
      expect(selectedDesigner).toEqual(selected);
    });

    it('getAll should return all the entities of the DesignerState', () => {
      const selectedDesigner = getAll(addedState);
      const selected = addedState.ids.map((id) => addedState.entities[id]);
      expect(selectedDesigner).toEqual(selected);
    });

    it('getDesignerById should return a specific Designer with the id provided', () => {
      const selectedDesigner = getDesignerById(addedState, designerMock.id);
      expect(selectedDesigner).toEqual(designerMock);
    });

    it('getDesignerByName should return a specific Designer with the provided name', () => {
      let selectedDesigner = getDesignerByName(addedState, designerMock.name);
      expect(selectedDesigner).toEqual(designerMock);
      selectedDesigner = getDesignerByName(addedState, 'NaN');
      expect(selectedDesigner).toEqual(undefined);
    });

    it('getDesignerBySlug should return a specific Designer with the provided slug', () => {
      const selectedDesigners = getDesignerBySlug(addedState, designerMock.slug);
      expect(selectedDesigners).toEqual(designerMock);
    });

    it('getDesignersByDescription should return all designers that contain povided description', () => {
      const description = 'design';
      const descReg = new RegExp(description, 'i');
      const selectedDesigners = getDesignersByDescription(addedState, description);
      const expected = addedState.ids.map((id) => addedState.entities[id])
      .filter((designer) => descReg.test(designer.description));
      expect(selectedDesigners).toEqual(expected);
    });

    it('getDesignersByBirth should return all designers are born on the specified date', () => {
      const birthDate = new Date(designerMock.birth_date);
      let selectedDesigners = getDesignersByBirth(addedState, new Date());
      expect(selectedDesigners).toEqual([]);
      selectedDesigners = getDesignersByBirth(addedState, birthDate);
      const expected = addedState.ids.map((id) => addedState.entities[id])
      .filter((designer) => new Date(designer.birth_date).getTime() === birthDate.getTime());
      expect(selectedDesigners).toEqual(expected);
    });

    it('getDesignersByDeath should return all designers that have died on the specified date', () => {
      const deathDate = new Date(designerMock.death_date);
      let selectedDesigners = getDesignersByDeath(addedState, new Date());
      expect(selectedDesigners).toEqual([]);
      selectedDesigners = getDesignersByDeath(addedState, deathDate);
      const expected = addedState.ids.map((id) => addedState.entities[id])
      .filter((designer) => new Date(designer.death_date).getTime() === deathDate.getTime());
      expect(selectedDesigners).toEqual(expected);
    });

    it('getDesignersByFoundry should return all designers that have specified foundry', () => {
      const testFoundry = 2;
      let selectedDesigners = getDesignersByFoundry(addedState, 1111);
      expect(selectedDesigners).toEqual([]);
      selectedDesigners = getDesignersByFoundry(addedState, testFoundry);
      const expected = addedState.ids.map((id) => addedState.entities[id])
      .filter((designer) => designer.foundry.indexOf(testFoundry) !== -1);
      expect(selectedDesigners).toEqual(expected);
    });

    it('getDesignersByTitle should return all designers that have specified title', () => {
      const testTitle = 1;
      let selectedDesigners = getDesignersByTitle(addedState, 1111);
      expect(selectedDesigners).toEqual([]);
      selectedDesigners = getDesignersByTitle(addedState, testTitle);
      const expected = addedState.ids.map((id) => addedState.entities[id])
      .filter((designer) => designer.title.indexOf(testTitle) !== -1);
      expect(selectedDesigners).toEqual(expected);
    });
  });
});
