import { useState } from 'react';
import { initialTasks } from '../../data/data';
import { FaCheck, FaTrash, FaEdit, FaPlus, FaSave } from 'react-icons/fa';

const TaskManager = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  const validateForm = () => {
    if (!title.trim()) {
      alert('El título es obligatorio');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newTask = {
      id: editId || Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false
    };

    setTasks(prev =>
      editId
        ? prev.map(task => task.id === editId ? newTask : task)
        : [...prev, newTask]
    );

    setTitle('');
    setDescription('');
    setEditId(null);
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditId(task.id);
  };

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className='containerTasks'>
      <section className='containerTasks-left'>
        <form onSubmit={handleSubmit} className='containerTasks-left-form'>
          <div className='containerTasks-form_info'>
            <p>PANEL DE CONTROL </p>
          </div>
          <input
            type="text"
            placeholder="TASK TITLE"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="TASK DESCRIPTION"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className='buttonForm'>
            {editId ? (
              <>
                <FaSave /> UPDATE TASK
              </>
            ) : (
              <>
                <FaPlus /> ADD TASK
              </>
            )}
          </button>
        </form>
        <h1>TASK 0.1</h1>
      </section>

      <section className='containerTasks-right'>
        <div className="tasks-lists">
          {tasks.map(task => (
            <div
              key={task.id}
              className="task-card"
              data-completed={task.completed}
            >
              {task.completed ? (
                <>
                  <s><h3>{task.title}</h3></s>
                  <s><p>{task.description}</p></s>
                </>
              ) : (
                <>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </>
              )}
              <div className="task-actions">
                <button
                  className='buttonComplete'
                  onClick={() => toggleComplete(task.id)}
                >
                  <FaCheck /> {task.completed}
                </button>
                <button
                  className='buttonEdit'
                  onClick={() => handleEdit(task)}
                >
                  <FaEdit /> EDIT
                </button>
                <button
                  className='buttonDelete'
                  onClick={() => handleDelete(task.id)}
                >
                  <FaTrash /> DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TaskManager;