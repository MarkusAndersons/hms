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

/**
 * Format a number into a price
 * @param {number} price the double to be formatted
 */
const formatPrice = (price) => {
  if (price) {
    return '$' + price.toFixed(2);
  }
  return null;
}

/**
 * Validate the fields for an item
 * @param {React.Component} self the react component being validated
 */
const validateItemData = (name, price, owners, self) => {
  let { validField } = self.state;
  let valid = true;
  if (name === "") {
    validField.name = false;
    valid = false;
  } else {
    validField.name = true;
  }
  if (price === '') {
    validField.price = false;
    valid = false;
  } else {
    validField.price = true;
  }
  // Validate percentage ownership
  let total = 0.0;
  Object.keys(owners).forEach((key) =>
    total += Number(owners[key])
  );
  if (Math.abs(total - 100) > 1e-5) {
    validField.ownership = false;
    valid = false;
  } else {
    validField.ownership = true;
  }
  if (!valid) {
    self.setState({validField: validField});
  }
  return valid;
}
export {formatPrice, validateItemData};
