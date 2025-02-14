import { HttpException } from '@/exceptions/HttpException'
import { CreateSampleDto, ISample } from '@/interfaces/sample.interface'
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
  public create = async (sampleDto: CreateSampleDto): Promise<ISample> => {
    const sample = await this.checkExistByTitle(sampleDto.title)
    if (!sample) {
      const data = await this.model.create(sampleDto)
      return data
    } else {
      console.log(sample)
      throw new HttpException(409, 'sample with this title already exist.')
    }
  }

  public checkExistByTitle = async (title: string): Promise<ISample | null> => {
    const data = await this.model.findOne({ title })
    return data
  }
}
