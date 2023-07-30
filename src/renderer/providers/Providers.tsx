import { PropsWithChildren } from 'react';
import SocketProvider from './SocketProvider';
import ViewerProvider from './ViewerProvider';
import RootStoreProvider from './RootStoreProvider';
import ThemeProvider from './ThemeProvider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <RootStoreProvider>
      <SocketProvider>
        <ViewerProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ViewerProvider>
      </SocketProvider>
    </RootStoreProvider>
  );
}
