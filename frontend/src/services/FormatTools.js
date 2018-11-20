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

import React from 'react';
import {Link} from "react-router-dom";
import AppConstants from '../AppConstants';

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
 * Format the due date of a payment
 * @param {String} date the date to be formatted
 */
const formatDueDate = (date) => {
  if (date) {
    const formatted = new Date(parseInt(date.substr(0, 4), 10), parseInt(date.substr(5, 7), 10)-1, parseInt(date.substr(8, 10), 10));
    const soon = formatted - new Date() < 86400000;
    if (soon)
      return <p className='text-danger'>{date}</p>
    return <p>{date}</p>;
  }
  return null;
}

/**
 * Create a small table mapping users to their ownership percentage of an item
 * @param {map} ownership map of users to their percentage ownerships
 * @param {double} price the price of the shared item
 * @param {string} ownerHeader the header of the second column
 */
const formatOwnership = (ownership, price, ownerHeader) => {
  if (ownership && price) {
    let data = [];
    Object.keys(ownership).forEach((key) => {
      data.push([key, ownership[key]])
    })
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>{ownerHeader}</th>
            <th></th>
          </tr>
          {data.map((owner) => {
            return (
              <tr key={owner[0]}>
                <td><Link to={AppConstants.PATH_USER_SHOW + '/' + owner[0]}>{owner[1].ownerName}</Link></td>
                <td>{owner[1].percentage}%</td>
                <td>({formatPrice(0.01 * owner[1].percentage * price)})</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
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

/**
 * Validate the fields for a recurring payment
 * @param {React.Component} self the react component being validated
 */
const validateRecurringPaymentData = (name, paymentAmount, owners, self) => {
  let { validField } = self.state;
  let valid = true;
  if (name === "") {
    validField.name = false;
    valid = false;
  } else {
    validField.name = true;
  }
  if (paymentAmount === '') {
    validField.paymentAmount = false;
    valid = false;
  } else {
    validField.paymentAmount = true;
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

/**
 * Convert a payment cycle from the API to the type for a dropdown
 * @param {String} paymentCycle is the paymentCycle string from the payment object
 */
const convertPaymentCycleToType = (paymentCycle) => {
  if (paymentCycle === "MONTHLY") return "Monthly";
  if (paymentCycle === "YEARLY") return "Yearly";
  return "Every X days";
}

/**
 * Convert a dropdown value for payment cycle to the raw type
 * @param {String} paymentCycleType is the paymentCycleType from the dropdown
 */
const convertPaymentCycleTypeToRaw = (paymentCycleType) => {
  if (paymentCycleType === "Monthly") return "MONTHLY";
  if (paymentCycleType === "Yearly") return "YEARLY";
  return "FIXED_DAYS";
}

export {
  formatPrice,
  formatDueDate,
  formatOwnership,
  validateItemData,
  validateRecurringPaymentData,
  convertPaymentCycleToType,
  convertPaymentCycleTypeToRaw
};
