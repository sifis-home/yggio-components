import React from 'react';
import {NextRouter} from 'next/router';

import {DEFAULTS} from '../constants';
import LogoIcon from '../../../components/logo';
import YGGIO_LOGO from '../../../assets/images/yggio-icon.svg';
import {Title, NavButton} from '../styled';

interface LogoProps {
  router: NextRouter;
  title?: string;
}

const Logo = (props: LogoProps) => (
  <NavButton
    data-cy='yggio-logo'
    onClick={async () => props.router.push('/')}
  >
    <LogoIcon
      src={YGGIO_LOGO}
      alt={'Yggio'}
      height={'21px'}
      width={'21px'}
      margin={'0 9px 0 0'}
    />
    <Title>
      {props.title || DEFAULTS.title}
    </Title>
  </NavButton>
);

export default Logo;
