import React from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

import specification from './swagger.json';

const SwaggerUI = dynamic(
  async () => import('swagger-ui-react'),
  {ssr: false},
);

const Swagger = () => {
  return <SwaggerUI spec={specification} />;
};

export default Swagger;
