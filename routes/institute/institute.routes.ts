import { Request, Response, Router } from 'express';
import { isAdmin, validateToken } from '../../middleware/authMiddleware';
import { InstituteCreateSchema, InstituteDeleteSchema, InstituteUpdateStatusSchema } from '../../middleware/requestValidation';
import { createInstitute } from '../../controller/institute/instituteContoller';
import { deleteInstitute, getInstitutes, updateInstituteStatus } from '../../model/institute/institute';

export const InstitueRoutes = Router();

InstitueRoutes.post("/create", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {

        const reqError = InstituteCreateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }

        let { code, status, message } = await createInstitute(req.body)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})


InstitueRoutes.get("/get", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getInstitutes()
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueRoutes.put("/update/:id", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = InstituteUpdateStatusSchema.validate({
            id: req.params.id,
            status: req.body.status
        });
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await updateInstituteStatus(req.params.id, req.body.status)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueRoutes.delete("/delete/:id", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = InstituteDeleteSchema.validate(req.params);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await deleteInstitute(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})