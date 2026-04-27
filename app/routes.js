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

  // If either of the urgent symptoms have been checked
  if (
    SuperPowers.includes('invisibilityCloak') ||
    SuperPowers.includes('superHumanStength')
  ) {

    res.redirect('/details')

  } else {

    // Return to question
    res.redirect('/ineligible')
  }
})





router.post('/super-powers-answer', function (req, res) {
  const data = req.session.data
  const SuperPowers = data.SuperPowers || []

  if (
    SuperPowers.includes("people not being able to see me") ||
    SuperPowers.includes("lifting far beyond my expectations")
  ) {

    res.redirect('/details')

  } else {

    // No answer selected, return to question
    res.redirect('/ineligible')

  }
})



module.exports = router
