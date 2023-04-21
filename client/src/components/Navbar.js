import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';
// import { BsBell } from 'react-icons/bs';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const NavText = ({ href, text, isMain }) => {
  return (
    <Typography
      variant={isMain ? 'h5' : 'h7'}
      noWrap
      style={{
        marginRight: '30px',
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
      }}
    >
      <NavLink
        to={href}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
    </Typography>
  )
}


export default function NavBar() {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <LocationCityIcon className="h-8 w-8 mr-2" />
          <NavText href='/' text='Home' isMain />
          <NavText href='/blocks' text='Blocks' />
          <NavText href='/property' text='Property' />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
