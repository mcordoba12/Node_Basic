import bcrypt from "bcrypt"; 
import { UserDocument, UserModel } from "../models";
import { UserInput,  UserInputUpdate} from "../interfaces";
import { UserLogin } from './../interfaces/user.interface';


class UserService{
    public async create(userInput: UserInput): Promise<UserDocument> {


        const userExits : UserDocument | null = await this.findByEmail(userInput.email);
        if (userExits !== null) {
            throw new ReferenceError("User already exists");
        }

        if( userInput.password){
            //const secret : string =  process.env.SECRET || "";
            userInput.password = await bcrypt.hash(userInput.password, 10);
        }
        
        return UserModel.create(userInput);
    }


    public findByEmail(email: string): Promise<UserDocument | null> {
        return UserModel.findOne({ email });
    }


    public async update(id: string, userInput: UserInputUpdate): Promise <UserDocument | null>{
        try{
            const  user : UserDocument | null = await UserModel.findByIdAndUpdate({_id : id}, userInput, {returnOriginal : false})    
            return user;
        }catch(error){
            throw error;
        }
        
    }

    public async getAll(): Promise <UserDocument[] | null>{
        return  UserModel.find();
    }


    public getByID(id:string): Promise <UserDocument | null>{
        return  UserModel.findById(id);
    }

    public async delete(id: string): Promise <UserDocument | null>{
        try {
            const  user : UserDocument | null = await UserModel.findByIdAndDelete({_id : id}); 
            return user;
        } catch (error) {
            throw error;

        }
    }

    public async login(userLogin : UserLogin): Promise<UserDocument | undefined>{
        const userExits : UserDocument | null = await this.findByEmail(userLogin.email);
        if (userExits == null) {
            throw new ReferenceError("Not Authorizad");
            
        }

        return userExits;
    }


}

export const userService = new UserService();