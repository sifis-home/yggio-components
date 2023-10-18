interface AuthCodeProps {
  code?: string | string[];
  clientId: string;
  redirectionEndpoint: string;
}

interface UserAuthProps {
  username: string;
  password: string;
}

export type {
  AuthCodeProps,
  UserAuthProps,
};
