/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import {compose} from 'lodash/fp';
import {arrow_down as arrowDown} from 'react-icons-kit/ikons/arrow_down';
import {arrow_up as arrowUp} from 'react-icons-kit/ikons/arrow_up';
import {Icon} from 'react-icons-kit';

import {
  getFormShape,
} from '../../../../utils/form-wizard';
import {withEvents, withReselect} from '../../../../hocs';
import events from './events';
import {onInputChange} from '../events';
import selectors from './selectors';

import Button from '../../../../components/button';
import Select from '../../../../components/select';
import Spinner from '../../../../components/spinner';
import InfoBox from '../../../../components/info-box';
import Collapsible from '../../../../components/collapsible';
import TranslatorSelector from '../../../../components/translator-selector';
import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';
import {StyledContainerBox} from '../../sub-components';
import {
  FetchTranslatorLoadingContainer,
  CollapsableButtonIconWrapper,
  CollapsableButton,
  SubLink,
  CurrentlyUsing,
  TitleContainer,
  InfoItem,
} from './styled';
import {
  withFetchDeviceModelNames,
  withOnDeviceModelNameSelected,
} from './effects';

/*
  NOTE: This pane needs to be converted to the new way
  */

const BasicTranslatorPane = props => {
  const [isCollapsibleOpen, setCollapsibleOpen] = useState(false);
  const [isAddedTranslatorsEmpty, setAddedTranslatorsEmpty] = useState(false);
  const [CurrentlyUsingTranslator, setCurrentlyUsingTranslator] = useState('none');
  const DefaultTranslatorInformation = isAddedTranslatorsEmpty ? 'none' : 'block';
  const NoTranslatorInformation = !isAddedTranslatorsEmpty ? 'none' : 'block';

  const CollapseButton = () => (
    <CollapsableButton>
      Edit translators
      <CollapsableButtonIconWrapper>
        {
          isCollapsibleOpen
            ? <Icon icon={arrowUp} size={14} />
            : <Icon icon={arrowDown} size={14} />
        }
      </CollapsableButtonIconWrapper>
    </CollapsableButton>
  );
  return (
    <>
      <StyledContainerBox>
        <Heading>Specify device and translator(s)</Heading>
        <SubHeading>Please enter device model name</SubHeading>
        <ContentContainer>
          <Select
            label={'Model name'}
            name={'deviceModelName'}
            placeholder={'Select model name...'}
            additionalInfo={'Enter device model name to get a default translator based on device'}
            options={props.deviceModelOptions || []}
            isOptional
            value={props.formInputs.deviceModelName.value}
            onChange={props.onInputChange}
            margin={'0 0 25px 0'}
          />
          {props.fetchTranslatorsRequest.isLoading && (
            <FetchTranslatorLoadingContainer>
              <Spinner margin={'0 10px 0 0'} />
              <SubHeading>Fetching translators...</SubHeading>
            </FetchTranslatorLoadingContainer>
          )}
          {
            props.fetchTranslatorsRequest.res &&
              props.fetchTranslatorsRequest.res.length === 0 &&
              props.formInputs.deviceModelName.value &&
              !props.fetchTranslatorsRequest.isLoading && (
                <InfoBox
                  heading={'No translator found for this device.'}
                />
            )
          }

          {
            props.fetchTranslatorsRequest.res &&
              props.fetchTranslatorsRequest.res.length === 1 &&
              !props.formInputs.isTranslatorSelectorShown.value &&
              props.formInputs.deviceModelName.value &&
              !props.fetchTranslatorsRequest.isLoading && (
                <>
                  <CurrentlyUsing>One translator found!</CurrentlyUsing>
                  <SubHeading>advanced settings unavailable</SubHeading>
                </>
            )
          }

          {
            props.fetchTranslatorsRequest.res &&
              props.fetchTranslatorsRequest.res.length > 1 &&
              !props.formInputs.isTranslatorSelectorShown.value &&
              props.formInputs.deviceModelName.value &&
              !props.fetchTranslatorsRequest.isLoading &&
              props.formInputs.addedTranslators.value && (
                <>
                  <div style={{display: DefaultTranslatorInformation}}>
                    <CurrentlyUsing>
                      "{CurrentlyUsingTranslator}" set as first translator
                    </CurrentlyUsing>
                  </div>
                  <div style={{display: NoTranslatorInformation}}>
                    <CurrentlyUsing>No translator in use </CurrentlyUsing>
                  </div>
                  <Collapsible
                    openedHeight={`${props.formInputs.addedTranslators.length * 50}px`}
                    open={isCollapsibleOpen}
                    onClick={() => setCollapsibleOpen(!isCollapsibleOpen)}
                    label={<CollapseButton filterName='type' {...props} />}
                  >
                    <div style={{display: 'block', width: '100%'}}>
                      <div style={{display: DefaultTranslatorInformation}}>
                        <TitleContainer>
                          <InfoItem>
                            Translator name:
                          </InfoItem>
                          <InfoItem>
                            Author:
                          </InfoItem>
                          <InfoItem>
                            Version:
                          </InfoItem>
                          <InfoItem>
                            Update Interval:
                          </InfoItem>
                        </TitleContainer>
                      </div>
                      <TranslatorSelector
                        shouldAddDefaultTranslator
                        availableTranslators={props.fetchTranslatorsRequest.res}
                        onChange={addedTranslators => {
                          if (addedTranslators.length === 0) {
                            setAddedTranslatorsEmpty(true);
                            setCurrentlyUsingTranslator('none');
                          } else {
                            setAddedTranslatorsEmpty(false);
                            setCurrentlyUsingTranslator(addedTranslators[0].name);
                          }
                          props.setInputValue('addedTranslators', addedTranslators);
                        }}
                      />
                    </div>
                  </Collapsible>
                </>
            )
          }

          {props.formInputs.isTranslatorSelectorShown.value && (
            <>
              <TranslatorSelector
                availableTranslators={props.fetchTranslatorsRequest.res}
                onChange={addedTranslators => {
                  props.setInputValue('addedTranslators', addedTranslators);
                }}
              />
              <SubLink
                style={{marginTop: '15px'}}
                onClick={() => (props.formInputs.isTranslatorSelectorShown.value
                  ? props.setInputValue('isTranslatorSelectorShown', false)
                  : props.setInputValue('isTranslatorSelectorShown', true)
                )}
                disabled={!props.formInputs.deviceModelName.value}
              >
                hide edit translators
                <Icon
                  style={{display: 'inline-block', marginLeft: '2px', color: 'black'}}
                  icon={arrowUp}
                  size={10}
                />
              </SubLink>
            </>
          )}
        </ContentContainer>
        <NavButtonsContainer>
          <Button
            content={'Back'}
            ghosted
            onClick={() => props.onBack()}
          />
          <Button
            color={'green'}
            content={'Continue'}
            onClick={props.onContinue}
          />
        </NavButtonsContainer>
      </StyledContainerBox>
    </>
  );
};

BasicTranslatorPane.propTypes = exact({
  // from selectors
  deviceModelOptions: PropTypes.array,
  translatorOptions: PropTypes.array,
  // from events
  onInputChange: PropTypes.func,
  onContinue: PropTypes.func,
  // from top
  fetchTranslators: PropTypes.func,
  translators: PropTypes.object,
  fetchTranslatorsRequest: PropTypes.object,
  getDeviceModelNamesRequest: PropTypes.object,
  getDeviceModelNames: PropTypes.func,
  setFilterCollapsed: PropTypes.func,
  filterCollapsed: PropTypes.object,
  handleValueChange: PropTypes.func,
  onBack: PropTypes.func,
  incrementCurrentStep: PropTypes.func,
  ...getFormShape({
    secret: PropTypes.string,
  }),
});

const TranslatorPane = compose(
  withFetchDeviceModelNames,
  withOnDeviceModelNameSelected,
  withReselect(selectors),
  withEvents({...events, onInputChange}),
)(BasicTranslatorPane);

TranslatorPane.propTypes = exact({
  fetchTranslators: PropTypes.func,
  translators: PropTypes.object,
  fetchTranslatorsRequest: PropTypes.object,
  createDeviceRequest: PropTypes.object,
  getDeviceModelNamesRequest: PropTypes.object,
  getDeviceModelNames: PropTypes.func,
  onBack: PropTypes.func,
  incrementCurrentStep: PropTypes.func,
  ...getFormShape({
    secret: PropTypes.string,
  }),
});

export default TranslatorPane;
