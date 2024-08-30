const Db = require("../../../../../brain/utils/db");
const { USER_ROLES } = require("../../../../../brain/utils/enums");
const { COLLECTION_NAMES } = require("../../../../../brain/utils/modelEnums");
const {
  serverErrorResponse,
  unprocessableEntityResponse,
  notFoundResponse,
  successResponse,
} = require("../../../../../brain/utils/response");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getAllUsers = async (req, res) => {
  try {
    
    const [users, usersError] = await Db.fetchAll({
        collection: COLLECTION_NAMES.USERMODEL,
        query: {
          _id: { $ne: new ObjectId(req.user.id) },
          ...(req.user.role === USER_ROLES.ADMIN ? { role: { $ne: USER_ROLES.SUPERADMIN } } : {})
        },
        projection: { __v: 0, password: 0, createdAt: 0, updatedAt: 0 }
      });

    if (usersError) {
      return unprocessableEntityResponse({
        res,
        error: usersError
      });
    }

    if (users.lenth === 0) {
      return notFoundResponse({
        res,
        message: "Unable to find users or no users!",
      });
    }

    return successResponse({
      res,
      data: users,
    });
  } catch (error) {
    return serverErrorResponse({
      res,
      method: req.method,
      url: req.url,
      message: "Error while fetching all users!",
      error: error.message || error,
    });
  }
};
