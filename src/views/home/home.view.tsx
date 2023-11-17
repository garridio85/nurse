import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import nurseMain from '../../assets/nurse-main.png';
import spirometer from '../../assets/spirometer.png';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getHomeData = () => {
    setIsLoading(true);
    async function getDataFromGoogleSheet() {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/12RDWXioVHKKoSDy152cBZ8cmEM1a7_gHlgfXrXuYLe8/gviz/tq?tqx=out:csv`,
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
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getHomeData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: 1220, margin: 'auto', padding: 8 }}>
      <div className="home-welcome-container">
        <div>
          <h1 style={{ fontSize: 45, width: '80%' }}>
            Inspire Your Lungs: Your Guide to Incentive Spirometry Success
          </h1>
          <p style={{ color: '#434343', fontSize: '18px' }}>
            Here at our website, our goal is to boost your understanding and
            ease when it comes to using incentive spirometry. We are dedicated
            to providing accessible information that helps you feel more
            confident and comfortable in incorporating this beneficial practice
            into your healthcare routine.
          </p>
        </div>
        <div>
          <img src={nurseMain} alt="nurses talking" style={{ height: 420 }} />
        </div>
      </div>
      <div className="blue-bg-container">
        <img
          src={spirometer}
          alt="nurses talking"
          style={{
            height: '390px',
            border: 'solid 6px white',
            borderRadius: '8px',
          }}
        />

        <div className="spirometry-container" style={{ marginLeft: 60 }}>
          <p style={{ fontSize: '20px', color: 'white', marginBottom: 60 }}>
            Incentive spirometry is a respiratory therapy device used to help
            improve lung function. It's often used after surgery or during
            certain lung conditions. The device encourages the user to take
            slow, deep breaths by inhaling through a mouthpiece, which lifts a
            marker, providing visual feedback. This process helps keep the lungs
            clear of mucus and increases lung capacity by encouraging full lung
            inflation. It's particularly important for patients who are
            recovering from surgery or have conditions that might lead to lung
            complications, as it aids in preventing pneumonia and other
            respiratory problems.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              width: '400px',
            }}
          >
            <a href="/general">
              <button className="blue-box-button">
                Learn More About Incentive Spirometry
              </button>
            </a>
            <a href="/how-to">
              <button className="blue-box-button">
                Learn How to Use an Incentive Spirometer
              </button>
            </a>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 50, marginBottom: 200 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div className="blue-box">
            <h2>Test your Knowledge</h2>
            <button className="blue-box-button">
              <a href="/quiz">Click Here To Take Our Quiz</a>
            </button>
          </div>

          <div className="blue-box">
            <h2>Frequently Asked Questions</h2>
            <button className="blue-box-button">
              <a href="/faqs">Click Here For Incentive Spirometry FAQ's</a>
            </button>
          </div>

          <div className="blue-box">
            <h2>How Did you Like this Website?</h2>
            <button className="blue-box-button">
              <a href="/feedback">
                Click Here To Complete Our User Satisfaction Survey
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
