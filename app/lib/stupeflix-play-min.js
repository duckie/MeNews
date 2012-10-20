var Sx={Object:function(c,a){function b(){}b.prototype=c;var d=new b();if(a){Sx.mix(d,a)}return d},mix:function(c,b,d){for(var a in b){if(!(d&&c[a])){c[a]=b[a]}}return c},extend:function(e,d,b,a){var f=d.prototype;var c=Sx.Object(f);e.prototype=c;c.constructor=e;e.superclass=f;if(d!=Object&&f.constructor==Object.prototype.constructor){f.constructor=d}if(b){Sx.mix(c,b)}if(a){Sx.mix(e,a)}return e},Element:function(e,c){var b=window.document.createElement(e);for(var a in c){var d=Sx.Modifiers[a];if(d){d(b,c[a])}else{b.setAttribute(a,c[a])}}return b},Modifiers:{html:function(a,b){a.innerHTML=b},cls:function(a,b){Sx.addClass(a,b)},style:function(a,b){Sx.setStyle(a,b)}},_reCl:function(a){return new RegExp("(^|\\s)"+a+"(\\s|$)")},hasClass:function(b,a){return Sx._reCl(a).test(b.className)},addClass:function(c,a){if(!Sx.hasClass(c,a)){var b=c.className[0]!=" "?" ":"";c.className=a+b+c.className}},removeClass:function(b,a){b.className=b.className.replace(Sx._reCl(a),"$1")},changeClass:function(b,a){if(b._chgCl){Sx.removeClass(b,b._chgCl)}if(a){b._chgCl=a;Sx.addClass(b,a)}},setStyle:function(b,c){for(var a in c){b.style[a]=c[a]}},getPosition:function(a,b){var c={x:0,y:0};while(a&&a!=b){c.x+=a.offsetLeft;c.y+=a.offsetTop;a=a.offsetParent}return c},hide:function(a){a.style.display="none";return a},show:function(a){a.style.display="";return a},getElementsByClassName:function(b,a,f){var e;if(!f&&b.constructor&&b.constructor.prototype.getElementsByClassName){e=b.constructor.prototype.getElementsByClassName.call(b,a)}else{e=[];var g=Sx._reCl(a);var h=b.getElementsByTagName(f||"*");for(var c,d=0;c=h[d];d++){if(g.test(c.className)){e.push(c)}}}return e},findAll:function(c,a){var b=c.split(" ");return Sx._find(b,[a||window.document])},find:function(b,a){return this.findAll(b,a)[0]},_find:function(b,l){if(b.length==0){return l}var h=[];var g=b.shift();var e=g.split(".");for(var c,f=0;c=l[f];f++){var k;if(e[0]==""){k=Sx.getElementsByClassName(c,e[1])}else{if(e[0].charAt(0)=="#"){var a=e[0].slice(1);k=[c.getElementById(a)]}else{if(e[1]){k=Sx.getElementsByClassName(c,e[1],e[0])}else{k=c.getElementsByTagName(e[0])}}}if(!(k instanceof Array)){for(var d=0;d<k.length;d++){h.push(k[d])}}else{h.push.apply(h,k)}}return Sx._find(b,h)},replace:function(c,b){var a=c.parentNode;if(a){a.insertBefore(b,c);a.removeChild(c)}},remove:function(b){var a=b.parentNode;if(a){a.removeChild(b)}},addEvent:function(a,c,b){if(a.addEventListener){a.addEventListener(c,b,false)}else{a.attachEvent("on"+c,b)}},removeEvent:function(a,c,b){if(a.removeEventListener){a.removeEventListener(c,b,false)}else{a.detachEvent("on"+c,b)}},bind:function(a,c){var b=Array.prototype.slice.call(arguments,2);return function(){var d=b.concat(Array.prototype.slice.call(arguments,0));return a.apply(c||null,d)}},capitalize:function(a){return a.replace(/\b[a-z]/g,function(b){return b.toUpperCase()})},_xmlEntities:[["&","&amp;"],["'","&apos;"],['"',"&quot;"],["<","&lt;"],[">","&gt;"]],escapeXml:function(a){Sx._xmlEntities.forEach(function(b){a=a.replace(new RegExp(b[0],"g"),b[1])});return a},urlEncode:function(b){var c=[];for(var a in b){if(b[a]!=undefined){c.push(a+"="+encodeURIComponent(b[a]))}}return c.join("&")},extendUrl:function(b,c){var a=Sx.urlEncode(c);if(a){b+=(b.indexOf("?")>=0?"&":"?")+a}return b},doPost:function(c){var b=Sx.mix({method:"post",action:c.url},c.form);var d=window.document.body.appendChild(Sx.Element("form",b));for(var a in c.data){if(c.data[a]!=undefined){d.appendChild(Sx.Element("input",{type:"hidden",name:a,value:c.data[a]}))}}d.submit();window.document.body.removeChild(d)},buildSwfObject:function(d,c,a,f){c=c||{};f=f||{};f.flashvars=Sx.urlEncode(a);var e="swf"+Sx.genUid(4);if(!c.id){c.id=e}if(!c.name){c.name=e}if(Sx.isIE()){c.classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";f.movie=d}else{c.data=d;c.type="application/x-shockwave-flash"}html_attrs=[];for(var b in c){html_attrs.push(b+'="'+c[b]+'"')}html_params=[];for(var b in f){html_params.push('<param name="'+b+'" value="'+f[b]+'"/>')}return"<object "+html_attrs.join(" ")+">"+html_params.join("")+"</object>"},removeSwf:function(a){if(a&&a.nodeName=="OBJECT"){if(Sx.isIE()){a.style.display="none";(function(){if(a.readyState==4){for(var b in a){if(typeof a[b]=="function"){a[b]=null}}a.parentNode.removeChild(a)}else{setTimeout(arguments.callee,10)}})()}else{a.parentNode.removeChild(a)}}},memoize:function(b,c){var a;return function(){return(a!=undefined)?a:(a=b.call(c||window))}}};Sx.isIE=Sx.memoize(function(){return navigator.userAgent.match(/MSIE/)!=null});Sx.isIE6=Sx.memoize(function(){return navigator.userAgent.match(/MSIE 6.0/)!=null});Sx.isIE7=Sx.memoize(function(){return navigator.userAgent.match(/MSIE 7.0/)!=null});Sx.isIpad=Sx.memoize(function(){return navigator.userAgent.match(/iPad/i)!=null});Sx.isMobileSafari=Sx.memoize(function(){return navigator.userAgent.match(/Apple.*Mobile.*Safari/)!=null});Sx.Array={forEach:function(c,d){for(var b=0,a=this.length;b<a;b++){c.call(d,this[b],b,this)}},map:function(d,e){var c=[];for(var b=0,a=this.length;b<a;b++){c[b]=d.call(e,this[b],b,this)}return c},filter:function(d,e){var c=[];for(var b=0,a=this.length;b<a;b++){if(d.call(e,this[b],b,this)){c.push(this[b])}}return c},indexOf:function(c){var a=this.length;for(var b=0;b<a;b++){if(this[b]===c){return b}}return -1}};Sx.mix(Array.prototype,Sx.Array,true);Sx.Controller={addListener:function(b,a){if(!this._listeners){this._listeners=[]}this._listeners.push({listener:b,name:a||""});return this},removeListener:function(b,a){if(!this._listeners){return}this._listeners=this._listeners.filter(function(d){var c=d.listener==b;if(a){c&=d.name==a}return !c})},setDelegate:function(b,a){if(this._delegate){this.removeListener(this._delegate)}this.addListener(b,a);this._delegate=b;return this},fire:function(a,g){if(!this._listeners){return}for(var e,d=0;e=this._listeners[d];d++){var f=e.listener;var c=Sx.capitalize(e.name);var h="on"+c+"All";var b="on"+c+Sx.capitalize(a);if(f[h]){f[h](b,this,g)}else{if(f[b]){f[b](this,g)}}}}};Sx.Callbacks={_idx:0,register:function(b){var a="_"+this._idx++;this[a]=function(c){b(c);delete Sx.Callbacks[a]};return"Sx.Callbacks."+a}};Sx.Get=function(c){var d=this;var e=Sx.Callbacks.register(function(f){if(!d._stopped&&c.onComplete){c.onComplete(f)}document.body.removeChild(a)});var b=new Sx.Url(c.url);Sx.mix(b.params,c.data);b.params.callback=e;var a=Sx.Element("script",{src:b.toString()});document.body.appendChild(a)};Sx.Post=function(a){var d="sx_iframe_"+Sx.Callbacks._idx++;var b=Sx.Element("div",{html:'<iframe name="'+d+'" style="display:none" src=""/>'}).firstChild;document.body.appendChild(b);var c=this;Sx.addEvent(b,"load",function(){if(!c._stopped&&a.onComplete){a.onComplete()}setTimeout(function(){document.body.removeChild(b)},0)});a.form=a.form||{};a.form.target=d;Sx.doPost(a)};Sx.Get.prototype=Sx.Post.prototype={stop:function(){this._stopped=true}};Sx.Url=function(a){if(a){this.parse(a)}};Sx.mix(Sx.Url.prototype,{parse:function(b){var e=b.split("?");this.base=e[0];this.params={};var a=e[1];if(a){var g=a.split("&");for(var f,c=0;f=g[c];c++){var d=f.split("=");this.params[d[0]]=decodeURIComponent(d[1])}}},toString:function(){var a=Sx.urlEncode(this.params);return this.base+(a?"?"+a:"")}});Sx.Template=function(a){this._tpl=a};Sx.mix(Sx.Template.prototype,{render:function(c){var b=new String(this._tpl);for(var a in c){b=b.replace(new RegExp("{{"+a+"}}","g"),c[a])}return b}});Sx.Duration=function(a){this.hour=Math.floor(a/3600);this.minutes=Math.floor(a%3600/60);this.seconds=Math.floor(a%60)};Sx.Duration.prototype={reduced:function(){return(this.hour?this.hour+":":"")+String(100+this.minutes).slice(1)+":"+String(100+this.seconds).slice(1)},full:function(){return(this.hour?this.hour+"h ":"")+(this.minutes?this.minutes+"min ":"")+this.seconds+"s"}};Sx.fixUrl=function(a){if(a.search(/^https?:\/\//)<0){var d=window.location;if(a.charAt(0)!="/"){var c=d.pathname.split("/");c.pop();var b=c.join("/")+"/";if(a.slice(0,2)=="./"){a=b+a.slice(2)}else{a=b+a}}a=d.protocol+"//"+d.host+a}return a};Sx.genUid=function(d,a){d=d||32;a=a||"0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";var c="";for(var b=0;b<d;b++){c+=a.charAt(Math.floor(Math.random()*a.length))}return c};Sx.Event=function(b){if(b instanceof Sx.Event){return b}this.event=b;this.type=b.type;this.target=b.target||b.srcElement;if(this.type.match(/(click|mouse|menu)/i)){var a=Sx.find("html");this.pageX=b.pageX||b.clientX+a.scrollLeft;this.pageY=b.pageY||b.clientY+a.scrollTop}};Sx.mix(Sx.Event.prototype,{stop:function(){return this.preventDefault().stopPropagation()},stopPropagation:function(){this.event.stopPropagation?this.event.stopPropagation():(this.event.cancelBubble=false);return this},preventDefault:function(){this.event.preventDefault?this.event.preventDefault():(this.event.returnValue=false);return this}});Sx.Drag=function(a){this.document=window.document;this.bound={dragStart:Sx.bind(this.dragStart,this),drag:Sx.bind(this.drag,this),dragEnd:Sx.bind(this.dragEnd,this)};Sx.addEvent(a,"mousedown",this.bound.dragStart)};Sx.mix(Sx.Drag.prototype,Sx.Controller);Sx.mix(Sx.Drag.prototype,{dragStart:function(a){a=new Sx.Event(a);Sx.addEvent(this.document,"mousemove",this.bound.drag);Sx.addEvent(this.document,"mouseup",this.bound.dragEnd);this.deltaX=0;this.deltaY=0;this.event=a;a.preventDefault();this.fire("dragStart",this)},drag:function(a){a=new Sx.Event(a);this.deltaX=a.pageX-this.event.pageX;this.deltaY=a.pageY-this.event.pageY;this.event=a;this.fire("drag",this);return false},dragEnd:function(a){Sx.removeEvent(this.document,"mousemove",this.bound.drag);Sx.removeEvent(this.document,"mouseup",this.bound.dragEnd);this.event=new Sx.Event(a);this.fire("dragEnd",this)}});Sx.Play={};Sx.Play.Client=function(b,a){if(b){this.render(b,a)}};Sx.mix(Sx.Play.Client.prototype,Sx.Controller);Sx.mix(Sx.Play.Client.prototype,{SRV_URL:"http://play.stupeflix.com/1.0/",DELAY:3000,getDefinition:function(){return this._definition},getVideoUrl:function(){return this._info?this._info.stream_url:undefined},getVideoThumbnail:function(){return this._info?this._info.thumb_url:undefined},render:function(b,a){this.stop();this._definition=b.replace(/\r\n/g,"\n");this._info=undefined;this._token=Sx.genUid();var c=Sx.mix(a||{},{token:this._token,definition:this._definition});this._req=new Sx.Post({url:this.SRV_URL,form:{"accept-charset":"UTF-8"},data:c,onComplete:Sx.bind(this.getInfo,this)})},getInfo:function(){this.stop();this._req=new Sx.Get({url:this.SRV_URL+"get-info/",data:{token:this._token},onComplete:Sx.bind(this._processInfo,this)})},_processInfo:function(a){this._info=a;this.fire("info",a);this._processStatus(a.status)},getStatus:function(){this.stop();this._req=new Sx.Get({url:this.SRV_URL+"get-status/",data:{video_id:this._info.video_id},onComplete:Sx.bind(this._processStatus,this)})},_processStatus:function(a){if(a.error){this.fire("error",a.error)}else{this._timer=setTimeout(Sx.bind(this.getStatus,this),this.DELAY);this.fire("update",a);if(a.state=="available"){this.fire("available",a);this.stop()}}},stop:function(){if(this._req){this._req.stop()}clearTimeout(this._timer)}});Sx.Play.Player=function(a){this.view=a;this.client=new Sx.Play.Client().setDelegate(this,"client");this.parseContent()};Sx.mix(Sx.Play.Player.prototype,{FLV_PLAYER_URL:"http://static.stupeflix.com/platform/jwplayer/4.6/player.swf",config:function(a){return this.view.getAttribute(a)},show:function(b,a){if(this._stage){this.view.removeChild(this._stage)}this._stage=this.view.appendChild(b);Sx.changeClass(this.view,a)},parseContent:function(){var b=this.view.firstChild;while(b&&b.nodeType!=8){b=b.nextSibling}if(b){var a=b.data;if(!(/<movie[^>]*>/).test(a)){a='<movie service="craftsman-1.0"><body>'+a+"</body></movie>"}this.render(a,{profile:this.config("data-profile")})}},render:function(b,a){this.available=false;this.client.render(b,a);if(!this.loadPane){this.loadPane=Sx.Element("div",{cls:"sx_loadPane"});var c=this.loadPane.appendChild(Sx.Element("div",{cls:"sx_pgBar"}));this.loadPane.pg=c.appendChild(Sx.Element("div"))}Sx.addClass(this.loadPane,"init");this.show(this.loadPane,"loading")},openInXmlEditor:function(){Sx.doPost({url:"http://xeditor.stupeflix.com/edit/",form:{target:"_blank","accept-charset":"UTF-8"},data:{xml_definition:this.client.getDefinition(),name:window.document.title,pp:true}})},onClientUpdate:function(b,a){if(this.available){return}var c=a.complete*2.8;if(c<100){Sx.removeClass(this.loadPane,"init");this.loadPane.pg.style.width=c+"%"}else{this.available=true;this.makeAvailable()}},onClientError:function(a,c){if(!this.errorPane){var e=this.errorPane=Sx.Element("div",{cls:"sx_errorPane"});e.desc=e.appendChild(Sx.Element("p"));e.textarea=e.appendChild(Sx.Element("textarea"));var d=e.appendChild(Sx.Element("div"));var b=d.appendChild(Sx.Element("span",{html:"Open in Stupeflix XML Editor"}));Sx.addEvent(b,"click",Sx.bind(this.openInXmlEditor,this))}this.show(this.errorPane,"error");this.errorPane.desc.innerHTML=c;this.errorPane.textarea.value=this.client.getDefinition()},makeAvailable:function(){if(!this.playerPane){this.playerPane=Sx.Element("div",{cls:"sx_playerPane"})}this.show(this.playerPane,"ready");var a=this.FLV_PLAYER_URL+(Sx.isIE()?"?t="+(new Date().getTime()):"");this.playerPane.innerHTML=Sx.buildSwfObject(a,{width:"100%",height:"100%"},{type:"video",image:this.client.getVideoThumbnail(),file:this.client.getVideoUrl(),controlbar:"over",autostart:this.config("data-autoplay")},{allowfullscreen:"true",allowscriptaccess:"always",wmode:"transparent"})}});Sx.Play.init=function(){if(window.SxLoadedCallback){window.SxLoadedCallback()}else{var c=Sx.findAll("div.sxmovie");for(var a,b=0;a=c[b];b++){new Sx.Play.Player(a)}}};(Sx.isIE6()||Sx.isIE7())?Sx.addEvent(window,"load",Sx.Play.init):Sx.Play.init();