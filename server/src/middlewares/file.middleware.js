import multer from "multer";


const upload = multer({
    storage: multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype !== "application/pdf") {
            callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "resume"))
            return
        }

        callback(null, true)
    }
})

export default upload
