import React from "react";

function ImageModal({ imageUrl, recordName, description, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-55 z-50">
      <div className="bg-white rounded-md shadow-lg max-w-3xl overflow-y-auto max-h-screen">
        <img
          src={imageUrl}
          alt={recordName}
          className="w-full object-cover rounded-t-md max-h-screen"
        />{" "}
        {/* Set fixed height */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mt-4">{recordName}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full mx-auto bg-black px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ImageModal;
