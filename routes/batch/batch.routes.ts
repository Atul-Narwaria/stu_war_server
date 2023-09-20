import { Request, Response, Router } from 'express';
import { isInstitute, validateToken } from '../../middleware/authMiddleware';
import { instituteBatchCreateSchema, instituteBatchStatusSchema } from '../../middleware/requestValidation';
import { createBatch, deleteBatch, editBatch, getActiveBatch, getAllbatch, updateBatchStatus } from '../../model/batch/batch';

export const batchRoutes = Router();

batchRoutes.post('/create',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteBatchCreateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        if(req.body.start_time === req.body.end_time) {
            return res.status(422).json({ status: "error", message: "start and end time can not be the same"});
        }
        let { code, status, message } = await createBatch(req.body, req.userid)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
batchRoutes.put('/edit/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteBatchCreateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        if(req.body.start_time === req.body.end_time) {
            return res.status(422).json({ status: "error", message: "start and end time can not be the same"});
        }
        let { code, status, message } = await editBatch(req.body, req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
batchRoutes.put('/update/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteBatchStatusSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await updateBatchStatus(req.params.id,req.body.status)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
batchRoutes.get('/get/active',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getActiveBatch(req.userid)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
batchRoutes.get('/get/all',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getAllbatch(req.userid)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
batchRoutes.delete('/delete/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await deleteBatch(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
