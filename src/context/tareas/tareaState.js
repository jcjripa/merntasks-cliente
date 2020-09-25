import React, { useReducer } from 'react'
import { TareaContext } from './tareaContext'
import { tareaReducer } from './tareaReducer'
import { types } from '../../types'
import { clienteAxios } from '../../config/axios'

export const TareaState = (props) => {
	const initialState = {
		tareasPorProyecto: [],
		errorTarea: false,
		tareaSeleccionada: null,
	}

	// Crear dispatch y state
	const [state, dispatch] = useReducer(tareaReducer, initialState)

	// Funciones

	// Obtener tareas
	const obtenerTareas = async (proyecto) => {
		try {
			const resultado = await clienteAxios.get('/api/tareas', {
				params: { proyecto },
			})
			dispatch({
				type: types.getTareas,
				payload: resultado.data.tareas,
			})
		} catch (error) {
			console.log(error)
		}
	}

	// Agregar Tareas
	const agregarTarea = async (tarea) => {
		try {
			const res = await clienteAxios.post('/api/tareas', tarea)
			dispatch({
				type: types.addTareas,
				payload: res.data.tarea,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const validarTarea = () => {
		dispatch({
			type: types.validarTarea,
		})
	}

	// eliminar tarea
	const eliminarTarea = async (id, proyecto) => {
		try {
			await clienteAxios.delete(`/api/tareas/${id}`, {
				params: { proyecto },
			})
			dispatch({
				type: types.deleteTarea,
				payload: id,
			})
		} catch (error) {
			console.log(error)
		}
	}
	// EDITAR TAREA
	const actualizarTarea = async (tarea) => {
		try {
			const resultado = await clienteAxios.put(
				`/api/tareas/${tarea._id}`,
				tarea
			)
			dispatch({
				type: types.editTarea,
				payload: resultado.data.tarea,
			})
		} catch (error) {
			console.log(error)
		}
	}

	// GUARDAR TAREA ACTIVA
	const guardarTareaActiva = (tarea) => {
		dispatch({
			type: types.tareaActiva,
			payload: tarea,
		})
	}

	const limpiarTarea = () => {
		dispatch({
			type: types.cleanTarea,
		})
	}

	return (
		<TareaContext.Provider
			value={{
				tareasPorProyecto: state.tareasPorProyecto,
				errorTarea: state.errorTarea,
				tareaSeleccionada: state.tareaSeleccionada,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
				guardarTareaActiva,
				actualizarTarea,
				limpiarTarea,
			}}
		>
			{props.children}
		</TareaContext.Provider>
	)
}
