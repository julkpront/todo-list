import './Item.css'

const Item = ({ task, onDelete, onToggle, onEdit }) => {
  const { id, title, desc, isDone } = task

  let titleClass = 'title'
  if (isDone) {
    titleClass = 'title done'
  }

  return (
    <li className="item">
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => onToggle(id)}
      />

      <div className="item__content">
        <strong className={titleClass}>{title}</strong>
        <p className="item__desc">{desc}</p>
      </div>

      <div className="item__buttons">
        <button className="item__edit" onClick={() => onEdit(task)}>
          EDITAR
        </button>
        <button className="item__delete" onClick={() => onDelete(id)}>
          BORRAR
        </button>
      </div>
    </li>
  )
}

export default Item