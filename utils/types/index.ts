import { Document } from "mongoose";

export interface User extends Document {
  address: string;
  username: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}