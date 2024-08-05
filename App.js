import express from 'express';
import cors from 'cors';
import Hello from './hello.js';
import Lab5 from './Lab5/index.js';

const app = express();
app.use(cors());
Hello(app);
Lab5(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
