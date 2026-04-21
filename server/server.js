import "dotenv/config";

import {app} from './src/app.js'
import connection  from './src/config/db.js'






const port = process.env.PORT || 3000

const startServer = async () => {
    try {
        await connection()
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
        })
    } catch(error) {
        console.error("Failed to start server:", error.message)
        process.exit(1)
    }
}

startServer()


