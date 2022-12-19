import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class UserService {
    public async doesUserExist(userId: string): Promise<boolean> {
        const url = process.env.USERS_API_HOST || "http://localhost:4000";
        
        try {
            await axios.get(`${url}/users/${userId}`);
        } catch (error) {
            return false;
        }

        return true;
    }
}
