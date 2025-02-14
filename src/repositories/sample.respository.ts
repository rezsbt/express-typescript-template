import { HttpException } from '@/exceptions/HttpException'
import { CreateSampleDto, ISample } from '@/interfaces/sample.interface'
import { sampleModel } from '@/models/sample.model'
import { Model, Types } from 'mongoose'
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
  public getById = async (id: string): Promise<ISample> => {
    this.checkIsValidId(id)
    const data = await this.model.findById(id)
    if (!data) throw new HttpException(404, 'sample not found')
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
  public checkIsValidId = (id: string): void => {
    const isValid = Types.ObjectId.isValid(id)
    if (!isValid) throw new HttpException(400, 'invalid id format')
  }
}
