interface IBaseUseCase<I, O> {
  execute(data: I): O;
}

export { IBaseUseCase };
