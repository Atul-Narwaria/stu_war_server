import { Request, Response, Router } from 'express';
import { isAdmin, isInstitute, validateToken } from '../../middleware/authMiddleware';
import { InstituteCreateSchema, InstituteDeleteSchema, InstituteUpdateStatusSchema, instituteCreateStudentSchema } from '../../middleware/requestValidation';
import { institutecreateStudent } from '../../controller/institute/studentController';


export const InstitueStudentRoutes = Router();

InstitueStudentRoutes.post("/create", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {

        const reqError = instituteCreateStudentSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        let instituteCode: any = req.userid;
        let { code, status, message } = await institutecreateStudent(req.body, instituteCode)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

