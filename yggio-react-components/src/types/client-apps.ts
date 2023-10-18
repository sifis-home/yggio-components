interface ClientApp {
  _id: string;
  /* eslint-disable camelcase */
  client_id: string;
  info: string;
  consentRequired: boolean;
  redirect_uri: string[];
  /* eslint-enable camelcase */
}

export type {
  ClientApp,
};
