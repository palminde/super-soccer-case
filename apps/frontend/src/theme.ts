import { createTheme, responsiveFontSizes } from '@mui/material';
import { deepOrange, grey, orange } from '@mui/material/colors';

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: deepOrange,
      secondary: orange,
      divider: deepOrange[700],
      background: {
        paper: deepOrange[900],
      },
      text: {
        primary: '#fff',
        secondary: grey[500],
      },
    },
  }),
);
