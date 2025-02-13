import { ISample } from '@/interfaces/sample.interface'
import { Model, model, Schema } from 'mongoose'

const sampleSchema = new Schema<ISample>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export const sampleModel: Model<ISample> = model<ISample>('sample', sampleSchema)
