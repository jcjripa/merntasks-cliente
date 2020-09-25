import React, { useContext } from 'react'
import { Tarea } from './Tarea'
import { proyectoContext } from '../../context/proyectos/proyectoContext'
import { TareaContext } from '../../context/tareas/tareaContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export const ListadoTareas = () => {
	const { proyectoActivo, eliminarProyecto } = useContext(proyectoContext)
	const { tareasPorProyecto } = useContext(TareaContext)
	if (!tareasPorProyecto) return null
	// Si no hay proyecto seleccionado
	if (!proyectoActivo) return <h2>Selecciona un proyecto</h2>
	// Array Destructuring para mostrar el proyecto activo
	const [proyectoActual] = proyectoActivo

	return (
		<>
			<h2>Proyecto: {proyectoActual.nombre}</h2>
			<ul className='listado-tareas'>
				{tareasPorProyecto.length === 0 ? (
					<li className='tarea'>
						<p>No hay tareas</p>
					</li>
				) : (
					<TransitionGroup>
						{tareasPorProyecto.map((tarea) => (
							<CSSTransition
								key={tarea._id}
								timeout={200}
								classNames='tarea'
							>
								<Tarea tarea={tarea} />
							</CSSTransition>
						))}
					</TransitionGroup>
				)}
			</ul>

			<button
				className='btn btn-eliminar'
				onClick={() => eliminarProyecto(proyectoActual._id)}
			>
				Eliminar Proyecto
			</button>
		</>
	)
}
