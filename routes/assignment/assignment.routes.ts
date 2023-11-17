import { Request, Response, Router } from 'express';
import { isInstitute, validateToken } from '../../middleware/authMiddleware';
import { instituteAssignmentMasterCreate, instituteAssignmentMasterEdit } from '../../middleware/requestValidation';
import { createAssignmentMaster, deleteAssignmentMaster, editAssignmentMaster, getActiveAssignmentMaster, getAssignmentMaster } from '../../model/assignment/assignmentMaster';

export const assignmentRoutes = Router();

assignmentRoutes.post('/create',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteAssignmentMasterCreate.validate(req.body);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
       
        let { code, status, message } = await createAssignmentMaster(req.body, req.userid)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
assignmentRoutes.put('/edit/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteAssignmentMasterEdit.validate(req.body);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await editAssignmentMaster(req.body,req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
assignmentRoutes.get('/get/active',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getActiveAssignmentMaster(req.userid)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
assignmentRoutes.get('/get/all',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getAssignmentMaster(req.userid)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
assignmentRoutes.delete('/delete/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await deleteAssignmentMaster(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})