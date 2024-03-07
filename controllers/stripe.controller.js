/*const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const HouseModel = require('../models/House.model');

module.exports.createCheckoutSession = async (req, res, next) => {
    const { houseId } = req.params;
    

    try {
        const house = await HouseModel.findById(houseId);

        const session = await stripe.checkout.sessions.create({

            payment_method_types: ['card'],

            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: house.title,
                        },
                        unit_amount: Math.max(parseInt(house.price * 100), 50),

                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url:`${process.env.CORS_ORIGIN}/checkout/succes?session_id={CHECKOUT_SESSION_ID}` ,
            cancel_url: `${process.env.CORS_ORIGIN}/checkout/cancel`,

        });

        res.json({ url: session.url });
    } catch (error) {
        next(error);
    }
}*/





