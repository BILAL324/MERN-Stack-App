const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Failed to connect to the database', err);
  process.exit();
});
