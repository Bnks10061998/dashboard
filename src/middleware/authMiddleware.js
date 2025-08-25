// import jwt from 'jsonwebtoken';

// export const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       console.log('JWT verification error:', err); // <- add this
//       return res.status(403).json({ error: 'Invalid token' });
//     }

//     console.log('Decoded user from JWT:', user); // <- add this
//     req.user = user;
//     next();
//   });
// };
