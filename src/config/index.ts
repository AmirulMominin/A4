import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(process.cwd(), '.env')})

export default  {
    port: process.env.PORT,
    connectionString: process.env.DATABASE_URL,
    app_url: process.env.APP_URL,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    accessExpire: process.env.JWT_ACCESS_EXPIRES_IN!,
    stripe_key: process.env.STRIPE_API_KEY!
}