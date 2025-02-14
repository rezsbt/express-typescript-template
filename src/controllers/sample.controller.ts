import { SampleService } from '@/services/sample.service'
import { Request, Response, NextFunction } from 'express'
import Container from 'typedi'

export class SampleController {
  private service: SampleService

  constructor() {
    this.service = Container.get(SampleService)
  }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getAll()
      res.status(200).json({ message: 'Samples list', data: data })
    } catch (error) {
      next(error)
    }
  }
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body || {}
      const data = await this.service.create({ title, description })
      res.status(201).json({ message: 'new sample created successfully', data })
    } catch (error) {
      next(error)
    }
  }
}
