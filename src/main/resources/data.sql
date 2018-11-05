-- Create test users
INSERT INTO users (id, email, first_name, surname, phone, username, password)
VALUES ('676DF5C1-2243-4B4C-B1F7-07266BF9AC22', 'test@test.com', 'Default', 'User', '+614000000000', 'admin', '$2a$10$5UFZYUnDrmQ9jM0.8m1Ma.WuRIr8pYd6gbBPvbV2kM9uyJ3YLlkBe');

INSERT INTO users (id, email, first_name, surname, phone, username, password)
VALUES ('D30D3AF2-FC13-4934-88B5-6940788B46C2', 'markus@test.com', 'Markus', 'Andersons', '+614000000001', null, null);

-- Create test item
INSERT INTO shared_item (id, name, notes, price)
VALUES ('6FACE8D6-ADD7-4C17-B1D8-54E24962850D', 'Dining Table', 'Purchased on 01/12/17', 699.95);


-- Create ownerships
INSERT INTO ownership (id, percentage, shared_item_id, user_id)
VALUES ('62961E1A-E162-4E9C-B1A1-B605062B91C6', 40, '6FACE8D6-ADD7-4C17-B1D8-54E24962850D', '676DF5C1-2243-4B4C-B1F7-07266BF9AC22');

INSERT INTO ownership (id, percentage, shared_item_id, user_id)
VALUES ('0517A545-1AAE-458F-A40B-68F7209E8911', 60, '6FACE8D6-ADD7-4C17-B1D8-54E24962850D', 'D30D3AF2-FC13-4934-88B5-6940788B46C2');


-- Create test recurring payment
INSERT INTO recurring_payment (id, name, next_payment_date, notes, payment_cycle, payment_days)
VALUES ('312866D7-0628-4E8C-A45D-37C1BE7DAB7C', 'Rent', now(), 'Payment to be made by person X', 0, null);

-- Create Payment Arrangements
INSERT INTO payment_arrangement (id, percentage, recurring_payment_id, user_id)
VALUES ('1ECEB16B-8F86-410F-BC75-7F0DA2CDDAD3', 50, '312866D7-0628-4E8C-A45D-37C1BE7DAB7C', '676DF5C1-2243-4B4C-B1F7-07266BF9AC22');

INSERT INTO payment_arrangement (id, percentage, recurring_payment_id, user_id)
VALUES ('69A9C4B6-8F44-4331-B1A5-A49512388C5D', 50, '312866D7-0628-4E8C-A45D-37C1BE7DAB7C', 'D30D3AF2-FC13-4934-88B5-6940788B46C2');
