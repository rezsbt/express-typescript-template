import { ISample } from '@/interfaces/sample.interface'
import { sampleModel } from '@/models/sample.model'
import { Model } from 'mongoose'
import { Service } from 'typedi'

@Service()
export class SampleRepository {
  private model: Model<ISample>
  constructor() {
    this.model = sampleModel
  }

  public getAll = async (): Promise<ISample[]> => {
    const data = await this.model.find()
    return data
  }
}
