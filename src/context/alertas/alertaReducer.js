import { types } from '../../types'

export default (state, action) => {
	switch (action.type) {
		case types.mostrarAlerta:
			return {
				alerta: action.payload,
			}
		case types.ocultarAlerta:
			return {
				alerta: null,
			}
		default:
			return state
	}
}
