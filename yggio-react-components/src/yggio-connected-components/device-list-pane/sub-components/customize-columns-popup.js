/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import {Icon} from 'react-icons-kit';
import {ic_close as removeIcon} from 'react-icons-kit/md/ic_close';
import {ic_keyboard_arrow_down as downIcon} from 'react-icons-kit/md/ic_keyboard_arrow_down';
import {ic_keyboard_arrow_up as upIcon} from 'react-icons-kit/md/ic_keyboard_arrow_up';

import {
  addColumnOptions,
  presetOptions,
  moveItemUpInArray,
  moveItemDownInArray,
} from '../utils';
import {COLUMNS, COLUMN_PRESETS} from '../constants';
import Button from '../../../components/button';
import Select from '../../../components/select';
import {
  FlexWrapper,
} from '../../../global/styled';
import {
  CustomizeColumnsHeader,
  CustomizeColumnsMainSection,
  CustomizeColumnsFooter,
  CustomizeColumnsItem,
  CustomizeColumnsItemButton,
} from '../styled';

const CustomizeColumnsPopup = props => {

  return (
    <>
      <CustomizeColumnsHeader>
        {props.t('labels.customizeColumns')}
        <Button
          content={props.t('common.done')}
          onClick={props.onClose}
          ghosted
          width={'fit'}
          height={'30px'}
          padding={'0 15px'}
        />
      </CustomizeColumnsHeader>
      <CustomizeColumnsMainSection>
        {_.map(props.columns, (column, index) => (
          <CustomizeColumnsItem key={column} disabled={column === COLUMNS.name.name}>
            <p>{props.t(`columns.${column}`)}</p>
            {column !== COLUMNS.name.name && (
              <FlexWrapper>
                <CustomizeColumnsItemButton
                  disabled={index === 1}
                  onClick={() => props.setColumns(moveItemUpInArray(props.columns, index))}
                >
                  <Icon icon={upIcon} size={18} />
                </CustomizeColumnsItemButton>
                <CustomizeColumnsItemButton
                  disabled={index === props.columns.length - 1}
                  onClick={() => props.setColumns(moveItemDownInArray(props.columns, index))}
                  margin={'0 30px 0 0'}
                >
                  <Icon icon={downIcon} size={18} />
                </CustomizeColumnsItemButton>
                <CustomizeColumnsItemButton
                  onClick={() => (
                    props.setColumns(_.without(props.columns, column))
                  )}
                >
                  <Icon icon={removeIcon} size={14} />
                </CustomizeColumnsItemButton>
              </FlexWrapper>
            )}
          </CustomizeColumnsItem>
        ))}
      </CustomizeColumnsMainSection>
      <CustomizeColumnsFooter>
        <Select
          placeholder={props.t(`labels.addColumn`)}
          options={addColumnOptions(props.columns, props.t)}
          margin={'0 10px 0 0'}
          onChange={evt => {
            const {target: {value}} = evt;
            props.setColumns([...props.columns, value]);
          }}
          menuPlacement='top'
        />
        <Select
          placeholder={props.t(`labels.selectPreset`)}
          options={presetOptions}
          onChange={evt => {
            const {target: {value}} = evt;
            props.setColumns(COLUMN_PRESETS[value].columns);
          }}
          menuPlacement='top'
        />
      </CustomizeColumnsFooter>
    </>
  );
};

CustomizeColumnsPopup.propTypes = exact({
  columns: PropTypes.array,
  setColumns: PropTypes.func,
  onClose: PropTypes.func,
  t: PropTypes.func,
});

export default CustomizeColumnsPopup;
