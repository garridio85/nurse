import { useEffect, useState } from 'react';
import Papa from 'papaparse';

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
      <div>
        <h1>FAQs</h1>

        {faqData.map((faq: any) => (
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ textTransform: 'capitalize', marginBottom: 8 }}>
              {faq.title}
            </h3>
            <div style={{ textTransform: 'capitalize', paddingLeft: 12 }}>
              {faq.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
