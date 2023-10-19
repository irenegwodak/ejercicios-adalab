import PropTypes from 'prop-types';
import '../styles/Loading.scss';

const Loading = ({ loading }) =>
  loading ? <span className="loading" /> : null;
  
Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
