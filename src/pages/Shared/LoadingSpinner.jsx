import { ScaleLoader } from "react-spinners";

const LoadingSpinner = ({ color = "#4f46e5", size = 150 }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 rounded-3xl shadow-2xl  flex flex-col items-center">
        <ScaleLoader
          color={color}
          height={50}
          width={10}
          radius={5}
          margin={8}
          speedMultiplier={1.5}
        />
        <p className="mt-6 text-gray-700 font-semibold text-lg animate-pulse ">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
