import React, { useContext, useEffect } from 'react'
import { proyectoContext } from '../../context/proyectos/proyectoContext'
import { TareaContext } from '../../context/tareas/tareaContext'
import { useForm } from '../../hooks/useForm'

export const FormTarea = () => {
	const { proyectoActivo } = useContext(proyectoContext)
	const {
		errorTarea,
		agregarTarea,
		validarTarea,
		obtenerTareas,
		tareaSeleccionada,
		actualizarTarea,
		limpiarTarea,
	} = useContext(TareaContext)
	const [formValues, handleInputChange, reset, setFormValues] = useForm({
		nombre: '',
	})
	const { nombre } = formValues

	// efecto que detecta el cambio del valor del nombre
	useEffect(() => {
		if (tareaSeleccionada !== null) {
			setFormValues(tareaSeleccionada)
		} else {
			reset()
		}
		// eslint-disable-next-line
	}, [tareaSeleccionada, setFormValues])

	if (!proyectoActivo) return null
	const [proyectoActual] = proyectoActivo

	const handleSubmit = (e) => {
		e.preventDefault()
		if (nombre.trim() === '') {
			validarTarea()
			return
		}
		if (tareaSeleccionada === null) {
			formValues.proyecto = proyectoActual._id
			agregarTarea(formValues)
		} else {
			actualizarTarea(formValues)
			limpiarTarea()
		}

		obtenerTareas(proyectoActual.id)

		reset()
	}

	return (
		<div className='formulario'>
			<form onSubmit={handleSubmit}>
				<div className='contenedor-input'>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre Tarea...'
						name='nombre'
						onChange={handleInputChange}
						value={nombre}
					/>
				</div>
				<div className='contenedor-input'>
					<input
						type='submit'
						className='btn btn-primario btn-block'
						value={
							tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'
						}
					/>
				</div>
			</form>

			{errorTarea && (
				<p className='mensaje error'>
					el nombre de la tarea es obligatorio
				</p>
			)}
		</div>
	)
}
