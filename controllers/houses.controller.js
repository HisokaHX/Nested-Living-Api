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
    console.log(req.query)
    let searchCriteria = {}
    if (req.query.people) {
        searchCriteria.people = req.query.people
    }
    if (req.query.location) {
        searchCriteria.location = { $regex: new RegExp(req.query.location, 'i') };
    }
    if (req.query.startDate) {
        // Ajusta la propiedad en tu esquema de datos según sea necesario
        searchCriteria.startDate = { $lte: new Date(req.query.startDate) };
    }
    if (req.query.endDate) {
        // Ajusta la propiedad en tu esquema de datos según sea necesario
        searchCriteria.endDate = { $gte: new Date(req.query.endDate) };
    }
House.find(searchCriteria)
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
    .populate({ path: 'comments', populate: { path: 'writer' } })
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

module.exports.deleteHouse = (req, res, next) => {
    House.findByIdAndDelete(req.params.id)
        .then(deletedHouse => {
            if (!deletedHouse) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'House not found' });
            }
            res.json({ message: 'House deleted successfully' });
        })
        .catch(next);
}


module.exports.createCheckoutSession = async (req, res, next) => {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    try {
        const house = await House.findById(id);
        const { title, description, price, images } = house;
        console.log(images)

        const oneDay = 24 * 60 * 60 * 1000;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.round(Math.abs((end - start) / oneDay));

        const totalPrice = parseFloat(price) * days* 100;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: title,
                            description: description,
                            images: images
                        },
                        unit_amount: totalPrice,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CORS_ORIGIN}/checkout/${id}?success=true`,
            cancel_url: `${process.env.CORS_ORIGIN}/houses/${id}`,
        });

        res.json({ url: session.url, totalPrice: totalPrice / 100 });
        res.redirect(303, `${process.env.CORS_ORIGIN}/checkout/${id}?success=true`);
    } catch (error) {
        next(error);
    }
}