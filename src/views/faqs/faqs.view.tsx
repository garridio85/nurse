import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Markdown from 'markdown-to-jsx';
import hands from '../../assets/hands.png';

export const FAQ = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [faqData, setFaqData] = useState<any>([]);

  const getFaqData = () => {
    setIsLoading(true);
    async function getDataFromGoogleSheet() {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/1GV79LLlIr4ol2q2-e-WA9-zp-j7xOkhM8znCvDBKAaE/gviz/tq?tqx=out:csv`,
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
        setFaqData(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getFaqData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: 1220, margin: 'auto', padding: 8 }}>
      <div className="faq-container">
        <h1 style={{ textAlign: 'center', marginBottom: 80 }}>
          Frequently Asked Questions
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqData.map((faq: any, index: number) => (
            <div
              style={{
                marginBottom: '40px',
                background: 'rgb(166 197 225)',
                padding: '12px',
                paddingTop: '0px',
                borderRadius: '12px',
                fontSize: '20px',
                position: 'relative',
              }}
            >
              {index === 0 && (
                <>
                  <img
                    src={hands}
                    alt="hands in the air"
                    style={{
                      width: '140px',
                      position: 'absolute',
                      transform: 'translate(0px, -126px)',
                      left: '18px',
                      top: '0',
                    }}
                  />
                  <img
                    src={hands}
                    alt="hands in the air"
                    style={{
                      width: '140px',
                      position: 'absolute',
                      transform: 'translate(0px, -126px)',
                      right: '18px',
                      top: '0',
                    }}
                  />
                </>
              )}

              <h3 style={{ marginBottom: 8 }}>
                <Markdown>{faq.title}</Markdown>
              </h3>

              <div style={{ paddingLeft: 12 }}>
                <Markdown>{faq.content}</Markdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
