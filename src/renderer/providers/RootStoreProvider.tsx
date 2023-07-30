import { createContext, PropsWithChildren, useContext } from 'react';
import { RootStore, RootStoreModel } from '../store/RootStore';

const rootStore = RootStoreModel.create({});

const RootStoreContext = createContext<RootStore>(rootStore);

export const useStore = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error('useStore must be used within a RootStoreProvider');
  }
  return context;
};

export default function RootStoreProvider({ children }: PropsWithChildren) {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
}
