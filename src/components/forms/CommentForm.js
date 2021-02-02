// import React from 'react'
// import axios from "axios"
// import { isAuth } from "../../components/helpers/auth";

// function CommentForm({
//   state,
//   setState,
//   postId,
//   comments,
//   updateComments,
//   getPost,
// }) {
//   const { text } = state;

//   const comment = async (postId, userId, comment) => {
//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_API}/post/comment`,
//         { postId, userId, comment },
//         {
//           headers: {
//             Authorization: `Bearer ${isAuth().data.token}`,
//           },
//         }
//       );
//       setState({ text: "" });
//       updateComments(response.data.comments);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const uncomment = async (postId, userId, comment) => {
//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_API}/post/uncomment`,
//         { postId, userId, comment },
//         {
//           headers: {
//             Authorization: `Bearer ${isAuth().data.token}`,
//           },
//         }
//       );
//       setState({ text: "" });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     const userId = isAuth().data.user._id;
//     comment(postId, userId, text);
//   };

//   const handleChange = (event) => {
//     setState({ text: event.target.value });
//   };
//   return (
//     <form onSubmit={submitHandler}>
//       <div className="form-group">
//         <input className="form-control" type="text" onChange={handleChange} />
//       </div>
//     </form>
//   );
// }

// export default CommentForm

