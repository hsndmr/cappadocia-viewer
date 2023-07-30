import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { create, insert, Orama } from '@orama/orama';
import { onAction } from 'mobx-state-tree';
import { useSocket } from './SocketProvider';
import { useStore } from './RootStoreProvider';
import { ViewerModel } from '../store/Viewer';

const createDb = () => {
  return create({
    schema: {
      uuid: 'string',
      type: 'string',
      message: 'string',
      timestamp: 'number',
      badgeText: 'string',
      badgeType: 'string',
      context: 'string',
    },
  });
};

const ViewerContext = createContext<Orama | null>(null);

export const useViewerDb = () => {
  return useContext(ViewerContext);
};

export default function ViewerProvider({ children }: PropsWithChildren) {
  const socket = useSocket();
  const [db, setDb] = useState<Orama | null>(null);
  const store = useStore();

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    createDb().then((_db) => {
      setDb(_db);
    });
  }, []);

  useEffect(() => {
    const actionDisposer = onAction(store, (call) => {
      if (call.name === 'removeAllViewers') {
        // eslint-disable-next-line promise/catch-or-return
        createDb().then((_db) => {
          setDb(_db);
        });
      }
    });

    const handleEvent = async (data: any) => {
      if (!db) {
        return;
      }

      // eslint-disable-next-line promise/catch-or-return
      await insert(db, data);

      store.viewerStore.addViewer(ViewerModel.create(data));
    };

    socket.on('event', handleEvent);

    return () => {
      socket.off('event', handleEvent);
      actionDisposer();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  return <ViewerContext.Provider value={db}>{children}</ViewerContext.Provider>;
}
