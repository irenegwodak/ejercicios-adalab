import PropTypes from 'prop-types';

const Options = ({handleInputOptions}) => {
  const handleChange = (ev) => {
    const input = ev.currentTarget.value;
    handleInputOptions(input);
  };
  return (
    <form onSubmit={(ev) => ev.preventDefault()}>
      <label className="title" htmlFor="word">
        Escribe aquí la palabra que hay que adivinar:
      </label>
      <input
        autoFocus
        autoComplete="off"
        className="form__input"
        maxLength="15"
        type="text"
        id="word"
        name="word"
        onChange={handleChange}
      />
    </form>
  );
};
Options.propTypes = {
  handleInputOptions: PropTypes.func.isRequired,
};
export default Options;
