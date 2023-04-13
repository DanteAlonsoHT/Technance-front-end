import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadingToggleAction,loginAction,
} from '../../store/actions/AuthActions';

//
import logo from '../../images/logo-full.svg'
import swal from "sweetalert";

function Login (props) {
    const [email, setEmail] = useState('researcher@example.com.mx');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('abcd1234');
    const dispatch = useDispatch();

    function onLogin(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Correo electrónico es requerido';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Contraseña es requerida';
            error = true;
        }
        setErrors(errorObj);
        if (error) return swal(
					"Oops",
					"Información incompleta, checa si todos los campos fueron llenados correctamente.",
					"error",
					{
						button: "¡Intenta de nuevo!",
					}
				);		
		dispatch(loadingToggleAction(true));	
        dispatch(loginAction(email, password, props.history));
    }

  return (
  
		<div className="login-form-bx">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6 col-md-7 box-skew d-flex">
						<div className="authincation-content">
							<div className="mb-4">
								<h3 className="mb-1 font-w600">Bienvenido a Technance App</h3>
								<p className="">Completa la siguiente información para iniciar sesión</p>
							</div>
							{props.errorMessage && (
								<div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
									{props.errorMessage}
								</div>
							)}
							{props.successMessage && (
								<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
									{props.successMessage}
								</div>
							)}
							<form onSubmit={onLogin}>
								<div className="form-group">
									<label className="mb-2 ">
										<strong className="">Correo Electrónico</strong>
									</label>
									<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
									{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
								</div>
								<div className="form-group">
									<label className="mb-2 "><strong className="">Contraseña</strong></label>
									<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
									{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
								</div>
								<div className="form-row d-flex justify-content-between mt-4 mb-2">
									<div className="form-group">
										<div className="custom-control custom-checkbox ml-1 ">
											<input type="checkbox" className="form-check-input" id="basic_checkbox_1"/>
											<label className="form-check-label" htmlFor="basic_checkbox_1">Recordar mi información</label>
										</div>
									</div>
								</div>
								<div className="text-center">
									<button type="submit" className="btn btn-primary btn-block">Inicia Sesión</button>
								</div>
							</form>
							<div className="new-account mt-2">
								<p className="mb-0">¿Aún no estás registrado?{" "}
									<Link className="text-black" to="./page-register">Regístrate aquí</Link>
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-5 d-flex box-skew1">
						<div className="inner-content align-self-center">
							<div className="my-0" style={{margin: "-2rem"}}>
								<img src={logo} alt="" className="mr-2" height={256} style={{margin: "-2.5rem"}} />
							</div>
							<h2 className="m-b10 text-white">¡Iniciar sesión para empezar a limpiar nuestra agua!</h2>
							<p className="m-b40 text-white"> Visualiza el uso y control del agua desde la plataforma</p>
							<ul className="social-icons mt-4">
								<li><a href={""} target="_blank" rel="noreferrer"><i className="fa fa-facebook"></i></a></li>
								<li><a href={""} target="_blank" rel="noreferrer"><i className="fa fa-youtube-play"></i></a></li>
								<li><a href={""} target="_blank" rel="noreferrer"><i className="bx bxl-tiktok"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};
export default connect(mapStateToProps)(Login);