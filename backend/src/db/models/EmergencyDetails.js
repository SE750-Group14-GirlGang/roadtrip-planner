import mongoose from 'mongoose';

const { Schema } = mongoose;

const emergencyDetailsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    phoneNumber: String,
    emergencyContact: {
      name: String,
      phoneNumber: String,
      relation: String,
    },
  },
  { collection: 'emergencydetails' }
);

export const EmergencyDetails = mongoose.model('EmergencyDetails', emergencyDetailsSchema);
