const JSONStream = require('JSONStream')
const QueryStream = require('pg-query-stream')
const {Pool} = require('pg')
const pool = new Pool({
  connectionString:process.env.AERO
})

exports.getAeroData = (req, res, next) =>{
 
  
  // rawMet.findAll({
  //   where:req.query,
  //   limit:50
    
  // })
  // .then( r => {
  //   res.status(200).json(r)
  // })
  // .catch(err=>{console.log(err)})

  let sql = `
    SELECT * 
    FROM public."aero_data"

`
let values = []
let head = "WHERE "
if (Object.keys(req.query).length!==0){
  let list = []
  let count = 1

  for(const [key,value] of Object.entries(req.query)){
    console.log(key,value)
    if(Array.isArray(value)){
      
      for (i = 0; i<value.length; i++){
          temp = `"aero_data"."${key}" = $${count}`
          count+=1
          values.push(value[i])
          list.push(temp)
      }
    } else {

        temp = `"aero_data"."${key}" = $${count}`
        count+=1
        values.push(value)
        list.push(temp)    
      
    }
    
  }
  
  sql = sql + head + list.join(" AND ")
  console.log(sql)


}
pool.connect((err,client, release)=>{
  if(err){
    return console.error("error ")
  }
  if (Object.keys(req.query).length!==0){

    const query = new QueryStream(sql, values)
    const stream = client.query(query)
    stream.on('end',release)
    stream.pipe(JSONStream.stringify()).pipe(res)
  } else{
    const query = new QueryStream(sql)
    const stream = client.query(query)

    stream.on('end',release)
    stream.pipe(JSONStream.stringify()).pipe(res)
  }
})
}