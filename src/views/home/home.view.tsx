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
        {homeData.map((data: any) => (
          <div style={{ marginBottom: 40 }} key={data.section}>
            {data.sectionTitle && <h3>{data.sectionTitle}</h3>}
            {data.content && (
              <div style={{ textTransform: 'capitalize', marginBottom: 50 }}>
                <Markdown>{data.content || ''}</Markdown>
              </div>
            )}

            {data.image && (
              <img
                src={data.image}
                style={{ maxWidth: '100%' }}
                alt="a nurse with a patient"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
