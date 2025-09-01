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

export default function Verification() {
  const navigate = useNavigate();
  const [showProgressionBar, setShowProgressionBar] = useState(false);
  const [count, setCount] = useState(59);
  const handleConnect = async () => {
    setShowProgressionBar(true);
  };

  setTimeout(() => {
    if(count > 0)
        setCount(count - 1);
  }, 1000);

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
        <label className="text-[20px] font-bold pl-3">
          Vérifiez votre adresse e-mail
        </label>
      </div>
      <div className="flex justify-center pl-3">
        <label className="w-1/3 text-center text-gray-700">
          Nous envoyons un code de vérification à : <br />
          <span>azd@gmail.com</span>
        </label>
      </div>
      <div className="flex justify-center mt-5">
        <TextField
          style={{ fontSize: "20px" }}
          id="outlined-basic"
          variant="outlined"
          inputProps={{
            maxLength: 1,
            pattern: "[0-9]",
            style: {
              textAlign: "center",
              caretColor: "transparent",
            },
          }}
          sx={{
            "& > :not(style)": { m: 1, width: "7ch", fontSize: "20px" },
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
        />
        <TextField
          style={{ fontSize: "20px" }}
          id="outlined-basic"
          variant="outlined"
          inputProps={{
            maxLength: 1,
            pattern: "[0-9]",
            style: {
              textAlign: "center",
              caretColor: "transparent",
            },
          }}
          sx={{
            "& > :not(style)": { m: 1, width: "7ch", fontSize: "20px" },
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
        />
        <TextField
          style={{ fontSize: "20px" }}
          id="outlined-basic"
          variant="outlined"
          inputProps={{
            maxLength: 1,
            pattern: "[0-9]",
            style: {
              textAlign: "center",
              caretColor: "transparent",
            },
          }}
          sx={{
            "& > :not(style)": { m: 1, width: "7ch", fontSize: "20px" },
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
        />
        <TextField
          style={{ fontSize: "20px" }}
          id="outlined-basic"
          variant="outlined"
          inputProps={{
            maxLength: 1,
            pattern: "[0-9]",
            style: {
              textAlign: "center",
              caretColor: "transparent",
            },
          }}
          sx={{
            "& > :not(style)": { m: 1, width: "7ch", fontSize: "20px" },
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
        />
      </div>
      <div className="flex justify-center mt-2">
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
          Soumettre
        </Button>
      </div>
      <div className="flex justify-center mt-2">
        <span className="text-[12px] text-center w-1/3">
          Vous n'avez pas reçu le code ? Cela peut prendre un peu de temps,
          redemandez un nouveau code dans{" "}
          <label
            style={{ color: "#f54a00" }}
            className={`font-bold ${count == 0 ? "cursor-pointer hover:text-orange-700" : ""}}`}
          >
            {count > 0 ? count : "redemander un nouveau code"} { count > 10 ? "secondes" : count > 0 ? "seconde" : ""}
          </label>
        </span>
      </div>
      <div className="text-[14px] flex justify-center mt-28">
        <span className="text-center w-1/3">
          Si besoin d'aide, merci de vous référer au Centre d'Assistance ou de
          contacter notre service client.
        </span>
      </div>
      <div className="flex justify-center mt-5 pb-10">
        <img src={logo} alt="logo" width="150px" />
      </div>
      {showProgressionBar && (
        <div className="fixed inset-0 bg-gray-500/30 z-50 flex items-center justify-center"></div>
      )}
    </div>
  );
}
