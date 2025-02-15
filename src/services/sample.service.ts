import { CreateSampleDto, ISample, UpdateSampleDto } from '@/interfaces/sample.interface'
import { SampleRepository } from '@/repositories/sample.respository'
import Container, { Service } from 'typedi'

@Service()
export class SampleService {
  private repo: SampleRepository

  constructor() {
    this.repo = Container.get(SampleRepository)
  }

  public getAll = async (): Promise<ISample[]> => {
    const data: ISample[] = await this.repo.getAll()
    return data
  }
  public getById = async (id: string): Promise<ISample> => {
    const data: ISample = await this.repo.getById(id)
    return data
  }
  public create = async (sampleDto: CreateSampleDto): Promise<ISample> => {
    const data: ISample = await this.repo.create(sampleDto)
    return data
  }
  public update = async (id: string, sampleDto: UpdateSampleDto): Promise<ISample> => {
    const data: ISample = await this.repo.update(id, sampleDto)
    return data
  }
}
