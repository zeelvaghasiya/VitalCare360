import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChronicdisease } from "../../features/userPatient/userPatientSlice";

function ChronicDisease() {
  const [newChronicDisease, setNewChronicDisease] = useState("");

  const chronicDisease = useSelector((state) => state.patient?.user?.data?.chronicDisease);

  console.log("chronicDisease", chronicDisease);

  const dispatch = useDispatch();

  const handleChronicDisease = (e) => {
    e.preventDefault();
    dispatch(addChronicdisease(newChronicDisease));
    setNewChronicDisease("");
  };

  console.log("newChronicDisease", newChronicDisease);
  return (
    <div>
      <form
        className="my-3 mx-auto flex w-full items-center space-x-2 md:w-1/3"
        onSubmit={handleChronicDisease}
      >
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          value={newChronicDisease}
          onChange={(e) => setNewChronicDisease(e.target.value)}
          placeholder="chronic disease name"
        ></input>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Add
        </button>
      </form>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
        {chronicDisease &&
          chronicDisease.map((cDisease, index) => (
            <li
              key={index}
              className="border border-black/30 p-2 rounded-md flex items-center justify-between"
            >
              <span>{cDisease}</span>
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

export default ChronicDisease;
