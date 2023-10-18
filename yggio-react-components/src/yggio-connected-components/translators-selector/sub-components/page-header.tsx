import React from 'react';
import _ from 'lodash';
import {MdHelpOutline as HelpIcon} from 'react-icons/md';

import {Translate} from '../../../types';
import {TranslatorsSelectorPage} from '../types';
import {
  Header,
  Heading,
  HelpLink,
} from '../styled';

interface PageHeaderProps {
  title?: string;
  onCurrentPageChange: (page: TranslatorsSelectorPage) => void;
  t: Translate;
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <Header>
      <Heading>{props.title}</Heading>
      <HelpLink onClick={() => props.onCurrentPageChange(TranslatorsSelectorPage.help)}>
        <HelpIcon size={18} style={{margin: '0 5px 0 0'}} />
        {_.capitalize(props.t('common.help'))}
      </HelpLink>
    </Header>
  );
};

export default PageHeader;
