import { Instance, types } from 'mobx-state-tree';
import { ViewerStoreModel } from './ViewerStore';

export const RootStoreModel = types.model('RootStore').props({
  viewerStore: types.optional(ViewerStoreModel, {}),
});

export interface RootStore extends Instance<typeof RootStoreModel> {}
