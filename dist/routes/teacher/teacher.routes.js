"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesTeamRoutes = void 0;
const express_1 = require("express");
exports.salesTeamRoutes = (0, express_1.Router)();
exports.salesTeamRoutes.post('/registration', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password, dob, fkdesgination } = req.body;
        //   const reqError = SalesTeamRegistrationSchema.validate(req.body);
        //   if(reqError?.error){
        //     return res.status(200).json({status:"error", message:reqError.error?.message});
        //   }
        //   return res.status(200).json(await RegisterSalesTeam(name,email,phone,password,dob,fkdesgination))
    }
    catch (e) {
        return res.status(500).json({ "status": "error", message: e.message });
    }
}));
exports.salesTeamRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //   const {error,value}  = SalesTeamLoginSchema.validate(req.body);
        //   if(error){
        //     return res.status(200).json({status:"error", message:error?.message});
        //   }
        //   let login = await loginSalesTeam(email,password)
        //   return res.status(200).json(login)
    }
    catch (e) {
        return res.status(500).json({ "status": "error", message: e.message });
    }
}));
