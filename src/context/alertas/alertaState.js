import React, { useReducer } from 'react'
import { types } from '../../types'
import { AlertaContext } from './alertaContext'
import alertaReducer from './alertaReducer'

export const AlertaState = (props) => {
	const initialState = {
		alerta: null,
	}

	const [state, dispatch] = useReducer(alertaReducer, initialState)
	// agregar las funciones
	const mostrarAlerta = (msg, categoria) => {
		dispatch({
			type: types.mostrarAlerta,
			payload: {
				msg: msg,
				categoria: categoria,
			},
		})

		setTimeout(() => {
			dispatch({
				type: types.ocultarAlerta,
			})
		}, 5000)
	}

	return (
		<AlertaContext.Provider
			value={{
				alerta: state.alerta,
				mostrarAlerta,
			}}
		>
			{props.children}
		</AlertaContext.Provider>
	)
}
