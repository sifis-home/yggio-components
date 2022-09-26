/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import translation from '../../locales/en/translation.json';

// Used by stories

const t = path => _.get(translation, path, 'NO_TRANSLATION_FOUND');

export default t;
