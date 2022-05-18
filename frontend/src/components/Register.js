import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit({ email, password })
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Регистрация</h2>

      <form 
        className='auth__form'
        onSubmit={handleSubmit}
      >

        <input 
          className='auth__input'
          name='email'
          type='email'
          minLength='2'
          maxLength='40'
          placeholder='E-mail'
          required

          value={email}
          onChange={handleEmail}
        />

        <input
          className='auth__input'
          name='password'
          type='password'
          minLength='2'
          maxLength='40'
          placeholder='Пароль'
          required

          value={password}
          onChange={handlePassword}
        />

        <button className='auth__submit-button' type='submit'>Зарегистрироваться</button>

      </form>

        <p className='auth__subtitle'>Уже зарегистрированы?
         <Link className='auth__subtitle' to='/sign-in'> Войти</Link>
        </p>

    </div>
  );
}

export default Register;