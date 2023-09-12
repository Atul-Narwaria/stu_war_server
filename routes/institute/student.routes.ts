import { Request, Response, Router } from 'express';
import { isAdmin, isInstitute, validateToken } from '../../middleware/authMiddleware';
import { InstituteCreateSchema, InstituteDeleteSchema, InstituteUpdateStatusSchema, instituteCreateStudentSchema } from '../../middleware/requestValidation';
import { createBulkStundentController, institutecreateStudent } from '../../controller/institute/studentController';
import { InstituteStudentSeach, StudentStatusUpdate, editInstituteStudent, getInstituteStudents, getstundet, studentDelete } from '../../model/student/student';


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
InstitueStudentRoutes.post("/create/bulk", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {

        // const reqError = instituteCreateStudentSchema.validate(req.body);
        // if (reqError?.error) {
        //     return res.status(422).json({ status: "error", message: reqError.error?.message });
        // }
        let instituteCode: any = req.userid;
        let { code, status, message } = await createBulkStundentController(req.body?.data, instituteCode)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueStudentRoutes.get("/get/all", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const page: any = req.query.page || 1;
        const insID: string = req.userid;
        const { code, status, message, totalPage, totalRow } = await getInstituteStudents(page, insID);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow });
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueStudentRoutes.get("/get/search", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const page: any = req.query.page || 1;
        const insID: string = req.userid;
        const query: any = req.query.query || null;
        const { code, status, message, totalPage, totalRow } = await InstituteStudentSeach(page, query, insID);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow: totalRow });
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueStudentRoutes.put("/update/:id", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const reqError = InstituteUpdateStatusSchema.validate({
            id: req.params.id,
            status: req.body.status
        });
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        const { code, status, message } = await StudentStatusUpdate(req.params.id, req.body.status)
        return res.status(200).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueStudentRoutes.delete("/delete/:id", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const reqError = InstituteDeleteSchema.validate(req.params);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        const { code, status, message } = await studentDelete(req.params.id)
        return res.status(200).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

InstitueStudentRoutes.put("/edit/:id", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const reqError = instituteCreateStudentSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        const { code, status, message } = await editInstituteStudent(req.params.id,req.body)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueStudentRoutes.get("/get/student/:id", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        
        const { code, status, message } = await getstundet(req.params.id);
        return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
