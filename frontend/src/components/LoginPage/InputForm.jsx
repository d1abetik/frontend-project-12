/* eslint-disable no-param-reassign */

import axios from 'axios';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import routes from '../../routes.js';
import useAuth from '../Auth/hookAuth.js';

const InputFormLogin = () => {
  const [authError, setAuthError] = useState(false);
  const { logIn } = useAuth();
  const ref = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      onSubmit={(values, actions) => {
        axios.post(routes.loginPath(), values)
          .then((response) => {
            setAuthError(false);
            actions.setSubmitting(true);
            if (!response.data.token) {
              return;
            }
            logIn(response.data);
            navigate(routes.chat());
          }).catch((error) => {
            actions.setSubmitting(false);
            if (error === 'AxiosError') {
              setAuthError(true);
              ref.current.select();
              toast.error(t('errors.network'));
            }
            if (error.response?.status === 401) {
              setAuthError(true);
            } else {
              toast.error(t('errors.network'));
            }
          });
      }}
      validationSchema={yup.object().shape({
        username: yup.string().required('validation.required'),
        password: yup.string().required('validation.required'),
      })}
      initialValues={{ username: '', password: '' }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        isSubmitting,
        isValid,
      }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">{t('inputPage.join')}</h1>
          <>
            <FloatingLabel className="mb-3" controlId="floatingName" label={t('inputPage.nickname')}>
              <Form.Control value={values.username} type="text" autoFocus onChange={handleChange} required placeholder={t('inputPage.nickname')} ref={ref} name="username" isInvalid={touched.name && authError} />
            </FloatingLabel>
            <FloatingLabel className="mb-4" controlId="floatingPassword" label={t('inputPage.password')}>
              <Form.Control value={values.password} type="password" onChange={handleChange} required placeholder={t('inputPage.password')} name="password" isInvalid={touched.password && authError} />
              <Form.Control.Feedback type="invalid" tooltip>{errors && t('validation.loginFailed')}</Form.Control.Feedback>
            </FloatingLabel>
            <button className="w-100 mb-3 btn btn-outline-primary" disabled={!isValid ?? isSubmitting} type="submit">{t('inputPage.join')}</button>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default InputFormLogin;
