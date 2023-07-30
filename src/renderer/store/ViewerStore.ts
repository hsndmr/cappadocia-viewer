import { Instance, types } from 'mobx-state-tree';
import { Viewer, ViewerModel } from './Viewer';
import { withSetPropAction } from './withSetPropAction';

export const ViewerStoreModel = types
  .model('ViewerStore')
  .props({
    viewers: types.array(ViewerModel),
    searchText: '',
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addViewer(viewer: Viewer) {
      store.setProp('viewers', [viewer, ...store.viewers]);
    },
    setFilteredViewers(viewers: Viewer[], searchText: string) {
      store.setProp('viewers', viewers);
      store.searchText = searchText;
    },
    removeAllViewers() {
      store.searchText = '';
      store.setProp('viewers', []);
    },
  }));

export interface ViewerStore extends Instance<typeof ViewerStoreModel> {}
