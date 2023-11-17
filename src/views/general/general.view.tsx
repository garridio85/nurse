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

  const addLinkToReference = (text: string) => {
    const regex = /\[(\d+)\]/g;
    const replacedText = text.replace(
      regex,
      '<a className="reference-link" href="#reference">[$1]</a>',
    );
    return replacedText;
  };

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
            {data.title && (
              <h3>
                <Markdown>{addLinkToReference(data.title)}</Markdown>
              </h3>
            )}
            {data.information && (
              <div className="information" style={{ marginBottom: 50 }}>
                <Markdown>
                  {addLinkToReference(data.information || '')}
                </Markdown>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ borderTop: 'solid 1px grey', marginTop: 190 }}>
        <ol
          style={{
            fontSize: 12,
            color: '#4a4a4a',
            marginLeft: 0,
            marginTop: 50,
          }}
          id="reference"
        >
          <li style={{ marginBottom: 8 }}>
            Chang, P.-C., Chen, P.-H., Chang, T.-H., Chen, K.-H., Jhou, H.-J.,
            Chou, S.-H., & Chang, T.-W. (2023). Incentive spirometry is an
            effective strategy to improve the quality of postoperative care in
            patients. Asian Journal of Surgery, 46(9), 3397–3404.
            https://doi.org/10.1016/j.asjsur.2022.11.030
          </li>

          <li style={{ marginBottom: 8 }}>
            Su, H., Zhang, J., Liu, Y., Peng, H., & Zhang, L. (2022). Pre and
            postoperative nurse-guided incentive spirometry versus
            physiotherapist-guided pre and postoperative breathing exercises in
            patients undergoing cardiac surgery: An evaluation of postoperative
            complications and length of hospital stay. Medicine (Baltimore),
            101(52), e32443–e32443. https://doi.org/10.1097/MD.0000000000032443
          </li>

          <li style={{ marginBottom: 8 }}>
            Restrepo, R. D., Wettstein, R., Wittnebel, L., & Tracy, M. (2011).
            Incentive Spirometry: 2011. Respiratory Care, 56(10), 1600–1604.
            https://doi.org/10.4187/respcare.01471
          </li>

          <li style={{ marginBottom: 8 }}>
            Cassidy, M.R., Rosenkranz, P., McCabe, K., Rosen, J.E., McAneny, D.
            (2013). I COUGH: Reducing postoperative pulmonary complications with
            a multidisciplinary patient care program. JAMA Surg, 148(8),
            740-745.
          </li>

          <li style={{ marginBottom: 8 }}>
            Franklin, E. & Anjum, F. (2023). Incentive spirometer and
            inspiratory muscle training. Treasure Island (FL): StatPearls
            Publishing. Available from:
            https://www.ncbi.nlm.nih.gov/books/NBK572114/
          </li>

          <li style={{ marginBottom: 8 }}>
            Eltorai, A. E. M., Baird, G. L., Eltorai, A. S., Pangborn, J.,
            Antoci, V., Cullen, H. A., Paquette, K., Connors, K., Barbaria, J.,
            Smeals, K. J., Agarwal, S., Healey, T. T., Ventetuolo, C. E.,
            Sellke, F. W., & Daniels, A. H. (2018). Perspectives on Incentive
            Spirometry Utility and Patient Protocols. Respiratory Care, 63(5),
            519+.
            https://link-gale-com.proxy1.lib.trentu.ca/apps/doc/A540541070/AONE?u=ocul_thomas&sid=bookmark-AONE&xid=4de81fe7
          </li>

          <li style={{ marginBottom: 8 }}>
            Gaudin, A., Jackson, R., Quinlan, P., & George, M. (2023). Spine
            Surgery Patients’ Perceptions of Postoperative Pulmonary
            Complications. Clinical Nursing Research, 32(4), 797–804.
            https://doi.org/10.1177/10547738221149455
          </li>

          <li style={{ marginBottom: 8 }}>
            Kenny, J.-E. S., & Kuschner, W. G. (2013). Pneumothorax caused by
            aggressive use of an incentive spirometer in a patient with
            emphysema. Respiratory Care, 58(7), e77–e79.
            https://doi.org/10.4187/respcare.02130
          </li>
        </ol>
      </div>
    </div>
  );
};
