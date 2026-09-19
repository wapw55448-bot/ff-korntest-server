const express = require('express');
const app = express();
const PORT = process.env.PORT || 13085;

app.use(express.json());

app.all('*', (req, res) => {
    res.json({
        status: "success",
        is_emulator: false,
        device_type: "mobile"
    });
});

app.listen(PORT, () => {
    console.log('Server is running');
});

