// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const LikeShow = ({ postId }) => {
//     const userId = localStorage.getItem("loggedInUserId"); // ID người dùng đang đăng nhập
//     const [likeCount, setLikeCount] = useState(0);
//     const [isLiked, setIsLiked] = useState(false);
  
//     // Lấy danh sách likes cho bài viết hiện tại
//     useEffect(() => {
//       const fetchLikes = async () => {
//         try {
//           const response = await axios.get(`http://localhost:3000/likes`);
//           const likesForPost = response.data.filter((like) => like.postId === postId);
//           setLikeCount(likesForPost.length);
  
//           // Kiểm tra xem người dùng hiện tại đã like bài viết chưa
//           const userLiked = likesForPost.some((like) => like.userId === userId);
//           setIsLiked(userLiked);
//         } catch (error) {
//           console.error("Error fetching likes:", error);
//         }
//       };
  
//       fetchLikes();
//     }, [postId, userId]);
  
//     // Xử lý like/unlike
//     const handleLike = async () => {
//       try {
//         if (isLiked) {
//           // Nếu đã like -> Unlike
//           const response = await axios.get(`http://localhost:3000/likes`);
//           const userLike = response.data.find(
//             (like) => like.postId === postId && like.userId === userId
//           );
//           if (userLike) {
//             await axios.delete(`http://localhost:3000/likes/${userLike.id}`);
//             setLikeCount((prev) => prev - 1);
//             setIsLiked(false);
//           }
//         } else {
//           // Nếu chưa like -> Like
//           await axios.post(`http://localhost:3000/likes`, {
//             id: Date.now().toString(),
//             postId: postId,
//             userId: userId,
//           });
//           setLikeCount((prev) => prev + 1);
//           setIsLiked(true);
//         }
//       } catch (error) {
//         console.error("Error handling like:", error);
//       }
//     };
//   return (
//     <div> <span >{likeCount} Likes</span></div>
//   )
// }

// export default LikeShow