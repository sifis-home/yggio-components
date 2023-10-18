/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {ChakraProvider, theme as chakraTheme, extendTheme} from '@chakra-ui/react';

const fontFamily = 'Lato,Arial,serif';

const customTheme = extendTheme({
  fonts: {
    ...chakraTheme.fonts,
    body: fontFamily,
    heading: fontFamily,
    mono: fontFamily,
  },
  styles: {
    global: {
      body: {
        bg: '#f7f9fa',
      },
    },
  },
});

const withChakraProvider = Component => {
  const ChakraHoc = props => (
    <ChakraProvider theme={customTheme}>
      <Component {...props} />
    </ChakraProvider>
  );
  return ChakraHoc;
};

export default withChakraProvider;
