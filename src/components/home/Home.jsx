import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Home.module.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTarea, removeTarea, tareaRealizada } from "../../redux/reducer";

export const Home = () => {
  const tareas = useSelector((state) => state.tareas);
  const tareaCheck = useSelector((state) => state.tareaDone);
  const dispatch = useDispatch();

  const [tarea, setTarea] = useState({
    tipo: "",
    descripcion: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTarea({ ...tarea, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!tarea.tipo || !tarea.descripcion) {
      toast.error("Por favor, completa todos los campos 💩 ");
      return;
    }

    dispatch(addTarea(tarea));
    setTarea({
      tipo: "",
      descripcion: "",
    });
  };

  const handleClick = (id) => {
    const tarea = tareas.find((t) => t.id === id);
    if (tarea) {
      dispatch(tareaRealizada(tarea));
    }
  };

  const handleDelete = (event, id) => {
    const contexto = event.target.name;
    dispatch(removeTarea({ contexto, id }));
  };

  return (
    <div className={styles.contendor}>
      <h3>Lista de tareas</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={tarea.tipo}
          name="tipo"
          onChange={handleChange}
          placeholder="Ingresar tipo de tarea"
        />
        <input
          type="text"
          value={tarea.descripcion}
          name="descripcion"
          onChange={handleChange}
          placeholder="Descripcion"
        />
        <button className={styles.submit} type="submit">
          Agregar tarea
        </button>
        <ToastContainer />
      </form>
      <h3> Por resolver</h3>
      <div className={styles.tareasPorResolver}>
        {tareas.map((el) => {
          return (
            <div className={styles.div} key={el.id}>
              <p>Tipo: {el.tipo}</p>
              <p>Descripción: {el.descripcion}</p>
              <div className={styles.buttons}>
                <button
                  onClick={() => handleClick(el.id)}
                  className={styles.listo}
                >
                  Listo
                </button>
                <button
                  name="porResolver"
                  onClick={(event) => handleDelete(event, el.id)}
                  className={styles.remover}
                >
                  Remover
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h3>Resueltas</h3>
        <div className={styles.tareasPorResolver}>
          {tareaCheck.map((el) => {
            return (
              <div className={styles.div} key={el.id}>
                <p>Tipo: {el.tipo}</p>
                <p>Descripción: {el.descripcion}</p>
                <div className={styles.buttons}>
                  <button
                    name="resueltas"
                    onClick={(event) => handleDelete(event, el.id)}
                    className={styles.remover}
                  >
                    Remover
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
