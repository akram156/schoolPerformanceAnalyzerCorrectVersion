const Licence = require("../models/Licence");
const User = require("../models/User");
const sendVerificationEmail = require("../utils/SendVerificationEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, licence } = req.body;

//     const foundUser = await User.findOne({ email });
//     if (foundUser) {
//       if (foundUser.isVerified) {
//         return res.status(400).json({
//           error: "لقد سجلت بهداالايمايل من قبل",
//         });
//       }
//     }
//     const foundLicence = await Licence.findOne({ licenceKey: licence });
//     if (!foundLicence || foundLicence.isActive) {
//       return res.status(400).json({
//         error: "الرخصة غير موجودة او مستعلمة من قبل ",
//       });
//     }

//     const saltRound = 10;
//     const hashPassword = await bcrypt.hash(password, saltRound);
//     const code = Math.floor(100000 + Math.random() * 900000).toString(); //!new
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashPassword,
//       code, //!new
//       isVerified: false,
//       licence: foundLicence._id,
//     });
//     await newUser.save();
//     await sendVerificationEmail(email, code);
//     // const token = jwt.sign(
//     //   {
//     //     id: newUser._id,
//     //   },
//     //   process.env.SECRET_KEY,
//     //   { expiresIn: "2h" },
//     // );
//     // foundLicence.isActive = true;
//     // foundLicence.activatedAt = new Date();
//     // await foundLicence.save();
//     return res.status(200).json({
//       msg: "قم بالتحقق من بريدك الالكتروني",
//       token,
//     });
//   } catch (error) {
//     console.log("error: ", error);
//     res.status(500).json({
//       error: "خطا في التسجيل حاول مجددا",
//     });
//   }
// };
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      licence,
    } = req.body;

    // Check if user already exists
    const foundUser = await User.findOne({ email });

    // User already exists
    if (foundUser) {

      // Already verified → reject registration
      if (foundUser.isVerified) {
        return res.status(400).json({
          error: "لقد سجلت بهذا الايمايل من قبل",
        });
      }

      // User exists but is not verified
      // Generate a new code
      const code = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      foundUser.firstName = firstName;
      foundUser.lastName = lastName;
      foundUser.password = await bcrypt.hash(
        password,
        10
      );
      foundUser.code = code;

      await foundUser.save();

      await sendVerificationEmail(
        email,
        code
      );

      return res.status(200).json({
        msg: "قم بالتحقق من بريدك الإلكتروني",
      });
    }

    // Check licence
    const foundLicence = await Licence.findOne({
      licenceKey: licence,
    });

    if (!foundLicence || foundLicence.isActive) {
      return res.status(400).json({
        error: "الرخصة غير موجودة او مستعملة من قبل",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(
      password,
      10
    );

    // Generate verification code
    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      code,
      isVerified: false,
      licence: foundLicence._id,
    });

    await newUser.save();

    // Send verification code
    await sendVerificationEmail(
      email,
      code
    );

    return res.status(201).json({
      msg: "قم بالتحقق من بريدك الإلكتروني",
    });

  } catch (error) {

    console.log("error:", error);

    return res.status(500).json({
      error: "خطأ في التسجيل حاول مجددا",
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "الايمايل او كلمة المرور غير صحيحة",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        error: "كلمة المرور خاطءة",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      },
    );
    res.status(200).json({
      msg: "تم الدخول بنجاح",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: "خطا في الدخول حاول مجددا",
    });
  }
};
