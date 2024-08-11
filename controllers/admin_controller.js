const Order=require('../models/order_model')
const Outlet=require('../models/outlet_model')

exports.orderAggregate=async (req,res)=>{
    try{
        const data = await Order.aggregate([
            {
              $match: {} // You can add any filtering criteria here
            },
            {
              $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                ordersPending: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
                  }
                },
                ordersCompleted: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
                  }
                },
                totalAmtCollected: {
                    $sum: {
                      $cond: [
                        { $eq: ["$status", "completed"] },
                        { $toDouble: "$amount" }, 
                        0
                      ]
                    }
                  },

                ordersIntransit: {
                    $sum: {
                      $cond: [{ $eq: ["$status", "intransit"] }, 1, 0]
                    }
                  },
                ordersCancelled: {
                    $sum: {
                      $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0]
                    }
                  }
              }
            }
          ]);
          
        const totalOutlets = await Outlet.countDocuments()
        const result ={
            totalOutlets,
            ...data[0]
        }

        res.status(200).json(result)
     
     }catch (err) {
         
         res
           .status(500)
           .json({ error: "Failed to aggregate orders", details: err.message });
       }
}