const router = require('express').Router();
const apiRoutes = require('./api')

router.use('/api', apiRoutes);

router.get('/', (req, res) => {
  res.json({ 
    "msg": "🌐 This project has no front end",
    "api/users": "username, email, ..."
  })
})

router.use((req, res) => {
  res.status(404).send('<h1>404 Error. 🤫 Nothing to see here.</h1>');
});

module.exports = router;