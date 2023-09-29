import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../routes.js';
import useAuth from './Auth/hookAuth.js';

const Header = () => {
  const { user, logOut } = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand as={Link} to={routes.chat()}>{t('nav.chat')}</Navbar.Brand>
        {user !== null ? <button type="button" className="btn btn-primary" onClick={logOut}>{t('nav.button')}</button> : null}
      </Container>
    </Navbar>
  );
};

export default Header;
