if (!window.isLoadVideo) {
  window.isLoadVideo = true
  $(document.head).append(`<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/video.js@7.7.5/dist/video-js.min.css" />`)
  const that = this
  let loadvideo = false
  let loadflash = false
  function callback() {
      if(loadvideo && loadflash) {
          console.log('执行回调')
          const dom = that.getDom()
          $(dom).append(`
          <video id="test_video" class="video-js vjs-default-skin vjs-big-play-centered" controls autoplay width="960" height="400">
              <source src='rtmp://58.200.131.2:1935/livetv/hunantv' type='rtmp/flv'/>
          </video>
          `)
          videojs.options.flash.swf = "https://cdn.bootcss.com/videojs-swf/5.4.2/video-js.swf"
          var player = videojs('test_video', {"autoplay":true});
          player.play();
      }
  }
  function loadjs(url,fn) {
      let head = document.getElementsByTagName('head')[0];
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = script.onreadystatechange = function() {
          if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
              fn();
              script.onload = script.onreadystatechange = null;
          }
      };
      script.src= url;
      head.appendChild(script);
  }
  loadjs('https://cdn.jsdelivr.net/npm/video.js@7.7.5/dist/video.min.js',() => {
      loadvideo = true
      callback()
  })
  loadjs('https://cdn.jsdelivr.net/npm/videojs-flash@2/dist/videojs-flash.min.js',() => {
      loadflash = true
      callback()
  })
  
}