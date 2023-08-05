import { Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import LogViewerItem from './LogViewerItem';
import { useStore } from '../../providers/RootStoreProvider';
import ViewerItem from './ViewerItem';
import { ViewerType } from '../../enums/ViewerType';
import QueryViewerItem from './QueryViewerItem';
import JobViewerItem from './JobViewerItem';

export const renderByType = (type: ViewerType) => {
  switch (type) {
    case ViewerType.QUERY:
      return QueryViewerItem;
    case ViewerType.JOB:
      return JobViewerItem;
    default:
      return LogViewerItem;
  }
};

const ViewerContainer = observer(() => {
  const { viewerStore } = useStore();
  return (
    <div>
      <Stack>
        {viewerStore.viewers.map((viewer) => (
          <ViewerItem
            key={viewer.uuid}
            render={renderByType(viewer.type)}
            viewer={viewer}
          />
        ))}
      </Stack>
    </div>
  );
});

export default ViewerContainer;
