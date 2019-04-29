import { NextFunction, Request, Response, Router } from 'express';
import { getItemRepository, Item } from './itemModel';

export const router: Router = Router();

router.get('/item', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getItemRepository();
    const allItems = await repository.find();
    res.send(allItems);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/item/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getItemRepository();
    const item = await repository.find({id: req.params.id});
    res.send(item);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/item', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getItemRepository();
    const item = new Item();
    item.name = req.body.name;
    item.isFinished=req.body.isFinished;
    console.log(item);
    const result = await repository.save(item);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/item/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getItemRepository();
    const item = await repository.findOne({id: req.params.id});
    item.name = req.body.name;
    item.isFinished= req.body.isFinished;
    const result = await repository.save(item);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/item/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getItemRepository();
    await repository.delete({id: req.params.id});
    res.send(true);
  }
  catch (err) {
    return next(false);
  }
});

