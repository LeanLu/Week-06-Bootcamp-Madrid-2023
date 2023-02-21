import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/counterSlice";
import { taskReducer } from "../../features/tasks/reducer/task.reducer";

export const appStore = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: taskReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
