//custom server to create api
const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;

app.use(express.json());

app.use(cors());

//custom transaction data set
const transactions = [
    { customerId: 1, Date: '2024-08-01', Amount: 100 },
    { customerId: 2, Date: '2024-08-10', Amount: 250 },
    { customerId: 3, Date: '2024-08-15', Amount: 75 },
    { customerId: 1, Date: '2024-09-01', Amount: 120 },
    { customerId: 2, Date: '2024-09-05', Amount: 200 },
    { customerId: 3, Date: '2024-09-20', Amount: 300 },
    { customerId: 1, Date: '2024-10-02', Amount: 50 },
    { customerId: 2, Date: '2024-10-07', Amount: 400 },
    { customerId: 3, Date: '2024-10-09', Amount: 150 },
]

//api to send transactions data
app.get('/api/transactions', (req, res) => {
    res.json(transactions);
})

app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`);
})