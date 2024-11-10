const user = require('../model/usermodel')
const cloudinary = require('cloudinary').v2

const isSupported = (supportedType, fileType) => {
    return supportedType.includes(fileType)
}

const uploadFile = async (file, folder) => {
    const { options } = folder
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.userform = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        console.log(name, email, phone);
        if (!name || !email || !phone) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const isEmail = await user.findOne({ email })

        if (isEmail) {
            return res.status(400).json({ error: "Email already exists" })
        }

        // image upload
        const file = req.files.image
        if (!file) {
            return res.status(400).json({ error: "Please upload an image" })
        }

        console.log('file coming', file)
        const supportedType = ['jpg', 'png', 'jpeg']
        // const fileType = file.name.split('.')[1].toLowerCase()
        const fileType = file.name ? file.name.split('.')[1].toLowerCase() : null;

        if (!isSupported(supportedType, fileType)) {
            return res.status(400).json({ error: "Unsupported file type. Only jpg, png, and jpeg are allowed" })
        }

        const response = await uploadFile(file, 'newfolder')
        console.log(response)


        const createdUser = await user.create({
            name,
            email,
            phone,
            image: response.secure_url
        })

        res.status(201).json({
            message: "User created successfully",
            user: createdUser
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message })
    }

}