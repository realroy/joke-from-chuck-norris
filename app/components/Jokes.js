import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withState, compose, withHandlers } from 'recompose';

import { nextJokeIndex, prevJokeIndex, goToJokeIndex } from '../store/reducers/jokes';

import FlexBox from './FlexBox';
import { Input } from './Form';

const mapDispatchToProps = dispatch => ({
  dispatchNextJoke: () => dispatch(nextJokeIndex()),
  dispatchPrevJoke: () => dispatch(prevJokeIndex()),
  dispatchGoToJokeIndex: index => dispatch(goToJokeIndex(index)),
});

const enhance = compose(
  connect(({ jokes }) => jokes, mapDispatchToProps),
  withState('index', 'setIndex', 1),
  withHandlers({
    handleNext: ({
      setIndex, jokeIndex, jokes, dispatchNextJoke,
    }) => () => {
      if (jokeIndex < jokes.length - 1) {
        setIndex(n => n + 1);
        dispatchNextJoke();
      }
    },
    handlePrev: ({ setIndex, jokeIndex, dispatchPrevJoke }) => () => {
      if (jokeIndex > 0) {
        setIndex(n => n - 1);
        dispatchPrevJoke();
      }
    },
    handleChange: ({ dispatchGoToJokeIndex, setIndex }) => (event) => {
      const { value } = event.target;
      setIndex(() => value);
      const index = parseInt(value.trim(), 10);
      if (index) dispatchGoToJokeIndex(index - 1);
    },
    handleEnterDown: ({ dispatchGoToJokeIndex }) => (event) => {
      if (event.key === 'Enter') {
        const { value } = event.target;
        const index = parseInt(value.trim(), 10);
        if (index) dispatchGoToJokeIndex(index - 1);
      }
    },
    handleBlur: ({ setIndex, dispatchGoToJokeIndex, jokeIndex }) => ({ target: value }) => {
      const intValue = parseInt(value, 10);
      if (intValue) {
        setIndex(() => intValue);
        dispatchGoToJokeIndex(intValue - 1);
      } else {
        setIndex(jokeIndex + 1);
      }
    },
  }),
);

const handleDisplayJoke = ({ isFetchingJokes = false, joke = '' }) => {
  if (isFetchingJokes) {
    return 'Now Loading...';
  }
  return joke;
};

const Jokes = ({
  jokes,
  jokeIndex,
  handleNext,
  handlePrev,
  handleChange,
  handleEnterDown,
  handleBlur,
  maxJokes,
  isFetchingJokes,
  fetchingJokesError,
  index,
}) => (
  <FullWidthFlexbox direction="column" alignItems="center">
    <FullWidthFlexbox justify="space-between" alignItems="center">
      <SVGButton onClick={handlePrev}>
        <img src="/static/imgs/arrow_back.svg" alt="previous-joke" />
      </SVGButton>
      <JokeQuote>
        {handleDisplayJoke({ isFetchingJokes, joke: jokes[jokeIndex].joke })}
      </JokeQuote>
      <SVGButton onClick={handleNext}>
        <img src="/static/imgs/arrow_forward.svg" alt="next-joke" />
      </SVGButton>
    </FullWidthFlexbox>
    <JokePagination>
      <Input
        type="number"
        min={maxJokes > 0 ? 1 : 0}
        max={jokes.length}
        onChange={handleChange}
        onKeyDown={handleEnterDown}
        onBlur={handleBlur}
        value={index}
      />
      <span> of {jokes.length}</span>
    </JokePagination>
  </FullWidthFlexbox>
);

Jokes.propTypes = {
  jokes: PropTypes.arrayOf(PropTypes.object).isRequired,
  jokeIndex: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleEnterDown: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  maxJokes: PropTypes.number.isRequired,
  isFetchingJokes: PropTypes.bool.isRequired,
  fetchingJokesError: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

const FullWidthFlexbox = FlexBox.extend`
	width: 100%;
`;

const SVGButton = styled.button`
	background: none;
	border: none;
	transition: ease-out 0.5s;
	&:hover {
		transform: scale(1, 1.2);
		cursor: pointer;
	}
`;
const JokeQuote = styled.h1`
	text-align: center;
	text-shadow: 0 1px 0px #70dbb8, 1px 0 0px #70dbb8, 1px 2px 1px #70dbb8, 2px 1px 1px #70dbb8,
		2px 3px 2px #70dbb8, 3px 2px 2px #70dbb8, 3px 4px 2px #70dbb8, 4px 3px 3px #70dbb8,
		4px 5px 3px #70dbb8, 5px 4px 2px #5dabcd, 5px 6px 2px #378ab4, 6px 5px 2px #5dabcd,
		6px 7px 1px #378ab4, 7px 6px 1px #5dabcd, 7px 8px 0px #378ab4, 8px 7px 0px #5dabcd;
	width: 70%;
	font-size: 2em;
	@media (min-width: 768px) {
		font-size: 3em;
	}
	@media (min-width: 1440px) {
		font-size: 4em;
	}
`;
const JokePagination = styled.div`
	margin: 8px;
`;

export default enhance(Jokes);
