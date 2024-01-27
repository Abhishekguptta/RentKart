import Mongoose from 'mongoose'
const { connect } = Mongoose;

connect('mongodb://127.0.0.1:27017/rentkart', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})