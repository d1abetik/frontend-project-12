import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <div className="text-center">
        <img alt={t('errorPage.notFound')} className="img-fluid h-25" src="" />
        <h1 className="h4 text-muted">{t('errorPage.notFound')}</h1>
        <p className="text-muted">
          {`${t('errorPage.mainPage')} `}
          <a href={routes.chat()}>
            {t('errorPage.goIn')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
