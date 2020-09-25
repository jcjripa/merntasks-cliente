import { types } from '../../types'

export default (state, action) => {
	switch (action.type) {
		case types.formProyecto:
			return {
				...state,
				formulario: true,
			}
		case types.getProyectos:
			return {
				...state,
				proyectos: action.payload,
			}
		case types.addProyecto:
			return {
				...state,
				proyectos: [...state.proyectos, action.payload],
				formulario: false,
				errorFormulario: false,
			}
		case types.validarFormulario:
			return {
				...state,
				errorFormulario: true,
			}
		case types.proyectoActivo:
			return {
				...state,
				proyectoActivo: state.proyectos.filter(
					(proyecto) => proyecto._id === action.payload
				),
			}
		case types.deleteProyecto:
			return {
				...state,
				proyectos: state.proyectos.filter(
					(proyecto) => proyecto._id !== action.payload
				),
				proyectoActivo: null,
			}
		case types.proyectoError:
			return {
				...state,
				mensaje: action.payload,
			}
		default:
			return state
	}
}
