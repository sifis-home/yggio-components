import _ from 'lodash';
import translation from '../../locales/en/translation.json';

// Used by stories

const t = path => _.get(translation, path, 'NO_TRANSLATION_FOUND');

export default t;
