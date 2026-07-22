import jwt from "jsonwebtoken";

// Verify JWT
export const protect = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });

    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }

};

// Admin Only
export const adminOnly = (req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      success: false,
      message: "Access denied",
    });

  }

  next();

};

// Customer Only
export const customerOnly = (req, res, next) => {

  if (req.user.role !== "customer") {

    return res.status(403).json({
      success: false,
      message: "Access denied",
    });

  }

  next();

};