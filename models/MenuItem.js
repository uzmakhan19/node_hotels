import mongoose, { model, Schema } from 'mongoose'

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['Spicy', 'Sweet', 'Sour', 'Bitter', 'Salty'],
        required: true
    },
    isDrink: {
        type: Boolean,
        default: false
    },
    ingrdients: {
        type: [String],
        required: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuSchema);

export default MenuItem;