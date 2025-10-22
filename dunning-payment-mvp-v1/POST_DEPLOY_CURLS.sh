# Curl tests
# 1. Health
curl -X GET http://localhost:4000/api/health

# 2. Create customer
curl -X POST http://localhost:4000/api/customers -H "Content-Type: application/json" -d '{"stripe_customer_id":"cus_test_1","email":"test@example.com","name":"Test User"}'

# 3. Create invoice
curl -X POST http://localhost:4000/api/invoices -H "Content-Type: application/json" -d '{"stripe_invoice_id":"inv_test_1","stripe_customer_id":"cus_test_1","amount_due":5000,"status":"open"}'

# 4. List invoices
curl -X GET http://localhost:4000/api/invoices

# 5. Simulate webhook (payment failed)
curl -X POST http://localhost:4000/api/webhook -H "Content-Type: application/json" -d '{"id":"evt_1","type":"invoice.payment_failed","data":{"object":{"id":"inv_test_1","amount_due":5000}}}'