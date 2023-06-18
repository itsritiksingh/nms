const NodeMediaServer = require('node-media-server');

const config = {
  logType: 4,
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
      },
      http: {
        port: 8000,
        mediaroot: './media',
        allow_origin: '*'
      },
      auth: {
        play: true,
        publish: true,
        secret: 'nodemedia2017privatekey'
      },
      trans: {
        ffmpeg: '/snap/bin/ffmpeg',
        tasks: [
          {
            app: 'live',
            mp4: true,
            mp4Flags: '[movflags=frag_keyframe+empty_moov]',
          }
        ]
      }
};

var nms = new NodeMediaServer(config)
nms.run();

nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});