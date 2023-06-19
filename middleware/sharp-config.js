const sharp = require('sharp');
const fs = require('fs');
const path = require('path')

module.exports = (req, res, next) => {
    if (!req.file) {
        next()
    }
    const { buffer, originalname } = req.file;
    const fileDatas = path.parse(originalname);
    const link = fileDatas.name.split(' ').join('_') + '_' + Date.now() + '.webp';

    fs.mkdir('./images', (err) => {
        if (err && err.code !== 'EEXIST') {
            console.error(err);
            return res.status(500).json({ error: 'Impossible de créer le dossier images.' });
        }
        sharp(buffer)
            .resize(450, 580)
            .webp({ quality: 20 })
            .toFile(`./images/${link}`, (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'Impossible de sauvegarder.' });
                }  
                req.file.filename = link;
                
                next();
            });
    });

};