const USER_ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  USER: "user",
};

const RBAC_ACTIONS = {
  CREATE_ANY: "createAny",
  CREATE_OWN: "createOwn",
  READ_ANY: "readAny",
  READ_OWN: "readOwn",
  UPDATE_ANY: "updateAny",
  UPDATE_OWN: "updateOwn",
  DELETE_ANY: "deleteAny",
  DELETE_OWN: "deleteOwn",
};

const RBAC_RESOURCES = {
  USER: "user",
  //   PRODUCT: "product",
  //   CATEGORY: "category",
  //   ADDRESS:'address',
  //   CLIENT:"client",
  //   LIVE: 'live',
  //   CATEGORY: 'category',
  //   DASHBOARD:'dashboard',
  //   PLAN:"plan",
};

module.exports = {
  USER_ROLES,
  RBAC_ACTIONS,
  RBAC_RESOURCES,
};
