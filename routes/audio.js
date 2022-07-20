import express from 'express';
import ytdl from 'ytdl-core';
import slugify from 'slugify';
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        var url = req.query.url;
        if (!ytdl.validateURL(url)) {
            return res.sendStatus(400);
        }
        let info = await ytdl.getInfo(url);
        console.log(info.videoDetails.title);
        const title = slugify(info.videoDetails.title, {
            replacement: '-',    
            remove: /[*+~.()'"!:@]/g,
            remove: officialHindipunjabi,
            lower: false,
            strict: false
            
        });
        res.header('Content-Disposition', `attachment; filename="${title}(www.iwsh.xyz).mp3"`);
        ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
            quality: 'highest'
        }).pipe(res);

    } catch (err) {
        console.error(err);
    }
});

export default router;
