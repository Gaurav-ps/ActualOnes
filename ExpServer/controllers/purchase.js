const Razorpay = require('razorpay')
const Order = require('../models/orders')

const purchasepremium = async(req,res,next) => {
    try{
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err){
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(200).json({order, key_id: rzp.key_id})
            })
            .catch(err => {
                throw new Error(err)
            })
        })
    }
    catch(err){
        console.log(err)
        res.status(403).json({success: false, message:'Somethig went wrong'})
    }
}

const updateTransactionStatus = async(req,res,next) => {
    try{
        const {payment_id, order_id} = req.body;
        Order.findOne({where: {orderid: order_id}}).then(order => {
            order.update({paymentid: payment_id, status:'SUCCESSFUL'}).then(()=>{
                req.user.update({ispremiumuser: true}).then(() => {
                    return res.status(202).json({success: true, message:'Transaction completed successfully'})
                }).catch((err)=>{
                    throw new Error(err)
                })
            }).catch((err)=>{
                throw new Error(err)
            })
        }).catch((err)=>{
            throw new Error(err)
        })
    }
    catch(err){
        console.log(err)
        res.status(403).json({success: false, message:'Somethig went wrong'})
    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}