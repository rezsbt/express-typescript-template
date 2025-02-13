import { cleanEnv, port, str } from 'envalid'

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    // ** Environment
    NODE_ENV: str(),
    // ** Host & Port
    PORT: port(),
    HOST: str(),
    // ** Swagger
    SWAGGER_TITLE: str(),
    SWAGGER_DESCRIPTION: str(),
    // ** Database
    DATABASE_URI: str(),
    DATABASE_NAME: str()
  })
}
