import { Request, Response, Router } from 'express';
import { isAdmin, isInstitute, validateToken } from '../../middleware/authMiddleware';
import { InstituteCreateSchema, InstituteDeleteSchema, InstituteUpdateStatusSchema, instituteCreateStudentSchema } from '../../middleware/requestValidation';
import { institutecreateTeacher } from '../../controller/institute/teacherController';
import { createBulkStundentController } from '../../controller/institute/studentController';
import { InstituteteacherSeach, TeacherStatusUpdate, editInstituteTeache, getInstituteTeacher, getTeacher, teacherDelete } from '../../model/teacher/teacher';



export const InstitueTeacherRoutes = Router();

InstitueTeacherRoutes.post("/create", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {

        const reqError = instituteCreateStudentSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        let instituteCode: any = req.userid;
        let { code, status, message } = await institutecreateTeacher(req.body, instituteCode)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueTeacherRoutes.post("/create/bulk", [validateToken, isInstitute], async (req: Request, res: Response) => {
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
InstitueTeacherRoutes.get("/get/all", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const page: any = req.query.page || 1;
        const insID: string = req.userid;
        const { code, status, message, totalPage, totalRow } = await getInstituteTeacher(page, insID);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow });
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueTeacherRoutes.get("/get/search", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const page: any = req.query.page || 1;
        const insID: string = req.userid;
        const query: any = req.query.query || null;
        const { code, status, message, totalPage, totalRow } = await InstituteteacherSeach(page, query, insID);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow: totalRow });
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueTeacherRoutes.put("/update/:id", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const reqError = InstituteUpdateStatusSchema.validate({
            id: req.params.id,
            status: req.body.status
        });
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        const { code, status, message } = await TeacherStatusUpdate(req.params.id, req.body.status)
        return res.status(200).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueTeacherRoutes.delete("/delete/:id", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const reqError = InstituteDeleteSchema.validate(req.params);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        const { code, status, message } = await teacherDelete(req.params.id)
        return res.status(200).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

InstitueTeacherRoutes.put("/edit/:id", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const reqError = instituteCreateStudentSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        const { code, status, message } = await editInstituteTeache(req.params.id,req.body)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
InstitueTeacherRoutes.get("/get/student/:id", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        
        const { code, status, message } = await getTeacher(req.params.id);
        return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
 