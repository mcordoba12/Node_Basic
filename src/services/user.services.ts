import { UserDocument, UserModel } from "../models";
import { UserInput } from "../interfaces";

class UserService{
    public create(userInput: UserInput): Promise<UserDocument> {
        return UserModel.create(userInput);
    }
}

export const userService = new UserService();