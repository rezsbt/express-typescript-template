import 'reflect-metadata'
import { App } from '@/app'
import { SampleRoute } from '@/routes/sample.route'
import { ValidateEnv } from '@/utils/validateEnv'

ValidateEnv()

const app = new App([new SampleRoute()])

app.listen()
