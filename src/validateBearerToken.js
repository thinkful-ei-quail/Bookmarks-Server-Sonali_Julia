// const logger = require("./logger");
// // const API_TOKEN = require("./env");

// function validateBearerToken(req, res, next) {
//   const API_TOKEN = process.env.API_TOKEN;
//   console.log(API_TOKEN);
//   const authTOKEN = req.get("Authorization");
//   if (!authTOKEN || authTOKEN.split(" ")[1] !== API_TOKEN) {
//     logger.error(`Unauthorized request to path: ${req.path}`);
//     return res.status(401).json({ error: "Unauthorized request" });
//   }
//   next();
// }

// module.exports = validateBearerToken;
