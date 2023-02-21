import { tasksActions } from "./tasks.actions.types";

import { createAction } from "@reduxjs/toolkit";
import { TaskStructure } from "../models/task";

// Así generábamos antes el Action Creator:

// function loadCreator(payload) {
//   return {
//     type: tasksActions.load,
//     payload: payload,
//   };
// }

// Ahora utilizamos la librería de Redux con el "createAction"
export const loadCreator = createAction<TaskStructure[]>(tasksActions.load);

export const addCreator = createAction<TaskStructure>(tasksActions.add);

export const updateCreator = createAction<TaskStructure>(tasksActions.update);

export const deleteCreator = createAction<TaskStructure["id"]>(
  tasksActions.delete
);
