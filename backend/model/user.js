const  mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, 
  },
  role:{
    type: String,
    default:null,
  },
  username:{
    type: String,
    default:null,
  },
  profileURL:{
    type:String,
    default:"1652318743137-default.png"
  },
  about:{
    type:String,
    default:""
  },
  location:{  
    type:String,
    default:"San Jose"
  }
}, { timestamps: true });

UserSchema.pre('save', async function(){
    //const salt = await bcrypt.genSalt(10);
    //this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
};
module.exports = mongoose.model('User',UserSchema)