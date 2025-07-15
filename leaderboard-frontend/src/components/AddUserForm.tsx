import axios from "axios";
import React, { useState } from "react";

interface Props {
  onUserAdded: () => void;
}

const AddUserForm: React.FC<Props> = ({ onUserAdded }) => {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return;
    const res = await axios.post("http://localhost:5000/api/user" , {name});
    if(res.data.success){
        setName("");
    }
    onUserAdded();
    window.location.reload()
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="p-2 border rounded w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
      />
      <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </div>
  );
};

export default AddUserForm;
