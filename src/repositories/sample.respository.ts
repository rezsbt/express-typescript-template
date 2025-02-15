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
  public update = async (id: string, sampleDto: CreateSampleDto): Promise<ISample> => {
    this.checkExistById(id)
    const sampleByTitle = await this.checkExistByTitle(sampleDto.title)
    const areSameId = !!sampleByTitle && sampleByTitle._id.toString() === id
    if (!!sampleByTitle && !areSameId) {
      throw new HttpException(409, 'sample with this title already exist.')
    }
    await this.model.updateOne({ _id: id }, sampleDto)
    const data = this.checkExistById(id)
    return data
  }

  public checkExistByTitle = async (title: string): Promise<ISample | null> => {
    const data = await this.model.findOne({ title })
    return data
  }
  public checkExistById = async (id: string): Promise<ISample> => {
    this.checkIsValidId(id)
    const data = await this.model.findById(id)
    if (!data) {
      console.log('Error message: ', 'Sample not found')
      throw new HttpException(404, 'sample not found')
    }
    return data
  }
  public checkIsValidId = (id: string): void => {
    const isValid = Types.ObjectId.isValid(id)
    if (!isValid) throw new HttpException(400, 'invalid id format')
  }
}
