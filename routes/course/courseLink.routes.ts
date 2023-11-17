import { Request, Response, Router } from 'express';
import { isInstitute, validateToken } from '../../middleware/authMiddleware';
import { instituteCourselink } from '../../middleware/requestValidation';
import { createCourseLink, createStudentCourse, deleteCourseLink } from '../../model/course/courseLink';
import { deleteStudentCourse, getActiveStudentWithCourse, getCourseStudents, getSubCourseStudents } from '../../model/student/studentCourse';


export const CourseLinkRoutes = Router();

CourseLinkRoutes.post('/create', [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const reqError = instituteCourselink.validate(req.body);
        if (reqError?.error) {
            return res.status(422).json({ status: "error", message: reqError.error?.message });
        }
        let subCourse = req.body.subCourse;
        let data: any = [];
        if (subCourse.length > 0) {
            subCourse.map((e: any) => {
                data.push({
                    fk_course_id: req.body.fk_course_id,
                    fk_sub_course_id: e
                })
            })
        } else {
            return res.status(422).json({ status: "error", message: "sub course required" });
        }
        console.log(data);
        let { code, status, message } = await createCourseLink(data)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

CourseLinkRoutes.delete('/delete/:id', [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await deleteCourseLink(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
CourseLinkRoutes.post('/create/studentCourse', [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        if (!req.body.fk_course_id || req.body.fk_course_id == "") {
            return res.status(422).json({ status: "error", message: "fk_course_id required" });
        }
        let stundetCourse = req.body.stundetList;
        console.log(req.body)
        let data: any = [];
        if (stundetCourse.length > 0) {
            stundetCourse.map((e: any) => {
                if(req.body.course_type === 1){
                    data.push({
                        fk_course_id: req.body.fk_course_id,
                        fk_stundet_id: e,
                        category: req.body.course_type
                    })
                }
                if(req.body.course_type === 2){
                    data.push({
                        fk_sub_course_id: req.body.fk_course_id,
                        fk_stundet_id: e,
                        category: req.body.course_type
                    })
                }

               
            })
        } else {
            return res.status(422).json({ status: "error", message: "stundetCourse required" });
        }
        // console.log()
        console.log(data)
        let { code, status, message } = await createStudentCourse(data)
        return res.status(code).json({ status: status, message: message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

CourseLinkRoutes.get('/get/student/course/:id', [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        if(!req.params.id){
            return res.status(422).json({ status: "error", message: "course required" });
        }
        let { code, status, message } = await getCourseStudents(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
CourseLinkRoutes.get('/get/student/sub-course/:id', [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        if(!req.params.id){
            return res.status(422).json({ status: "error", message: "course required" });
        }
        let { code, status, message } = await getSubCourseStudents(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
CourseLinkRoutes.delete('/get/student/course/delete/:id', [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        if(!req.params.id){
            return res.status(422).json({ status: "error", message: "course required" });
        }
        let { code, status, message } = await deleteStudentCourse(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

CourseLinkRoutes.get('/get/all-course/students', [validateToken, isInstitute], async (req: Request, res: Response) => {
    try {
        const page: any = req.query.page || 1;
        const insID: string = req.userid;
        let { code, status, message,totalPage,totalRow } = await getActiveStudentWithCourse(page, insID)
        return res.status(code).json({ status, message,totalPage: totalPage, totalRow  })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})