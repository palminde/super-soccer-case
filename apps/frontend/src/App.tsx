import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';

export function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Stack minHeight={'100vh'}>
        <BrowserRouter basename={''}>
          <Routes>
            <Route path={'/'} element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </Stack>
    </ThemeProvider>
  );
}
