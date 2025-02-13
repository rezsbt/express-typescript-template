import { ISample } from '@/interfaces/sample.interface'
import { SampleRepository } from '@/repositories/sample.respository'
import Container, { Service } from 'typedi'

@Service()
export class SampleService {
  private repo: SampleRepository

  constructor() {
    this.repo = Container.get(SampleRepository)
  }

  public findAll = async (): Promise<ISample[]> => {
    const samples: ISample[] = await this.repo.getAll()
    return samples
  }
}
