/*
 * Copyright 2018 Markus Andersons
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default Object.freeze({
  // API paths
  API_LOGIN: "/api/login",
  API_USERS_LIST: "/api/users/list",
  API_USERS_CREATE: "/api/users/create",
  API_USERS_USER: "/api/users/user",
  API_ITEMS_LIST: "/api/items/list",
  API_ITEMS_CREATE: "/api/items/create",
  API_ITEMS_ITEM: "/api/items/item",
  API_STATUS: "/status",

  // Paths
  PATH_USER_INDEX: "/users/list",
  PATH_USER_CREATE: "/users/create",
  PATH_USER_SHOW: "/users/show",
  PATH_USER_EDIT: "/users/edit",
  PATH_ITEM_INDEX: "/items/list",
  PATH_ITEM_CREATE: "/items/create",
  PATH_ITEM_SHOW: "/items/show",
  PATH_ITEM_EDIT: "/items/edit",
  PATH_LOGIN: "/login",

  // Constant values
  MAX_AUTH_AGE: 3600000 // Micros
});
