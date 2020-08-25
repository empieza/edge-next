export declare type UserType = {
  username: string;
  id: string;
  salt: string;
  hash: string;
  email: string;
  roles: string[];
  facebook?: string;
  google?: string;
  github?: string;
  emailVerified?: boolean;
  emailVerificationToken?: string;
  createdAt: number;
  profile: {
    displayName: string;
    picture: {
      path: string;
    }
  };
  tokens: object;
  metadata: {
    lastLogin?: number;
    reported?: number;
  }
}