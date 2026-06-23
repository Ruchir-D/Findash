import rateLimit from "express-rate-limit";

/**
 * Rate limiting configuration for API endpoints
 * Prevents abuse by limiting requests per IP address
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Stricter rate limiting for authentication endpoints
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many authentication attempts, please try again later.",
  skipSuccessfulRequests: true,
});

/**
 * Input sanitization middleware
 * Prevents NoSQL injection attacks
 */
export const sanitizeInput = (req, _res, next) => {
  const sanitize = (obj) => {
    if (obj && typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        if (key.startsWith("$") || key.includes(".")) {
          delete obj[key];
        } else if (typeof obj[key] === "object") {
          sanitize(obj[key]);
        }
      });
    }
  };

  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);
  next();
};
