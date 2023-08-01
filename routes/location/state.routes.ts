import { Request, Response, Router } from 'express';
import { isAdmin, validateToken } from '../../middleware/authMiddleware';
import { stateCreateSchema, stateGetSchema, stateIdSchema, stateUpdateSchema } from '../../middleware/requestValidation';
import { AllState, createState, getActiveStateByCountry, getActiveStateCityByCountry, getStateByCountry, getStateCityByCountry, stateDelete, updateState } from '../../model/location/state';

export const StateRoutes = Router();

StateRoutes.post("/create", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = stateCreateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        const { countryId, state } = req.body;
        let { code, status, message } = await createState(countryId, state)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

StateRoutes.get("/get", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = stateGetSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        const { countryId } = req.body;
        let { code, status, message } = await getStateByCountry(countryId)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
StateRoutes.get("/get/all", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        let { code, status, message } = await AllState()
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
StateRoutes.get("/get/active/:countryId", [validateToken], async (req: Request, res: Response) => {
    try {
        const reqError = stateGetSchema.validate(req.params);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        const { countryId } = req.params;
        let { code, status, message } = await getStateByCountry(countryId)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
StateRoutes.get("/get/city", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = stateGetSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        const { countryId } = req.body;
        let { code, status, message } = await getStateCityByCountry(countryId)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
StateRoutes.get("/get/city/active", [validateToken], async (req: Request, res: Response) => {
    try {
        const reqError = stateGetSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        const { countryId } = req.body;
        let { code, status, message } = await getActiveStateCityByCountry(countryId)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

StateRoutes.put("/update/status", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = stateUpdateSchema.validate(req.body);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await updateState(req.body.stateId, req.body.status)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
StateRoutes.delete("/delete/:id", [validateToken, isAdmin], async (req: Request, res: Response) => {
    try {
        const reqError = stateIdSchema.validate(req.params);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await stateDelete(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})

StateRoutes.get("/get/active/country/:id", async (req: Request, res: Response) => {
    try {
        const reqError = stateIdSchema.validate(req.params);
        if (reqError?.error) {
            return res.status(200).json({ status: "error", message: reqError.error?.message });
        }
        let { code, status, message } = await getActiveStateByCountry(req.params.id)
        return res.status(code).json({ status, message })
    } catch (e: any) {
        return res.status(500).json({ status: "error", message: e.message });
    }
})
