import mongoose, { Connection, Model } from "mongoose";
import { userSchema } from "./schemas";

let connection: Connection | null = null;

/**
 * @see https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel
 * @see https://mongoosejs.com/docs/lambda.html
 */
export const getConnection = async (): Promise<Connection> => {
  if (connection === null) {
    /* istanbul ignore next */
    const uri = process.env.MONGO_URI ?? "mongodb+srv://kazama-nft-api:X33ZASGgnBjuKbWX@cluster0.iplwndz.mongodb.net/PROFILE?retryWrites=true&w=majority";
    connection = mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });

    await connection;
    connection.model("User", userSchema);
  }

  console.log('Connection SUCCESSFULL ..');
  return connection;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getModel = async (name: string): Promise<Model<any>> => {
  connection = await getConnection();

  return connection.model(name);
};
