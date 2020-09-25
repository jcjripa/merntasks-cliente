import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth/authContext'

export const Barra = () => {
	const { usuario, usuarioAutenticado, cerrarSesion } = useContext(
		AuthContext
	)

	useEffect(() => {
		usuarioAutenticado()
		// eslint-disable-next-line
	}, [])

	return (
		<header className='app-header'>
			{usuario ? (
				<p className='nombre-usuario'>
					Hola <span>{usuario.name}</span>
				</p>
			) : null}

			<nav className='nav-principal'>
				<button
					className='btn btn-blank cerrar-sesion'
					onClick={() => cerrarSesion()}
				>
					Cerrar Sesion
				</button>
			</nav>
		</header>
	)
}
