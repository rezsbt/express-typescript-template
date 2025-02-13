import { Document } from 'mongoose'

export interface ISample extends Document {
  title: string
  description?: string
}
