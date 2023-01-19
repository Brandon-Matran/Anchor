// import React, { useEffect, useState } from "react";
// import { useAuthContext } from "../accounts/Authentication.js";
// import parseJwt from "../decode.jsx";

// function GetOneBlog() {
//   const { token } = useAuthContext();

//   const info = parseJwt(token);

//   const [username, setUserName] = useState('')
//   const post_date = new Date().toLocaleString() + ''
//   const [title, setTitle] = useState('')
//   const [pic_url, setPicURL] = useState('')
//   const [description, setDescription] = useState('')

//   useEffect(() => {
//     async function getBlog(id) {
//       const url = `${process.env.REACT_APP_LISTING_SERVICE}/blogs/${id}`;
//       try {
//         const response = await fetch(url, {
//           credentials: "include",
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setUserName(data.username);
//           setTitle(data.title);
//           setPicURL(data.pic_url);
//           setDescription(data.description);

//         }
//       } catch (e) {}
//     }
//     getBlog(id);
//   }, [setUserName, setTitle, setPicURL, setDescription]);

// //   async function getOne(id) {
// //     const url = `${process.env.REACT_APP_LISTING_SERVICE}/listings/${id}`;
// //     const Config = {
// //       method: "get",
// //       body: JSON.stringify({
// //         username,
// //         post_date,
// //         title,
// //         pic_url,
// //         description,
// //       }),
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     };
// //     try {
// //       const response = await fetch(url, Config);
// //       if (response.ok) {
// //         const data = await response.json();
// //         setUserName(data.username);
// //         setTitle(data.title);
// //         setPicURL(data.pic_url);
// //         setDescription(data.description);
// //       }
// //     } catch (e) {}
// //   }

//   return (
//     <div>
//       <form>
//         <div className="row mb-4">
//           <div className="col">
//             <div className="form-outline">
//               <input
//                 onChange={(e) => setTitle(e.target.value)}
//                 type="text"
//                 id="form6Example1"
//                 className="form-control"
//                 value={title}
//               />
//               <label className="form-label" for="form6Example1">
//                 Title
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="form-outline mb-4">
//           <input
//             onChange={(e) => setName(e.target.value)}
//             value={company_name}
//             type="text"
//             id="form6Example3"
//             className="form-control"
//           />
//           <label className="form-label" for="form6Example3">
//             Company name
//           </label>
//         </div>

//         <div className="form-outline mb-4">
//           <input
//             onChange={(e) => setPosition(e.target.value)}
//             value={job_position}
//             id="form6Example6"
//             className="form-control"
//           />
//           <label className="form-label" for="form6Example6">
//             Deadline
//           </label>
//         </div>

//         <div className="form-outline mb-4">
//           <textarea
//             onChange={(e) => setUrl(e.target.value)}
//             value={apply_url}
//             className="form-control"
//             id="form6Example7"
//             rows="4"
//           ></textarea>
//           <label className="form-label" for="form6Example7">
//             Job description
//           </label>
//         </div>

//         <div className="form-outline mb-4">
//           <input
//             onChange={(e) => setDead(e.target.value)}
//             value={deadline}
//             className="form-control"
//             id="form6Example7"
//             rows="4"
//           ></input>
//           <label className="form-label" for="form6Example7">
//             Application url
//           </label>
//         </div>

//         <div className="form-outline mb-4">
//           <input
//             onChange={(e) => setCreated(e.target.value)}
//             value={created}
//             id="form6Example5"
//             className="form-control"
//           />
//           <label className="form-label" for="form6Example5">
//             Start date
//           </label>
//         </div>

//         <button
//           onClick={async () => await update(id)}
//           type="submit"
//           className="btn btn-primary btn-block mb-4"
//         >
//           Finishing the update
//         </button>
//       </form>
//     </div>
//   );
// }

// export default GetOneBlog;
