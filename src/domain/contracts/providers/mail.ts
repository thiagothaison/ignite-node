interface IVariable {
  [key: string]: string | number;
}

interface IMailProvider {
  send(
    to: string,
    subject: string,
    template: string,
    variables: IVariable
  ): Promise<void>;
}

export { IMailProvider, IVariable };
