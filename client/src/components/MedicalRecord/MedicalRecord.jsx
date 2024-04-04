import React, { useState } from "react";
import axios from "axios";

const MedicalRecord = () => {
  const [recordName, setRecordName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

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

  return (
    <div className="bg-gray-100 p-2 sm:p-4 lg:p-6 xl:p-12">
      <div className="mt-2 h-screen">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-3 bg-white rounded-xl shadow-md">
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
    </div>
  );
};

export default MedicalRecord;
