export namespace UpdateUser {
  export type Input = {
    id: string;
    name: string;
    email: string;
    password: string;
    driverLicense: string;
    isAdmin: boolean;
    avatar?: string;
  };

  export type Output = Promise<void>;
}
