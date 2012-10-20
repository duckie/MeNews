define(['underscore','jquery', 'jquery.getfeed'],function(_, $, getfeed){
    
    function generate_xml(iFlvFiles) {
        console.log("envoie la sauce batard");
        var stupeflix_xml = '<!-- '

        stupeflix_xml += '<stack duration="20.0"> \
            <effect type="none"> \
            <image color="#F0F2EB"/> \
            </effect> \
            \
            <overlay left="0.12" width="0.3" top="0.1" height="0.3" margin-start="1.0"> \
            <image color="#FF4242"/> \
            <animator type="slide-in" direction="right" duration="1.0" /> \
            </overlay> \
            \
            <overlay right="0.12" width="0.3" top="0.1" height="0.3" margin-start="3.0"> \
            <image color="#F4FAD2"/> \
            <animator type="slide-in" direction="down" duration="1.0" /> \
            <animator type="custom"> \
                <key scale="1,1,1" time="0.0"/> \
                <key scale="1.2,1,1" time="1.0"/> \
                <key scale="1.0,1.2,1" time="4.0"/> \
                <key scale="1,1,1" time="5.0"/> \
            </animator> \
            </overlay> \
 \
            <overlay left="0.2" width="0.3" bottom="0.2" height="0.3" margin-start="6.0"> \
            <image color="#D4EE5E"/> \
            <animator type="slide-in" direction="up" duration="1.0" /> \
            <animator type="grow" growStart="0.0" growEnd="0.3" duration="3.0"/> \
            <animator type="grow" growStart="0.3" growEnd="0.0"/> \
            </overlay> \
            \
            <overlay right="0.12" width="0.3" bottom="0.2" height="0.3" margin-start="9.0"> \
            <image color="#E1EDB9"/> \
            <animator type="slide-in" direction="left" duration="1.0" /> \
            </overlay> \
            \
            <text type="zone" vector="true" margin-start="12.0"> \
                NewsMixer \
                <filter type="distancemap" distanceWidth="40.0"/> \
                <filter type="distancecolor" distanceWidth="40.0" color="#ffffff" /> \
                <filter type="distancecolor" distanceWidth="40.0" color="#000000" dropShadowColor="#000000" dropShadowBlurWidth="0.5" dropShadowOpacity="0.8" dropShadowPosition="-0.02,0.02"/> \
                <animator type="custom"> \
                    <key time="12.0" dropShadowOpacity="0.0" /> \
                    <key time="15.0" dropShadowOpacity="1.0" /> \
                </animator> \
            </text> \
            \
            <audio filename="https://dl.dropbox.com/u/20904373/generique.mp3" duration=".." fadeout="2"/> \
        </stack>'

        _.each(iFlvFiles, function(elem){
            //stupeflix_xml += '<effect type="explode" duration="20"> <video filename="'+elem+'"/> </effect> <transition type="move" direction="left" duration="2"/>'
            stupeflix_xml += '<effect type="explode" duration="20"><video filename="'+elem+'" /></effect>'
        });
        stupeflix_xml += ' -->';

        console.log(stupeflix_xml);
        $('#page1').hide();
        $('#moviexml').append(stupeflix_xml);
        $('#moviexml').show();

        var e = document.createElement('script');
        e.src = document.location.protocol + '//static.stupeflix.com/play/1.2/play-min.js';
        e.async = true;
        document.body.appendChild(e);
    }

    function get_flv_list(iDuration, iFeeds)
    {
        var nb_feeds = _.keys(iFeeds).length;
        var flv_files = [];
        var nb_movies = Math.floor( (iDuration*60 - 20)/20 );
        var nb = Math.floor(nb_movies/nb_feeds);
        var count = nb*nb_feeds;

        _.each(iFeeds, function(value,name){
            var feed = value;
            var local_nb = Math.min(nb,feed.items.length);
            var items = [];
            var index = 0;
            for(index = 0; index < local_nb; ++index) {
                $.ajax({
                    url: 'http://localhost:1235/?url=' + encodeURIComponent(feed.items[index].link),
                    type: 'GET',
                    timeout:5000,
                    error: function(){
                        --count;
                        if(0 === count){
                            generate_xml(flv_files);
                        }
                    },
                    success:function(data) {
                        var str = "videofile:\"flv";
                        var flv = '';
                        var idx, idx2;

                        idx = data.indexOf(str);
                        if(-1 != idx) {
                            idx2 = data.indexOf("\"",idx+str.length);
                            // http://video.euronews.com/flv/new/cut/eco/121019_BUSU_180A0_F.flv
                            flv = "http://video.euronews.com/flv"+data.substring(idx+str.length,idx2)+".flv";
                            //$("#player").html('</br>'+flv);
                            flv_files.push(flv);
                        }
                        --count;
                        if(0 === count){
                            generate_xml(flv_files);
                        }
                    }
                });
            }
        });
    }


    function retrieve_feeds(iThemes, iDuration)
    {
        var feeds = {};
        var datas = [];
        _.each(iThemes, function(value, index){
            if(value) {
                datas.push(index);
            }
        });

        var toBrowse = {
            business: 'http://feeds.feedburner.com/euronews/fr/business?format=xml',
            euro: 'http://feeds.feedburner.com/euronews/fr/europa?format=xml',
            science:'http://feeds.feedburner.com/euronews/fr/sci-tech?format=xml',
            culture:'http://feeds.feedburner.com/euronews/fr/lifestyle?format=xml'
        };

        var count = datas.length;
        _.each(datas, function(elem){
            $.getFeed({
              url: 'http://localhost:1235/?url=' + encodeURIComponent(toBrowse[elem]),
              timeout:5000,
              success: function(feed) {
                feeds[elem] = feed;
                --count;
                if(0 === count) {
                    get_flv_list(iDuration, feeds);
                }
              },
              error:function(allo) {
                --count;
                if(0 === count){
                    get_flv_list(iDuration, feeds);
                }
              }
            });
        });

        return "<!-- -->";
    };

    return {
        generateStupeflixXML:retrieve_feeds
    };
});