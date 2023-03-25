import * as React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import Home from './pages/Home';
import Analysis3 from './pages/Analysis3';
import Analysis1 from './pages/Analysis1';
import Analysis4 from './pages/Analysis4';
import styled from '@emotion/styled';
import DrawerNavigate from "./components/DrawerNavigate";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};


const StyledPaper = styled(Paper)(
  `
  background: #2b2b4b;
  color: black;
  `
);

document.body.style.background = "#000032";

export default function ListRouter() {
  const [loginOrNot, setLoginOrNot] = React.useState(false);
  const [pass, setPass] = React.useState('');

  const checkPass = () => {
    if (pass === 'honey') {
      setLoginOrNot(true);
    }
  }

  const auth = (loginOrNot) => {
    if (loginOrNot) {
      return (
        <Router>
          <DrawerNavigate />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Analysis1" element={<Analysis1 />} />
            <Route path="/Analysis3" element={<Analysis3 />} />
            <Route path="/Analysis4" element={<Analysis4 />} />
          </Routes>
        </Router>)
    } else {
      return (
        <Stack>
          <TextField id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            sx={{
              bgcolor: 'white',
            }}
            onChange={(e) => { setPass(e.target.value) }} />
          <Button variant="contained" onClick={() => checkPass()}>Login</Button>
        </Stack>
      )
    }

  }

  return (
    auth(loginOrNot)
  );
}




