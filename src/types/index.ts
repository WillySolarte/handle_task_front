export type TRegisterForm = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

export type TLoginForm = Pick<TRegisterForm, 'email' | 'password'>