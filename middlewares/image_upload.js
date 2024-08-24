const axios = require('axios');
const fs = require('fs');
const path = require('path');

const imageUpload = (prefix ="") => {
    return async (req, res, next) => {
        try {
            const filePath = path.join(path.resolve("./"), req.file.path);
            const fileContent = fs.readFileSync(filePath, 'base64');
            const fileExtention = req.file.originalname.split(".")
            const fileName = `${prefix}${Date.now()}${parseInt(Math.random()*100000)}.${fileExtention[fileExtention.length - 1]}`;
            
            const commitMessage = `Add ${fileName}`;
            const apiUrl = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.REPO_NAME}/contents/images/${fileName}`;
    
            const response = await axios.put(
                apiUrl,
                {
                    message: commitMessage,
                    content: fileContent,
                    branch: process.env.BRANCH_NAME,
                },
                {
                    headers: {
                        Authorization: `token ${process.env.GITHUB_TOKEN}`,
                        Accept: 'application/vnd.github.v3+json',
                    },
                }
            );
    
            fs.unlinkSync(filePath);
    
            const fileUrl = response.data.content.html_url.replace('/blob/', '/raw/');
            req.file.originalname = fileUrl
            next()
        } catch (error) {
            console.error(error);
            res.status(500).send('Error uploading image');
        }
    }
}

module.exports = {
    imageUpload
}