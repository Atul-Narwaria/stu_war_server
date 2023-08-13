import { Request, Response, Router } from 'express';
import { isAdmin, validateToken } from '../../middleware/authMiddleware';
import { countryCreateSchema, countryIdSchema, countryUpdateSchema } from '../../middleware/requestValidation';
import { countryDelete, createCountry, getActiveCountry, getCountry, getCountryStateCityAll, updateCountry } from '../../model/location/country';

export const countryRoutes = Router();

countryRoutes.post("/create", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = countryCreateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        const { country } = req.body;
        let { code, status, message } = await createCountry(country)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

countryRoutes.get("/get", [validateToken], async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getCountry();
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
countryRoutes.get("/get/active", [validateToken], async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getActiveCountry();
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
countryRoutes.get("/get/state_city", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await getCountryStateCityAll();
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
countryRoutes.put("/update/status", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = countryUpdateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await updateCountry(req.body.countryId, req.body.status)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
countryRoutes.delete("/delete/:id", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = countryIdSchema.validate(req.params);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await countryDelete(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})