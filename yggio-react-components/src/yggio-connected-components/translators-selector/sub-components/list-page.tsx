import React from 'react';
import _ from 'lodash';
import {useTranslation} from 'react-i18next';

// Logic
import {TranslatorPreference} from '../../../types';
import {translatorsApi} from '../../../api';
import {TranslatorsSelectorPage} from '../types';
import {selectGroupedTranslators, selectFormattedTranslatorPreferences} from '../selectors';

// UI
import PageHeader from './page-header';
import TranslatorPreferencesList from './translator-preferences-list';
import {FlexColCenterMaxWidthWrapper, FlexMaxWidthCenterWrapper} from '../../../global/styled';
import Button from '../../../components/button';
import {
  NoTranslatorNote,
  AddTranslatorLink,
} from '../styled';

interface TranslatorsPageProps {
  translatorPreferences: TranslatorPreference[];
  onTranslatorPreferencesChange: (value: TranslatorPreference[]) => void;
  onCurrentPageChange: (page: TranslatorsSelectorPage) => void;
  idKeyedUsernames: Record<string, string>;
}

const ListPage = (props: TranslatorsPageProps) => {
  const {t} = useTranslation();

  const translatorsQuery = translatorsApi.useTranslatorsQuery();

  const groupedTranslators = selectGroupedTranslators({
    translators: translatorsQuery.data,
    idKeyedUsernames: props.idKeyedUsernames,
  });

  const formattedTranslatorPreferences = selectFormattedTranslatorPreferences({
    translatorPreferences: props.translatorPreferences,
    idKeyedUsernames: props.idKeyedUsernames,
    groupedTranslators,
  });

  const numAdded = _.size(props.translatorPreferences);

  return (
    <>
      {numAdded === 0 ? (
        <>
          <PageHeader onCurrentPageChange={props.onCurrentPageChange} t={t} />
          <FlexColCenterMaxWidthWrapper>
            <NoTranslatorNote>{t('phrases.noTranslatorsAdded')}</NoTranslatorNote>
            <Button
              label={`+ ${t('labels.addTranslator')}`}
              width='125px'
              color='blue'
              ghosted
              height={'30px'}
              margin='0 0 30px 0'
              onClick={() => props.onCurrentPageChange(TranslatorsSelectorPage.add)}
            />
          </FlexColCenterMaxWidthWrapper>
        </>
      ) : (
        <>
          <PageHeader
            title={`${t('labels.addedTranslators')}:`}
            onCurrentPageChange={props.onCurrentPageChange}
            t={t}
          />
          <TranslatorPreferencesList
            formattedTranslatorPreferences={formattedTranslatorPreferences}
            translatorPreferences={props.translatorPreferences}
            onTranslatorPreferencesChange={props.onTranslatorPreferencesChange}
          />
          <FlexMaxWidthCenterWrapper>
            <AddTranslatorLink
              onClick={() => props.onCurrentPageChange(TranslatorsSelectorPage.add)}
            >
              + {t('labels.addAnotherTranslator')}
            </AddTranslatorLink>
          </FlexMaxWidthCenterWrapper>
        </>
      )}
    </>
  );
};

export default ListPage;
