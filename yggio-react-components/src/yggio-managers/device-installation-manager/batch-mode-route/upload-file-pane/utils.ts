/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import csvtojson from 'csvtojson';

import {FIELDS} from './constants';
import {Device} from '../../../../types';

const FIELDS_VALUES = _.values(FIELDS);

const parseCsvFileToJson = async (file: File) => {
  const readFileAsync = async () => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onabort = () => reject(Error('File reading was aborted.'));
      reader.onerror = () => reject(Error('Could not read the file.'));
      reader.onload = async () => {
        await csvtojson({
          delimiter: 'auto', // delimiter will be auto-detected (by best attempt)
        })
          .fromString(reader.result as string)

          // This correct the letter case for certain headers
          .preFileLine((fileLineString, lineIdx) => {
            if (lineIdx === 0) {
              const correctedHeaderLine = _.reduce(FIELDS_VALUES, (result, oneCase) => {
                const regEx = new RegExp(oneCase, 'ig');
                return _.replace(result, regEx, oneCase);
              }, fileLineString);
              return correctedHeaderLine;
            }
            return fileLineString;
          })

          .then(foundItems => {
            if (foundItems.length > 0) {
              resolve(foundItems);
            } else {
              reject(Error('Found no valid lines.'));
            }
          });
      };
      reader.readAsText(file);
    });
  };
  return readFileAsync();
};

const assertDataIsNotTooLarge = (items: Record<string, string>[], requestBodySizeLimit: number) => {
  const fileNumBytes = new TextEncoder().encode(JSON.stringify(items)).length;
  if (fileNumBytes <= requestBodySizeLimit) return;
  const limitInKBRounded = Math.round(requestBodySizeLimit / (1024 * 100)) / 100;
  const fileNumKiloBytesRounded = Math.round(fileNumBytes / (1024 * 100)) / 100;
  throw Error(`Uploaded file contains too much data. It results in ${fileNumKiloBytesRounded} KB and can max be ${limitInKBRounded} KB.`);
};

const resolveConnectorName = (loraConnectorDevices: Device[], connector: string) => {
  if (connector === 'none') {
    return 'None';
  }
  return _.find(loraConnectorDevices, {_id: connector})?.downlinkQueue;
};

export {
  parseCsvFileToJson,
  assertDataIsNotTooLarge,
  resolveConnectorName,
};
