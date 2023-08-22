import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const oathClient = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
oathClient.setCredentials({ "refresh_token": process.env.REFRESH_TOKEN });

export { oathClient }; 
