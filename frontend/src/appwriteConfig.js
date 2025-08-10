// src/appwriteConfig.js
import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // ✅ your Appwrite endpoint
  .setProject("683c2b91000df43f458e");              // ✅ your project ID from Appwrite console

const account = new Account(client);

export { account, ID };
