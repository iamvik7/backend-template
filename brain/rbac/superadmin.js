const { RBAC_RESOURCES } = require("../utils/enums");

module.exports = {
  [RBAC_RESOURCES.USER]: {
    "create:any": ["*"],
    "update:any": ["*"],
    "delete:any": ["*"],
  },
};
