import { Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import LogViewerItem from './LogViewerItem';
import { useStore } from '../../providers/RootStoreProvider';
import ViewerItem from './ViewerItem';

// @TODO: Add type for render component
export const getRenderComponentByType = () => {
  return LogViewerItem;
};

const ViewerContainer = observer(() => {
  const { viewerStore } = useStore();
  return (
    <div>
      <Stack>
        {viewerStore.viewers.map((viewer) => (
          <ViewerItem
            key={viewer.uuid}
            render={getRenderComponentByType()}
            viewer={viewer}
          />
        ))}
      </Stack>
    </div>
  );
});

export default ViewerContainer;
