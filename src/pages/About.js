import React from 'react'
import '../components/App.css';
import FooterAbout from '../components/FooterAbout'
import 'bootstrap/dist/css/bootstrap.min.css';
import PostList from '../components/postList'
import '../components/App.css';
import HeaderAbout from '../components/HeaderAbout';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import style from '../components/Style.module.css';




function About() {
    const { t, i18n } = useTranslation();
    const locales = {
      en: { title: 'English' },
      fr: { title: 'French' },
    };
  
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.resolvedLanguage);
  
    const handleChangeLanguage = (event) => {
      const newLocale = event.target.value;
      setSelectedLanguage(newLocale);
      i18n.changeLanguage(newLocale);
    };
  
    return (
      <div>
        <HeaderAbout />
  
        <select aria-label="Change Language" className={style.lang}  value={selectedLanguage} onChange={handleChangeLanguage}>
          {Object.keys(locales).map((locale) => (
            <option key={locale} value={locale}>
              {locales[locale].title}
            </option>
          ))}
        </select>

        <div className='mx-3 my-3 mb-3'>

            <p className={style.aboutPara}>{t('body.open')}</p>
            <ul>
                <li className={style.aboutPara}>
                {t('body.bullet1')}
                </li>
                <li className={style.aboutPara}>
                {t('body.bullet2')}
                </li>
                <li className={style.aboutPara}>
                {t('body.bullet3')}
                </li>
            </ul>

            <p className={style.aboutPara}>{t('body.conclusion')}</p>

        </div>

        
  
        <FooterAbout />
      </div>
    );
  }
  

export default About