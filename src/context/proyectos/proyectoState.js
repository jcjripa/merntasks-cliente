import React, { useReducer } from 'react'
import { proyectoContext } from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import { types } from '../../types'
import { clienteAxios } from '../../config/axios'

export const ProyectoState = (props) => {
	const initialState = {
		formulario: false,
		proyectos: [],
		errorFormulario: false,
		proyectoActivo: null,
		mensaje: null,
	}

	// Dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(proyectoReducer, initialState)

	// Serie de funciones para el crud
	const mostrarFormulario = () => {
		dispatch({
			type: types.formProyecto,
		})
	}

	// obtener los proyectos
	const obtenerProyectos = async () => {
		try {
			const resultado = await clienteAxios.get('/api/proyectos')
			dispatch({
				type: types.getProyectos,
				payload: resultado.data.proyectos,
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error',
			}
			dispatch({
				type: types.proyectoError,
				payload: alerta,
			})
		}
	}

	// Agregar nuevo proyecto
	const agregarProyecto = async (proyecto) => {
		try {
			const resultado = await clienteAxios.post(
				'/api/proyectos',
				proyecto
			)
			// Insertar el proyecto en el state
			dispatch({
				type: types.addProyecto,
				payload: resultado.data,
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error',
			}
			dispatch({
				type: types.proyectoError,
				payload: alerta,
			})
		}
	}

	// valida el formulario por errores
	const mostrarError = () => {
		dispatch({
			type: types.validarFormulario,
		})
	}

	// selecciona el proyecto que el usuario dio click
	const proyectoActual = (proyectoId) => {
		dispatch({
			type: types.proyectoActivo,
			payload: proyectoId,
		})
	}

	// eliminar proyecto
	const eliminarProyecto = async (proyectoId) => {
		try {
			await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
			dispatch({
				type: types.deleteProyecto,
				payload: proyectoId,
			})
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error',
			}
			dispatch({
				type: types.proyectoError,
				payload: alerta,
			})
		}
	}

	return (
		<proyectoContext.Provider
			value={{
				formulario: state.formulario,
				proyectos: state.proyectos,
				errorFormulario: state.errorFormulario,
				proyectoActivo: state.proyectoActivo,
				mensaje: state.mensaje,
				mostrarFormulario,
				obtenerProyectos,
				agregarProyecto,
				mostrarError,
				proyectoActual,
				eliminarProyecto,
			}}
		>
			{props.children}
		</proyectoContext.Provider>
	)
}
