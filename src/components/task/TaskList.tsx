import { DndContext, DragEndEvent } from "@dnd-kit/core";



import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { Task, TaskStatus } from "../../schemas";
import { updateStatus } from "../../services/taskService";
import DropTask from "./DropTask";
import TaskCard from "./TaskCard";
import { statusTranslation } from "../../locales/es";
import { useEffect, useState } from "react";

type TaskListProps = {
  tasks: Task[];
  canEdit: boolean
};

type GroupedTasks = {
  [key: string]: Task[];
};

const initialStatusGroup: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgres: [],
  underReview: [],
  completed: [],
};



const statusStyles: {[key: string] : string} = {
  pending: "border-t-slate-500",
  onHold: "border-t-red-500",
  inProgres: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-emerald-500",
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {

  const queryClient = useQueryClient()
  const params = useParams()
  const projectId = params.projectId!

  const [taskStatus, setTaskStatus] = useState(tasks)
  const [currentStatus, setCurrentStatus] = useState('')
  
  const {mutate} = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (dataM) => {
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
      
      toast.success(dataM)
    }
} )

  useEffect(() => {
    updateCurrentTask()
  },[tasks])
  
  function handleTaskStatus(evt: React.ChangeEvent<HTMLSelectElement>){

      setCurrentStatus(evt.target.value)
      if(evt.target.value === 'all' || evt.target.value === ''){
        setTaskStatus(tasks)
      }
      else{
        const tasksFilter = tasks.filter(current => current.status === evt.target.value);
        setTaskStatus(tasksFilter)
      }
  }
  function updateCurrentTask(){
    if(currentStatus === 'all' || currentStatus === ''){
      setTaskStatus(tasks)
    }
    else{
      const tasksFilter = tasks.filter(current => current.status === currentStatus);
      setTaskStatus(tasksFilter)
    }
    
  }


  const groupedTasks = taskStatus.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroup);

  function handleDragEnd(e: DragEndEvent){
    const {over, active} = e
    if(over && over.id){
      const taskId = active.id.toString() 
      const status = over.id as TaskStatus 
      mutate({projectId, taskId, status})

      
    }
  }
  
  
  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>
      <div className="w-[400px] border border-purple-700 flex justify-evenly items-center h-14 mb-5">
        <label htmlFor="slcStatus" className="font-bold roboto text-purple-700 select-none">Filtrar por status</label>
        <select onChange={handleTaskStatus} id="slcStatus" className="focus:outline-purple-400 w-[200px] text-center border border-gray-300">
          <option value="">-- Seleccionar --</option>
          <option value="completed">Completada</option>
          <option value="underReview">En Revisión</option>
          <option value="inProgres">En Progreso</option>
          <option value="pending">Pendiente</option>
          <option value="onHold">En Espera</option>
          <option value="all">Todas</option>
        </select>
      </div>
      
      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3 className={`capitalize text-xl font-light border border-s-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}>{statusTranslation[status]}</h3>
              <DropTask status={status} />
              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
