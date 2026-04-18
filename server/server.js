import "dotenv/config";

import {app} from './src/app.js'
import connection  from './src/config/db.js'






const port = process.env.PORT ||3000

connection()


    



app.listen(port,()=>{
    console.log("port is running on ",port);
    
})


