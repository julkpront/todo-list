import Item from '../Item'
import './List.css'

const List = ({ tasks, onDelete, onToggle, onEdit }) => {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <Item
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}

export default List