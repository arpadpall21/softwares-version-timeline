import { useTranslations } from 'next-intl';
import Image from 'next/image';
import logo from '../../public/V logo.png';

const Header: React.FC = () => {
  const t = useTranslations();

  return (
    <header className={'border-b-2 border-borPri dark:border-borPriD'}>
      <h1 className={'text-lg sm:text-2xl font-bold my-2 mx-mobPad sm:mx-desckPad'}>
        <Image className={'inline mr-2'} src={logo} width={28} height={28} alt="Logo" />
        <p className={'inline align-middle'}>{t('mainTitle')}</p>
      </h1>
    </header>
  );
};

export default Header;
