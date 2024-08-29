


const total =(req,res,db)=>{
    db('users').sum('entries').then(ss => {
        if (ss.length) {
             return res.status(200).json(ss[0].sum)
        }else{
            return res.status(404).json('bad')
        }
   
  })
}
export default total;