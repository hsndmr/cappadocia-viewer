import {
  ThemeProvider as BaseThemeProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <BaseThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </BaseThemeProvider>
  );
}
