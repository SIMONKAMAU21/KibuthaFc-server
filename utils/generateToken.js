import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const generateToken = (id,role) => {
  return jwt.sign({ id ,role }, process.env.JWT_SECRET, {
    expiresIn: '10',
  })
}

export default generateToken