interface User {
  username: string;
  email: string;
  password: string;
  _id: string;
  globalVisibility: boolean;
  language: 'en' | 'de';
}

type Users = User[];

export type {
  User,
  Users,
};
