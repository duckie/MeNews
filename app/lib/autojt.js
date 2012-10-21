define(['underscore','jquery', 'jquery.getfeed'],function(_, $, getfeed){
    
    function generate_xml(iFlvFiles, iTrans) {
        var stupeflix_xml = '<!-- '

        stupeflix_xml += '<effect type="none"><video filename="https://dl.dropbox.com/u/20904373/FINAL_generique.wmv" /></effect>';

        _.each(iFlvFiles, function(elem){
            //stupeflix_xml += '<effect type="explode" duration="20"> <video filename="'+elem+'"/> </effect> <transition type="move" direction="left" duration="2"/>'
            stupeflix_xml += '<effect type="explode" duration="20"><video filename="'+elem+'" /></effect>'
        });
        stupeflix_xml += ' -->';

        $('#moviexml').append(stupeflix_xml);
        iTrans(); // Show the player

        var e = document.createElement('script');
        e.src = document.location.protocol + '//static.stupeflix.com/play/1.2/play-min.js';
        e.async = true;
        document.body.appendChild(e);
    }

    function get_flv_list(iDuration, iFeeds, iProgressFlv, iTrans)
    {
        var nb_feeds = _.keys(iFeeds).length;
        var flv_files = [];
        var nb_movies = Math.floor( (iDuration*60 - 20)/20 );
        var nb = Math.floor(nb_movies/nb_feeds);
        var count = 0;
        
        _.each(iFeeds, function(feed){
            count += Math.min(nb,feed.items.length);
        });
        
        var total = count;
        

        _.each(iFeeds, function(value,name){
            var feed = value;
            var local_nb = Math.min(nb,feed.items.length);
            var items = [];
            var index = 0;
            for(index = 0; index < local_nb; ++index) {
                $.ajax({
                    //url: 'http://localhost:1235/?url=' + encodeURIComponent(feed.items[index].link),
                    url: '/proxy?url=' + encodeURIComponent(feed.items[index].link),
                    type: 'GET',
                    timeout:5000,
                    error: function(){
                        iProgressFlv(total-count, total);
                        --count;
                        if(0 === count){
                            generate_xml(flv_files, iTrans);
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
                        iProgressFlv(total-count, total);
                        --count;
                        if(0 === count){
                            generate_xml(flv_files, iTrans);
                        }
                    }
                });
            }
        });
    }


    function retrieve_feeds(iThemes, iDuration, iProgressFeed, iProgressFlv, iTrans1, iTrans2)
    {
        var feeds = {};
        var datas = [];
        var topic_index = 0;
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

        iTrans1();

        var count = datas.length;
        _.each(datas, function(elem, topic_index){
            $.getFeed({
              url: '/proxy?url=' + encodeURIComponent(toBrowse[elem]),
              timeout:5000,
              success: function(feed) {
                iProgressFeed(topic_index + 1, datas.length);
                feeds[elem] = feed;
                --count;
                if(0 === count) {
                    get_flv_list(iDuration, feeds, iProgressFlv, iTrans2);
                }
              },
              error:function(allo) {
                iProgressFeed(topic_index + 1, datas.length);
                --count;
                if(0 === count){
                    get_flv_list(iDuration, feeds, iProgressFlv, iTrans2);
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