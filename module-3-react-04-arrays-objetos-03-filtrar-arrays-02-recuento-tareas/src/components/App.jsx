import '../styles/App.scss';
// Fichero src/components/App.jsx
import { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([
    { task: 'Comprar harina, jamón y pan rallado', completed: true },
    { task: 'Hacer croquetas ricas', completed: true },
    { task: 'Ir a la puerta de un gimnasio', completed: false },
    {
      task: 'Comerme las croquetas mirando a la gente que entra en el gimnasio',
      completed: false,
    },
  ]);
  const [searchValue, setSearchValue] = useState('');
  const taskCompleted = tasks.filter((task) => task.completed);

  const handleSearch = (event) => setSearchValue(event.currentTarget.value);
  const handleTaskFinished = (event) => {
    const taskID = parseInt(event.currentTarget.id);
    const taskSelected = tasks.find((task, index) => index === taskID);
    taskSelected.completed = !taskSelected.completed;
    setTasks([...tasks]);
  };
  const renderList = () => {
    return tasks
      .filter((task) => {
        return task.task.toLowerCase().includes(searchValue.toLowerCase());
      })
      .map((task, index) => {
        return (
          <li
            key={index}
            id={index}
            className={task.completed ? 'checked' : ''}
            onClick={handleTaskFinished}
          >
            {task.task}
          </li>
        );
      });
  };

  return (
    <>
      <label htmlFor="search">Busca en tu lista</label>
      <input
        type="text"
        name=""
        id="search"
        value={searchValue}
        onChange={handleSearch}
      />
      <h1>Mi lista de tareas</h1>
      <ol>{renderList()}</ol>
      <p>Tareas totales: {tasks.length}</p>
      <p>Tareas completadas: {taskCompleted.length}</p>
      <p>Tareas pendientes: {tasks.length - taskCompleted.length}</p>
    </>
  );
};

export default App;
