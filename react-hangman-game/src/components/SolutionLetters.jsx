import PropTypes from 'prop-types';
import '../styles/Letters.scss';

function SolutionLetters({ word, userLetters }) {
  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map((letter, i) => {
      const exists = userLetters.includes(letter);
      return (
        <li className="letter" key={i}>
          {exists ? letter : ''}
        </li>
      );
    });
  };
  return (
    <div className="solution">
      <h2 className="title">Solución:</h2>
      <ul className="letters">{renderSolutionLetters()}</ul>
    </div>
  );
}
SolutionLetters.propTypes = {
  word: PropTypes.string.isRequired,
  userLetters: PropTypes.array.isRequired,
};

export default SolutionLetters;
