import { connectToDB } from "../config/db.connect.js";
import { ObjectId } from "mongodb";

export class UsersRepo {
    constructor() {
        this.collectionName = "users";
    }

    async getCollection() {
        const db = await connectToDB();
        return db.collection(this.collectionName);
    }

    async getUsers(filters = {}) {
        try {
            const collection = await this.getCollection();
            return await collection.find(filters).toArray();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Database error');
        }
    }

    async getUserByID(id) {
        try {
            const collection = await this.getCollection();
            const objectId = new ObjectId(id);
            return await collection.findOne({ _id: objectId });
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new Error('Database error');
        }
    }

    async createUser(user) {
        try {
            const collection = await this.getCollection();
            return await collection.insertOne(user);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Database error');
        }
    }

    async updateUser(id, update) {
        try {
            const collection = await this.getCollection();
            const objectId = new ObjectId(id);
            return await collection.updateOne(
                { _id: objectId },
                { $set: update },
            );
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Database error');
        }
    }

    async deleteUser(id) {
        try {
            const collection = await this.getCollection();
            const objectId = new ObjectId(id);
            return await collection.deleteOne({ _id: objectId });
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Database error');
        }
    }
}
