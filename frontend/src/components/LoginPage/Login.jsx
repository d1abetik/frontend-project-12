import React from 'react';
import {
  Card, Col,
  Container, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import loginava from '../../assets/loginava.jpg';
import InputFormLogin from './InputForm.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center"><img src={loginava} alt="login" className="rounded-circle" /></Col>
              <InputFormLogin />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('inputPage.text')}</span>
                <a href="/signup">{t('inputPage.link')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
