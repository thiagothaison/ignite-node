type CreateParameters = { carId: string; image: string };

interface ICarImageRepository {
  create(data: CreateParameters): Promise<void>;
}

export { ICarImageRepository, CreateParameters };
