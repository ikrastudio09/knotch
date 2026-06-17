"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  LogOut,
  Save,
  X,
  Home,
  Building2,
  Globe,
  Plus,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    PinCode: "",
    Country: "",
  });
  const [profileData, setProfileData] = useState({
    userName: "",
    userEmail: "",
    userNumber: "",
    userAddress: [
      {
        AddressLine1: "",
        AddressLine2: "",
        City: "",
        State: "",
        PinCode: "",
        Country: "",
      },
    ],
    signUpDate: "",
    cartData: [],
    userRole: "user",
    authProvider: "local",
  });

  const [editedData, setEditedData] = useState({ ...profileData });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        if (!data.user) {
          console.error("No user returned:", data);
          return;
        }
        const user = {
          userName: data.user.userName || "",
          userEmail: data.user.userEmail || "",
          userNumber: data.user.userNumber || "",
          signUpDate: data.user.signUpDate || "",
          userAddress:
            data.user.userAddress?.length > 0
              ? data.user.userAddress
              : [
                  {
                    AddressLine1: "",
                    AddressLine2: "",
                    City: "",
                    State: "",
                    PinCode: "",
                    Country: "",
                  },
                ],
          cartData: data.user.cartData || [],
        };
        setProfileData(user);
        setEditedData(user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...profileData });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProfileData(data.user);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed");
    }
  };

  const handleCancel = () => {
    setEditedData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (index, field, value) => {
    setEditedData((prev) => {
      const updatedAddress = [...prev.userAddress];
      if (!updatedAddress[index]) updatedAddress[index] = {};
      updatedAddress[index] = { ...updatedAddress[index], [field]: value };
      return { ...prev, userAddress: updatedAddress };
    });
  };

  const handleAddAddress = async () => {
    const updated = [...profileData.userAddress, newAddress];
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profileData, userAddress: updated }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProfileData(data.user);
      setEditedData(data.user);
      setNewAddress({
        AddressLine1: "",
        AddressLine2: "",
        City: "",
        State: "",
        PinCode: "",
        Country: "",
      });
      setShowAddAddress(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAddress = async (index) => {
    const updated = profileData.userAddress.filter((_, i) => i !== index);
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profileData, userAddress: updated }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProfileData(data.user);
      setEditedData(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/Login";
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="bg-black text-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl md:text-5xl font-bold border-4 border-white font-nunito">
                  {profileData.userName?.charAt(0)}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 font-nunito">
                  {profileData.userName}
                </h1>
                <p className="text-gray-400 mb-4 font-nunito">{profileData.userEmail}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="bg-gray-800 px-4 py-2 rounded-lg">
                    <p className="text-xs text-gray-400 font-nunito">Member Since</p>
                    <p className="text-sm font-semibold font-inter">
                      {profileData.signUpDate
                        ? new Date(profileData.signUpDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-800 px-4 py-2 rounded-lg">
                    <p className="text-xs text-gray-400 font-nunito">Saved Addresses</p>
                    <p className="text-sm font-semibold font-inter">
                      {profileData.userAddress?.length || 0}
                    </p>
                  </div>
                  <div className="bg-gray-800 px-4 py-2 rounded-lg">
                    <p className="text-xs text-gray-400 font-nunito">Cart Items</p>
                    <p className="text-sm font-semibold font-inter">
                      {profileData.cartData?.length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {!isEditing ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="hidden sm:inline font-nunito">Edit Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline font-nunito">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 font-nunito"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700 font-nunito"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800 font-nunito">
                <User className="w-5 h-5" />
                Personal Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.userName}
                      onChange={(e) =>
                        handleInputChange("userName", e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">
                        {profileData.userName}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.userEmail}
                      onChange={(e) =>
                        handleInputChange("userEmail", e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">
                        {profileData.userEmail || ""}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.userNumber}
                      onChange={(e) =>
                        handleInputChange("userNumber", e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">
                        {profileData.userNumber || ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {(isEditing ? editedData : profileData).userAddress?.map(
                (address, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800 font-nunito">
                        <MapPin className="w-5 h-5" />
                        {index === 0
                          ? "Primary Address"
                          : `Address ${index + 1}`}
                      </h2>
                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <span className="text-xs bg-black text-white px-2 py-1 rounded-full font-semibold font-nunito">
                            Primary
                          </span>
                        )}
                        {!isEditing && (
                          <button
                            onClick={() => handleDeleteAddress(index)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                          Street Address
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={
                              editedData.userAddress[index]?.AddressLine1 || ""
                            }
                            onChange={(e) =>
                              handleAddressChange(
                                index,
                                "AddressLine1",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                          />
                        ) : (
                          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                            <Home className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-900">
                              {address.AddressLine1 || "—"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                          City
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedData.userAddress[index]?.City || ""}
                            onChange={(e) =>
                              handleAddressChange(index, "City", e.target.value)
                            }
                            className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                          />
                        ) : (
                          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                            <Building2 className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-900">
                              {address.City || "—"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                            State
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedData.userAddress[index]?.State || ""}
                              onChange={(e) =>
                                handleAddressChange(
                                  index,
                                  "State",
                                  e.target.value,
                                )
                              }
                              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                            />
                          ) : (
                            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                              <span className="font-medium text-sm text-gray-900">
                                {address.State || "—"}
                              </span>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                            Pincode
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={
                                editedData.userAddress[index]?.PinCode || ""
                              }
                              onChange={(e) =>
                                handleAddressChange(
                                  index,
                                  "PinCode",
                                  e.target.value,
                                )
                              }
                              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                            />
                          ) : (
                            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                              <span className="font-medium text-sm text-gray-900">
                                {address.PinCode || "—"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                          Country
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedData.userAddress[index]?.Country || ""}
                            onChange={(e) =>
                              handleAddressChange(
                                index,
                                "Country",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                          />
                        ) : (
                          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                            <Globe className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-900">
                              {address.Country || "—"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ),
              )}

              {!showAddAddress ? (
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="w-full border-2 border-dashed border-black rounded-2xl p-5 flex items-center justify-center gap-2 font-semibold text-gray-700 hover:bg-gray-50 transition-colors font-nunito"
                >
                  <Plus className="w-5 h-5" />
                  Add New Address
                </button>
              ) : (
                <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                      <MapPin className="w-5 h-5" />
                      New Address
                    </h2>
                    <button
                      onClick={() => setShowAddAddress(false)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={newAddress.AddressLine1}
                        onChange={(e) =>
                          setNewAddress((prev) => ({
                            ...prev,
                            AddressLine1: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                        placeholder="123 Main St"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={newAddress.City}
                        onChange={(e) =>
                          setNewAddress((prev) => ({
                            ...prev,
                            City: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                        placeholder="City"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          value={newAddress.State}
                          onChange={(e) =>
                            setNewAddress((prev) => ({
                              ...prev,
                              State: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={newAddress.PinCode}
                          onChange={(e) =>
                            setNewAddress((prev) => ({
                              ...prev,
                              PinCode: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                          placeholder="000000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={newAddress.Country}
                        onChange={(e) =>
                          setNewAddress((prev) => ({
                            ...prev,
                            Country: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                        placeholder="Country"
                      />
                    </div>

                    <button
                      onClick={handleAddAddress}
                      className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Save Address
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 bg-white border-2 border-red-600 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-red-600 mb-2 font-nunito">Danger Zone</h2>
            <p className="text-gray-600 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors font-nunito">
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
