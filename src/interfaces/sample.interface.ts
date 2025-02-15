import { Document } from 'mongoose'

export interface ISample extends Document {
  title: string
  description?: string
}

export interface CreateSampleDto {
  title: string
  description?: string
}

export interface UpdateSampleDto {
  title: string
  description?: string
}
