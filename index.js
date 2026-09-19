const express = require('express');
const app = express();
const PORT = process.env.PORT || 13085;

app.use(express.json());

// ปลดล็อก CORS ให้เกมยิงผ่านทุกช่องทาง
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// ส่งค่ากลับครอบคลุมทุกโครงสร้างที่ Free Fire ต้องการ
app.all('*', (req, res) => {
    res.status(200).json({
        status: "success",
        code: 200,
        result: 0,
        is_emulator: false,
        emulator: false,
        device_type: "mobile"
    });
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});


