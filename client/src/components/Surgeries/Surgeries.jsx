import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSurgery } from "../../features/auth/userPatient/userPatientSlice";

function Surgeries() {
  const [newSurgery, setNewSurgery] = useState("");

  const surgeries = useSelector((state) => state.patient?.user?.data?.surgeries);

  console.log("surgeries", surgeries);

  const dispatch = useDispatch();

  const handleAllergy = (e) => {
    e.preventDefault();
    dispatch(addSurgery(newSurgery));
    setNewSurgery("");
  };

  console.log("newSurgery", newSurgery);
  return (
    <div>
      <form
        className="my-3 mx-auto flex w-full items-center space-x-2 md:w-1/3"
        onSubmit={handleAllergy}
      >
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          value={newSurgery}
          onChange={(e) => setNewSurgery(e.target.value)}
          placeholder="surgery name"
        ></input>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Add
        </button>
      </form>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
        {surgeries &&
          surgeries.map((surgery, index) => (
            <li
              key={index}
              className="border border-black/30 p-2 rounded-md flex items-center justify-between"
            >
              <span>{surgery}</span>
              <div>
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Surgeries;
