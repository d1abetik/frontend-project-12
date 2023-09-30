/* eslint-disable no-param-reassign */

import axios from 'axios';
import { Formik } from 'formik';
import filter from 'leo-profanity';
import React, { useRef, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import routes from '../../routes.js';
import useAuth from '../Auth/hookAuth.js';

const SignUpForm = () => {
  const [authError, setAuthError] = useState(false);
  const auth = useAuth();
  const ref = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      onSubmit={(values, actions) => {
        const { username, password } = values;

        axios.post(routes.signPath(), { username: filter.clean(username), password })
          .then((response) => {
            setAuthError(false);
            actions.setSubmitting(true);
            auth.logIn(response.data);
            navigate(routes.chat());
          })
          .catch((error) => {
            actions.setSubmitting(false);
            if (error.response.status === 409) {
              setAuthError(true);
              ref.current.select();
            } else {
              toast.error(t('errors.network'));
            }
          });
      }}
      validationSchema={yup.object().shape({
        username: yup.string().min(3, 'validation.usernameLength').required('validation.required'),
        password: yup.string().min(6, 'validation.passwordLength').required('validation.required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'validation.MustMatch').required('validation.required'),
      })}
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
    >
      {({
        handleBlur,
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        isSubmitting,
        isValid,
      }) => (
        <Form className="w-50" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">{t('signup.reg')}</h1>
          <FloatingLabel className="mb-3" controlId="floatingUsername" label={t('signup.nickname')}>
            <Form.Control value={values.username} type="text" autoFocus onBlur={handleBlur} onChange={handleChange} required placeholder={t('signup.nickname')} ref={ref} name="username" isInvalid={(touched.username && errors.username) || authError} />
            <Form.Control.Feedback type="invalid" tooltip>{errors.username && t(`${errors.username}`)}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className="mb-3" controlId="floatingPassword" label={t('signup.password')}>
            <Form.Control value={values.password} onBlur={handleBlur} type="password" onChange={handleChange} required placeholder={t('signup.password')} name="password" isInvalid={(touched.password && errors.password) || authError} />
            <Form.Control.Feedback type="invalid" tooltip>{errors.password && t(`${errors.password}`)}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className="mb-4" controlId="floatingconfirmPassword" label={t('signup.confPass')}>
            <Form.Control value={values.confirmPassword} type="password" onChange={handleChange} required placeholder={t('signup.confPass')} name="confirmPassword" isInvalid={(touched.confirmPassword && errors.confirmPassword) || authError === true} />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.confirmPassword && t(`${errors.confirmPassword}`)}
              {t('validation.409')}
            </Form.Control.Feedback>
          </FloatingLabel>
          <button className="w-100 mb-3 btn btn-outline-primary" type="submit" disabled={!isValid ?? isSubmitting} onSubmit={handleSubmit}>{t('signup.sign')}</button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
