const Youtube = require('youtube-node');

const { key } = require('./yt-config.json');

const youtube = new Youtube();
youtube.setKey(key);

function searchVideoURL(message, queryText) {
  return new Promise((resolve, reject) => {
    youtube.search(`Node JS e Typescript ${queryText}`, 3, (err, result) => {
      if (!err) {
        const videoIds = result.items
          .map((item) => item.id.videoId)
          .filter((item) => item);
        const youtubeLinks = videoIds.map(
          (videoId) => `https://www.youtube.com/watch?v=${videoId}`
        );
        resolve(`${message} ${youtubeLinks.join(`, `)}`);

        console.log(JSON.stringify(result, null, 2));
      } else {
        reject('ERROR');
      }
    });
  });
}

module.exports.searchVideoURL = searchVideoURL;
