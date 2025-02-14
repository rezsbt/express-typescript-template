import { ISample } from '@/interfaces/sample.interface'
import { Model, model, Schema } from 'mongoose'

const sampleSchema = new Schema<ISample>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      default: null,
      lowercase: true
    }
  },
  {
    timestamps: true
  }
)

export const sampleModel: Model<ISample> = model<ISample>('sample', sampleSchema)
