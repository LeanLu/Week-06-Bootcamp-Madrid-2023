import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../core/store/store";
import { ProtoTaskStructure, TaskStructure } from "../models/task";
// Traemos todos como * y luego lo utilizamos como propiedades del object "ac".
// Sino habría que traer uno por uno.
import * as ac from "../reducer/tasks.actions.creator";
import { TaskApiRepo } from "../services/repository/task.api.repo";

export function useTasks(repo: TaskApiRepo) {
  // Tomamos el State del Store a través del useSelector:
  // Le pasamos una función y nos devuelve el State que lo guardamos en una variable.

  // Si utilizamos el useSelector base:
  const tasks = useSelector((state: RootState) => state.tasks);

  // Si utilizamos el useAppSelector de la carpeta "hooks":
  // Nos permite tener el mismo Hook pero tipado:
  // const tasks = useAppSelector((state: RootState) => state.tasks);

  // Lo mismo con el dispatch:
  // const dispatch = useAppDispatch()

  // Utilizando el useDispatch base:
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Creamos una función dentro que se ejecute para poder hacer que sea async.
    // Porque el useEffect() no puede ser async.

    const loadTasks = async () => {
      // Acá iría el repo de verdad.
      // En este caso colocamos el getTask mockeado.
      // Pero para que cumpla con ser async, lo colocamos dentro del useEffect, pero le indicamos que es async.

      // Desestructuramos el getTasks para quedarnos solo con "data" y dejar de lado el "taskNumber".
      // Para cambiarle el nombre utilizamos los 2 puntos:
      // const { data: tasks } = await getTask();

      // Para gestionar el error le agregamos un try-catch:
      try {
        const data = await repo.loadTasks();

        // Utilizamos las acciones para hacer el dispatch del estado.
        // Luego utilizamos el data rellamado tasks para despachar la action.
        dispatch(ac.loadCreator(data));
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    loadTasks();
  }, [dispatch, repo]);
  // Este dispatch ya tiene el useCallback() integrado.
  // Entonces podemos colocarlo en el Array de dependencias.

  // Luego le agregamos el "repo" también al Array de dependencia porque viene de afuera y puede cambiar.
  // Entonces el useEffect pide agregarlo.

  // Para agregar tareas tiene que recibir tareas sin "id" (ProtoTasksStructure):
  const addTasks = async (task: ProtoTaskStructure) => {
    try {
      // Guardamos la nueva tarea a agregar:
      const finalTask = await repo.createTask(task);

      // Cargar la tarea nueva en el State:
      dispatch(ac.addCreator(finalTask));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  // Lo mismo para las otras funciones:

  // Podemos utilizar el "Partial" para decirle que va a ser parte del TaskStructure.
  const updateTask = async (task: Partial<TaskStructure>) => {
    try {
      const finalTask = await repo.update(task);
      dispatch(ac.updateCreator(finalTask));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  // El Delete es una Promise "void".
  // Entonces da igual colocar el await o no total no tenemos que esperar que devuevla algo.
  const deleteTask = async (id: TaskStructure["id"]) => {
    try {
      repo.delete(id);
      dispatch(ac.deleteCreator(id));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  // Devuelve un Object standard.
  // Pero como el key y value se llaman igual, se escribe en la shorhand:
  return {
    tasks,
    addTasks,
    updateTask,
    deleteTask,
  };
}
