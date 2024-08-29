








const registerhandle = (req, res, bcrypt, db, saltRounds)=>{
    const {surnameInput,otherNameInput,emailInput,passwordInput,
      departmentInput,statusInput,sex,birth,state,mat} = req.body;
      if (!surnameInput||!otherNameInput||!emailInput||!passwordInput||!
        departmentInput||!statusInput||!sex||!birth||!state||!mat) {
        return res.status(404).json('could not register')
      }
      const hash = bcrypt.hashSync(passwordInput, saltRounds);
      db.transaction(trx =>{
        trx('login').insert({
          email:emailInput,
          hash : hash
        })
        .returning('email')
        .then(reEmail => {
         trx('users').insert({
          surname : surnameInput,
          othername : otherNameInput,
          email : reEmail[0].email,
          department : departmentInput,
          states : state,
          status : statusInput,
          birth : birth,
          sex : sex,
          joined : new Date(),
          mat:mat
         })
         .returning('*')
         .then(users => {
          if(users[0].email){ 
            console.log(users)
            res.status(200).json(users[0])
        }else{
                res.status(400).json('nil')
            }
  
         }).catch(Error => res.status(400).json('not allowed'))
        }).then(trx.commit) 
        .catch(trx.rollback)
  
      }).catch(Error => res.status(400).json('Error'))
  }



export default registerhandle;