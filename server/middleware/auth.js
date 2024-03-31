import jwt from "jsonwebtoken";

// Fallback JWT secret key
const fallbackJwtSecret = "fallback_secret_key";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token with the JWT secret key
    const verified = jwt.verify(token,  fallbackJwtSecret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
