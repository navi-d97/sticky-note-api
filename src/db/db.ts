const connectionString = "mongodb+srv://dbUser:RzoehbqgcTqN0Zjz@cluster0.jlac4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const dbName = 'stickyNotes'

import mongoose, { Document, Schema } from 'mongoose';

mongoose.plugin((schema: Schema) => {
  schema.set('toJSON', {
    virtuals: true,
    transform(doc: unknown, ret: Document) {
      delete ret._id;
    },
  });
});

const connectToMongoDB = (): any => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useNewUrlParser', true,);
    mongoose.set('useUnifiedTopology', true);
    const connection = mongoose.createConnection(connectionString);
    connection.on('error', () => {
      process.exit(0);
    });
    return connection;
  };
  const connection = connectToMongoDB();
  const db = connection.useDb(dbName, { useCache: true });
  export default db;