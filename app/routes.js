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

    res.redirect('/super-powers')

  } else {

    // No answer selected, return to question
    res.redirect('/symptoms')

  }
})


router.post('/super-powers-answer', function (req, res) {
  const data = req.session.data
  const SuperPowers = data.SuperPowers || []

  // If any magical powers have been detected
  if (
    SuperPowers.includes("people not being able to see me") ||
    SuperPowers.includes("lifting far beyond my expectations") ||
    SuperPowers.includes('talking to animals') ||
    SuperPowers.includes("moving things with my mind")
  ) {

    res.redirect('/details')

  } else {

    // No magical powers detected, ineligible for testing
    res.redirect('/ineligible')

  }
})



module.exports = router
