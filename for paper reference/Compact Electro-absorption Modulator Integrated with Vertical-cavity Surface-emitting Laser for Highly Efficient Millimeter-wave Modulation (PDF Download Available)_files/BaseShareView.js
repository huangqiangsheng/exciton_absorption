YUI.add("rg-expander",function(a){a.namespace("rg.plugins"),a.rg.plugins.Expander=a.Base.create("Expander",a.Plugin.Base,[],{initializer:function(b){this.container=this.get("host");var c=this.container.get("offsetHeight"),d=this.container.get("scrollHeight");if(this.set("collapsedHeight",c),d>c||b.forceShowLoadMore){var e=a.Node.create("<div></div>"),f=a.Node.create("<a></a>"),g=a.Node.create("<span></span>");e.addClass("less-new-line"),g.setContent(this.get("expandLinkText")),f.addClass(this.get("toggleLinkClass")),f.addClass("expand-link"),f.on("click",this.toggle,this),f.append(g),this.container.append(e),this.container.append(f),this.toggleLink=f,this.toggleLinkText=g}else this.container.setStyle("maxHeight","none")},toggle:function(a){a&&a.preventDefault(),this.container.hasClass(this.get("containerCollapsedClass"))?(this.container.removeClass(this.get("containerCollapsedClass")),this.toggleLinkText.setContent(this.get("collapseLinkText")),this.toggleLink.removeClass("expand-link").addClass("collapse-link"),this.container.setStyle("maxHeight","none"),this.container.fire("expand")):(this.container.addClass(this.get("containerCollapsedClass")),this.toggleLinkText.setContent(this.get("expandLinkText")),this.toggleLink.removeClass("collapse-link").addClass("expand-link"),this.container.setStyle("maxHeight",this.get("collapsedHeight")),this.container.fire("collapse"))}},{NS:"Expander",ATTRS:{collapseLinkText:{value:"[less]"},expandLinkText:{value:"[more]"},toggleLinkClass:{value:"js-expander-toggle"},containerCollapsedClass:{value:"js-expander-collapsed"},collapsedHeight:{value:null}}})},"0.0.1",{requires:["event-hover"]});
"use strict";YUI.add("rg.views.publicliterature.PublicationAbstractView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicationAbstractView=a.Base.create("publicliterature.PublicationAbstractView",a.rg.WidgetView,[],{events:{".edit-link":{click:"openEdit"},".add-link":{click:"openEdit"}},afterRendered:function(){if(this.data.canEdit&&!this.data.isAdmin&&!this.data["abstract"]){var b=this.get("container").one(".add-link");b&&(b.plug(a.rg.widget.TooltipPlugin,{content:"Add an abstract to let other researchers know what your publication is about.",type:"custom",overlayOffset:[65,0],width:220}),b.tooltip.show(),a.one("body").once("click",function(){b.unplug(a.rg.widget.TooltipPlugin)}))}this.data.canEdit&&this.data["abstract"]&&this.get("container").plug(a.rg.plugins.ContainerHover),this.get("container").one(".js-expander-container")&&this.get("container").one(".js-expander-container").plug(a.rg.plugins.Expander)},openEdit:function(b){var c=this.get("container");c.addClass("rendering"),b.preventDefault(),a.rg.loadWidget("literature.PublicationAbstractEdit.html",{publicationUid:this.data.publicationUid},function(a){a.render({replace:c})},this)}})},"1.0.0",{requires:["rg-like","rg-tooltip","rg-container-hover","rg-expander"]});
"use strict";YUI.add("rg.views.publicliterature.FigureListView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.FigureListView=a.Base.create("publicliterature.FigureListView",a.rg.WidgetView,[],{events:{".js-click-link":{click:"onClickLink"},global:{"figures:reloadList":"onReloadList"}},afterRendered:function(){var b=this.get("container");b.all("[rel=tooltip]").each(function(b){b.plug(a.rg.widget.TooltipPlugin,{align:"top",content:b.getData("tooltip"),width:180})})},onOpenDialog:function(b){b.preventDefault();var c=b.target.getData("key");c||(c=b.target.ancestor("a").getData("key")),this.data.readerDocId&&c&&a.rg.loadWidgetInDialog("publicliterature.FigureDialog.html",{readerDocId:this.data.readerDocId,figureKey:c,isDialog:this.data.isDialog},null,this,null,"GET","figure-dialog")},reloadFigureList:function(a){this.data.figures.forEach(function(b){b.disabled=b.key==a}),this.data.excludedFigureKey=a,this.render({refresh:!0})},onClickLink:function(a){"link"!=this.data.linkBehaviour&&"dialog"==this.data.linkBehaviour&&this.onOpenDialog(a)},onReloadList:function(a){this.reloadFigureList(a.figureKey)}},{ATTRS:{}})},"1.0.0",{requires:[]});
YUI.add("rg.views.publicliterature.PublicationResourcesView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicationResourcesView=a.Base.create("publicliterature.PublicationResourcesView",a.rg.WidgetView,[],{events:{global:{"PublicationFulltextPreview::viewOtherSources":"_toggleContainer"},".js-toggle":{click:"_toggleContainer"}},_toggleContainer:function(){var a=this.get("container"),b=a.one(".js-collapse-list");if(b){var c=b.hasClass("hidden");c?(a.one(".js-expand-list").addClass("hidden"),b.removeClass("hidden"),a.all(".pub-resource-item").show()):(a.one(".js-expand-list").removeClass("hidden"),b.addClass("hidden"),a.all(".pub-resource-item").hide()),a.one(".scroll-wrapper")&&(c?a.one(".scroll-wrapper").removeClass("hidden"):a.one(".scroll-wrapper").addClass("hidden"))}}})},"0.0.1",{requires:["rg-header-notify","transition","rg-anim"]});
"use strict";var googletag=googletag||{};googletag.cmd=googletag.cmd||[],YUI.add("rg.views.application.GoogleDfpSlotView",function(a){a.namespace("rg.views.application"),a.rg.views.application.GoogleDfpSlotView=a.Base.create("application.GoogleDfpSlotView",a.rg.WidgetView,[],{afterRendered:function(){var b=this;a.Lang.isUndefined(window._slotmessagehandler)&&(window._slotmessagehandler=a.on("message",function(c){if(a.Lang.isString(c._event.data)){var d=c._event.data.split(":"),e=d[0],f=d[1];"openDialog"!=e||a.Lang.isUndefined(f)||a.rg.loadWidgetInDialog("ads.LeadGenDialog.html",{orderId:f,targetingInfo:b.data.targetingInfo},null,null,null,"POST")}})),this.initAdSlot(),"undefined"==typeof window.blockAdBlock?this.trackLoadingStages("has-ab"):(window.blockAdBlock.onDetected(function(){b.trackLoadingStages("has-ab")}),window.blockAdBlock.check())},initAdSlot:function(){this.trackBackendLoadingTime(),this.trackLoadingStages("ClientSideAfterRendered");var b=this.data.url,c=this.data.snippetId,d=this.data.targetingInfo,e=this.data.slotSizes,f=this.data.collapseSlot,g=this;googletag.cmd.push(function(){var h=googletag.defineSlot(b,e,c).addService(googletag.pubads());if(d)for(var i in d)d.hasOwnProperty(i)&&h.setTargeting(i,d[i]);g.trackLoadingStages("TargetingInfoSet"),googletag.pubads().enableSingleRequest(),"never"===f?h.setCollapseEmptyDiv(!1):"afterFetch"===f?h.setCollapseEmptyDiv(!0):"beforeFetch"===f&&h.setCollapseEmptyDiv(!0,!0),googletag.enableServices(),h.oldRenderEnded=h.oldRenderEnded||h.renderEnded,h.oldImpressionViewable=h.oldImpressionViewable||h.impressionViewable,h.impressionViewable=function(){g.trackLoadingStages("ImpressionViewable"),h.oldImpressionViewable()},h.renderEnded=function(b){a.rg.ajax("application.GoogleDfpSlot.countImpression.html",{isEmpty:b.isEmpty?!0:!1,slotId:g.data.slotId,adSlotReferrer:g.data.adSlotReferrer,creativeId:b.creativeId,lineItemId:b.lineItemId},null,this,null,"POST"),g.trackLoadingStages("SlotRenderEnded"),b.isEmpty&&g.data.fallbackContainerEnabled&&a.rg.loadWidget(g.data.fallbackContainer,g.data,function(a){a.render({replace:g.get("container")})}),h.oldRenderEnded()}}),googletag.cmd.push(function(){googletag.display(c),g.trackLoadingStages("GoogleTagCmdPush")})},trackLoadingStages:function(b){var c=!1;this.trackTimings()&&(c=Date.now()-window.performance.timing.requestStart,(0>c||c>6e4)&&(c=!1)),a.rg.ajax("application.GoogleDfpSlot.ajaxTrackLoading.html",{type:b,slotId:this.data.slotId,millisecondsSinceRequestStart:c},null,this,null,"POST")},trackBackendLoadingTime:function(){this.trackTimings()&&a.rg.ajax("application.GoogleDfpSlot.ajaxTrackLoading.html",{type:"BackendRequestFinished",slotId:this.data.slotId,millisecondsSinceRequestStart:window.rgConfig.backendTime},null,this,null,"POST")},trackTimings:function(){return window.performance&&window.performance.timing&&window.performance.timing.requestStart&&window.rgConfig&&window.rgConfig.backendTime}})},"1.0.0",{requires:["google-publisher-tag","blockadblock"]});
YUI.add("rg-dropdown-plugin",function(a){a.namespace("rg.plugin"),a.rg.plugin.DropdownPlugin=a.Base.create("DropdownPlugin",a.Plugin.Base,[],{activator:null,menu:null,event:null,initializer:function(){var a=this.get("host");this.activator=a.one(this.get("activatorSelector")),this.menu=a.one(this.get("menuSelector")),this.event=this.activator.on("click",this._onToggle,this)},destructor:function(){this.get("host").removeClass(this.get("openClass")),this.event.detach()},_onToggle:function(a){var b=this.get("host"),c=a.target;this.get("ignoreToggle")||c.hasClass("js-ignore-dropdown-toggle")||this.get("ignoreInsideClick")&&c.ancestor(this.get("menuSelector"))&&!c.hasClass(this.get("closeDropdownClass"))||(this.event.detach(),b.hasClass(this.get("openClass"))?this._closeDropdown(a):this._openDropdown(a))},_openDropdown:function(b){this.get("ignoreLinks")&&b.preventDefault(),a.Lang.later(10,this,function(){this.event=a.one("document").on("click",this._onToggle,this),this.get("callbackOnOpen")&&this.get("callbackOnOpen").apply(this.get("callbackContext"),[this,b])});var c=this.get("host"),d=this.get("openClass");c.toggleClass(d)},_closeDropdown:function(a){this.get("ignoreLinks")&&a.preventDefault(),this.event=this.activator.on("click",this._onToggle,this),this.get("callbackOnClose")&&this.get("callbackOnClose").apply(this.get("callbackContext"),[this,a]);var b=this.get("host"),c=this.get("openClass");b.toggleClass(c)}},{NS:"dropdownPlugin",ATTRS:{activatorSelector:{value:".dropdown-toggle"},menuSelector:{value:".dropdown-menu"},openClass:{value:"dropdown-open"},ignoreInsideClick:{value:!1},callbackOnOpen:{value:null},callbackOnClose:{value:null},callbackContext:{value:this},closeDropdownClass:{value:"js-close-dropdown"},ignoreToggle:{value:!1},ignoreLinks:{value:!1}}})},"0.0.1",{requires:["transition"]});
YUI.add("rg.views.publicliterature.PublicationCitationsView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicationCitationsView=a.Base.create("publicliterature.PublicationCitationsView",a.rg.WidgetView,[],{events:{global:{publicationsCitationsUpdated:"publicationsCitationsUpdated","PublicationCitationsList::showMoreLoaded":"publicationCitationsMoreLoaded"},".js-citations":{click:"loadCitations"},".js-cited-in":{click:"loadCitedIn"}},initializer:function(){this.events.global||(this.events.global={});var a="PublicLiteratureDocumentViewerView::download";this.events.global[a]="onDownloadFromDocumentViewer"},afterRendered:function(){var b=this.get("container"),c=b.one(".js-cited-in-tooltip");b.one(".js-citations-sorter")&&this.bindSorting(),c&&c.plug(a.rg.widget.TooltipPlugin,{content:"This list is based on the publications in our database and might not be exhaustive."}),this.data.tracking&&this.setupTracking()},bindSorting:function(){var b=this,c=this.get("container"),d=c.one(".js-citations-sorter");d.plug(a.rg.plugin.DropdownPlugin,{}),d.all(".dropdown-menu a").on("click",function(a){b.data.sort=a.currentTarget.getAttribute("data-sort"),c.one(".js-current-sorting").setContent(a.currentTarget.getContent()),b.loadCitations()})},loadCitations:function(a){a&&a.preventDefault();var b=this.get("container");b.one(".js-citations").addClass("tab-item-active"),b.one(".js-cited-in")&&b.one(".js-cited-in").removeClass("tab-item-active"),b.one(".js-citations-sorter")&&b.one(".js-citations-sorter").show(),this.data.citationList="outgoing",this._loadList("publicliterature.PublicationCitationsList.html")},loadCitedIn:function(a){a&&a.preventDefault();var b=this.get("container");b.one(".js-citations")&&b.one(".js-citations").removeClass("tab-item-active"),b.one(".js-cited-in").addClass("tab-item-active"),b.one(".js-citations-sorter")&&b.one(".js-citations-sorter").hide(),this.data.citationList="incoming",this._loadList("publicliterature.PublicationIncomingCitationsList.html")},_loadList:function(b){var c=this,d=this.get("container").one(".js-citations-list-container"),e={publicationUid:this.data.publicationUid},f=["showContexts","usePlainButton","useEnrichedContext","showCitationsSorter","showAllCitations","showAbstract","showType","showPublicationPreview","swapJournalAndAuthorPositions"];f.forEach(function(a){c.data.hasOwnProperty(a)&&(e[a]=c.data[a])}),this.data.sort&&(e.sort=this.data.sort),d.addClass("rendering"),a.rg.loadWidget(b,e,function(a){a.render({replaceContent:d,after:function(){d.removeClass("rendering"),c.data.tracking&&c.setupTracking()}})})},publicationsCitationsUpdated:function(){var b=this,c=this.get("container");c.addClass("rendering"),a.rg.loadWidget(this.widgetUrl,{publicationUid:this.data.publicationUid,sort:this.data.sort,citationList:this.data.citationList},function(a){a.render({replace:c,after:function(){c.removeClass("rendering"),b.data.tracking&&b.setupTracking()}})})},publicationCitationsMoreLoaded:function(){this.data.tracking&&this.setupTracking()},onDownloadFromDocumentViewer:function(){a.fire("PublicationCitationsView::trackInteractionWith",{source:this.data.tracking.sources[".viewer-action-download"],citationList:this.data.citationList,viewer:1})},setupTracking:function(){a.Object.each(this.data.tracking.sources,function(b,c){var d=this.get("container").all(c);if(d){var e=d.get("protocol"),f=e&&0===e.indexOf("http")?"mouseup":"click";d.on(f,function(){a.fire("PublicationCitationsView::trackInteractionWith",{source:b,citationList:this.data.citationList})},this)}},this)}})},"1.0.0",{requires:["rg-dropdown-plugin","rg-tooltip"]});
YUI.add("rg.views.publicliterature.PublicationIncomingCitationsListView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicationIncomingCitationsListView=a.Base.create("publicliterature.PublicationIncomingCitationsListView",a.rg.WidgetView,[],{events:{".js-show-more":{click:"showMore"}},showMore:function(b){b&&b.preventDefault();var c={publicationUid:this.data.publicationUid,sort:this.data.sort,limit:this.data.pageSize,offset:this.data.newOffset},d=this.get("container").one(".c-list");this.get("container").one(".js-show-more").hide(),this.get("container").one(".list-loading").show(),a.rg.loadWidget(this.widgetUrl,c,function(b){var c=b.data.citationItems;this.data.pageSize=b.data.pageSize,this.data.newOffset=b.data.newOffset,this.data.hasShowMore=b.data.hasShowMore,a.Array.each(c,function(b){try{a.rg.createWidget(b,function(a){a.render({append:d})})}catch(c){a.log(c)}},this),this.data.hasShowMore&&this.get("container").one(".js-show-more").show(),this.get("container").one(".list-loading").hide()},this)}})},"1.0.0",{requires:[]});
YUI.add("rg-confirm",function(a){a.namespace("rg"),a.rg.confirm=function(b){if(b.hasInputBox){if(b.body=a.Node.create("<p>"+b.body+"</p>"),b.inputBoxLabel){var c=a.Node.create("<label>"+b.inputBoxLabel+"</label>");b.body.appendChild(c)}var d=a.Node.create('<input type="text" class="js-confirm-input" class="text"/>');b.body.appendChild(d)}b=a.merge({headerContent:"<h4>"+b.header+"</h4>",bodyContent:b.body,footerContent:"",zIndex:1100,render:!0,visible:!1,plugins:[{fn:a.rg.widget.OverlayPopup,cfg:{handleResize:!0,hideOnClickOutside:!1}}]},b);var e,f,g=new a.rg.widget.Dialog(b),h=g.getStdModNode(a.WidgetStdMod.FOOTER);g.get("contentBox").addClass("confirm-dialog"),g.get("contentBox").one(".close a").remove(!0),e=a.Node.create("<div></div>"),e.addClass("confirm-actions rf"),a.Array.each(b.buttons,function(b){var c=a.Node.create("<a></a>");c.set("href","javascript:;"),c.addClass("btn btn-margin btn-confirm-dialog"),b.primary?c.addClass("btn-promote"):b.attention?c.addClass("btn-attention"):c.addClass("btn-plain"),c.setContent(b.label),c.set("id",b.id),e.append(c)}),h.append(e),f=a.Node.create('<div class="clear"></div>'),h.append(f);var i=function(){var a;return b.hasInputBox&&(a=g.bodyNode.one(".js-confirm-input").get("value")),a};return g.get("boundingBox").on("key",function(){h.one("#confirm")&&(g.hide(),g.destroy(),b.callback.call(b.context||this,"confirm",i()))},"enter",this),g.get("boundingBox").on("key",function(){h.one("#cancel")&&(g.hide(),g.destroy(),b.callback.call(b.context||this,"cancel",i()))},"esc",this),h.all(".btn-confirm-dialog").on("click",function(a){g.hide(),g.destroy(),b.callback&&b.callback.call(b.context||this,a.target.get("id"),i())},this),g.show(),g}},"0.2.0",{requires:["rg-overlay","overlay","event-key"]});
"use strict";YUI.add("rg.views.publicliterature.PublicationItemView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicationItemView=a.Base.create("publicliterature.PublicationItemView",a.rg.WidgetView,[],{events:{".js-toggle-abstract":{click:"collapse"},".js-context-show-more-link":{click:"showMoreContext"},".action-remove":{click:"remove"},".action-follow":{click:"toggleFollow"},".action-download":{click:"download"},".action-request.primary":{click:"requestPrimary"},".action-request.image":{click:"requestImage"},".action-departmentremove":{click:"removeFromDepartmentpage"},".action-profileremove":{click:"removeFromProfile"},".js-remove-citation":{click:"removeCitationPublication"},".action-share":{click:"sharePublication"},".action-request-external":{click:"externalPublicationRequest"}},publicationBookmarkEndpoint:"literature.AjaxFollowPublication.html",publicationAuthorshipEndpoint:"literature.AjaxPublicationAuthorship.html",initializer:function(){var a="fulltextPreviewClosed:publicationUid-"+this.data.publicationUid;this.events.global||(this.events.global={}),this.events.global[a]="onPreviewClosed"},afterRendered:function(){var b=this.get("container");b.plug(a.rg.plugins.ContainerHover,{cssClasses:"list-hover"});var c=b.one(".js-pending");c&&c.plug(a.rg.widget.TooltipPlugin,{content:b.one(".info-tooltip-content").getContent(),align:"right",arrowOffset:[10,0],overlayOffset:[10,0]});var d={};this.data.displayUpdatedExpanderPlugin&&(d.expandLinkText="+ more",d.collapseLinkText="- less"),this.data.collapseTitle&&b.one(".js-title")&&b.one(".js-title").plug(a.rg.plugins.Expander,d),this.data.collapseAuthors&&b.one(".js-authors")&&b.one(".js-authors").plug(a.rg.plugins.Expander,d),this.data.collapseAbstract&&b.one(".js-abstract")&&b.one(".js-abstract").plug(a.rg.plugins.Expander,d),this.hasSeenPromo=!1,this.hasRequested=!1},externalPublicationRequest:function(b){b.preventDefault();var c=b.currentTarget,d=c.getData("context");this.get("preSignUpDialogContext")?a.rg.loadWidgetInDialog("publictopics.PreSignUpDialog.html",{context:this.get("preSignUpDialogContext")}):a.rg.loadWidgetInDialog("publicliterature.ExternalUserRequestFulltextDialog.html",{publicationUid:this.data.publicationUid,context:d})},download:function(){this.data.showPublicationDownloadDataUsagePermissionDialog&&a.Lang.later(2e3,this,function(){a.rg.loadWidget("literature.PublicationDownloadDataUsagePermissionDialog.html",{},function(b){b.getDefaultDialogConfig=function(){return{hideOnClickOutside:!1,plugins:[{fn:a.Plugin.OverlayAutohide,cfg:{clickedOutside:!1,pressedEscape:!0,focusedOutside:!1}}]}};try{b.render({dialog:!0})}catch(c){return!1}})},this)},removeCitationPublication:function(){this.data.publicationCitationUid&&this.data.citationSourcePublicationUid?this.removeOutgoingCitationPublication():this.removeIncomingCitationPublication()},removeOutgoingCitationPublication:function(b){b&&b.preventDefault();var c=this;a.rg.confirm({header:"Remove Citation",body:"Are you sure you want to remove this citation?",buttons:[{id:"confirm",label:"Remove"},{id:"cancel",label:"Cancel"}],callback:function(b){"confirm"===b&&a.rg.ajaxDbwAware("publicliterature.PublicationCitationsList.removeCitation.html",{publicationUid:c.data.citationSourcePublicationUid,publicationCitationUid:c.data.publicationCitationUid},function(b){b.success?(a.Lang.isArray(b.result)&&1===b.result.length&&a.rg.notify(b.result[0],"attention"),this.get("container").remove(!0)):a.Lang.isArray(b.errors)&&1===b.errors.length?a.rg.notify(b.errors[0],"warning"):a.rg.notify("An error occurred.","warning")},c,{},"POST")}})},removeIncomingCitationPublication:function(b){b&&b.preventDefault();var c=this;a.rg.confirm({header:"Remove Citation",body:"Are you sure you want to remove this citation?",buttons:[{id:"confirm",label:"Remove"},{id:"cancel",label:"Cancel"}],callback:function(b){"confirm"===b&&a.rg.ajaxDbwAware("publicliterature.PublicationIncomingCitationsList.removeCitation.html",{citingPublicationUid:c.data.publicationUid,citedPublicationUid:c.data.citationSourcePublicationUid},function(b){b.success?(a.Lang.isArray(b.result)&&1===b.result.length&&a.rg.notify(b.result[0],"attention"),this.get("container").remove(!0)):a.Lang.isArray(b.errors)&&1===b.errors.length?a.rg.notify(b.errors[0],"warning"):a.rg.notify("An error occurred.","warning")},c,{},"POST")}})},showMoreContext:function(){var b=this.get("container"),c=b.one(".citation-context-item");return a.rg.ajax("application.AjaxCommon.ajaxScoreGoal.html",{goal:this.data.milestones.moreContext,viewIds:this.data.nextDetailPageExperimentViewId}),c.hasClass("show-more-context")?void c.removeClass("show-more-context"):(b.all(".js-context-show-more").removeClass("show-more-context"),void c.addClass("show-more-context"))},collapse:function(a){a.preventDefault();var b=this.get("container"),c=b.one(".abstract");c.toggleClass("collapsed")},_baseRemoveDialog:function(b,c,d){b.preventDefault();var e=this;a.rg.loadWidget("literature.PublicationRemoveDialog.html",{publicationUid:this.data.publicationUid,contextSource:c},function(a){a.on("publicationRemove",d,e),a.render({dialog:{}})})},remove:function(a){this._baseRemoveDialog(a,"profile",this.removePublication)},removeFromDepartmentpage:function(a){this._baseRemoveDialog(a,"department",this.removePublication)},removeFromProfile:function(a){this._baseRemoveDialog(a,"profile",this.removePublication)},removePublication:function(b){var c={publicationUid:this.data.publicationUid,reason:b.remove_option,reasonText:b.remove_text,contextSource:this.data.context,contextId:this.data.contextId},d=this.get("container");a.rg.ajaxDbwAware(this.publicationAuthorshipEndpoint,c,function(b){b.success&&a.rg.notify(b.result[0],"promo")},this,null,"DELETE"),d.hide("fadeOut",{},function(){d.remove(!0)})},sharePublication:function(b){b.preventDefault(),a.rg.loadWidgetInDialog("literature.PublicationShareDialog.html",{publicationUid:this.data.publicationUid})},toggleFollow:function(b){b.preventDefault();var c={publicationUid:this.data.publicationUid,context:this.get("followContext")};b.currentTarget.hasClass("animation-in-progress")||(this.followButtonStateChange(b.currentTarget,this.data.isReader),!this.data.isReader&&this.data.eventCode&&(c.eventCode=this.data.eventCode),a.rg.ajaxDbwAware(this.get("publicationBookmarkEndpointUrl"),c,function(c){return c.success?void a.rg.notify(c.result[0],"promo"):void this.followButtonStateChange(b.currentTarget,!this.data.isReader)},this,null,this.data.isReader?"DELETE":"POST"),this.data.isReader=!this.data.isReader)},followButtonStateChange:function(a,b){a.one(".js-btn-label").setContent(b?"Follow":"Following"),a.toggleClass("active")},onPreviewClosed:function(){this.openFulltextRequestInvitationDialog()},requestPrimary:function(a){return this.request(a,this.data.requestEndpointPrimary)},requestImage:function(a){return this.request(a,this.data.requestEndpointImage)},request:function(b,c){if(b&&b.preventDefault(),!b.currentTarget.hasClass("disabled")){var d=this,e={resourceId:this.data.publicationUid,context:this.data.eventCode?"pubitem-"+this.data.eventCode:"pubitem"};this.toggleDisableAllActions(),this.hasRequested=!this.hasRequested,this.changeFulltextRequestState(),this.data.nextPublicationMilestone&&this.data.nextPublicationViewId&&a.rg.ajax("application.AjaxCommon.ajaxScoreGoal.html",{goal:this.data.nextPublicationMilestone,viewIds:this.data.nextPublicationViewId}),a.rg.ajax(c,e,function(c){d.toggleDisableAllActions(),c.success?c.result.requested?(a.rg.notify("Full-text requested.","attention"),b.currentTarget.hasClass("image")&&d.get("opensViewer")||d.openFulltextRequestInvitationDialog(),d.undoTimeout=a.later(1e4,d,d.disableFurtherRequest,[b]),a.fire("fulltextRequested:publicationUid-"+d.data.publicationUid)):c.result.requestCancelled&&(a.rg.notify("Full-text request cancelled.","attention"),d.undoTimeout&&d.undoTimeout.cancel(),a.fire("fulltextRequestCancelled:publicationUid-"+d.data.publicationUid)):(a.rg.notify(c.errors,"warning"),d.hasRequested=!d.hasRequested,d.changeFulltextRequestState())})}},changeFulltextRequestState:function(){this.requestButtonStateChange(),this.previewFulltextStateChange()},toggleDisableAllActions:function(){var a=this.get("container"),b=a.one(".js-request-btn"),c=a.one(".action-request.image");c&&c.toggleClass("disabled"),b&&b.toggleClass("disabled")},requestButtonStateChange:function(){var a=this.get("container"),b=a.one(".js-request-btn");this.hasRequested&&b?(b.one(".js-btn-label").setContent("Full-text requested"),b.one(".js-icon")&&b.one(".js-icon").removeClass("hidden")):b&&(b.one(".js-btn-label").setContent("Request full-text"),b.one(".js-icon")&&b.one(".js-icon").addClass("hidden"))},previewFulltextStateChange:function(){var a=this.get("container"),b=a.one(".publication-preview");if(b&&b.one(".preview-action")){var c=b.one(".preview-action");this.hasRequested?(c.one(".text-request").addClass("hidden"),c.one(".text-requested").removeClass("hidden")):(c.one(".text-request").removeClass("hidden"),c.one(".text-requested").addClass("hidden"))}},disableFurtherRequest:function(b){b.currentTarget.addClass("btn-disabled"),b.currentTarget.addClass("requested"),a.fire("fulltextRequestFinished:publicationUid-"+this.data.publicationUid)},openFulltextRequestInvitationDialog:function(){!this.hasSeenPromo&&this.hasRequested&&(a.rg.loadWidget(this.get("requestFulltextInvitationDialogUrl"),{publicationUid:this.data.publicationUid},function(b){try{b.render({dialog:!0})}catch(c){a.log("Could not load widget.")}},this),this.hasSeenPromo=!0)}},{ATTRS:{requestEndpoint:{value:""},opensViewer:{value:!1},requestFulltextInvitationDialogUrl:{},followContext:{},publicationBookmarkEndpointUrl:{},preSignUpDialogContext:{}}})},"0.0.1",{requires:["rg-header-notify","transition","rg-confirm","rg-container-hover","rg-tooltip","rg-expander","rg-utils-url"]});
"use strict";YUI.add("rg.views.publicliterature.PublicationItemFulltextView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicationItemFulltextView=a.Base.create("publicliterature.PublicationItemFulltextView",a.rg.WidgetView,[],{events:{".js-open-viewer":{click:"onOpenViewer"},".js-publication-item-fulltext":{mouseenter:"preloadViewer"},".js-external-request-fulltext":{click:"onExternalRequestFulltext"}},initializer:function(){this.once("rendered",function(){var b=this.get("container"),c=b.one(".js-show-source"),d=b.one(".js-citation-count-tooltip");if(c&&c.plug(a.rg.widget.TooltipPlugin,{content:b.one(".tooltip-content").getContent(),align:"right",arrowOffset:[10,0],overlayOffset:[10,0]}),this.data.previewUrl){var e=a.Node.create('<div class="preview-img"><img class="lazyload" data-src="'+this.data.previewUrl+'" /></div>');e.once("error",function(){e.remove()}),b.one(".js-publication-item-fulltext-content").prepend(e)}d&&d.plug(a.rg.widget.TooltipPlugin,{content:d.getAttribute("data-tooltip")})},this);var b="fulltextRequested:publicationUid-"+this.data.publicationUid,c="fulltextRequestCancelled:publicationUid-"+this.data.publicationUid,d="fulltextRequestFinished:publicationUid-"+this.data.publicationUid;this.events.global||(this.events.global={}),this.events.global[b]="onRequestFulltext",this.events.global[c]="onRequestFulltextCancelled",this.events.global[d]="onRequestFulltextFinished"},preloadViewer:function(){if(!this.data.disableViewer){var b=this;!b.preloaded&&b.data.linkId&&b.data.publicationUid&&b.data.previewUrl&&(b.preloaded=!0,a.rg.preloadWidget(this.data.documentViewerUrl,{},!0))}},onOpenViewer:function(b){if(!this.data.disableViewer){b.preventDefault();var c=this;c.data.linkId&&c.data.publicationUid&&a.rg.loadWidgetInDialog(this.data.documentViewerUrl,{},null,this)}},onExternalRequestFulltext:function(b){b.preventDefault();var c=b.currentTarget,d=c.getData("context");this.get("preSignUpDialogContext")?a.rg.loadWidgetInDialog("publictopics.PreSignUpDialog.html",{context:this.get("preSignUpDialogContext")}):a.rg.loadWidgetInDialog("publicliterature.ExternalUserRequestFulltextDialog.html",{publicationUid:this.data.publicationUid,context:d})},onRequestFulltext:function(){var a=this.get("container"),b=a.one(".js-requests-info"),c=this.data.requestCount+1,d=c+" request";1!=c&&(d+="s"),b.setContent(d)},onRequestFulltextCancelled:function(){var a=this.get("container"),b=a.one(".js-requests-info"),c=this.data.requestCount+" request";1!=this.data.requestCount&&(c+="s"),b.setContent(c)},onRequestFulltextFinished:function(){this.data.hasRequested=!0,this.data.requestCount++,this.render({refresh:!0}),this.initializer()}},{ATTRS:{preSignUpDialogContext:{}}})},"0.0.1",{requires:["rg-header-notify","transition","rg-tooltip"]});
YUI.add("rg.core.form.RgChosen",function(a){a.namespace("rg.core.form"),a.rg.core.form.RgChosen=function(b,c){if(a.UA.ie>0&&a.UA.ie<9)return!1;var d=a.one(b);return d?new Chosen(d.getDOMNode(),c):!1}},"1.0.0",{requires:["chosen"]});
"use strict";YUI.add("rg.views.publicliterature.PublicationInlineReaderView",function(a){a.namespace("rg.views.publicliterature"),a.rg.views.publicliterature.PublicationInlineReaderView=a.Base.create("publicliterature.PublicationInlineReaderView",a.rg.WidgetView,[],{events:{".js-publication-version-select":{change:"changeVersion"},".js-download":{click:"downloadPdfWithCoverPage"},".js-open-large-pdf":{click:"lazyLoadViewer"}},destructor:function(){this.messageHandler&&this.messageHandler.detach()},afterRendered:function(){var b=this,c=this.get("container"),d=new a.rg.core.layout.ResponsiveHelpers,e=c.one(".js-sticky-header");c.one(".js-social-share").plug(a.rg.header.StickyHeaderPlugin),null!==e&&d.matchesBreakpoint("s-ge")&&e.plug(a.rg.header.StickyHeaderPlugin,{}),this.trackedDownloads={},a.rg.core.form.RgChosen(".js-publication-version-select",{disable_search:!0}),this.messageHandler=a.on("pdf-js-download",function(a){b.trackDownload(a.type)})},changeVersion:function(){var b=this.get("container"),c=b.one(".js-publication-version-select option:checked"),d=b.one(".js-download"),e=b.one(".js-doi-container"),f=e.one(".js-doi"),g=b.one("iframe"),h=b.one(".file-size-note-container"),i=b.one(".js-name"),j=c.get("value");if(j){c.getAttribute("data-doi")?(e.setStyle("display","inline-block"),f.set("text",c.getAttribute("data-doi"))):e.setStyle("display","none");var k=c.getAttribute("data-viewer-url");i.set("text",c.getAttribute("data-name")),i.set("href",c.getAttribute("data-name-link")),b.one(".js-publication-date")&&b.one(".js-publication-date").set("text",c.getAttribute("data-date")),g?g._node.contentWindow.postMessage({action:"openUrl",url:k},"*"):a.rg.loadWidget(this.data.reader.widgetUrl,{fileHref:k},function(a){a.render({replaceContent:h})}),null!==d&&d.set("href",j)}},downloadPdfWithCoverPage:function(a){var b=this.get("container"),c=b.one(".js-download"),d=c.get("href");return"undefined"!=typeof d&&d.length?void this.showSignupPromo():(a.preventDefault(),!1)},showSignupPromo:function(){this.get("showFulltextDownloadedSignupDialog")&&(this.set("showFulltextDownloadedSignupDialog",!1),a.Lang.later(1500,this,function(){a.rg.loadWidget("publicliterature.FulltextDownloadedSignupDialog.html",{publicationUid:this.data.publicationUid},function(a){try{a.render({dialog:!0})}catch(b){}})},this))},lazyLoadViewer:function(b){var c=new a.rg.core.layout.ResponsiveHelpers;if(!c.matchesBreakpoint("s-lt")){b.preventDefault();var d=this.get("container").one(".file-size-note-container");a.rg.loadWidget(this.data.reader.widgetUrl,{},function(a){a.render({replaceContent:d})})}},trackDownload:function(b){var c=this._getDisplayedPublication(),d="v";switch(b){case"pagechange":d="v";break;case"download":d="d"}var e=this.data.trackedDownloads[c.linkId][d];e||(this.data.trackedDownloads[c.linkId][d]=!0,a.rg.ajax(this.data.downloadTrackUrl,{type:b,linkId:c.linkId,pubId:this.data.publicationUid},function(a){a.success||(this.data.trackedDownloads[c.linkId][d]=!1)},this,null,"POST"))},_getDisplayedPublication:function(){var a=this.get("container"),b=a.one(".js-publication-version-select option:checked"),c=null;if(b&&(c=b.getData("link-id")),c){var d=this.data.displayableLinks.filter(function(a){return a.linkId==c});return d[0]?d[0]:this.data.defaultLinkData}return this.data.defaultLinkData}},{ATTRS:{showFulltextDownloadedSignupDialog:{value:!0}}})},"1.0.0",{requires:["rg.core.form.RgChosen","rg.core.layout.ResponsiveHelpers","rg-sticky-header-plugin"]});
"use strict";YUI.add("rg.views.application.BaseShareView",function(a){a.namespace("rg.views.application"),a.rg.views.application.BaseShareView=a.Base.create("application.BaseShareView",a.rg.WidgetView,[],{events:{".js-share-item":{click:"share"}},afterRendered:function(){var b="";this.data.useUtmTags&&(b="?utm_source="+this.data.utmSource+encodeURIComponent("&")+"utm_medium="+this.data.utmMedium+encodeURIComponent("&")+"utm_campaign="+this.data.utmCampaign),this.data.toShare={url:a.one('meta[property="og:url"]')._node.content+b,title:a.one('meta[property="og:title"]')._node.content}},share:function(b){this.data.trackClick&&a.rg.ajax(this.data.trackUrl,{type:this.data.name});var c=b.currentTarget.getData(),d=Hogan.compile(c.url,{},"url_template.html"),e=d.render(this.getShareData());e=this.prepareShareUrl(e);var f="width="+c.width+",height="+c.height;window.open(e,"newwindow",f)},getShareData:function(){return this.data.toShare},prepareShareUrl:function(a){return a}},{ATTRS:{}})},"1.0.0",{requires:["Hogan"]});
