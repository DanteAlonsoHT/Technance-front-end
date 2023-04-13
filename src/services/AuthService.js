import axios from "axios";
import swal from "sweetalert";
import { loginConfirmedAction, logout } from "../store/actions/AuthActions";

const capitalize = (word) =>
  word.toLowerCase().replace(/\w/, (firstLetter) => firstLetter.toUpperCase());

export function signUp(
  full_name,
  preferred_name,
  email,
  password,
  image_profile
) {
  const postData = {
    full_name,
    preferred_name,
    email,
    password,
    image_profile,
  };

  return axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_BACK_END_URL_DEV
        : process.env.REACT_APP_BACK_END_URL_PROD
    }/api/users/`,
    postData
  );
}

export function login(email, password) {
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };

  return axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_BACK_END_URL_DEV
        : process.env.REACT_APP_BACK_END_URL_PROD
    }/api/users/get_user_data_from_auth/`,
    postData
  );
}

export function updateProfile(
  token,
  id,
  full_name,
  preferred_name,
  email,
  password,
  image_profile
) {
  const postData = {
    full_name,
    preferred_name,
    email,
    password,
    image_profile,
  };

  return axios.put(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_BACK_END_URL_DEV
        : process.env.REACT_APP_BACK_END_URL_PROD
    }/api/users/${id}/`,
    postData,
    {
      token: token,
    }
  );
}

export function formatError(errorResponse) {
  switch (errorResponse.error.message) {
    case "EMAIL_EXISTS":
      swal("Oops", "Email ya existe", "error");
      break;
    case "EMAIL_NOT_FOUND":
      swal("Oops", "Email no encontrado", "error", {
        button: "!Intenta de Nuevo!",
      });
      break;
    case "INVALID_PASSWORD":
      swal("Oops", "Contraseña incorrecta", "error", {
        button: "!Intenta de Nuevo!",
      });
      break;
    case "USER_NOT_ACTIVE":
      swal(
        "Oops",
        "Usuario no activo, tu usuario está en espera de ser activado",
        "error",
        { button: "Intenta más tarde" }
      );
      break;
    case "INVALID_DATA":
      try {
        Object.keys(errorResponse.error.data).map((field) => {
          let field_translated = field;
          let errorMessage = errorResponse.error.data[field].toString();
          switch (field) {
            case "full_name":
              field_translated = "Full Name";
              if (errorMessage.includes("full_name")) {
                errorMessage = errorMessage.replace("full_name", "full name");
              }
              break;
            case "preferred_name":
              field_translated = "Preferred Name";
              if (errorMessage.includes("preferred_name")) {
                errorMessage = errorMessage.replace(
                  "prefered_name",
                  "preferred name"
                );
              }
              break;
            case "email":
              field_translated = "Email Address";
              if (errorMessage.includes("email")) {
                errorMessage = errorMessage.replace("email", "email address");
              }
              break;
            case "password":
              field_translated = "Password";
              break;
            default:
              swal("Oops", "Server Error", "error", {
                button: "Try again later!",
              });
          }
          swal(
            "Oops",
            `${field_translated}: ${capitalize(errorMessage)}`,
            "error",
            { button: "Try again!" }
          );
        });
      } catch (error) {
        console.log(error);
      }
      break;
    case "SERVER_ERROR":
      swal("Oops", "Server Error", "error", {
        button: "Try again!",
      });
      break;
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return "";
  }
}

export function saveTokenInLocalStorage(tokenDetails) {
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (!tokenDetailsString) {
    dispatch(logout(history));
    return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);
  dispatch(loginConfirmedAction(tokenDetails));
}
