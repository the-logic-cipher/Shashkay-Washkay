const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require('../models/userModel')
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto")

//register user 

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'sample_id',
            url: 'sample_url',
        },
    })

    sendToken(user, 201, res )
})

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & password",400))
    }

    const   user = await User.findOne({ email }).select()

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    const isPasswordMatched = user.comparePassword(password)


    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    sendToken(user, 200, res )
    })


    //logout

    exports.logout = catchAsyncErrors(async(req,res,next)=>{

        res.cookie("token", null, {
            expires:new Date(Date.now()),
            httpOnly:true
        })

        res.status(200).json({
            success:true,
            message: "logged out"
        })
    })


//forgot password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{


    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler("user not found", 401))
    }

    //get resetPasswordToken

    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})

     const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

     const message = `Your Password Reset Token is : \n\n ${resetPasswordUrl} \n\nIf you have not requested this email than, ignore it. `

     try {

        await sendEmail({
            email: sendEmail,
            subject: `SHASHKEY WASHKEY PASSWORD RECOVERY`,
            message
        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully.`
        })

        
     } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave: false})

        return next(new ErrorHandler(error.message,500))
        
     }

})

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not password", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res);
  });
  
   //get user detail

   exports.getUserDeatil = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
  })

  // update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  });
  
  // update User Profile
  exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
    // if (req.body.avatar !== "") {
    //   const user = await User.findById(req.user.id);
  
    //   const imageId = user.avatar.public_id;
  
    //   await cloudinary.v2.uploader.destroy(imageId);
  
    //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //   });
  
    //   newUserData.avatar = {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   };
    // }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });

  //get all user --Admin

  exports.getAllUsers = catchAsyncErrors(async (req,res,next)=>{
    const users = await User.find()

    res.status(200).json({
        success:true,
        users,
    })
  })
  //get simngle user --Admin

  exports.getSingleUserAdmin = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.params.id)


    if(!user){
        return next( new ErrorHandler(`User does not Exist ${req.params.id}`,401))
    }

    res.status(200).json({
        success:true,
        user,
    })
  })

  // update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Delete User --Admin
  exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    // const imageId = user.avatar.public_id;
  
    // await cloudinary.v2.uploader.destroy(imageId);
  
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });