import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    background: {
      footer: {
        primary: '#01104B',
        secondary: '#F2F2F6'
      }
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: '#01104B',
      contrastText: '#fff'
    },
    primary: {
      light: '#fff',
      main: 'rgb(0, 172, 237)',
      dark: '#01104B',
      contrastText: '#fff'
    },
    secondary: {
      main: '#01104B',
      contrastText: '#fff'
    }
  }
});