/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// row-table.js

import React from 'react';
import {formatDistance, isValid, parseISO} from 'date-fns';
import _ from 'lodash';
import {TableBody, TableHeader, TableItem, TableRow} from '../styled';

const RowTable = ({items, style, labels, onClick, createDetails}) => {
  const tableLabels = _.map(labels, label => {
    if (_.isPlainObject(label)) {
      const [result] = _.entries(label);
      const [key, val] = result;

      return (
        <TableItem key={key}>
          {val}
        </TableItem>
      );
    }
    return <TableItem key={label}>{label}</TableItem>;
  });

  const tableProps = item => _.map(labels, labelValue => {
    const getLabel = () => {
      if (_.isPlainObject(labelValue)) {
        const [result] = _.entries(labelValue);
        const [key] = result;
        return key;
      }

      return labelValue;
    };

    const label = getLabel();

    const prop = item[label];

    if (React.isValidElement(prop)) {
      const Component = () => prop;
      return (
        <TableItem width={'auto'} key={label}>
          <Component />
        </TableItem>
      );
    }

    if (_.isArray(prop) || _.isPlainObject(prop)) {
      return (
        <TableItem key={label}>
          {createDetails(item, label)}
        </TableItem>
      );
    }

    const date = parseISO(prop);
    if (isValid(date)) {
      return (
        <TableItem key={label}>
          {`${formatDistance(date, new Date())} ago`}
        </TableItem>
      );
    }
    return (
      <TableItem key={label}>
        {prop || 'Unknown'}
      </TableItem>
    );
  });

  const tableItems = _.map(items, item => (
    <TableRow onClick={onClick(item)} {...style} key={item._id}>
      {tableProps(item)}
    </TableRow>
  ));

  return (
    <>
      {!_.isEmpty(labels) && (
        <TableHeader {...style}>{tableLabels}</TableHeader>
      )}

      <TableBody>{tableItems}</TableBody>
    </>
  );
};

export default RowTable;
