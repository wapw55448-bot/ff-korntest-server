const express = require('express');
const axios = require('axios');

const app = express();

// รองรับข้อมูลทุกประเภทที่ส่งมาจากตัวเกม
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: '*/*' }));

// เซิร์ฟเวอร์หลักของ Garena สำหรับ Config / Login
const GARENA_OFFICIAL_URL = 'https://clientoption.freefiremobile.com';

app.all('*', async (req, res) => {
    try {
        const targetUrl = `${GARENA_OFFICIAL_URL}${req.originalUrl}`;

        // ดึง Headers และตัด Host เดิมออก
        const headers = { ...req.headers };
        delete headers.host;

        // ดึงข้อมูลส่งต่อไปยัง Garena Official
        const response = await axios({
            method: req.method,
            url: targetUrl,
            headers: headers,
            data: req.body,
            validateStatus: () => true // รับทุกสถานะ HTTP Status Code
        });

        let responseData = response.data;

        // ดักแก้ค่า Emulator Flags ใน Response
        if (typeof responseData === 'object' && responseData !== null) {
            if ('is_emulator' in responseData) responseData.is_emulator = false;
            if ('emulator' in responseData) responseData.emulator = false;
            if ('is_pc' in responseData) responseData.is_pc = false;
        } else if (typeof responseData === 'string') {
            responseData = responseData
                .replace(/"is_emulator"\s*:\s*true/g, '"is_emulator":false')
                .replace(/"emulator"\s*:\s*true/g, '"emulator":false')
                .replace(/"is_pc"\s*:\s*true/g, '"is_pc":false');
        }

        // ส่ง Response จริงจาก Garena กลับไปที่ตัวเกม
        res.status(response.status).send(responseData);
    } catch (error) {
        console.error('Proxy Error:', error.message);
        res.status(500).send('Proxy Connection Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Free Fire Proxy Server Running on Port ${PORT}`);
});

