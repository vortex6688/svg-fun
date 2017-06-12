
export const StoreRegistry = {
  reducers: {},
  actions: [],

  registerReducers(reducersRegisters: any[], actionRegisters: any[]) {
    reducersRegisters.forEach((reducerRegistry) => this.addReducer(reducerRegistry));
    actionRegisters.forEach((actionRegistry) => this.addActions(actionRegistry));
    return this;
  },
  registerReducer(reducer, actionsClass) {
    this.addReducer(reducer);
    this.addActions(actionsClass);
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
