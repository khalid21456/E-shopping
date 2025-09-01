import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function Inscrire() {
  const navigate = useNavigate();
  const [showProgressionBar, setShowProgressionBar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleConnect = async () => {
    setShowProgressionBar(true);
    setTimeout(() => {
      navigate("/verify");
    }, 3000)
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: "Poppins" }}>
      <div className="flex justify-center pt-12">
        <img src={logo} width="300px" alt="panier" />
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
        <label className="text-[20px] font-bold pl-5">Créer un compte</label>
      </div>
      <div className="flex justify-center">
        <label className="w-1/3 text-center text-gray-700">
          Saisissez votre adresse e-mail ou numéro de téléphone vous créer un
          nouveau compte e-shop
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
              sx={{
                "& label.Mui-focused": {
                  color: "#f54a00",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#f54a00",
                  },
                },
              }}
              id="outlined-basic"
              label="Nom et prénom*"
              variant="outlined"
            />{" "}
            <br />
            <TextField
              sx={{
                "& label.Mui-focused": {
                  color: "#f54a00",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#f54a00",
                  },
                },
              }}
              id="outlined-basic"
              label="Adresse email ou numéro de téléphone*"
              variant="outlined"
            />
            <br />
            <TextField
              sx={{
                "& label.Mui-focused": {
                  color: "#f54a00",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#f54a00",
                  },
                },
              }}
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
            />
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
          S'inscrire
        </Button>
      </div>
      <div className="flex justify-center mt-2">
        <span className="text-[13px]">
          Vous avez déjà un compte ?{" "}
          <label
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={(e) => {
              navigate("/login");
            }}
          >
            Se connecter
          </label>
        </span>
      </div>
      <div className="flex justify-center">
        <div className="flex items-center mt-7 w-[544px]">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">ou</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
      </div>
      <div className="flex justify-center mt-4 pb-10">
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
          S'inscrire avec Google
        </button>
      </div>
      {showProgressionBar && (
        <div className="fixed inset-0 bg-gray-500/30 z-50 flex items-center justify-center"></div>
      )}
    </div>
  );
}
