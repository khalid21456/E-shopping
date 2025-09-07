import React, { useState } from "react";
import panier from "../assets/panier.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
const HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT;

import "../index.css";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [showProgressionBar, setShowProgressionBar] = useState(false);
  const [request, setRequest] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldError, setFieldError] = useState({ email: "", password: "" });
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const errorTextStyle = {
  color: "red",
  fontSize: "12px",
  marginTop: "4px",
  alignSelf: "flex-start",
  fontWeight: "bold"
};
const inputStyle = {
  "& label.Mui-focused": { color: "#f54a00" },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": { borderColor: "gray" },
    "&.Mui-focused fieldset": { borderColor: "#f54a00" },
  },
};
  const handleConnect = async () => {
    
    setFieldError({ email: "", password: "" });
    setErrorMessage("");

    let hasError = false;
    if (!request.email) {
      setFieldError((prev) => ({
        ...prev,
        email: "* Veuillez entrer votre e-mail.",
      }));
      hasError = true;
    }
    if(!EMAIL_REGEX.test(request.email)) {
      setFieldError((prev) => ({
        ...prev,
        email: "* Email non valide.",
      }));
      hasError = true;
    }
    if (!request.password) {
      setFieldError((prev) => ({
        ...prev,
        password: "* Veuillez entrer votre mot de passe.",
      }));
      hasError = true;
    }
    if (hasError) return;
    else setShowProgressionBar(true);
    try {
      const res = await axios.post(
        `http://${HOST}:${PORT}/eshop/api/auth/login`,
        request,
        {withCredentials: true},
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status == 200) {
        const { id, name, email } = res.data;
        localStorage.setItem("UserId", id);
        localStorage.setItem("UserName", name);
        localStorage.setItem("Email", email);
        navigate("/e-shop")
      }
      setShowProgressionBar(false);
    } catch (err) {
      console.log(err.message);
      setShowProgressionBar(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: "Poppins" }}>
      <div className="flex justify-center pt-12">
        <img src={panier} width="100px" alt="panier" />
      </div>
      {showProgressionBar && (
        <div id="progression_bar" className="flex justify-center mt-5">
          <Box sx={{ width: "35%" }}>
            <LinearProgress
              sx={{
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#f54a00", // bar color
                },
                backgroundColor: "#ffe0cc", // track color (optional)
              }}
            />
          </Box>
        </div>
      )}
      <div className="flex justify-center p-5">
        <label className="text-[20px] font-bold pl-5">
          Bienvenue chez e-shop
        </label>
      </div>

      <div className="flex justify-center">
        <label className="w-1/3 text-center text-gray-700">
          Saisissez votre adresse e-mail ou numéro de téléphone pour vous
          connecter au votre compte e-shop
        </label>
      </div>
      <div className="flex justify-center mt-5">
        <div>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "54ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              sx={inputStyle}
              value={request.email}
              onChange={(e) => setRequest({ ...request, email: e.target.value })}
              id="outlined-basic"
              label="Adresse email ou numéro de téléphone*"
              variant="outlined"
            />{" "}
            <br />
            {fieldError.email && <div style={errorTextStyle}>{fieldError.email}</div>}
            <TextField
              sx={inputStyle}
              value={request.password}
              onChange={(e) => setRequest({ ...request, password: e.target.value })}
              label="Mot de passe*"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: "#b6b4b3ff" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            /><br/>
            {fieldError.password && <div style={errorTextStyle}>{fieldError.password}</div>}
          </Box>
        </div>
      </div>
      <div className="flex justify-center mt-7">
        <Button
          variant="contained"
          style={{
            width: "544px",
            paddingTop: "10px",
            paddingBottom: "10px",
            backgroundColor: "#f54a00",
          }}
          onClick={handleConnect}
        >
          Se connecter
        </Button>
      </div>
      <div className="flex justify-center mt-2">
        <span className="text-[10px] text-center w-1/5">
          En continuant, vous acceptez les conditions d'utilisation de Jumia{" "}
          <label
            style={{ color: "#f54a00" }}
            className="underline cursor-pointer"
          >
            Termes et conditions
          </label>
        </span>
      </div>

      <div className="flex justify-center mt-10">
        <div className="space-y-4">
          <button
            // onClick={handleFacebookLogin}
            className="flex justify-left px-6 py-3 cursor-pointer w-[544px] bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5 mr-24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Connectez-vous avec Facebook
          </button>

          {/* Google Login Button */}
          <button
            // onClick={handleGoogleLogin}
            className="flex justify-left px-6 py-3 cursor-pointer w-[544px] bg-white hover:bg-gray-50 text-gray-700 font-medium rounded border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5 mr-30" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Se connecter avec Google
          </button>

          {/* Optional divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">ou</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Example additional content */}
          <div className="text-center text-sm text-gray-600">
            <p>
              Pas encore de compte ?
              <a
                onClick={(e) => navigate("/sign")}
                className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium ml-1"
              >
                S'inscrire
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="text-[14px] flex justify-center mt-5">
        <span className="text-center w-1/3">
          Si besoin d'aide, merci de vous référer au Centre d'Assistance ou de
          contacter notre service client.
        </span>
      </div>
      <div className="flex justify-center mt-10 pb-10">
        <img src={logo} alt="logo" width="150px" />
      </div>

      {showProgressionBar && (
        <div className="fixed inset-0 bg-gray-500/30 z-50 flex items-center justify-center"></div>
      )}
    </div>
  );
};

export default Login;
