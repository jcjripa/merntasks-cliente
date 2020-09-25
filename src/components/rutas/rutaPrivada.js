import React, { useContext, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../../context/auth/authContext'

export const RutaPrivada = ({ component: Component, ...props }) => {
	const { autenticado, usuarioAutenticado, cargando } = useContext(
		AuthContext
	)

	useEffect(() => {
		usuarioAutenticado()
		// eslint-disable-next-line
	}, [])
	return (
		<Route
			{...props}
			render={(props) =>
				!autenticado && !cargando ? (
					<Redirect to='/' />
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}
