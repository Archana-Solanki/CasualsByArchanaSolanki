const express = require("express");
const app = express();
const helmet = require("helmet");
app.set("trust proxy", 1);
require("dotenv").config();
const port = process.env.PORT || 5000;
const mongoDB = require("./db");
const requiredEnv = ["MONGO_URI", "JWT_SECRET"];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(
    `\u274c Missing required environment variables: ${missing.join(", ")}`
  );
  console.error(
    "Set them in your environment or .env before starting the server."
  );
  process.exit(1);
}
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ratelimit = require("express-rate-limit");
const allowedOrigins = [
  "http://localhost:5173",
  "https://casualsbyarchanasolanki.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "cdn.jsdelivr.net",
          "vercel.app",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "fonts.googleapis.com",
          "vercel.app",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "cdn.example.com",
          "vercel.app",
          "res.cloudinary.com",
        ],
      },
    },
    crossOriginEmbedderPolicy: false, // if you load images or iframes from other sources
  })
);

// Add HSTS
app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
mongoDB();

// const apiLimiter = ratelimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: {
//     status: 429,
//     error: "Too many requests",
//     message: "Too many requests from this IP, please try again after 15 minutes."
//   }
// });

// const loginLimter = ratelimit({
//   windowMs: 10 * 60 * 1000,
//   max: 5,
//   message: {
//     status: 429,
//     error: "Rate limit exceeded",
//     message: "Too many login attempts. Try again later."
//   }
// });

// const signUplimiter = ratelimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message: {
//     status: 429,
//     error: "Rate limit exceeded",
//     message: "Too many signup attempts, please try later."
//   }
// });

const SecuredManagementRoute = require("./Routes/ManagementRoute");
app.use("/api/manage", SecuredManagementRoute);

const NonSecuredManagementRoute = require("./Routes/NonSecuredManagementRoutes");
app.use("/api/manage", NonSecuredManagementRoute);

const OrderRoutes = require("./Routes/userOrderRoutes");
app.use("/api/user/order", OrderRoutes);

const UserSignUp = require("./Routes/signupRoutes");
app.use("/api", UserSignUp);

const shiprocketRoutes = require("./Routes/Shiprocket.js");
app.use("/api/shiprocket", shiprocketRoutes);

app.use("/api/user", require("./Routes/loginRoutes"));

app.use("/api", require("./Routes/profileRoutes"));

app.use("/api/display", require("./Routes/ProductDisplayRoutes"));

app.use("/api/blogs", require("./Routes/BlogRoutes.js"));

app.use("/api/cart", require("./Routes/CartRoutes.js"));

app.listen(port, "0.0.0.0", () => {
  console.log(`App is active on ${port}`);
});
