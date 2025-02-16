
import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../services/projectService";
import EditProjectForm from "../../components/project/EditProjectForm";


export default function EditProjectView() {

    const params = useParams()
    const projectID = params.projectId!;
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectID],
        queryFn: () => getProjectById(projectID),
        retry: false
    })

    if(isLoading){
      return "Cargando..."
    } 
    if(isError){
      return <Navigate to='/404' />
    } 

  if(data) return <EditProjectForm data={data} projectID={projectID} />
}

