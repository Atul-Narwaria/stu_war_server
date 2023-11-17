import { Request, Response, Router } from 'express';
import { isAdmin, validateToken } from '../../middleware/authMiddleware';
import { AssignmentTypeStatusUpdate, createAssignmentType, deleteAssignmentType, getActiveAssignmentType, getAssignmentType } from '../../model/assignment/assignmentType';
import { instituteAssignmentTypeCreate, instituteBatchStatusSchema } from '../../middleware/requestValidation';

export const assignmentTypeRoutes = Router();

assignmentTypeRoutes.post('/create',[validateToken, isAdmin],async (req: Request, res: Response) => {
    try {
        const reqError = instituteAssignmentTypeCreate.validate(req.body);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await createAssignmentType(req.body.name, req.body.status)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})


assignmentTypeRoutes.put('/update/:id',[validateToken, isAdmin],async (req: Request, res: Response) => {
    try {
        const reqError = instituteBatchStatusSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await AssignmentTypeStatusUpdate(req.params.id,req.body.status)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

assignmentTypeRoutes.get('/get/active',[validateToken, isAdmin],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getActiveAssignmentType()
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
assignmentTypeRoutes.get('/get/all',[validateToken, isAdmin],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getAssignmentType()
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})


assignmentTypeRoutes.delete('/delete/:id',[validateToken, isAdmin],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await deleteAssignmentType(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})