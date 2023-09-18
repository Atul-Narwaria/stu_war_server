import { Request, Response, Router } from 'express';
import { isInstitute, validateToken } from '../../middleware/authMiddleware';
import { instituteBatchLinkCreateSchema } from '../../middleware/requestValidation';
import { createBatchBulkLink, createBatchLink, deleteBatchLink } from '../../model/batch/batchLink';


export const batchLinkRoutes = Router();

batchLinkRoutes.post('/create',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteBatchLinkCreateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await createBatchLink(req.body, req.userid)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

batchLinkRoutes.post('/create/bulk',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        if(!req.body|| !req.body.data){
            return res.status(200).json({ status: "error", message: "data not found" });
        }
        let data:any = [];
        let bodyData = req.body.data;
        if(bodyData.length != 0){
            bodyData.map((e:any)=>{
                data.push({
                    fk_institute_id:req.userid,
                    fk_student_id:e.fk_student_id,
                    fk_bacth_id:e.fk_batch_id,
                    status:true
                })
            })
        }
        if(data.length != 0){
            let { code, status, message } = await createBatchBulkLink(data)
            return res.status(code).json({ status, message })
        }
       
        return res.status(422).json({ status:"error", message:"something went wrong" })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

batchLinkRoutes.delete('/delete/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await deleteBatchLink(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})