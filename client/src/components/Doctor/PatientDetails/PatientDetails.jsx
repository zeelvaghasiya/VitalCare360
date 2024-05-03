import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageModal from "../../ImageModal/ImageModal.jsx"; // Make sure to import ImageModal if needed

function PatientDetails() {
  const [patientName, setPatientName] = useState("");
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalRecordName, setModalRecordName] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const handleSearch = async () => {
    try {
      const encodedFullName = encodeURIComponent(patientName);
      const response = await axios.get(
        `/api/v1/doctors/past-records?fullName=${encodedFullName}`
      );
      setReports(response.data.data.pastMedicalRecords);
    } catch (error) {
      alert("Patient not found");
      setReports([]);
    }
  };

  const handleRecordClick = (report) => {
    setShowModal(true);
    setModalImageUrl(report.recordUrl);
    setModalRecordName(report.recordName);
    setModalDescription(report.description);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImageUrl("");
    setModalRecordName("");
    setModalDescription("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="my-8 p-4 shadow-lg max-w-lg mx-auto flex items-center">
                <input
                    type="text"
                    placeholder="Enter patient name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="p-2 rounded border border-gray-300 mr-2 flex-grow"
                />
                <button
                    onClick={handleSearch}
                    className="w-24 rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Search
                </button>
            </div>
      <hr className="my-4 w-4/5 border-t-2 border-gray-300" />
      <div className="mx-auto max-w-screen-lg">
        {reports.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {reports.map((report, index) => (
              <div
                key={index}
                onClick={() => handleRecordClick(report)}
                className="bg-white p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg transition duration-300"
              >
                <img
                  src={report.recordUrl}
                  alt={report.recordName}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold">{report.recordName}</h3>
                <p className="text-sm text-gray-500">{report.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No reports found.</p>
        )}
      </div>
      {showModal && (
        <ImageModal
          imageUrl={modalImageUrl}
          recordName={modalRecordName}
          description={modalDescription}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default PatientDetails;
