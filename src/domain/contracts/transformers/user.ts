type UserTransformer = {
  id: string;
  name: string;
  email: string;
  driverLicense: string;
  avatarUrl(): string;
};

export { UserTransformer };
