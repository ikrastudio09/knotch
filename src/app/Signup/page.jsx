"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Chrome,
  User,
  Check,
  MapPin,
  Home,
} from "lucide-react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [signupMethod, setSignupMethod] = useState("email"); // 'email' or 'phone'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userNumber: "",
    userPassword: "",
    confirmPassword: "",
    authProvider: "local",
    userAddress: {
      AddressLine1: "",
      AddressLine2: "",
      City: "",
      State: "",
      PinCode: "",
      Country: "India",
    },
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error on input change

    // Calculate password strength
    if (field === "userPassword") {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
      if (/\d/.test(value)) strength++;
      if (/[^a-zA-Z\d]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      userAddress: {
        ...prev.userAddress,
        [field]: value,
      },
    }));
    setError("");
  };

  const validateForm = () => {
    // Validate name
    if (!formData.userName || formData.userName.trim().length < 2) {
      setError("Please enter a valid name (minimum 2 characters)");
      return false;
    }

    // Validate email or phone based on signup method
    if (signupMethod === "email") {
      if (
        !formData.userEmail ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)
      ) {
        setError("Please enter a valid email address");
        return false;
      }
    } else {
      if (
        !formData.userNumber ||
        !/^\+?[\d\s-()]{10,}$/.test(formData.userNumber)
      ) {
        setError("Please enter a valid phone number");
        return false;
      }
    }

    // Validate password (minimum 8 characters as per schema)
    if (!formData.userPassword || formData.userPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    // Check password match
    if (formData.userPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Validate address fields
    if (
      !formData.userAddress.AddressLine1 ||
      formData.userAddress.AddressLine1.trim().length < 3
    ) {
      setError("Please enter a valid address line 1");
      return false;
    }

    if (
      !formData.userAddress.City ||
      formData.userAddress.City.trim().length < 2
    ) {
      setError("Please enter a valid city");
      return false;
    }

    if (
      !formData.userAddress.State ||
      formData.userAddress.State.trim().length < 2
    ) {
      setError("Please enter a valid state");
      return false;
    }

    if (
      !formData.userAddress.PinCode ||
      !/^\d{6}$/.test(formData.userAddress.PinCode)
    ) {
      setError("Please enter a valid 6-digit pincode");
      return false;
    }

    // Check terms agreement
    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare data according to schema
      const signupData = {
        userName: formData.userName.trim(),
        userEmail:
          signupMethod === "email" ? formData.userEmail.toLowerCase() : "",
        userNumber: signupMethod === "phone" ? formData.userNumber : "",
        userPassword: formData.userPassword,
        authProvider: "local",
        userAddress: [
          {
            AddressLine1: formData.userAddress.AddressLine1.trim(),
            AddressLine2: formData.userAddress.AddressLine2.trim(),
            City: formData.userAddress.City.trim(),
            State: formData.userAddress.State.trim(),
            PinCode: formData.userAddress.PinCode.trim(),
            Country: formData.userAddress.Country,
          },
        ],
      };

      // Make sure at least email or phone is provided
      if (signupMethod === "phone" && !signupData.userEmail) {
        // If signing up with phone, you might want to ask for email later
        // or make email optional in your backend
        signupData.userEmail = `${signupData.userNumber}@temp.com`; // Temporary email
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success! Redirect to login or dashboard
        window.location.href = "/Login";
        toast.success("Account created successfully!");
      } else {
        const msg = data.message || "Signup failed. Please try again.";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      console.error("Signup error:", err);
      const msg = "An error occurred. Please try again later.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      // Redirect to Google OAuth
      // This should be configured in your backend
      window.location.href = "/api/auth/google";
    } catch (err) {
      console.error("Google signup error:", err);
      setError("Google signup failed. Please try again.");
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center p-6 py-14"
      style={{ fontFamily: "'Nexa', 'Helvetica Neue', Arial, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

        * { box-sizing: border-box; }

        .font-nunito { font-family: 'Nunito', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }

        .ka-input {
          width: 100%;
          padding: 13px 16px 13px 46px;
          border: 1.5px solid #BFC3C7;
          border-radius: 6px;
          font-family: 'inter', 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #000;
          background: #fff;
          outline: none;
          transition: border-color 0.2s ease;
          letter-spacing: 0.02em;
        }
        .ka-input-bare {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #BFC3C7;
          border-radius: 6px;
          font-family: 'inter', 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #000;
          background: #fff;
          outline: none;
          transition: border-color 0.2s ease;
          letter-spacing: 0.02em;
        }
        .ka-input::placeholder,
        .ka-input-bare::placeholder { color: #8A8A8A; font-weight: 300; }
        .ka-input:focus, .ka-input-bare:focus { border-color: #000; }
        .ka-input:disabled, .ka-input-bare:disabled { background: #f7f7f7; color: #8A8A8A; }
        .ka-input-bare.bg-muted { background: #f4f4f4; color: #8A8A8A; }

        .ka-input-pw { padding-right: 46px; }

        .ka-label {
          display: block;
          font-family: 'nunito', 'Helvetica Neue', Arial, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #2B2B2B;
          margin-bottom: 7px;
        }

        .ka-label-opt {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.08em;
          color: #8A8A8A;
          text-transform: none;
          margin-left: 5px;
        }

        .ka-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 15px;
          color: #8A8A8A;
          pointer-events: none;
        }

        .ka-toggle {
          flex: 1;
          padding: 10px 0;
          border-radius: 4px;
          font-family: 'nunito', 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #8A8A8A;
        }
        .ka-toggle.active { background: #000; color: #fff; }
        .ka-toggle:not(.active):hover { color: #2B2B2B; }

        .ka-btn-primary {
          width: 100%;
          padding: 15px;
          background: #000;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-family: 'Nexa', 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
        }
        .ka-btn-primary:hover:not(:disabled) { background: #2B2B2B; }
        .ka-btn-primary:active:not(:disabled) { transform: scale(0.995); }
        .ka-btn-primary:disabled { background: #BFC3C7; cursor: not-allowed; }

        .ka-btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 20px;
          background: #fff;
          border: 1.5px solid #000;
          border-radius: 6px;
          font-family: 'Nexa', 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #000;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .ka-btn-google:hover { background: #f7f7f7; }

        .ka-divider { width: 100%; height: 1px; background: #BFC3C7; }
        .ka-divider-text {
          padding: 0 14px;
          font-family: 'Nexa', 'Helvetica Neue', Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #8A8A8A;
          white-space: nowrap;
          text-transform: uppercase;
        }

        .ka-error {
          background: #fff;
          border: 1.5px solid #000;
          border-left: 3px solid #000;
          border-radius: 4px;
          padding: 11px 14px;
        }

        .ka-section-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 8px 0 4px;
        }
        .ka-section-line { flex: 1; height: 1px; background: #BFC3C7; }
        .ka-section-label {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #000;
          white-space: nowrap;
        }

        .ka-strength-bar {
          height: 2px;
          flex: 1;
          border-radius: 2px;
          transition: background 0.3s ease;
        }

        .ka-checkbox {
          width: 18px;
          height: 18px;
          border-radius: 3px;
          border: 1.5px solid #BFC3C7;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .ka-checkbox.checked { background: #000; border-color: #000; }
        .ka-checkbox:hover:not(.checked) { border-color: #000; }

        .ka-link {
          font-weight: 700;
          color: #000;
          text-decoration: none;
          border-bottom: 1px solid #000;
          padding-bottom: 1px;
        }
        .ka-link:hover { border-bottom-color: transparent; }

        .ka-pw-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #8A8A8A;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .ka-pw-toggle:hover { color: #2B2B2B; }

        .ka-logo-mark {
          width: 50px;
          height: 50px;
          background: #000;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .ka-card {
          border: 1.5px solid #000;
          border-radius: 10px;
          background: #fff;
          padding: 36px 32px;
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: "440px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h1
            className="font-nunito"
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#000",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              marginBottom: "8px",
            }}
          >
            Create Account
          </h1>
          <p
            className="font-inter"
            style={{
              fontSize: "13px",
              fontWeight: 300,
              color: "#8A8A8A",
              letterSpacing: "0.03em",
            }}
          >
            Join KeptAlive today
          </p>
        </div>

        {/* Card */}
        <div className="ka-card">
          {/* Google */}
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await fetch("/api/auth/google", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    token: credentialResponse.credential,
                  }),
                });

                const data = await res.json();

                if (res.ok) {
                  toast.success("Signed up successfully");
                  window.location.href = "/";
                } else {
                  toast.error(data.message);
                }
              } catch (err) {
                console.error(err);
                toast.error("Google signup failed");
              }
            }}
            onError={() => toast.error("Google signup failed")}
          />

          {/* Divider */}
          <div
            style={{ display: "flex", alignItems: "center", margin: "22px 0" }}
          >
            <div className="ka-divider" />
            <span className="ka-divider-text">or</span>
            <div className="ka-divider" />
          </div>

          {/* Toggle */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              background: "#f4f4f4",
              padding: "4px",
              borderRadius: "6px",
              marginBottom: "24px",
            }}
          >
            <button
              onClick={() => setSignupMethod("email")}
              className={`ka-toggle ${signupMethod === "email" ? "active" : ""}`}
            >
              Email
            </button>
            <button
              onClick={() => setSignupMethod("phone")}
              className={`ka-toggle ${signupMethod === "phone" ? "active" : ""}`}
            >
              Phone
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSignup}
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {/* Error */}
            {error && (
              <div className="ka-error">
                <p
                  className="font-nexa"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#000",
                    letterSpacing: "0.02em",
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="ka-label">Full Name</label>
              <div style={{ position: "relative" }}>
                <User className="ka-icon" />
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) =>
                    handleInputChange("userName", e.target.value)
                  }
                  placeholder="Your full name"
                  className="ka-input"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email / Phone */}
            {signupMethod === "email" ? (
              <div>
                <label className="ka-label">Email Address</label>
                <div style={{ position: "relative" }}>
                  <Mail className="ka-icon" />
                  <input
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) =>
                      handleInputChange("userEmail", e.target.value)
                    }
                    placeholder="your.email@example.com"
                    className="ka-input"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="ka-label">Phone Number</label>
                <div style={{ position: "relative" }}>
                  <Phone className="ka-icon" />
                  <input
                    type="tel"
                    value={formData.userNumber}
                    onChange={(e) =>
                      handleInputChange("userNumber", e.target.value)
                    }
                    placeholder="+91 98765 43210"
                    className="ka-input"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="ka-label">Password</label>
              <div style={{ position: "relative" }}>
                <Lock className="ka-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.userPassword}
                  onChange={(e) =>
                    handleInputChange("userPassword", e.target.value)
                  }
                  placeholder="Min. 8 characters"
                  className="ka-input ka-input-pw"
                  required
                  disabled={loading}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ka-pw-toggle"
                  disabled={loading}
                >
                  {showPassword ? (
                    <Eye style={{ width: "15px", height: "15px" }} />
                  ) : (
                    <EyeOff style={{ width: "15px", height: "15px" }} />
                  )}
                </button>
              </div>
              {formData.userPassword && (
                <div style={{ marginTop: "8px" }}>
                  <div
                    style={{ display: "flex", gap: "4px", marginBottom: "5px" }}
                  >
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className="ka-strength-bar"
                        style={{
                          background:
                            level <= passwordStrength ? "#000" : "#BFC3C7",
                        }}
                      />
                    ))}
                  </div>
                  {passwordStrength > 0 && (
                    <p
                      className="font-nexa"
                      style={{
                        fontSize: "10px",
                        fontWeight: 300,
                        color: "#8A8A8A",
                        letterSpacing: "0.05em",
                        margin: 0,
                      }}
                    >
                      Strength:{" "}
                      <span style={{ fontWeight: 700, color: "#000" }}>
                        {getPasswordStrengthText()}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="ka-label">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <Lock className="ka-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  placeholder="Re-enter your password"
                  className="ka-input ka-input-pw"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="ka-pw-toggle"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <Eye style={{ width: "15px", height: "15px" }} />
                  ) : (
                    <EyeOff style={{ width: "15px", height: "15px" }} />
                  )}
                </button>
              </div>
              {formData.confirmPassword &&
                formData.userPassword !== formData.confirmPassword && (
                  <p
                    className="font-nexa"
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#000",
                      letterSpacing: "0.04em",
                      marginTop: "5px",
                    }}
                  >
                    Passwords do not match
                  </p>
                )}
            </div>

            {/* Address Section */}
            <div className="ka-section-divider">
              <div className="ka-section-line" />
              <span className="ka-section-label">Delivery Address</span>
              <div className="ka-section-line" />
            </div>

            {/* Address Line 1 */}
            <div>
              <label className="ka-label">Address Line 1</label>
              <input
                type="text"
                value={formData.userAddress.AddressLine1}
                onChange={(e) =>
                  handleAddressChange("AddressLine1", e.target.value)
                }
                placeholder="House / Flat No., Building Name"
                className="ka-input-bare"
                required
                disabled={loading}
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="ka-label">
                Address Line 2 <span className="ka-label-opt">Optional</span>
              </label>
              <input
                type="text"
                value={formData.userAddress.AddressLine2}
                onChange={(e) =>
                  handleAddressChange("AddressLine2", e.target.value)
                }
                placeholder="Street, Area, Landmark"
                className="ka-input-bare"
                disabled={loading}
              />
            </div>

            {/* City + State */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <label className="ka-label">City</label>
                <input
                  type="text"
                  value={formData.userAddress.City}
                  onChange={(e) => handleAddressChange("City", e.target.value)}
                  placeholder="Mumbai"
                  className="ka-input-bare"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="ka-label">State</label>
                <input
                  type="text"
                  value={formData.userAddress.State}
                  onChange={(e) => handleAddressChange("State", e.target.value)}
                  placeholder="Maharashtra"
                  className="ka-input-bare"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Pincode + Country */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <label className="ka-label">Pincode</label>
                <input
                  type="text"
                  value={formData.userAddress.PinCode}
                  onChange={(e) =>
                    handleAddressChange("PinCode", e.target.value)
                  }
                  placeholder="400001"
                  maxLength={6}
                  className="ka-input-bare"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="ka-label">Country</label>
                <input
                  type="text"
                  value={formData.userAddress.Country}
                  onChange={(e) =>
                    handleAddressChange("Country", e.target.value)
                  }
                  className="ka-input-bare bg-muted"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Terms */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                paddingTop: "4px",
              }}
            >
              <button
                type="button"
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className={`ka-checkbox ${agreedToTerms ? "checked" : ""}`}
              >
                {agreedToTerms && (
                  <Check
                    style={{ width: "11px", height: "11px", color: "#fff" }}
                  />
                )}
              </button>
              <p
                className="font-nexa"
                style={{
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "#8A8A8A",
                  letterSpacing: "0.02em",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                I agree to KeptAlive's{" "}
                <a href="#" className="ka-link" style={{ fontSize: "12px" }}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="ka-link" style={{ fontSize: "12px" }}>
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="ka-btn-primary"
              style={{ marginTop: "4px" }}
            >
              {loading ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <svg
                    className="spin"
                    style={{ width: "15px", height: "15px" }}
                    viewBox="0 0 24 24"
                  >
                    <circle
                      style={{ opacity: 0.25 }}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      style={{ opacity: 0.75 }}
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <p
            className="font-nexa"
            style={{
              fontSize: "13px",
              fontWeight: 300,
              color: "#8A8A8A",
              letterSpacing: "0.02em",
            }}
          >
            Already have an account?{" "}
            <a href="/Login" className="ka-link" style={{ fontSize: "13px" }}>
              Sign In
            </a>
          </p>
        </div>

        {/* Terms Fine Print */}
        <div style={{ textAlign: "center", marginTop: "18px" }}>
          <p
            className="font-nexa"
            style={{
              fontSize: "10px",
              fontWeight: 300,
              color: "#BFC3C7",
              letterSpacing: "0.05em",
              lineHeight: 1.7,
            }}
          >
            By continuing, you agree to KeptAlive's{" "}
            <a
              href="#"
              style={{ color: "#8A8A8A", textDecoration: "underline" }}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              style={{ color: "#8A8A8A", textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
