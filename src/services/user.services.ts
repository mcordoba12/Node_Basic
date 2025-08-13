import bcrypt from "bcrypt"; 
import { UserDocument, UserModel } from "../models";
import { UserInput,  UserInputUpdate} from "../interfaces";
import { UserLogin } from './../interfaces/user.interface';
import jwt from "jsonwebtoken";

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


    public findByEmail(email: string, password: boolean = false): Promise<UserDocument | null> {
        
        return UserModel.findOne({ email }, {password});
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

    public async login(userLogin : UserLogin): Promise<any>{
        const userExits : UserDocument | null = await this.findByEmail(userLogin.email, true);
        if (userExits == null) {
            throw new ReferenceError("Not Authorizad");
            
        }
        const isMatch: boolean = await bcrypt.compare(userLogin.password, userExits.password);
        if (!isMatch) {
            throw new ReferenceError("Invalid data")
        }

        return {
            id : userExits.id,
            roles:["admin"],
            token: this.generateToken(userExits.id)

        };
    }

    public async generateToken(id: string): Promise<string>{
        const user = await this.getByID(id);

        if (user == null) {
            throw new Error();
            
        }

        return jwt.sign(
            user,
            "secret_key",
            {expiresIn: "10m"}
        );
    }



}

export const userService = new UserService();