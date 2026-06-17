"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Phone, Chrome } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'phone'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userEmail: "",
    userNumber: "",
    userPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error on input change
  };

  const validateForm = () => {
    // Validate email or phone based on login method
    if (loginMethod === "email") {
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

    // Validate password
    if (!formData.userPassword || formData.userPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare login data according to schema
      const loginData = {
        userPassword: formData.userPassword,
      };

      if (loginMethod === "email") {
        loginData.userEmail = formData.userEmail.toLowerCase();
      } else {
        loginData.userNumber = formData.userNumber;
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        window.location.href = "/";
      } else {
        const msg = data.message || "Invalid credentials. Please try again.";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg = "An error occurred. Please try again later.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center p-6"
      style={{ fontFamily: "'Nexa', sans-serif" }}
    >
      {/* Google Fonts + Custom Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        
        * { box-sizing: border-box; }

        .font-seasons { font-family: 'Cormorant Garamond', 'Georgia', serif; }
        .font-nexa { font-family: 'Nexa', 'Helvetica Neue', 'Arial', sans-serif; }

        .input-field {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 1.5px solid #BFC3C7;
          border-radius: 6px;
          font-family: 'Nexa', 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          color: #000;
          background: #fff;
          outline: none;
          transition: border-color 0.2s ease;
          letter-spacing: 0.02em;
        }
        .input-field::placeholder { color: #8A8A8A; font-weight: 300; }
        .input-field:focus { border-color: #000; }
        .input-field:disabled { background: #f7f7f7; color: #8A8A8A; }

        .toggle-btn {
          flex: 1;
          padding: 10px 0;
          border-radius: 4px;
          font-family: 'Nexa', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #8A8A8A;
        }
        .toggle-btn.active { background: #000; color: #fff; }
        .toggle-btn:not(.active):hover { color: #2B2B2B; }

        .btn-primary {
          width: 100%;
          padding: 15px;
          background: #000;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-family: 'Nexa', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
        }
        .btn-primary:hover:not(:disabled) { background: #2B2B2B; }
        .btn-primary:active:not(:disabled) { transform: scale(0.995); }
        .btn-primary:disabled { background: #BFC3C7; cursor: not-allowed; }

        .btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 13px 20px;
          background: #fff;
          border: 1.5px solid #000;
          border-radius: 6px;
          font-family: 'Nexa', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #000;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .btn-google:hover { background: #f7f7f7; }

        .divider-line { width: 100%; height: 1px; background: #BFC3C7; }
        .divider-text {
          padding: 0 14px;
          font-family: 'Nexa', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #8A8A8A;
          white-space: nowrap;
          text-transform: uppercase;
        }

        .error-box {
          background: #fff;
          border: 1.5px solid #000;
          border-left: 4px solid #000;
          border-radius: 4px;
          padding: 12px 14px;
        }

        .label-text {
          display: block;
          font-family: 'Nexa', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2B2B2B;
          margin-bottom: 8px;
        }

        .card-border {
          border: 1.5px solid #000;
          border-radius: 10px;
          background: #fff;
        }

        .logo-mark {
          width: 52px;
          height: 52px;
          background: #000;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo & Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          ></div>
          <h1
            className="font-seasons"
            style={{
              fontSize: "38px",
              fontWeight: 700,
              color: "#000",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              marginBottom: "8px",
            }}
          >
            Welcome Back
          </h1>
          <p
            className="font-nexa"
            style={{
              fontSize: "13px",
              fontWeight: 300,
              color: "#8A8A8A",
              letterSpacing: "0.04em",
            }}
          >
            Sign in to your KeptAlive account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-2xl">
          {/* Google Login Button */}
          <div className="mb-6 flex justify-center">
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
                    window.location.href = "/";
                    toast.success("Logged in with Google successfully");
                  } else {
                    const msg = data.message || "Google login failed";
                    setError(msg);
                    toast.error(msg);
                  }
                } catch (err) {
                  console.error(err);
                  setError("Google login failed");
                  toast.error("Google login failed");
                }
              }}
              onError={() => setError("Google login failed")}
            />
          </div>

          {/* Divider */}
          <div
            style={{ display: "flex", alignItems: "center", margin: "24px 0" }}
          >
            <div className="divider-line" />
            <span className="divider-text">or</span>
            <div className="divider-line" />
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
              onClick={() => setLoginMethod("email")}
              className={`toggle-btn ${loginMethod === "email" ? "active" : ""}`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod("phone")}
              className={`toggle-btn ${loginMethod === "phone" ? "active" : ""}`}
            >
              Phone
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {/* Error */}
            {error && (
              <div className="error-box">
                <p
                  className="font-nexa"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#000",
                    letterSpacing: "0.02em",
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Email / Phone */}
            {loginMethod === "email" ? (
              <div>
                <label className="label-text">Email Address</label>
                <div style={{ position: "relative" }}>
                  <Mail
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "16px",
                      height: "16px",
                      color: "#8A8A8A",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) =>
                      handleInputChange("userEmail", e.target.value)
                    }
                    placeholder="your.email@example.com"
                    className="input-field"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="label-text">Phone Number</label>
                <div style={{ position: "relative" }}>
                  <Phone
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "16px",
                      height: "16px",
                      color: "#8A8A8A",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="tel"
                    value={formData.userNumber}
                    onChange={(e) =>
                      handleInputChange("userNumber", e.target.value)
                    }
                    placeholder="+91 98765 43210"
                    className="input-field"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="label-text">Password</label>
              <div style={{ position: "relative" }}>
                <Lock
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "16px",
                    height: "16px",
                    color: "#8A8A8A",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.userPassword}
                  onChange={(e) =>
                    handleInputChange("userPassword", e.target.value)
                  }
                  placeholder="Enter your password"
                  className="input-field"
                  style={{ paddingRight: "48px" }}
                  required
                  disabled={loading}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#8A8A8A",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? (
                    <Eye style={{ width: "16px", height: "16px" }} />
                  ) : (
                    <EyeOff style={{ width: "16px", height: "16px" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "-6px",
              }}
            >
              <a
                href="/forgot-password"
                className="font-nexa"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#000",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderBottom: "1px solid #000",
                  paddingBottom: "1px",
                }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
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
                    style={{ width: "16px", height: "16px" }}
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
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer Links */}
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
            Don't have an account?{" "}
            <a
              href="/Signup"
              className="font-nexa"
              style={{
                fontWeight: 700,
                color: "#000",
                textDecoration: "none",
                borderBottom: "1px solid #000",
                paddingBottom: "1px",
              }}
            >
              Create Account
            </a>
          </p>
        </div>

        {/* Terms */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
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
