import PropTypes from 'prop-types';
import '../styles/Letters.scss';

function ErrorLetters({ word, userLetters }) {
  const renderErrorLetters = () => {
    const errorLetters = userLetters.filter((letter) => !word.includes(letter));
    return errorLetters.map((letter, i) => {
      return (
        <li className="letter" key={i}>
          {letter}
        </li>
      );
    });
  };
  return (
    <div className="error">
      <h2 className="title">Letras falladas:</h2>
      <ul className="letters">{renderErrorLetters()}</ul>
    </div>
  );
}
ErrorLetters.propTypes = {
  word: PropTypes.string.isRequired,
  userLetters: PropTypes.array.isRequired,
};
export default ErrorLetters;
