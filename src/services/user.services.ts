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

        console.log(userExits);
        
        return UserModel.create(userInput);
    }


    public findByEmail(email: string, withPassword = false): Promise<UserDocument | null> {
    const q = UserModel.findOne({ email });

    // Siempre trae los campos que necesitas para el token
    if (withPassword) {
        return q.select('+password name email role').exec(); 
    }
    return q.select('name email role').exec();
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
            user: { 
            id : userExits.id,
            email : userExits.email,
            name : userExits.name,
            role: userExits.role,
            } , 
            token: await this.generateToken(userExits)
        };
    }

    public async generateToken(user: UserDocument): Promise<string>{

        if (user == null) {
            throw new Error();
            
        }

        console.log("[generateToken] payload:", {
  id: user.id, email: user.email, name: user.name, role: user.role
});

        return jwt.sign(
            {user:{
                id : user.id,
                email : user.email,
                name: user.name,
                role: user.role
            }} ,
            process.env.SECRET || "secret_key",
            {expiresIn: "10m"}
        );
    }



}

export const userService = new UserService();