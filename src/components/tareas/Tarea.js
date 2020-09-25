import React, { useContext } from 'react'
import { TareaContext } from '../../context/tareas/tareaContext'
import { proyectoContext } from '../../context/proyectos/proyectoContext'

export const Tarea = ({ tarea }) => {
	const { proyectoActivo } = useContext(proyectoContext)
	const [proyectoActual] = proyectoActivo
	const {
		obtenerTareas,
		eliminarTarea,
		guardarTareaActiva,
		actualizarTarea,
	} = useContext(TareaContext)

	const tareaEliminar = (id) => {
		eliminarTarea(id, proyectoActual._id)
		obtenerTareas(proyectoActual.id)
	}

	const handleEstate = (tarea) => {
		if (tarea.estado) {
			tarea.estado = false
		} else {
			tarea.estado = true
		}

		actualizarTarea(tarea)
	}
	// Agregar una tarea actual cuando el usuario edite
	const seleccionarTarea = (tarea) => {
		guardarTareaActiva(tarea)
	}
	return (
		<li className='tarea sombra'>
			<p>{tarea.nombre}</p>
			<div className='estado'>
				{tarea.estado ? (
					<button
						className='completo'
						onClick={() => handleEstate(tarea)}
					>
						Completo
					</button>
				) : (
					<button
						className='incompleto'
						onClick={() => handleEstate(tarea)}
					>
						Incompleto
					</button>
				)}
			</div>
			<div className='acciones'>
				<button
					className='btn btn-primario'
					onClick={() => seleccionarTarea(tarea)}
				>
					Editar
				</button>
				<button
					className='btn btn-secundario'
					onClick={() => tareaEliminar(tarea._id)}
				>
					Eliminar
				</button>
			</div>
		</li>
	)
}
