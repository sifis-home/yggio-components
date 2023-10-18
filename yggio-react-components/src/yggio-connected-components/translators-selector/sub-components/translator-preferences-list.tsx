import React from 'react';
import _ from 'lodash';
import {
  MdKeyboardArrowUp as UpIcon,
  MdKeyboardArrowDown as DownIcon,
  MdDelete as TrashIcon,
  MdArrowDropDown as DownArrowIcon,
} from 'react-icons/md';

import {TranslatorPreference, TranslatorPreferenceUpgradePolicy} from '../../../types';
import {
  setUpgradePolicy,
  setVersion,
  removeItem,
  moveItem,
} from '../utils';

import DropdownButton from './dropdown-button';
import {FormattedTranslatorPreference} from '../types';
import {
  AddedTranslator,
  AddedTranslatorLeftSection,
  AddedTranslatorRightSection,
  AddedTranslatorName,
  AddedTranslatorUsername,
  AddedTranslatorPills,
  MoveUpButton,
  MoveDownButton,
  DeleteButton,
  Separator,
  SeparatorMiddle,
  SeparatorLine,
  SeparatorArrow,
} from '../styled';

interface TranslatorPreferencesListProps {
  formattedTranslatorPreferences: FormattedTranslatorPreference[];
  translatorPreferences: TranslatorPreference[];
  onTranslatorPreferencesChange: (value: TranslatorPreference[]) => void;
}

const TranslatorPreferencesList = (props: TranslatorPreferencesListProps) => {
  const numAdded = props.formattedTranslatorPreferences.length;
  return (
    <>
      {_.map(props.formattedTranslatorPreferences, (translator, index) => (
        <React.Fragment key={translator.identifier}>
          <AddedTranslator>
            <AddedTranslatorLeftSection>
              <AddedTranslatorName>
                {translator.name}
              </AddedTranslatorName>
              <AddedTranslatorUsername>
                by <i>{translator.username}</i>
              </AddedTranslatorUsername>
              <AddedTranslatorPills>
                <DropdownButton
                  options={_.map(translator.availableVersions, v => ({label: v, value: v}))}
                  value={translator.version}
                  onChange={(version: string) => {
                    const newValue = setVersion(props.translatorPreferences, index, version);
                    props.onTranslatorPreferencesChange(newValue);
                  }}
                />
                <DropdownButton
                  options={[
                    {label: 'No upgrades', value: 'none'},
                    {label: 'Patch upgrades', value: 'patch'},
                    {label: 'Minor upgrades', value: 'minor'},
                    {label: 'All upgrades', value: 'all'},
                  ]}
                  value={translator.upgradePolicy}
                  onChange={(upgradePolicy: string) => {
                    const newValue = setUpgradePolicy(
                      props.translatorPreferences,
                      index,
                      upgradePolicy as TranslatorPreferenceUpgradePolicy
                    );
                    props.onTranslatorPreferencesChange(newValue);
                  }}
                />
              </AddedTranslatorPills>
            </AddedTranslatorLeftSection>
            <AddedTranslatorRightSection>
              <DeleteButton onClick={() => {
                const newValue = removeItem(props.translatorPreferences, index);
                props.onTranslatorPreferencesChange(newValue);
              }}>
                <TrashIcon size={17} />
              </DeleteButton>
              {numAdded > 1 && (
                <>
                  <MoveUpButton
                    onClick={() => {
                      if (index !== 0) {
                        const newValue = moveItem(props.translatorPreferences, index, -1);
                        props.onTranslatorPreferencesChange(newValue);
                      }
                    }}
                    isDisabled={index === 0}
                  >
                    <UpIcon size={22} />
                  </MoveUpButton>
                  <MoveDownButton
                    onClick={() => {
                      if (index !== numAdded - 1) {
                        const newValue = moveItem(props.translatorPreferences, index, 1);
                        props.onTranslatorPreferencesChange(newValue);
                      }
                    }}
                    isDisabled={index === numAdded - 1}
                  >
                    <DownIcon size={22} />
                  </MoveDownButton>
                </>
              )}
            </AddedTranslatorRightSection>
          </AddedTranslator>
          {index !== numAdded - 1 && numAdded !== 1 && (
            <Separator>
              <SeparatorMiddle>
                <SeparatorLine />
                <SeparatorArrow>
                  <DownArrowIcon size={34} />
                </SeparatorArrow>
              </SeparatorMiddle>
            </Separator>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default TranslatorPreferencesList;
