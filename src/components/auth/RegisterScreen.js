import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { uiRemoveError, uiSetError } from '../../actions/ui';
import { startRegisterEmailPass } from '../../actions/auth';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector( state => state );
  const [formValues, handleInputChange] = useForm({
    name:'prueba',
    email:'correo@mail.com',
    password:'123456',
    password2:'123456'
  });
  const {name, email, password, password2} = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if(isFormValid()){
      dispatch(startRegisterEmailPass(name,email,password));
    }
  }

  const isFormValid = ()=>{
    if(name.trim().length === 0){ 
      dispatch(uiSetError('Name is required'));
      return false;
    }else if(!validator.isEmail(email)){
      dispatch(uiSetError('email is not valid'));
      return false;
    }else if(password !== password2 || password.length < 5){
      dispatch(uiSetError('password is not valid'));
      return false;
    }
    dispatch(uiRemoveError());
    return true;
  }
  return (
    <>
    <h3 className="auth__title">Login</h3>
    <form onSubmit={handleRegister}>
      { 
          state.ui.msgError && <div className="auth__alert-error">{state.ui.msgError}</div>
      }
      <input className="auth__input" autoComplete="off" type="text" placeholder="Name" name="name" value={name} onChange={handleInputChange}/>
      <input className="auth__input" autoComplete="off" type="text" placeholder="Email" name="email" value={email} onChange={handleInputChange}/>
      <input className="auth__input" autoComplete="off" type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange}/>
      <input className="auth__input" autoComplete="off" type="password" placeholder="Confirm password" name="password2" value={password2} onChange={handleInputChange}/>
      <button className="btn btn-primary btn-block mb-5" type="submit">Register</button>
      <Link to="/auth/login" className="link">
        Already registered? 
      </Link>
    </form>
  </>
  )
}
