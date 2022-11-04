import { useReducer } from 'react';
import { Statistics } from 'components/Statistics/Statistics';
import { Notification } from 'components/Notification/Notification';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';

import { FeedbackForm } from './App.styled';
import { Section } from './Section/Section';

export function App() {
  function reducer(state, action) {
    const changingState = { ...state };
    const { type } = action;
    if (state[type] === undefined) return state;
    changingState[type] = state[type] + 1;
    return changingState;
  }
  const positivFeedback = ['exelent', 'very good', 'good'];
  const initialState = {
    exelent: 0,
    'very good': 0,
    good: 0,
    neutral: 0,
    'so-so': 0,
    bad: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const pressButton = evt => {
    const nameButton = evt.target.textContent.toLowerCase();
    dispatch({ type: nameButton });
  };

  const countTotalFeedback = () => {
    return Object.values(state).reduce(
      (prevValue, value) => prevValue + value,
      0
    );
  };
  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    if (total === 0) return 0;
    const good = positivFeedback.reduce(
      (acc, item) => (state?.[item] ? acc + state[item] : acc),
      0
    );
    return Math.round((good / total) * 100);
  };

  const statsList = Object.entries(state);
  const total = countTotalFeedback();

  return (
    <FeedbackForm>
      <Section title={'Please leave fedback'}>
        <FeedbackOptions options={statsList} pressButton={pressButton} />
      </Section>

      <Section title={'Statistics'}>
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            statsList={statsList}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </FeedbackForm>
  );
}
