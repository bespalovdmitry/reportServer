import { body } from "express-validator";

export const tourAddValidation = [
    body('dateTour', 'Incorrect tour data').isDate(),
    body('service', 'Min length 3').isLength({min: 3}),
    body('pickUpTime', 'Incorrect tour pickUp time').isDate(),
    body('hotel', 'Min length hotel 3').isLength({min: 3}),
    body('guide', 'Min length guide 3').isLength({min: 3}),
    body('agent', 'Min length agent 3').isLength({min: 3}),
    body('tourDescription', 'Min length tourDescription 3').isLength({min: 3}),
]