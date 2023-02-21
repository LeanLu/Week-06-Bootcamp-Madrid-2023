import { TaskStructure } from "../models/task";

type MockData = {
  data: TaskStructure[];
  taskNumber: number;
};

export const getTask = async (): Promise<MockData> => ({
  data: [
    {
      id: "1",
      name: "json-server",
      owner: "Pepe",
      isCompleted: true,
    },
    {
      id: "2",
      name: "some comment",
      owner: "Ernesto",
      isCompleted: false,
    },
  ],
  taskNumber: 4,
});
