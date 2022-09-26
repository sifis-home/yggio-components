/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {compose} from 'lodash/fp';
import React from 'react';
import _ from 'lodash';
import {Icon} from 'react-icons-kit';
import {cross} from 'react-icons-kit/metrize/cross';
import {androidArrowDropup} from 'react-icons-kit/ionicons/androidArrowDropup';
import {androidArrowDropdown} from 'react-icons-kit/ionicons/androidArrowDropdown';
import PropTypes from 'prop-types';

import selectors from './selectors';
import {withState, withReselect} from '../../hocs';
import state from './state';
import {
  Container,
  Item,
  ButtonItem,
  ArrowContainer,
  RemoveButton,
  DeviceTypeContainer,
  IconContainer,
  ArrowItem,
} from './styled';
import Select from '../select';
import {
  withAddDefaultTranslator,
  withAddedTranslatorChanged,
  withAvailableTranslatorChanged,
} from './effects';

const BottomSelectStyles = {
  container: provided => ({
    ...provided,
    fontFamily: 'Lato,Arial,sans-serif',
    fontSize: '13px',
    padding: 0,
  }),
  control: base => ({
    ...base,
    cursor: 'pointer',
    fontSize: '13px',
    marginTop: '5%',
  }),
  input: (provided, state) => ({
    ...provided,
    fontSize: '13px',
    border: state.isFocused ? 'none' : 'none',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    fontSize: '13px',
    border: state.isFocused ? 'none' : 'none',
  }),
};

const SelectStyles = {
  control: base => ({
    ...base,
    border: 0,
    fontSize: '13px',
    marginTop: '2px',
    boxShadow: 'none',
    cursor: 'pointer',
    fontFamily: 'Lato,Arial,sans-serif',
  }),
  input: (provided, state) => ({
    ...provided,
    fontSize: '13px',
    border: state.isFocused ? 'none' : 'none',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    fontSize: '13px',
    border: state.isFocused ? 'none' : 'none',
  }),
  option: provided => ({
    ...provided,
    fontSize: '13px',
  }),
};


const BasicTranslatorSelector = props => {
  return (
    <>
      {_.map(props.addedTranslators, (translator, index) => (
        <Container key={index}>
          <ArrowItem>
            <ArrowContainer>
              <IconContainer>
                <Icon
                  icon={androidArrowDropup}
                  size={20}
                  onClick={() => props.moveTranslatorUp(index)}
                />
              </IconContainer>
              <IconContainer>
                <Icon
                  icon={androidArrowDropdown}
                  size={20}
                  onClick={() => props.moveTranslatorDown(index)}
                />
              </IconContainer>
            </ArrowContainer>
          </ArrowItem>
          <Item>
            <DeviceTypeContainer>{translator.name}</DeviceTypeContainer>
          </Item>
          <Item>
            <DeviceTypeContainer>{translator.username}</DeviceTypeContainer>
          </Item>
          <Item>
            <Select
              styles={SelectStyles}
              onChange={evt => {
                props.setVersion(evt.target.value, index);
              }}
              defaultValue={{
                label: props.addedTranslators[index].selectedVersion,
                value: props.addedTranslators[index].selectedVersion
              } ||
              {
                label: props.addedTranslators[index].versions[0],
                value: props.addedTranslators[index].versions[0],
              }}
              options={_.map(props.addedTranslators[index].versions, (version, index) => ({
                label: version,
                value: version,
                key: index,
              }))}
            />
          </Item>
          <Item>
            <Select
              styles={SelectStyles}
              defaultValue={{label: 'Major updates', value: 'major'}}
              onChange={evt => props.setUpdateOption(evt.target.value, index)}
              options={[
                {
                  value: 'major',
                  label: 'Major updates',
                },
                {
                  value: 'minor',
                  label: 'Minor updates',
                },
                {
                  value: 'patch',
                  label: 'Patch updates',
                },
                {
                  value: 'none',
                  label: 'No updates',
                }
              ]}
            />
          </Item>
          <ButtonItem>
            <RemoveButton>
              <Icon
                icon={cross}
                size={18}
                onClick={() => props.removeTranslator(translator)}
              />
            </RemoveButton>
          </ButtonItem>
        </Container>
      ))}
      <Select
        onChange={evt => {
          const transformedTranslator = _.find(
            props.transformedAvailableTranslators,
            {identifier: evt.target.value}
          );
          props.addTranslator(transformedTranslator);
        }}
        options={props.availableTranslatorsOptions}
        placeholder={'Add translator...'}
        value={'Select...'}
        styles={BottomSelectStyles}
      />
    </>
  );
};

BasicTranslatorSelector.propTypes = {
  // from selectors
  transformedAvailableTranslators: PropTypes.array,
  availableTranslatorsOptions: PropTypes.array,
  // from state
  addedTranslators: PropTypes.array,
  addTranslator: PropTypes.func,
  removeTranslator: PropTypes.func,
  moveTranslatorUp: PropTypes.func,
  moveTranslatorDown: PropTypes.func,
  setUpdateOption: PropTypes.func,
  setVersion: PropTypes.func,
  // from top
  translator: PropTypes.object,
  initialTranslators: PropTypes.array,
  index: PropTypes.number,
};

const RawTranslatorSelector = compose(
  withState(state),
  withReselect(selectors),
  withAddedTranslatorChanged,
  withAddDefaultTranslator,
  withAvailableTranslatorChanged,
)(BasicTranslatorSelector);

RawTranslatorSelector.propTypes = {
  availableTranslators: PropTypes.array,
  initialTranslators: PropTypes.array,
};

export default RawTranslatorSelector;
