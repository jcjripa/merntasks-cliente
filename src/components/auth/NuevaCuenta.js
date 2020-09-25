import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertaContext } from '../../context/alertas/alertaContext'
import { AuthContext } from '../../context/auth/authContext'
import { useForm } from '../../hooks/useForm'

export const NuevaCuenta = (props) => {
	// extraer los valores del context de alertas
	const { alerta, mostrarAlerta } = useContext(AlertaContext)
	const { mensaje, autenticado, registrarUsuario } = useContext(AuthContext)

	// en caso de que el usuario se aya autenticado o registrado o sea un registro duplicado
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
		name: '',
		email: '',
		password: '',
		password2: '',
	}
	const [formValues, handleInputChange] = useForm(initialForm)
	const { name, email, password, password2 } = formValues

	const handleSubmit = (e) => {
		e.preventDefault()

		// validar campos vacios
		if (
			name.trim() === '' ||
			email.trim() === '' ||
			password.trim() === '' ||
			password2.trim() === ''
		) {
			mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
			return
		}
		// Password minimo de 6 caracteres
		if (password.length < 6) {
			mostrarAlerta(
				'El password debe ser de al menos 6 caracteres',
				'alerta-error'
			)
			return
		}

		// Los 2 passwords son iguales
		if (password !== password2) {
			mostrarAlerta('Los passwords no son iguales', 'alerta-error')
			return
		}

		// Pasarlo al Action
		registrarUsuario({ name, email, password })
	}
	return (
		<div className='form-usuario'>
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<div className='contenedor-form'>
				<h1>Registrarse</h1>
				<form onSubmit={handleSubmit}>
					<div className='campo-form'>
						<label htmlFor='name'>Nombre</label>
						<input
							type='text'
							id='name'
							name='name'
							placeholder='Nombre'
							onChange={handleInputChange}
							value={name}
						/>
					</div>
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
						<label htmlFor='password1'>Password</label>
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
						<label htmlFor='password2'>Password</label>
						<input
							type='password'
							id='password2'
							name='password2'
							placeholder='Confirm Password'
							onChange={handleInputChange}
							value={password2}
						/>
					</div>
					<div className='campo-form'>
						<input
							type='submit'
							className='btn btn-primario btn-block'
							value='Registrar'
						/>
					</div>
				</form>

				<Link to={'/'} className='enlace-cuenta'>
					Iniciar Sesion
				</Link>
			</div>
		</div>
	)
}
