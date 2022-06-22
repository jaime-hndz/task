import React, { useState, useRef } from "react";
type FormElemet = React.FormEvent<HTMLFormElement>;

interface ITareas {
  nombre: string;
  done: boolean;
}

function App(): JSX.Element {
  const [nuevaTarea, setnuevaTarea] = useState<string>("");
  const [tareas, settareas] = useState<ITareas[]>([]);
  const tasInput = useRef<HTMLInputElement>(null);

  const ButtonSubmit = (e: FormElemet): void => {
    e.preventDefault();
    AgregarTarea(nuevaTarea);
    setnuevaTarea("");
    tasInput.current?.focus();
  };

  const AgregarTarea = (nombre: string): void => {
    const nuevasTareas: ITareas[] = [...tareas, { nombre, done: false }];
    settareas(nuevasTareas);
  };

  const CambiarCheck = (i: number): void => {
    const nuevaTarea: ITareas[] = [...tareas];
    nuevaTarea[i].done = !nuevaTarea[i].done;
    settareas(nuevaTarea);
  };

  const EliminarTarea = (i: number): void => {
    const nuevastaeas: ITareas[] = [...tareas];
    nuevastaeas.splice(i, 1);
    settareas(nuevastaeas);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={ButtonSubmit}>
                <input
                  type="text"
                  onChange={(e) => setnuevaTarea(e.target.value)}
                  value={nuevaTarea}
                  className="form-control"
                  ref={tasInput}
                  autoFocus
                />
                <button className="btn btn-secondary btn-block mt-2">
                  Mandar
                </button>
              </form>
            </div>
          </div>

          {tareas.map((t: ITareas, i: number) => (
            <div className=" card card-body mt-2" key={i}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.nombre}
              </h2>
              <div>
                <button
                  className="btn btn-secundary"
                  onClick={() => CambiarCheck(i)}
                >
                  {t.done ? "✓" : "✕"}
                </button>
                <button
                  className="btn btn-secundary"
                  onClick={() => EliminarTarea(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
