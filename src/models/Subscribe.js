import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  type: {
    type: String,
    enum: ['none','monthly', 'yearly'],
    required: true,
    default:"none",
  },
  title:{
    type: String,
    required:true,
    default:"No Subscription",
  },
  price:{
    type:String,
    required:true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Subscription =mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
