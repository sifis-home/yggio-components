/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const assert = require('assert');
const createIdKeyedObject = require('../../src/utils/create-id-keyed-object');

describe('Create id keyed object', () => {

  it('Create id keyed object out of an array of objects', () => {
    const arr = [
      {_id: '1', name: '1'},
      {_id: '2', name: '2'},
    ];
    const actual = createIdKeyedObject(arr, '_id');
    const expected = {
      1: {_id: '1', name: '1'},
      2: {_id: '2', name: '2'},
    };
    assert.deepStrictEqual(expected, actual);
  });

});
