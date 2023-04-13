import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import logo from '../../images/logo-full.png'
import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
import swal from "sweetalert";
import dbStatesCities from './estados-ciudades';

const regexText = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regexNumbers = /^\d+$/;

function Register(props) {
    const [email, setEmail] = useState('admin@admin.com');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('abcd1234');
    const [firstName, setFirstName] = useState('test');
    const [lastName, setLastName] = useState('test test');
    const [preferredName, setPreferredName] = useState('test');
    const [agencyName, setAgencyName] = useState('Agencia Test');
    const [bornDate, setBornDate] = useState('1999-11-11');
    const [country, setCountry] = useState('México');
    const [state, setState] = useState('Guanajuato');
    const [city, setCity] = useState('Leon');
    const [imageProfile, setImageProfile] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('8111172266');
    const [location, setLocation] = useState('test #112, test');
    
    const [imageName, setImageName] = useState(null);
    const imageProfileRef = useRef();
    const fileReader = new FileReader();

    const dispatch = useDispatch();

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (firstName === '') {
            errorObj.firstName = 'Nombre(s) son Requerido(s)';
            error = true;
        } else if (!regexText.test(firstName)) {
            errorObj.firstName = 'Solo letras son permitidos en este campo';
            error = true;
        }

        if (lastName === '') {
            errorObj.lastName = 'Apellidos son Requeridos';
            error = true;
        } else if (!regexText.test(lastName)) {
            errorObj.lastName = 'Solo letras son permitidos en este campo';
            error = true;
        }

        if (bornDate === '') {
            errorObj.bornDate = 'Fecha de Nacimiento es Requerida';
            error = true;
        }

        if (preferredName === '') {
            errorObj.preferredName = 'Nombre preferido es Requerida';
            error = true;
        }

        if (agencyName === '') {
            errorObj.agencyName = 'Nombre de agencia es Requerida';
            error = true;
        }

        if (email === '') {
            errorObj.email = 'Correo es Requerido';
            error = true;
        }

        if (password === '') {
            errorObj.password = 'Contraseña es Requerida';
            error = true;
        }

        if (country === '') {
            errorObj.country = 'País es Requerido';
            error = true;
        }

        if (state === '') {
            errorObj.state = 'Estado de Residencia es Requerido';
            error = true;
        }

        if (city === '') {
            errorObj.city = 'Ciudad de Residencia es Requerida';
            error = true;
        }

        if (phoneNumber === '') {
            errorObj.phoneNumber = 'Número telefónico es Requerido';
            error = true;
        } else if (!regexNumbers.test(phoneNumber)) {
            errorObj.phoneNumber = 'Solo números son permitidos en este campo';
            error = true;
        }

        if (location === '') {
            errorObj.location = 'Ubicación del local es Requerido';
            error = true;
        }

        setErrors(errorObj);

        if (error) return;
        dispatch(loadingToggleAction(true));

        dispatch(signupAction(firstName, lastName, preferredName, agencyName, email, password, bornDate, country, state, city, imageProfile, phoneNumber, location, props.history));
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
                                        <div className='text-center mb-3'>
                                            <img src={logo} alt="" height="164" />
                                        </div>

                                        <h4 className='text-center mb-4 text-white'>Registra tu cuenta</h4>
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
                                                    <strong>Nombre(s)</strong>
                                                </label>
                                                <input type='text' className='form-control mb-1'
                                                    value={firstName}
                                                    placeholder='nombre(s)'
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                                {errors.firstName && <div className="text-white fs-12">*{errors.firstName}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Apellidos</strong>
                                                </label>
                                                <input type='text' className='form-control mb-1'
                                                    value={lastName}
                                                    placeholder='apellidos'
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                                {errors.lastName && <div className="text-white fs-12">*{errors.lastName}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>¿Cómo te gusta que te llamen?</strong>
                                                </label>
                                                <input type='text' className='form-control mb-1'
                                                    value={preferredName}
                                                    placeholder='Nombre preferido'
                                                    onChange={(e) => setPreferredName(e.target.value)}
                                                />
                                                {errors.preferredName && <div className="text-white fs-12">*{errors.preferredName}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Nombre de la agencia</strong>
                                                </label>
                                                <input type='text' className='form-control mb-1'
                                                    value={agencyName}
                                                    placeholder='Nombre de la agencia'
                                                    onChange={(e) => setAgencyName(e.target.value)}
                                                />
                                                {errors.agencyName && <div className="text-white fs-12">*{errors.agencyName}</div>}
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
                                                    <strong>Fecha de nacimiento</strong>
                                                </label>
                                                <input type="date" className="form-control mb-1"
                                                    onChange={(e) =>
                                                        setBornDate(e.target.value)
                                                    }
                                                />
                                                {errors.bornDate && <div className="text-white fs-12">*{errors.bornDate}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>País</strong>
                                                </label>
                                                <select className="form-control mb-1"
                                                    onSelect={(e) =>
                                                        setCountry(e.target.value)
                                                    }
                                                    disabled
                                                >
                                                    <option value="">--Seleccionar País Disponible--</option>
                                                    <option value="México" selected>México</option>
                                                </select>
                                                {errors.country && <div className="text-white fs-12">*{errors.country}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Estado</strong>
                                                </label>
                                                <select className="form-control mb-1"
                                                    onChange={(e) =>
                                                        setState(e.target.value)
                                                    }
                                                >
                                                    <option value="" selected>--Seleccionar Estado--</option>
                                                    {
                                                        Object.keys(dbStatesCities.México).map((state) => (
                                                            <option value={state}>{state}</option>
                                                        ))
                                                    }
                                                </select>
                                                {errors.state && <div className="text-white fs-12">*{errors.state}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Ciudad</strong>
                                                </label>
                                                <select className="form-control mb-1 text-gray-dark"
                                                    onChange={(e) =>
                                                        setCity(e.target.value)
                                                    }
                                                >
                                                    <option value="" selected>--Seleccionar Ciudad--</option>
                                                    {
                                                        state && (
                                                            Object.values(dbStatesCities.México[state]).map((city) => (
                                                                <option value={city}>{city}</option>
                                                            ))
                                                        )
                                                    }
                                                </select>
                                                {errors.city && <div className="text-white fs-12">*{errors.city}</div>}
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
                                                    {imageProfile ? `Imagen cargada: ${imageName.substr(0, 20)}...` : 'Selecciona imagen de perfil'}
                                                </label>
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Número telefónico</strong>
                                                </label>
                                                <input type='text' className='form-control mb-1'
                                                    value={phoneNumber}
                                                    placeholder='número telefónico'
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                                {errors.phoneNumber && <div className="text-white fs-12">*{errors.phoneNumber}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Ubicación del local {"(ejemplo: calle #100, colonia)"}</strong>
                                                </label>
                                                <input type='text' className='form-control mb-1'
                                                    value={location}
                                                    placeholder='ubicación del local'
                                                    onChange={(e) => setLocation(e.target.value)}
                                                />
                                                {errors.location && <div className="text-white fs-12">*{errors.location}</div>}
                                            </div>
                                            <div className='text-center mt-4'>
                                                <input type='submit' className='btn bg-white btn-outline-primary text-primary btn-block' />
                                            </div>
                                        </form>
                                        <div className='new-account mt-3 text-white'>
                                            <p>
                                                ¿Ya tienes una cuenta?{' '}
                                                <Link className='text-white font-weight-bold' to='/login'>
                                                    Inicia sesión aquí
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
