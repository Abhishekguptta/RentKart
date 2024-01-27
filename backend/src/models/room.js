import Mongoose from 'mongoose';
const { Schema, model } = Mongoose;

const RoomSchema = new Schema({
  name: { type: String, required: true, trim: true},
  city: { type: String, required: true, trim: true },
  rental_price: { type: Number, required: true },
  nearby_amenities: [{ type: String }],
  address: { type: String, required: true, trim: true },
  description: { type: String },
  total_bhk: {
    type: Number, 
    required: true,
    validate(value) {
      if(value < 1) throw new Error("Enter valid size");
    }
  },
  landlord_id: { type: String, required: true },
  tenant_ids: [{ type: String }],
  room_photos: { type: Buffer},
  furnished: { type: String, required: true },
  security_deposit: { type: String },
  landlord_contact_no:  {type: Number, required: true },
  for_whom: {type: String}
})

const Room = model('Room', RoomSchema);

export default Room;