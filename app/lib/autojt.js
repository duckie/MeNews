define(['underscore','jquery', 'jquery.getfeed'],function(_, $, getfeed){
	
	function generate_xml(iFlvFiles) {
		_.each(iFlvFiles, function(elem){
			console.log(elem);
		});
	}

	function get_flv_list(iWeights, iDuration, iFeeds)
	{
		var flv_files = [];
		var nb_movies = Math.floor(iDuration);
		var count = 0;
		var movies = {};

		_.each(iWeights, function(value,index){
			var nb = Math.floor(value*nb_movies/5);
			iWeights[index] = nb;
			count += nb;
		});

		_.each(iWeights, function(value,index){
			var nb = value;
			var feed = iFeeds[index];
			var items = [];
			var index = 0;
			for(index = 0; index < nb; ++index) {
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
		var datas = {};
		_.each(iThemes,function(value,id){
			datas[id] = Math.floor(value/20);
		});

		var toBrowse = {
			business: 'http://feeds.feedburner.com/euronews/fr/business?format=xml',
			euro: 'http://feeds.feedburner.com/euronews/fr/europa?format=xml',
			science:'http://feeds.feedburner.com/euronews/fr/sci-tech?format=xml',
			culture:'http://feeds.feedburner.com/euronews/fr/lifestyle?format=xml'
		};

		var count = _.reduce(datas, function(memo, elem){
			return memo + ((0 < elem) ? 1 : 0);
		},0);


		_.each(datas, function(elem, index){
			if(0 < elem) {
				$.getFeed({
		          url: 'http://localhost:1235/?url=' + encodeURIComponent(toBrowse[index]),
		          success: function(feed) {
		            feeds[index] = feed;
		            --count;
					if(0 === count) {
						get_flv_list(datas, iDuration, feeds);
					}
		          },
		          error:function(allo) {
		            console.log(allo);
		          }
				});
			}
		});

        /*$.getFeed({
          url: 'http://localhost:1235/?url=' + encodeURIComponent('http://feeds.feedburner.com/euronews/fr/sci-tech?format=xml'),
          success: function(feed) {
            feeds.push(feed);
          },
          error:function(allo) {
            console.log(allo);
          }
      	});*/


		return "<!-- -->";
	};

	return {
		generateStupeflixXML:retrieve_feeds
	};
});