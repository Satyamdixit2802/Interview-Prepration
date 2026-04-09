import dotenv from 'dotenv'
import {app} from './src/app.js'
import connection  from './src/config/db.js'


dotenv.config()

const port = process.env.PORT 

connection().then(

)


app.listen(port,()=>{
    console.log("port is running on ",port);
    
})


