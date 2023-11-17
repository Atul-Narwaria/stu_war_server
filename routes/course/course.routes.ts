import { Request, Response, Router } from 'express';
import { isInstitute, validateToken } from '../../middleware/authMiddleware';
import { instituteCourseCreateSchema, instituteCourseStatusSchema } from '../../middleware/requestValidation';
import { InstituteCourseSeach, createCourse, deleteCourse, editCourse, getActiveCourse, getAllCourse, getCourseById, getSubCourseListByCourse, updateCourseStatus } from '../../model/course/course';



export const CourseRoutes = Router();

CourseRoutes.post('/create',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteCourseCreateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await createCourse(req.body, req.userid)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
CourseRoutes.put('/edit/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteCourseCreateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await editCourse(req.body, req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
CourseRoutes.put('/update/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const reqError = instituteCourseStatusSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await updateCourseStatus(req.params.id,req.body.status)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
CourseRoutes.get('/get/active',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getActiveCourse(req.userid)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
CourseRoutes.get('/get/all',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        const page: any = req.query.page || 1;
        const insID: string = req.userid;
       
        const { code, status, message, totalPage, totalRow } = await getAllCourse(page,req.userid)
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow });
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
CourseRoutes.get('/get/course/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getCourseById(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
CourseRoutes.delete('/delete/:id',[validateToken, isInstitute],async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await deleteCourse(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
CourseRoutes.get("/get/search", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const page: any = req.query.page || 1;
        const insID: string = req.userid;
        const query: any = req.query.query || null;
        const { code, status, message, totalPage, totalRow } = await InstituteCourseSeach(page, query, insID);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow: totalRow });
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

CourseRoutes.get("/get/sub-course-list/:id", [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const { code, status, message } = await getSubCourseListByCourse(req.params.id);
        return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
