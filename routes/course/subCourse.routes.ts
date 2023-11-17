import { Request, Response, Router } from 'express';
import { isInstitute, validateToken } from '../../middleware/authMiddleware';
import { instituteCourseCreateSchema, instituteCourseStatusSchema, instituteSubCourseCreateSchema, instituteSubCourseStatusSchema } from '../../middleware/requestValidation';
import { createCourse, deleteCourse, editCourse, getActiveCourse, getAllCourse, getCourseById, updateCourseStatus } from '../../model/course/course';
import { InstituteSubCourseSeach, createSubCourse, deleteSubCourse, editSubCourse, getActiveSubCourse, getAllSubCourse, getSubCourseById, updateSubCourseStatus } from '../../model/course/subCourse';



export const SubCourseRoutes = Router();

SubCourseRoutes.post('/create',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteSubCourseCreateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        console.log(req.userid);
        let { code, status, message } = await createSubCourse(req.body,req.userid)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
SubCourseRoutes.put('/edit/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteSubCourseCreateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await editSubCourse(req.body, req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
SubCourseRoutes.put('/update/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteSubCourseStatusSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await updateSubCourseStatus(req.params.id,req.body.status)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
SubCourseRoutes.get('/get/active/',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getActiveSubCourse(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
SubCourseRoutes.get('/get/all/',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const page: any = req.query.page || 1;
        const insID: string = req.userid;
        let { code, status, message, totalPage, totalRow } = await getAllSubCourse(page,req.userid)
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow });
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
SubCourseRoutes.get('/get/sub-course/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getSubCourseById(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
SubCourseRoutes.delete('/delete/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await deleteSubCourse(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
SubCourseRoutes.get("/get/search", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const page: any = req.query.page || 1;
        const insID: string = req.userid;
        const query: any = req.query.query || null;
        const { code, status, message, totalPage, totalRow } = await InstituteSubCourseSeach(page, query, insID);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow: totalRow });
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})