import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Markdown from 'markdown-to-jsx';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [homeData, setHomeData] = useState<any>([]);

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
        console.log(data);
        setHomeData(data);
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
      <div>
        {homeData.map((data: any, index: number) => (
          <>
            {index === 0 && (
              <div style={{ marginBottom: 40 }} key={data.section}>
                {data.sectionTitle && <h3>{data.sectionTitle}</h3>}
                {data.content && (
                  <div
                    style={{ textTransform: 'capitalize', marginBottom: 50 }}
                  >
                    <Markdown>{data.content || ''}</Markdown>
                  </div>
                )}
              </div>
            )}
          </>
        ))}

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div className="blue-box">
            <h2>Test your Knowledge</h2>
            <button className="blue-box-button">
              <a href="/quiz">Click Here To Take Our Quiz</a>
            </button>
          </div>

          <div className="blue-box">
            <h2>But What is Incentive Spirometry?</h2>
            <button className="blue-box-button">
              <a href="/general">
                Click Here To Learn More About Incentive Spirometry
              </a>
            </button>
          </div>

          <div className="blue-box">
            <h2>How to Use an Incentive Spirometer</h2>
            <button className="blue-box-button">
              <a href="/how-to">Click Here For "How To" Video</a>
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
