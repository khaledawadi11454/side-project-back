import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token =req.header("Authorization").replace("Bearer ","")
  if (!token) return res.json({status: 401, message: "You are not authenticated"});
try{
  const user =jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user=user
  next()

}catch(e){
  return res.status(401).json({success: false, message:"Invalid token"})
}
};