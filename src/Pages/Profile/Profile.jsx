// import React, { useState } from "react";
// import { Edit2 } from "lucide-react"; // for edit icon

// const Profile= () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState("Keerthi");
//   const [email, setEmail] = useState("keerthi@example.com");
//   const [phone, setPhone] = useState("123-456-7890");
//   const [bio, setBio] = useState("Creative designer and developer.");

//   const handleEdit = () => setIsEditing(!isEditing);

//   const handleSave = () => {
//     setIsEditing(false);
//     // Here, you can add code to save the updated data to Firebase
//   };

//   return (
//     <div className="flex justify-center p-6 bg-gray-100 h-screen">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <div className="flex justify-center mb-6">
//           <img
//             src="https://via.placeholder.com/100" // Profile picture placeholder
//             alt="Profile"
//             className="rounded-full w-24 h-24 object-cover"
//           />
//         </div>
        
//         <div className="text-center mb-4">
//           <h2 className="text-xl font-semibold">{name}</h2>
//           <p className="text-gray-600">@{name.toLowerCase()}</p>
//         </div>

//         <div className="space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={!isEditing}
//               className="w-full p-2 mt-1 border rounded-lg"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium">Phone</label>
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               disabled={!isEditing}
//               className="w-full p-2 mt-1 border rounded-lg"
//             />
//           </div>

//           {/* Bio */}
//           <div>
//             <label className="block text-sm font-medium">Bio</label>
//             <textarea
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               disabled={!isEditing}
//               className="w-full p-2 mt-1 border rounded-lg h-24"
//             />
//           </div>

//           {/* Edit or Save button */}
//           <div className="flex justify-end mt-6">
//             <button
//               onClick={handleEdit}
//               className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
//             >
//               {isEditing ? "Save" : "Edit"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



// import React, { useState } from "react";
// import { Edit2 } from "lucide-react"; // for edit icon

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState("Keerthi");
//   const [email, setEmail] = useState("keerthi@example.com");
//   const [phone, setPhone] = useState("123-456-7890");
//   const [bio, setBio] = useState("Creative designer and developer.");

//   const handleEdit = () => setIsEditing(true);

//   const handleSave = () => {
//     setIsEditing(false);
//     // TODO: Add code to save updated data to backend/Firebase here
//   };

//   return (
//     <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <div className="flex justify-center mb-6">
//           <img
//             src="https://via.placeholder.com/100" // Profile picture placeholder
//             alt="Profile"
//             className="rounded-full w-24 h-24 object-cover"
//           />
//         </div>

//         <div className="text-center mb-4">
//           <h2 className="text-xl font-semibold">{name}</h2>
//           <p className="text-gray-600">@{name.toLowerCase()}</p>
//         </div>

//         <div className="space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={!isEditing}
//               className={`w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                 !isEditing ? "cursor-not-allowed bg-gray-100" : ""
//               }`}
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium">Phone</label>
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               disabled={!isEditing}
//               className={`w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                 !isEditing ? "cursor-not-allowed bg-gray-100" : ""
//               }`}
//             />
//           </div>

//           {/* Bio */}
//           <div>
//             <label className="block text-sm font-medium">Bio</label>
//             <textarea
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               disabled={!isEditing}
//               className={`w-full p-2 mt-1 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                 !isEditing ? "cursor-not-allowed bg-gray-100" : ""
//               }`}
//             />
//           </div>

//           {/* Edit or Save button */}
//           <div className="flex justify-end mt-6">
//             <button
//               onClick={isEditing ? handleSave : handleEdit}
//               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
//             >
//               <Edit2 size={16} />
//               {isEditing ? "Save" : "Edit"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    // Fetch profile on mount
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setBio(data.bio);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    // Save to backend
    fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, bio }),
    })
      .then((res) => res.json())
      .then(() => {
        setIsEditing(false);
        alert("Profile updated!");
      })
      .catch(() => alert("Failed to update profile"));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover"
          />
        </div>

        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-600">@{name.toLowerCase()}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className={`w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                !isEditing ? "cursor-not-allowed bg-gray-100" : ""
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
              className={`w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                !isEditing ? "cursor-not-allowed bg-gray-100" : ""
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={!isEditing}
              className={`w-full p-2 mt-1 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                !isEditing ? "cursor-not-allowed bg-gray-100" : ""
              }`}
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              <Edit2 size={16} />
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
