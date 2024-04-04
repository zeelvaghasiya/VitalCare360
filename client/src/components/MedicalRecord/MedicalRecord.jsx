import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageModal from "../ImageModal/ImageModal";

const MedicalRecord = () => {
  const [recordName, setRecordName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalRecordName, setModalRecordName] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle image upload here using image state
      const formData = new FormData();
      console.log("image file", image);
      formData.append("image", image); // Append file to FormData
      formData.append("recordName", recordName);
      formData.append("description", description);

      console.log("formData", formData);

      const res = await axios.post("/api/v1/patients/upload-record", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response", res);
      alert("Medical record added successfully!");
      setRecordName("");
      setDescription("");
      setImage(null);
    } catch (error) {
      alert("Error adding medical record. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch medical records when component mounts
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      const response = await axios.get("/api/v1/patients/medical-records");
      setMedicalRecords(response.data?.data);
      console.log("medi", response.data?.data);
    } catch (error) {
      console.error("Error fetching medical records:", error);
    }
  };

  const handleRecordClick = (record) => {
    setShowModal(true);
    setModalImageUrl(record.recordUrl);
    setModalRecordName(record.recordName);
    setModalDescription(record.description);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImageUrl("");
    setModalRecordName("");
    setModalDescription("");
  };

  return (
    <div className="bg-gray-100 p-2 sm:p-4 lg:p-6 xl:p-12">
      <div className="mt-2">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-3 bg-white rounded-xl shadow-md"
        >
          <div className="mb-4 flex flex-col">
            <input
              type="text"
              placeholder="Record Name"
              value={recordName}
              onChange={(e) => setRecordName(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 mb-2"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 mb-2"
            />
            <input
              type="file"
              onChange={handleImageChange}
              required
              className="w-full border rounded-md px-3 py-2 mb-2"
            />
          </div>
          <button
            type="submit"
            className="rounded-md mx-auto bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add Medical Record
          </button>
        </form>
      </div>
      <div className="mx-auto max-w-screen-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-6">
          {medicalRecords.map((record, index) => (
            <div
              key={index}
              onClick={() => handleRecordClick(record)}
              className="bg-white p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg transition duration-300"
            >
              <img
                src={record.recordUrl}
                alt={record.recordName}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{record.recordName}</h3>
              <p className="text-sm text-gray-500">{record.description}</p>
            </div>
          ))}
        </div>
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
};

export default MedicalRecord;
