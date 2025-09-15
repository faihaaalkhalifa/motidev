// استيراد المكتبات والوحدات
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('../utils/handlerFactory');
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getMyPoint = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('point');
  if(!user) { 
    return res.status(404).json({ message: "User not found" }); 
  }
  res.json({
    success: true,
    point: user.point
  })
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.point) {
    return next(
      new AppError(
        'This route is not for password updates or point. Please use /updateMyPassword.',
        400,
      ),
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    //  property update

    'name',
    'email',
    'photo',
    'skiles',
  );
  if (req.file)
    filteredBody.photo = `${req.protocol}://${req.get('host')}/img/users/${
      req.file.filename
    }`;
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: 'success',
  });
});
exports.activeMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: true });
  res.status(200).json({
    status: 'success',
  });
});

exports.createUserNotuse = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};


exports.createUser = factory.createOne(User);

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);


// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.follow = catchAsync(async (req, res, next) => {
  const currentUserId = req.user._id.toString();
  const otherUserId = req.params.id.toString();

  //   تأكيد أن المستخدم لا يمكنه متابعة نفسه
  if (currentUserId === otherUserId) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  const currentUser = await User.findById(currentUserId);
  const otherUser = await User.findById(otherUserId);

  //  التأكد من وجود المستخدمين مشان بركي حذف حسابه باللحظة اللي إجى عبالي أتابعه
  if (!currentUser || !otherUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const isFollowing = currentUser.followings.map(id => id.toString()).includes(otherUserId);

  if (!isFollowing) {
    // المتابعة
    currentUser.followings.push(otherUserId);
    otherUser.followers.push(currentUserId);
    await currentUser.save();
    await otherUser.save();

    //   لجلب معلومات المتابع أو الشخص المتابع
    const populatedUser = await User.findById(otherUserId).select('name photo level');  // حدد الحقول التي تريد جلبها

    return res.status(200).json({
      message: "You have successfully followed the user!",
      followedUser: populatedUser,  // إرجاع معلومات المستخدم الذي تمت متابعته
    });
  } else {
    // إلغاء المتابعة
    currentUser.followings = currentUser.followings.filter(id => id.toString() !== otherUserId);
    otherUser.followers = otherUser.followers.filter(id => id.toString() !== currentUserId);
    await currentUser.save();
    await otherUser.save();

    // إرجاع نفس الرسالة مع البيانات المحدثة
    return res.status(200).json({
      message: "You have successfully unfollowed the user!",
    });
  }
});

exports.getFollowings = catchAsync(async (req, res, next) => {
  const currentUserId = req.user._id.toString();
  // العثور على المستخدم الحالي
 
  const currentUser = await User.findById(currentUserId)
     .populate('followings', 'name photo level'); // هنا نستخدم populate لجلب بيانات المتابعين

     // التأكد من أن المستخدم موجود
  if (!currentUser) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
  
    followings: currentUser.followings,  // معلومات المتابعين الذين تتابعهم

  });
});

exports.getFollowers = catchAsync(async (req, res, next) => {
  const currentUserId = req.user._id.toString();
  // العثور على المستخدم الحالي
 
  const currentUser = await User.findById(currentUserId)
     .populate('followers', 'name photo level');
     // التأكد من أن المستخدم موجود
  if (!currentUser) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
  
    followers: currentUser.followers,  // معلومات المتابعين الذين يتابعوني

  });
});