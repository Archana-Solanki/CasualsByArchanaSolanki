import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    userName: "",
    userEmail: "",
    userNumber: "",
    userAddress: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/profile`, {
          withCredentials: true
        });
        const user = res.data && res.data.user ? res.data.user : res.data;
        setUserData({
          userName: user.userName || "",
          userEmail: user.userEmail || "",
          userNumber: user.userNumber || "",
          userAddress: user.userAddress || "",
          avatar:
            user.avatar ||
            "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(user.userName || "User"),
          joinDate:
            user.joinDate ||
            (user.signUpDate ? new Date(user.signUpDate).toLocaleDateString() : ""),
        });
        setEditData({
          userName: user.userName || "",
          userEmail: user.userEmail || "",
          userNumber: user.userNumber || "",
          userAddress: user.userAddress || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please login again.");
        } else {
          alert("Failed to fetch profile. Please try again later.");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Optionally notify backend to clear the cookie
      await axios.post(`${apiUrl}/user/logout`, {}, { withCredentials: true });
      localStorage.removeItem(cartData);

      // Redirect to login
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${apiUrl}/update`,
        editData,
        {
          withCredentials: true
        }
      );
      alert("Profile updated successfully!");
      setUserData((prev) => ({
        ...prev,
        ...editData,
      }));
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  const ProfileDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6 pb-6 border-b border-gray-300 pt-2">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img
            src={userData.avatar || "https://ui-avatars.com/api/?name=User"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-black">
            {userData.userName || "User"}
          </h2>
          <p className="text-gray-600">Member since {userData.joinDate || "-"}</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Mail className="w-5 h-5 text-gray-600" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Email</p>
            {isEditing ? (
              <input
                type="text"
                className="w-full bg-white border border-gray-300 px-3 py-2 rounded mt-1"
                value={editData.userEmail}
                onChange={(e) =>
                  setEditData({ ...editData, userEmail: e.target.value })
                }
              />
            ) : (
              <p className="text-black font-medium">
                {userData.userEmail || "-"}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Phone className="w-5 h-5 text-gray-600" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Phone</p>
            {isEditing ? (
              <input
                type="text"
                className="w-full bg-white border border-gray-300 px-3 py-2 rounded mt-1"
                value={editData.userNumber}
                onChange={(e) =>
                  setEditData({ ...editData, userNumber: e.target.value })
                }
              />
            ) : (
              <p className="text-black font-medium">
                {userData.userNumber || "-"}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <MapPin className="w-5 h-5 text-gray-600" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Address</p>
            {isEditing ? (
              <input
                type="text"
                className="w-full bg-white border border-gray-300 px-3 py-2 rounded mt-1"
                value={editData.userAddress}
                onChange={(e) =>
                  setEditData({ ...editData, userAddress: e.target.value })
                }
              />
            ) : (
              <p className="text-black font-medium">
                {userData.userAddress || "-"}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Calendar className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="text-black font-medium">{userData.joinDate || "-"}</p>
          </div>
        </div>
      </div>

      <div className="pt-6 flex flex-col gap-3">
        {isEditing ? (
          <>
            <button
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button
              className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg hover:bg-gray-500 transition-colors"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
        <button
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-6">
          <div className="pt-20">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {userData ? (
                <ProfileDetails />
              ) : (
                <div className="text-center py-10">Loading profile...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
