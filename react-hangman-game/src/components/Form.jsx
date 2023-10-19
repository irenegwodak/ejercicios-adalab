import PropTypes from 'prop-types';

const Form = ({lastLetter, handleInputLetter}) => {
  const handleInputOnChange = (event) => {
    const regExp = /^[A-Za-zñÑ´Á-Úá-ú¨üÜ\s]*$/;
    const inputValue = event.currentTarget.value;
    if (regExp.test(inputValue)) {
      handleInputLetter(inputValue);
    }
  };

  return (
    <form className="form">
      <label className="title" htmlFor="last-letter">
        Escribe una letra:
      </label>
      <input
        autoComplete="off"
        className="form__input"
        maxLength="1"
        type="text"
        name="last-letter"
        id="last-letter"
        value={lastLetter}
        onKeyDown={(ev) => {
          ev.target.setSelectionRange(0, 1);
        }}
        onChange={handleInputOnChange}
      />
    </form>
  );
};

Form.propTypes = {
  lastLetter: PropTypes.string,
  handleInputLetter: PropTypes.func,
};

export default Form;
