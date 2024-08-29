


const siginhandle =(req,res,db,bcrypt)=>{
    const {email,password}=req.body;
    if (!email||!password) {
      return res.status(404).json('wrong')
    }
    db('login').where('email',email)
    .then(ss => { 
      const check = bcrypt.compareSync(password,ss[0].hash);
     if(check){
      db('users').where('email',ss[0].email)
      .then(user =>{
        res.status(200).json(user[0])
      }).catch(err=>{res.status(400).json('null1')})
     
     }else{res.status(400).json('null2')}
    }).catch(err=>{res.status(400).json('null3')})
  }




  export default siginhandle;