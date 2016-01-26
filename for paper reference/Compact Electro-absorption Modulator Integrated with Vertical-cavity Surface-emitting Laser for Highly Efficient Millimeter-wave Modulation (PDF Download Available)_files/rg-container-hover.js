"use strict";YUI.add("rg.core.util.ClipboardPlugin",function(a){a.namespace("rg.core.util"),a.rg.core.util.ClipboardPlugin=a.Base.create("ClipboardPlugin",a.Plugin.Base,[],{handlers:[],initializer:function(b){var c=a.one("document");b&&(b.textPattern&&this.set("textPattern",b.textPattern),b.htmlPattern&&this.set("htmlPattern",b.htmlPattern),b.context&&this.set("context",b.context)),this.handlers=[],this.handlers.push(c.on("copy",this.attachMessageToClipboard,this))},destructor:function(){a.Array.each(this.handlers,function(a){a.detach()})},sendAjaxExperimentData:function(b){var c=a.one("body").hasClass("logged-out"),d=c?"Logged out":"Logged in",e=d+" - "+this.get("context");a.rg.ajax("application.AjaxCommon.ajaxClipboardExperiment.html",{context:e}),window.ga&&window.ga("send","social","researchgate","copy",e+": "+b)},attachMessageToClipboard:function(b){if(b=b._event||window.event,b.clipboardData||window.clipboardData){var c,d,e,f,g=new Date,h=window.datetimeHelpers.getFullDatestring(g),i=this.get("textPattern").replace(/\{\{title\}\}/g,document.title).replace(/\{\{url\}\}/g,window.location.href).replace(/\{\{currentYear\}\}/g,g.getFullYear()).replace(/\{\{currentDate\}\}/g,h),j=this.get("htmlPattern").replace(/\{\{title\}\}/g,document.title).replace(/\{\{url\}\}/g,window.location.href).replace(/\{\{currentYear\}\}/g,g.getFullYear()).replace(/\{\{currentDate\}\}/g,h),k=document.createElement("div"),l=150,m=!!b.clipboardData,n=m?"text/plain":"text",o=m?b.clipboardData:window.clipboardData;if("undefined"!=typeof window.getSelection){if(e=window.getSelection(),f=e.baseNode||e.focusNode,!a.one(f).ancestors(".abstract, .pub-abstract, .document-viewer, .publication-full-text-container, .topic-post-text")._nodes.length)return;if(c=e.toString(),c.length<l)return;if(e.rangeCount){for(var p=0,q=e.rangeCount;q>p;++p)k.appendChild(e.getRangeAt(p).cloneContents());d=k.innerHTML}o.setData(n,c+" "+i),m&&o.setData("text/html",d+j)}else{if(!o.getData("Text"))return;if(c=o.getData("Text"),c.length<l)return;o.clearData(),o.setData(n,c+" "+i)}this.sendAjaxExperimentData(c),b.preventDefault()}}},{NS:"ClipboardPlugin",ATTRS:{textPattern:{value:"\n\n{{title}}. Available from: {{url}} [accessed {{currentDate}}]."},htmlPattern:{value:'\n<br><i>{{title}}</i>. Available from: <a href="{{url}}">{{url}}</a> [accessed {{currentDate}}].'},context:{value:null}}})},"1.0.0",{requires:["datetimeHelpers"]});
YUI.add("rg.core.layout.ResponsiveHelpers",function(a){a.namespace("rg.core.layout"),a.rg.core.layout.ResponsiveHelpers=a.Base.create("ResponsiveHelpers",a.Plugin.Base,[],{matchesBreakpoint:function(a,b){var c={l:1200,m:992,s:768},d=!1,e=!1,f="only screen";return window.matchMedia&&a&&a.length?("xs"===a?d="s":"s"===a?(d="m",e="s"):"m"===a?(d="l",e="m"):"l"===a?e="l":-1!==a.indexOf("-ge")?e=a.charAt(0):-1!==a.indexOf("-lt")&&(d=a.charAt(0)),e&&(f+=" and (min-width: "+c[e]+"px)"),d&&(f+=" and (max-width: "+(c[d]-1)+"px)"),"p"===b?f+=" and (orientation:portrait)":"l"===b&&(f+=" and (orientation:landscape)"),window.matchMedia(f).matches):!1}},{NS:"ResponsiveHelpers"})},"0.0.1",{requires:[]});
"use strict";YUI.add("rg-sticky-header-plugin",function(a){a.namespace("rg.header"),function(){a.rg.header.StickyHeaderPlugin=a.Base.create("StickyHeaderPlugin",a.Plugin.Base,[],{initializer:function(){var b=a.Node.create("<div></div>"),c=a.Node.create("<div></div>");this.body=a.one("win"),this.node=this.get("host"),this.isFixed=0,this.fixedClass=this.get("fixedClass"),this.placeholder=b,this.nodeTopDummy=c.setStyles({height:0}),this.get("restrictToContainer")&&(this.restrictToContainerTop=this.get("restrictToContainer").getY()),this.placeholder.addClass("sticky-placeholder"),this.recalculateLayout(),this.get("noPlaceHolder")||(this.node.insert(c,"before"),this.node.insert(b,"before"),this.node.appendTo(b)),this.handlers=[],this.get("invertScroll")?this.handlers.push(a.one("window").on("scroll",this._handleInvertScroll,this)):this.handlers.push(a.one("window").on("scroll",this._handleScroll,this)),this.get("invertScroll")?this._handleInvertScroll():this._handleScroll()},_handleScroll:function(){var a=this.body.get("scrollTop");if(a>=this.nodeTop&&!this.isFixed?(this.isFixed=1,this.node.addClass(this.fixedClass)):a<=this.nodeTop&&this.isFixed&&(this.isFixed=0,this.node.removeClass(this.fixedClass)),this.isFixed&&this.get("restrictToContainer")){var b=this.restrictToContainerTop+this.get("restrictToContainer").get("offsetHeight"),c=this.node.get("offsetHeight")+this.body.get("scrollTop");c>b?this.node.setStyle("top",b-c):this.node.setStyle("top",0)}},_handleInvertScroll:function(){var a=this.body.get("scrollTop"),b=this.nodeTop;"fixed-scrolling-bottom"===this.get("fixedClass")&&(b+=this.node._node.offsetHeight,a+=this.body.get("winHeight")),b>=a&&!this.isFixed?(this.isFixed=1,this.node.addClass(this.fixedClass)):a>=b&&this.isFixed&&(this.isFixed=0,this.node.removeClass(this.fixedClass))},recalculateLayout:function(){this.nodeTop=this.node&&this.node.getY()+this.get("stickyOffsetTop"),this.placeholder.setStyle("height",this.get("host").get("offsetHeight"))},updateNodeTop:function(){this.nodeTop=this.nodeTopDummy.getY()+this.get("stickyOffsetTop")},destructor:function(){a.Array.each(this.handlers,function(a){a.detach()})}},{NS:"StickyHeaderPlugin",ATTRS:{stickyOffsetTop:{value:0},restrictToContainer:{value:null},noPlaceHolder:{value:!1},invertScroll:{value:!1},fixedClass:{value:"fixed-scrolling"}}})}()},"0.0.1",{requires:[]});
YUI.add("rg.core.util.DOMMutationObserver",function(a){a.namespace("rg.core.util"),function(b){if(b.MutationObserver=b.MutationObserver||b.WebKitMutationObserver,!b.MutationObserver){var c=Array.prototype,d=c.push,e=a.Array.map,f=a.Object.each,g=b.MutationRecord=function(a){f(a,function(a,b){this[b]=a},this)};g.prototype={target:null,type:null,addedNodes:[],removedNodes:[],attributeName:null,oldValue:null};var h=function(a){return e.call(this,a.childNodes,function(a){return a})},i=function(a,b){for(var c={},d=a.attributes,e=d.length-1;e>=0;e--)(!b||b[d[e].name])&&(c[d[e].name]=d[e].value);return c},j=function(){},k={attributes:function(a,b){b=b&&b.reduce?b.reduce(function(a,b){return a[b]=!0,a},{}):null;var c=i(a,b);return function(){var d=[],e=c,h=i(a,b);return c=h,f(h,function(b,c){e[c]!==b&&d.push(new g({target:a,type:"attributes",attributeName:c,oldValue:e[c]})),delete e[c]}),f(e,function(b,c){d.push(new g({target:a,type:"attributes",attributeName:c,oldValue:e[c]}))}),d}},attributeFilter:j,attributeOldValue:j,childList:function(b){var c=h(b);return function(){var d=[],e=c,f=h(b);return c=f,a.Array.each(f,function(c){var f=a.Array.indexOf(e,c);-1!==f?e.splice(f,1):d.push(new g({target:b,type:"childList",addedNodes:[c]}))}),a.Array.each(e,function(a){d.push(new g({target:b,type:"childList",removedNodes:[a]}))}),d}}};b.MutationObserver=function(a){this._listener=a,this._intervals=[],this._watched=[]},MutationObserver.prototype={options:{period:25},observe:function(b,c){var d=this;c.attributeFilter&&c.attributes&&(c.attributes=c.attributeFilter),f(c,function(a,c){if(a){var e=k[c].call(d,b,a);e&&d._watched.push(e)}}),this._intervals.push(a.later(this.options.period,this,this._watch,{},!1))},_watch:function(){var b=[];a.Array.each(this._watched,function(a){var c=a();c&&d.apply(b,c)}),b.length>0&&this._listener(b,this)},disconnect:function(){a.Array.each(this._intervals,function(a){clearInterval(a)})}}}}(window)},"0.0.1",{requires:[]});
"use strict";YUI.add("rg.core.layout.StickySidebarBoxes",function(a){a.namespace("rg.core.layout"),a.rg.core.layout.StickySidebarBoxes=a.Base.create("StickySidebarBoxes",a.Plugin.Base,[],{initializer:function(){var b=a.one("window").get("winHeight");window.MutationObserver=window.MutationObserver||window.WebKitMutationObserver,window.MutationObserver&&(a.UA.mobile||a.UA.ie>0||300>b||this.initStickyContainer())},emptyStickyContainer:function(){var a=this.get("_stickyContainer"),b=!!this.get("useContainer"),c=a.all(this.get("boxSelector"));b||(c.size()&&c.each(function(b){a.StickyHeaderPlugin.placeholder.insert(b,"before")}),a.StickyHeaderPlugin.placeholder.remove(!0))},initStickyContainer:function(){var b,c,d=this.get("host"),e=d.getDOMNode(),f=0,g=!!this.get("useContainer"),h=a.one("window").get("winHeight")-this.get("pageBottomOffset"),i=this;if(b=this.get("useContainer")?d.one(this.get("useContainer")):a.Node.create("<div></div>")){var j=d.all(this.get("boxSelector"));if(g){if(f=b.get("offsetHeight"),f>h)return void a.log([f,h,"disable"]);b.setStyle("width",d.get("offsetWidth"))}else{if(!j.size())return;c=j.item(j.size()-1),c.insert(b,"after"),b.setStyle("width",d.get("offsetWidth"));var k=function l(a){a&&(b.prepend(a),f=b.get("offsetHeight"),h>f?l(j.pop()):b.insert(a,"before"))};if(k(j.pop()),!b.all(this.get("boxSelector")).size())return}b.StickyHeaderPlugin?b.StickyHeaderPlugin.recalculateLayout():b.plug(a.rg.header.StickyHeaderPlugin,{stickyOffsetTop:this.get("stickyOffsetTop"),restrictToContainer:a.one(this.get("restrictToContainer")),noPlaceHolder:g}),this.observer=new MutationObserver(function(){return b.StickyHeaderPlugin.isFixed?void b.StickyHeaderPlugin.updateNodeTop():(i.observer.disconnect(),i.emptyStickyContainer(),i.timer&&i.timer.cancel(),void(i.timer=a.later(500,i,i.initStickyContainer)))}),this.observer.observe(e,{childList:!0,subtree:!0}),this.set("_stickyContainer",b)}},destructor:function(){this.observer&&this.observer.disconnect(),a.one("window").detach()}},{NS:"StickySidebarBoxes",ATTRS:{boxSelector:{value:".sticky-box"},_stickyContainer:{value:null},stickyOffsetTop:{value:-40},pageBottomOffset:{value:0},useContainer:{value:!1},restrictToContainer:{value:"#content"}}})},"0.0.1",{requires:["rg-sticky-header-plugin","rg.core.util.DOMMutationObserver"]});
"use strict";YUI.add("rg.views.publicliterature.PublicPublicationDetailsView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicPublicationDetailsView=a.Base.create("publicliterature.PublicPublicationDetailsView",a.rg.WidgetView,[],{destructor:function(){a.one("document").unplug(a.rg.core.util.ClipboardPlugin)},afterRendered:function(){a.one("document").plug(a.rg.core.util.ClipboardPlugin,{context:"publications"});var b=new a.rg.core.layout.ResponsiveHelpers;b.matchesBreakpoint("s-lt")||(this.data.showSignUpDialog&&a.Lang.later(3e3,this,function(){a.rg.loadWidget("publicliterature.SignUpDialogPublication.html",{publicationUid:this.data.publicationUid,selectNewSignUpDialog:this.data.selectNewSignUpDialog},function(a){try{a.render({dialog:!0})}catch(b){}})},this),this.data.enableStickyBox&&this.get("container").one(".c-col-right")&&this.get("container").one(".c-col-right").plug(a.rg.core.layout.StickySidebarBoxes,{useContainer:".js-sticky-container"}))}},{ATTRS:{publicationUid:{}}})},"1.0.0",{requires:["rg-utils-url","rg.core.util.ClipboardPlugin","rg.core.layout.ResponsiveHelpers","rg.core.layout.StickySidebarBoxes"]});
"use strict";YUI.add("rg.views.publicliterature.PublicPublicationDetailsOldView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicPublicationDetailsOldView=a.Base.create("publicliterature.PublicPublicationDetailsOldView",a.rg.WidgetView,[],{destructor:function(){a.one("document").unplug(a.rg.core.util.ClipboardPlugin)},afterRendered:function(){a.one("document").plug(a.rg.core.util.ClipboardPlugin,{context:"publications"});var b=new a.rg.core.layout.ResponsiveHelpers;b.matchesBreakpoint("s-lt")||(this.data.showSignUpDialog&&a.Lang.later(3e3,this,function(){a.rg.loadWidget("publicliterature.SignUpDialogPublication.html",{publicationUid:this.data.publicationUid,selectNewSignUpDialog:this.data.selectNewSignUpDialog},function(a){try{a.render({dialog:!0})}catch(b){}})},this),this.data.enableStickyBox&&this.get("container").one(".c-col-right")&&this.get("container").one(".c-col-right").plug(a.rg.core.layout.StickySidebarBoxes,{useContainer:".js-sticky-container"}))}},{ATTRS:{publicationUid:{}}})},"1.0.0",{requires:["rg-utils-url","rg.core.util.ClipboardPlugin","rg.core.layout.ResponsiveHelpers","rg.core.layout.StickySidebarBoxes"]});
"use strict";YUI.add("rg-overlay-extension",function(a){a.namespace("rg.widget");var b="rg-overlay-dark",c=!1;!function(){function d(d,e,g,h,i,j,k,l,m){return m===!0?(a.one("body").addClass(b),c=!0):(a.one("body").removeClass(b),c=!1),f.call(a.rg,d,e,g,h,i,j,k,l),m}function e(){var b='<div class="close"><a class="dialog-close js-dialog-close" href="javascript:" onclick="return false;"></a></div>',d=function(){var d,e,f,g;d=this.get("host"),e=d.get("contentBox"),e.setStyle("position","relative"),f=a.Node.create(b),g=f.one(".js-dialog-close"),c?g.setContent('<span class="ico-close-bold-big"></span><span class="ico-close-bold-big-hover"></span>'):g.setContent('<span class="ico-x-close-light"></span>'),e.append(f),g.on("click",d.hide,d)};this.afterHostMethod("renderUI",d,this)}var f=a.rg.loadWidgetInDialog;a.rg.loadWidgetInDialog=d,a.rg.widget.OverlayCloseable.prototype.initializer=e}()},{requires:["rg-overlay"]});
"use strict";YUI.add("rg.views.publicliterature.PublicationDetailItemView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicationDetailItemView=a.Base.create("publicliterature.PublicationDetailItemView",a.rg.WidgetView,[],{events:{".js-follow-publication":{click:"openFollowDialog"}},afterRendered:function(){var b,c=this.get("container"),d=c.one(".js-pub-details");if(d&&(b=d.one(".js-tooltip-content")),b){var e,f=b.getAttribute("data-tooltip-for");e="container"===f?c:c.one(f),e&&e.plug(a.rg.widget.TooltipPlugin,{content:b.getContent(),type:"mouseenter",align:"bottom",delay:200,width:440,additionalClasses:"journal-info-tooltip",position:function(){var a=d.getXY()[0],b=e.getXY()[1]+e.get("offsetHeight");e.tooltip.get("overlay").get("boundingBox").addClass("tt-align-bottom"),e.tooltip.get("overlay").set("xy",[a,b]),e.tooltip.get("arrow").align(e.tooltip.get("host"),["tc","bc"])}})}},openFollowDialog:function(b){b&&b.preventDefault(),null===a.one(".y-popup-container")&&(this.get("preSignUpDialogContext")?a.rg.loadWidgetInDialog("publictopics.PreSignUpDialog.html",{context:this.get("preSignUpDialogContext")}):a.rg.loadWidgetInDialog("publicliterature.FollowPublicationSignUpDialog.html",{},null,null,null,null,null,null,!0))}},{ATTRS:{preSignUpDialogContext:{}}})},"1.0.0",{requires:["rg-tooltip","rg-overlay-extension"]});
YUI.add("rg.views.publicliterature.PublicationDetailAuthorListView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicationDetailAuthorListView=a.Base.create("publicliterature.PublicationDetailAuthorListView",a.rg.WidgetView,[],{events:{".js-show-more":{click:"showMore"}},showMore:function(){var b=this.get("container"),c=b.one(".js-loading"),d=b.one(".js-show-more"),e=b.one(".js-people-list"),f=e.one(".js-show-more-item"),g=this;c.addClass("rendering-small-transparent"),d.addClass("btn-disabled"),a.rg.ajax(this.widgetUrl,{offset:this.data.nextOffset,useRebrandedImageStyle:this.data.useRebrandedImageStyle},function(b){return b.success?(a.Array.each(b.result.data.peopleItems,function(b){a.rg.createWidget(b,function(a){a.render({append:e,after:function(){if(f){var a=e.one("> li:last-of-type");a.insert(f,"after")}}})},this)}),c.removeClass("rendering-small-transparent"),d.removeClass("btn-disabled"),g.data.nextOffset=b.result.data.nextOffset,void(b.result.data.hasMore||d.hide())):void a.rg.notify("Error loading additional authors","warning")},this,{},"GET")}})},"1.0.0",{requires:["rg-header-notify"]});
"use strict";YUI.add("rg.views.publicliterature.PublicationDetailAccountItemView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicationDetailAccountItemView=a.Base.create("publicliterature.PublicationDetailAccountItemView",a.rg.WidgetView,[],{afterRendered:function(){var b=this.get("container"),c=b.one(".js-tooltip-content"),d=this.data.largeTooltip?360:320,e=this.data.largeTooltip?22:11,f=this.data.largeTooltip?"rebranded-tooltip-account-container":"",g=b.one(".js-contact-author");c&&(b.plug(a.rg.widget.TooltipPlugin,{content:c,additionalClasses:f,type:"mouseenter",persistWhenMouseover:!0,align:"bottom",width:d,arrowOffset:[e,0],delay:500,position:function(){var a=this.get("host"),b=this.get("overlay"),c=this.get("arrow");b.get("boundingBox").addClass("tt-align-bottom"),b.align(a,["tl","bl"]),c.align(a,["tl","bl"])}}),g&&g.on("click",this.showContactAuthorSignUpPopup,this))},showContactAuthorSignUpPopup:function(){this.get("preSignUpDialogContext")?a.rg.loadWidgetInDialog("publictopics.PreSignUpDialog.html",{context:this.get("preSignUpDialogContext")}):a.rg.loadWidgetInDialog("publicliterature.SignUpDialogContactAuthor.html",{accountKey:this.data.accountKey,ac:this.data.accountCount,au:this.data.authorCount})}},{ATTRS:{preSignUpDialogContext:{}}})},"1.0.0",{requires:["rg-tooltip"]});
YUI.add("rg.views.application.PeopleItemView",function(a){a.namespace("rg.views.application"),a.rg.views.application.PeopleItemView=a.Base.create("application.PeopleItemView",a.rg.WidgetView,[],{events:{".js-hide":{click:"hideUser"},".js-show-connection":{click:"showUserConnection"},".js-unhide":{click:"unhideUser"}},afterRendered:function(){var a=this.get("container");a.on("mouseover",this.showHideLink,this),a.on("mouseout",this.hideHideLink,this),a.on("mouseover",this.showConnectionLink,this),a.on("mouseout",this.hideConnectionLink,this),this._tooltipHandling(a)},_tooltipHandling:function(b){var c=b.one(".tooltip-container");if(c){var d,e=c.getAttribute("data-tooltip-for");d="container"===e?b:b.one(e);var f=c.getAttribute("data-tooltip-align"),g=[0,0],h=c.getAttribute("data-tooltip-push-direction"),i=c.getAttribute("data-tooltip-push-amount");if(!d)return;if(a.Lang.isUndefined(f)&&(f="bottom"),!a.Lang.isUndefined(h)&&!a.Lang.isUndefined(i))switch(h){case"right":g=[parseInt(i,10),0];break;case"left":g=[-parseInt(i,10),0];break;case"top":g=[0,parseInt(i,10)];break;case"bottom":g=[0,-parseInt(i,10)]}var j={content:c.getContent(),type:"mouseenter",align:f,overlayOffset:g,arrowOffset:g,delay:200};d.plug(a.rg.widget.TooltipPlugin,j)}},safeDestroy:function(){var a=this.get("container"),b=a.one(".tooltip-container");if(b){var c,d=b.getAttribute("data-tooltip-for");c="container"===d?a:a.one(d),c&&c.tooltip&&(c.tooltip.hide(),c.tooltip.destroy(!0))}this.get("container").remove(!0)},hideUser:function(b){b.preventDefault();var c=this;a.fire("PeopleItem:HideUser",{key:this.data.accountKey,callback:function(){var a=c.get("container");a.addClass("with-overlay"),a.one(".item-content").addClass("under-overlay"),a.one(".item-overlaying").addClass("overlay"),a.one(".unhide-button-container").removeClass("hidden"),a.one(".hide-button-container").addClass("hidden")}})},unhideUser:function(b){b.preventDefault();var c=this;a.fire("PeopleItem:UnhideUser",{key:this.data.accountKey,callback:function(){var a=c.get("container");a.removeClass("with-overlay"),a.one(".item-content").removeClass("under-overlay"),a.one(".item-overlaying").removeClass("overlay"),a.one(".unhide-button-container").addClass("hidden"),a.one(".hide-button-container").removeClass("hidden")}})},showHideLink:function(){var a=this.get("container").one(".hide-button-container"),b=this.get("container").one(".unhide-button-container");a&&b&&b.hasClass("hidden")&&a.show()},hideHideLink:function(){var a=this.get("container").one(".hide-button-container"),b=this.get("container").one(".unhide-button-container");a&&b&&b.hasClass("hidden")&&a.hide()},showConnectionLink:function(){var a=this.get("container").one(".connection-button-container");a&&a.show()},hideConnectionLink:function(){var a=this.get("container").one(".connection-button-container");a&&a.hide()},showUserConnection:function(b){b.preventDefault(),a.fire("PeopleItem:ShowUserConnection",{key:this.data.accountKey})}})},"1.0.0",{requires:["rg-tooltip"]});
YUI.add("rg-like",function(a){a.namespace("rg.like");var b={NONE:0,LIKED:1,DISLIKED:-1};a.rg.like.LIKE_STATE=b,a.rg.like.Like=a.Base.create("Y.rg.like.Like",a.Base,[],{initializer:function(){this.on("stateChange",function(a){this.set("displayCount",this.get("displayCount")+a.newVal-a.prevVal),a.prevVal!=a.newVal&&(a.newVal==b.NONE&&(a.prevVal==b.LIKED?this.set("likeCount",this.get("likeCount")-1):this.set("dislikeCount",this.get("dislikeCount")-1)),a.newVal==b.LIKED&&(this.set("likeCount",this.get("likeCount")+1),a.prevVal==b.DISLIKED&&this.set("dislikeCount",this.get("dislikeCount")-1)),a.newVal==b.DISLIKED&&(this.set("dislikeCount",this.get("dislikeCount")+1),a.prevVal==b.LIKED&&this.set("likeCount",this.get("likeCount")-1)))})},isLiked:function(){return this.get("state")==b.LIKED},isDisliked:function(){return this.get("state")==b.DISLIKED},like:function(a,c,d,e){this._changeState(b.LIKED,this.get("likeUrl"),a,{onSuccess:c,onError:d,context:e||this})},dislike:function(a,c,d,e){this._changeState(b.DISLIKED,this.get("dislikeUrl"),a,{onSuccess:c,onError:d,context:e||this})},_changeState:function(b,c,d,e){return this.get("state")==b?void this.removeLike(d,e):(this.set("state",b),void a.rg.ajax(c,d,this._onStateChanged,this,e))},_onStateChanged:function(a,b){return a.success?void(b.onSuccess&&b.onSuccess.call(b.context,a)):void(b.onError&&b.onError.call(b.context,a))},removeLike:function(c,d,e,f){var g;a.Lang.isObject(d)&&!a.Lang.isFunction(d)&&(g=d),this.set("state",b.NONE),a.rg.ajax(this.get("removeLikeUrl"),c,this._onStateChanged,this,g||{onSuccess:d,onError:e,context:f||this})}},{ATTRS:{displayCount:{value:0},likeCount:{value:0},dislikeCount:{value:0},likeUrl:{},dislikeUrl:{},removeLikeUrl:{},state:{value:b.NONE,setter:function(c){return a.Lang.isNumber(c)?c:b[c.toUpperCase()]},validator:function(c){if(a.Lang.isNumber(c)){for(var d in b)if(b.hasOwnProperty(d)&&b[d]==c)return!0;return!1}return null!=b[c.toUpperCase()]}}}})},"0.0.1",{requires:[]});
YUI.add("rg-container-hover",function(a){a.namespace("rg.plugins"),a.rg.plugins.ContainerHover=a.Base.create("ContainerHover",a.Plugin.Base,[],{initializer:function(){var a=this.get("host"),b=this.get("itemSelector"),c=this.get("_handles");b?c.push(a.delegate("hover",this._overFn,this._outFn,b,this)):c.push(a.on("hover",this._overFn,this._outFn,this))},destructor:function(){a.Array.each(this.get("_handles"),function(a){a.detach()})},_overFn:function(a){var b=this.get("overCallback");a.currentTarget.addClass(this.get("cssClasses")),b&&b.call(this.get("overCtx"),a)},_outFn:function(a){var b=this.get("outCallback");a.currentTarget.removeClass(this.get("cssClasses")),b&&b.call(this.get("outCtx"),a)}},{NS:"ContainerHover",ATTRS:{_handles:{value:[]},itemSelector:{},cssClasses:{value:"hover"},overCtx:{value:null},overCallback:{value:null},outCtx:{value:null},outCallback:{value:null}}})},"0.0.1",{requires:["event-hover"]});