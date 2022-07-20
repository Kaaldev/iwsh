import express from 'express';
const app = express();
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();

const port = process.env.PORT || 4000;
app.use(express.static(path.join(__dirname, '/files')));
app.use(cors());

function customHeaders(req, res, next) {
    app.disable('x-powered-by');
    res.setHeader('X-Powered-By', 'Video Downloader');
    next();
}
app.use(customHeaders);

app.get('/robots.txt', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/robots.txt'));
});

function formatName(str) {
  str = slugify(
    str
      .replace(/ *\([^)]*\) */g, "")
      .replace(/ *\\[[^\]]*\) */g, ""))
        .replace('official', '')
        .replace('music', '')
        .replace('video', '');
  return str;
}

import home from './routes/home.js';
import audio from './routes/audio.js';
import video from './routes/video.js';

app.use('/', home);
app.use('/:audio', audio);
app.use('/:video', video);

app.use('/', function(req, res) {
    res.status(404).json({
        error: 1,
        message: 'Data not Found'
    });
})

app.listen(port, function() {
    console.log('listening on port ' + port);
});
