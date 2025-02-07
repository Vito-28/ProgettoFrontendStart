import React, { createContext, useState, useContext } from "react";

/* Crea ed esporta un contesto che viene usato per fornire e condividere lo stato dei tasks in tutta l'applicazione. */
export const TaskContext = createContext();

/* Componente TaskProvider che viene usato come contenitore del contesto
   La props children permette du avvolgere altri componenti all'interno del TaskProvider */
function TaskProvider({ children }) {
  /* tasks è un array di task (stato)
     setTasks funzione per aggiornare tasks (stato)
     useState permette di inizializzare lo stato*/
  const [tasks, setTasks] = useState([]);
  
  /* Funzione che aggiunge un task:
     text è il testo del task
     l'id univoco è la data attuale
     completed rappresenta il completamento (true) oppure no (false) del task
  */
  const addTask = (text) => {
    /* copia l'array tasks esistente e aggiunge il nuovo oggetto alla fine dell'array */
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };
  
  /* Funzione che permette di completare o annullare il completamento di un task
     id è l'id del task da modificare */
  const toggleComplete = (id) => { 
    /* crea nuovo array con stessi task e modifica solo quello con id corrispondente. */
    setTasks(
      tasks.map((task) =>
        /* controllo id task corrente sia uguale a quello del task selezionato
           copia il task e cambia completed in true o false */
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /* Funzione per eliminare un task */
  const deleteTask = (id) => {
    /* crea un nuovo array senza il task con l'id che abbiamo in input alla funzione
       attraverso l'uso di filter e della condizione */
    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  };

  /* Funzione che mi va a modifica il task con parametri id del task da modificare e il nuovo testo del task */
  const editTask = (id, newText) => {
    /* al verificarsi della condizione mi va a copiare il task aggiungendo il nuovo testo */
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  return (
    /* condivide i dati e le funzioni con i componenti figli. */
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete, deleteTask, editTask }}>
      {/* permette ai componenti figli di accdere a questi value */}
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
