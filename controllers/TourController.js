import TourModel from '../models/Tour.js'

export const getAllTours = async (req, res) => {
    try {
        const tours = await TourModel.find().populate('user').exec()
        res.json(tours)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Tours dont download"
        })
    }
}
export const getTour = async (req, res) => {
  try {
      const tourId = req.params.id
      const tour = await TourModel.findById(tourId)
      res.json(tour)
  } catch (e) {
      console.log(e)
      res.status(500).json({
          message: "Tour dont download"
      })
  }
}
export const createTour = async (req, res) => {
try {
    const doc = new TourModel({
        dateTour: req.body.dateTour,
        service: req.body.service,
        pickUpTime: req.body.pickUpTime,
        hotel: req.body.hotel,
        guide: req.body.guide,
        agent: req.body.agent,
        tourDescription: req.body.tourDescription,
        user: req.userId,
    })
    const tour = await doc.save()
    res.json(tour)
} catch (e) {
    console.log(e)
    res.status(500).json({
        message: "Tour no create"
    })
}
}
export const removeTour = async (req, res) => {
  try {
      await TourModel.findOneAndDelete({
          _id: req.params.id
      }, (err, doc) => {
          if (err) {
              console.log(err)
              return res.status(500).json({
                  message: 'Tour not deleted123'
              })
          }
          if (!doc) {
              console.log(err)
              return res.status(500).json({
                  message: 'Tour not found'
              })
          }

          res.json({
              success: true
          })
      })
  } catch (e) {
      console.log(e)
      res.status(500).json({
          message: "Tour not deleted"
      })
  }
}