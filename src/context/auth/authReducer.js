import { types } from '../../types'

export default (state, action) => {
	switch (action.type) {
		case types.loginExitoso:
		case types.registroExitoso:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				autenticado: true,
				mensaje: null,
				cargando: false,
			}
		case types.cerrarSesion:
		case types.loginError:
		case types.registroError:
			return {
				...state,
				token: null,
				usuario: null,
				autenticado: null,
				mensaje: action.payload,
				cargando: false,
			}
		case types.obtenerUsuario:
			return {
				...state,
				autenticado: true,
				usuario: action.payload,
				cargando: false,
			}
		default:
			return state
	}
}
