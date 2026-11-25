import './Form.css'

const Form = ({
  values,
  error,
  submitText,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={values.title}
        onChange={onChange}
        placeholder="Título de la tarea"
      />
      <input
        type="text"
        name="desc"
        value={values.desc}
        onChange={onChange}
        placeholder="Descripción"
      />

      <div className="form__buttons">
        {values.title && (
          <button className="form__submit" type="submit">
            {submitText}
          </button>
        )}
        {isEditing && (
          <button className="form__cancel" type="button" onClick={onCancel}>
            CANCELAR
          </button>
        )}
      </div>

      {error && <p className="form__error">{error}</p>}
    </form>
  )
}

export default Form