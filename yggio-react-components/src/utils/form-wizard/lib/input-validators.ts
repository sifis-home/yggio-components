/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import {InputValue} from '../../../types';

const emailPattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/i;
const hexPattern = /^[A-Fa-f0-9]*$/;
const hex16Pattern = /^[A-F0-9]{16}$/;

const inputRequired = (message: string) => ({
  validate: (value: InputValue) => (
    typeof value === 'string' && value.length !== 0
  ),
  message,
});

const nonEmptyTrimmedString = (message: string) => ({
  validate: (value: InputValue) => (
    typeof value === 'string' && _.trim(value).length !== 0
  ),
  message,
});

const minimumLength = (minLength: number) => ({
  validate: (value: InputValue) => {
    if (!value) return true;
    return typeof value === 'string' && value.length >= minLength;
  },
  message: `Must be at least ${minLength} characters`,
});

const maximumLength = (maxLength: number) => ({
  validate: (value: InputValue) => {
    if (!value) return true;
    return typeof value === 'string' && value.length <= maxLength;
  },
  message: `Cannot be longer than ${maxLength} characters`,
});

const validEmailAddress = ({
  validate: (value: InputValue) => {
    if (!value) return true;
    return typeof value === 'string' && emailPattern.test(value);
  },
  message: 'Please enter a valid email address',
});

const hexString = ({
  validate: (value: InputValue) => hexPattern.test(value as string),
  message: 'Must be a hexadecimal string',
});

const hexStringOfLength16 = ({
  validate: (value: InputValue) => hex16Pattern.test(value as string),
  message: 'Must be 16 characters, numbers and A-F letters only',
});

const numberBetween = (min: number, max: number) => ({
  validate: (value: InputValue) => {
    const numericPattern = /^[0-9]*$/;
    if (!_.isString(value)) return false;
    if (!numericPattern.test(value)) return false;
    if (value.charAt(0) === '0') return false;
    const intValue = parseInt(value, 10);
    return intValue >= min && intValue <= max;
  },
  message: `Must be a number between ${min}-${max}`,
});

const validJson = ({
  validate: (value: InputValue) => {
    try {
      JSON.parse(value as string);
      return true;
    } catch (error) {
      return false;
    }
  },
  message: `Invlaid JSON`,
});


export default {
  inputRequired,
  nonEmptyTrimmedString,
  minimumLength,
  maximumLength,
  validEmailAddress,
  hexString,
  hexStringOfLength16,
  numberBetween,
  validJson,
};
