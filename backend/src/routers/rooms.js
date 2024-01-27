import { Router } from "express";

import Room from "../models/room.js";
import auth from '../middleware/auth.js'
import User from '../models/user.js'

const router = new Router();

// const upload = multer({
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if(!file.originalname.match(/\.(jpeg|png|svg|jpg)$/)){
//       return cb(new Error("File must be jpeg, jpg, svg or png only"))
//     }
//     cb(undefined, true)
//   }

// })



// api for filtering rooms
router.get('/rooms-list',async(req,res)=>{
  try{
    let obj = {}
    if(req.query.rental_price){
        obj.rental_price=req.query.rental_price
    }
    if(req.query.city){
        obj.city=req.query.city
    }
    if(req.query.total_bhk){
        obj.total_bhk=req.query.total_bhk
    }
    if(req.query.furnished){
        obj.furnished=req.query.furnished
    }
    const room =await Room.find(obj)

    if(!room){
        throw new Error()
    }
    res.status(201).send({
      success: true,
      data: room,
      error: null,
    })
  } catch(error){
    res.status(404).send({
      success: false,
      error: error.message,
    })
  }
})

// api for filtering rooms
router.get('/room',async(req,res)=>{
  try{
    let { page, size, sort } = req.query;
      let obj = {}
      if(req.query.rental_price){
          obj.rental_price={$lte:req.query.rental_price}
      }
      if(req.query.city){
          obj.city=req.query.city
      }
      if(req.query.total_bhk){
          obj.total_bhk=req.query.total_bhk
      }
      if(req.query.furnished){
          obj.furnished=req.query.furnished
      }
      if (!page) {
        page = 1;
      }
      if(!size) {
        size = 10;
      }
      const limit = parseInt(size);
      const room =await Room.find(obj).sort({ votes: 1, _id: 1 }).limit(limit)
      if(!room){
          throw new Error()
      }
      res.status(202).send({
        success: true,
        error: null,
        data: {
          page,
          size,
          Info: room,
        }
      })
  } catch(error){
      res.status(404).send({
        success: false,
        error: error.message,
      })
  }
})

// id ->landlord id
router.post('/create-room/:id', auth, async(req, res) => {
  try {
    const _id = req.params.id;
    const room = new Room(req.body);
    const dummyUser =  await User.findById(_id);
    dummyUser.posted_room_ids.push(room._id);

    const user = await User.findByIdAndUpdate(_id,  dummyUser);
    await room.save();
    res.status(201).send({
        success: true,
        data: room,
        error: null,
      });
  } catch(error) {
    res.status(404).send({
      success: false,
      error: error.message,
    })
  }
})

// id--> landlord id
router.get('/posted-rooms/:id', auth, async(req, res) => {
  try {
    const _id = req.params.id;
    const room = await Room.find({})
    const user =  await User.findById(_id);
    const postedRooms = room.filter((item) => user.posted_room_ids.includes(item._id));
    res.status(201).send({
      success: true,
      data: postedRooms,
      error: null,
    })
  } catch(error) {
    res.status(404).send({
      success: false,
      error: error.message,
    });
  }
})


//id -> room id
router.patch('/update-room/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;

    const room = await Room.findByIdAndUpdate(_id, req.body, { new: true, runValidators:true })
    if(!room) {
      return res.status(404).send({
        success: false,
        error: "No such room found",
      })
    }
    return res.status(201).send({
      success: true,
      data: room,
      error: null,
    });
  } catch(error) {
    res.status(404).send({
      success: false,
      error: error.message || "Updation failed",
    })
  }
})

//GET...to read data per room
router.get('/all-rooms', (req, res) => {
  Room.find({}).then((rooms) => {
      res.send(rooms)
  }).catch((e) => {
      res.status(500).send(e)
  })
})
//GET individual room data using id....

router.get('/room/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const room = await Room.findById(_id)
    if (!room) {
      res.status(404).send({
        success: false,
        error: "No such room found"
      })
    }

    res.status(201).send({
      success: true,
      data: room,
      error: null,
    })
  } catch(error) {
      res.status(404).send()
  }})

router.delete("/delete-room/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const room = await Room.findByIdAndDelete(_id);
    if(room) {
    const user = await User.findById(room.landlord_id);
    const updatedRoomList = user.posted_room_ids.filter((id) => id!==_id)
    await User.findByIdAndUpdate((room.landlord_id), {posted_room_ids: updatedRoomList})
    }
    res.status(200).send({
      success: "true",
      data: "Deleted room successfully",
      error: null,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: error.message,
    });
  }
})

//id for the room
// router.post('/room/images/:id', upload.single('roomImgs'), async (req, res) => {
//   const _id = req.params.id; 
//   const room = await Room.findById(_id)

//   room.room_photos = req.file;

//   const updateRoom = await Room.findByIdAndUpdate(_id, room)

//   res.status(201).send({
//     success: true,
//   });
// }, (error, req, res, next)=> {
//   res.status(401).send({error: error.message})
// })

// router.delete('/room/images/:id', async (req, res) => {
//   const _id = req.params.id; 
//   const room = await Room.findByIdAndUpdate(_id, {room_photos: undefined})
//   res.status(201).send({
//     success: true,
//   });
// }, (error, req, res, next)=> {
//   res.status(401).send({error: error.message})
// })

// router.get('/room/images/:id', async(req, res) => {
//   try {


//   } catch(error) {
//     res.status(404)
//   }
// })

router.post("/shortlist/room/:id", auth, async(req, res) => {
  try {
    const _id = req.params.id;
    const room = await Room.findById(_id);
    const tenant = await User.findById(req.body.userId);
    const landlord = await User.findById(room.landlord_id);

    const isShortlisted = room.tenant_ids.includes(req.body.userId);
    let updatedTenantIds =[], applicantantIds=[], interestedRoomIds=[];
    var response = true;
    if(isShortlisted) {
      updatedTenantIds = room.tenant_ids.filter((ids) => ids!== req.body.userId)
      applicantantIds = landlord.room_applicant_ids.filter((ids) => ids!== req.body.userId);
      interestedRoomIds = tenant.interested_room_ids.filter((ids) => ids!==_id)
      response=false;
    }
    else {
       updatedTenantIds = [...room.tenant_ids, req.body.userId];
       applicantantIds = [...landlord.room_applicant_ids, req.body.userId];
       interestedRoomIds = [...tenant.interested_room_ids, _id];
    }
     await Room.findByIdAndUpdate(_id, {tenant_ids: updatedTenantIds});
     await User.findByIdAndUpdate(room.landlord_id, {room_applicant_ids: applicantantIds});
     await User.findByIdAndUpdate(req.body.userId, {interested_room_ids: interestedRoomIds});

      res.status(201).send({
        success: true,
        data: response,
        error: null,
      })
  } catch(error) {
    res.status(404).send({
      success: false,
      error: error.message,
    })
  }
})


export default router;