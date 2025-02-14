import { isAxiosError } from "axios"
import api from "../lib/axios"
import { userLoginResponseSchema, userRegisterResponseSchema } from "../schemas"
import { TLoginForm, TRegisterForm } from "../types"



export async function createAccount(formData: TRegisterForm){

    try {
        const url = `/user`
        const {data} = await api.post(url, formData)
        const response = userRegisterResponseSchema.safeParse(data)
        if(response.success){
            
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            
            throw new Error(error.response.data.msg)
        }
    }
}

export async function confirmAcount(token: string){

    try {
        const url = `/user/confirm-account/${token}`
        const {data} = await api.post(url)
        const response = userRegisterResponseSchema.safeParse(data)
        if(response.success){
            
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            return error.response.data
        }
    }
}

export async function login(formData: TLoginForm){

    try {
        const url = `/user/login`
        const {data} = await api.post(url, formData)
        const response = userLoginResponseSchema.safeParse(data)
        if(response.success){
            
            //localStorage.setItem('AUTH_TOKEN', response.data.data!)
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            
            return error.response.data
        }
    }
}
export function userExist() : boolean{

    const exist = localStorage.getItem('AUTH_TOKEN')
    return !!exist
    

}