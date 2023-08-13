import { Request, Response, Router } from 'express';
import { isAdmin, validateToken } from '../../middleware/authMiddleware';
import { cityCreateSchema, cityGetSchema, cityIdSchema, cityUpdateSchema } from '../../middleware/requestValidation';
import { cityDelete, createCity, getActiveCity, getCity, getCityWithStateCountry, updatecity } from '../../model/location/city';

export const cityRoutes = Router();

cityRoutes.post("/create", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const reqError = cityCreateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        const { countryId, stateId, city } = req.body;
        let { code, status, message } = await createCity(countryId, stateId, city)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
cityRoutes.get("/get", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = cityGetSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        const { countryId, stateId, city } = req.body;
        let { code, status, message } = await getCity(countryId, stateId)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
cityRoutes.get("/get/All", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getCityWithStateCountry()
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
cityRoutes.get("/get/active/:countryId/:stateId", [validateToken], async (req: Request, res: Response) => {
    try {
        const reqError = cityGetSchema.validate(req.params);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        const { countryId, stateId } = req.params;
        let { code, status, message } = await getActiveCity(countryId, stateId)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
cityRoutes.put("/update/status", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = cityUpdateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await updatecity(req.body.cityId, req.body.status)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
cityRoutes.delete("/delete/:id", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = cityIdSchema.validate(req.params);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await cityDelete(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})