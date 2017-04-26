interface StoreReducerPackage {
  reducer: {};
  actions: any;
}

export const StoreRegistry = {
  reducers: {},
  actions: [],

  registerReducers(reducersRegisters: StoreReducerPackage[]) {
    reducersRegisters.forEach((reducerRegistry) => this.registerReducer(reducerRegistry));
    return this;
  },
  registerReducer(reducerPackage: StoreReducerPackage) {
    this.addReducer(reducerPackage.reducer);
    this.addActions(reducerPackage.actions);
    return this;
  },
  addReducer(reducer) {
    Object.assign(this.reducers, reducer);
    return this;
  },
  addActions(actionsClass) {
    this.actions.push(actionsClass);
    return this;
  },
};
