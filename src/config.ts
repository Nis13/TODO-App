import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiryMS: 6000,
        refreshTokenExpityMS: 180000,
    }
}

export default config;