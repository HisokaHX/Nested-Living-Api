const House = require("../models/House.model");
const { StatusCodes } = require("http-status-codes");
const Like = require("../models/Like.model");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.createHouse = ( req, res, next) => {
    const images = req.files ? req.files.map(file => file.path) : [];
    House.create({...req.body, owner: req.currentUserId, images})
    .then(createdHouse => {
        res.status(StatusCodes.CREATED).json(createdHouse)
    })
    .catch(next)
}

module.exports.getHouse = (req, res, next) => {
House.find()
.then((houses) => {
    res.status(StatusCodes.OK).json(houses)
})
.catch(next)
}

module.exports.getMyHouses = (req, res, next) => {
House.find({ owner: req.currentUserId })
.then((houses) => {
    res.status(StatusCodes.OK).json(houses)
})
.catch(next)
}

module.exports.getHouseDetail = (req, res, next) => {
House.findById(req.params.id)
.then((house) => {
    if (!house) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'House not found' });
    }
    res.status(StatusCodes.OK).json(house);
})
.catch(next)
}

module.exports.editHouse = (req, res, next) => {
    House.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(editedHouse => {
            res.json(editedHouse);
        })
        .catch(next)
}

module.exports.createCheckoutSession = async (req, res, next) => {
    const {houseId, title, description, price, images} = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: title,
                        description: description,
                        images: [images]
                    },
                    unit_amount: parseFloat(price) * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.CORS_ORIGIN}/checkout/${houseId}?success=true`,
        cancel_url: `${process.env.CORS_ORIGIN}/checkout/${houseId}?canceled=true`,
    });

    res.json({url: session.url});
}