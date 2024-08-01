import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";
import { PORT } from "./src/config/env.vars.js";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
