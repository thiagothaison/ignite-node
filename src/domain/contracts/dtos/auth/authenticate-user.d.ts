export namespace AuthenticateUser {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    user: {
      name: string;
      email: string;
    };
    token: string;
  };
}
