import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export const Feedback = (props: any) => {
  const { goBack } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackQuestions, setFeedbackQuestions] = useState<any>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showFeedbackComplete, setShowFeedbackComplete] = useState(false);

  const getFeedbackQuestions = () => {
    setIsLoading(true);
    async function getDataFromGoogleSheet() {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/13wEjW1HvmMDDT8juEeFtR4g-34UtGObOd2EtFfBV7Gs/gviz/tq?tqx=out:csv`,
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
        console.log(data);
        setFeedbackQuestions(data);
        setIsLoading(false);
        return data;
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getFeedbackQuestions();
  }, []);

  const handleNext = () => {
    if (activeQuestion === feedbackQuestions.length) {
      setShowFeedbackComplete(true);
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setActiveQuestion(activeQuestion + 1);
    }, 100);
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
        {isLoading ? (
          <Loading />
        ) : showFeedbackComplete ? (
          <div
            style={{
              color: 'white',
              fontSize: '40px',
              marginTop: '20%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p>Thank you for your feedback</p>
            <button
              onClick={goBack}
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
              Back to website
            </button>
          </div>
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
              {feedbackQuestions[activeQuestion]?.Question}
            </div>
            {activeQuestion === feedbackQuestions.length ? (
              <div>
                <textarea
                  style={{
                    width: '100%',
                    height: '180px',
                    borderRadius: '4px',
                    border: 'none',
                    outline: 'none',
                    padding: 8,
                  }}
                  placeholder="Additional feedback"
                ></textarea>
              </div>
            ) : (
              <>
                {['A', 'B', 'C', 'D', 'E'].map((questionOption) => (
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
                        name={feedbackQuestions[activeQuestion]?.QuestionNo}
                        value={questionOption}
                      />
                      {feedbackQuestions[activeQuestion]?.[questionOption]}
                    </label>
                  </div>
                ))}
              </>
            )}

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
              {activeQuestion === feedbackQuestions.length ? 'Submit' : 'Next'}
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
