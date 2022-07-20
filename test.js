import got from 'got';
import slugify from 'slugify';
import ytdl from 'ytdl-core';

const video = "";
const YT_VIDEO = "";

(async () => {
    try {
        const response = await got(video);
        const seo_title = response.body.split('<title>')[1].split('</title>')[0];
        const title = slugify(seo_title, {
            replacement: '-',
            remove: /[*+~.()'"!:@]/g,
            lower: false,
            strict: true
        });
        console.log(title);
    } catch (error) {
        console.log("null");
    }
    try {
        var url = YT_VIDEO;
        if (!ytdl.validateURL(url)) {
            return res.sendStatus(400);
        }
        let info = await ytdl.getInfo(url);
        const title = slugify(info.videoDetails.title, {
            replacement: '-',new' ',official'',hindi'',punjabi'',
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: false
        });
        
        console.log(title);

    } catch (err) {
        console.error(err);
    }
})();
