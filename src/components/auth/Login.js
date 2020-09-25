import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { AlertaContext } from '../../context/alertas/alertaContext'
import { AuthContext } from '../../context/auth/authContext'

export const Login = (props) => {
	// extraer los valores del context de alertas
	const { alerta, mostrarAlerta } = useContext(AlertaContext)
	const { mensaje, autenticado, iniciarSesion } = useContext(AuthContext)

	// en caso de que el password o el usuario no exista
	useEffect(() => {
		if (autenticado) {
			props.history.push('/proyectos')
		}

		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria)
		}
		// eslint-disable-next-line
	}, [mensaje, autenticado, props.history])

	const initialForm = {
		email: '',
		password: '',
	}
	const [formValues, handleInputChange] = useForm(initialForm)

	const { email, password } = formValues

	const handleSubmit = (e) => {
		e.preventDefault()

		// validar campos vacios
		if (email.trim() === '' && password.trim() === '') {
			mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
			return
		}
		// Pasarlo al Action
		iniciarSesion({ email, password })
	}

	return (
		<div className='form-usuario'>
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<div className='contenedor-form'>
				<h1>Iniciar Sesion</h1>
				<form onSubmit={handleSubmit}>
					<div className='campo-form'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='Email'
							onChange={handleInputChange}
							value={email}
						/>
					</div>
					<div className='campo-form'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Password'
							onChange={handleInputChange}
							value={password}
						/>
					</div>
					<div className='campo-form'>
						<input
							type='submit'
							className='btn btn-primario btn-block'
							value='Iniciar Sesion'
						/>
					</div>
				</form>

				<Link to={'/nueva-cuenta'} className='enlace-cuenta'>
					Obtener Cuenta
				</Link>
			</div>
		</div>
	)
}
