const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const signUp = async (req, res, next ) => {
    let existingUser;
    const {name, email, password} = req.body;
existingUser = await User.findOne({ email: email });
if (existingUser) {
    return res.status(400).json( "User already exists");
}
const cipherText = bcrypt.hashSync(password);
    const user = new User({
        name,   // implies name:name if the key and value are same
        email,
        password: cipherText,
    })
    await user.save();
    return res.status(201).json({ message: user });
};

const logIn = async (req,res, next ) => {
const { email, password } = req.body;
let existingUser = await User.findOne({ email: email});
if (!existingUser)  {
return res.status(400).json ({message: "Invalid credentials"});
}
const validPassword = bcrypt.compareSync(password, existingUser.password );
if (!validPassword) {
    return res.status(400).json({message: "Invalid credentials"});
}

const userToken = jsonwebtoken.sign({ id: existingUser._id},process.env.WEB_TOKEN_SECRET,
         {
        expiresIn: "40s",
         }
    );

res.cookie(String(existingUser._id), userToken, {
   path: "/",
   expires: new Date(Date.now() + 1000*30), //expires in 30second
    httpOnly: true,
    sameSite: "lax", //the cookie can be only access by using an api link
})

return res.status(200).json({ message: "Success",userToken });
};

const userVerification = ( req, res, next) => {
    const cookie = req.headers.cookie;
console.log(cookie);
const token = cookie.split("=")[1];
    
if (!token) {
   return res.status(404).json({ message:" Invalid credentials: Token error "});
}
jsonwebtoken.verify( token.toString(),process.env.WEB_TOKEN_SECRET, ( error, user ) => {
    if (error) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log(user.id);
    req.id = user.id;
}
);
next();


};

const getUser = async ( req, res, next ) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, "-password");
        console.log(user);
    } catch (error) {
        return new Error(error);
    }
    if (!user) {
        return res.status(404).json({
            message : "User not found"
        });
    }
    return res.status(200).json({ user });
}

module.exports = { signUp, logIn, userVerification, getUser, }