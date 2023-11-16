import nurseVideo from '../../assets/nurse-video.mp4';

export const HowTo = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}
    >
      <h1 style={{ textAlign: 'center' }}>How To video</h1>
      <video className="how-to-video" controls>
        <source src={nurseVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
