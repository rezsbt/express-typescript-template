import { connect, set } from 'mongoose'
import { NODE_ENV, DATABASE_URI, DATABASE_NAME } from '@/config'
import { logger } from '@/utils/logger'

export const connectToMongodb = async () => {
  const dbConfig = {
    url: `${DATABASE_URI}/${DATABASE_NAME}`,
  }
  if (NODE_ENV !== 'production') {
    set('debug', true)
  }
  await connect(dbConfig.url)
    .then(() => logger.info(`MongoDB connected to ${DATABASE_NAME} successfully.`))
    .catch(err => logger.error("MongoDB connection failed: ", err))
}
