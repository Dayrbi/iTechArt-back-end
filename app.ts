const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./routes/auth.routes.ts');

const app = express();

const PORT = config.get('port') || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/auth', auth);

async function Start() {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (e) {
    let errorMessage = 'Failed to do something';
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    console.log('Server is not work', errorMessage);
    process.exit(1);
  }
}
Start();