import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export const Quiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questionSelections, setQuestionSelections] = useState<any>([]);
  const [userResults, setUserResults] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);

  const getQuizData = () => {
    setIsLoading(true);
    async function getDataFromGoogleSheet() {
      const sheetId = '1nB8LmO00SBPpx-zFGJQ0-x8Bkt8XNTdXOuJahVMnVq4';

      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const csvData = await response.text();

      // Parse CSV data to JSON
      const results = Papa.parse(csvData, { header: true });
      const jsonData = results.data;

      return jsonData;
    }

    getDataFromGoogleSheet()
      .then((data) => {
        setIsLoading(false);
        setQuizData(data);
      })
      .catch((error) => console.log(error));
  };

  const getQuizAnswers = () => {
    setIsLoading(true);
    async function getDataFromGoogleSheet() {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/1R3t9W1NMejZSOSRkWZcTsCd6dU9eVA2rxPOHvMpnPvc/gviz/tq?tqx=out:csv`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const csvData = await response.text();

      // Parse CSV data to JSON
      const results = Papa.parse(csvData, { header: true });
      const jsonData = results.data;

      return jsonData;
    }

    return getDataFromGoogleSheet()
      .then((data) => {
        setAnswers(data);
        setIsLoading(false);
        return data;
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getQuizData();
  }, []);

  const handleSelection = (e: any) => {
    const questionNo = quizData[activeQuestion].QuestionNo;
    const selectedAnswer = e.target.value;

    const userAnswer = {
      questionNo,
      selectedAnswer,
    };

    setQuestionSelections([...questionSelections, userAnswer]);
  };

  const handleNext = () => {
    if (activeQuestion + 1 === quizData.length) {
      handleSubmit();
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setActiveQuestion(activeQuestion + 1);
    }, 100);
  };

  const handleSubmit = () => {
    getQuizAnswers().then((data) => {
      const results = data?.map((question: any) => {
        // Find the user's selected answer for the corresponding question
        const userAnswer = questionSelections.find(
          (answer: any) => answer.questionNo === question.QuestionNo,
        );

        console.log(userAnswer.selectedAnswer);
        console.log(question.CorrectAnswer);

        // Check if the user's answer matches the correct answer
        const isCorrect =
          userAnswer &&
          userAnswer.selectedAnswer.trim() === question.CorrectAnswer.trim();

        return {
          QuestionNo: question.QuestionNo,
          isCorrect,
        };
      });
      setUserResults(results);
    });
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="lg-box">
        {isLoading || !quizData ? (
          <Loading />
        ) : userResults.length ? (
          <UserResults
            quizData={quizData}
            results={userResults}
            questionSelections={questionSelections}
            answers={answers}
          />
        ) : (
          <div style={{ textAlign: 'left', marginTop: 76, minWidth: 350 }}>
            <div
              style={{
                fontSize: 30,
                color: 'white',
                marginBottom: 70,
                textAlign: 'center',
              }}
            >
              {quizData[activeQuestion].Question}
            </div>
            {['A', 'B', 'C', 'D'].map((questionOption) => (
              <div
                style={{
                  padding: '12px 4px',
                  background: 'white',
                  borderRadius: '4px',
                  marginBottom: '20px',
                }}
              >
                <label>
                  <input
                    type="radio"
                    name={quizData[activeQuestion].QuestionNo}
                    value={questionOption}
                    onClick={handleSelection}
                  />
                  {quizData[activeQuestion][questionOption]}
                </label>
              </div>
            ))}

            <button
              onClick={handleNext}
              style={{
                background: '#00007f',
                borderRadius: '4px',
                width: '100%',
                height: '40px',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                border: 'solid 1px #7272dc',
                cursor: 'pointer',
                marginLeft: 'auto',
              }}
            >
              {activeQuestion + 1 === quizData.length ? 'Submit' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div
      style={{
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        color: 'white',
        fontSize: '30px',
      }}
    >
      Loading
    </div>
  );
};

const UserResults = (props: any) => {
  const { quizData, results, questionSelections, answers } = props;

  console.log('quizData', quizData);

  const correctAnswerCount = results.filter((result: any) => result.isCorrect);

  const getLabel = (questionNo: string, questionKey: string) => {
    const isCorrect = results.find(
      (r: any) => r.QuestionNo === questionNo && r.isCorrect,
    );
    const isSelected = questionSelections.find(
      (qs: any) =>
        qs.questionNo === questionNo && qs.selectedAnswer === questionKey,
    );

    const answer = answers.find(
      (r: any) =>
        r.QuestionNo === questionNo && r.CorrectAnswer === questionKey,
    );

    if (isCorrect && isSelected) {
      return ' - Correct';
    }

    if (!isCorrect && isSelected) {
      return ' - Your Answer';
    }

    if (answer) return ' - Correct Answer';

    return '';
  };

  const getLabelStyle = (questionNo: string, questionKey: string) => {
    const isCorrect = results.find(
      (r: any) => r.QuestionNo === questionNo && r.isCorrect,
    );
    const isSelected = questionSelections.find(
      (qs: any) =>
        qs.questionNo === questionNo && qs.selectedAnswer === questionKey,
    );

    const answer = answers.find(
      (r: any) =>
        r.QuestionNo === questionNo && r.CorrectAnswer === questionKey,
    );

    if (isCorrect && isSelected) {
      return 'green';
    }

    if (!isCorrect && isSelected) {
      return 'red';
    }

    if (answer) return 'green';

    return '';
  };

  return (
    <div
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        color: 'white',
      }}
    >
      <p style={{ fontSize: 40, marginBottom: 0 }}>Results</p>
      <p style={{ fontSize: 40, marginTop: 0 }}>
        {correctAnswerCount?.length}/{quizData?.length}
      </p>
      <div style={{ width: '100%' }}>
        {quizData.map((q: any) => (
          <div
            style={{
              background: 'white',
              color: '#383838',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              padding: '8px',
              width: '100%',
              borderRadius: '4px',
              marginBottom: 8,
              fontSize: 12,
            }}
          >
            <p style={{ margin: 0, marginBottom: 8 }}>{q.Question}</p>
            {['A', 'B', 'C', 'D'].map((questionOption) => (
              <label>
                {q[questionOption]}
                <span
                  style={{
                    color: getLabelStyle(q?.QuestionNo, questionOption),
                  }}
                >
                  {getLabel(q?.QuestionNo, questionOption)}
                </span>
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
