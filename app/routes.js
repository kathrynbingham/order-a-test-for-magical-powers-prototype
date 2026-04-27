// External dependencies
const express = require('express')

const router = express.Router()

// Add your routes here - above the module.exports line


router.post('/symptoms-answer', function (req, res) {
  const data = req.session.data
  const Doyouhavesymptoms = data.Doyouhavesymptoms

  if (Doyouhavesymptoms === "Yes") {

    res.redirect('/details')

  } else if (Doyouhavesymptoms === "No") {

    res.redirect('/ineligible')

  } else if (Doyouhavesymptoms === "I have no idea") {

    res.redirect('/ineligible')

  } else {

    // No answer selected, return to question
    res.redirect('/symptoms')

  }
})




module.exports = router
