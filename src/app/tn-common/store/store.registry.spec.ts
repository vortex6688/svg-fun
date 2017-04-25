import { StoreRegistry } from './store.registry';

describe('StoreRegistry', () => {
  const reducerData = [{
    reducer: { test: true },
    actions: 'none',
  }, {
    reducer: { realBoy: false },
    actions: ['eat', 'kebab'],
  }];

  beforeEach(() => {
    StoreRegistry.reducers = {};
    StoreRegistry.actions = [];
  });

  it('should call register for each reducer item', () => {
    const reducerRegistrarSpy = spyOn(StoreRegistry, 'registerReducer');

    StoreRegistry.registerReducers(reducerData);

    expect(reducerRegistrarSpy).toHaveBeenCalledTimes(reducerData.length);
    expect(reducerRegistrarSpy.calls.first().args)
      .toEqual([reducerData[0]]);
    expect(reducerRegistrarSpy.calls.mostRecent().args)
      .toEqual([reducerData[reducerData.length - 1]]);
  });

  it('should call methods for adding reducers and actions when registering', () => {
    const testReducer = reducerData[0];
    const reducerSpy = spyOn(StoreRegistry, 'addReducer');
    const actionsSpy = spyOn(StoreRegistry, 'addActions');

    StoreRegistry.registerReducer(testReducer);
    expect(reducerSpy).toHaveBeenCalledWith(testReducer.reducer);
    expect(actionsSpy).toHaveBeenCalledWith(testReducer.actions);
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
      reducerData[0].reducer,
      replacedReducer
    );
    StoreRegistry
      .addReducer(reducerData[0].reducer)
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
    // Add minimal params to prevent functions from throwing
    const testParams = {
      registerReducers: [],
      registerReducer: {},
    };
    const storeRegistryKeys = Object.keys(StoreRegistry);

    // Go through all functions and check if they return the same object
    const allChainable = storeRegistryKeys.every((key) => {
      const target = StoreRegistry[key];
      if (typeof target !== 'function') {
        return true;
      }
      const callResult = target.call(StoreRegistry, testParams[key]);
      return callResult === StoreRegistry;
    });
    expect(allChainable).toBeTruthy('Not all methods are chainable');
  });
});
