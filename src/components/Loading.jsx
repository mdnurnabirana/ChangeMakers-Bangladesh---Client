import { Rings } from "react-loader-spinner";

const Loading = ({ size = 96, wrapperClass = "", wrapperStyle = {} }) => {
  return (
    <div className={`flex justify-center items-center ${wrapperClass}`} style={wrapperStyle}>
      <Rings
        visible={true}
        height={size}
        width={size}
        color="#61ae98" 
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

export default Loading;