import { cleanEnv, host, port, str } from 'envalid'

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    HOST: host(),
    SWAGGER_TITLE: str(),
    SWAGGER_DESCRIPTION: str()
  })
}
