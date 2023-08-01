import { Request, Response, Router } from 'express';


export const salesTeamRoutes = Router();

salesTeamRoutes.post('/registration', async(req:Request,res:Response) => {
    try{
          const {name,email,phone,password,dob,fkdesgination} = req.body
        //   const reqError = SalesTeamRegistrationSchema.validate(req.body);
        //   if(reqError?.error){
        //     return res.status(200).json({status:"error", message:reqError.error?.message});
        //   }
        //   return res.status(200).json(await RegisterSalesTeam(name,email,phone,password,dob,fkdesgination))
    }catch(e:any){
      return res.status(500).json({"status":"error",message:e.message});
    }
  });
  salesTeamRoutes.post('/login',async (req:Request,res:Response) => {
    try{
      const {email,password} = req.body;
    //   const {error,value}  = SalesTeamLoginSchema.validate(req.body);
    //   if(error){
    //     return res.status(200).json({status:"error", message:error?.message});
    //   }
    //   let login = await loginSalesTeam(email,password)
    //   return res.status(200).json(login)
    }catch(e:any){
      return res.status(500).json({"status":"error",message:e.message});
    }
  })