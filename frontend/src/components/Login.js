import React, { useState } from 'react';

function Login(props) {
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
      <h2 className='auth__title'>Вход</h2>

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

        <button className='auth__submit-button' type='submit'>Войти</button>

      </form>

    </div>

  );
}

export default Login;
