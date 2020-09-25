import React, { useReducer } from 'react'
import { clienteAxios } from '../../config/axios'
import { tokenAuth } from '../../config/token'
import { types } from '../../types'
import { AuthContext } from './authContext'
import authReducer from './authReducer'

export const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		autenticado: null,
		usuario: null,
		mensaje: null,
		cargando: true,
	}
	const [state, dispatch] = useReducer(authReducer, initialState)

	// las funciones

	const registrarUsuario = async (datos) => {
		try {
			const respuesta = await clienteAxios.post('/api/usuarios', datos)

			dispatch({
				type: types.registroExitoso,
				payload: respuesta.data,
			})
			// obtener Usuario
			usuarioAutenticado()
		} catch (error) {
			// console.log(error.response.data.msg)
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error',
			}
			dispatch({
				type: types.registroError,
				payload: alerta,
			})
		}
	}

	// retorna el usuario autenticado
	const usuarioAutenticado = async () => {
		const token = localStorage.getItem('token')
		if (token) {
			// Todo: Funcion par a enviar el token por headers
			tokenAuth(token)
		}
		try {
			const respuesta = await clienteAxios.get('/api/auth')
			// console.log(respuesta)
			dispatch({
				type: types.obtenerUsuario,
				payload: respuesta.data.usuario,
			})
		} catch (error) {
			console.log(error.response)
			dispatch({
				type: types.loginError,
			})
		}
	}

	// cuando el usuario inicia sesion
	const iniciarSesion = async (datos) => {
		try {
			const respuesta = await clienteAxios.post('/api/auth', datos)
			// console.log(respuesta)
			dispatch({
				type: types.loginExitoso,
				payload: respuesta.data,
			})

			// obtener Usuario
			usuarioAutenticado()
		} catch (error) {
			console.log(error.response.data.msg)
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error',
			}
			dispatch({
				type: types.registroError,
				payload: alerta,
			})
		}
	}

	// Cierra la sesion del usuario
	const cerrarSesion = () => {
		dispatch({
			type: types.cerrarSesion,
		})
	}
	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				cargando: state.cargando,
				registrarUsuario,
				iniciarSesion,
				usuarioAutenticado,
				cerrarSesion,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}
