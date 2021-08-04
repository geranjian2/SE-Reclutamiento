export interface IRead<T> {
    findAll(): Promise<T[]>;
    findOne(conditions: Partial<T>): Promise<T | null>;
    findById(id: string): Promise<T | null>;
  }