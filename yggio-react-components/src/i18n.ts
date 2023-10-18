/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from '../locales/en/translation.json';
import deTranslation from '../locales/de/translation.json';

void i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {translation: enTranslation},
      de: {translation: deTranslation},
    }
  });
