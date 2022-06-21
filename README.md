# Csv-MySQL

A script to auto import csv data into a SQL table (Billing)

Setup:

- Create tables in localhost following the same format of: billing.fulfilment_default_price_lists (remove id), billing.shipping_service_codes, billing.regions,billing.shipping_service_codes. 

- USE DDL in table inspector if need be to create the tables. To insert into fulfilment_default_price_lists the other tables are needed due to foregin key checks. 

- Ensure the Shipping_service_code that is in your CSV file is in billing.Shipping_service_code.

- npm install --save express mysql csvtojson
- Install npm install --save-dev

Ensure your CSV is in the same format as example DHL.csv. If your CSV has different column names, change those to

node index.js
