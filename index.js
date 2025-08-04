const mineflayer = require('mineflayer');
const express = require('express');
const { Vec3 } = require('vec3');

const app = express();
const PORT = process.env.PORT || 3000;

// Web server agar tetap hidup (UptimeRobot / Replit)
app.get('/', (req, res) => {
  res.send('Bot is online!');
});
app.listen(PORT, () => {
  console.log(`Web server aktif di port ${PORT}`);
});

let bot;

function startBot() {
  bot = mineflayer.createBot({
    host: "serverdaffakeren.aternos.me", // IP atau domain server Aternos TANPA :PORT
    port: 63252,                         // Port dari Aternos (harus angka, bukan string)
    username: "BotServer",             // Nama bot kamu (bebas, asal belum dipakai)
    version: "1.20.1"                    // (Opsional) Sesuaikan dengan versi server Aternos
  });

  bot.on('spawn', () => {
    console.log('✅ Bot berhasil masuk ke dunia Minecraft.');
  });

  bot.on('playerJoined', (player) => {
    if (player.username === bot.username) return;
    bot.chat(`Selamat datang, ${player.username}!`);
  });

  bot.on('end', () => {
    console.log('⛔ Bot disconnected. Reconnecting in 5 detik...');
    setTimeout(startBot, 5000); // reconnect otomatis
  });

  bot.on('error', err => {
    console.log('❗ Bot error:', err);
  });

  // Anti-AFK setiap 3 menit
  setInterval(() => {
    if (bot && bot.entity) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
      bot.look(Math.random() * 2 * Math.PI, 0); // lihat ke arah acak
    }
  }, 180000); // 180.000 ms = 3 menit
}

startBot();
