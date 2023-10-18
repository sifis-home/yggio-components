import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const UnauthorizedUserPane = dynamic(
  () => import('yggio-react-components').then(mod => mod.UnauthorizedUserPane),
  {ssr: false}
);

const withAuthCheck = Component => {
  const AuthCheck = props => {
    const router = useRouter();
    return (
      <UnauthorizedUserPane router={router} >
        <Component {...props} />
      </UnauthorizedUserPane>
    );
  };
  return AuthCheck;
};

export default withAuthCheck;
