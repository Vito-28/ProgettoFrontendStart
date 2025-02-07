import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import "../styles.css";

/* Componente che recupera l'array dei task e filtra solo quelli completati per poi visualizzarli */
function CompletedTasks() {
  /* permette di accedere all'array che contiene i tasks da TaskContext */
  const { tasks } = useContext(TaskContext);

  return (
    <div className="container"> {/* Aggiunto il container per il layout grid */}
      <header>
        <h1>Attività Completate</h1>
      </header>

      <main>
        {/* LISTA DELLE ATTIVITA' COMPLETATE */}
        <ul>
          {/* FILTRA LE ATTIVITA' COMPLETATE ANDANDO A CONTROLLARE I TASK CON completed === true */}
          {tasks.filter((task) => task.completed).map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>

        {/* PERMETTE DI TORNARE ALLA HOMEPAGE */}
        <Link id="idLink" to="/">Torna alla homepage</Link>
      </main>

      {/* FOOTER */}
      <footer>
        <p>© 2025 To-Do List App | Tutti i diritti riservati</p>
      </footer>
    </div>
  );
}

export default CompletedTasks;
