import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tareas: [],
  tareaDone: [],
};

export const tareaSlice = createSlice({
  name: "tareas",
  initialState,
  reducers: {
    addTarea: (state, action) => {
      action.payload.id = state.tareas.length + 1;
      state.tareas = state.tareas.concat(action.payload);
    },

    tareaRealizada: (state, action) => {
      state.tareaDone = state.tareaDone.concat(action.payload);
      state.tareas = state.tareas.filter(
        (tarea) => tarea.id !== action.payload.id
      );
    },
    removeTarea: (state, action) => {
      if (action.payload.contexto === "resueltas") {
        const id = action.payload.id;
        state.tareaDone = state.tareaDone.filter((tarea) => tarea.id !== id);
      } else {
        const id = action.payload.id;
        state.tareas = state.tareas.filter((tarea) => tarea.id !== id);
      }
    },
  },
});

export const { addTarea, removeTarea, tareaRealizada } = tareaSlice.actions;
