import React, { useContext, useEffect } from 'react'
import { Proyecto } from './Proyecto'
import { proyectoContext } from '../../context/proyectos/proyectoContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { AlertaContext } from '../../context/alertas/alertaContext'

export const ListadoProyectos = () => {
	const { proyectos, obtenerProyectos, mensaje } = useContext(proyectoContext)
	const { alerta, mostrarAlerta } = useContext(AlertaContext)

	useEffect(() => {
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria)
		}
		obtenerProyectos()
		// eslint-disable-next-line
	}, [mensaje])

	if (proyectos.length === 0) return <p>No hay proyectos</p>

	return (
		<ul className='listado-proyectos'>
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<TransitionGroup>
				{proyectos.map((proyecto) => (
					<CSSTransition
						key={proyecto._id}
						timeout={200}
						classNames='proyecto'
					>
						<Proyecto proyecto={proyecto} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	)
}
