const express = require('express');
const app = express();
const PORT = process.env.PORT || 13085;

app.all('*', (req, res) => {
    // ปลดล็อก CORS และบังคับส่งข้อมูลเป็น Raw JSON เพียวๆ
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    res.send('{"is_emulator":false}');
});

app.listen(PORT, () => {
    console.log('Server is online');
});
