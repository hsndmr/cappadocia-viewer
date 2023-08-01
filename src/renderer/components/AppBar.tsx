import * as React from 'react';
import BaseAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { search } from '@orama/orama';
import { useDeferredValue } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchField from './SearchField';
import { useViewerDb } from '../providers/ViewerProvider';
import { useStore } from '../providers/RootStoreProvider';
import { ViewerModel } from '../store/Viewer';

export const Search = observer(() => {
  const viewerDb = useViewerDb();
  const [value, setValue] = React.useState('');
  const deferredValue = useDeferredValue(value);
  const { viewerStore } = useStore();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    if (!viewerDb) {
      return;
    }

    if (deferredValue === '') {
      const viewers = Object.values((viewerDb.data.docs as any).docs)
        .reverse()
        .map((doc) => {
          return ViewerModel.create(doc as any);
        });

      viewerStore.setFilteredViewers(viewers, deferredValue);
      return;
    }

    // eslint-disable-next-line promise/catch-or-return
    search(viewerDb, {
      term: deferredValue,
      properties: '*',
    }).then((results) => {
      const viewers = results.hits.map((hit) => {
        return ViewerModel.create(hit.document as any);
      });

      viewerStore.setFilteredViewers(viewers, deferredValue);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredValue]);

  return <SearchField onChange={handleSearch} />;
});

const RemoveButton = observer(() => {
  const { viewerStore } = useStore();
  const handleClick = () => {
    viewerStore.removeAllViewers();
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        color: 'gray',
        marginRight: 1,
      }}
      aria-label="delete"
      size="large"
    >
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  );
});

export default function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <BaseAppBar
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
        elevation={0}
        position="static"
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cappadocia Viewer
          </Typography>
          <RemoveButton />
          <Search />
        </Toolbar>
      </BaseAppBar>
    </Box>
  );
}
