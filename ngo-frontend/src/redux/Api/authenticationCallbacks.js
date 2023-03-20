// import {
//   updateStart,
//   updateSuccess,
//   updateError,
// } from "../Slices/authenticationSlice";

// const baseUrl = `http://localhost:4000/api/v1`;

// export const authenticateUser = async (user, dispatch) => {
//   dispatch(updateStart());
//   try {
//     const response = await fetch(`${baseUrl}/accounts/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     }).then((response) => {
//       if (!response.ok) {
//         return response.text().then((text) => {
//           throw new Error(text);
//         });
//       } else {
//         return response.json();
//       }
//     });

//     localStorage.setItem("Authentication-token", response.token);

//     dispatch(updateSuccess(response));
//   } catch (error) {
//     dispatch(updateError());
//   }
// };
