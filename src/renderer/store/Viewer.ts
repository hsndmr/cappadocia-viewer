import { Instance, types } from 'mobx-state-tree';

export const ViewerModel = types
  .model('Viewer')
  .props({
    uuid: types.identifier,
    type: '',
    message: '',
    badge: '',
    badgeType: '',
    timestamp: types.Date,
    context: '',
  })
  .views((self) => ({
    get hasContext() {
      return self.context !== '';
    },
    get contextJson() {
      return JSON.parse(self.context);
    },
    get hasBadge() {
      return self.badge !== '';
    },
    get badgeColor() {
      switch (self.badgeType) {
        case 'primary':
          return 'primary';
        case 'success':
          return 'success';
        case 'warning':
          return 'warning';
        case 'error':
          return 'error';
        case 'info':
          return 'info';
        default:
          return 'primary';
      }
    },
  }));

export interface Viewer extends Instance<typeof ViewerModel> {}
