import { useQuery } from "@tanstack/react-query";
//import { useMemo } from "react";
import { useParams, Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getProjectById } from "../../services/projectService";
import { isManager } from "../../helpers/polices";

export default function DetailsProjectView() {

  const {data: user, isLoading: authLoading} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const params = useParams()
  const projectID = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectID],
    queryFn: () => getProjectById(projectID),
    retry: false
  })
  //const canEdit = useMemo( () => data?.manager === user?._id ,[data, user])

  if(isLoading && authLoading){
    return "Cargando..."
  } 
  if(isError){
    return <Navigate to='/404' />
  } 

  
  if(data && user) return (
    
    <>
    
      <h1 className=" text-5xl font-black">{data.projectName} </h1>
      <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
      {isManager(data.manager, user.id) && (
        <nav className="my-5 flex gap-5">
          <button onClick={() => navigate(location.pathname +'?newTask=true')} className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors select-none" type="button">Agregar Tarea</button>
          <Link  className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors select-none" to={`/projects/team/${projectID}`}>Colaboradores</Link>
        </nav>
      )}
      
      
    </>


  )
}

