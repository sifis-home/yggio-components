/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import React from 'react';
import {Story} from '@storybook/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const ReactQueryDecorator = (StoryComponent: Story) => (
  <QueryClientProvider client={queryClient}>
    <StoryComponent />
  </QueryClientProvider>
);

const YggioDefaultDecoratorStyled = styled.div`
  background: #F7F9FA;
  padding: 20px;
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
  font-family: Lato, Arial, sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const YggioFontDecoratorStyled = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
  font-family: Lato, Arial, sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const LightGrayBackgroundDecoratorStyled = styled.div`
  background: #F7F9FA;
`;

const PaddingDecoratorStyled = styled.div`
  padding: 30px;
`;

const wrapStory = (Decorator: React.FC<React.PropsWithChildren>) => (StoryComponent: Story) => (
  <Decorator>
    <StoryComponent />
  </Decorator>
);

const YggioDefaultDecorator = wrapStory(YggioDefaultDecoratorStyled);
const YggioFontDecorator = wrapStory(YggioFontDecoratorStyled);
const LightGrayBackgroundDecorator = wrapStory(LightGrayBackgroundDecoratorStyled);
const PaddingDecorator = wrapStory(PaddingDecoratorStyled);

export {
  ReactQueryDecorator,
  YggioDefaultDecorator,
  YggioFontDecorator,
  LightGrayBackgroundDecorator,
  PaddingDecorator,
};
