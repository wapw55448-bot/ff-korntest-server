const express = require('express');
const app = express();
const PORT = process.env.PORT || 13085;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.all('*', (req, res) => {
    res.status(200).json({
        code: 0,
        msg: "success",
        data: {
            is_emulator: false,
            emulator: 0,
            device_type: "mobile"
        }
    });
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
