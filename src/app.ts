import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  ORIGIN,
  CREDENTIALS,
  HOST,
  SWAGGER_TITLE,
  SWAGGER_DESCRIPTION,
  SWAGGER_VERSION
} from '@/config/env.config'
import { Routes } from '@/interfaces/routes.interface'
import { ErrorMiddleware } from '@/middlewares/error.middleware'
import { logger, stream } from '@/utils/logger'
import { SwaggerTheme } from 'swagger-themes'
import { SwaggerThemeNameEnum } from 'swagger-themes'
import { connectToMongodb } from '@/database/mongoose.db'
import { appVersion } from '@/config/app-version.config'

export class App {
  public app: express.Application
  public env: string
  public port: string | number
  public host: string
  public address: string
  public appVersion: string
  public swaggerTitle: string
  public swaggerDescription: string
  public swaggerVersion: string

  constructor(routes: Routes[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 3000
    this.host = HOST || 'http://localhost'
    this.appVersion = appVersion || '0.0.0'
    this.address = `${this.host}:${this.port}`
    this.swaggerTitle = SWAGGER_TITLE || 'Swagger title not set'
    this.swaggerDescription = SWAGGER_DESCRIPTION || 'Swagger description not set'
    this.swaggerVersion = SWAGGER_VERSION || this.appVersion
    this.connectToDatabase()
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeSwagger()
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(this.port, async () => {
      console.clear()
      logger.info(`Node environment: ${this.env}`)
      logger.info(`Swagger URL: ${this.address}/api-docs`)
    })
  }

  public getServer() {
    return this.app
  }

  private async connectToDatabase() {
    await connectToMongodb()
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }))
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }))
    this.app.use(hpp())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use(route?.path || '/', route.router)
    })
  }

  private initializeSwagger() {
    const theme = new SwaggerTheme()

    const options = {
      swaggerDefinition: {
        info: {
          title: this.swaggerTitle,
          version: this.swaggerVersion,
          description: this.swaggerDescription
        }
      },
      apis: [process.cwd() + '/src/swagger/**/*.swagger.yaml']
    }

    const specs = swaggerJSDoc(options)
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(specs, {
        explorer: true,
        customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
      })
    )
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware)
  }
}
