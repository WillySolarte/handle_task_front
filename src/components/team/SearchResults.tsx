import { useMutation, useQueryClient } from "@tanstack/react-query"


import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { TeamMember } from "../../schemas"
import { addUserToProject } from "../../services/teamService"

type SearchResultProps = {
    user: TeamMember,
    resetData: () => void
}


export default function SearchResult({user, resetData} : SearchResultProps) {

    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            resetData()
            queryClient.invalidateQueries({queryKey:["projectTeam", projectId]})
        }
    })

    function handleAddUserToProject(){
        const data = {
            projectId,
            id: user._id
        }
        mutate(data)
    }

    
  return (
    <>
        <p className=" mt-10 text-center font-bold">Resultado: </p>
        <div className="flex justify-between items-center">
            <p> {user.name} </p>
            <button onClick={handleAddUserToProject} className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer">Agregar a Proyecto</button>
        </div>
    
    </>
  )
}
