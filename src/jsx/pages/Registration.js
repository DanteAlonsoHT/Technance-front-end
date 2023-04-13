import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import logo from '../../images/logo.png'
import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
import swal from "sweetalert";

const regexText = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

function Register(props) {
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [preferredName, setPreferredName] = useState('');
    const [imageProfile, setImageProfile] = useState(null);
    
    const [imageName, setImageName] = useState(null);
    const imageProfileRef = useRef();
    const fileReader = new FileReader();

    const dispatch = useDispatch();

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (fullName === '') {
            errorObj.fullName = 'Nomre completo es requerido';
            error = true;
        } else if (!regexText.test(fullName)) {
            errorObj.fullName = 'Solo letras son permitidas en este campo';
            error = true;
        }

        if (preferredName === '') {
            errorObj.preferredName = 'Nombre preferido es requerido';
            error = true;
        }

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

        dispatch(signupAction(fullName, preferredName, email, password, imageProfile, props.history));
    }
    return (
        <div className='authincation h-100 p-meddle'>
            <div className='container h-100'>
                <div className='row justify-content-center h-100 align-items-center'>
                    <div className='col-lg-6'>
                        <div className='authincation-content'>
                            <div className='row no-gutters'>
                                <div className='col-xl-12'>
                                    <div className='auth-form'>
                                        <div className='text-center mb-5'>
                                            <img src={logo} alt="" height="96" />
                                        </div>

                                        <h3 className='text-center my-5 text-white'>¡Regístrate ahora!</h3>
                                        {props.errorMessage && (
                                            <div className='text-black  p-1 my-2'>
                                                {props.errorMessage}
                                            </div>
                                        )}
                                        {props.successMessage && (
                                            <div className=' text-black   p-1 my-2'>
                                                {props.successMessage}
                                            </div>
                                        )}
                                        <form onSubmit={onSignUp}>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Nombre completo</strong>
                                                </label>
                                                <input type='text' className='form-control mb-1'
                                                    value={fullName}
                                                    placeholder='nombre completo'
                                                    onChange={(e) => setFullName(e.target.value)}
                                                />
                                                {errors.fullName && <div className="text-white fs-12">*{errors.fullName}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>¿Cómo prefieres que te llamen?</strong>
                                                </label>
                                                <input type='text' className='form-control mb-1'
                                                    value={preferredName}
                                                    placeholder='nombre preferido'
                                                    onChange={(e) => setPreferredName(e.target.value)}
                                                />
                                                {errors.preferredName && <div className="text-white fs-12">*{errors.preferredName}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Correo electrónico</strong>
                                                </label>
                                                <input type="email" className="form-control mb-1"
                                                    value={email}
                                                    placeholder='correo electrónico'
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                {errors.email && <div className="text-white fs-12">*{errors.email}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Contraseña</strong>
                                                </label>
                                                <input type="password" className="form-control mb-1"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(e.target.value)
                                                    }
                                                    placeholder='contraseña'
                                                />
                                                {errors.password && <div className="text-white fs-12">*{errors.password}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Imagen de perfil</strong>
                                                </label>
                                                <label className="d-block mx-auto custom-file-upload">
                                                    <input
                                                    type="file"
                                                    name="archivo"
                                                    accept="image/*"
                                                    id="FileUploaded"
                                                    onChange={(e)=> {
                                                        if (e.target.files.length > 0) {
                                                            console.log(e.target.files[0]);
                                                            fileReader.readAsDataURL(e.target.files[0]);
                                                            if (e.target.files[0].size > 1048576) {
                                                                swal('Oops! Tamaño de Imagen', "El límite de tamaño en imágenes es de 1MB, Intenta con otra imagen", "error");
                                                            } else {
                                                                fileReader.onloadend = () => {
                                                                    setImageName(e.target.files[0].name);
                                                                    setImageProfile(fileReader.result);
                                                                };
                                                            }
                                                        }
                                                        }}
                                                    ref={imageProfileRef}
                                                    hidden
                                                    />
                                                    {imageProfile ? `Imagen cargada: ${imageName.substr(0, 20)}...` : 'Seleccionar imagen desde tu dispositivo'}
                                                </label>
                                            </div>
                                            <div className='text-center mt-4'>
                                                <input type='submit' className='btn bg-white btn-outline-primary text-primary btn-block' />
                                            </div>
                                        </form>
                                        <div className='new-account mt-3 text-white'>
                                            <p>
                                                ¿Ya tienes una cuenta?{' '}
                                                <Link className='text-white font-weight-bold' to='/login'>
                                                    Inicia sesión aquī
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default connect(mapStateToProps)(Register);
