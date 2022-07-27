export namespace CreateUser {
  export type Input = {
    name: string;
    email: string;
    password: string;
    driverLicense: string;
    isAdmin: boolean;
    avatar?: string;
  };

  export type Output = Promise<void>;
}
