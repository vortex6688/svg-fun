import {
  inject,
  async,
} from '@angular/core/testing';

import { Style } from './style.model';
import { StyleReducer } from './style.reducer';
import { StyleActions } from './style.actions';
import { StyleState, initialStyleState } from './style.state';
import {
  getEntities,
  getIds,
  getSelectedId,
  getSelected,
  getSearchQuery,
  getAll,
  getStyleById,
  getStylesByName,
  getDefaultStyles,
  getStylesByFoundry,
  getStylesByDesigner,
  getStylesByPosture,
  getStylesByVisibility,
  getStylesByOptical,
  getStylesByGrade,
  getStylesByWeight,
  getStylesByWidth,
  getStylesByTnWeight,
  getStylesByTnWidth,
  getStylesByMinRecommendedSize,
  getStylesByMaxRecommendedSize,
  getStylesByRecommendedFunction,
  getStylesByRecommendedSize,
  getReStyles,
 } from './style.selectors';

const styleMock: Style = {
  id: 1,
  name: 'Style bolder',
  style_name: 'Bold',
  family: 1,
  base_price: '22.0000',
  specimen_text: 'Text for specimen',
  support: {
    'supported language': [
      'uppercase',
      'lowercase',
    ],
  },
  default_style: false,
  foundry: 2,
  designer: 3,
  posture: 1,
  visible: 3,
  optical: 500,
  grade: 11,
  weight: 400,
  width: 500,
  tn_size: [],
  released: new Date().toString(),
  tn_weight: 300,
  tn_width: 600,
  min_recommended_size: 24,
  max_recommended_size: 100,
  isRE: false,
  recommended_function: [0, 1, 2],
  recommended_size: [400, 500],
};

const addItems: Style[] = [
  {
    ...styleMock,
    id: 2,
    style_name: 'Italic',
    family: 2,
    designer: 1,
    posture: 2,
    default_style: true,
    foundry: 5,
    visible: 4,
    optical: 100,
    grade: 9,
    weight: 300,
    width: 400,
    tn_weight: 400,
    tn_width: 500,
    min_recommended_size: 12,
    max_recommended_size: 50,
    isRE: true,
    recommended_function: [1, 2, 3],
    recommended_size: [500, 600],
  },
];
const addedData = {
  ids: addItems.map((item) => item.id),
  entities: addItems.reduce((result, item) => ({ ... result, [item.id]: item }), {}),
};
const nonEmptyState: StyleState = {
  ...addedData,
  selectedStyleId: null,
  search: initialStyleState.search,
};

describe('StyleReducer', () => {
  const mockedState = (results = []): StyleState => (initialStyleState);

  const styleActions = new StyleActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = StyleReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should GET_STYLES when there is no Style on the state', () => {
    const state = mockedState();
    const actual = StyleReducer(state, styleActions.getStyles());
    const expected = {
      ids: [],
      entities: {},
      selectedStyleId: null,
      search: initialStyleState.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should be able to CREATE_STYLE_SUCCESS', () => {
    const state = mockedState();
    const actual = StyleReducer(state, styleActions.createStyleSuccess(styleMock));
    const expected = {
      ids: [...state.ids, ...[styleMock.id]],
      entities: Object.assign({}, state.entities, { [styleMock.id]: styleMock }),
      selectedStyleId: styleMock.id,
      search: initialStyleState.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should be NOT add a style on CREATE_STYLE_FAIL', () => {
    const state = mockedState();
    const actual = StyleReducer(state, styleActions.createStyleFail(styleMock));
    expect(actual).toEqual(state);
  });

  it('should update search object on SEARCH_QUERY', () => {
    const state = mockedState();
    const search = {
      style_name: 'name',
      foundry: 1,
      designer: 2,
      visible: [1],
      posture: [2],
      optical: [1, 23],
      width: [1, 1],
      weight: [],
    };
    const actual = StyleReducer(state, styleActions.searchQuery(search));
    const expected: StyleState = {
      ...initialStyleState,
      search,
    };
    expect(actual).toEqual(expected, 'Didn\'t update search query correctly');
  });

  it('should add items on LOAD_STYLES_SUCCESS', () => {
    const state = mockedState();
    const actual = StyleReducer(state, styleActions.loadStylesSuccess(addItems));
    const expected: StyleState = nonEmptyState;
    expect(actual).toEqual(expected, 'Didn\'t add items');
  });

  describe('when a Style already exists in the state', () => {
    const state = mockedState();
    let addedState = initialStyleState;

    beforeEach(() => {
      addedState = StyleReducer(state, styleActions.loadStylesSuccess([...addItems, styleMock]));
    });

    it('should GET_STYLES when there already exists a Style on the state', () => {
      const actual = StyleReducer(addedState, styleActions.getStyles());
      const expected = addedState;
      expect(actual).toEqual(expected);
    });

    it('should GET_STYLE will return the selected Style', () => {
      const actual = StyleReducer(addedState, styleActions.getStyle(styleMock));
      const expected = {
        ids: [styleMock.id],
        entities: { [styleMock.id]: styleMock },
        selectedStyleId: styleMock.id,
        search: initialStyleState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('should update the given style on UPDATE_STYLE', () => {
      const updatedStyle = { ...styleMock, visible: 12, base_price: '21.12' };
      const actual = StyleReducer(addedState, styleActions.updateStyleSuccess(updatedStyle));
      const expected = {
        ...addedState,
        entities: { ...addedState.entities,  [updatedStyle.id]: updatedStyle },
        selectedStyleId: updatedStyle.id,
      };
      expect(actual).toEqual(expected);
    });

    it('should NOT update the given style on UPDATE_STYLE_FAIL', () => {
      const updatedStyle = { ...styleMock, visible: 12, base_price: '21.12' };
      const actual = StyleReducer(addedState, styleActions.updateStyleFail(updatedStyle));
      expect(actual).toEqual(addedState);
    });

    it('should remove the given style on REMOVE_STYLE_SUCCESS', () => {
      const actual = StyleReducer(addedState, styleActions.removeStyleSuccess(styleMock));
      delete addedState.entities[styleMock.id];
      const expected = {
        ...addedState,
        ids: addedState.ids.filter((id) => id !== styleMock.id),
      };
      expect(actual).toEqual(expected);
    });

    it('should NOT remove the given style on REMOVE_STYLE_FAIL', () => {
      const actual = StyleReducer(addedState, styleActions.removeStyleFail(styleMock));
      expect(actual).toEqual(addedState);
    });

    it('getEntities should return all the entities of a StyleState', () => {
      const entities = getEntities(addedState);
      expect(entities).toEqual(addedState.entities);
    });

    it('getIds should return all the ids of a StyleState', () => {
      const ids = getIds(addedState);
      expect(ids).toEqual(addedState.ids);
    });

    it('getSelectedId should return the id of the selected StyleState', () => {
      const selectedStyleId = getSelectedId(addedState);
      expect(selectedStyleId).toEqual(addedState.selectedStyleId);
    });

    it('getSelected should return the entity of the selected StyleState', () => {
      const selectedStyle = getSelected(addedState);
      const selected = addedState.entities[addedState.selectedStyleId];
      expect(selectedStyle).toEqual(selected);
    });

    it('getAll should return all the entities of the StyleState', () => {
      const selectedStyle = getAll(addedState);
      const selected = addedState.ids.map((id) => addedState.entities[id]);
      expect(selectedStyle).toEqual(selected);
    });

    it('getStyleById should return a specific Style with the id provided', () => {
      const selectedStyle = getStyleById(addedState, styleMock.id);
      expect(selectedStyle).toEqual(styleMock);
    });

    it('getStylesByName should return all Styles with the provided name', () => {
      let selectedStyles = getStylesByName(addedState, 'Bold');
      expect(selectedStyles).toEqual([styleMock]);
      selectedStyles = getStylesByName(addedState, 'NaN');
      expect(selectedStyles).toEqual([]);
    });

    it('getDefaultStyles should return all default Styles', () => {
      const selectedStyles = getDefaultStyles(addedState);
      expect(selectedStyles).toEqual(addItems);
    });

    it('getStylesByFoundry should return all styles with the provided foundry', () => {
      let selectedStyles = getStylesByFoundry(addedState, 1);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByFoundry(addedState, 2);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByDesigner should return all styles with the provided designer', () => {
      let selectedStyles = getStylesByDesigner(addedState, 123);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByDesigner(addedState, 3);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByPosture should return all styles with the provided posture', () => {
      let selectedStyles = getStylesByPosture(addedState, 123);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByPosture(addedState, 1);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByVisibility should return all styles with the provided visibility', () => {
      let selectedStyles = getStylesByVisibility(addedState, 123);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByVisibility(addedState, 3);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByOptical should return all styles with provided optical', () => {
      let selectedStyles = getStylesByOptical(addedState, 600);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByOptical(addedState, 500);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByGrade should return all styles with provided grade', () => {
      let selectedStyles = getStylesByGrade(addedState, 600);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByGrade(addedState, 11);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByWeight should return all styles with provided weight', () => {
      let selectedStyles = getStylesByWeight(addedState, 100);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByWeight(addedState, 400);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByWidth should return all styles with provided width', () => {
      let selectedStyles = getStylesByWidth(addedState, 100);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByWidth(addedState, 500);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByTnWeight should return all styles with provided tn weight', () => {
      let selectedStyles = getStylesByTnWeight(addedState, 100);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByTnWeight(addedState, 300);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByTnWidth should return all styles with provided tn width', () => {
      let selectedStyles = getStylesByTnWidth(addedState, 200);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByTnWidth(addedState, 600);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByMinRecommendedSize should return all styles with provided min recommended size', () => {
      let selectedStyles = getStylesByMinRecommendedSize(addedState, 1);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByMinRecommendedSize(addedState, 24);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByMaxRecommendedSize should return all styles with provided max recommended size', () => {
      let selectedStyles = getStylesByMaxRecommendedSize(addedState, 200);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByMaxRecommendedSize(addedState, 100);
      expect(selectedStyles).toEqual([styleMock]);
    });

    it('getStylesByRecommendedFunction should return all styles with provided recommended function', () => {
      let selectedStyles = getStylesByRecommendedFunction(addedState, 5);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByRecommendedFunction(addedState, 0);
      expect(selectedStyles).toEqual([styleMock]);
      selectedStyles = getStylesByRecommendedFunction(addedState, 1);
      expect(selectedStyles).toEqual([...addItems, styleMock]);
    });

    it('getStylesByRecommendedSize should return all styles with provided recommended size', () => {
      let selectedStyles = getStylesByRecommendedSize(addedState, 300);
      expect(selectedStyles).toEqual([]);
      selectedStyles = getStylesByRecommendedSize(addedState, 400);
      expect(selectedStyles).toEqual([styleMock]);
      selectedStyles = getStylesByRecommendedSize(addedState, 500);
      expect(selectedStyles).toEqual([...addItems, styleMock]);
    });

    it('getReStyles should return all RE styles', () => {
      const selectedStyles = getReStyles(addedState);
      expect(selectedStyles).toEqual(addItems);
    });
  });
});
