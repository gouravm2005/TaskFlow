import mongoose, { connect } from 'mongoose'

const ConnectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("Mongodb connected"))
  .catch(err => console.log(err))
}

export default ConnectDB;