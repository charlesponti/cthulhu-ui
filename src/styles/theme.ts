import '@emotion/react';
import { createTheme } from '@mui/material';

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      error: {
        main: string;
      };
    };
  }
}

const theme = createTheme({
  palette: {
    error: {
      main: '#B00020'
    }
  }
});

export default theme;
