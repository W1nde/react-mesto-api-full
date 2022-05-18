function InfoTooltip(props) {
  const { messageTooltip } = props;
  return (
    
    <div
      className={
        props.isOpen
          ? `popup popup__auth-pic popup_opened`
          : `popup popup__auth-pic`
      }
    >
      <div className='popup__overlay' onClick={props.onClose}></div>
      <div className='popup__content'>

        <img
          className='auth__pic'
          src={messageTooltip.img}
          alt={messageTooltip.message}
        ></img>

        <button
          className='popup__close'
          onClick={props.onClose}
          type="button"
        ></button>

        <h2 
          className='popup__title'
          style={{
            margin: 36,
            textAlign: 'center'
          }}
        >
          {messageTooltip.message}
        </h2>

      </div>
    </div>
  );
}

export default InfoTooltip;