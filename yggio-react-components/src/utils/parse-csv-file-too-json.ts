/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import csvtojson from 'csvtojson';
import _ from 'lodash';

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
  const extension = _.get(file, 'name').split('.')[1];
  if (extension !== 'csv') {
    throw Error('The file is not a CSV file.');
  }
  return readFileAsync();
};

export default parseCsvFileToJson;
