import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadingToggleAction,loginAction,
} from '../../store/actions/AuthActions';

//
import logo from '../../images/logo.png'
import logotext from '../../images/logo-text.png'

function Login (props) {
    const [email, setEmail] = useState('vive_magico@example.com');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('vive_magico');
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
        if (error) {
			return ;
		}
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
								<h3 className="mb-1 font-w600">Bienvenido a Vive Mágico</h3>
								<p className="">Inicia sesión llenando los siguientes datos</p>
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
											<label className="form-check-label" htmlFor="basic_checkbox_1">Recordar mis datos</label>
										</div>
									</div>
								</div>
								<div className="text-center">
									<button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
								</div>
							</form>
							<div className="new-account mt-2">
								<p className="mb-0">¿Aún no tienes una cuenta registrada?{" "}
									<Link className="text-black" to="./page-register">Regístrate aquí</Link>
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-5 d-flex box-skew1">
						<div className="inner-content align-self-center">
							<div className="my-4">
								<img src={logo} alt="" className="logo-vm mr-2"/>
								<img src={logotext} alt="" className="logo-vm-text ml-1"/>
							</div>
							<h2 className="m-b10 text-white">¡Inicia Sesión y Reserva Ahora!</h2>
							<p className="m-b40 text-white"> Increibles servicios & Grandes experiencias para tus clientes </p>
							<ul className="social-icons mt-4">
								<li><a href={"https://www.facebook.com/vivemomv"} target="_blank" rel="noreferrer"><i className="fa fa-facebook"></i></a></li>
								<li><a href={"https://www.youtube.com/channel/UCQY_x3OMI-XjEYo4CIJIZPg/featured"} target="_blank" rel="noreferrer"><i className="fa fa-youtube-play"></i></a></li>
								<li><a href={"https://www.tiktok.com/@vive_magico"} target="_blank" rel="noreferrer"><i className="bx bxl-tiktok"></i></a></li>
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