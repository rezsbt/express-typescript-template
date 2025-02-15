import { SampleController } from '@/controllers/sample.controller'
import { CreateSampleDto, UpdateSampleDto } from '@/dtos/sample.dto'
import { Routes } from '@/interfaces/routes.interface'
import { ValidationMiddleware } from '@/middlewares/validation.middleware'
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
    this.router.get('/:id', this.controller.getById)
    this.router.post('/', ValidationMiddleware(CreateSampleDto), this.controller.create)
    this.router.delete('/:id/hard', this.controller.hardDelete)
    this.router.put('/:id', ValidationMiddleware(UpdateSampleDto), this.controller.update)
  }
}
