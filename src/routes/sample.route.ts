import { SampleController } from '@/controllers/sample.controller'
import { Routes } from '@/interfaces/routes.interface'
import { Router } from 'express'

export class SampleRoute implements Routes {
  public path: string
  public router: Router
  public controller: SampleController

  constructor() {
    this.path = '/samples'
    this.router = Router()
    this.controller = new SampleController()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', this.controller.getAll)
  }
}
