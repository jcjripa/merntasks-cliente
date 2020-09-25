import React, { useContext } from 'react'
import { proyectoContext } from '../../context/proyectos/proyectoContext'
import { TareaContext } from '../../context/tareas/tareaContext'

export const Proyecto = ({ proyecto }) => {
	const { proyectoActual } = useContext(proyectoContext)
	const { obtenerTareas } = useContext(TareaContext)

	const handleClick = (id) => {
		proyectoActual(id)
		obtenerTareas(id)
	}

	return (
		<li>
			<button
				className='btn btn-blank'
				onClick={() => handleClick(proyecto._id)}
			>
				{proyecto.nombre}
			</button>
		</li>
	)
}
