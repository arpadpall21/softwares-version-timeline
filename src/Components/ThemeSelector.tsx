'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { validTheme } from '@/misc/helpers';
import Dropdown from '@/Components/Dropdown';

const ThemeSelector: React.FC = () => {
  const [themeState, setThemeState] = useState<string>('auto');
  const t = useTranslations('components.themeSelector');

  useEffect(() => {
    setThemeState(validTheme(Cookies.get('theme')));
  }, []);

  useEffect(() => {
    switch (themeState) {
      case 'light': {
        Cookies.set('theme', 'light');
        document.documentElement.classList.remove('dark');
        break;
      }
      case 'dark': {
        Cookies.set('theme', 'dark');
        document.documentElement.classList.add('dark');
        break;
      }
      default: {
        Cookies.set('theme', 'auto');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  }, [themeState]);

  return (
    <Dropdown
      selectedItem={themeState}
      optionItems={[
        ['auto', t('auto')],
        ['light', t('lightMode')],
        ['dark', t('darkMode')],
      ]}
      dropdownHandler={(e) => setThemeState(e.target.value)}
      title={t('theme')}
    />
  );
};

export default ThemeSelector;
