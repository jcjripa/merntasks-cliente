import React from 'react'
import { useForm } from '../../hooks/useForm'
import { useContext } from 'react'
import { proyectoContext } from '../../context/proyectos/proyectoContext'

export const NuevoProyecto = () => {
	const proyectosContext = useContext(proyectoContext)
	const {
		formulario,
		errorFormulario,
		mostrarError,
		agregarProyecto,
		mostrarFormulario,
	} = proyectosContext

	const initialForm = {
		nombre: '',
	}
	const [formValues, handleInputChange, reset] = useForm(initialForm)
	const { nombre } = formValues

	const handleSubmit = (e) => {
		e.preventDefault()

		// validar el proyecto
		if (nombre === '') {
			mostrarError()
			return
		}

		// agregar al state
		agregarProyecto(formValues)

		// reiniciar el form
		reset()
	}

	const handleClick = () => {
		mostrarFormulario()
	}

	return (
		<>
			<button
				className='btn btn-block btn-primario'
				onClick={handleClick}
			>
				Nuevo Proyecto
			</button>
			{formulario && (
				<form
					onSubmit={handleSubmit}
					className='formulario-nuevo-proyecto'
				>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre Proyecto'
						name='nombre'
						onChange={handleInputChange}
						value={nombre}
					/>

					<input
						type='submit'
						className='btn btn-primario btn-block'
						value='Agregar Proyecto'
					/>
				</form>
			)}
			{errorFormulario ? (
				<p className='mensaje error'>
					El nombre del Proyecto es obligatorio
				</p>
			) : null}
		</>
	)
}
