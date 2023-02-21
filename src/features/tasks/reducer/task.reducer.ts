import { createReducer } from "@reduxjs/toolkit";
import { TaskStructure } from "../models/task";

// Si lo importamos uno por uno queda de la siguiente manera:
// import { addCreator, loadCreator } from "./tasks.actions.creator";

// Sino, puedo importarlo como * para tenerlo todos y luego utilizar la propiedad específica:
import * as ac from "./tasks.actions.creator";

// Antes creabamos el Reducer como:
// export function taskReducer(state, action) {
//   return state;
// }

const initialState: TaskStructure[] = [];

export const taskReducer = createReducer(initialState, (builder) => {
  // Si los importamos de manera individual:
  // builder.addCase(loadCreator, (_state, {payload}) => payload)
  // builder.addCase(addCreator, (state, { payload }) => [...state, payload]);

  builder.addCase(ac.loadCreator, (_state, { payload }) => payload);
  // Al State le ponemos el guión bajo porque al no utilizarlo

  builder.addCase(ac.addCreator, (state, { payload }) => [...state, payload]);

  builder.addCase(ac.updateCreator, (state, { payload }) => {
    state.map((item) => (item.id === payload.id ? payload : item));
  });

  builder.addCase(ac.deleteCreator, (state, { payload }) => {
    state.filter((item) => item.id !== payload);
  });

  builder.addDefaultCase((state) => state);
});
