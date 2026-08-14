
import app from "./app"
import config from "./config"
import { prisma } from "./lib/prisma"


async function main(){
    try {
        
        await prisma.$connect()
        console.log("Database Connected")
        app.listen(config.port, ()=>{
        console.log("App is running on port 5000")
})
    } catch (error) {
        await prisma.$disconnect()
        
        console.log(error)
        process.exit(1)
    }
}

main()