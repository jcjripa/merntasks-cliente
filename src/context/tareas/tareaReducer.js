import { types } from '../../types'

export const tareaReducer = (state, action) => {
	switch (action.type) {
		case types.getTareas:
			return {
				...state,
				tareasPorProyecto: action.payload,
			}
		case types.addTareas:
			return {
				...state,
				tareasPorProyecto: [...state.tareasPorProyecto, action.payload],
				errorTarea: false,
			}
		case types.validarTarea:
			return {
				...state,
				errorTarea: true,
			}
		case types.deleteTarea:
			return {
				...state,
				tareasPorProyecto: state.tareasPorProyecto.filter(
					(tarea) => tarea._id !== action.payload
				),
			}
		case types.tareaActiva:
			return {
				...state,
				tareaSeleccionada: action.payload,
			}
		case types.editTarea:
			return {
				...state,
				tareasPorProyecto: state.tareasPorProyecto.map((tarea) =>
					tarea._id === action.payload._id ? action.payload : tarea
				),
			}
		case types.cleanTarea:
			return {
				...state,
				tareaSeleccionada: null,
			}
		default:
			return state
	}
}
