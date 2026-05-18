import { useTranslation } from 'react-i18next';

import { logo } from '@/assets/images';

import styles from './BigLogo.module.scss';

const BigLogo = () => {
  const { t } = useTranslation();

  return (
    <img
      src={logo}
      alt={t((s) => s.a11y.logo)}
      className={styles.logo}
    />
  );
};

export default BigLogo;
