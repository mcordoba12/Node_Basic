import { UserDocument, UserModel } from "../models";
import { UserInput } from "../interfaces";

class UserService{
    public async create(userInput: UserInput): Promise<UserDocument> {

        const userExits : UserDocument | null = await this.findByEmail(userInput.email);
        if (userExits !== null) {
            throw new ReferenceError("User already exists");
        }
        
        return UserModel.create(userInput);
    }


    public findByEmail(email: string): Promise<UserDocument | null> {
        return UserModel.findOne({ email });
    }
}

export const userService = new UserService();