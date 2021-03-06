const router = require('express').Router()

const models = require('../models')
//show all countries
router.get('/', (req, res) => {
  models.country.findAll({ raw: true }).then((countries) => {
    res.render('countries/index', { countries })
  })
  .catch((error) => {
    res.json({ error })
  })
})

router.get('/new', (req, res) => {
  res.render('countries/new')
})

//create country

router.post('/', (req, res) => {
  models.country.create({
    name: req.body.name,
    founded: req.body.founded,
    population: req.body.population,
    // continentId: 
  }).then((country) => {
    res.redirect(`/countries/${country.id}`)
  })
  .catch((error) => {
    res.render({ error })
  })
})

//show one country
router.get('/:id', async (req, res) => {
  try {
    const country = await models.country.findByPk(req.params.id, { raw: true })
    res.render('countries/show', { country })
  } catch (error) {
    res.json({ error })
  }
})
//update country
router.put('/:id', async (req, res) => {
  try {
    await models.country.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    await models.country.findByPk(req.params.id)
    res.redirect(`/countries/${req.params.id}`)
    //could also say ? /countries/${country.id}
  } catch (error) {
    res.json({ error })    
  }
})
//delete country
router.delete('/:id', (req, res) => {
  models.country.destroy({
    where: { id: req.params.id }
  })
  .then(() => {
    res.redirect('/countries')
  })
  .catch((err) => {
    res.json({ error })
  })
})


module.exports = router