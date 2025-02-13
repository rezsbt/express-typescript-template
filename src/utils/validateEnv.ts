import { cleanEnv, port, str } from 'envalid'

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    HOST: str(),
    SWAGGER_TITLE: str(),
    SWAGGER_DESCRIPTION: str(),
    DATABASE_URI: str(),
    DATABASE_NAME: str()
  })
}
