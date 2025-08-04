import React from "react";

const Loader = ({ text = "Loading" }: { text?: string }) => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="flex flex-col items-center space-y-4 animate-fadeIn">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg font-medium text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
