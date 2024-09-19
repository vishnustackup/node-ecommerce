const User = require('../../models/userModel')
const env = require('dotenv').config()
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

//-------------PAGE NOT FOUND -----------------//

const pageNotfound = async (req, res) => {
    try {
        return res.render('page-404')
    } catch (error) {
        res.redirect('/pageNotfound')
    }
}



//------------- SHOP PAGE LOADING --------------//
const loadShopping = async (req, res) => {
    try {
        res.render("shop")
    } catch (error) {
        console.log("error");

    }
}


//-------------LOADING SIGN UP PAGE --------------//

const loadSignup = async (req, res) => {
    try {
        res.render("signup")
    } catch (error) {
        console.log("error");

    }
}

//--------------GENERATE OTP -------------------//

function GenerateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

async function sendVerificationEmail(email, otp) {
    try {

        const transporter = nodemailer.createTransport({

            service: 'gmail',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })


        const info = await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: "verify your account",
            text: `your otp is ${otp}`,
            html: `<b>your otp is ${otp}</b>`

        })
        return info.accepted.length > 0
    } catch (err) {
        console.error("otp failed ");
        return false
    }
}




//--------------------SIGN UP PAGE CREATING------------------//

const Signup = async (req, res) => {
    try {

        const { name, phone, email, password, cpassword } = req.body;
        console.log(phone);

        if (password !== cpassword) {
            return res.render('signup', { message: "password does not match" })
        }
        const finduser = await User.findOne({ email })
        if (finduser) {
            return res.render('signup', { message: "user exists" })
        }

        const otp = GenerateOtp()
        const emailSend = await sendVerificationEmail(email, otp)
        if (!emailSend) {
            return res.json("email-error")
        }

        req.session.userOtp = otp;
        req.session.userData = { name, phone, email, password }
        res.render('otp')
        console.log("otp is ", otp);

    } catch (err) {
        res.redirect('/pageNotfound')
    }
}

const SecurePassword = async (password) => {
    const salt = 10;
    const saltRounds = await bcrypt.genSalt(salt)
    const Hashedpassword = await bcrypt.hashSync(password, saltRounds)
    return Hashedpassword;
}



const VerifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;  // OTP entered by the user
        console.log("Entered OTP:", otp);
        console.log("Session OTP:", req.session.userOtp);  // Log the OTP stored in session for debugging

        // Compare entered OTP with the one stored in session
        if (otp === req.session.userOtp) {
            const user = req.session.userData;  // Retrieve user data from session
            const hashpassword = await SecurePassword(user.password);  // Hash the password

            // Save user data in the database
            const saveUserdata = new User({
                name: user.name,
                email: user.email,
                phoneno: user.phone,
                password: hashpassword
            });

            await saveUserdata.save();

            // Store user ID in session and clear OTP from session
            req.session.userData = saveUserdata._id;

            res.json({ success: true, redirectUrl: "/" });  // Respond with success
        } else {
            res.status(400).json({ msg: "Invalid OTP" });  // Invalid OTP entered
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ success: false });
    }
};

const LoadLogin = async (req, res) => {
    try {

        if (!req.session.user) {
            return res.render("login")
        } else {
            res.redirect('/')
        }
    } catch (err) {
        res.redirect('/pageNotfound')
    }
}

const UserLogin = async (req, res) => {

    try {

        const { email, password } = req.body;
        const findUser = await User.findOne({ isAdmin: 0, email: email })

        if (!findUser) {
            return res.render("login", { message: "user not found" })
        }

        if (findUser.isBlocked) {
            return res.render('login', { message: "user is blocked" })
        }

        const passwordMatch = await bcrypt.compare(password, findUser.password)
        if (!passwordMatch) {
            return res.render('login', { message: "password is not matching" })

        }

        req.session.user = findUser
        res.redirect('/')
    } catch (err) {

    }
}

//-------------HOME PAGE LOADING --------------//

const loadHomepage = async (req, res) => {
    try {
        let user = req.session.user;

        if (user) {
            const newData = await User.findOne({ _id: user._id });
            res.render('home', { user: newData });
        } else {
            return res.render('home');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
    }
}

const Userlogout = async (req, res) => {
    try {

        req.session.destroy((err) => {
            if (err) {
                console.log(err.message);
                return res.redirect('/pageNotfound')
            }
            return res.redirect('/login')
        })

    } catch (err) {
        console.log(err);
        res.redirect('/pageNotfound')
    }
}
module.exports = { loadHomepage, pageNotfound, loadSignup, loadShopping, Signup, VerifyOtp, LoadLogin, UserLogin, Userlogout }