import { Fragment, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { formatData } from '../../helpers/utils'; 
import { getTaskById, updateStatus } from '../../services/taskService';
import { TaskStatus } from '../../schemas';
import { statusTranslation } from '../../locales/es';


export default function TaskModalDetails() {

    const navigate = useNavigate()
    const params = useParams()
    const queryClient = useQueryClient()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!;
    const show = !!taskId

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })
    const {mutate} = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (dataM) => {
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            
            toast.success(dataM.msg)
        }
    })
    //Con use effect garantizamos que el redireccionamiento se haga después de reenderizar por completo el componente
    useEffect(() => {
        if (isError) {
          toast.error(error.message, { toastId: 'error' });
        }
    }, [isError, error]);
      
    if (isError) {
        return <Navigate to={`/projects/project/${projectId}`} />;
    }

    function handleChange( evt: React.ChangeEvent<HTMLSelectElement>){
        const status = evt.target.value as TaskStatus
        const data = {taskId, projectId, status}
        mutate(data)
    }
  
    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatData(data.createdAt)} </p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatData(data.updatedAt)} </p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description} </p>

                                    {data.completedBy.length ? (
                                        <>
                                            <p className=' text-2xl text-slate-500 mb-2'>Historial de cambios</p>
                                            <ul className=' list-decimal'>
                                                {data.completedBy.map((activityLog) => (
                                                    <li key={activityLog._id}>
                                                        <span className=' font-bold text-slate-600'>{statusTranslation[activityLog.status]} </span>{""} por {activityLog.user.name }
                                                    </li>
                                                ) ) }
                                            </ul>
                                        
                                        </>
                                    ): null}



                                    

                                    <div className='my-5 space-y-3'>
                                        <label htmlFor='slcState'  className='font-bold'>Estado Actual:</label>
                                        <select onChange={handleChange} defaultValue={data.status} name="slcState" id="slcState" className=' w-full p-3 bg-white border border-gray-300'>
                                            {Object.entries(statusTranslation).map(([key, value]) => (
                                                <option key={key} value={key}> {value} </option>
                                            ))}

                                        </select>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}