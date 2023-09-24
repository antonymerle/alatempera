import mongoose, { Document, Schema } from "mongoose";

interface IOrderItem {
  line_id: string;
  productType: string;
  productTitle: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  quantity: number;
}

interface IOrder extends Document {
  customerName: string;
  customerEmail: string;
  paymentIntentId: string;
  timestamp: number;
  items: IOrderItem[];
}

// Sous document inclus dans OrderSchema
const OrderItemSchema = new Schema<IOrderItem>({
  line_id: { type: String, required: true },
  productType: { type: String, required: true },
  productTitle: { type: String, required: true },
  amount_discount: { type: Number, required: true },
  amount_subtotal: { type: Number, required: true },
  amount_tax: { type: Number, required: true },
  amount_total: { type: Number, required: true },
  currency: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  paymentIntentId: { type: String, required: true },
  timestamp: { type: Number, required: true },
  items: { type: [OrderItemSchema], required: true },
});

// Prevent error "Cannot overwrite model once compile" from Mongoose
// const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
// const OrderModel =
//   mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
