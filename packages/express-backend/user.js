import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function(email){
            const calPolyEmailPattern = /^[^\s@]+@calpoly\.edu$/;
            return calPolyEmailPattern.test(email)
        },
        message: props => `${props.value} is not a valid email address`
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 8)
          throw new Error("Invalid job, must be at least 2 characters.");
      },
    },
  },
  { collection: "Login" }
);

const User = mongoose.model("User", UserSchema);

export default User;