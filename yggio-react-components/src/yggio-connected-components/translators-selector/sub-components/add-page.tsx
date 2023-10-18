import React, {useState} from 'react';
import _ from 'lodash';
import {MdOutlineSearch as SearchIcon} from 'react-icons/md'; // Cross
import {Switch} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

// Logic
import {TranslatorPreference} from '../../../types';
import {TranslatorsSelectorPage} from '../types';
import {translatorsApi} from '../../../api';
import {selectGroupedTranslators, selectFilteredGroupedTranslators} from '../selectors';

// UI
import PageHeader from './page-header';
import Button from '../../../components/button';
import TextField from '../../../components/text-field';
import Spinner from '../../../components/spinner';
import Chip from '../../../components/chip';
import {COLORS} from '../../../constants';
import {
  EmptyTranslatorsContainer,
  FilterHeadingContainer,
  FilterHeadingText,
  FilterHeadingLine,
  Line,
  SwitchContainer,
  SwitchLabel,
  FoundTranslatorsHeading,
  FoundTranslatorsContainer,
  FoundTranslator,
  FoundTranslatorName,
  FoundTranslatorInfo,
  AddTranslatorBottom,
} from '../styled';

interface AddTranslatorPageProps {
  translatorPreferences: TranslatorPreference[];
  onTranslatorPreferencesChange: (value: TranslatorPreference[]) => void;
  onCurrentPageChange: (page: TranslatorsSelectorPage) => void;
  deviceModelName?: string;
  idKeyedUsernames: Record<string, string>;
}

const AddTranslatorPage = (props: AddTranslatorPageProps) => {
  const {t} = useTranslation();

  const [name, setName] = useState('');
  const [shouldMatchDeviceModelName, setShouldMatchDeviceModelName] = useState(true);
  const [selectedTranslatorIdentifier, setSelectedTranslatorIdentifier] = useState<string>();

  const deviceModelNameParam = shouldMatchDeviceModelName ? props.deviceModelName : undefined;

  const translatorsQuery = translatorsApi.useTranslatorsQuery(deviceModelNameParam);

  const groupedTranslators = selectGroupedTranslators({
    idKeyedUsernames: props.idKeyedUsernames,
    translators: translatorsQuery.data,
  });

  const translators = selectFilteredGroupedTranslators({
    groupedTranslators,
    name,
    addedTranslators: props.translatorPreferences,
  });

  const handleAddTranslator = () => {

    const selectedTranslator = _.find(translators, {identifier: selectedTranslatorIdentifier})!;

    const translatorPreference: TranslatorPreference = {
      name: selectedTranslator.name,
      userId: selectedTranslator.userId,
      version: selectedTranslator.versions[0],
      upgradePolicy: 'minor',
    };

    const newValue = [...props.translatorPreferences, translatorPreference];

    props.onTranslatorPreferencesChange(newValue);

    props.onCurrentPageChange(TranslatorsSelectorPage.list);
  };

  return (
    <>
      <PageHeader
        title='Add translator'
        onCurrentPageChange={props.onCurrentPageChange}
        t={t}
      />
      <FilterHeadingContainer>
        <SearchIcon size={18} />
        <FilterHeadingText>{_.capitalize(t('labels.filter'))}</FilterHeadingText>
        <FilterHeadingLine />
      </FilterHeadingContainer>
      <SwitchContainer>
        <Switch
          isChecked={shouldMatchDeviceModelName}
          isDisabled={!props.deviceModelName}
          onChange={evt => {
            setShouldMatchDeviceModelName(evt.target.checked);
            setSelectedTranslatorIdentifier(undefined);
          }}
        />
        {props.deviceModelName ? (
          <SwitchLabel>
            {t('phrases.matchWithDeviceModelName')}: <i>{props.deviceModelName}</i>
          </SwitchLabel>
        ) : (
          <SwitchLabel isGrey>
            {t('phrases.cannotMatchWithDeviceModelName')}
          </SwitchLabel>
        )}
      </SwitchContainer>
      <TextField
        label={'Translator name'}
        value={name}
        width='400px'
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          setName(evt.target.value);
          setSelectedTranslatorIdentifier(undefined);
        }}
      />
      <Line />
      {_.isEmpty(translators) ? (
        <EmptyTranslatorsContainer>
          {translatorsQuery.isFetching
            ? <Spinner color={COLORS.greyMedium2} />
            : <p>{t('phrases.noTranslatorsFound')}</p>
          }
        </EmptyTranslatorsContainer>
      ) : (
        <>
          <FoundTranslatorsHeading>{t('phrases.selectATranslator')}:</FoundTranslatorsHeading>
          <FoundTranslatorsContainer>
            {_.map(translators, translator => (
              <FoundTranslator
                key={translator.identifier}
                isSelected={translator.identifier === selectedTranslatorIdentifier}
                isAdded={translator.isAdded}
                onClick={() => {
                  if (translator.identifier === selectedTranslatorIdentifier) {
                    setSelectedTranslatorIdentifier(undefined);
                  } else if (!translator.isAdded) {
                    setSelectedTranslatorIdentifier(translator.identifier);
                  }
                }}
              >
                <FoundTranslatorName>
                  {translator.name}
                  {translator.isAdded && (
                    <Chip text={t('labels.alreadyAdded')} color={'blue'} margin={'0 0 0 7px'} />
                  )}
                </FoundTranslatorName>
                <FoundTranslatorInfo>
                  {t('common.by')}
                  <i>{translator.username}</i>
                  {translator.versions.length === 1 && (
                    ` | ${translator.versions.length} ${t('labels.versionAvailable')}`
                  )}
                  {translator.versions.length > 1 && (
                    ` | ${translator.versions.length} ${t('labels.versionsAvailable')}`
                  )}
                </FoundTranslatorInfo>
              </FoundTranslator>
            ))}
          </FoundTranslatorsContainer>
        </>
      )}
      <AddTranslatorBottom>
        <Button
          label={_.capitalize(t('labels.back'))}
          onClick={() => props.onCurrentPageChange(TranslatorsSelectorPage.list)}
        />
        <Button
          label={t('labels.addTranslator')}
          color='green'
          width='130px'
          disabled={!selectedTranslatorIdentifier}
          onClick={handleAddTranslator}
        />
      </AddTranslatorBottom>
    </>
  );
};

export default AddTranslatorPage;
