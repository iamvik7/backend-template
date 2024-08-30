const Db = require("../../../../brain/utils/db");
const { USER_ROLES } = require("../../../../brain/utils/enums");
const { generateToken } = require("../../../../brain/utils/generateToken");
const { COLLECTION_NAMES } = require("../../../../brain/utils/modelEnums");
const {
  serverErrorResponse,
  badRequestResponse,
  successResponse,
  notFoundResponse,
  alreadyExists,
  cookieResponse,
} = require("../../../../brain/utils/response");
const { userSchema } = require("../../../joi/v1/User");

exports.register = async (req, res) => {
  const session = await Db.mongoose.startSession();
  await session.startTransaction();
  try {
    const valid = userSchema.registervalidator.validate(req.body, {
      abortEarly: true,
    });
    if (valid.error) {
      await session.abortTransaction();
      await session.endSession();
      return badRequestResponse({
        res,
        error: valid.error.message,
      });
    }
    const { firstname, lastname, phone, email, password } = req.body;

    const [user, userError] = await Db.fetchOne({
      collection: COLLECTION_NAMES.USERMODEL,
      query: { email },
    });

    if (userError) {
      await session.abortTransaction();
      await session.endSession();
      return serverErrorResponse({
        res,
        message: "Error while registering user.",
        error: addUserError,
      });
    }

    if (user) {
      await session.abortTransaction();
      await session.endSession();
      return alreadyExists({
        res,
        message: "user with email already exists.",
      });
    }

    const [addUser, addUserError] = await Db.create({
      collection: COLLECTION_NAMES.USERMODEL,
      body: {
        firstname,
        lastname,
        phone,
        email,
        password,
        role: USER_ROLES.USER,
      },
      session,
    });

    if (addUserError) {
      await session.abortTransaction();
      await session.endSession();
      return serverErrorResponse({
        res,
        message: addUserError,
        error: "Error while registering User",
      });
    }

    await session.commitTransaction();
    await session.endSession();
    return successResponse({
      res,
      message: "Account successfully registered!",
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return serverErrorResponse({
      res,
      message: "Error while creating register",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let query;

    if(!email || !password) {
      return badRequestResponse({
        res,
        message: "Email and password is required!"
      })
    }
    // Determine if the email is a phone number or an email
    if (/^\d+$/.test(email)) {
      if (email.length !== 10) {
        return badRequestResponse({
          res,
          message: "Only 10 digit numbers are allowed!",
        });
      }
      // If the email is numeric, treat it as a phone number
      query = { phone: email };
    } else {
      // Otherwise, treat it as an email
      query = { email: email };
    }

    // Fetch user based on email
    const [user, fetchError] = await Db.fetchOne({
      collection: COLLECTION_NAMES.USERMODEL,
      query,
    });

    if (fetchError) {
      return serverErrorResponse({
        res,
        message: fetchError,
        error: "Error while logging in!",
      });
    }

    if (!user) {
      return notFoundResponse({
        res,
        message: `${email}: is not registered with us!`,
      });
    }

    // Verify password
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return badRequestResponse({
        res,
        message: "You have entered an incorrect password",
      });
    }

    const dataLogin = await user.jwtGenerateToken();

    const dataL = {
      token: dataLogin,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    };

    // Successful login
    return cookieResponse({
      res,
      data: dataL,
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: error.message,
      error: "Error while logging in!",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // Clear the authentication token cookie
    if (req.cookies) {
      res.clearCookie("token");
    }
    // Send a success response
    return successResponse({
      res,
      message: "Successfully logged out!",
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      message: "Logout failed. Please try again.",
      error: error.message,
    });
  }
};
