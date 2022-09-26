/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const customStyles = {
  container: provided => ({
    ...provided,
    fontFamily: 'Lato,Arial,sans-serif',
    fontSize: '13px',
  }),
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? '0 0 2px 1px #4287f5' : 'none',
    border: state.isFocused ? '1px solid #ccc' : 'solid 1px #ccc',
    cursor: 'pointer',
  }),
  input: provided => ({
    ...provided,
    height: '29px',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingLeft: state.isFocused ? '10px' : '10px',
  }),
  option: provided => ({
    ...provided,
  }),
};

export {
  customStyles,
};
