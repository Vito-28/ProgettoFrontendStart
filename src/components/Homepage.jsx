import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import "../styles.css";

/* il componente funzionale Homepage è la schermata principale dell'applicazione */
function Homepage() {
  /* permette di usare il TaskContext per accedere alle variabili e funzioni globali */
  const { tasks, addTask, toggleComplete, deleteTask, editTask } = useContext(TaskContext);

  /* il testo del nuovo task da aggiungere e la funzione per aggiornare il nuovo task */
  const [newTask, setNewTask] = useState("");

  /* id del task da modificare e la funzione per aggiornarlo */
  const [editingTaskId, setEditingTaskId] = useState(null);

  /* testo del task modificato e funzione per aggiornarlo */
  const [editedText, setEditedText] = useState("");

  /* Funzione per la gestione dell'aggiunta del task e per la gestione del form al submit */
  function handleSubmit(e) {
    /* evita il refresh all'invio del form */
    e.preventDefault();
    /* verifica se il task non è vuoto */
    if (newTask.trim() !== "") {
      /* aggiunge il task */
      addTask(newTask);
      /* resetta dopo l'aggiunta */
      setNewTask("");
    }
  }
  
  /* Funzione per la modifica del task */
  function handleEditClick(task) {
    /* imposta l'id del task da modificare */
    setEditingTaskId(task.id);
    /* setta il testo del task attuale */
    setEditedText(task.text);
  }
  
  /* funzione che permette di salvare la modifica */
  function handleSaveEdit (id) {
    /* aggiorna il task con il testo modificato */
    editTask(id, editedText);
    /* setta a null il task dell'id da modificare */
    setEditingTaskId(null);
  }
  /* funzione che permette di annullare la modifica */
  function handleCancelEdit() {
    setEditingTaskId(null);
  }

  return (
    <div className="container">
      <header>
        <h1>To-Do List</h1>
      </header>
  
      <main>
        {/* FORM PER AGGIUNGERE UN NUOVO TASK */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Aggiungi</button>
        </form>
  
        {/* LISTA DEI TASK */}
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {/* GESTIONE DELLA MODIFICA DEL TASK */}
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(task.id)}>Salva</button>
                  <button onClick={handleCancelEdit}>Annulla</button>
                </>
              ) : (
                <>
                  {/* VISUALIZZAZIONE DEL TASK */}
                  <span
                    style={{ textDecoration: task.completed ? "line-through" : "none" }}
                  >
                    {task.text}
                  </span>
                  <button onClick={() => handleEditClick(task)}>Modifica</button>
                </>
              )}
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? "Ripristina" : "Completa"}
              </button>
              <button onClick={() => deleteTask(task.id)}>Elimina</button>
            </li>
          ))}
        </ul>
  
        {/* LINK ALLA PAGINA ATTIVITA' COMPLETATE */}
        <Link id="idLink" to="/completed">Vedi attività completate</Link>
      </main>
  
      {/* FOOTER */}
      <footer>
        <p>© 2025 To-Do List App | Tutti i diritti riservati</p>
      </footer>
    </div>
  );
};

export default Homepage;

