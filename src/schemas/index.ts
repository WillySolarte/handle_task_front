import {z} from 'zod'

export const userRegisterResponseSchema = z.object({
    msg: z.string(),
    state: z.string(),
    error: z.string()
})

export const userLoginResponseSchema = z.object({
    msg: z.string(),
    state: z.string(),
    data: z.string()
})

export const getUserAuthenticatedSchema = z.object({
    msg: z.string(),
    state: z.string(),
    data: z.object({
        name: z.string(),
        id: z.string(),
        email: z.string()
    })
})

export type TResponseUserRegister = z.infer< typeof userRegisterResponseSchema>

export type TResponseConfirmAccount = z.infer< typeof userRegisterResponseSchema>

export type TResponseLogin = z.infer< typeof userLoginResponseSchema>