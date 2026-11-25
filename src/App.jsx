import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import tasksData from './data/tasks.json'
import Form from './components/Form'
import List from './components/List'
import './App.css'

const emptyForm = { title: '', desc: '' }

function App() {
  const [tasks, setTasks] = useState([])
  const [values, setValues] = useState(emptyForm)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState(null)

  const isEditing = editingId !== null

  let submitText = 'ADD'
  if (isEditing) {
    submitText = 'GUARDAR'
  }

  // Precarga de tareas al montar el componente
  useEffect(() => {
    setTasks(tasksData)
  }, [])

  // El mensaje desaparece a los 5 segundos
  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      setMessage('')
    }, 5000)

    return () => clearTimeout(timer)
  }, [message])

  // Si pasan 20 segundos sin enviar, se vacía el formulario (no al editar)
  useEffect(() => {
    if (editingId !== null) return
    if (!values.title && !values.desc) return

    const timer = setTimeout(() => {
      setValues(emptyForm)
      setError('')
    }, 10000)

    return () => clearTimeout(timer)
  }, [values, editingId])

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleCancel = () => {
    setValues(emptyForm)
    setEditingId(null)
    setError('')
  }

  const handleSubmit = () => {
    if (values.title.trim().length < 5) {
      setError('El título debe tener al menos 5 caracteres')
      return
    }

    if (isEditing) {
      setTasks(
        tasks.map((task) => {
          if (task.id === editingId) {
            return { ...task, title: values.title, desc: values.desc }
          }
          return task
        })
      )
      setMessage('Tarea actualizada')
    } else {
      const newTask = {
        id: uuidv4(),
        title: values.title,
        desc: values.desc,
        isDone: false,
      }
      setTasks([...tasks, newTask])
      setMessage('Tarea añadida')
    }

    handleCancel()
  }

  const handleEdit = (task) => {
    setValues({ title: task.title, desc: task.desc })
    setEditingId(task.id)
    setError('')
  }

  const handleClear = () => {
    setTasks([])
    handleCancel()
  }

  const handleReset = () => {
    setTasks(tasksData)
    handleCancel()
  }

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    if (id === editingId) {
      handleCancel()
    }
  }

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone }
        }
        return task
      })
    )
  }

  return (
    <div className="app">
      <h1 className="app__title">TODO List</h1>

      <Form
        values={values}
        error={error}
        submitText={submitText}
        isEditing={isEditing}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      {message && <p className="app__message">{message}</p>}

      <div className="app__actions">
        <button className="app__clear" onClick={handleClear}>
          CLEAR
        </button>
        <button className="app__reset" onClick={handleReset}>
          RESET
        </button>
      </div>

      <List
        tasks={tasks}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onEdit={handleEdit}
      />
    </div>
  )
}

export default App