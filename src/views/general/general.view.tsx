import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Markdown from 'markdown-to-jsx';
import iLoader from '../../assets/iloader.gif';

export const General = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generalData, setGeneralData] = useState<any>([]);

  const getGeneralData = () => {
    setIsLoading(true);
    async function getDataFromGoogleSheet() {
      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/1VOKKrPjtdc7bmFO5ZVBhQ0bWznQ5ArE3Vc6fEKy5Lps/gviz/tq?tqx=out:csv',
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
        setGeneralData(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getGeneralData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: 1220, margin: 'auto', padding: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={iLoader}
          alt="an animated i"
          style={{ width: 60, height: 60 }}
        />
      </div>

      <h1>But What is Incentive Spirometry?</h1>
      <div>
        {generalData.map((data: any, index: number) => (
          <div style={{ marginBottom: 40 }} key={data.section}>
            {data.title && <h3>{data.title}</h3>}
            {data.information && (
              <div style={{ marginBottom: 50 }}>
                <Markdown>{data.information || ''}</Markdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
