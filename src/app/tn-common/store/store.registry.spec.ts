import { StoreRegistry } from './store.registry';

describe('StoreRegistry', () => {
  const reducers = [
    { test: true },
    { realBoy: false }
  ];

  const actions = [
    'none',
    ['eat', 'kebab'],
  ];

  beforeEach(() => {
    StoreRegistry.reducers = {};
    StoreRegistry.actions = [];
  });

  it('should call register for each reducer item', () => {
    const addReducerSpy = spyOn(StoreRegistry, 'addReducer');
    const addActionsSpy = spyOn(StoreRegistry, 'addActions');

    StoreRegistry.registerReducers(reducers, actions);

    expect(addReducerSpy).toHaveBeenCalledTimes(reducers.length);
    expect(addReducerSpy.calls.first().args)
      .toEqual([reducers[0]]);
    expect(addReducerSpy.calls.mostRecent().args)
      .toEqual([reducers[reducers.length - 1]]);

    expect(addActionsSpy).toHaveBeenCalledTimes(actions.length);
    expect(addActionsSpy.calls.first().args)
      .toEqual([actions[0]]);
    expect(addActionsSpy.calls.mostRecent().args)
      .toEqual([actions[actions.length - 1]]);
  });

  it('should call methods for adding reducers and actions when registering', () => {
    const reducerSpy = spyOn(StoreRegistry, 'addReducer');
    const actionsSpy = spyOn(StoreRegistry, 'addActions');

    StoreRegistry.registerReducer(reducers[0], actions[0]);
    expect(reducerSpy).toHaveBeenCalledWith(reducers[0]);
    expect(actionsSpy).toHaveBeenCalledWith(actions[0]);
  });

  it('should add reducers to list', () => {
    const testReducer = { key: 'value' };
    const replacedReducer = { key: 'replaced value!' };

    expect(StoreRegistry.reducers).toEqual({}, 'Reducers should be empty initially');

    StoreRegistry.addReducer(testReducer);
    let reducersAfterAdition = Object.assign({}, testReducer);
    expect(StoreRegistry.reducers)
      .toEqual(reducersAfterAdition, 'List doesn\'t contain reducer');

    reducersAfterAdition = Object.assign(
      {},
      reducersAfterAdition,
      reducers[0],
      replacedReducer
    );
    StoreRegistry
      .addReducer(reducers[0])
      .addReducer(replacedReducer);
    expect(StoreRegistry.reducers)
      .toEqual(reducersAfterAdition, 'List didn\'t update reducers correctly');
  });

  it('should add actions to list', () => {
    const testAction = 'action';

    expect(StoreRegistry.actions.length).toEqual(0, 'Actions should be empty initially');

    StoreRegistry
      .addActions(testAction);
    expect(StoreRegistry.actions)
      .toEqual([testAction], 'List doesn\'t contain actions');

    StoreRegistry
      .addActions(testAction)
      .addActions(testAction);
    expect(StoreRegistry.actions)
      .toEqual([testAction, testAction, testAction], 'List doesn\'t contain actions');
  });

  it('should have all chainable methods', () => {
    // Add minimal params to prevent functions from throwing XXX
    const testParams = {
      registerReducers: [[], []],
      registerReducer: [{}, null],
      addReducer: [{}],
      addActions: [null],
    };
    const storeRegistryKeys = Object.keys(StoreRegistry);

    // Go through all functions and check if they return the same object
    const allChainable = storeRegistryKeys.every((key) => {
      const target = StoreRegistry[key];
      if (typeof target !== 'function') {
        return true;
      }
      const callResult = target.apply(StoreRegistry, testParams[key]);
      return callResult === StoreRegistry;
    });
    expect(allChainable).toBeTruthy('Not all methods are chainable');
  });
});
