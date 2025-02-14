import { redirect, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { confirmAcount } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";


export default function ConfirmAccountView() {

    const params = useParams()
    const token = params.token!

    const [msg, setMsg] = useState<string>('')

    if (!token) redirect('/')
    useEffect(() => {

        mutate(token)
    },[])

    const { mutate } = useMutation({
        mutationFn: confirmAcount,
        onError: () => {
            setMsg('Se presentó un error')
        },
        onSuccess: (data) => {
            
            setMsg(data.msg)
            
        }

    })


    

    




    return (
        <div className="w-60 h-40 bg-white rounded-lg flex items-center justify-center border shadow-2xl border-purple-700">
            <div className="flex flex-col justify-evenly items-center space-y-3 ">

                <p className="text-xl text-center text-purple-700"> {msg} </p>
            </div>
        </div>
    )
}
