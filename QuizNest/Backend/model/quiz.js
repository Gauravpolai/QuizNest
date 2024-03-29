const mongoose= require("mongoose")

const quizschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the event"],
    },
    description: {
        type: String,
        required: [true, "Please enter the description of the event"],
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
   startTime: {
       type: Date,
       required: [true, "Please provide the start time!"],
   },
   endTime: {
       type: Date,
       required: [true, "Please provide the date!"],
   },
   duration: {
    type: Number,
    required: [true, "No. of minutes required(duration)"]
   },
   published:{
    type: Boolean,
    default: false
   } 
})

// Cascade delete courses when a bootcamp is deleted
quizschema.pre('remove', async function(next) {
    await this.model('Question').deleteMany({ quiz: this._id });
     await this.model('Register').deleteMany({ quiz: this._id });
    next();
});

module.exports = mongoose.model("Quiz", quizschema)