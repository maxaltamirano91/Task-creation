import { configureStore } from "@reduxjs/toolkit";
import { tareaSlice } from "./reducer";
import logger from "redux-logger";

const store = configureStore({
  reducer: tareaSlice.reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// const store = configureStore({
//   reducer: {
//     tareas: tareaSlice.reducer, // Reducer debe estar dentro de un objeto con la clave `tareas`
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
// });

export default store;
