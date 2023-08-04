import { connectDB } from "@/libs/database";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider  from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name:"Credentials",
            async authorize(credentials,req){
                //connect to database
                await connectDB();

                // check if there's an email and password
                if(!credentials.email || !credentials.password){
                    return null
                }

                // check if user's exist in databse
                const userExist = await User.findOne({email:credentials.email})
                // return null uf user not exist in database
                if(!userExist){
                    return null
                }

                // check if password is match
                const passwordMatch = await compare(credentials.password,userExist.password)
                // check if password match
                if(passwordMatch){
                    return userExist
                }
                
                return null
            }
        })
    ],
    pages:{
        signIn:"/Log-in"
    },
    callbacks:{
        async jwt({ token, user  }) {
            if(user){
                return{
                    ...token,
                id:user._id,
                name : user.username
                }
            }
            //goes here if there is no user,
            // which means the client uses provider like google
            const userExist = await User.findOne({email:token.email});
            return{
                ...token,
                id:userExist._id.toString(),
                name:userExist.username.toLowerCase()
            }
        },
        async session({ session, token,user }) {
            return {
                ...session,
                id:token.id,
                user:{
                    ...user,
                    name:token.name,
                    email:token.email,
                    image:token.picture
                }
            }
        },
        async signIn({ account, profile }){
            if(account.type === 'oauth'){
                try {
                    // check if the user exist is in database
                    const userExist = await User.findOne({email:profile.email});
                    if(!userExist){
                        await User.create({
                            email:profile.email,
                            username:profile.name.toLowerCase(),
                            image:profile.picture
                        })
                    }
                    return true
                } catch (error) {
                    console.error(error);
                    return false
                }
            }
            if (account.type === 'credentials'){
                return true
            }
            return false
        },
    },
    
    secret:process.env.SECRET_JWT,
    session:{
        stragety:"jwt"
    }
}

const handler = NextAuth(authOptions);
export {handler as GET,handler as POST}


// import { connectDB } from "@/libs/database";
// import User from "@/models/User";
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider  from "next-auth/providers/credentials";
// import { compare } from "bcrypt";

// export const authOptions = {
//     providers:[
//         GoogleProvider({
//             clientId:process.env.GOOGLE_ID,
//             clientSecret:process.env.GOOGLE_CLIENT_SECRET
//         }),
//         CredentialsProvider({
//             name:"credentials",
//             async authorize(credentials,req){
//                 await connectDB();

//                 //check user existence
//                 const result = await User.findOne({email:credentials.email})
//                 if(!result){
//                     throw new Error("No user found with the email!")
//                 }
//                 //check password
//                 const checkPassword = await compare(credentials.password,result.password)

//                 // incorrect password
//                 if(!checkPassword || result.email !== credentials.email){
//                     throw new Error("Username or password doesn't match!")
//                 }
                
//                 return result
//             }
//         })
//     ],
//     pages:{
//         signIn:"/Log-in"
//     },
//     callbacks:{
//         async session({session}){
//             const sessionUser = await User.findOne({email:session.user.email})
//             session.user.id = sessionUser._id.toString();
//             session.user.name = sessionUser.username;
//             return session
//         },
//         async signIn({profile}){
//             // if the user use credential provider's then return true
//             if(profile){
//                 try {
//                     await connectDB();                     
//                     const userExist = await User.findOne({email:profile.email});
//                     if(!userExist){
//                         await User.create({
//                             email:profile.email,
//                             username:profile.name.toLowerCase(),
//                             image:profile.picture
//                         })
//                     }
//                     return true
//                 } catch (error) {
//                     console.error(error);
//                     return false
//                 }
//             } 
//             return true
//         }
//     },
// }

// const handler = NextAuth(authOptions);
// export {handler as GET,handler as POST}