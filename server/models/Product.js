import mongoose from "mongoose";

const Schema = mongoose.Schema;



const ProductSchema = new Schema(

    {
        price: {
            type: Number,
            currency: "USD",
            get: (v) => v/100
        },
        expense: {
            type: Number,
            currency: "USD",
            get: (v) => v/100
        },
        transaction: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
        },
      ],
    },
    { toJSON: { getters: true}, timestamps: true}

);

const Product = mongoose.model("Product" ,ProductSchema);

export default Product;