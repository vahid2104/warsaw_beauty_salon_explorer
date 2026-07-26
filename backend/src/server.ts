import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
