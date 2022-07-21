import { useState } from 'react';
import { Container } from './App.styled';
import { Section } from 'components/Section/Section';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Statistics } from 'components/Statistics/Statistics';
import { Notification } from 'components/Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const onLeaveFeedback = (option) => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      
      default:
        return;
    };
  };
  
  const countTotalFeedback = () => {
		return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const percentage = (good * 100) / total;
    return Math.round(percentage);
  };  

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Container>
        <Section title='Please leave feedback'>
        <FeedbackOptions options={[ 'good', 'neutral', 'bad' ]} onLeaveFeedback={onLeaveFeedback} />
        </Section>

        {total === 0
          ? (<Notification message='There is no feedback' />)
          : (
            <Section title='Statistics'>
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
				        positivePercentage={positivePercentage}
              /> 
            </Section>
          )}
      </Container>
  );
};
