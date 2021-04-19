const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ 
    "msg": "🌐 This project has no front end",
    "api/users": "username, email, ..."
  })
})

module.exports = router;