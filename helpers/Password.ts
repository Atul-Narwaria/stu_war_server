import bcrypt from "bcrypt";

export const Generatepassword =async (password:string,salt:number) => {
        return bcrypt.hashSync(password,salt);
}
export const checkpassword =async (password:string,userPassword:string) => {
        return bcrypt.compareSync(password,userPassword);
}