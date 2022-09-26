/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useState} from 'react';
import _ from 'lodash';

import {
  InfoItem,
  InfoItemTop,
  InfoItemTitle,
  InfoItemMiddle,
  TableContainer,
  TableItem,
  ItemContainer,
  LastTableItem,
  FirstItemContainer,
  TitleContainer,
  TableTitle,
} from '../styled';
import InfoBox from '../../../components/info-box';
import TranslatorSelector from '../../../components/translator-selector';
import Button from '../../../components/button';
import {useLocalState} from '../../../hooks';
import {translatorsApi} from '../../../api';
import {translatorFormState} from '../state';

const Translators = props => {
  const translators = translatorsApi.useTranslatorsQuery();
  const translatorForm = useLocalState(translatorFormState);
  const [isSelectorOpen, setSelectorOpen] = useState(false);

  const IsTableOpen = isSelectorOpen ? 'none' : 'block';
  const IsTransSelectorOpen = !isSelectorOpen ? 'none' : 'block';

  return (
    <>
      <InfoItem>
        <div>{props.t('phrases.translatorSelectorExplanation')}</div>
      </InfoItem>
      {!props.deviceItem.deviceModelName && (
        <InfoBox
          heading={'No device model name selected'}
          type={'info'}
        />
      )}
      {props.deviceItem.deviceModelName && (
        <>
          {(translators.isSuccess && _.isEmpty(translators.data)) && (
            <InfoItem>
              <InfoItemTop>
                <InfoItemTitle>{_.capitalize(props.t('titles.translators'))}</InfoItemTitle>
              </InfoItemTop>
              <InfoItemMiddle>
                <InfoBox
                  heading={'No translator available for selected device model'}
                  type='neutral'
                />
              </InfoItemMiddle>
            </InfoItem>
          )}
          {(translators.isSuccess && !_.isEmpty(translators.data)) && (
            <>
              <div style={{display: IsTableOpen}}>
                {
                  props.deviceItem.addedTranslators &&
                    props.deviceItem.addedTranslators.length === 0 && (
                      <InfoItem>
                        <InfoItemMiddle>
                          <InfoBox
                            heading={'No translator selected'}
                            type='neutral'
                          />
                        </InfoItemMiddle>
                      </InfoItem>
                  )
                }
                {
                  props.deviceItem.addedTranslators &&
                    props.deviceItem.addedTranslators.length >= 1 && (
                      <TitleContainer>
                        <TableTitle>
                          Translator name:
                        </TableTitle>
                        <TableTitle>
                          Author:
                        </TableTitle>
                        <TableTitle>
                          Version:
                        </TableTitle>
                        <TableTitle>
                          Update Interval:
                        </TableTitle>
                      </TitleContainer>
                  )
                }
                {_.map(props.deviceItem.addedTranslators, (translator, index) => (
                  <TableContainer key={index}>
                    <TableItem>
                      <FirstItemContainer>
                        {index + 1}
                      </FirstItemContainer>
                    </TableItem>
                    <TableItem>
                      <ItemContainer>
                        {translator.name}
                      </ItemContainer>
                    </TableItem>
                    <TableItem>
                      <ItemContainer>
                        {translator.username}
                      </ItemContainer>
                    </TableItem>
                    <TableItem>
                      <ItemContainer>
                        {translator.selectedVersion}
                      </ItemContainer>
                    </TableItem>
                    <LastTableItem>
                      <ItemContainer>
                        {translator.updateOption}
                      </ItemContainer>
                    </LastTableItem>
                  </TableContainer>
                ))}
                <Button
                  label={_.capitalize(props.t('labels.edit'))}
                  color={'green'}
                  height={'32px'}
                  width={'90px'}
                  margin={'10px 5px 0 0'}
                  onClick={() => {
                    setSelectorOpen(true);
                  }}
                />
              </div>
              <div style={{display: IsTransSelectorOpen}}>
                <TitleContainer>
                  <TableTitle>
                    Translator name:
                  </TableTitle>
                  <TableTitle>
                    Author:
                  </TableTitle>
                  <TableTitle>
                    Version:
                  </TableTitle>
                  <TableTitle>
                    Update Interval:
                  </TableTitle>
                </TitleContainer>
                <TranslatorSelector
                  initialTranslators={props.deviceItem.addedTranslators}
                  shouldAddDefaultTranslator={false}
                  style={{marginBottom: '50px'}}
                  availableTranslators={translators.data}
                  onChange={addedTranslators => {
                    translatorForm.setInputValue('translators', addedTranslators);
                  }}
                />
                <div style={{display: 'flex', marginTop: '20px'}}>
                  <Button
                    label={_.capitalize(props.t('labels.save'))}
                    color={'green'}
                    height={'32px'}
                    width={'90px'}
                    margin={'0 5px 0 0'}
                    isLoading={translators.isLoading}
                    onClick={() => {
                      props.updateDeviceMutation.mutate({
                        updates: {addedTranslators: translatorForm.formInputs.translators.value},
                        deviceId: props.deviceItem._id,
                      });
                      setSelectorOpen(false);
                    }}
                  />
                  <Button
                    label={_.capitalize(props.t('labels.cancel'))}
                    height={'32px'}
                    width={'90px'}
                    onClick={() => {
                      setSelectorOpen(false);
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Translators;
