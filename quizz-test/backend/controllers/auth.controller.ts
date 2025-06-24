import express, { Request, Response } from "express";

import User from "../models/user.model";
import { hashPassword } from "../utils/hashPassword";
import { NextFunction } from "express-serve-static-core";

const app = express();
app.use(express.json());


// export const register =(
//   async (req: Request, res: Response): Promise<void> => {
//     const { username, email, password } = req.body;

//     try {
//       // Kiểm tra xem người dùng đã tồn tại chưa
//       const existingUser = await User.findOne({
//         $or: [{ email }, { username }],
//       });

//       if (existingUser) {
//         res.status(400).json({
//           success: false,
//           message: "Username or email already exists",
//         });
//         return;
//       }

//       // Hash mật khẩu
//       const hashedPassword = await hashPassword(password);

//       // Lưu user vào database
//       const newUser = new User({ username, email, password: hashedPassword });
//       await newUser.save();

//       res
//         .status(201)
//         .json({ success: true, message: "User registered successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   }
// );
export const register = async(res: Response, req: Request, next:NextFunction)=>{
  const {username, email, password} = req.body;
  try{
    const existingUser = await User.findOne({
      $or: [{email}, {username}]
    })
    
  }catch(err){

  }
}

export default app;
