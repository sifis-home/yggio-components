/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import i18n from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import enTranslation from '../../locales/en/translation.json';
import deTranslation from '../../locales/de/translation.json';

// init i18n
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {translation: enTranslation},
      de: {translation: deTranslation},
    }
  });


const withLanguage = ({
  withTranslation,
  withChangeLanguage,
  withCurrentLanguage,
} = {
  withTranslation: true,
  withChangeLanguage: false,
  withCurrentLanguage: false,
}) => Component => props => {
  const newProps = {...props};

  React.useEffect(() => {
    if (_.get(props, 'auth.user.language')) {
      i18n.changeLanguage(_.get(props, 'auth.user.language'));
    }
  }, [props.auth]);

  if (withTranslation) {
    newProps.t = useTranslation('translation').t;
  }
  if (withChangeLanguage) {
    newProps.changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };
  }
  if (withCurrentLanguage) {
    newProps.currentLanguage = i18n.language;
  }

  React.useEffect(() => {
    // Set language tag for WCAG compliance
    document.documentElement.lang = i18n.language;
  });

  return <Component
    {...newProps}
         />;
};


export default withLanguage;
