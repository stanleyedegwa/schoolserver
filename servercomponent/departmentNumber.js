



const department =(req,res,db)=>{
    const{department}=req.body;
    db('users').where('department',department)
    .sum('entries')
    .returning('sum')
    .then(sum =>{if(sum.length)
      {console.log(sum[0])
        res.status(200).json(sum[0].sum)
       
      }else{
           res.status(400).json('Not Found')
      }
  })
}

export default department;