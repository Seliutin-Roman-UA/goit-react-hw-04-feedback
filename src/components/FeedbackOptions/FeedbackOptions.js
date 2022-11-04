import { Btn } from './FeedbackOptions.styled';
import PropTypes from 'prop-types';

export function FeedbackOptions({ options, pressButton }) {
  return (
    <>
      {options.map(([key]) => {
        return (
          <Btn key={key} className="btn" type="button" onClick={pressButton}>
            {key}
          </Btn>
        );
      })}
    </>
  );
}

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.array).isRequired,
  pressButton: PropTypes.func.isRequired,
};
