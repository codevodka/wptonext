(function($){
$(document).ready(function($){
var thisIsSomeBreakpoint=''
$(sticky_anything_engage.element).stickThis({
top:sticky_anything_engage.topspace,
minscreenwidth:sticky_anything_engage.minscreenwidth,
maxscreenwidth:sticky_anything_engage.maxscreenwidth,
zindex:sticky_anything_engage.zindex,
legacymode:sticky_anything_engage.legacymode,
dynamicmode:sticky_anything_engage.dynamicmode,
debugmode:sticky_anything_engage.debugmode,
pushup:sticky_anything_engage.pushup,
adminbar:sticky_anything_engage.adminbar
});
});
}(jQuery));
(function($){
var scroll=true
var scroll_offset=30
var scroll_delay=800
var scroll_to_top=false
var scroll_element=null
var parseTocSlug=function(slug){
if(! slug){
return slug;
}
var parsedSlug=slug.toString().toLowerCase()
.replace(/\…+/g,'')
.replace(/&(amp;)/g, '')
.replace(/&(mdash;)/g, '')
.replace(/\u2013|\u2014/g, '')
.replace(/[&]nbsp[;]/gi, '-')
.replace(/\s+/g, '-')
.replace(/[&\/\\#,^!+()$~%.\[\]'":*?<>{}@‘’”“|]/g, '')
.replace(/\-\-+/g, '-')
.replace(/^-+/, '')
.replace(/-+$/, '');
return decodeURI(encodeURIComponent(parsedSlug));
};
UAGBTableOfContents={
init: function(){
$(document).delegate(".uagb-toc__list a", "click", UAGBTableOfContents._scroll)
$(document).delegate(".uagb-toc__scroll-top", "click", UAGBTableOfContents._scrollTop)
$(document).delegate('.uagb-toc__title-wrap', 'click', UAGBTableOfContents._toggleCollapse)
$(document).on("scroll", UAGBTableOfContents._showHideScroll)
},
_toggleCollapse: function(e){
if($(this).find('.uag-toc__collapsible-wrap').length > 0){
let $root=$(this).closest('.wp-block-uagb-table-of-contents')
if($root.hasClass('uagb-toc__collapse')){
$root.removeClass('uagb-toc__collapse');
}else{
$root.addClass('uagb-toc__collapse');
}}
},
_showHideScroll: function(e){
if(null!=scroll_element){
if(jQuery(window).scrollTop() > 300){
if(scroll_to_top){
scroll_element.addClass("uagb-toc__show-scroll")
}else{
scroll_element.removeClass("uagb-toc__show-scroll")
}}else{
scroll_element.removeClass("uagb-toc__show-scroll")
}}
},
_scrollTop: function(e){
$("html, body").animate({
scrollTop: 0
}, scroll_delay)
},
_scroll: function(e){
if(this.hash!==""){
var hash=this.hash
var node=$(this). closest('.wp-block-uagb-table-of-contents')
scroll=node.data('scroll')
scroll_offset=node.data('offset')
scroll_delay=node.data('delay')
if(scroll){
var offset=$(decodeURIComponent(hash)).offset()
if("undefined"!=typeof offset){
$("html, body").animate({
scrollTop:(offset.top - scroll_offset)
}, scroll_delay)
}}
}},
_run: function(attr, id){
var $this_scope=$(id);
if($this_scope.find('.uag-toc__collapsible-wrap').length > 0){
$this_scope.find('.uagb-toc__title-wrap').addClass('uagb-toc__is-collapsible');
}
var $headers=JSON.parse(attr.headerLinks);
var allowed_h_tags=[];
if(undefined!==attr.mappingHeaders){
attr.mappingHeaders.forEach(function(h_tag, index){ (h_tag===true ? allowed_h_tags.push('h' + (index+1)):null);});
var allowed_h_tags_str=(null!==allowed_h_tags) ? allowed_h_tags.join(','):'';
}
var all_header=(undefined!==allowed_h_tags_str&&''!==allowed_h_tags_str) ? $('body').find(allowed_h_tags_str):$('body').find('h1, h2, h3, h4, h5, h6');
if(undefined!==$headers&&0!==all_header.length){
$headers.forEach(function (element, i){
let element_text=parseTocSlug(element.text);
all_header.each(function (){
let header=$(this);
let header_text=parseTocSlug(header.text());
if(element_text.localeCompare(header_text)===0){
header.before('<span id="' + header_text + '" class="uag-toc__heading-anchor"></span>');
}});
});
}
scroll_to_top=attr.scrollToTop
scroll_element=$(".uagb-toc__scroll-top")
if(0==scroll_element.length){
$("body").append("<div class=\"uagb-toc__scroll-top dashicons dashicons-arrow-up-alt2\"></div>")
scroll_element=$(".uagb-toc__scroll-top")
}
if(scroll_to_top){
scroll_element.addClass("uagb-toc__show-scroll")
}else{
scroll_element.removeClass("uagb-toc__show-scroll")
}
UAGBTableOfContents._showHideScroll()
},
}
$(document).ready(function(){
UAGBTableOfContents.init()
})
})(jQuery);
(function(factory){var registeredInModuleLoader=false;if(typeof define==='function'&&define.amd){define(factory);registeredInModuleLoader=true}if(typeof exports==='object'){module.exports=factory();registeredInModuleLoader=true}if(!registeredInModuleLoader){var OldCookies=window.Cookies;var api=window.Cookies=factory();api.noConflict=function(){window.Cookies=OldCookies;return api}}}(function(){function extend(){var i=0;var result={};for(;i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes){result[key]=attributes[key]}}return result}function init(converter){function api(key,value,attributes){var result;if(typeof document==='undefined'){return}if(arguments.length>1){attributes=extend({path:'/'},api.defaults,attributes);if(typeof attributes.expires==='number'){var expires=new Date();expires.setMilliseconds(expires.getMilliseconds()+attributes.expires*864e+5);attributes.expires=expires}attributes.expires=attributes.expires?attributes.expires.toUTCString():'';try{result=JSON.stringify(value);if(/^[\{\[]/.test(result)){value=result}}catch(e){}if(!converter.write){value=encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent)}else{value=converter.write(value,key)}key=encodeURIComponent(String(key));key=key.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);key=key.replace(/[\(\)]/g,escape);var stringifiedAttributes='';for(var attributeName in attributes){if(!attributes[attributeName]){continue}stringifiedAttributes+='; '+attributeName;if(attributes[attributeName]===true){continue}stringifiedAttributes+='='+attributes[attributeName]}return(document.cookie=key+'='+value+stringifiedAttributes)}if(!key){result={}}var cookies=document.cookie?document.cookie.split('; '):[];var rdecode=/(%[0-9A-Z]{2})+/g;var i=0;for(;i<cookies.length;i++){var parts=cookies[i].split('=');var cookie=parts.slice(1).join('=');if(cookie.charAt(0)==='"'){cookie=cookie.slice(1,-1)}try{var name=parts[0].replace(rdecode,decodeURIComponent);cookie=converter.read?converter.read(cookie,name):converter(cookie,name)||cookie.replace(rdecode,decodeURIComponent);if(this.json){try{cookie=JSON.parse(cookie)}catch(e){}}if(key===name){result=cookie;break}if(!key){result[name]=cookie}}catch(e){}}return result}api.set=api;api.get=function(key){return api.call(api,key)};api.getJSON=function(){return api.apply({json:true},[].slice.call(arguments))};api.defaults={};api.remove=function(key,attributes){api(key,'',extend(attributes,{expires:-1}))};api.withConverter=init;return api}return init(function(){})}));
jQuery.fn.autoGrow=function(){return this.each(function(){var createMirror=function(textarea){jQuery(textarea).after('<div class="autogrow-textarea-mirror"></div>');return jQuery(textarea).next(".autogrow-textarea-mirror")[0]};var sendContentToMirror=function(textarea){mirror.innerHTML=String(textarea.value).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br />")+".<br/>.";if(jQuery(textarea).height()!=jQuery(mirror).height())jQuery(textarea).height(jQuery(mirror).height())};var growTextarea=function(){sendContentToMirror(this)};var mirror=createMirror(this);mirror.style.display="none";mirror.style.wordWrap="break-word";mirror.style.padding=jQuery(this).css("padding");mirror.style.width=jQuery(this).css("width");mirror.style.fontFamily=jQuery(this).css("font-family");mirror.style.fontSize=jQuery(this).css("font-size");mirror.style.lineHeight=jQuery(this).css("line-height");this.style.overflow="hidden";this.style.minHeight=this.rows+"em";this.onkeydown=growTextarea;sendContentToMirror(this)})};
var wpdiscuzLoadRichEditor=parseInt(wpdiscuzAjaxObj.loadRichEditor);if(wpdiscuzLoadRichEditor)var wpDiscuzEditor=new WpdEditor;function wpdMessagesOnInit(e,t){wpdiscuzAjaxObj.setCommentMessage(e,t),setTimeout(function(){location.href=location.href.substring(0,location.href.indexOf("wpdiscuzUrlAnchor")-1)},3e3)}wpdiscuzAjaxObj.setCommentMessage=function(e,t,o){var a="wpdiscuz-message-error";if(e instanceof Array)for(var n in e)t instanceof Array?"success"===t[n]?a="wpdiscuz-message-success":"warning"===t[n]&&(a="wpdiscuz-message-warning"):"success"===t?a="wpdiscuz-message-success":"warning"===t&&(a="wpdiscuz-message-warning"),jQuery("<div/>").addClass(a).html(e[n]).prependTo("#wpdiscuz-comment-message").delay(o instanceof Array?o[n]:o||4e3).fadeOut(1e3,function(){jQuery(this).remove()});else"success"===t?a="wpdiscuz-message-success":"warning"===t&&(a="wpdiscuz-message-warning"),jQuery("<div/>").addClass(a).html(e).prependTo("#wpdiscuz-comment-message").delay(o||4e3).fadeOut(1e3,function(){jQuery(this).remove()})},jQuery(document).ready(function(e){e("body").addClass("wpdiscuz_"+wpdiscuzAjaxObj.version);var t=wpdiscuzAjaxObj.is_user_logged_in,o=1==wpdiscuzAjaxObj.wc_captcha_show_for_guest&&!t,a=1==wpdiscuzAjaxObj.wc_captcha_show_for_members&&t,n=wpdiscuzAjaxObj.wpDiscuzReCaptchaVersion,i=parseInt(wpdiscuzAjaxObj.commentListLoadType),s=parseInt(wpdiscuzAjaxObj.wc_post_id),d=parseInt(wpdiscuzAjaxObj.commentListUpdateType),c=1e3*parseInt(wpdiscuzAjaxObj.commentListUpdateTimer),p=parseInt(wpdiscuzAjaxObj.liveUpdateGuests),r=wpdiscuzAjaxObj.loadLastCommentId,l=r,m=parseInt(wpdiscuzAjaxObj.firstLoadWithAjax);Cookies.get("wpdiscuz_comments_sorting")&&Cookies.remove("wpdiscuz_comments_sorting",{path:""}),Cookies.get("wordpress_last_visit")&&Cookies.remove("wordpress_last_visit",{path:""}),Cookies.get("wpdiscuz_last_visit")&&Cookies.remove("wpdiscuz_last_visit",{path:""});var w,u=wpdiscuzAjaxObj.storeCommenterData,f=parseInt(wpdiscuzAjaxObj.wmuEnabled),h=wpdiscuzAjaxObj.isCookiesEnabled,b=!0,_=wpdiscuzAjaxObj.cookiehash,g=parseInt(wpdiscuzAjaxObj.isLoadOnlyParentComments),v=parseInt(wpdiscuzAjaxObj.enableDropAnimation)?500:0,z=parseInt(wpdiscuzAjaxObj.isNativeAjaxEnabled),j=parseInt(wpdiscuzAjaxObj.enableBubble),C=parseInt(wpdiscuzAjaxObj.bubbleLiveUpdate),k=parseInt(wpdiscuzAjaxObj.bubbleHintTimeout),x=parseInt(wpdiscuzAjaxObj.bubbleHintHideTimeout)?parseInt(wpdiscuzAjaxObj.bubbleHintHideTimeout):5,y=parseInt(wpdiscuzAjaxObj.bubbleShowNewCommentMessage),O=wpdiscuzAjaxObj.bubbleLocation,A=wpdiscuzAjaxObj.inlineFeedbackAttractionType,I=[],T=[],D=[],E=!1,M=1,F=e("html").css("scroll-behavior"),R=e("body").css("scroll-behavior");(e(".wc_social_plugin_wrapper .wp-social-login-provider-list").length?e(".wc_social_plugin_wrapper .wp-social-login-provider-list").clone().prependTo("#wpdiscuz_hidden_secondary_form > .wpd-form-wrapper >  .wpd-secondary-forms-social-content"):e(".wc_social_plugin_wrapper .the_champ_login_container").length?e(".wc_social_plugin_wrapper .the_champ_login_container").clone().prependTo("#wpdiscuz_hidden_secondary_form > .wpd-form-wrapper >  .wpd-secondary-forms-social-content"):e(".wc_social_plugin_wrapper .social_connect_form").length?e(".wc_social_plugin_wrapper .social_connect_form").clone().prependTo("#wpdiscuz_hidden_secondary_form > .wpd-form-wrapper >  .wpd-secondary-forms-social-content"):e(".wc_social_plugin_wrapper .oneall_social_login_providers").length&&e(".wc_social_plugin_wrapper .oneall_social_login .oneall_social_login_providers").clone().prependTo("#wpdiscuz_hidden_secondary_form > .wpd-form-wrapper >  .wpd-secondary-forms-social-content"),wpdiscuzLoadRichEditor&&e("#wpd-editor-0_0").length&&wpDiscuzEditor.createEditor("#wpd-editor-0_0"),window.addEventListener("beforeunload",function(t){var o=e(".wpd-form").not(":hidden");if(o.length)if(wpdiscuzLoadRichEditor){for(var a=0;a<o.length;a++)if("\n"!==wpDiscuzEditor.createEditor(e(o[a]).find(".ql-container").attr("id")).getText())return t.preventDefault(),void(t.returnValue="")}else for(a=0;a<o.length;a++)if(e(o[a]).find(".wc_comment").val())return t.preventDefault(),void(t.returnValue="")}),e(document).on("focus","#wpdcom .ql-editor, #wpdcom .wc_comment",function(){e(".wpd-form-foot",e(this).parents(".wpd_comm_form")).slideDown(v)}),e(document).on("focus","#wpdcom textarea",function(){e(this).next(".autogrow-textarea-mirror").length||e(this).autoGrow()}),t)||q({comment_author:Cookies.get("comment_author_"+_),comment_author_email:Cookies.get("comment_author_email_"+_),comment_author_url:Cookies.get("comment_author_url_"+_)});if(e(".wpd-vote-down.wpd-dislike-hidden").remove(),e(".wpd-toolbar-hidden").prev("[id^=wpd-editor-]").css("border-bottom","1px solid #dddddd"),e(document).on("click","#wpd-editor-source-code-wrapper-bg",function(){e(this).hide(),e("#wpd-editor-source-code-wrapper").hide(),e("#wpd-editor-uid").val(""),e("#wpd-editor-source-code").val("")}),wpdiscuzLoadRichEditor&&e(document).on("click","#wpd-insert-source-code",function(){var t=wpDiscuzEditor.createEditor("#"+e("#wpd-editor-uid").val());t.deleteText(0,t.getLength(),Quill.sources.USER);var o=e("#wpd-editor-source-code").val();o.length&&t.clipboard.dangerouslyPasteHTML(0,o,Quill.sources.USER),t.update(),e("#wpd-editor-source-code-wrapper-bg").hide(),e("#wpd-editor-source-code-wrapper").hide(),e("#wpd-editor-uid").val(""),e("#wpd-editor-source-code").val("")}),e(document).on("click",".wpd-reply-button",function(){var i=G(e(this),0);e(this).hasClass("wpdiscuz-clonned")?(wpdiscuzLoadRichEditor?setTimeout(function(){wpDiscuzEditor.createEditor("#wpd-editor-"+i).focus()},v):setTimeout(function(){e("#wc-textarea-"+i).trigger("focus")},v),e("#wpd-secondary-form-wrapper-"+i).slideToggle(v)):function(o){var a=G(o,0);e("#wpdiscuz_form_anchor-"+a).before(function(t){return e("#wpdiscuz_hidden_secondary_form").html().replace(/wpdiscuzuniqueid/g,t)}(a));var n=e("#wpd-secondary-form-wrapper-"+a);if(!t){var i={comment_author:Cookies.get("comment_author_"+_),comment_author_email:Cookies.get("comment_author_email_"+_),comment_author_url:Cookies.get("comment_author_url_"+_)};q(i)}wpdiscuzLoadRichEditor?setTimeout(function(){wpDiscuzEditor.createEditor("#wpd-editor-"+a).focus()},v):setTimeout(function(){e("#wc-textarea-"+a).trigger("focus")},v);n.slideToggle(v,function(){o.addClass("wpdiscuz-clonned")})}(e(this)),function(t){if((o||a)&&"2.0"===n){var i=$(t);setTimeout(function(){if(!T[i])try{T[i]=grecaptcha.render("wpdiscuz-recaptcha-"+t,{sitekey:wpdiscuzAjaxObj.wpDiscuzReCaptchaSK,theme:wpdiscuzAjaxObj.wpDiscuzReCaptchaTheme,callback:function(o){e("#wpdiscuz-recaptcha-field-"+t).val("key")},"expired-callback":function(){e("#wpdiscuz-recaptcha-field-"+t).val("")}})}catch(e){console.log(e),wpdiscuzAjaxObj.setCommentMessage("reCaptcha Error: "+e.message,"error")}},1e3)}}(i)}),e(document).on("click","#wpdcom .wpd-comment-link",function(){var t=e("[data-comment-url]",this).data("comment-url"),o=e("<input/>");o.appendTo("body").css({position:"absolute",top:"-10000000px"}).val(t),o.select(),document.execCommand ("copy"),o.remove(),wpdiscuzAjaxObj.setCommentMessage(t+"<br/>"+wpdiscuzAjaxObj.wc_copied_to_clipboard,"success",5e3)}),e(document).on("click",".wpdiscuz-nofollow,.wc_captcha_refresh_img,.wpd-load-more-submit",function(e){e.preventDefault()}),e(document).on("click",".wpd-toggle.wpd_not_clicked",function(){var t=e(this);t.removeClass("wpd_not_clicked");var o=G(e(this),0),a=e(this),n=e(".fas",a);!a.parents(".wpd-comment:not(.wpd-reply)").children(".wpd-reply").length&&g?function(t,o){var a=$(t),n=new FormData;n.append("action","wpdShowReplies"),n.append("commentId",a),me(z,!0,n).done(function(a){o.addClass("wpd_not_clicked"),"object"==typeof a&&a.success&&(e("#wpd-comm-"+t).replaceWith(a.data.comment_list),e("#wpd-comm-"+t+" .wpd-toggle .fas").removeClass("fa-chevron-down").addClass("fa-chevron-up"),e("#wpd-comm-"+t+" .wpd-toggle").attr("wpd-tooltip",wpdiscuzAjaxObj.wc_hide_replies_text),e("#wpd-comm-"+t+" .wpd-toggle .wpd-view-replies").remove(),le(a)),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,a,n){console.log(n),o.addClass("wpd_not_clicked"),e("#wpdiscuz-loading-bar").fadeOut(250)})}(o,t):e("#wpd-comm-"+o+"> .wpd-reply").slideToggle(700,function(){e(this).is(":hidden")?(n.removeClass("fa-chevron-up"),n.addClass("fa-chevron-down"),a.attr("wpd-tooltip",wpdiscuzAjaxObj.wc_show_replies_text)):(n.removeClass("fa-chevron-down"),n.addClass("fa-chevron-up"),a.attr("wpd-tooltip",wpdiscuzAjaxObj.wc_hide_replies_text)),t.addClass("wpd_not_clicked")})}),e(document).on("mouseenter",".wpd-new-loaded-comment",function(){e(this).removeClass("wpd-new-loaded-comment")}),e(document).on("click",".wpd-sbs-toggle",function(){e(".wpdiscuz-subscribe-bar").slideToggle(v)}),parseInt(wpdiscuzAjaxObj.wpDiscuzIsShowOnSubscribeForm)&&!t&&wpdiscuzAjaxObj.wpDiscuzReCaptchaSK&&e("#wpdiscuz-subscribe-form").length&&("2.0"===n?(setTimeout(function(){try{grecaptcha.render("wpdiscuz-recaptcha-subscribe-form",{sitekey:wpdiscuzAjaxObj.wpDiscuzReCaptchaSK,theme:wpdiscuzAjaxObj.wpDiscuzReCaptchaTheme,callback:function(t){e("#wpdiscuz-recaptcha-field-subscribe-form").val("key")},"expired-callback":function(){e("#wpdiscuz-recaptcha-field-subscribe-form").val("")}})}catch(e){console.log(e),wpdiscuzAjaxObj.setCommentMessage("reCaptcha Error: "+e.message,"error")}},1e3),e(document).on("submit","#wpdiscuz-subscribe-form",function(t){e("#wpdiscuz-recaptcha-field-subscribe-form").val()?e(".wpdiscuz-recaptcha",e(this)).css("border","none"):(e(".wpdiscuz-recaptcha",e(this)).css("border","1px solid red"),t.preventDefault())})):"3.0"===n&&e(document).on("click","#wpdiscuz_subscription_button",function(t){var o=e(this).parents("#wpdiscuz-subscribe-form");t.preventDefault();try{grecaptcha.ready(function(){grecaptcha.execute(wpdiscuzAjaxObj.wpDiscuzReCaptchaSK,{action:"wpdiscuz/wpdAddSubscription"}).then(function(e){console.log(5555),document.getElementById("wpdiscuz-recaptcha-field-subscribe-form").value=e,o.submit()},function(e){wpdiscuzAjaxObj.setCommentMessage("reCaptcha Error","error"),console.log(e)})})}catch(t){console.log(t),wpdiscuzAjaxObj.setCommentMessage("reCaptcha Error: "+t.message,"error")}})),(o||a)&&"2.0"===n){var L=e(window).width(),S=e("#wpdcom").width();S>=1100&&(e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({"transform-origin":"right 0","-webkit-transform-origin":"right 0",transform:"scale(0.9)","-webkit-transform":"scale(0.9)"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({"transform-origin":"right 0","-webkit-transform-origin":"right 0",transform:"scale(0.9)","-webkit-transform":"scale(0.9)"}),e("#wpdcom .wpd_main_comm_form .wpd-form-col-left").css({width:"65%"}),e("#wpdcom .wpd_main_comm_form .wpd-form-col-right").css({width:"35%"})),S>=940&&S<1100&&(e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({"transform-origin":"right 0","-webkit-transform-origin":"right 0",transform:"scale(0.9)","-webkit-transform":"scale(0.9)"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({"transform-origin":"right 0","-webkit-transform-origin":"right 0",transform:"scale(0.9)","-webkit-transform":"scale(0.9)"}),e("#wpdcom .wpd_main_comm_form .wpd-form-col-left").css({width:"60%"}),e("#wpdcom .wpd_main_comm_form .wpd-form-col-right").css({width:"40%"})),S>=810&&S<940&&(e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({transform:"scale(0.9)","-webkit-transform":"scale(0.9)"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({transform:"scale(0.8)","-webkit-transform":"scale(0.8)"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-left").css({width:"40%"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-right").css({width:"60%"})),S>=730&&S<810&&(e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({transform:"scale(0.9)","-webkit-transform":"scale(0.9)"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({"transform-origin":"right 0","-webkit-transform-origin":"right 0",transform:"scale(0.8)","-webkit-transform":"scale(0.8)"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-left").css({width:"45%"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-right").css({width:"55%"})),S>=610&&S<730&&(e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({transform:"scale(0.85)","-webkit-transform":"scale(0.85)"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({transform:"scale(0.8)","-webkit-transform":"scale(0.8)"}),e("#wpdcom .wpd_main_comm_form .wpd-form-col-left").css({width:"43%"}),e("#wpdcom .wpd_main_comm_form .wpd-form-col-right").css({width:"55%"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-left").css({width:"30%"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-right").css({width:"70%"})),L>650&&(S>=510&&S<610&&(e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({"transform-origin":"center 0","-webkit-transform-origin":"center 0",transform:"scale(0.77)","-webkit-transform":"scale(0.77)"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({"transform-origin":"right 0","-webkit-transform-origin":"right 0",transform:"scale(0.77)","-webkit-transform":"scale(0.77)"}),e("#wpdcom .wpd_main_comm_form .wpd-form-col-left").css({width:"35%"}),e("#wpdcom .wpd_main_comm_form .wpd-form-col-right").css({width:"63%"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-left").css({width:"30%",position:"relative",right:"-60px"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-right").css({width:"70%"}),e("#wpdcom .wpd-secondary-form-wrapper .wc-form-footer").css({"margin-left":"0px"})),S>=470&&S<510&&(e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({"transform-origin":"center 0","-webkit-transform-origin":"center 0",transform:"scale(0.77)","-webkit-transform":"scale(0.77)"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({"transform-origin":"right 0","-webkit-transform-origin":"right 0",transform:"scale(0.77)","-webkit-transform":"scale(0.77)"}),e("#wpdcom .wpd_main_comm_form .wpd-form-col-left").css({width:"40%"}),e("#wpdcom .wpd_main_comm_form .wpd-form-col-right").css({width:"60%"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-left").css({float:"none",width:"100%",display:"block"}),e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-right").css({float:"none",width:"100%",display:"block"}),e("#wpdcom .wpd_main_comm_form .wc-form-footer").css({"margin-left":"0px"}),e("#wpdcom .wpd-secondary-form-wrapper .wc-form-footer").css({"margin-left":"0px"})),S<470&&(e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({margin:"0px auto","transform-origin":"center 0","-webkit-transform-origin":"center 0"}),e("#wpdcom .wpd-form-col-left").css({float:"none",width:"100%",display:"block"}),e("#wpdcom .wpd-form-col-right").css({float:"none",width:"100%",display:"block"}),e("#wpdcom .wpd-secondary-form-wrapper .wc-form-footer").css({"margin-left":"0px"}),e("#wpdcom .wpd-secondary-form-wrapper .wc_notification_checkboxes").css({"text-align":"center"}),e("#wpdcom .wpd-secondary-form-wrapper .wc-field-submit").css({"text-align":"center"})))}function H(t,o,a){me(z||f,!1,o).done(function(o){if(e(a).addClass("wpd_not_clicked"),"object"==typeof o)if(o.success){"collapsed"===wpdiscuzAjaxObj.commentFormView&&e(".wpd-form-foot",t).slideUp(v),e(".wpd-thread-info").html(o.data.wc_all_comments_count_before_threads_html),o.data.wc_all_comments_count_new=parseInt(o.data.wc_all_comments_count_new),e("#wpd-bubble-all-comments-count").replaceWith(o.data.wc_all_comments_count_bubble_html),o.data.wc_all_comments_count_new?e("#wpd-bubble-all-comments-count").show():e("#wpd-bubble-all-comments-count").hide();var n=v;o.data.is_main?oe(o.data.message):(n=v+700,e("#wpd-secondary-form-wrapper-"+o.data.uniqueid).slideToggle(700),1==o.data.is_in_same_container?e("#wpd-secondary-form-wrapper-"+o.data.uniqueid).after(o.data.message):e("#wpd-comm-"+o.data.uniqueid).after(o.data.message)),function(e){if(!e.data.held_moderate){var t=new FormData;t.append("action","wpdCheckNotificationType"),t.append("comment_id",e.data.new_comment_id),t.append("email",e.data.comment_author_email),t.append("isParent",e.data.is_main),me(z,!0,t)}}(o),function(e){if(e.data.redirect>0&&e.data.new_comment_id){var t=new FormData;t.append("action","wpdRedirect"),t.append("commentId",e.data.new_comment_id),me(z,!0,t).done(function(e){"object"==typeof e&&e.success&&setTimeout(function(){location.href=e.data},2e3)}).fail(function(e,t,o){console.log(o)})}}(o),h&&b?function(t){var o=t.comment_author_email,a=t.comment_author,n=t.comment_author_url;null==u?(Cookies.set("comment_author_email_"+_,o),Cookies.set("comment_author_"+_,a),n.length&&Cookies.set("comment_author_url_"+_,n)):(u=parseInt(u),Cookies.set("comment_author_email_"+_,o,{expires:u,path:"/"}),Cookies.set("comment_author_"+_,a,{expires:u,path:"/"}),n.length&&Cookies.set("comment_author_url_"+_,n,{expires:u,path:"/"}));e(".wpd-cookies-checkbox").length&&e(".wpd-cookies-checkbox").prop("checked",!0)}(o.data):b||e(".wpd-cookies-checkbox").removeAttr("checked"),wpdiscuzLoadRichEditor&&wpDiscuzEditor.createEditor("#wpd-editor-"+e(".wpdiscuz_unique_id",t).val()).setContents([{insert:"\n"}]),t.get(0).reset(),q(o.data),e(".wmu-preview-wrap",t).remove(),I.length&&(I.forEach(function(e){e.parents(".wpd-field-checkbox").remove()}),I=[]),parseInt(wpdiscuzAjaxObj.scrollToComment)&&setTimeout(function(){ee(),e("html, body").animate({scrollTop:e("#comment-"+o.data.new_comment_id).offset().top-32},1e3,te)},n),le(o,t)}else o.data&&(wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[o.data],"error"),le(o,t));else wpdiscuzAjaxObj.setCommentMessage(o,"error");e("#wpdiscuz-loading-bar").fadeOut(250),E=!1}).fail(function(t,o,n){console.log(n),e(a).addClass("wpd_not_clicked"),e("#wpdiscuz-loading-bar").fadeOut(250)})}function q(t){e(".wpd_comm_form .wc_name").val(t.comment_author),t.comment_author_email&&t.comment_author_email.indexOf("@example.com")<0&&e(".wpd_comm_form .wc_email").val(t.comment_author_email),t.comment_author_url&&e(".wpd_comm_form .wc_website").val(t.comment_author_url)}function U(t,o){e("#wpd-comm-"+t+" > .wpd-comment-wrap .wpd-comment-right .wpd_editable_comment").show(),e("#wpd-comm-"+t+" .wpdiscuz-edit-form-wrap").replaceWith(o),e("#wpd-comm-"+t+" > .wpd-comment-wrap .wpd-comment-last-edited").show()}e(document).on("click",".wc_comm_submit.wpd_not_clicked",function(){var i=e(this),s=1,d=e(this).parents("form");if(d.hasClass("wpd_main_comm_form")||(s=function(t){var o=t.attr("class").split(" "),a="";return e.each(o,function(e,t){"wpd_comment_level"===X(t,!1)&&(a=X(t,!0))}),parseInt(a)+1}(e(this).parents(".wpd-comment"))),Z(d,"#wpd-editor-"+e(".wpdiscuz_unique_id",d).val()),d.submit(function(e){e.preventDefault()}),""!==e(".wc_comment",d).val().trim()){if(d[0].checkValidity()&&(p=d,r=!0,"2.0"===n&&e("input[name=wc_captcha]",p).length&&!e("input[name=wc_captcha]",p).val().length?(r=!1,e(".wpdiscuz-recaptcha",p).css("border","1px solid red")):"2.0"===n&&e("input[name=wc_captcha]",p).length&&e(".wpdiscuz-recaptcha",p).css("border","none"),r)){E=!0,function(t){e(".wpd-agreement-checkbox",t).each(function(){e(this).hasClass("wpd_agreement_hide")&&h&&e(this).prop("checked")&&(Cookies.set(e(this).attr("name")+"_"+_,1,{expires:30,path:"/"}),e("input[name="+e(this).attr("name")+"]").each(function(){I.push(e(this))}))})}(d),e(i).removeClass("wpd_not_clicked");var c=new FormData;if(c.append("action","wpdAddComment"),e(":input",d).each(function(){""!=this.name&&"checkbox"!=this.type&&"radio"!=this.type&&c.append(this.name+"",e(this).val().trim()),"checkbox"!=this.type&&"radio"!=this.type||e(this).is(":checked")&&c.append(this.name+"",e(this).val())}),c.append("wpd_comment_depth",s),wpdiscuzAjaxObj.wpdiscuz_zs&&c.append("wpdiscuz_zs",wpdiscuzAjaxObj.wpdiscuz_zs),e(".wpd-cookies-checkbox",d).length?e(".wpd-cookies-checkbox",d).prop("checked")||(b=!1):t&&(b=!1),e("#wpdiscuz-loading-bar").show(),wpdiscuzAjaxObj.wpDiscuzReCaptchaSK&&"3.0"===n&&(1==wpdiscuzAjaxObj.wc_captcha_show_for_guest&&!wpdiscuzAjaxObj.is_user_logged_in||1==wpdiscuzAjaxObj.wc_captcha_show_for_members&&wpdiscuzAjaxObj.is_user_logged_in))try{grecaptcha.ready(function(){grecaptcha.execute(wpdiscuzAjaxObj.wpDiscuzReCaptchaSK,{action:"wpdiscuz/addComment"}).then(function(e){c.append("g-recaptcha-response",e),H(d,c,i)},function(e){wpdiscuzAjaxObj.setCommentMessage("reCaptcha Error","error"),console.log(e)})})}catch(t){console.log(t),wpdiscuzAjaxObj.setCommentMessage("reCaptcha Error: "+t.message,"error"),e("#wpdiscuz-loading-bar").fadeOut(250)}else H(d,c,i)}var p,r;!function(e){if((o||a)&&"2.0"===n){var t=$(e);grecaptcha.reset(T[t])}}(e(".wpdiscuz_unique_id",d).val()),e(".wpdiscuz_reset").val("")}else wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj.wc_msg_required_fields,"error")}),e(document).on("click",".wpd_editable_comment",function(){w&&e(".wpdiscuz-edit-form-wrap").length&&U(G(e(".wpdiscuz-edit-form-wrap"),0),w);var t=G(e(this),0),o=$(t),a=new FormData;a.append("action","wpdEditComment"),a.append("commentId",o),w=e("#wpd-comm-"+t+" > .wpd-comment-wrap .wpd-comment-text").get(0),me(z,!0,a).done(function(o){if("object"==typeof o)if(o.success){if(e("#wpd-comm-"+t+" > .wpd-comment-wrap .wpd-comment-right .wpd-comment-text").replaceWith(o.data.html),wpdiscuzLoadRichEditor){let a=wpDiscuzEditor.createEditor("#wpd-editor-edit_"+t);a.clipboard.dangerouslyPasteHTML(0,o.data.content),a.update(),e(".wpd-toolbar-hidden").prev("[id^=wpd-editor-]").css("border-bottom","1px solid #dddddd")}else e("#wc-textarea-edit_"+t).val(o.data.content);e("#wpd-comm-"+t+" > .wpd-comment-wrap .wpd-comment-right .wpd_editable_comment").hide(),e("#wpd-comm-"+t+" > .wpd-comment-wrap .wpd-comment-last-edited").hide()}else wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[o.data],"error");else console.log(o);e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}),e(document).on("click",".wc_save_edited_comment",function(){var t=G(e(this)),o=$(t),a=e("#wpd-comm-"+t+" #wpdiscuz-edit-form");if(Z(a,"#wpd-editor-edit_"+t),a.submit(function(e){e.preventDefault()}),a[0].checkValidity()){var n=new FormData;n.append("action","wpdSaveEditedComment"),n.append("commentId",o),e(":input",a).each(function(){""!==this.name&&"checkbox"!==this.type&&"radio"!==this.type&&n.append(this.name+"",e(this).val()),"checkbox"!==this.type&&"radio"!==this.type||e(this).is(":checked")&&n.append(this.name+"",e(this).val())}),me(z,!0,n).done(function(a){"object"==typeof a?(a.success?(U(t,a.data.message),a.data.lastEdited&&(e("#wpd-comm-"+t+" > .wpd-comment-wrap .wpd-comment-last-edited").remove(),e(a.data.lastEdited).insertAfter("#wpd-comm-"+t+" > .wpd-comment-wrap .wpd-comment-right .wpd-comment-text")),a.data.twitterShareLink&&e("#wpd-comm-"+t+" > .wpd-comment-wrap .wpd-comment-share .wpd-tooltip-content .wc_tw").attr("href",a.data.twitterShareLink),a.data.whatsappShareLink&&e("#wpd-comm-"+t+" > .wpd-comment-wrap .wpd-comment-share .wpd-tooltip-content .wc_whatsapp").attr("href",a.data.whatsappShareLink),wpdiscuzLoadRichEditor&&wpDiscuzEditor.removeEditor("#wpd-editor-edit_"+t)):wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[a.data],"error"),le(a,o)):console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}}),e(document).on("click",".wc_cancel_edit",function(){var t=G(e(this));U(t,w),wpdiscuzLoadRichEditor&&wpDiscuzEditor.removeEditor("#wpd-editor-edit_"+t)}),!wpdiscuzAjaxObj.wordpressIsPaginate&&m&&(M=0,1==m?setTimeout(function(){V(!0)},500):e(document).on("click",".wpd-load-comments",function(){e(this).parent(".wpd-load-more-submit-wrap").remove(),V(!0)})),e(document).on("click",".wpd-load-more-submit",function(){var t=e(this);t.hasClass("wpd-loaded")&&V(!1,t,"wpd-loaded","wpd-loading")});var W=!1;function P(){var t=e("#wpdiscuzHasMoreComments").val(),o=e(document).height(),a=e(window).height()+e(window).scrollTop();o&&a&&(100*a/o>=80&&!1===W&&1==t&&(W=!0,V(!1,e(".wpd-load-more-submit"))))}function V(t,o,a,n){o&&(o.toggleClass(a),o.toggleClass(n));var s=new FormData;s.append("action","wpdLoadMoreComments");var d=e(".wpdiscuz-sort-button-active").attr("data-sorting");d&&s.append("sorting",d),s.append("offset",M),s.append("lastParentId",e(".wpd-load-more-submit").attr("data-lastparentid")),s.append("isFirstLoad",t?1:0);var c=e(".wpdf-active").attr("data-filter-type");s.append("wpdType",c||""),me(z,!t||1!=m,s).done(function(s){"object"==typeof s&&s.success&&(M++,t&&e(".wpd-comment").remove(),e(".wpdiscuz_single").remove(),e(".wpdiscuz-comment-pagination").before(s.data.comment_list),B(s,t&&2!==i),W=!1,r=s.data.loadLastCommentId,le(s),t&&K(!1)),e("#wpdiscuz-loading-bar").fadeOut(250),e(".wpd-load-more-submit").blur(),o&&(o.toggleClass(a),o.toggleClass(n))}).fail(function(t,i,s){console.log(s),e("#wpdiscuz-loading-bar").fadeOut(250),e(".wpd-load-more-submit").blur(),o&&(o.toggleClass(a),o.toggleClass(n))})}function B(t,o){var a;0==t.data.is_show_load_more?(e("#wpdiscuzHasMoreComments").val(0),e(".wpd-load-more-submit").parents(".wpdiscuz-comment-pagination").hide()):(a=t.data.last_parent_id,e(".wpd-load-more-submit").attr("data-lastparentid",a),2!==i&&e(".wpdiscuz-comment-pagination").show(),e("#wpdiscuzHasMoreComments").val(1),o&&e(".wpd-load-more-submit").parents(".wpdiscuz-comment-pagination").show()),le(t)}function K(t){var o=location.href.match(/#comment\-(\d+)/);if(null!==o){var a=o[1];if(e("#comment-"+a).length)setTimeout(function(){ee(),e("html, body").animate({scrollTop:e("#comment-"+a).parents("[id^=wpd-comm-]").offset().top-32},1e3,te),t&&N(a)},500);else{var n=new FormData;n.append("action","wpdGetSingleComment"),n.append("commentId",a),me(z,!0,n).done(function(o){if("object"==typeof o&&o.success){var n="#comment-"+a;e("#comment-"+o.data.parentCommentID).length?e("#comment-"+o.data.parentCommentID).parents("[id^=wpd-comm-"+o.data.parentCommentID+"]").replaceWith(o.data.message):e(".wpd-thread-list").prepend(o.data.message),le(o),ee(),e("html, body").animate({scrollTop:e(n).offset().top-32},1e3,te),t&&N(a)}e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}}}function N(t){setTimeout(function(){e("#comment-"+t).siblings(".wpd-secondary-form-wrapper").is(":visible")||e("#comment-"+t).find(".wpd-reply-button").trigger("click")},1100)}function Q(e){if(void 0!==e.data.message)for(var t,o=e.data.message,a=0;a<o.length;a++)Y((t=o[a]).comment_parent,t.comment_html)}function G(e,t){var o="";return(o=t?e.parents(".wpd-main-form-wrapper").attr("id"):e.parents(".wpd-comment").attr("id")).substring(o.lastIndexOf("-")+1)}function $(e){return e.substring(0,e.indexOf("_"))}function X(e,t){return t?e.substring(e.indexOf("-")+1):e.substring(0,e.indexOf("-"))}function Y(t,o){if(0==t)oe(o);else{var a=G(e("#comment-"+t),0);e("#wpdiscuz_form_anchor-"+a).after(o)}}function J(){var t=[];return e(".wpd-comment-right").each(function(){t.push($(G(e(this),0)))}),t.join(",")}function Z(t,o){var a=t.find(".wpd-required-group");wpdiscuzLoadRichEditor&&t.find(".wc_comment").val(e(o+">.ql-editor").html()),function(e){var t=e.find(".wc_comment"),o=t.val().trim().replace(/<p><br><\/p>/g,"\n").replace(/<p>(.*?)<\/p>/g,"$1\n");o=(o=(o=(o=o.replace(/<img src=["|']https\:\/\/s\.w\.org\/images\/core\/emoji\/([^"|']+)["|'](.*?)alt=["|']([^"|']+)["|'](.*?)[^>]*>/g," $3 ")).replace(/<img[^>]+alt=["|']([^"|']+)["|'][^>]+src=["|']https\:\/\/s\.w\.org\/images\/core\/emoji\/([^"|']+)["|'][^>]?>/g," $1 ")).replace(/<img\s+([^>]*)class=["|']wpdem\-sticker["|'](.*?)alt=["|']([^"|']+)["|'](.*?)[^>]*>/g," $3 ")).replace(/<img\s+([^>]*)src=["|']([^"|']+)["|'](.*?)[^>]*>/g," $2 "),t.val(o)}(t),e.each(a,function(){e("input",this).removeAttr("required"),0===e("input:checked",this).length?e("input",e(this)).prop("required",!0):e(".wpd-field-invalid",this).remove()})}function ee(){e("html, body").css("scroll-behavior","unset")}function te(){e("html").css("scroll-behavior",F),e("body").css("scroll-behavior",R)}function oe(t){e(".wpd-sticky-comment").last()[0]?e(t).insertAfter(e(".wpd-sticky-comment").last()[0]):e(".wpd-thread-list").prepend(t)}function ae(t){t?t.prop("required")||(t.val()?t.parents("form").find("[name=wpdiscuz_notification_type]").parent().css("display","inline-block"):t.parents("form").find("[name=wpdiscuz_notification_type]").parent().css("display","none")):e.each(e(".wc_email"),function(t,o){var a=e(o);a.prop("required")||(a.val()?a.parents("form").find("[name=wpdiscuz_notification_type]").parent().css("display","inline-block"):a.parents("form").find("[name=wpdiscuz_notification_type]").parent().css("display","none"))})}if(2!==i||wpdiscuzAjaxObj.wordpressIsPaginate||(e(".wpd-load-more-submit").parents(".wpdiscuz-comment-pagination").hide(),P(),e(window).scroll(function(){P()})),wpdiscuzAjaxObj.setLoadMoreVisibility=B,e(document).on("click",".wpd-vote-up.wpd_not_clicked, .wpd-vote-down.wpd_not_clicked",function(){var t=e(this);e(t).removeClass("wpd_not_clicked");var o,a=$(G(t));o=e(this).hasClass("wpd-vote-up")?1:-1;var n=new FormData;n.append("action","wpdVoteOnComment"),n.append("commentId",a),n.append("voteType",o),me(z,!0,n).done(function(n){if(e(t).addClass("wpd_not_clicked"),"object"==typeof n){if(n.success){if("total"===n.data.buttonsStyle){var i=e(".wpd-comment-footer .wpd-vote-result",e("#comment-"+a)),s=n.data.votes;i.text(n.data.votesHumanReadable),i.attr("title",s),i.removeClass("wpd-up wpd-down"),s>0&&i.addClass("wpd-up"),s<0&&i.addClass("wpd-down")}else{var d=e(".wpd-comment-footer .wpd-vote-result-like",e("#comment-"+a)),c=e(".wpd-comment-footer .wpd-vote-result-dislike",e("#comment-"+a));d.text(n.data.likeCountHumanReadable),d.attr("title",n.data.likeCount),c.text(n.data.dislikeCountHumanReadable),c.attr("title",n.data.dislikeCount),parseInt(n.data.likeCount)>0?d.addClass("wpd-up"):d.removeClass("wpd-up"),parseInt(n.data.dislikeCount)<0?c.addClass("wpd-down"):c.removeClass("wpd-down")}var p=e(".wpd-comment-footer .wpd-vote-up",e("#comment-"+a)),r=e(".wpd-comment-footer .wpd-vote-down",e("#comment-"+a));p.removeClass("wpd-up"),r.removeClass("wpd-down"),n.data.curUserReaction>0?p.addClass("wpd-up"):n.data.curUserReaction<0&&r.addClass("wpd-down")}else n.data&&wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[n.data],"error");le(n,a,o)}else console.log(n);e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(o,a,n){console.log(n),e(t).addClass("wpd_not_clicked"),e("#wpdiscuz-loading-bar").fadeOut(250)})}),e(document).on("click","body",function(t){var o=e(".wpdiscuz-sort-buttons");e(t.target).hasClass("wpdf-sorting")||e(t.target).parent().hasClass("wpdf-sorting")?o.css({display:o.is(":visible")?"none":"flex"}):o.hide()}),e(document).on("click",".wpdiscuz-sort-button:not(.wpdiscuz-sort-button-active)",function(){var t=e(this),o=e(this).attr("data-sorting");if(o){e(".wpdiscuz-sort-button.wpdiscuz-sort-button-active").removeClass("wpdiscuz-sort-button-active").appendTo(".wpdiscuz-sort-buttons"),t.addClass("wpdiscuz-sort-button-active").prependTo(".wpdf-sorting");var a=new FormData;a.append("action","wpdSorting"),a.append("sorting",o);var n=e(".wpdf-active").attr("data-filter-type");a.append("wpdType",n||""),me(z,!0,a).done(function(t){"object"==typeof t&&t.success&&(e("#wpdcom .wpd-comment").remove(),e("#wpdcom .wpd-thread-list").prepend(t.data.message),B(t,!1),M=1),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}}),window.onhashchange=function(){K(!1)},1!=m&&K(!1),e(document).on("click",".wpdiscuz-readmore",function(){var t=G(e(this)),o=$(t),a=new FormData;a.append("action","wpdReadMore"),a.append("commentId",o),me(z,!0,a).done(function(a){"object"==typeof a?(a.success?(e("#comment-"+o+" .wpd-comment-text").replaceWith(" "+a.data.message),e("#wpdiscuz-readmore-"+t).remove()):console.log(a.data),le(a)):console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}),e(document).on("change",".wpd-required-group",function(){0!==e("input:checked",this).length?e("input",e(this)).removeAttr("required"):e("input",e(this)).prop("required",!0)}),e(document).on("click",".wpdiscuz-spoiler",function(){e(this).next().slideToggle(),e(this).hasClass("wpdiscuz-spoiler-closed")?e(this).parents(".wpdiscuz-spoiler-wrap").find(".fa-plus").removeClass("fa-plus").addClass("fa-minus"):e(this).parents(".wpdiscuz-spoiler-wrap").find(".fa-minus").removeClass("fa-minus").addClass("fa-plus"),e(this).toggleClass("wpdiscuz-spoiler-closed")}),e(document).on("click",".wpd-tools i",function(){var t=e(this).siblings(".wpd-tools-actions");t.is(":visible")||e(this).parents(".wpd-comment-right").attr("id")!==e("[id^=comment-]","#wpdcom").last().attr("id")||e("#comments").css({paddingBottom:"160px"}),t.css({display:t.is(":visible")?"none":"flex"})}),e(document).on("mouseleave",".wpd-comment-right",function(){e(this).find(".wpd-tools-actions").hide(),e("#comments").css({paddingBottom:"0"})}),e(document).on("click",".wpd_stick_btn",function(){var t=$(G(e(this),0)),o=new FormData;o.append("action","wpdStickComment"),o.append("commentId",t),me(z,!0,o).done(function(t){"object"==typeof t&&t.success&&location.reload(!0),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}),e(document).on("click",".wpd_close_btn",function(){var t=$(G(e(this),0)),o=new FormData;o.append("action","wpdCloseThread"),o.append("commentId",t),me(z,!0,o).done(function(t){"object"==typeof t&&t.success&&location.reload(!0),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}),e(document).on("click",".wpd-filter.wpd_not_clicked[data-filter-type]",function(){var t=e(this),o=t.attr("data-filter-type");wpdiscuzAjaxObj.resetActiveFilters(".wpdf-"+o),t.removeClass("wpd_not_clicked"),e(".fas",t).addClass("fa-pulse fa-spinner");var a=new FormData;a.append("action","wpdLoadMoreComments");var n=e(".wpdiscuz-sort-button-active").attr("data-sorting");n&&a.append("sorting",n),a.append("lastParentId",0),a.append("offset",0),M=1,a.append("wpdType",t.hasClass("wpdf-active")?"":o),a.append("isFirstLoad",1),e(this).hasClass("wpdf-inline")?e(this).hasClass("wpdf-active")?e(".wpd-comment-info-bar").hide():e(".wpd-comment-info-bar").css("display","flex"):e(".wpd-comment-info-bar").hide(),me(z,!1,a).done(function(o){t.addClass("wpd_not_clicked"),e(".fas",t).removeClass("fa-pulse fa-spinner"),"object"==typeof o&&o.success&&(t.toggleClass("wpdf-active"),e(".wpd-load-comments").remove(),e(".wpd-comment").remove(),e(".wpd-thread-list").prepend(o.data.comment_list),B(o),r=o.data.loadLastCommentId,e(".wpd-load-more-submit").blur(),le(o)),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}),e(document).on("click",".wpdf-reacted.wpd_not_clicked",function(){var t=e(this);t.removeClass("wpd_not_clicked"),e(".fas",t).addClass("fa-pulse fa-spinner");var o=new FormData;o.append("action","wpdMostReactedComment"),me(z,!1,o).done(function(o){t.addClass("wpd_not_clicked"),e(".fas",t).removeClass("fa-pulse fa-spinner"),"object"==typeof o&&o.success&&(e("#comment-"+o.data.parentCommentID).length?e("#comment-"+o.data.parentCommentID).parents("[id^=wpd-comm-"+o.data.parentCommentID+"]").replaceWith(o.data.message):e("#comment-"+o.data.commentId).length||e(".wpd-thread-list").prepend(o.data.message),le(o),ee(),e("html, body").animate({scrollTop:e("#comment-"+o.data.commentId).offset().top-32},1e3,te))}).fail(function(o,a,n){console.log(n),e(".fas",t).removeClass("fa-pulse fa-spinner")})}),e(document).on("click",".wpdf-hottest.wpd_not_clicked",function(){var t=e(this);t.removeClass("wpd_not_clicked"),e(".fas",t).addClass("fa-pulse fa-spinner");var o=new FormData;o.append("action","wpdHottestThread"),me(z,!1,o).done(function(o){t.addClass("wpd_not_clicked"),e(".fas",t).removeClass("fa-pulse fa-spinner"),"object"==typeof o&&o.success&&(e("#comment-"+o.data.commentId).length?e("#comment-"+o.data.commentId).parents("[id^=wpd-comm-"+o.data.commentId+"]").replaceWith(o.data.message):e(".wpd-thread-list").prepend(o.data.message),le(o),ee(),e("html, body").animate({scrollTop:e("#comment-"+o.data.commentId).offset().top-32},1e3,te))}).fail(function(o,a,n){console.log(n),e(".fas",t).removeClass("fa-pulse fa-spinner")})}),e(document).on("click",".wpd-filter-view-all",function(){e(".wpdf-inline.wpdf-active.wpd_not_clicked").trigger("click")}),e(document).on("click",".wpd-follow-link.wpd_not_clicked",function(){var t=e(this);t.removeClass("wpd_not_clicked"),e(".fas",t).addClass("fa-pulse fa-spinner");var o=$(G(t,0)),a=new FormData;a.append("action","wpdFollowUser"),a.append("commentId",o),me(z,!0,a).done(function(o){t.addClass("wpd_not_clicked"),"object"==typeof o?o.success?(wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[o.data.code],"success"),t.removeClass("wpd-follow-active"),o.data.followTip&&t.attr("wpd-tooltip",o.data.followTip),o.data.followClass&&t.addClass(o.data.followClass)):wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[o.data],"error"):console.log(o),e(".fas",t).removeClass("fa-pulse fa-spinner"),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(o,a,n){console.log(n),e(".fas",t).removeClass("fa-pulse fa-spinner"),e("#wpdiscuz-loading-bar").fadeOut(250)})}),ae(),e(document).on("keyup",".wc_email",function(){ae(e(this))}),j&&e("#wpdcom").length){if(e("#wpd-bubble-wrapper").hover(function(){e(this).addClass("wpd-bubble-hover")},function(){e(this).removeClass("wpd-bubble-hover")}),k&&!Cookies.get(wpdiscuzAjaxObj.cookieHideBubbleHint)&&setTimeout(function(){e("#wpd-bubble-wrapper").addClass("wpd-bubble-hover"),Cookies.set(wpdiscuzAjaxObj.cookieHideBubbleHint,"1",{expires:7,path:"/"}),setTimeout(function(){e("#wpd-bubble-wrapper").removeClass("wpd-bubble-hover")},1e3*x)},1e3*k),"content_left"===O)if(e(".entry-content").length){var ne=(ie=Math.min(e(".entry-content").offset().left,e("#wpdcom").offset().left)-120)>25?ie:25;e("#wpd-bubble-wrapper").css({left:ne+"px"}),e("#wpd-bubble-wrapper").addClass("wpd-left-content")}else if(e(".post-entry").length){ne=(ie=Math.min(e(".post-entry").offset().left,e("#wpdcom").offset().left)-120)>25?ie:25;e("#wpd-bubble-wrapper").css({left:ne+"px"}),e("#wpd-bubble-wrapper").addClass("wpd-left-content")}else if(e(".container").length){var ie;ne=(ie=Math.min(e(".container").offset().left,e("#wpdcom").offset().left)-120)>25?ie:25;e("#wpd-bubble-wrapper").css({left:ne+"px"}),e("#wpd-bubble-wrapper").addClass("wpd-left-content")}else e("#wpd-bubble-wrapper").css({left:"25px"}),e("#wpd-bubble-wrapper").addClass("wpd-left-corner");else"left_corner"===O?(e("#wpd-bubble-wrapper").css({left:"25px"}),e("#wpd-bubble-wrapper").addClass("wpd-left-corner")):"right_corner"===O&&(e("#wpd-bubble-wrapper").css({right:"25px"}),e("#wpd-bubble-wrapper").addClass("wpd-right-corner"));e("#wpd-bubble-wrapper").show(),e(document).on("click","#wpd-bubble-add-message-close",function(t){t.preventDefault(),t.stopPropagation(),e("#wpd-bubble-wrapper").removeClass("wpd-bubble-hover")}),e(document).on("click","#wpd-bubble",function(){ee(),e("html, body").animate({scrollTop:e("#wpdcom").offset().top-60},1e3,function(){te(),e("#wpd-bubble-wrapper").removeClass("wpd-bubble-hover"),wpdiscuzLoadRichEditor?e("#wpd-editor-0_0").length&&wpDiscuzEditor.createEditor("#wpd-editor-0_0").focus():e("#wc-textarea-0_0").length&&e("#wc-textarea-0_0").focus()})}),e(document).on("click","#wpd-bubble-comment-close",function(t){t.preventDefault(),e("#wpd-bubble-notification-message").hide(),e("#wpd-bubble-wrapper").removeClass("wpd-new-comment-added")}),e(document).on("click","#wpd-bubble-comment-reply-link a",function(){var t=e(this).attr("href");setTimeout(function(){e("#wpd-bubble-notification-message").hide(),e("#wpd-bubble-wrapper").removeClass("wpd-new-comment-added"),K(!0);var o=t.match(/#comment\-(\d+)/);D=D.filter(function(e){return e!=o[1]}),e("#wpd-bubble-count .wpd-new-comments-count").text(D.length),0==D.length&&e("#wpd-bubble-count").removeClass("wpd-new-comments")},100)}),e(document).on("click","#wpd-bubble-count",function(){if(D.length){var t=new FormData;t.append("action","wpdBubbleUpdate"),t.append("newCommentIds",D.join()),me(z,!0,t).done(function(t){"object"==typeof t&&t.success&&(t.data.message=t.data.message.filter(function(t){if(!e("#comment-"+t.comment_id).length)return t}),Q(t),e("#wpd-bubble-count").removeClass("wpd-new-comments"),e("#wpd-bubble-count .wpd-new-comments-count").text("0"),D=[],e(".wpd-new-loaded-comment").length&&(ee(),e("html, body").animate({scrollTop:e(e(".wpd-new-loaded-comment")[0]).offset().top-60},1e3,te)),le(t)),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(e,t,o){console.log(o)})}})}if((j&&C||d)&&(t||!t&&p)&&setTimeout(function t(){e.ajax({type:"GET",url:wpdiscuzAjaxObj.bubbleUpdateUrl,beforeSend:function(e){e.setRequestHeader("X-WP-Nonce",wpdiscuzAjaxObj.restNonce)},data:{postId:s,lastId:l,visibleCommentIds:J()}}).done(function(o){if(!E)if("object"==typeof o){if(o.commentIDsToRemove.forEach(function(t){e("[id^=wpd-comm-"+t+"]").remove()}),o.ids.length){d&&((i=new FormData).append("action","wpdUpdateAutomatically"),i.append("loadLastCommentId",r),i.append("visibleCommentIds",J()),me(z,!1,i).done(function(t){E||"object"==typeof t&&t.success&&(Q(t),e(".wpd-thread-info").html(t.data.wc_all_comments_count_before_threads_html),t.data.wc_all_comments_count_new=parseInt(t.data.wc_all_comments_count_new),e("#wpd-bubble-all-comments-count").replaceWith(t.data.wc_all_comments_count_bubble_html),t.data.wc_all_comments_count_new?e("#wpd-bubble-all-comments-count").show():e("#wpd-bubble-all-comments-count").hide(),r=t.data.loadLastCommentId)}).fail(function(e,t,o){console.log(o)})),o.ids=o.ids.filter(function(t){if(!e("#comment-"+t).length)return t});var a=5e3;l=parseInt(o.ids[o.ids.length-1]),D=D.concat(o.ids),y&&o.commentText&&(e("#wpd-bubble-author-avatar").html(o.avatar),e("#wpd-bubble-author-name").html(o.authorName),e("#wpd-bubble-comment-date span").html(o.commentDate),e("#wpd-bubble-comment-text").html(o.commentText),e("#wpd-bubble-comment-reply-link a").attr("href",o.commentLink),e("#wpd-bubble-notification-message").show(),a=1e4);var n=parseInt(e(".wpd-new-comments-count").text());n+=o.ids.length,e("#wpd-bubble-wrapper").removeClass("wpd-new-comment-added"),e("#wpd-bubble-wrapper").addClass("wpd-new-comment-added"),setTimeout(function(){e("#wpd-bubble-notification-message").hide(),e("#wpd-bubble-wrapper").removeClass("wpd-new-comment-added")},a),e(".wpd-new-comments-count").text(n),e("#wpd-bubble-count").addClass("wpd-new-comments")}o.all_comments_count=parseInt(o.all_comments_count),e("#wpd-bubble-all-comments-count").replaceWith(o.all_comments_count_bubble_html),o.all_comments_count?e("#wpd-bubble-all-comments-count").show():e("#wpd-bubble-all-comments-count").hide(),e(".wpd-thread-info").html(o.all_comments_count_before_threads_html)}else console.log(o);var i;setTimeout(t,c)}).fail(function(e,o,a){console.log(a),setTimeout(t,c)})},c),e(".wpd-inline-form-wrapper").length){var se=new FormData;se.append("action","wpdGetInlineCommentForm"),me(z,!1,se).done(function(t){"object"==typeof t?t.success?(e(".wpd-inline-form-wrapper").append(t.data),e.each(e("[name=_wpd_inline_nonce]"),function(){var t=e(this).attr("id"),o=e(this).parents(".wpd-inline-shortcode").attr("id");e(this).attr("id",t+"-"+o.substring(o.lastIndexOf("-")+1))}),e(".wpd-inline-opened").addClass("wpd-active"),e(".wpd-inline-opened").find(".wpd-inline-form-wrapper").show(),e(".wpd-inline-opened").find(".wpd-inline-icon").addClass("wpd-open"),e(".wpd-inline-opened").find(".wpd-inline-icon").removeClass("wpd-ignored"),re()):wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[t.data],"error"):console.log(t)}).fail(function(e,t,o){console.log(o)})}function de(t){if(e(t).hasClass("wpd-inline-shortcode"))var o=e(t).attr("id");else o=e(t).parents(".wpd-inline-shortcode").attr("id");return o.substring(o.lastIndexOf("-")+1)}function ce(){e(".wpd-inline-form-wrapper").hide(),e(".wpd-inline-shortcode").removeClass("wpd-active"),e(".wpd-inline-icon").removeClass("wpd-open")}function pe(){e.each(e(".wpd-inline-shortcode:not(.wpd-inline-opened) .wpd-inline-icon"),function(){var t=e(this),o=t.offset().top-window.pageYOffset;o>0&&o<300&&("blink"===A?(t.addClass("wpd-blink"),setTimeout(function(){t.removeClass("wpd-blink")},3e3)):(t.parents(".wpd-inline-shortcode").addClass("wpd-active"),t.siblings(".wpd-inline-form-wrapper").show(),t.addClass("wpd-open"),re(t.siblings(".wpd-inline-form-wrapper"))))})}function re(t){if(t){if(t.offset().left<=10)t.css("left",Math.ceil(parseInt(t.css("left"))-t.offset().left+10)),(o=Math.ceil(t.siblings(".wpd-inline-icon.wpd-open").offset().left-t.offset().left+2))<3&&(o=3),document.styleSheets[0].addRule("#"+t.parents(".wpd-inline-shortcode").attr("id")+" .wpd-inline-form-wrapper::before","left: "+o+"px;");else if(t.offset().left+t.width()>document.body.clientWidth-10){var o;t.css("left",Math.ceil(parseInt(t.css("left"))+(document.body.clientWidth-(t.offset().left+t.width()))-10)),(o=Math.ceil(t.siblings(".wpd-inline-icon.wpd-open").offset().left-t.offset().left+2))>t.width()-3&&(o=t.width()-3),document.styleSheets[0].addRule("#"+t.parents(".wpd-inline-shortcode").attr("id")+" .wpd-inline-form-wrapper::before","left: "+o+"px;")}}else e.each(e(".wpd-inline-form-wrapper:visible"),function(){if(e(this).offset().left<=10)e(this).css("left",Math.ceil(parseInt(e(this).css("left"))-e(this).offset().left+10)),(t=Math.ceil(e(this).siblings(".wpd-inline-icon.wpd-open").offset().left-e(this).offset().left+2))<3&&(t=3),document.styleSheets[0].addRule("#"+e(this).parents(".wpd-inline-shortcode").attr("id")+" .wpd-inline-form-wrapper::before","left: "+t+"px;");else if(e(this).offset().left+e(this).width()>document.body.clientWidth-10){var t;e(this).css("left",Math.ceil(parseInt(e(this).css("left"))+(document.body.clientWidth-(e(this).offset().left+e(this).width()))-10)),(t=Math.ceil(e(this).siblings(".wpd-inline-icon.wpd-open").offset().left-e(this).offset().left+2))>e(this).width()-3&&(t=e(this).width()-3),document.styleSheets[0].addRule("#"+e(this).parents(".wpd-inline-shortcode").attr("id")+" .wpd-inline-form-wrapper::before","left: "+t+"px;")}})}function le(t,o,a,n){t.data.callbackFunctions&&e.each(t.data.callbackFunctions,function(e){"function"==typeof wpdiscuzAjaxObj[t.data.callbackFunctions[e]]?wpdiscuzAjaxObj[t.data.callbackFunctions[e]](t,o,a,n):console.log(t.data.callbackFunctions[e]+" is not a function")})}function me(t,o,a){o&&e("#wpdiscuz-loading-bar").show(),a.append("postId",s);var n=a.get("action");wpdiscuzAjaxObj.dataFilterCallbacks&&wpdiscuzAjaxObj.dataFilterCallbacks[n]&&e.each(wpdiscuzAjaxObj.dataFilterCallbacks[n],function(e){"function"==typeof wpdiscuzAjaxObj[wpdiscuzAjaxObj.dataFilterCallbacks[n][e]]&&(a=wpdiscuzAjaxObj[wpdiscuzAjaxObj.dataFilterCallbacks[n][e]](a,t,o))});var i=t?wpdiscuzAjaxObj.url:wpdiscuzAjaxObj.customAjaxUrl;return e.ajax({type:"POST",url:i,data:a,contentType:!1,processData:!1})}e(document).on("click","body",function(t){if(e(t.target).hasClass("wpd-inline-form-close")||e(t.target).parents(".wpd-inline-form-close").length)t.preventDefault(),e(t.target).parents(".wpd-inline-form-wrapper").hide(),e(t.target).parents(".wpd-inline-shortcode").removeClass("wpd-active"),e(t.target).parents(".wpd-inline-form-wrapper").siblings(".wpd-inline-icon").removeClass("wpd-open");else if(!e(t.target).hasClass("wpd-inline-form-wrapper")&&!e(t.target).parents(".wpd-inline-form-wrapper").length){ce();var o="";e(t.target).hasClass("wpd-inline-icon")?o=e(t.target):e(t.target).parents(".wpd-inline-icon").length&&(o=e(t.target).parents(".wpd-inline-icon")),o.length&&(o.parents(".wpd-inline-shortcode").addClass("wpd-active"),o.siblings(".wpd-inline-form-wrapper").show(),o.addClass("wpd-open"),o.removeClass("wpd-ignored"),re(o.siblings(".wpd-inline-form-wrapper")))}(!e(t.target).hasClass("wpd-last-inline-comments-wrapper")&&!e(t.target).parents(".wpd-last-inline-comments-wrapper").length||e(t.target).parents(".wpd-last-inline-comments-wrapper").length&&e(t.target).hasClass("wpd-load-inline-comment"))&&e(".wpd-last-inline-comments-wrapper").remove()}),e(document).on("click",".wpd-inline-submit.wpd_not_clicked",function(t){t.preventDefault();var o=e(this),a=e(this).parents(".wpd_inline_comm_form");if(a[0].checkValidity()){e(this).removeClass("wpd_not_clicked");var n=new FormData;n.append("action","wpdAddInlineComment"),n.append("inline_form_id",de(a)),e.each(e("input, textarea",a),function(t,o){"checkbox"===this.type?e(this).is(":checked")&&n.append(e(o).attr("name"),e(o).val()):n.append(e(o).attr("name"),e(o).val())}),me(z,!0,n).done(function(t){if(o.addClass("wpd_not_clicked"),"object"==typeof t)if(t.success){a[0].reset(),ce();var n=parseInt(t.data.newCount),i=o.parents(".wpd-inline-icon-wrapper").find(".wpd-inline-icon-count");i.text(n),n?i.addClass("wpd-has-comments"):i.removeClass("wpd-has-comments"),e(".wpd-thread-info").html(t.data.allCommentsCountBeforeThreadsHtml),t.data.allCommentsCountNew=parseInt(t.data.allCommentsCountNew),e("#wpd-bubble-all-comments-count").replaceWith(t.data.allCommentsCountBubbleHtml),t.data.allCommentsCountNew?e("#wpd-bubble-all-comments-count").show():e("#wpd-bubble-all-comments-count").hide(),t.data.message&&oe(t.data.message),wpdiscuzAjaxObj.setCommentMessage(t.data.notification,"success")}else t.data&&wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[t.data],"error");else wpdiscuzAjaxObj.setCommentMessage(t,"error");e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}}),e(document).on("keydown",".wpd-form",function(t){t.ctrlKey&&13==t.keyCode&&e(this).find(".wc_comm_submit").trigger("click")}),e(document).on("keydown","#wpdiscuz-edit-form",function(t){t.ctrlKey&&13==t.keyCode&&e(this).find(".wc_save_edited_comment").trigger("click")}),e(document).on("keydown",".wpd-inline-comment-content",function(t){t.ctrlKey&&13==t.keyCode&&e(this).parents(".wpd_inline_comm_form").find(".wpd-inline-submit.wpd_not_clicked").trigger("click")}),e(document).on("click",".wpd-inline-icon-count.wpd-has-comments",function(){var t=e(this),o=new FormData;o.append("action","wpdGetLastInlineComments"),o.append("inline_form_id",de(t)),me(z,!0,o).done(function(o){"object"==typeof o?o.success?e(o.data).insertAfter(t):wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[o.data],"error"):console.log(o),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}),e(document).on("click",".wpd-view-all-inline-comments",function(t){t.preventDefault(),e(this).parents(".wpd-last-inline-comments-wrapper").remove(),e(".wpdf-inline").hasClass("wpdf-active")||e(".wpdf-inline").trigger("click"),ee(),e("html, body").animate({scrollTop:e(".wpdf-inline").offset().top-32},1e3,te)}),e(document).on("click",".wpd-feedback-content-link",function(t){t.preventDefault();var o=e(this).data("feedback-content-id");ee(),e("html, body").animate({scrollTop:e("#wpd-inline-"+o).offset().top-38},1e3,function(){te(),e("#wpd-inline-"+o).addClass("wpd-active")})}),"scroll_open"!==A&&"blink"!==A||(pe(),e(window).scroll(pe)),e(document).on("click","#wpd-post-rating.wpd-not-rated .wpd-rate-starts svg",function(){var t=new FormData,o=e(this).index();o>=0&&o<5&&(t.append("action","wpdUserRate"),t.append("rating",o+1),me(z,!0,t).done(function(t){"object"==typeof t?t.success?location.reload(!0):wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[t.data],"error"):console.log(t),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)}))}),e("#wpdiscuz-subscribe-form").submit(function(t){t.preventDefault();var o,a,i=e(this);if(i[0].checkValidity()&&(o=i,a=!0,"2.0"===n&&e("input[name=wpdiscuz_recaptcha_subscribe_form]",o).length&&!e("input[name=wpdiscuz_recaptcha_subscribe_form]",o).val().length?(a=!1,e(".wpdiscuz-recaptcha",o).css("border","1px solid red")):"2.0"===n&&e("input[name=wpdiscuz_recaptcha_subscribe_form]",o).length&&e(".wpdiscuz-recaptcha",o).css("border","none"),a)){var s=new FormData;s.append("action","wpdAddSubscription"),e("*",i).each(function(){""!=this.name&&"checkbox"!=this.type&&"radio"!=this.type&&s.append(this.name+"",e(this).val()),"checkbox"!=this.type&&"radio"!=this.type||e(this).is(":checked")&&s.append(this.name+"",e(this).val())}),me(z,!0,s).done(function(t){"object"==typeof t?t.success?(wpdiscuzAjaxObj.setCommentMessage(t.data,"success"),setTimeout(function(){location.reload(!0)},3e3)):wpdiscuzAjaxObj.setCommentMessage(t.data,"error"):wpdiscuzAjaxObj.setCommentMessage(t,"error"),e("#wpdiscuz-loading-bar").fadeOut(250),E=!1}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}}),e(document).on("click",".wpd-unsubscribe",function(t){t.preventDefault();var o=new FormData;o.append("action","wpdUnsubscribe"),o.append("sid",e(this).data("sid")),o.append("skey",e(this).data("skey")),me(z,!0,o).done(function(t){"object"==typeof t?t.success?(wpdiscuzAjaxObj.setCommentMessage(t.data,"success"),setTimeout(function(){location.reload(!0)},3e3)):wpdiscuzAjaxObj.setCommentMessage(t.data,"error"):console.log(t),e("#wpdiscuz-loading-bar").fadeOut(250),E=!1}).fail(function(t,o,a){console.log(a),e("#wpdiscuz-loading-bar").fadeOut(250)})}),wpdiscuzAjaxObj.resetActiveFilters=function(t){e(".wpd-filter.wpdf-active"+(t?":not("+t+")":"")).removeClass("wpdf-active")},wpdiscuzAjaxObj.getAjaxObj=me});var onloadCallback=function(){if(document.getElementById("wpdiscuz-recaptcha-0_0")&&"2.0"===wpdiscuzAjaxObj.wpDiscuzReCaptchaVersion&&(1==wpdiscuzAjaxObj.wc_captcha_show_for_guest&&!wpdiscuzAjaxObj.is_user_logged_in||1==wpdiscuzAjaxObj.wc_captcha_show_for_members&&wpdiscuzAjaxObj.is_user_logged_in))try{grecaptcha.render("wpdiscuz-recaptcha-0_0",{sitekey:wpdiscuzAjaxObj.wpDiscuzReCaptchaSK,theme:wpdiscuzAjaxObj.wpDiscuzReCaptchaTheme,callback:function(e){jQuery("#wpdiscuz-recaptcha-field-0_0").val("key")},"expired-callback":function(){jQuery("#wpdiscuz-recaptcha-field-0_0").val("")}})}catch(e){console.log(e),wpdiscuzAjaxObj.setCommentMessage("reCaptcha Error: "+e.message,"error")}};
(function(t,e,i){function n(i,n,o){var r=e.createElement(i);return n&&(r.id=Z+n),o&&(r.style.cssText=o),t(r)}function o(){return i.innerHeight?i.innerHeight:t(i).height()}function r(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(n=t(this.el).attr("data-cbox-"+e),void 0!==n?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==X[e]&&(this.cache[e]=X[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function h(t){var e=W.length,i=(A+t)%e;return 0>i?e+i:i}function a(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():o())/100:1)*parseInt(t,10))}function s(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function l(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function d(t){"contains"in x[0]&&!x[0].contains(t.target)&&t.target!==v[0]&&(t.stopPropagation(),x.focus())}function c(t){c.str!==t&&(x.add(v).removeClass(c.str).addClass(t),c.str=t)}function g(e){A=0,e&&e!==!1&&"nofollow"!==e?(W=t("."+te).filter(function(){var i=t.data(this,Y),n=new r(this,i);return n.get("rel")===e}),A=W.index(_.el),-1===A&&(W=W.add(_.el),A=W.length-1)):W=t(_.el)}function u(i){t(e).trigger(i),ae.triggerHandler(i)}function f(i){var o;if(!G){if(o=t(i).data(Y),_=new r(i,o),g(_.get("rel")),!U){U=$=!0,c(_.get("className")),x.css({visibility:"hidden",display:"block",opacity:""}),I=n(se,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),b.css({width:"",height:""}).append(I),j=T.height()+k.height()+b.outerHeight(!0)-b.height(),D=C.width()+H.width()+b.outerWidth(!0)-b.width(),N=I.outerHeight(!0),z=I.outerWidth(!0);var h=a(_.get("initialWidth"),"x"),s=a(_.get("initialHeight"),"y"),l=_.get("maxWidth"),f=_.get("maxHeight");_.w=Math.max((l!==!1?Math.min(h,a(l,"x")):h)-z-D,0),_.h=Math.max((f!==!1?Math.min(s,a(f,"y")):s)-N-j,0),I.css({width:"",height:_.h}),J.position(),u(ee),_.get("onOpen"),O.add(F).hide(),x.focus(),_.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",d,!0),ae.one(re,function(){e.removeEventListener("focus",d,!0)})),_.get("returnFocus")&&ae.one(re,function(){t(_.el).focus()})}var p=parseFloat(_.get("opacity"));v.css({opacity:p===p?p:"",cursor:_.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),_.get("closeButton")?B.html(_.get("close")).appendTo(b):B.appendTo("<div/>"),w()}}function p(){x||(V=!1,E=t(i),x=n(se).attr({id:Y,"class":t.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),v=n(se,"Overlay").hide(),L=t([n(se,"LoadingOverlay")[0],n(se,"LoadingGraphic")[0]]),y=n(se,"Wrapper"),b=n(se,"Content").append(F=n(se,"Title"),R=n(se,"Current"),P=t('<button type="button"/>').attr({id:Z+"Previous"}),K=t('<button type="button"/>').attr({id:Z+"Next"}),S=t('<button type="button"/>').attr({id:Z+"Slideshow"}),L),B=t('<button type="button"/>').attr({id:Z+"Close"}),y.append(n(se).append(n(se,"TopLeft"),T=n(se,"TopCenter"),n(se,"TopRight")),n(se,!1,"clear:left").append(C=n(se,"MiddleLeft"),b,H=n(se,"MiddleRight")),n(se,!1,"clear:left").append(n(se,"BottomLeft"),k=n(se,"BottomCenter"),n(se,"BottomRight"))).find("div div").css({"float":"left"}),M=n(se,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),O=K.add(P).add(R).add(S)),e.body&&!x.parent().length&&t(e.body).append(v,x.append(y,M))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),f(this))}return x?(V||(V=!0,K.click(function(){J.next()}),P.click(function(){J.prev()}),B.click(function(){J.close()}),v.click(function(){_.get("overlayClose")&&J.close()}),t(e).bind("keydown."+Z,function(t){var e=t.keyCode;U&&_.get("escKey")&&27===e&&(t.preventDefault(),J.close()),U&&_.get("arrowKey")&&W[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),K.click()))}),typeof t.fn.on==='function'?t(e).on("click."+Z,"."+te,i):t("."+te).live("click."+Z,i)),!0):!1}function w(){var e,o,r,h=J.prep,d=++le;if($=!0,q=!1,u(he),u(ie),_.get("onLoad"),_.h=_.get("height")?a(_.get("height"),"y")-N-j:_.get("innerHeight")&&a(_.get("innerHeight"),"y"),_.w=_.get("width")?a(_.get("width"),"x")-z-D:_.get("innerWidth")&&a(_.get("innerWidth"),"x"),_.mw=_.w,_.mh=_.h,_.get("maxWidth")&&(_.mw=a(_.get("maxWidth"),"x")-z-D,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.get("maxHeight")&&(_.mh=a(_.get("maxHeight"),"y")-N-j,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.get("href"),Q=setTimeout(function(){L.show()},100),_.get("inline")){var c=t(e).eq(0);r=t("<div>").hide().insertBefore(c),ae.one(he,function(){r.replaceWith(c)}),h(c)}else _.get("iframe")?h(" "):_.get("html")?h(_.get("html")):s(_,e)?(e=l(_,e),q=_.get("createImg"),t(q).addClass(Z+"Photo").bind("error."+Z,function(){h(n(se,"Error").html(_.get("imgError")))}).one("load",function(){d===le&&setTimeout(function(){var e;_.get("retinaImage")&&i.devicePixelRatio>1&&(q.height=q.height/i.devicePixelRatio,q.width=q.width/i.devicePixelRatio),_.get("scalePhotos")&&(o=function(){q.height-=q.height*e,q.width-=q.width*e},_.mw&&q.width>_.mw&&(e=(q.width-_.mw)/q.width,o()),_.mh&&q.height>_.mh&&(e=(q.height-_.mh)/q.height,o())),_.h&&(q.style.marginTop=Math.max(_.mh-q.height,0)/2+"px"),W[1]&&(_.get("loop")||W[A+1])&&(q.style.cursor="pointer",t(q).bind("click."+Z,function(){J.next()})),q.style.width=q.width+"px",q.style.height=q.height+"px",h(q)},1)}),q.src=e):e&&M.load(e,_.get("data"),function(e,i){d===le&&h("error"===i?n(se,"Error").html(_.get("xhrError")):t(this).contents())})}var v,x,y,b,T,C,H,k,W,E,I,M,L,F,R,S,K,P,B,O,_,j,D,N,z,A,q,U,$,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title},createImg:function(){var e=new Image,i=t(this).data("cbox-img-attrs");return"object"==typeof i&&t.each(i,function(t,i){e[t]=i}),e},createIframe:function(){var i=e.createElement("iframe"),n=t(this).data("cbox-iframe-attrs");return"object"==typeof n&&t.each(n,function(t,e){i[t]=e}),"frameBorder"in i&&(i.frameBorder=0),"allowTransparency"in i&&(i.allowTransparency="true"),i.name=(new Date).getTime(),i.allowFullscreen=!0,i}},Y="colorbox",Z="cbox",te=Z+"Element",ee=Z+"_open",ie=Z+"_load",ne=Z+"_complete",oe=Z+"_cleanup",re=Z+"_closed",he=Z+"_purge",ae=t("<a/>"),se="div",le=0,de={},ce=function(){function t(){clearTimeout(h)}function e(){(_.get("loop")||W[A+1])&&(t(),h=setTimeout(J.next,_.get("slideshowSpeed")))}function i(){S.html(_.get("slideshowStop")).unbind(s).one(s,n),ae.bind(ne,e).bind(ie,t),x.removeClass(a+"off").addClass(a+"on")}function n(){t(),ae.unbind(ne,e).unbind(ie,t),S.html(_.get("slideshowStart")).unbind(s).one(s,function(){J.next(),i()}),x.removeClass(a+"on").addClass(a+"off")}function o(){r=!1,S.hide(),t(),ae.unbind(ne,e).unbind(ie,t),x.removeClass(a+"off "+a+"on")}var r,h,a=Z+"Slideshow_",s="click."+Z;return function(){r?_.get("slideshow")||(ae.unbind(oe,o),o()):_.get("slideshow")&&W[1]&&(r=!0,ae.one(oe,o),_.get("slideshowAuto")?i():n(),S.show())}}();t[Y]||(t(p),J=t.fn[Y]=t[Y]=function(e,i){var n,o=this;return e=e||{},t.isFunction(o)&&(o=t("<a/>"),e.open=!0),o[0]?(p(),m()&&(i&&(e.onComplete=i),o.each(function(){var i=t.data(this,Y)||{};t.data(this,Y,t.extend(i,e))}).addClass(te),n=new r(o[0],e),n.get("open")&&f(o[0])),o):o},J.position=function(e,i){function n(){T[0].style.width=k[0].style.width=b[0].style.width=parseInt(x[0].style.width,10)-D+"px",b[0].style.height=C[0].style.height=H[0].style.height=parseInt(x[0].style.height,10)-j+"px"}var r,h,s,l=0,d=0,c=x.offset();if(E.unbind("resize."+Z),x.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),_.get("fixed")?(c.top-=h,c.left-=s,x.css({position:"fixed"})):(l=h,d=s,x.css({position:"absolute"})),d+=_.get("right")!==!1?Math.max(E.width()-_.w-z-D-a(_.get("right"),"x"),0):_.get("left")!==!1?a(_.get("left"),"x"):Math.round(Math.max(E.width()-_.w-z-D,0)/2),l+=_.get("bottom")!==!1?Math.max(o()-_.h-N-j-a(_.get("bottom"),"y"),0):_.get("top")!==!1?a(_.get("top"),"y"):Math.round(Math.max(o()-_.h-N-j,0)/2),x.css({top:c.top,left:c.left,visibility:"visible"}),y[0].style.width=y[0].style.height="9999px",r={width:_.w+z+D,height:_.h+N+j,top:l,left:d},e){var g=0;t.each(r,function(t){return r[t]!==de[t]?(g=e,void 0):void 0}),e=g}de=r,e||x.css(r),x.dequeue().animate(r,{duration:e||0,complete:function(){n(),$=!1,y[0].style.width=_.w+z+D+"px",y[0].style.height=_.h+N+j+"px",_.get("reposition")&&setTimeout(function(){E.bind("resize."+Z,J.position)},1),t.isFunction(i)&&i()},step:n})},J.resize=function(t){var e;U&&(t=t||{},t.width&&(_.w=a(t.width,"x")-z-D),t.innerWidth&&(_.w=a(t.innerWidth,"x")),I.css({width:_.w}),t.height&&(_.h=a(t.height,"y")-N-j),t.innerHeight&&(_.h=a(t.innerHeight,"y")),t.innerHeight||t.height||(e=I.scrollTop(),I.css({height:"auto"}),_.h=I.height()),I.css({height:_.h}),e&&I.scrollTop(e),J.position("none"===_.get("transition")?0:_.get("speed")))},J.prep=function(i){function o(){return _.w=_.w||I.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function a(){return _.h=_.h||I.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if(U){var d,g="none"===_.get("transition")?0:_.get("speed");I.remove(),I=n(se,"LoadedContent").append(i),I.hide().appendTo(M.show()).css({width:o(),overflow:_.get("scrolling")?"auto":"hidden"}).css({height:a()}).prependTo(b),M.hide(),t(q).css({"float":"none"}),c(_.get("className")),d=function(){function i(){t.support.opacity===!1&&x[0].style.removeAttribute("filter")}var n,o,a=W.length;U&&(o=function(){clearTimeout(Q),L.hide(),u(ne),_.get("onComplete")},F.html(_.get("title")).show(),I.show(),a>1?("string"==typeof _.get("current")&&R.html(_.get("current").replace("{current}",A+1).replace("{total}",a)).show(),K[_.get("loop")||a-1>A?"show":"hide"]().html(_.get("next")),P[_.get("loop")||A?"show":"hide"]().html(_.get("previous")),ce(),_.get("preloading")&&t.each([h(-1),h(1)],function(){var i,n=W[this],o=new r(n,t.data(n,Y)),h=o.get("href");h&&s(o,h)&&(h=l(o,h),i=e.createElement("img"),i.src=h)})):O.hide(),_.get("iframe")?(n=_.get("createIframe"),_.get("scrolling")||(n.scrolling="no"),t(n).attr({src:_.get("href"),"class":Z+"Iframe"}).one("load",o).appendTo(I),ae.one(he,function(){n.src="//about:blank"}),_.get("fastIframe")&&t(n).trigger("load")):o(),"fade"===_.get("transition")?x.fadeTo(g,1,i):i())},"fade"===_.get("transition")?x.fadeTo(g,0,function(){J.position(0,d)}):J.position(g,d)}},J.next=function(){!$&&W[1]&&(_.get("loop")||W[A+1])&&(A=h(1),f(W[A]))},J.prev=function(){!$&&W[1]&&(_.get("loop")||A)&&(A=h(-1),f(W[A]))},J.close=function(){U&&!G&&(G=!0,U=!1,u(oe),_.get("onCleanup"),E.unbind("."+Z),v.fadeTo(_.get("fadeOut")||0,0),x.stop().fadeTo(_.get("fadeOut")||0,0,function(){x.hide(),v.hide(),u(he),I.remove(),setTimeout(function(){G=!1,u(re),_.get("onClosed")},1)}))},J.remove=function(){x&&(x.stop(),t[Y].close(),x.stop(!1,!0).remove(),v.remove(),G=!1,x=null,t("."+te).removeData(Y).removeClass(te),t(e).unbind("click."+Z).unbind("keydown."+Z))},J.element=function(){return t(_.el)},J.settings=X)})(jQuery,document,window);
jQuery(document).ready(function(e){if(e(document).delegate("#wpdcom .wmu-upload-wrap","click",function(){e(".wpd-form-foot",e(this).parents(".wpd_comm_form")).slideDown(parseInt(wpdiscuzAjaxObj.enableDropAnimation)?500:0)}),e(document).delegate(".wmu-add-files","change",function(){var a=e(this),t=a.parents(".wpd_comm_form"),d=a[0].files?a[0].files:[];d.length&&function(a,t,d){var o=new FormData;o.append("action","wmuUploadFiles"),o.append("wmu_nonce",wpdiscuzAjaxObj.wmuSecurity),o.append("wmuAttachmentsData",e(".wmu-attachments-data",t).val());var i=0;e.each(d,function(e,a){i+=a.size,o.append(wpdiscuzAjaxObj.wmuInput+"["+e+"]",a)}),i>parseInt(wpdiscuzAjaxObj.wmuMaxFileSize)?wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj.wmuPhraseMaxFileSize,"error",3e3):i>parseInt(wpdiscuzAjaxObj.wmuPostMaxSize)?wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj.wmuPhrasePostMaxSize,"error",3e3):wpdiscuzAjaxObj.getAjaxObj(!0,!0,o).done(function(a){a.success?(e(".wmu-attached-data-info",t).remove(),e(".wmu-add-files",t).after(a.data.attachmentsHtml),a.data.tooltip&&e(".wmu-upload-wrap").attr("wpd-tooltip",a.data.tooltip),function(a,t){e.each(t.data.previewsData,function(t,d){e(".wmu-action-wrap .wmu-"+t+"-tab",a).html(""),e.each(d,function(d,o){var i=o.id,m="",s=o.fullname,u=o.shortname;t==wpdiscuzAjaxObj.wmuKeyImages?(m=o.url,u=""):t==wpdiscuzAjaxObj.wmuKeyVideos?m=wpdiscuzAjaxObj.wmuIconVideo:t==wpdiscuzAjaxObj.wmuKeyFiles&&(m=wpdiscuzAjaxObj.wmuIconFile);var r='<div class="wmu-preview [PREVIEW_TYPE_CLASS]" title="[PREVIEW_TITLE]" data-wmu-type="[PREVIEW_TYPE]" data-wmu-attachment="[PREVIEW_ID]"><div class="wmu-preview-remove"><img class="wmu-preview-img" src="[PREVIEW_ICON]"><div class="wmu-file-name">[PREVIEW_FILENAME]</div><div class="wmu-delete">&nbsp;</div></div></div>';r=(r=(r=(r=(r=(r=r.replace("[PREVIEW_TYPE_CLASS]","wmu-preview-"+t)).replace("[PREVIEW_TITLE]",s)).replace("[PREVIEW_TYPE]",t)).replace("[PREVIEW_ID]",i)).replace("[PREVIEW_ICON]",m)).replace("[PREVIEW_FILENAME]",u),e(".wmu-action-wrap .wmu-"+t+"-tab",a).removeClass("wmu-hide").append(r)})})}(t,a),a.data.errors&&(wpdiscuzAjaxObj.setCommentMessage(a.data.errors,"error",3e3),console.log(a.data.errors))):a.data.errorCode?wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[a.data.errorCode],"error",3e3):a.data.error&&wpdiscuzAjaxObj.setCommentMessage(a.data.error,"error",3e3),e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(a,t,d){console.log(d),e("#wpdiscuz-loading-bar").fadeOut(250)})}(0,t,d)}),e(document).delegate(".wmu-attachment-delete","click",function(a){if(confirm(wpdiscuzAjaxObj.wmuPhraseConfirmDelete)){var t=e(this).data("wmu-attachment"),d=new FormData;d.append("action","wmuDeleteAttachment"),d.append("wmu_nonce",wpdiscuzAjaxObj.wmuSecurity),d.append("attachmentId",t),wpdiscuzAjaxObj.getAjaxObj(!0,!0,d).done(function(a){if(a.success){var d=e(".wmu-attachment-"+t).parents(".wmu-comment-attachments");e(".wmu-attachment-"+t).remove(),e(".wmu-attached-images *",d).length||e(".wmu-attached-images",d).remove(),e(".wmu-attached-videos *",d).length||e(".wmu-attached-videos",d).remove(),e(".wmu-attached-files *",d).length||e(".wmu-attached-files",d).remove()}else a.data.errorCode?wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[a.data.errorCode],"error",3e3):a.data.error&&wpdiscuzAjaxObj.setCommentMessage(a.data.error,"error",3e3);e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(a,t,d){console.log(d),e("#wpdiscuz-loading-bar").fadeOut(250)})}else console.log("canceled")}),e(document).delegate(".wmu-preview","click",function(){var a=e(this),t=a.parents(".wpd_comm_form"),d=(a.data("wmu-type"),a.data("wmu-attachment")),o=new FormData;o.append("action","wmuRemoveAttachmentPreview"),o.append("attachmentId",d),o.append("wmu_nonce",wpdiscuzAjaxObj.wmuSecurity),o.append("wmuAttachmentsData",e(".wmu-attachments-data",t).val()),wpdiscuzAjaxObj.getAjaxObj(!0,!0,o).done(function(d){if(d.success){a.remove();var o=e(".wmu-tabs",t);e.each(o,function(a,t){e(".wmu-preview",t).length?e(t).removeClass("wmu-hide"):e(t).addClass("wmu-hide")}),e(".wmu-attached-data-info",t).remove(),e(".wmu-add-files",t).after(d.data.attachmentsHtml),d.data.tooltip&&e(".wmu-upload-wrap").attr("wpd-tooltip",d.data.tooltip)}else d.data.errorCode?wpdiscuzAjaxObj.setCommentMessage(wpdiscuzAjaxObj[d.data.errorCode],"error",3e3):d.data.error&&wpdiscuzAjaxObj.setCommentMessage(d.data.error,"error",3e3);e("#wpdiscuz-loading-bar").fadeOut(250)}).fail(function(a,t,d){console.log(d),e("#wpdiscuz-loading-bar").fadeOut(250)})}),parseInt(wpdiscuzAjaxObj.wmuIsLightbox)){function a(){e(".wmu-lightbox").colorbox({maxHeight:"95%",maxWidth:"95%",rel:"wmu-lightbox",fixed:!0})}a(),wpdiscuzAjaxObj.wmuAddLightBox=a}wpdiscuzAjaxObj.wmuHideAll=function(a,t){"object"==typeof a?a.success?(e(".wmu-tabs",t).addClass("wmu-hide"),e(".wmu-preview",t).remove(),e(".wmu-attached-data-info",t).remove()):console.log(a.data):console.log(a)}});
!function(e,t){"function"==typeof define&&define.amd?define(["jquery"],function(n){return t(e,n)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=t(e,require("jquery")):e.lity=t(e,e.jQuery||e.Zepto)}("undefined"!=typeof window?window:this,function(e,t){"use strict";var n=e.document,i=t(e),r=t.Deferred,o=t("html"),a=[],l="aria-hidden",s="lity-"+l,d='a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',c={esc:!0,handler:null,handlers:{image:C,inline:function(e,n){var i,r,o;try{i=t(e)}catch(e){return!1}if(!i.length)return!1;return r=t('<i style="display:none !important"/>'),o=i.hasClass("lity-hide"),n.element().one("lity:remove",function(){r.before(i).remove(),o&&!i.closest(".lity-content").length&&i.addClass("lity-hide")}),i.removeClass("lity-hide").after(r)},youtube:function(e){var n=f.exec(e);if(!n)return!1;return k(x(e,w("https://www.youtube"+(n[2]||"")+".com/embed/"+n[4],t.extend({autoplay:1},b(n[5]||"")))))},vimeo:function(e){var n=y.exec(e);if(!n)return!1;return k(x(e,w("https://player.vimeo.com/video/"+n[3],t.extend({autoplay:1},b(n[4]||"")))))},googlemaps:function(e){var t=v.exec(e);if(!t)return!1;return k(x(e,w("https://www.google."+t[3]+"/maps?"+t[6],{output:t[6].indexOf("layer=c")>0?"svembed":"embed"})))},facebookvideo:function(e){var n=p.exec(e);if(!n)return!1;0!==e.indexOf("http")&&(e="https:"+e);return k(x(e,w("https://www.facebook.com/plugins/video.php?href="+e,t.extend({autoplay:1},b(n[4]||"")))))},iframe:k},template:'<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'},u=/(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,f=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,y=/(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,v=/((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,p=/(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,m=function(){var e=n.createElement("div"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in t)if(void 0!==e.style[i])return t[i];return!1}();function h(e){var t=r();return m&&e.length?(e.one(m,t.resolve),setTimeout(t.resolve,500)):t.resolve(),t.promise()}function g(e,n,i){if(1===arguments.length)return t.extend({},e);if("string"==typeof n){if(void 0===i)return void 0===e[n]?null:e[n];e[n]=i}else t.extend(e,n);return this}function b(e){for(var t,n=decodeURI(e.split("#")[0]).split("&"),i={},r=0,o=n.length;r<o;r++)n[r]&&(i[(t=n[r].split("="))[0]]=t[1]);return i}function w(e,n){return e+(e.indexOf("?")>-1?"&":"?")+t.param(n)}function x(e,t){var n=e.indexOf("#");return-1===n?t:(n>0&&(e=e.substr(n)),t+e)}function C(e,n){var i=n.opener()&&n.opener().data("lity-desc")||"Image with no description",o=t('<img src="'+e+'" alt="'+i+'"/>'),a=r(),l=function(){var e;a.reject((e="Failed loading image",t('<span class="lity-error"/>').append(e)))};return o.on("load",function(){if(0===this.naturalWidth)return l();a.resolve(o)}).on("error",l),a.promise()}function k(e){return'<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="'+e+'"/></div>'}function E(){return n.documentElement.clientHeight?.9*n.documentElement.clientHeight:Math.round(.9*i.height())}function j(e){var t,i,r,o=z();o&&(27===e.keyCode&&o.options("esc")&&o.close(),9===e.keyCode&&(t=e,i=o.element().find(d),r=i.index(n.activeElement),t.shiftKey&&r<=0?(i.get(i.length-1).focus(),t.preventDefault()):t.shiftKey||r!==i.length-1||(i.get(0).focus(),t.preventDefault())))}function D(){t.each(a,function(e,t){t.resize()})}function z(){return 0===a.length?null:a[0]}function T(e,d,u,f){var y,v,p,m,b,w,x,C,k,z,T,O=this,q=!1,W=!1;d=t.extend({},c,d),v=t(d.template),O.element=function(){return v},O.opener=function(){return u},O.options=t.proxy(g,O,d),O.handlers=t.proxy(g,O,d.handlers),O.resize=function(){q&&!W&&p.css("max-height",E()+"px").trigger("lity:resize",[O])},O.close=function(){if(q&&!W){var e;W=!0,(e=O).element().attr(l,"true"),1===a.length&&(o.removeClass("lity-active"),i.off({resize:D,keydown:j})),((a=t.grep(a,function(t){return e!==t})).length?a[0].element():t(".lity-hidden")).removeClass("lity-hidden").each(function(){var e=t(this),n=e.data(s);n?e.attr(l,n):e.removeAttr(l),e.removeData(s)});var d=r();if(f&&(n.activeElement===v[0]||t.contains(v[0],n.activeElement)))try{f.focus()}catch(e){}return p.trigger("lity:close",[O]),v.removeClass("lity-opened").addClass("lity-closed"),h(p.add(v)).always(function(){p.trigger("lity:remove",[O]),v.remove(),v=void 0,d.resolve()}),d.promise()}},m=e,b=O,w=d.handlers,x=d.handler,k="inline",z=t.extend({},w),x&&z[x]?(C=z[x](m,b),k=x):(t.each(["inline","iframe"],function(e,t){delete z[t],z[t]=w[t]}),t.each(z,function(e,t){return!t||!(!t.test||t.test(m,b))||(!1!==(C=t(m,b))?(k=e,!1):void 0)})),y={handler:k,content:C||""},v.attr(l,"false").addClass("lity-loading lity-opened lity-"+y.handler).appendTo("body").focus().on("click","[data-lity-close]",function(e){t(e.target).is("[data-lity-close]")&&O.close()}).trigger("lity:open",[O]),T=O,1===a.unshift(T)&&(o.addClass("lity-active"),i.on({resize:D,keydown:j})),t("body > *").not(T.element()).addClass("lity-hidden").each(function(){var e=t(this);void 0===e.data(s)&&e.data(s,e.attr(l)||null)}).attr(l,"true"),t.when(y.content).always(function(e){p=t(e).css("max-height",E()+"px"),v.find(".lity-loader").each(function(){var e=t(this);h(e).always(function(){e.remove()})}),v.removeClass("lity-loading").find(".lity-content").empty().append(p),q=!0,p.trigger("lity:ready",[O])})}function O(e,i,r){e.preventDefault?(e.preventDefault(),e=(r=t(this)).data("lity-target")||r.attr("rel")||r.attr("src")):r=t(r);var o=new T(e,t.extend({},r.data("lity-options")||r.data("lity"),i),r,n.activeElement);if(!e.preventDefault)return o}return C.test=function(e){return u.test(e)},O.version="2.2.2",O.options=t.proxy(g,O,c),O.handlers=t.proxy(g,O,c.handlers),O.current=z,t(n).on("click.lity","[data-wpd-lity]",O),O});
jQuery(document).ready(function(e){var t=0,n=parseInt(wpdiscuzAjaxObj.isNativeAjaxEnabled),d=parseInt(wpdiscuzUCObj.additionalTab);e(document).on("click",".wpd-info,.wpd-page-link,.wpd-delete-content,.wpd-user-email-delete-links",function(e){e.preventDefault()}),e(document).on("click",".wpd-info.wpd-not-clicked",function(t){var a=e(this);a.removeClass("wpd-not-clicked");var o=new FormData;return o.append("action","wpdGetInfo"),function(t,a){var o=e(".fas",t),i=o.attr("class");o.removeClass(),o.addClass("fas fa-pulse fa-spinner"),wpdiscuzAjaxObj.getAjaxObj(n||d,!1,a).done(function(n){t.addClass("wpd-not-clicked"),o.removeClass(),o.addClass(i),n&&(e("#wpdUserContentInfo").html(n),e("#wpdUserContentInfo ul.wpd-list .wpd-list-item:first-child").addClass("wpd-active"),e("#wpdUserContentInfo div.wpd-content .wpd-content-item:first-child").addClass("wpd-active"),e("#wpdUserContentInfo").is(":visible")||e("#wpdUserContentInfoAnchor").trigger("click"))})}(a,o),!1}),e(document).on("click",".wpd-list-item",function(){var t=e("input.wpd-rel",this).val();e("#wpdUserContentInfo .wpd-list-item").removeClass("wpd-active"),e("#wpdUserContentInfo .wpd-content-item").removeClass("wpd-active");var a=e(this);if(e("#wpdUserContentInfo #"+t).text().length)a.addClass("wpd-active"),e("#wpdUserContentInfo #"+t).addClass("wpd-active");else{var o=new FormData;o.append("action",a.attr("data-action")),o.append("page",0),e("#wpdUserContentInfo #"+t).addClass("wpd-active"),e("#wpdUserContentInfo #"+t).css("text-align","center"),wpdiscuzAjaxObj.getAjaxObj(n||d,!0,o).done(function(n){n&&(e("#wpdUserContentInfo #"+t).css("text-align",""),a.addClass("wpd-active"),e("#wpdUserContentInfo #"+t).html(n)),e("#wpdiscuz-loading-bar").hide()})}}),e(document).on("click",".wpd-page-link.wpd-not-clicked",function(t){var a=e(this);a.removeClass("wpd-not-clicked");var o=a.data("wpd-page"),i=e(".wpd-active .wpd-pagination .wpd-action").val(),s=new FormData;s.append("action",i),s.append("page",o),wpdiscuzAjaxObj.getAjaxObj(n||d,!0,s).done(function(t){a.addClass("wpd-not-clicked"),t&&e(".wpd-content-item.wpd-active").html(t),e("#wpdiscuz-loading-bar").hide()})}),e(document).on("click",".wpd-delete-content.wpd-not-clicked",function(){var a=e(this),o=parseInt(a.data("wpd-content-id"));if(!isNaN(o)){var i=a.data("wpd-delete-action");if("wpdDeleteComment"==i&&!confirm(wpdiscuzUCObj.msgConfirmDeleteComment))return!1;if("wpdCancelSubscription"==i&&!confirm(wpdiscuzUCObj.msgConfirmCancelSubscription))return!1;if("wpdCancelFollow"==i&&!confirm(wpdiscuzUCObj.msgConfirmCancelFollow))return!1;var s=e("i",a),c=s.attr("class"),p=e(".wpd-wrapper .wpd-page-number").val(),l=e(".wpd-content-item.wpd-active").children(".wpd-item").length;a.removeClass("wpd-not-clicked"),s.removeClass().addClass("fas fa-pulse fa-spinner"),1==l&&p>0&&(p-=1);var w=new FormData;w.append("id",o),w.append("page",p),w.append("action",i),wpdiscuzAjaxObj.getAjaxObj(n||d,!1,w).done(function(n){a.addClass("wpd-not-clicked"),s.removeClass().addClass(c),e(".wpd-content-item.wpd-active").html(n),t=1})}}),e(document).on("click","[data-lity-close]",function(n){e(n.target).is("[data-lity-close]")&&t&&window.location.reload(!0)}),e(document).on("click",".wpd-user-email-delete-links.wpd-not-clicked",function(){var t=e(this);t.removeClass("wpd-not-clicked"),e(".wpd-loading",t).addClass("wpd-show");var a=new FormData;a.append("action","wpdEmailDeleteLinks"),wpdiscuzAjaxObj.getAjaxObj(n||d,!1,a).done(function(n){t.addClass("wpd-not-clicked"),e("[data-lity-close]",window.parent.document).trigger("click")})}),e(document).on("click",".wpd-user-settings-button.wpd-not-clicked",function(){var t=e(this);t.removeClass("wpd-not-clicked");var a=t.data("wpd-delete-action");if("deleteCookies"!==a){t.find(".wpd-loading").addClass("wpd-show");var o=new FormData;o.append("action","wpdGuestAction"),o.append("guestAction",a),wpdiscuzAjaxObj.getAjaxObj(n||d,!1,o).done(function(n){t.addClass("wpd-not-clicked"),t.find(".wpd-loading").removeClass("wpd-show");try{var d=e.parseJSON(n);t.after(d.message);var a=t.next(".wpd-guest-action-message");a.fadeIn(100).fadeOut(7e3,function(){a.remove(),1===parseInt(d.code)&&(t.parent().remove(),e(".wpd-delete-all-comments").length||e(".wpd-delete-all-subscriptions").length||e(".wpd-delete-all-cookies").parent().addClass("wpd-show"))})}catch(e){console.log(e)}})}else!function(){for(var e=document.cookie.split(";"),t=0;t<e.length;t++){var n=e[t],d=n.indexOf("="),a=d>-1?n.substr(0,d):n;Cookies.remove(a.trim())}location.reload(!0)}()})});
function wpcShareCommentFB(e,s){FB.ui({method:"share",href:e,quote:s},function(e){})}(wpdiscuzAjaxObj.enableFbLogin||wpdiscuzAjaxObj.enableFbShare)&&wpdiscuzAjaxObj.facebookAppID&&(!function(e,s,n){var o,a=e.getElementsByTagName(s)[0];e.getElementById(n)||((o=e.createElement(s)).id=n,o.src="//connect.facebook.net/en_US/sdk.js",a.parentNode.insertBefore(o,a))}(document,"script","facebook-jssdk"),window.fbAsyncInit=function(){FB.init({appId:wpdiscuzAjaxObj.facebookAppID,cookie:!0,xfbml:!0,version:"v7.0"})}),jQuery(document).ready(function(e){var s;(s=Cookies.get("wpdiscuz_social_login_message"))&&"undefined"!==s&&(Cookies.remove("wpdiscuz_social_login_message"),wpdiscuzAjaxObj.setCommentMessage(decodeURIComponent(s.replace(/\+/g,"%20")),"error")),Cookies.get("wpdiscuz_scroll_to_comments")&&(Cookies.remove("wpdiscuz_scroll_to_comments",{path:"/"}),e("html, body").animate({scrollTop:e("#comments").offset().top-32},1e3)),e(document).delegate(".wpd-comment-share .fa-facebook-f","click",function(){if(1==wpdiscuzAjaxObj.enableFbShare){var s=e(this).parents(".wpd-comment").find(".wpd-comment-right").attr("id"),n=window.location.href;-1!==n.indexOf("#")&&(n=n.substring(0,n.indexOf("#"))),wpcShareCommentFB(n+="#"+s,e(this).parents(".wpd-comment-right").find(".wpd-comment-text").text())}});var n="";function o(e,s){var n,o="";t(s,1),Cookies.set("wpdiscuz_scroll_to_comments",1,{path:"/"}),"facebook"===e&&0==wpdiscuzAjaxObj.facebookUseOAuth2?FB.getLoginStatus(function(t){"connected"===t.status?(n=t.authResponse.accessToken,o=t.authResponse.userID,a(e,n,o,s)):FB.login(function(t){"connected"===t.status&&(n=t.authResponse.accessToken,o=t.authResponse.userID,a(e,n,o,s))},{scope:"public_profile,email"})}):a(e,n,o,s)}function a(s,n,o,a){return e.ajax({type:"POST",url:wpdiscuzAjaxObj.url,data:{action:"wpd_social_login",provider:s,token:n,userID:o,postID:wpdiscuzAjaxObj.wc_post_id}}).done(function(s){!function(s,n){try{var o=e.parseJSON(s),a=o.code,i=o.message,c=o.url;200===parseInt(a)?location.assign(c):wpdiscuzAjaxObj.setCommentMessage(i,"error")}catch(e){console.log(e)}t(n,0)}(s,a)}),""}function t(e,s){1===s?e.find(".wpdiscuz-social-login-spinner").show():e.find(".wpdiscuz-social-login-spinner").hide()}e(document).delegate("#wpdcom .wpd-social-login .wpdiscuz-login-button","click",function(){var s=e(this).parents(".wpd-social-login");!function(e,s){1!=parseInt(wpdiscuzAjaxObj.socialLoginAgreementCheckbox)||1==Cookies.get("socialLoginAgreementConfirmed")?o(e,s):s.parents(".wpd-form-wrap, .wpd-form").find(".wpd-social-login-agreement").first().slideDown(700)}(n=function(e){var s="";e.hasClass("wpdsn-fb")&&(s="facebook");e.hasClass("wpdsn-insta")&&(s="instagram");e.hasClass("wpdsn-gg")&&(s="google");e.hasClass("wpdsn-ds")&&(s="disqus");e.hasClass("wpdsn-wp")&&(s="wordpress");e.hasClass("wpdsn-tw")&&(s="twitter");e.hasClass("wpdsn-vk")&&(s="vk");e.hasClass("wpdsn-ok")&&(s="ok");e.hasClass("wpdsn-linked")&&(s="linkedin");e.hasClass("wpdsn-yandex")&&(s="yandex");e.hasClass("wpdsn-mailru")&&(s="mailru");e.hasClass("wpdsn-weixin")&&(s="wechat");e.hasClass("wpdsn-weibo")&&(s="weibo");e.hasClass("wpdsn-qq")&&(s="qq");e.hasClass("wpdsn-baidu")&&(s="baidu");return s}(e(this)),s)}),e(document).delegate("#wpdcom .wpd-agreement-buttons-right .wpd-agreement-button","click",function(){var s=e(this).parents(".wpd-form-wrap, .wpd-form").find(".wpd-social-login-agreement").slideUp(700);e(this).hasClass("wpd-agreement-button-agree")&&(wpdiscuzAjaxObj.isCookiesEnabled&&Cookies.set("socialLoginAgreementConfirmed",1,{expires:30,path:"/"}),o(n,s))})});
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){"use strict";var n=[],r=e.document,i=Object.getPrototypeOf,o=n.slice,a=n.concat,s=n.push,u=n.indexOf,l={},c=l.toString,f=l.hasOwnProperty,p=f.toString,d=p.call(Object),h={},g=function e(t){return"function"==typeof t&&"number"!=typeof t.nodeType},y=function e(t){return null!=t&&t===t.window},v={type:!0,src:!0,noModule:!0};function m(e,t,n){var i,o=(t=t||r).createElement("script");if(o.text=e,n)for(i in v)n[i]&&(o[i]=n[i]);t.head.appendChild(o).parentNode.removeChild(o)}function x(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[c.call(e)]||"object":typeof e}var b="3.3.1",w=function(e,t){return new w.fn.init(e,t)},T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;w.fn=w.prototype={jquery:"3.3.1",constructor:w,length:0,toArray:function(){return o.call(this)},get:function(e){return null==e?o.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=w.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return w.each(this,e)},map:function(e){return this.pushStack(w.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(o.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:n.sort,splice:n.splice},w.extend=w.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||g(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)n=a[t],a!==(r=e[t])&&(l&&r&&(w.isPlainObject(r)||(i=Array.isArray(r)))?(i?(i=!1,o=n&&Array.isArray(n)?n:[]):o=n&&w.isPlainObject(n)?n:{},a[t]=w.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},w.extend({expando:"jQuery"+("3.3.1"+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==c.call(e))&&(!(t=i(e))||"function"==typeof(n=f.call(t,"constructor")&&t.constructor)&&p.call(n)===d)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e){m(e)},each:function(e,t){var n,r=0;if(C(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(C(Object(e))?w.merge(n,"string"==typeof e?[e]:e):s.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:u.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)(r=!t(e[o],o))!==s&&i.push(e[o]);return i},map:function(e,t,n){var r,i,o=0,s=[];if(C(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&s.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&s.push(i);return a.apply([],s)},guid:1,support:h}),"function"==typeof Symbol&&(w.fn[Symbol.iterator]=n[Symbol.iterator]),w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function C(e){var t=!!e&&"length"in e&&e.length,n=x(e);return!g(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}var E=function(e){var t,n,r,i,o,a,s,u,l,c,f,p,d,h,g,y,v,m,x,b="sizzle"+1*new Date,w=e.document,T=0,C=0,E=ae(),k=ae(),S=ae(),D=function(e,t){return e===t&&(f=!0),0},N={}.hasOwnProperty,A=[],j=A.pop,q=A.push,L=A.push,H=A.slice,O=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},P="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",I="\\["+M+"*("+R+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+R+"))|)"+M+"*\\]",W=":("+R+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+I+")*)|.*)\\)|)",$=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),F=new RegExp("^"+M+"*,"+M+"*"),_=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),z=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),X=new RegExp(W),U=new RegExp("^"+R+"$"),V={ID:new RegExp("^#("+R+")"),CLASS:new RegExp("^\\.("+R+")"),TAG:new RegExp("^("+R+"|[*])"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+W),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+P+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},G=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Q=/^[^{]+\{\s*\[native \w/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,K=/[+~]/,Z=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ee=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},te=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ne=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},re=function(){p()},ie=me(function(e){return!0===e.disabled&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{L.apply(A=H.call(w.childNodes),w.childNodes),A[w.childNodes.length].nodeType}catch(e){L={apply:A.length?function(e,t){q.apply(e,H.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function oe(e,t,r,i){var o,s,l,c,f,h,v,m=t&&t.ownerDocument,T=t?t.nodeType:9;if(r=r||[],"string"!=typeof e||!e||1!==T&&9!==T&&11!==T)return r;if(!i&&((t?t.ownerDocument||t:w)!==d&&p(t),t=t||d,g)){if(11!==T&&(f=J.exec(e)))if(o=f[1]){if(9===T){if(!(l=t.getElementById(o)))return r;if(l.id===o)return r.push(l),r}else if(m&&(l=m.getElementById(o))&&x(t,l)&&l.id===o)return r.push(l),r}else{if(f[2])return L.apply(r,t.getElementsByTagName(e)),r;if((o=f[3])&&n.getElementsByClassName&&t.getElementsByClassName)return L.apply(r,t.getElementsByClassName(o)),r}if(n.qsa&&!S[e+" "]&&(!y||!y.test(e))){if(1!==T)m=t,v=e;else if("object"!==t.nodeName.toLowerCase()){(c=t.getAttribute("id"))?c=c.replace(te,ne):t.setAttribute("id",c=b),s=(h=a(e)).length;while(s--)h[s]="#"+c+" "+ve(h[s]);v=h.join(","),m=K.test(e)&&ge(t.parentNode)||t}if(v)try{return L.apply(r,m.querySelectorAll(v)),r}catch(e){}finally{c===b&&t.removeAttribute("id")}}}return u(e.replace(B,"$1"),t,r,i)}function ae(){var e=[];function t(n,i){return e.push(n+" ")>r.cacheLength&&delete t[e.shift()],t[n+" "]=i}return t}function se(e){return e[b]=!0,e}function ue(e){var t=d.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function le(e,t){var n=e.split("|"),i=n.length;while(i--)r.attrHandle[n[i]]=t}function ce(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function fe(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function pe(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function de(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&ie(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function he(e){return se(function(t){return t=+t,se(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function ge(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}n=oe.support={},o=oe.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},p=oe.setDocument=function(e){var t,i,a=e?e.ownerDocument||e:w;return a!==d&&9===a.nodeType&&a.documentElement?(d=a,h=d.documentElement,g=!o(d),w!==d&&(i=d.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener("unload",re,!1):i.attachEvent&&i.attachEvent("onunload",re)),n.attributes=ue(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ue(function(e){return e.appendChild(d.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=Q.test(d.getElementsByClassName),n.getById=ue(function(e){return h.appendChild(e).id=b,!d.getElementsByName||!d.getElementsByName(b).length}),n.getById?(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){return e.getAttribute("id")===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),r.find.TAG=n.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},r.find.CLASS=n.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&g)return t.getElementsByClassName(e)},v=[],y=[],(n.qsa=Q.test(d.querySelectorAll))&&(ue(function(e){h.appendChild(e).innerHTML="<a id='"+b+"'></a><select id='"+b+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&y.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||y.push("\\["+M+"*(?:value|"+P+")"),e.querySelectorAll("[id~="+b+"-]").length||y.push("~="),e.querySelectorAll(":checked").length||y.push(":checked"),e.querySelectorAll("a#"+b+"+*").length||y.push(".#.+[+~]")}),ue(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=d.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&y.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&y.push(":enabled",":disabled"),h.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&y.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),y.push(",.*:")})),(n.matchesSelector=Q.test(m=h.matches||h.webkitMatchesSelector||h.mozMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&ue(function(e){n.disconnectedMatch=m.call(e,"*"),m.call(e,"[s!='']:x"),v.push("!=",W)}),y=y.length&&new RegExp(y.join("|")),v=v.length&&new RegExp(v.join("|")),t=Q.test(h.compareDocumentPosition),x=t||Q.test(h.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return f=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(1&(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===r?e===d||e.ownerDocument===w&&x(w,e)?-1:t===d||t.ownerDocument===w&&x(w,t)?1:c?O(c,e)-O(c,t):0:4&r?-1:1)}:function(e,t){if(e===t)return f=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===d?-1:t===d?1:i?-1:o?1:c?O(c,e)-O(c,t):0;if(i===o)return ce(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?ce(a[r],s[r]):a[r]===w?-1:s[r]===w?1:0},d):d},oe.matches=function(e,t){return oe(e,null,null,t)},oe.matchesSelector=function(e,t){if((e.ownerDocument||e)!==d&&p(e),t=t.replace(z,"='$1']"),n.matchesSelector&&g&&!S[t+" "]&&(!v||!v.test(t))&&(!y||!y.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return oe(t,d,null,[e]).length>0},oe.contains=function(e,t){return(e.ownerDocument||e)!==d&&p(e),x(e,t)},oe.attr=function(e,t){(e.ownerDocument||e)!==d&&p(e);var i=r.attrHandle[t.toLowerCase()],o=i&&N.call(r.attrHandle,t.toLowerCase())?i(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},oe.escape=function(e){return(e+"").replace(te,ne)},oe.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},oe.uniqueSort=function(e){var t,r=[],i=0,o=0;if(f=!n.detectDuplicates,c=!n.sortStable&&e.slice(0),e.sort(D),f){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return c=null,e},i=oe.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e)}else if(3===o||4===o)return e.nodeValue}else while(t=e[r++])n+=i(t);return n},(r=oe.selectors={cacheLength:50,createPseudo:se,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Z,ee),e[3]=(e[3]||e[4]||e[5]||"").replace(Z,ee),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||oe.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&oe.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return V.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=a(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Z,ee).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=E[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&E(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=oe.attr(r,e);return null==i?"!="===t:!t||(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i.replace($," ")+" ").indexOf(n)>-1:"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",y=t.parentNode,v=s&&t.nodeName.toLowerCase(),m=!u&&!s,x=!1;if(y){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===v:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?y.firstChild:y.lastChild],a&&m){x=(d=(l=(c=(f=(p=y)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1])&&l[2],p=d&&y.childNodes[d];while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if(1===p.nodeType&&++x&&p===t){c[e]=[T,d,x];break}}else if(m&&(x=d=(l=(c=(f=(p=t)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1]),!1===x)while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===v:1===p.nodeType)&&++x&&(m&&((c=(f=p[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]=[T,x]),p===t))break;return(x-=i)===r||x%r==0&&x/r>=0}}},PSEUDO:function(e,t){var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||oe.error("unsupported pseudo: "+e);return i[b]?i(t):i.length>1?(n=[e,e,"",t],r.setFilters.hasOwnProperty(e.toLowerCase())?se(function(e,n){var r,o=i(e,t),a=o.length;while(a--)e[r=O(e,o[a])]=!(n[r]=o[a])}):function(e){return i(e,0,n)}):i}},pseudos:{not:se(function(e){var t=[],n=[],r=s(e.replace(B,"$1"));return r[b]?se(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}}),has:se(function(e){return function(t){return oe(e,t).length>0}}),contains:se(function(e){return e=e.replace(Z,ee),function(t){return(t.textContent||t.innerText||i(t)).indexOf(e)>-1}}),lang:se(function(e){return U.test(e||"")||oe.error("unsupported lang: "+e),e=e.replace(Z,ee).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===h},focus:function(e){return e===d.activeElement&&(!d.hasFocus||d.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:de(!1),disabled:de(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!r.pseudos.empty(e)},header:function(e){return Y.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:he(function(){return[0]}),last:he(function(e,t){return[t-1]}),eq:he(function(e,t,n){return[n<0?n+t:n]}),even:he(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:he(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:he(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:he(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=r.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=fe(t);for(t in{submit:!0,reset:!0})r.pseudos[t]=pe(t);function ye(){}ye.prototype=r.filters=r.pseudos,r.setFilters=new ye,a=oe.tokenize=function(e,t){var n,i,o,a,s,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=r.preFilter;while(s){n&&!(i=F.exec(s))||(i&&(s=s.slice(i[0].length)||s),u.push(o=[])),n=!1,(i=_.exec(s))&&(n=i.shift(),o.push({value:n,type:i[0].replace(B," ")}),s=s.slice(n.length));for(a in r.filter)!(i=V[a].exec(s))||l[a]&&!(i=l[a](i))||(n=i.shift(),o.push({value:n,type:a,matches:i}),s=s.slice(n.length));if(!n)break}return t?s.length:s?oe.error(e):k(e,u).slice(0)};function ve(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function me(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&"parentNode"===o,s=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,u){var l,c,f,p=[T,s];if(u){while(t=t[r])if((1===t.nodeType||a)&&e(t,n,u))return!0}else while(t=t[r])if(1===t.nodeType||a)if(f=t[b]||(t[b]={}),c=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((l=c[o])&&l[0]===T&&l[1]===s)return p[2]=l[2];if(c[o]=p,p[2]=e(t,n,u))return!0}return!1}}function xe(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function be(e,t,n){for(var r=0,i=t.length;r<i;r++)oe(e,t[r],n);return n}function we(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Te(e,t,n,r,i,o){return r&&!r[b]&&(r=Te(r)),i&&!i[b]&&(i=Te(i,o)),se(function(o,a,s,u){var l,c,f,p=[],d=[],h=a.length,g=o||be(t||"*",s.nodeType?[s]:s,[]),y=!e||!o&&t?g:we(g,p,e,s,u),v=n?i||(o?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r){l=we(v,d),r(l,[],s,u),c=l.length;while(c--)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f))}if(o){if(i||e){if(i){l=[],c=v.length;while(c--)(f=v[c])&&l.push(y[c]=f);i(null,v=[],l,u)}c=v.length;while(c--)(f=v[c])&&(l=i?O(o,f):p[c])>-1&&(o[l]=!(a[l]=f))}}else v=we(v===a?v.splice(h,v.length):v),i?i(null,a,v,u):L.apply(a,v)})}function Ce(e){for(var t,n,i,o=e.length,a=r.relative[e[0].type],s=a||r.relative[" "],u=a?1:0,c=me(function(e){return e===t},s,!0),f=me(function(e){return O(t,e)>-1},s,!0),p=[function(e,n,r){var i=!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):f(e,n,r));return t=null,i}];u<o;u++)if(n=r.relative[e[u].type])p=[me(xe(p),n)];else{if((n=r.filter[e[u].type].apply(null,e[u].matches))[b]){for(i=++u;i<o;i++)if(r.relative[e[i].type])break;return Te(u>1&&xe(p),u>1&&ve(e.slice(0,u-1).concat({value:" "===e[u-2].type?"*":""})).replace(B,"$1"),n,u<i&&Ce(e.slice(u,i)),i<o&&Ce(e=e.slice(i)),i<o&&ve(e))}p.push(n)}return xe(p)}function Ee(e,t){var n=t.length>0,i=e.length>0,o=function(o,a,s,u,c){var f,h,y,v=0,m="0",x=o&&[],b=[],w=l,C=o||i&&r.find.TAG("*",c),E=T+=null==w?1:Math.random()||.1,k=C.length;for(c&&(l=a===d||a||c);m!==k&&null!=(f=C[m]);m++){if(i&&f){h=0,a||f.ownerDocument===d||(p(f),s=!g);while(y=e[h++])if(y(f,a||d,s)){u.push(f);break}c&&(T=E)}n&&((f=!y&&f)&&v--,o&&x.push(f))}if(v+=m,n&&m!==v){h=0;while(y=t[h++])y(x,b,a,s);if(o){if(v>0)while(m--)x[m]||b[m]||(b[m]=j.call(u));b=we(b)}L.apply(u,b),c&&!o&&b.length>0&&v+t.length>1&&oe.uniqueSort(u)}return c&&(T=E,l=w),x};return n?se(o):o}return s=oe.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=a(e)),n=t.length;while(n--)(o=Ce(t[n]))[b]?r.push(o):i.push(o);(o=S(e,Ee(i,r))).selector=e}return o},u=oe.select=function(e,t,n,i){var o,u,l,c,f,p="function"==typeof e&&e,d=!i&&a(e=p.selector||e);if(n=n||[],1===d.length){if((u=d[0]=d[0].slice(0)).length>2&&"ID"===(l=u[0]).type&&9===t.nodeType&&g&&r.relative[u[1].type]){if(!(t=(r.find.ID(l.matches[0].replace(Z,ee),t)||[])[0]))return n;p&&(t=t.parentNode),e=e.slice(u.shift().value.length)}o=V.needsContext.test(e)?0:u.length;while(o--){if(l=u[o],r.relative[c=l.type])break;if((f=r.find[c])&&(i=f(l.matches[0].replace(Z,ee),K.test(u[0].type)&&ge(t.parentNode)||t))){if(u.splice(o,1),!(e=i.length&&ve(u)))return L.apply(n,i),n;break}}}return(p||s(e,d))(i,t,!g,n,!t||K.test(e)&&ge(t.parentNode)||t),n},n.sortStable=b.split("").sort(D).join("")===b,n.detectDuplicates=!!f,p(),n.sortDetached=ue(function(e){return 1&e.compareDocumentPosition(d.createElement("fieldset"))}),ue(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||le("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ue(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||le("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ue(function(e){return null==e.getAttribute("disabled")})||le(P,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),oe}(e);w.find=E,w.expr=E.selectors,w.expr[":"]=w.expr.pseudos,w.uniqueSort=w.unique=E.uniqueSort,w.text=E.getText,w.isXMLDoc=E.isXML,w.contains=E.contains,w.escapeSelector=E.escape;var k=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&w(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},D=w.expr.match.needsContext;function N(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var A=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,t,n){return g(t)?w.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?w.grep(e,function(e){return e===t!==n}):"string"!=typeof t?w.grep(e,function(e){return u.call(t,e)>-1!==n}):w.filter(t,e,n)}w.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?w.find.matchesSelector(r,e)?[r]:[]:w.find.matches(e,w.grep(t,function(e){return 1===e.nodeType}))},w.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(w(e).filter(function(){for(t=0;t<r;t++)if(w.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)w.find(e,i[t],n);return r>1?w.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&D.test(e)?w(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(w.fn.init=function(e,t,n){var i,o;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(i="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:L.exec(e))||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(i[1]){if(t=t instanceof w?t[0]:t,w.merge(this,w.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:r,!0)),A.test(i[1])&&w.isPlainObject(t))for(i in t)g(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}return(o=r.getElementById(i[2]))&&(this[0]=o,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):g(e)?void 0!==n.ready?n.ready(e):e(w):w.makeArray(e,this)}).prototype=w.fn,q=w(r);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};w.fn.extend({has:function(e){var t=w(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(w.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&w(e);if(!D.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&w.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?w.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?u.call(w(e),this[0]):u.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(w.uniqueSort(w.merge(this.get(),w(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}w.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return k(e,"parentNode")},parentsUntil:function(e,t,n){return k(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return k(e,"nextSibling")},prevAll:function(e){return k(e,"previousSibling")},nextUntil:function(e,t,n){return k(e,"nextSibling",n)},prevUntil:function(e,t,n){return k(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return N(e,"iframe")?e.contentDocument:(N(e,"template")&&(e=e.content||e),w.merge([],e.childNodes))}},function(e,t){w.fn[e]=function(n,r){var i=w.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=w.filter(r,i)),this.length>1&&(O[e]||w.uniqueSort(i),H.test(e)&&i.reverse()),this.pushStack(i)}});var M=/[^\x20\t\r\n\f]+/g;function R(e){var t={};return w.each(e.match(M)||[],function(e,n){t[n]=!0}),t}w.Callbacks=function(e){e="string"==typeof e?R(e):w.extend({},e);var t,n,r,i,o=[],a=[],s=-1,u=function(){for(i=i||e.once,r=t=!0;a.length;s=-1){n=a.shift();while(++s<o.length)!1===o[s].apply(n[0],n[1])&&e.stopOnFalse&&(s=o.length,n=!1)}e.memory||(n=!1),t=!1,i&&(o=n?[]:"")},l={add:function(){return o&&(n&&!t&&(s=o.length-1,a.push(n)),function t(n){w.each(n,function(n,r){g(r)?e.unique&&l.has(r)||o.push(r):r&&r.length&&"string"!==x(r)&&t(r)})}(arguments),n&&!t&&u()),this},remove:function(){return w.each(arguments,function(e,t){var n;while((n=w.inArray(t,o,n))>-1)o.splice(n,1),n<=s&&s--}),this},has:function(e){return e?w.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return i=a=[],o=n="",this},disabled:function(){return!o},lock:function(){return i=a=[],n||t||(o=n=""),this},locked:function(){return!!i},fireWith:function(e,n){return i||(n=[e,(n=n||[]).slice?n.slice():n],a.push(n),t||u()),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!r}};return l};function I(e){return e}function W(e){throw e}function $(e,t,n,r){var i;try{e&&g(i=e.promise)?i.call(e).done(t).fail(n):e&&g(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}w.extend({Deferred:function(t){var n=[["notify","progress",w.Callbacks("memory"),w.Callbacks("memory"),2],["resolve","done",w.Callbacks("once memory"),w.Callbacks("once memory"),0,"resolved"],["reject","fail",w.Callbacks("once memory"),w.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},"catch":function(e){return i.then(null,e)},pipe:function(){var e=arguments;return w.Deferred(function(t){w.each(n,function(n,r){var i=g(e[r[4]])&&e[r[4]];o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&g(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(t,r,i){var o=0;function a(t,n,r,i){return function(){var s=this,u=arguments,l=function(){var e,l;if(!(t<o)){if((e=r.apply(s,u))===n.promise())throw new TypeError("Thenable self-resolution");l=e&&("object"==typeof e||"function"==typeof e)&&e.then,g(l)?i?l.call(e,a(o,n,I,i),a(o,n,W,i)):(o++,l.call(e,a(o,n,I,i),a(o,n,W,i),a(o,n,I,n.notifyWith))):(r!==I&&(s=void 0,u=[e]),(i||n.resolveWith)(s,u))}},c=i?l:function(){try{l()}catch(e){w.Deferred.exceptionHook&&w.Deferred.exceptionHook(e,c.stackTrace),t+1>=o&&(r!==W&&(s=void 0,u=[e]),n.rejectWith(s,u))}};t?c():(w.Deferred.getStackHook&&(c.stackTrace=w.Deferred.getStackHook()),e.setTimeout(c))}}return w.Deferred(function(e){n[0][3].add(a(0,e,g(i)?i:I,e.notifyWith)),n[1][3].add(a(0,e,g(t)?t:I)),n[2][3].add(a(0,e,g(r)?r:W))}).promise()},promise:function(e){return null!=e?w.extend(e,i):i}},o={};return w.each(n,function(e,t){var a=t[2],s=t[5];i[t[1]]=a.add,s&&a.add(function(){r=s},n[3-e][2].disable,n[3-e][3].disable,n[0][2].lock,n[0][3].lock),a.add(t[3].fire),o[t[0]]=function(){return o[t[0]+"With"](this===o?void 0:this,arguments),this},o[t[0]+"With"]=a.fireWith}),i.promise(o),t&&t.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=o.call(arguments),a=w.Deferred(),s=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?o.call(arguments):n,--t||a.resolveWith(r,i)}};if(t<=1&&($(e,a.done(s(n)).resolve,a.reject,!t),"pending"===a.state()||g(i[n]&&i[n].then)))return a.then();while(n--)$(i[n],s(n),a.reject);return a.promise()}});var B=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook=function(t,n){e.console&&e.console.warn&&t&&B.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,n)},w.readyException=function(t){e.setTimeout(function(){throw t})};var F=w.Deferred();w.fn.ready=function(e){return F.then(e)["catch"](function(e){w.readyException(e)}),this},w.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--w.readyWait:w.isReady)||(w.isReady=!0,!0!==e&&--w.readyWait>0||F.resolveWith(r,[w]))}}),w.ready.then=F.then;function _(){r.removeEventListener("DOMContentLoaded",_),e.removeEventListener("load",_),w.ready()}"complete"===r.readyState||"loading"!==r.readyState&&!r.documentElement.doScroll?e.setTimeout(w.ready):(r.addEventListener("DOMContentLoaded",_),e.addEventListener("load",_));var z=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===x(n)){i=!0;for(s in n)z(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,g(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(w(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},X=/^-ms-/,U=/-([a-z])/g;function V(e,t){return t.toUpperCase()}function G(e){return e.replace(X,"ms-").replace(U,V)}var Y=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Q(){this.expando=w.expando+Q.uid++}Q.uid=1,Q.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Y(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[G(t)]=n;else for(r in t)i[G(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][G(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(G):(t=G(t))in r?[t]:t.match(M)||[]).length;while(n--)delete r[t[n]]}(void 0===t||w.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!w.isEmptyObject(t)}};var J=new Q,K=new Q,Z=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ee=/[A-Z]/g;function te(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:Z.test(e)?JSON.parse(e):e)}function ne(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(ee,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n=te(n)}catch(e){}K.set(e,t,n)}else n=void 0;return n}w.extend({hasData:function(e){return K.hasData(e)||J.hasData(e)},data:function(e,t,n){return K.access(e,t,n)},removeData:function(e,t){K.remove(e,t)},_data:function(e,t,n){return J.access(e,t,n)},_removeData:function(e,t){J.remove(e,t)}}),w.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=K.get(o),1===o.nodeType&&!J.get(o,"hasDataAttrs"))){n=a.length;while(n--)a[n]&&0===(r=a[n].name).indexOf("data-")&&(r=G(r.slice(5)),ne(o,r,i[r]));J.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){K.set(this,e)}):z(this,function(t){var n;if(o&&void 0===t){if(void 0!==(n=K.get(o,e)))return n;if(void 0!==(n=ne(o,e)))return n}else this.each(function(){K.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){K.remove(this,e)})}}),w.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=J.get(e,t),n&&(!r||Array.isArray(n)?r=J.access(e,t,w.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=w.queue(e,t),r=n.length,i=n.shift(),o=w._queueHooks(e,t),a=function(){w.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return J.get(e,n)||J.access(e,n,{empty:w.Callbacks("once memory").add(function(){J.remove(e,[t+"queue",n])})})}}),w.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?w.queue(this[0],e):void 0===t?this:this.each(function(){var n=w.queue(this,e,t);w._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&w.dequeue(this,e)})},dequeue:function(e){return this.each(function(){w.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=w.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=J.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var re=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ie=new RegExp("^(?:([+-])=|)("+re+")([a-z%]*)$","i"),oe=["Top","Right","Bottom","Left"],ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&w.contains(e.ownerDocument,e)&&"none"===w.css(e,"display")},se=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i};function ue(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return w.css(e,t,"")},u=s(),l=n&&n[3]||(w.cssNumber[t]?"":"px"),c=(w.cssNumber[t]||"px"!==l&&+u)&&ie.exec(w.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)w.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,w.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var le={};function ce(e){var t,n=e.ownerDocument,r=e.nodeName,i=le[r];return i||(t=n.body.appendChild(n.createElement(r)),i=w.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),le[r]=i,i)}function fe(e,t){for(var n,r,i=[],o=0,a=e.length;o<a;o++)(r=e[o]).style&&(n=r.style.display,t?("none"===n&&(i[o]=J.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&ae(r)&&(i[o]=ce(r))):"none"!==n&&(i[o]="none",J.set(r,"display",n)));for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}w.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?w(this).show():w(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;function ye(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&N(e,t)?w.merge([e],n):n}function ve(e,t){for(var n=0,r=e.length;n<r;n++)J.set(e[n],"globalEval",!t||J.get(t[n],"globalEval"))}var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===x(o))w.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+w.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;w.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&w.inArray(o,r)>-1)i&&i.push(o);else if(l=w.contains(o.ownerDocument,o),a=ye(f.appendChild(o),"script"),l&&ve(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}!function(){var e=r.createDocumentFragment().appendChild(r.createElement("div")),t=r.createElement("input");t.setAttribute("type","radio"),t.setAttribute("checked","checked"),t.setAttribute("name","t"),e.appendChild(t),h.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML="<textarea>x</textarea>",h.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}();var be=r.documentElement,we=/^key/,Te=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ce=/^([^.]*)(?:\.(.+)|)/;function Ee(){return!0}function ke(){return!1}function Se(){try{return r.activeElement}catch(e){}}function De(e,t,n,r,i,o){var a,s;if("object"==typeof t){"string"!=typeof n&&(r=r||n,n=void 0);for(s in t)De(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=ke;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return w().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=w.guid++)),e.each(function(){w.event.add(this,t,i,r,n)})}w.event={global:{},add:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.get(e);if(y){n.handler&&(n=(o=n).handler,i=o.selector),i&&w.find.matchesSelector(be,i),n.guid||(n.guid=w.guid++),(u=y.events)||(u=y.events={}),(a=y.handle)||(a=y.handle=function(t){return"undefined"!=typeof w&&w.event.triggered!==t.type?w.event.dispatch.apply(e,arguments):void 0}),l=(t=(t||"").match(M)||[""]).length;while(l--)d=g=(s=Ce.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=w.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=w.event.special[d]||{},c=w.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&w.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,r,h,a)||e.addEventListener&&e.addEventListener(d,a)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),w.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.hasData(e)&&J.get(e);if(y&&(u=y.events)){l=(t=(t||"").match(M)||[""]).length;while(l--)if(s=Ce.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){f=w.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,y.handle)||w.removeEvent(e,d,y.handle),delete u[d])}else for(d in u)w.event.remove(e,d+t[l],n,r,!0);w.isEmptyObject(u)&&J.remove(e,"handle events")}},dispatch:function(e){var t=w.event.fix(e),n,r,i,o,a,s,u=new Array(arguments.length),l=(J.get(this,"events")||{})[t.type]||[],c=w.event.special[t.type]||{};for(u[0]=t,n=1;n<arguments.length;n++)u[n]=arguments[n];if(t.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,t)){s=w.event.handlers.call(this,t,l),n=0;while((o=s[n++])&&!t.isPropagationStopped()){t.currentTarget=o.elem,r=0;while((a=o.handlers[r++])&&!t.isImmediatePropagationStopped())t.rnamespace&&!t.rnamespace.test(a.namespace)||(t.handleObj=a,t.data=a.data,void 0!==(i=((w.event.special[a.origType]||{}).handle||a.handler).apply(o.elem,u))&&!1===(t.result=i)&&(t.preventDefault(),t.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,t),t.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&e.button>=1))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?w(i,this).index(l)>-1:w.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(e,t){Object.defineProperty(w.Event.prototype,e,{enumerable:!0,configurable:!0,get:g(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[w.expando]?e:new w.Event(e)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==Se()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===Se()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&N(this,"input"))return this.click(),!1},_default:function(e){return N(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},w.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},w.Event=function(e,t){if(!(this instanceof w.Event))return new w.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ee:ke,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&w.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[w.expando]=!0},w.Event.prototype={constructor:w.Event,isDefaultPrevented:ke,isPropagationStopped:ke,isImmediatePropagationStopped:ke,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ee,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ee,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ee,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},w.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&we.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Te.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},w.event.addProp),w.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){w.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return i&&(i===r||w.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),w.fn.extend({on:function(e,t,n,r){return De(this,e,t,n,r)},one:function(e,t,n,r){return De(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,w(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=ke),this.each(function(){w.event.remove(this,e,n,t)})}});var Ne=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Ae=/<script|<style|<link/i,je=/checked\s*(?:[^=]|=\s*.checked.)/i,qe=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Le(e,t){return N(e,"table")&&N(11!==t.nodeType?t:t.firstChild,"tr")?w(e).children("tbody")[0]||e:e}function He(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Oe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Pe(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(J.hasData(e)&&(o=J.access(e),a=J.set(t,o),l=o.events)){delete a.handle,a.events={};for(i in l)for(n=0,r=l[i].length;n<r;n++)w.event.add(t,i,l[i][n])}K.hasData(e)&&(s=K.access(e),u=w.extend({},s),K.set(t,u))}}function Me(e,t){var n=t.nodeName.toLowerCase();"input"===n&&pe.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function Re(e,t,n,r){t=a.apply([],t);var i,o,s,u,l,c,f=0,p=e.length,d=p-1,y=t[0],v=g(y);if(v||p>1&&"string"==typeof y&&!h.checkClone&&je.test(y))return e.each(function(i){var o=e.eq(i);v&&(t[0]=y.call(this,i,o.html())),Re(o,t,n,r)});if(p&&(i=xe(t,e[0].ownerDocument,!1,e,r),o=i.firstChild,1===i.childNodes.length&&(i=o),o||r)){for(u=(s=w.map(ye(i,"script"),He)).length;f<p;f++)l=i,f!==d&&(l=w.clone(l,!0,!0),u&&w.merge(s,ye(l,"script"))),n.call(e[f],l,f);if(u)for(c=s[s.length-1].ownerDocument,w.map(s,Oe),f=0;f<u;f++)l=s[f],he.test(l.type||"")&&!J.access(l,"globalEval")&&w.contains(c,l)&&(l.src&&"module"!==(l.type||"").toLowerCase()?w._evalUrl&&w._evalUrl(l.src):m(l.textContent.replace(qe,""),c,l))}return e}function Ie(e,t,n){for(var r,i=t?w.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||w.cleanData(ye(r)),r.parentNode&&(n&&w.contains(r.ownerDocument,r)&&ve(ye(r,"script")),r.parentNode.removeChild(r));return e}w.extend({htmlPrefilter:function(e){return e.replace(Ne,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s=e.cloneNode(!0),u=w.contains(e.ownerDocument,e);if(!(h.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||w.isXMLDoc(e)))for(a=ye(s),r=0,i=(o=ye(e)).length;r<i;r++)Me(o[r],a[r]);if(t)if(n)for(o=o||ye(e),a=a||ye(s),r=0,i=o.length;r<i;r++)Pe(o[r],a[r]);else Pe(e,s);return(a=ye(s,"script")).length>0&&ve(a,!u&&ye(e,"script")),s},cleanData:function(e){for(var t,n,r,i=w.event.special,o=0;void 0!==(n=e[o]);o++)if(Y(n)){if(t=n[J.expando]){if(t.events)for(r in t.events)i[r]?w.event.remove(n,r):w.removeEvent(n,r,t.handle);n[J.expando]=void 0}n[K.expando]&&(n[K.expando]=void 0)}}}),w.fn.extend({detach:function(e){return Ie(this,e,!0)},remove:function(e){return Ie(this,e)},text:function(e){return z(this,function(e){return void 0===e?w.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Re(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Le(this,e).appendChild(e)})},prepend:function(){return Re(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Le(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(w.cleanData(ye(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return w.clone(this,e,t)})},html:function(e){return z(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ae.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=w.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(w.cleanData(ye(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return Re(this,arguments,function(t){var n=this.parentNode;w.inArray(this,e)<0&&(w.cleanData(ye(this)),n&&n.replaceChild(t,this))},e)}}),w.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){w.fn[e]=function(e){for(var n,r=[],i=w(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),w(i[a])[t](n),s.apply(r,n.get());return this.pushStack(r)}});var We=new RegExp("^("+re+")(?!px)[a-z%]+$","i"),$e=function(t){var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)},Be=new RegExp(oe.join("|"),"i");!function(){function t(){if(c){l.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",c.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",be.appendChild(l).appendChild(c);var t=e.getComputedStyle(c);i="1%"!==t.top,u=12===n(t.marginLeft),c.style.right="60%",s=36===n(t.right),o=36===n(t.width),c.style.position="absolute",a=36===c.offsetWidth||"absolute",be.removeChild(l),c=null}}function n(e){return Math.round(parseFloat(e))}var i,o,a,s,u,l=r.createElement("div"),c=r.createElement("div");c.style&&(c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",h.clearCloneStyle="content-box"===c.style.backgroundClip,w.extend(h,{boxSizingReliable:function(){return t(),o},pixelBoxStyles:function(){return t(),s},pixelPosition:function(){return t(),i},reliableMarginLeft:function(){return t(),u},scrollboxSize:function(){return t(),a}}))}();function Fe(e,t,n){var r,i,o,a,s=e.style;return(n=n||$e(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||w.contains(e.ownerDocument,e)||(a=w.style(e,t)),!h.pixelBoxStyles()&&We.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function _e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}var ze=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Ue={position:"absolute",visibility:"hidden",display:"block"},Ve={letterSpacing:"0",fontWeight:"400"},Ge=["Webkit","Moz","ms"],Ye=r.createElement("div").style;function Qe(e){if(e in Ye)return e;var t=e[0].toUpperCase()+e.slice(1),n=Ge.length;while(n--)if((e=Ge[n]+t)in Ye)return e}function Je(e){var t=w.cssProps[e];return t||(t=w.cssProps[e]=Qe(e)||e),t}function Ke(e,t,n){var r=ie.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Ze(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=w.css(e,n+oe[a],!0,i)),r?("content"===n&&(u-=w.css(e,"padding"+oe[a],!0,i)),"margin"!==n&&(u-=w.css(e,"border"+oe[a]+"Width",!0,i))):(u+=w.css(e,"padding"+oe[a],!0,i),"padding"!==n?u+=w.css(e,"border"+oe[a]+"Width",!0,i):s+=w.css(e,"border"+oe[a]+"Width",!0,i));return!r&&o>=0&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))),u}function et(e,t,n){var r=$e(e),i=Fe(e,t,r),o="border-box"===w.css(e,"boxSizing",!1,r),a=o;if(We.test(i)){if(!n)return i;i="auto"}return a=a&&(h.boxSizingReliable()||i===e.style[t]),("auto"===i||!parseFloat(i)&&"inline"===w.css(e,"display",!1,r))&&(i=e["offset"+t[0].toUpperCase()+t.slice(1)],a=!0),(i=parseFloat(i)||0)+Ze(e,t,n||(o?"border":"content"),a,r,i)+"px"}w.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Fe(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=G(t),u=Xe.test(t),l=e.style;if(u||(t=Je(s)),a=w.cssHooks[t]||w.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"==(o=typeof n)&&(i=ie.exec(n))&&i[1]&&(n=ue(e,t,i),o="number"),null!=n&&n===n&&("number"===o&&(n+=i&&i[3]||(w.cssNumber[s]?"":"px")),h.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=G(t);return Xe.test(t)||(t=Je(s)),(a=w.cssHooks[t]||w.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Fe(e,t,r)),"normal"===i&&t in Ve&&(i=Ve[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),w.each(["height","width"],function(e,t){w.cssHooks[t]={get:function(e,n,r){if(n)return!ze.test(w.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?et(e,t,r):se(e,Ue,function(){return et(e,t,r)})},set:function(e,n,r){var i,o=$e(e),a="border-box"===w.css(e,"boxSizing",!1,o),s=r&&Ze(e,t,r,a,o);return a&&h.scrollboxSize()===o.position&&(s-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-Ze(e,t,"border",!1,o)-.5)),s&&(i=ie.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=w.css(e,t)),Ke(e,n,s)}}}),w.cssHooks.marginLeft=_e(h.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Fe(e,"marginLeft"))||e.getBoundingClientRect().left-se(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),w.each({margin:"",padding:"",border:"Width"},function(e,t){w.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+oe[r]+t]=o[r]||o[r-2]||o[0];return i}},"margin"!==e&&(w.cssHooks[e+t].set=Ke)}),w.fn.extend({css:function(e,t){return z(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=$e(e),i=t.length;a<i;a++)o[t[a]]=w.css(e,t[a],!1,r);return o}return void 0!==n?w.style(e,t,n):w.css(e,t)},e,t,arguments.length>1)}});function tt(e,t,n,r,i){return new tt.prototype.init(e,t,n,r,i)}w.Tween=tt,tt.prototype={constructor:tt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||w.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(w.cssNumber[n]?"":"px")},cur:function(){var e=tt.propHooks[this.prop];return e&&e.get?e.get(this):tt.propHooks._default.get(this)},run:function(e){var t,n=tt.propHooks[this.prop];return this.options.duration?this.pos=t=w.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):tt.propHooks._default.set(this),this}},tt.prototype.init.prototype=tt.prototype,tt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=w.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){w.fx.step[e.prop]?w.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[w.cssProps[e.prop]]&&!w.cssHooks[e.prop]?e.elem[e.prop]=e.now:w.style(e.elem,e.prop,e.now+e.unit)}}},tt.propHooks.scrollTop=tt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},w.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},w.fx=tt.prototype.init,w.fx.step={};var nt,rt,it=/^(?:toggle|show|hide)$/,ot=/queueHooks$/;function at(){rt&&(!1===r.hidden&&e.requestAnimationFrame?e.requestAnimationFrame(at):e.setTimeout(at,w.fx.interval),w.fx.tick())}function st(){return e.setTimeout(function(){nt=void 0}),nt=Date.now()}function ut(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=oe[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function lt(e,t,n){for(var r,i=(pt.tweeners[t]||[]).concat(pt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ct(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),y=J.get(e,"fxshow");n.queue||(null==(a=w._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,w.queue(e,"fx").length||a.empty.fire()})}));for(r in t)if(i=t[r],it.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!y||void 0===y[r])continue;g=!0}d[r]=y&&y[r]||w.style(e,r)}if((u=!w.isEmptyObject(t))||!w.isEmptyObject(d)){f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=y&&y.display)&&(l=J.get(e,"display")),"none"===(c=w.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=w.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===w.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1;for(r in d)u||(y?"hidden"in y&&(g=y.hidden):y=J.access(e,"fxshow",{display:l}),o&&(y.hidden=!g),g&&fe([e],!0),p.done(function(){g||fe([e]),J.remove(e,"fxshow");for(r in d)w.style(e,r,d[r])})),u=lt(g?y[r]:0,r,p),r in y||(y[r]=u.start,g&&(u.end=u.start,u.start=0))}}function ft(e,t){var n,r,i,o,a;for(n in e)if(r=G(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=w.cssHooks[r])&&"expand"in a){o=a.expand (o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function pt(e,t,n){var r,i,o=0,a=pt.prefilters.length,s=w.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=nt||st(),n=Math.max(0,l.startTime+l.duration-t),r=1-(n/l.duration||0),o=0,a=l.tweens.length;o<a;o++)l.tweens[o].run(r);return s.notifyWith(e,[l,r,n]),r<1&&a?n:(a||s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:w.extend({},t),opts:w.extend(!0,{specialEasing:{},easing:w.easing._default},n),originalProperties:t,originalOptions:n,startTime:nt||st(),duration:n.duration,tweens:[],createTween:function(t,n){var r=w.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)l.tweens[n].run(1);return t?(s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l,t])):s.rejectWith(e,[l,t]),this}}),c=l.props;for(ft(c,l.opts.specialEasing);o<a;o++)if(r=pt.prefilters[o].call(l,e,c,l.opts))return g(r.stop)&&(w._queueHooks(l.elem,l.opts.queue).stop=r.stop.bind(r)),r;return w.map(c,lt,l),g(l.opts.start)&&l.opts.start.call(e,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),w.fx.timer(w.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l}w.Animation=w.extend(pt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return ue(n.elem,e,ie.exec(t),n),n}]},tweener:function(e,t){g(e)?(t=e,e=["*"]):e=e.match(M);for(var n,r=0,i=e.length;r<i;r++)n=e[r],pt.tweeners[n]=pt.tweeners[n]||[],pt.tweeners[n].unshift(t)},prefilters:[ct],prefilter:function(e,t){t?pt.prefilters.unshift(e):pt.prefilters.push(e)}}),w.speed=function(e,t,n){var r=e&&"object"==typeof e?w.extend({},e):{complete:n||!n&&t||g(e)&&e,duration:e,easing:n&&t||t&&!g(t)&&t};return w.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in w.fx.speeds?r.duration=w.fx.speeds[r.duration]:r.duration=w.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){g(r.old)&&r.old.call(this),r.queue&&w.dequeue(this,r.queue)},r},w.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=w.isEmptyObject(e),o=w.speed(t,n,r),a=function(){var t=pt(this,w.extend({},e),o);(i||J.get(this,"finish"))&&t.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=w.timers,a=J.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&ot.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||w.dequeue(this,e)})},finish:function(e){return!1!==e&&(e=e||"fx"),this.each(function(){var t,n=J.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=w.timers,a=r?r.length:0;for(n.finish=!0,w.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),w.each(["toggle","show","hide"],function(e,t){var n=w.fn[t];w.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ut(t,!0),e,r,i)}}),w.each({slideDown:ut("show"),slideUp:ut("hide"),slideToggle:ut("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){w.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),w.timers=[],w.fx.tick=function(){var e,t=0,n=w.timers;for(nt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||w.fx.stop(),nt=void 0},w.fx.timer=function(e){w.timers.push(e),w.fx.start()},w.fx.interval=13,w.fx.start=function(){rt||(rt=!0,at())},w.fx.stop=function(){rt=null},w.fx.speeds={slow:600,fast:200,_default:400},w.fn.delay=function(t,n){return t=w.fx?w.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,r){var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}})},function(){var e=r.createElement("input"),t=r.createElement("select").appendChild(r.createElement("option"));e.type="checkbox",h.checkOn=""!==e.value,h.optSelected=t.selected,(e=r.createElement("input")).value="t",e.type="radio",h.radioValue="t"===e.value}();var dt,ht=w.expr.attrHandle;w.fn.extend({attr:function(e,t){return z(this,w.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){w.removeAttr(this,e)})}}),w.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?w.prop(e,t,n):(1===o&&w.isXMLDoc(e)||(i=w.attrHooks[t.toLowerCase()]||(w.expr.match.bool.test(t)?dt:void 0)),void 0!==n?null===n?void w.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=w.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!h.radioValue&&"radio"===t&&N(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(M);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),dt={set:function(e,t,n){return!1===t?w.removeAttr(e,n):e.setAttribute(n,n),n}},w.each(w.expr.match.bool.source.match(/\w+/g),function(e,t){var n=ht[t]||w.find.attr;ht[t]=function(e,t,r){var i,o,a=t.toLowerCase();return r||(o=ht[a],ht[a]=i,i=null!=n(e,t,r)?a:null,ht[a]=o),i}});var gt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;w.fn.extend({prop:function(e,t){return z(this,w.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[w.propFix[e]||e]})}}),w.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&w.isXMLDoc(e)||(t=w.propFix[t]||t,i=w.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=w.find.attr(e,"tabindex");return t?parseInt(t,10):gt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),h.optSelected||(w.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),w.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){w.propFix[this.toLowerCase()]=this});function vt(e){return(e.match(M)||[]).join(" ")}function mt(e){return e.getAttribute&&e.getAttribute("class")||""}function xt(e){return Array.isArray(e)?e:"string"==typeof e?e.match(M)||[]:[]}w.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).addClass(e.call(this,t,mt(this)))});if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).removeClass(e.call(this,t,mt(this)))});if(!arguments.length)return this.attr("class","");if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])while(r.indexOf(" "+o+" ")>-1)r=r.replace(" "+o+" "," ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(e,t){var n=typeof e,r="string"===n||Array.isArray(e);return"boolean"==typeof t&&r?t?this.addClass(e):this.removeClass(e):g(e)?this.each(function(n){w(this).toggleClass(e.call(this,n,mt(this),t),t)}):this.each(function(){var t,i,o,a;if(r){i=0,o=w(this),a=xt(e);while(t=a[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else void 0!==e&&"boolean"!==n||((t=mt(this))&&J.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":J.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&(" "+vt(mt(n))+" ").indexOf(t)>-1)return!0;return!1}});var bt=/\r/g;w.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=g(e),this.each(function(n){var i;1===this.nodeType&&(null==(i=r?e.call(this,n,w(this).val()):e)?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=w.map(i,function(e){return null==e?"":e+""})),(t=w.valHooks[this.type]||w.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return(t=w.valHooks[i.type]||w.valHooks[i.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:"string"==typeof(n=i.value)?n.replace(bt,""):null==n?"":n}}}),w.extend({valHooks:{option:{get:function(e){var t=w.find.attr(e,"value");return null!=t?t:vt(w.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!N(n.parentNode,"optgroup"))){if(t=w(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=w.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=w.inArray(w.valHooks.option.get(r),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),w.each(["radio","checkbox"],function(){w.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=w.inArray(w(e).val(),t)>-1}},h.checkOn||(w.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),h.focusin="onfocusin"in e;var wt=/^(?:focusinfocus|focusoutblur)$/,Tt=function(e){e.stopPropagation()};w.extend(w.event,{trigger:function(t,n,i,o){var a,s,u,l,c,p,d,h,v=[i||r],m=f.call(t,"type")?t.type:t,x=f.call(t,"namespace")?t.namespace.split("."):[];if(s=h=u=i=i||r,3!==i.nodeType&&8!==i.nodeType&&!wt.test(m+w.event.triggered)&&(m.indexOf(".")>-1&&(m=(x=m.split(".")).shift(),x.sort()),c=m.indexOf(":")<0&&"on"+m,t=t[w.expando]?t:new w.Event(m,"object"==typeof t&&t),t.isTrigger=o?2:3,t.namespace=x.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+x.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=i),n=null==n?[t]:w.makeArray(n,[t]),d=w.event.special[m]||{},o||!d.trigger||!1!==d.trigger.apply(i,n))){if(!o&&!d.noBubble&&!y(i)){for(l=d.delegateType||m,wt.test(l+m)||(s=s.parentNode);s;s=s.parentNode)v.push(s),u=s;u===(i.ownerDocument||r)&&v.push(u.defaultView||u.parentWindow||e)}a=0;while((s=v[a++])&&!t.isPropagationStopped())h=s,t.type=a>1?l:d.bindType||m,(p=(J.get(s,"events")||{})[t.type]&&J.get(s,"handle"))&&p.apply(s,n),(p=c&&s[c])&&p.apply&&Y(s)&&(t.result=p.apply(s,n),!1===t.result&&t.preventDefault());return t.type=m,o||t.isDefaultPrevented()||d._default&&!1!==d._default.apply(v.pop(),n)||!Y(i)||c&&g(i[m])&&!y(i)&&((u=i[c])&&(i[c]=null),w.event.triggered=m,t.isPropagationStopped()&&h.addEventListener(m,Tt),i[m](),t.isPropagationStopped()&&h.removeEventListener(m,Tt),w.event.triggered=void 0,u&&(i[c]=u)),t.result}},simulate:function(e,t,n){var r=w.extend(new w.Event,n,{type:e,isSimulated:!0});w.event.trigger(r,null,t)}}),w.fn.extend({trigger:function(e,t){return this.each(function(){w.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return w.event.trigger(e,t,n,!0)}}),h.focusin||w.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){w.event.simulate(t,e.target,w.event.fix(e))};w.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=J.access(r,t);i||r.addEventListener(e,n,!0),J.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=J.access(r,t)-1;i?J.access(r,t,i):(r.removeEventListener(e,n,!0),J.remove(r,t))}}});var Ct=e.location,Et=Date.now(),kt=/\?/;w.parseXML=function(t){var n;if(!t||"string"!=typeof t)return null;try{n=(new e.DOMParser).parseFromString(t,"text/xml")}catch(e){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||w.error("Invalid XML: "+t),n};var St=/\[\]$/,Dt=/\r?\n/g,Nt=/^(?:submit|button|image|reset|file)$/i,At=/^(?:input|select|textarea|keygen)/i;function jt(e,t,n,r){var i;if(Array.isArray(t))w.each(t,function(t,i){n||St.test(e)?r(e,i):jt(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)});else if(n||"object"!==x(t))r(e,t);else for(i in t)jt(e+"["+i+"]",t[i],n,r)}w.param=function(e,t){var n,r=[],i=function(e,t){var n=g(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(e)||e.jquery&&!w.isPlainObject(e))w.each(e,function(){i(this.name,this.value)});else for(n in e)jt(n,e[n],t,i);return r.join("&")},w.fn.extend({serialize:function(){return w.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=w.prop(this,"elements");return e?w.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!w(this).is(":disabled")&&At.test(this.nodeName)&&!Nt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=w(this).val();return null==n?null:Array.isArray(n)?w.map(n,function(e){return{name:t.name,value:e.replace(Dt,"\r\n")}}):{name:t.name,value:n.replace(Dt,"\r\n")}}).get()}});var qt=/%20/g,Lt=/#.*$/,Ht=/([?&])_=[^&]*/,Ot=/^(.*?):[ \t]*([^\r\n]*)$/gm,Pt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Mt=/^(?:GET|HEAD)$/,Rt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Bt=r.createElement("a");Bt.href=Ct.href;function Ft(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(M)||[];if(g(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function _t(e,t,n,r){var i={},o=e===Wt;function a(s){var u;return i[s]=!0,w.each(e[s]||[],function(e,s){var l=s(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):void 0:(t.dataTypes.unshift(l),a(l),!1)}),u}return a(t.dataTypes[0])||!i["*"]&&a("*")}function zt(e,t){var n,r,i=w.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&w.extend(!0,e,r),e}function Xt(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}function Ut(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}w.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ct.href,type:"GET",isLocal:Pt.test(Ct.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":w.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,w.ajaxSettings),t):zt(w.ajaxSettings,e)},ajaxPrefilter:Ft(It),ajaxTransport:Ft(Wt),ajax:function(t,n){"object"==typeof t&&(n=t,t=void 0),n=n||{};var i,o,a,s,u,l,c,f,p,d,h=w.ajaxSetup({},n),g=h.context||h,y=h.context&&(g.nodeType||g.jquery)?w(g):w.event,v=w.Deferred(),m=w.Callbacks("once memory"),x=h.statusCode||{},b={},T={},C="canceled",E={readyState:0,getResponseHeader:function(e){var t;if(c){if(!s){s={};while(t=Ot.exec(a))s[t[1].toLowerCase()]=t[2]}t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return c?a:null},setRequestHeader:function(e,t){return null==c&&(e=T[e.toLowerCase()]=T[e.toLowerCase()]||e,b[e]=t),this},overrideMimeType:function(e){return null==c&&(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(c)E.always(e[E.status]);else for(t in e)x[t]=[x[t],e[t]];return this},abort:function(e){var t=e||C;return i&&i.abort(t),k(0,t),this}};if(v.promise(E),h.url=((t||h.url||Ct.href)+"").replace(Rt,Ct.protocol+"//"),h.type=n.method||n.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(M)||[""],null==h.crossDomain){l=r.createElement("a");try{l.href=h.url,l.href=l.href,h.crossDomain=Bt.protocol+"//"+Bt.host!=l.protocol+"//"+l.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=w.param(h.data,h.traditional)),_t(It,h,n,E),c)return E;(f=w.event&&h.global)&&0==w.active++&&w.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Mt.test(h.type),o=h.url.replace(Lt,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(qt,"+")):(d=h.url.slice(o.length),h.data&&(h.processData||"string"==typeof h.data)&&(o+=(kt.test(o)?"&":"?")+h.data,delete h.data),!1===h.cache&&(o=o.replace(Ht,"$1"),d=(kt.test(o)?"&":"?")+"_="+Et+++d),h.url=o+d),h.ifModified&&(w.lastModified[o]&&E.setRequestHeader("If-Modified-Since",w.lastModified[o]),w.etag[o]&&E.setRequestHeader("If-None-Match",w.etag[o])),(h.data&&h.hasContent&&!1!==h.contentType||n.contentType)&&E.setRequestHeader("Content-Type",h.contentType),E.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+$t+"; q=0.01":""):h.accepts["*"]);for(p in h.headers)E.setRequestHeader(p,h.headers[p]);if(h.beforeSend&&(!1===h.beforeSend.call(g,E,h)||c))return E.abort();if(C="abort",m.add(h.complete),E.done(h.success),E.fail(h.error),i=_t(Wt,h,n,E)){if(E.readyState=1,f&&y.trigger("ajaxSend",[E,h]),c)return E;h.async&&h.timeout>0&&(u=e.setTimeout(function(){E.abort("timeout")},h.timeout));try{c=!1,i.send(b,k)}catch(e){if(c)throw e;k(-1,e)}}else k(-1,"No Transport");function k(t,n,r,s){var l,p,d,b,T,C=n;c||(c=!0,u&&e.clearTimeout(u),i=void 0,a=s||"",E.readyState=t>0?4:0,l=t>=200&&t<300||304===t,r&&(b=Xt(h,E,r)),b=Ut(h,b,E,l),l?(h.ifModified&&((T=E.getResponseHeader("Last-Modified"))&&(w.lastModified[o]=T),(T=E.getResponseHeader("etag"))&&(w.etag[o]=T)),204===t||"HEAD"===h.type?C="nocontent":304===t?C="notmodified":(C=b.state,p=b.data,l=!(d=b.error))):(d=C,!t&&C||(C="error",t<0&&(t=0))),E.status=t,E.statusText=(n||C)+"",l?v.resolveWith(g,[p,C,E]):v.rejectWith(g,[E,C,d]),E.statusCode(x),x=void 0,f&&y.trigger(l?"ajaxSuccess":"ajaxError",[E,h,l?p:d]),m.fireWith(g,[E,C]),f&&(y.trigger("ajaxComplete",[E,h]),--w.active||w.event.trigger("ajaxStop")))}return E},getJSON:function(e,t,n){return w.get(e,t,n,"json")},getScript:function(e,t){return w.get(e,void 0,t,"script")}}),w.each(["get","post"],function(e,t){w[t]=function(e,n,r,i){return g(n)&&(i=i||r,r=n,n=void 0),w.ajax(w.extend({url:e,type:t,dataType:i,data:n,success:r},w.isPlainObject(e)&&e))}}),w._evalUrl=function(e){return w.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},w.fn.extend({wrapAll:function(e){var t;return this[0]&&(g(e)&&(e=e.call(this[0])),t=w(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return g(e)?this.each(function(t){w(this).wrapInner(e.call(this,t))}):this.each(function(){var t=w(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=g(e);return this.each(function(n){w(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){w(this).replaceWith(this.childNodes)}),this}}),w.expr.pseudos.hidden=function(e){return!w.expr.pseudos.visible(e)},w.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},w.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(e){}};var Vt={0:200,1223:204},Gt=w.ajaxSettings.xhr();h.cors=!!Gt&&"withCredentials"in Gt,h.ajax=Gt=!!Gt,w.ajaxTransport(function(t){var n,r;if(h.cors||Gt&&!t.crossDomain)return{send:function(i,o){var a,s=t.xhr();if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(a in t.xhrFields)s[a]=t.xhrFields[a];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(a in i)s.setRequestHeader(a,i[a]);n=function(e){return function(){n&&(n=r=s.onload=s.onerror=s.onabort=s.ontimeout=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?"number"!=typeof s.status?o(0,"error"):o(s.status,s.statusText):o(Vt[s.status]||s.status,s.statusText,"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},s.onload=n(),r=s.onerror=s.ontimeout=n("error"),void 0!==s.onabort?s.onabort=r:s.onreadystatechange=function(){4===s.readyState&&e.setTimeout(function(){n&&r()})},n=n("abort");try{s.send(t.hasContent&&t.data||null)}catch(e){if(n)throw e}},abort:function(){n&&n()}}}),w.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),w.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return w.globalEval(e),e}}}),w.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),w.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(i,o){t=w("<script>").prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&o("error"===e.type?404:200,e.type)}),r.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Yt=[],Qt=/(=)\?(?=&|$)|\?\?/;w.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Yt.pop()||w.expando+"_"+Et++;return this[e]=!0,e}}),w.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,a,s=!1!==t.jsonp&&(Qt.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Qt.test(t.data)&&"data");if(s||"jsonp"===t.dataTypes[0])return i=t.jsonpCallback=g(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(Qt,"$1"+i):!1!==t.jsonp&&(t.url+=(kt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return a||w.error(i+" was not called"),a[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){a=arguments},r.always(function(){void 0===o?w(e).removeProp(i):e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,Yt.push(i)),a&&g(o)&&o(a[0]),a=o=void 0}),"script"}),h.createHTMLDocument=function(){var e=r.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),w.parseHTML=function(e,t,n){if("string"!=typeof e)return[];"boolean"==typeof t&&(n=t,t=!1);var i,o,a;return t||(h.createHTMLDocument?((i=(t=r.implementation.createHTMLDocument("")).createElement("base")).href=r.location.href,t.head.appendChild(i)):t=r),o=A.exec(e),a=!n&&[],o?[t.createElement(o[1])]:(o=xe([e],t,a),a&&a.length&&w(a).remove(),w.merge([],o.childNodes))},w.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return s>-1&&(r=vt(e.slice(s)),e=e.slice(0,s)),g(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),a.length>0&&w.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?w("<div>").append(w.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},w.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){w.fn[t]=function(e){return this.on(t,e)}}),w.expr.pseudos.animated=function(e){return w.grep(w.timers,function(t){return e===t.elem}).length},w.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l,c=w.css(e,"position"),f=w(e),p={};"static"===c&&(e.style.position="relative"),s=f.offset(),o=w.css(e,"top"),u=w.css(e,"left"),(l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1)?(a=(r=f.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),g(t)&&(t=t.call(e,n,w.extend({},s))),null!=t.top&&(p.top=t.top-s.top+a),null!=t.left&&(p.left=t.left-s.left+i),"using"in t?t.using.call(e,p):f.css(p)}},w.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){w.offset.setOffset(this,e,t)});var t,n,r=this[0];if(r)return r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===w.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===w.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=w(e).offset()).top+=w.css(e,"borderTopWidth",!0),i.left+=w.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-w.css(r,"marginTop",!0),left:t.left-i.left-w.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===w.css(e,"position"))e=e.offsetParent;return e||be})}}),w.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;w.fn[e]=function(r){return z(this,function(e,r,i){var o;if(y(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i)return o?o[t]:e[r];o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i},e,r,arguments.length)}}),w.each(["top","left"],function(e,t){w.cssHooks[t]=_e(h.pixelPosition,function(e,n){if(n)return n=Fe(e,t),We.test(n)?w(e).position()[t]+"px":n})}),w.each({Height:"height",Width:"width"},function(e,t){w.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){w.fn[r]=function(i,o){var a=arguments.length&&(n||"boolean"!=typeof i),s=n||(!0===i||!0===o?"margin":"border");return z(this,function(t,n,i){var o;return y(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?w.css(t,n,s):w.style(t,n,i,s)},t,a?i:void 0,a)}})}),w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){w.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),w.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),w.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),w.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),g(e))return r=o.call(arguments,2),i=function(){return e.apply(t||this,r.concat(o.call(arguments)))},i.guid=e.guid=e.guid||w.guid++,i},w.holdReady=function(e){e?w.readyWait++:w.ready(!0)},w.isArray=Array.isArray,w.parseJSON=JSON.parse,w.nodeName=N,w.isFunction=g,w.isWindow=y,w.camelCase=G,w.type=x,w.now=Date.now,w.isNumeric=function(e){var t=w.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return w});var Jt=e.jQuery,Kt=e.$;return w.noConflict=function(t){return e.$===w&&(e.$=Kt),t&&e.jQuery===w&&(e.jQuery=Jt),w},t||(e.jQuery=e.$=w),w});
(function(factory){
if(typeof define==="function"&&define.amd){
define([ "jquery" ], factory);
}else{
factory(jQuery);
}}(function($){
$.ui=$.ui||{};
var version=$.ui.version="1.12.1";
var widgetUuid=0;
var widgetSlice=Array.prototype.slice;
$.cleanData=(function(orig){
return function(elems){
var events, elem, i;
for(i=0;(elem=elems[ i ])!=null; i++){
try {
events=$._data(elem, "events");
if(events&&events.remove){
$(elem).triggerHandler("remove");
}} catch(e){}}
orig(elems);
};})($.cleanData);
$.widget=function(name, base, prototype){
var existingConstructor, constructor, basePrototype;
var proxiedPrototype={};
var namespace=name.split(".")[ 0 ];
name=name.split(".")[ 1 ];
var fullName=namespace + "-" + name;
if(!prototype){
prototype=base;
base=$.Widget;
}
if($.isArray(prototype)){
prototype=$.extend.apply(null, [ {} ].concat(prototype));
}
$.expr[ ":" ][ fullName.toLowerCase() ]=function(elem){
return !!$.data(elem, fullName);
};
$[ namespace ]=$[ namespace ]||{};
existingConstructor=$[ namespace ][ name ];
constructor=$[ namespace ][ name ]=function(options, element){
if(!this._createWidget){
return new constructor(options, element);
}
if(arguments.length){
this._createWidget(options, element);
}};
$.extend(constructor, existingConstructor, {
version: prototype.version,
_proto: $.extend({}, prototype),
_childConstructors: []
});
basePrototype=new base();
basePrototype.options=$.widget.extend({}, basePrototype.options);
$.each(prototype, function(prop, value){
if(!$.isFunction(value)){
proxiedPrototype[ prop ]=value;
return;
}
proxiedPrototype[ prop ]=(function(){
function _super(){
return base.prototype[ prop ].apply(this, arguments);
}
function _superApply(args){
return base.prototype[ prop ].apply(this, args);
}
return function(){
var __super=this._super;
var __superApply=this._superApply;
var returnValue;
this._super=_super;
this._superApply=_superApply;
returnValue=value.apply(this, arguments);
this._super=__super;
this._superApply=__superApply;
return returnValue;
};})();
});
constructor.prototype=$.widget.extend(basePrototype, {
widgetEventPrefix: existingConstructor ?(basePrototype.widgetEventPrefix||name):name
}, proxiedPrototype, {
constructor: constructor,
namespace: namespace,
widgetName: name,
widgetFullName: fullName
});
if(existingConstructor){
$.each(existingConstructor._childConstructors, function(i, child){
var childPrototype=child.prototype;
$.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor,
child._proto);
});
delete existingConstructor._childConstructors;
}else{
base._childConstructors.push(constructor);
}
$.widget.bridge(name, constructor);
return constructor;
};
$.widget.extend=function(target){
var input=widgetSlice.call(arguments, 1);
var inputIndex=0;
var inputLength=input.length;
var key;
var value;
for(; inputIndex < inputLength; inputIndex++){
for(key in input[ inputIndex ]){
value=input[ inputIndex ][ key ];
if(input[ inputIndex ].hasOwnProperty(key)&&value!==undefined){
if($.isPlainObject(value)){
target[ key ]=$.isPlainObject(target[ key ]) ?
$.widget.extend({}, target[ key ], value) :
$.widget.extend({}, value);
}else{
target[ key ]=value;
}}
}}
return target;
};
$.widget.bridge=function(name, object){
var fullName=object.prototype.widgetFullName||name;
$.fn[ name ]=function(options){
var isMethodCall=typeof options==="string";
var args=widgetSlice.call(arguments, 1);
var returnValue=this;
if(isMethodCall){
if(!this.length&&options==="instance"){
returnValue=undefined;
}else{
this.each(function(){
var methodValue;
var instance=$.data(this, fullName);
if(options==="instance"){
returnValue=instance;
return false;
}
if(!instance){
return $.error("cannot call methods on " + name +
" prior to initialization; " +
"attempted to call method '" + options + "'");
}
if(!$.isFunction(instance[ options ])||options.charAt(0)==="_"){
return $.error("no such method '" + options + "' for " + name +
" widget instance");
}
methodValue=instance[ options ].apply(instance, args);
if(methodValue!==instance&&methodValue!==undefined){
returnValue=methodValue&&methodValue.jquery ?
returnValue.pushStack(methodValue.get()) :
methodValue;
return false;
}});
}}else{
if(args.length){
options=$.widget.extend.apply(null, [ options ].concat(args));
}
this.each(function(){
var instance=$.data(this, fullName);
if(instance){
instance.option(options||{});
if(instance._init){
instance._init();
}}else{
$.data(this, fullName, new object(options, this));
}});
}
return returnValue;
};};
$.Widget=function(){};
$.Widget._childConstructors=[];
$.Widget.prototype={
widgetName: "widget",
widgetEventPrefix: "",
defaultElement: "<div>",
options: {
classes: {},
disabled: false,
create: null
},
_createWidget: function(options, element){
element=$(element||this.defaultElement||this)[ 0 ];
this.element=$(element);
this.uuid=widgetUuid++;
this.eventNamespace="." + this.widgetName + this.uuid;
this.bindings=$();
this.hoverable=$();
this.focusable=$();
this.classesElementLookup={};
if(element!==this){
$.data(element, this.widgetFullName, this);
this._on(true, this.element, {
remove: function(event){
if(event.target===element){
this.destroy();
}}
});
this.document=$(element.style ?
element.ownerDocument :
element.document||element);
this.window=$(this.document[ 0 ].defaultView||this.document[ 0 ].parentWindow);
}
this.options=$.widget.extend({},
this.options,
this._getCreateOptions(),
options);
this._create();
if(this.options.disabled){
this._setOptionDisabled(this.options.disabled);
}
this._trigger("create", null, this._getCreateEventData());
this._init();
},
_getCreateOptions: function(){
return {};},
_getCreateEventData: $.noop,
_create: $.noop,
_init: $.noop,
destroy: function(){
var that=this;
this._destroy();
$.each(this.classesElementLookup, function(key, value){
that._removeClass(value, key);
});
this.element
.off(this.eventNamespace)
.removeData(this.widgetFullName);
this.widget()
.off(this.eventNamespace)
.removeAttr("aria-disabled");
this.bindings.off(this.eventNamespace);
},
_destroy: $.noop,
widget: function(){
return this.element;
},
option: function(key, value){
var options=key;
var parts;
var curOption;
var i;
if(arguments.length===0){
return $.widget.extend({}, this.options);
}
if(typeof key==="string"){
options={};
parts=key.split(".");
key=parts.shift();
if(parts.length){
curOption=options[ key ]=$.widget.extend({}, this.options[ key ]);
for(i=0; i < parts.length - 1; i++){
curOption[ parts[ i ] ]=curOption[ parts[ i ] ]||{};
curOption=curOption[ parts[ i ] ];
}
key=parts.pop();
if(arguments.length===1){
return curOption[ key ]===undefined ? null:curOption[ key ];
}
curOption[ key ]=value;
}else{
if(arguments.length===1){
return this.options[ key ]===undefined ? null:this.options[ key ];
}
options[ key ]=value;
}}
this._setOptions(options);
return this;
},
_setOptions: function(options){
var key;
for(key in options){
this._setOption(key, options[ key ]);
}
return this;
},
_setOption: function(key, value){
if(key==="classes"){
this._setOptionClasses(value);
}
this.options[ key ]=value;
if(key==="disabled"){
this._setOptionDisabled(value);
}
return this;
},
_setOptionClasses: function(value){
var classKey, elements, currentElements;
for(classKey in value){
currentElements=this.classesElementLookup[ classKey ];
if(value[ classKey ]===this.options.classes[ classKey ] ||
!currentElements ||
!currentElements.length){
continue;
}
elements=$(currentElements.get());
this._removeClass(currentElements, classKey);
elements.addClass(this._classes({
element: elements,
keys: classKey,
classes: value,
add: true
}));
}},
_setOptionDisabled: function(value){
this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!value);
if(value){
this._removeClass(this.hoverable, null, "ui-state-hover");
this._removeClass(this.focusable, null, "ui-state-focus");
}},
enable: function(){
return this._setOptions({ disabled: false });
},
disable: function(){
return this._setOptions({ disabled: true });
},
_classes: function(options){
var full=[];
var that=this;
options=$.extend({
element: this.element,
classes: this.options.classes||{}}, options);
function processClassString(classes, checkOption){
var current, i;
for(i=0; i < classes.length; i++){
current=that.classesElementLookup[ classes[ i ] ]||$();
if(options.add){
current=$($.unique(current.get().concat(options.element.get())));
}else{
current=$(current.not(options.element).get());
}
that.classesElementLookup[ classes[ i ] ]=current;
full.push(classes[ i ]);
if(checkOption&&options.classes[ classes[ i ] ]){
full.push(options.classes[ classes[ i ] ]);
}}
}
this._on(options.element, {
"remove": "_untrackClassesElement"
});
if(options.keys){
processClassString(options.keys.match(/\S+/g)||[], true);
}
if(options.extra){
processClassString(options.extra.match(/\S+/g)||[]);
}
return full.join(" ");
},
_untrackClassesElement: function(event){
var that=this;
$.each(that.classesElementLookup, function(key, value){
if($.inArray(event.target, value)!==-1){
that.classesElementLookup[ key ]=$(value.not(event.target).get());
}});
},
_removeClass: function(element, keys, extra){
return this._toggleClass(element, keys, extra, false);
},
_addClass: function(element, keys, extra){
return this._toggleClass(element, keys, extra, true);
},
_toggleClass: function(element, keys, extra, add){
add=(typeof add==="boolean") ? add:extra;
var shift=(typeof element==="string"||element===null),
options={
extra: shift ? keys:extra,
keys: shift ? element:keys,
element: shift ? this.element:element,
add: add
};
options.element.toggleClass(this._classes(options), add);
return this;
},
_on: function(suppressDisabledCheck, element, handlers){
var delegateElement;
var instance=this;
if(typeof suppressDisabledCheck!=="boolean"){
handlers=element;
element=suppressDisabledCheck;
suppressDisabledCheck=false;
}
if(!handlers){
handlers=element;
element=this.element;
delegateElement=this.widget();
}else{
element=delegateElement=$(element);
this.bindings=this.bindings.add(element);
}
$.each(handlers, function(event, handler){
function handlerProxy(){
if(!suppressDisabledCheck &&
(instance.options.disabled===true ||
$(this).hasClass("ui-state-disabled"))){
return;
}
return(typeof handler==="string" ? instance[ handler ]:handler)
.apply(instance, arguments);
}
if(typeof handler!=="string"){
handlerProxy.guid=handler.guid =
handler.guid||handlerProxy.guid||$.guid++;
}
var match=event.match(/^([\w:-]*)\s*(.*)$/);
var eventName=match[ 1 ] + instance.eventNamespace;
var selector=match[ 2 ];
if(selector){
delegateElement.on(eventName, selector, handlerProxy);
}else{
element.on(eventName, handlerProxy);
}});
},
_off: function(element, eventName){
eventName=(eventName||"").split(" ").join(this.eventNamespace + " ") +
this.eventNamespace;
element.off(eventName).off(eventName);
this.bindings=$(this.bindings.not(element).get());
this.focusable=$(this.focusable.not(element).get());
this.hoverable=$(this.hoverable.not(element).get());
},
_delay: function(handler, delay){
function handlerProxy(){
return(typeof handler==="string" ? instance[ handler ]:handler)
.apply(instance, arguments);
}
var instance=this;
return setTimeout(handlerProxy, delay||0);
},
_hoverable: function(element){
this.hoverable=this.hoverable.add(element);
this._on(element, {
mouseenter: function(event){
this._addClass($(event.currentTarget), null, "ui-state-hover");
},
mouseleave: function(event){
this._removeClass($(event.currentTarget), null, "ui-state-hover");
}});
},
_focusable: function(element){
this.focusable=this.focusable.add(element);
this._on(element, {
focusin: function(event){
this._addClass($(event.currentTarget), null, "ui-state-focus");
},
focusout: function(event){
this._removeClass($(event.currentTarget), null, "ui-state-focus");
}});
},
_trigger: function(type, event, data){
var prop, orig;
var callback=this.options[ type ];
data=data||{};
event=$.Event(event);
event.type=(type===this.widgetEventPrefix ?
type :
this.widgetEventPrefix + type).toLowerCase();
event.target=this.element[ 0 ];
orig=event.originalEvent;
if(orig){
for(prop in orig){
if(!(prop in event)){
event[ prop ]=orig[ prop ];
}}
}
this.element.trigger(event, data);
return !($.isFunction(callback) &&
callback.apply(this.element[ 0 ], [ event ].concat(data))===false ||
event.isDefaultPrevented());
}};
$.each({ show: "fadeIn", hide: "fadeOut" }, function(method, defaultEffect){
$.Widget.prototype[ "_" + method ]=function(element, options, callback){
if(typeof options==="string"){
options={ effect: options };}
var hasOptions;
var effectName = !options ?
method :
options===true||typeof options==="number" ?
defaultEffect :
options.effect||defaultEffect;
options=options||{};
if(typeof options==="number"){
options={ duration: options };}
hasOptions = !$.isEmptyObject(options);
options.complete=callback;
if(options.delay){
element.delay(options.delay);
}
if(hasOptions&&$.effects&&$.effects.effect[ effectName ]){
element[ method ](options);
}else if(effectName!==method&&element[ effectName ]){
element[ effectName ](options.duration, options.easing, callback);
}else{
element.queue(function(next){
$(this)[ method ]();
if(callback){
callback.call(element[ 0 ]);
}
next();
});
}};});
var widget=$.widget;
(function(){
var cachedScrollbarWidth,
max=Math.max,
abs=Math.abs,
rhorizontal=/left|center|right/,
rvertical=/top|center|bottom/,
roffset=/[\+\-]\d+(\.[\d]+)?%?/,
rposition=/^\w+/,
rpercent=/%$/,
_position=$.fn.position;
function getOffsets(offsets, width, height){
return [
parseFloat(offsets[ 0 ]) *(rpercent.test(offsets[ 0 ]) ? width / 100:1),
parseFloat(offsets[ 1 ]) *(rpercent.test(offsets[ 1 ]) ? height / 100:1)
];
}
function parseCss(element, property){
return parseInt($.css(element, property), 10)||0;
}
function getDimensions(elem){
var raw=elem[ 0 ];
if(raw.nodeType===9){
return {
width: elem.width(),
height: elem.height(),
offset: { top: 0, left: 0 }};}
if($.isWindow(raw)){
return {
width: elem.width(),
height: elem.height(),
offset: { top: elem.scrollTop(), left: elem.scrollLeft() }};}
if(raw.preventDefault){
return {
width: 0,
height: 0,
offset: { top: raw.pageY, left: raw.pageX }};}
return {
width: elem.outerWidth(),
height: elem.outerHeight(),
offset: elem.offset()
};}
$.position={
scrollbarWidth: function(){
if(cachedScrollbarWidth!==undefined){
return cachedScrollbarWidth;
}
var w1, w2,
div=$("<div " +
"style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" +
"<div style='height:100px;width:auto;'></div></div>"),
innerDiv=div.children()[ 0 ];
$("body").append(div);
w1=innerDiv.offsetWidth;
div.css("overflow", "scroll");
w2=innerDiv.offsetWidth;
if(w1===w2){
w2=div[ 0 ].clientWidth;
}
div.remove();
return(cachedScrollbarWidth=w1 - w2);
},
getScrollInfo: function(within){
var overflowX=within.isWindow||within.isDocument ? "" :
within.element.css("overflow-x"),
overflowY=within.isWindow||within.isDocument ? "" :
within.element.css("overflow-y"),
hasOverflowX=overflowX==="scroll" ||
(overflowX==="auto"&&within.width < within.element[ 0 ].scrollWidth),
hasOverflowY=overflowY==="scroll" ||
(overflowY==="auto"&&within.height < within.element[ 0 ].scrollHeight);
return {
width: hasOverflowY ? $.position.scrollbarWidth():0,
height: hasOverflowX ? $.position.scrollbarWidth():0
};},
getWithinInfo: function(element){
var withinElement=$(element||window),
isWindow=$.isWindow(withinElement[ 0 ]),
isDocument = !!withinElement[ 0 ]&&withinElement[ 0 ].nodeType===9,
hasOffset = !isWindow&&!isDocument;
return {
element: withinElement,
isWindow: isWindow,
isDocument: isDocument,
offset: hasOffset ? $(element).offset():{ left: 0, top: 0 },
scrollLeft: withinElement.scrollLeft(),
scrollTop: withinElement.scrollTop(),
width: withinElement.outerWidth(),
height: withinElement.outerHeight()
};}};
$.fn.position=function(options){
if(!options||!options.of){
return _position.apply(this, arguments);
}
options=$.extend({}, options);
var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
target=$(options.of),
within=$.position.getWithinInfo(options.within),
scrollInfo=$.position.getScrollInfo(within),
collision=(options.collision||"flip").split(" "),
offsets={};
dimensions=getDimensions(target);
if(target[ 0 ].preventDefault){
options.at="left top";
}
targetWidth=dimensions.width;
targetHeight=dimensions.height;
targetOffset=dimensions.offset;
basePosition=$.extend({}, targetOffset);
$.each([ "my", "at" ], function(){
var pos=(options[ this ]||"").split(" "),
horizontalOffset,
verticalOffset;
if(pos.length===1){
pos=rhorizontal.test(pos[ 0 ]) ?
pos.concat([ "center" ]) :
rvertical.test(pos[ 0 ]) ?
[ "center" ].concat(pos) :
[ "center", "center" ];
}
pos[ 0 ]=rhorizontal.test(pos[ 0 ]) ? pos[ 0 ]:"center";
pos[ 1 ]=rvertical.test(pos[ 1 ]) ? pos[ 1 ]:"center";
horizontalOffset=roffset.exec(pos[ 0 ]);
verticalOffset=roffset.exec(pos[ 1 ]);
offsets[ this ]=[
horizontalOffset ? horizontalOffset[ 0 ]:0,
verticalOffset ? verticalOffset[ 0 ]:0
];
options[ this ]=[
rposition.exec(pos[ 0 ])[ 0 ],
rposition.exec(pos[ 1 ])[ 0 ]
];
});
if(collision.length===1){
collision[ 1 ]=collision[ 0 ];
}
if(options.at[ 0 ]==="right"){
basePosition.left +=targetWidth;
}else if(options.at[ 0 ]==="center"){
basePosition.left +=targetWidth / 2;
}
if(options.at[ 1 ]==="bottom"){
basePosition.top +=targetHeight;
}else if(options.at[ 1 ]==="center"){
basePosition.top +=targetHeight / 2;
}
atOffset=getOffsets(offsets.at, targetWidth, targetHeight);
basePosition.left +=atOffset[ 0 ];
basePosition.top +=atOffset[ 1 ];
return this.each(function(){
var collisionPosition, using,
elem=$(this),
elemWidth=elem.outerWidth(),
elemHeight=elem.outerHeight(),
marginLeft=parseCss(this, "marginLeft"),
marginTop=parseCss(this, "marginTop"),
collisionWidth=elemWidth + marginLeft + parseCss(this, "marginRight") +
scrollInfo.width,
collisionHeight=elemHeight + marginTop + parseCss(this, "marginBottom") +
scrollInfo.height,
position=$.extend({}, basePosition),
myOffset=getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
if(options.my[ 0 ]==="right"){
position.left -=elemWidth;
}else if(options.my[ 0 ]==="center"){
position.left -=elemWidth / 2;
}
if(options.my[ 1 ]==="bottom"){
position.top -=elemHeight;
}else if(options.my[ 1 ]==="center"){
position.top -=elemHeight / 2;
}
position.left +=myOffset[ 0 ];
position.top +=myOffset[ 1 ];
collisionPosition={
marginLeft: marginLeft,
marginTop: marginTop
};
$.each([ "left", "top" ], function(i, dir){
if($.ui.position[ collision[ i ] ]){
$.ui.position[ collision[ i ] ][ dir ](position, {
targetWidth: targetWidth,
targetHeight: targetHeight,
elemWidth: elemWidth,
elemHeight: elemHeight,
collisionPosition: collisionPosition,
collisionWidth: collisionWidth,
collisionHeight: collisionHeight,
offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
my: options.my,
at: options.at,
within: within,
elem: elem
});
}});
if(options.using){
using=function(props){
var left=targetOffset.left - position.left,
right=left + targetWidth - elemWidth,
top=targetOffset.top - position.top,
bottom=top + targetHeight - elemHeight,
feedback={
target: {
element: target,
left: targetOffset.left,
top: targetOffset.top,
width: targetWidth,
height: targetHeight
},
element: {
element: elem,
left: position.left,
top: position.top,
width: elemWidth,
height: elemHeight
},
horizontal: right < 0 ? "left":left > 0 ? "right":"center",
vertical: bottom < 0 ? "top":top > 0 ? "bottom":"middle"
};
if(targetWidth < elemWidth&&abs(left + right) < targetWidth){
feedback.horizontal="center";
}
if(targetHeight < elemHeight&&abs(top + bottom) < targetHeight){
feedback.vertical="middle";
}
if(max(abs(left), abs(right)) > max(abs(top), abs(bottom))){
feedback.important="horizontal";
}else{
feedback.important="vertical";
}
options.using.call(this, props, feedback);
};}
elem.offset($.extend(position, { using: using }));
});
};
$.ui.position={
fit: {
left: function(position, data){
var within=data.within,
withinOffset=within.isWindow ? within.scrollLeft:within.offset.left,
outerWidth=within.width,
collisionPosLeft=position.left - data.collisionPosition.marginLeft,
overLeft=withinOffset - collisionPosLeft,
overRight=collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
newOverRight;
if(data.collisionWidth > outerWidth){
if(overLeft > 0&&overRight <=0){
newOverRight=position.left + overLeft + data.collisionWidth - outerWidth -
withinOffset;
position.left +=overLeft - newOverRight;
}else if(overRight > 0&&overLeft <=0){
position.left=withinOffset;
}else{
if(overLeft > overRight){
position.left=withinOffset + outerWidth - data.collisionWidth;
}else{
position.left=withinOffset;
}}
}else if(overLeft > 0){
position.left +=overLeft;
}else if(overRight > 0){
position.left -=overRight;
}else{
position.left=max(position.left - collisionPosLeft, position.left);
}},
top: function(position, data){
var within=data.within,
withinOffset=within.isWindow ? within.scrollTop:within.offset.top,
outerHeight=data.within.height,
collisionPosTop=position.top - data.collisionPosition.marginTop,
overTop=withinOffset - collisionPosTop,
overBottom=collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
newOverBottom;
if(data.collisionHeight > outerHeight){
if(overTop > 0&&overBottom <=0){
newOverBottom=position.top + overTop + data.collisionHeight - outerHeight -
withinOffset;
position.top +=overTop - newOverBottom;
}else if(overBottom > 0&&overTop <=0){
position.top=withinOffset;
}else{
if(overTop > overBottom){
position.top=withinOffset + outerHeight - data.collisionHeight;
}else{
position.top=withinOffset;
}}
}else if(overTop > 0){
position.top +=overTop;
}else if(overBottom > 0){
position.top -=overBottom;
}else{
position.top=max(position.top - collisionPosTop, position.top);
}}
},
flip: {
left: function(position, data){
var within=data.within,
withinOffset=within.offset.left + within.scrollLeft,
outerWidth=within.width,
offsetLeft=within.isWindow ? within.scrollLeft:within.offset.left,
collisionPosLeft=position.left - data.collisionPosition.marginLeft,
overLeft=collisionPosLeft - offsetLeft,
overRight=collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
myOffset=data.my[ 0 ]==="left" ?
-data.elemWidth :
data.my[ 0 ]==="right" ?
data.elemWidth :
0,
atOffset=data.at[ 0 ]==="left" ?
data.targetWidth :
data.at[ 0 ]==="right" ?
-data.targetWidth :
0,
offset=-2 * data.offset[ 0 ],
newOverRight,
newOverLeft;
if(overLeft < 0){
newOverRight=position.left + myOffset + atOffset + offset + data.collisionWidth -
outerWidth - withinOffset;
if(newOverRight < 0||newOverRight < abs(overLeft)){
position.left +=myOffset + atOffset + offset;
}}else if(overRight > 0){
newOverLeft=position.left - data.collisionPosition.marginLeft + myOffset +
atOffset + offset - offsetLeft;
if(newOverLeft > 0||abs(newOverLeft) < overRight){
position.left +=myOffset + atOffset + offset;
}}
},
top: function(position, data){
var within=data.within,
withinOffset=within.offset.top + within.scrollTop,
outerHeight=within.height,
offsetTop=within.isWindow ? within.scrollTop:within.offset.top,
collisionPosTop=position.top - data.collisionPosition.marginTop,
overTop=collisionPosTop - offsetTop,
overBottom=collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
top=data.my[ 1 ]==="top",
myOffset=top ?
-data.elemHeight :
data.my[ 1 ]==="bottom" ?
data.elemHeight :
0,
atOffset=data.at[ 1 ]==="top" ?
data.targetHeight :
data.at[ 1 ]==="bottom" ?
-data.targetHeight :
0,
offset=-2 * data.offset[ 1 ],
newOverTop,
newOverBottom;
if(overTop < 0){
newOverBottom=position.top + myOffset + atOffset + offset + data.collisionHeight -
outerHeight - withinOffset;
if(newOverBottom < 0||newOverBottom < abs(overTop)){
position.top +=myOffset + atOffset + offset;
}}else if(overBottom > 0){
newOverTop=position.top - data.collisionPosition.marginTop + myOffset + atOffset +
offset - offsetTop;
if(newOverTop > 0||abs(newOverTop) < overBottom){
position.top +=myOffset + atOffset + offset;
}}
}},
flipfit: {
left: function(){
$.ui.position.flip.left.apply(this, arguments);
$.ui.position.fit.left.apply(this, arguments);
},
top: function(){
$.ui.position.flip.top.apply(this, arguments);
$.ui.position.fit.top.apply(this, arguments);
}}
};})();
var position=$.ui.position;
var data=$.extend($.expr[ ":" ], {
data: $.expr.createPseudo ?
$.expr.createPseudo(function(dataName){
return function(elem){
return !!$.data(elem, dataName);
};}) :
function(elem, i, match){
return !!$.data(elem, match[ 3 ]);
}});
var disableSelection=$.fn.extend({
disableSelection:(function(){
var eventType="onselectstart" in document.createElement("div") ?
"selectstart" :
"mousedown";
return function(){
return this.on(eventType + ".ui-disableSelection", function(event){
event.preventDefault();
});
};})(),
enableSelection: function(){
return this.off(".ui-disableSelection");
}});
var dataSpace="ui-effects-",
dataSpaceStyle="ui-effects-style",
dataSpaceAnimated="ui-effects-animated",
jQuery=$;
$.effects={
effect: {}};
(function(jQuery, undefined){
var stepHooks="backgroundColor borderBottomColor borderLeftColor borderRightColor " +
"borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
rplusequals=/^([\-+])=\s*(\d+\.?\d*)/,
stringParsers=[ {
re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
parse: function(execResult){
return [
execResult[ 1 ],
execResult[ 2 ],
execResult[ 3 ],
execResult[ 4 ]
];
}}, {
re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
parse: function(execResult){
return [
execResult[ 1 ] * 2.55,
execResult[ 2 ] * 2.55,
execResult[ 3 ] * 2.55,
execResult[ 4 ]
];
}}, {
re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
parse: function(execResult){
return [
parseInt(execResult[ 1 ], 16),
parseInt(execResult[ 2 ], 16),
parseInt(execResult[ 3 ], 16)
];
}}, {
re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
parse: function(execResult){
return [
parseInt(execResult[ 1 ] + execResult[ 1 ], 16),
parseInt(execResult[ 2 ] + execResult[ 2 ], 16),
parseInt(execResult[ 3 ] + execResult[ 3 ], 16)
];
}}, {
re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
space: "hsla",
parse: function(execResult){
return [
execResult[ 1 ],
execResult[ 2 ] / 100,
execResult[ 3 ] / 100,
execResult[ 4 ]
];
}} ],
color=jQuery.Color=function(color, green, blue, alpha){
return new jQuery.Color.fn.parse(color, green, blue, alpha);
},
spaces={
rgba: {
props: {
red: {
idx: 0,
type: "byte"
},
green: {
idx: 1,
type: "byte"
},
blue: {
idx: 2,
type: "byte"
}}
},
hsla: {
props: {
hue: {
idx: 0,
type: "degrees"
},
saturation: {
idx: 1,
type: "percent"
},
lightness: {
idx: 2,
type: "percent"
}}
}},
propTypes={
"byte": {
floor: true,
max: 255
},
"percent": {
max: 1
},
"degrees": {
mod: 360,
floor: true
}},
support=color.support={},
supportElem=jQuery("<p>")[ 0 ],
colors,
each=jQuery.each;
supportElem.style.cssText="background-color:rgba(1,1,1,.5)";
support.rgba=supportElem.style.backgroundColor.indexOf("rgba") > -1;
each(spaces, function(spaceName, space){
space.cache="_" + spaceName;
space.props.alpha={
idx: 3,
type: "percent",
def: 1
};});
function clamp(value, prop, allowEmpty){
var type=propTypes[ prop.type ]||{};
if(value==null){
return(allowEmpty||!prop.def) ? null:prop.def;
}
value=type.floor ? ~~value:parseFloat(value);
if(isNaN(value)){
return prop.def;
}
if(type.mod){
return(value + type.mod) % type.mod;
}
return 0 > value ? 0:type.max < value ? type.max:value;
}
function stringParse(string){
var inst=color(),
rgba=inst._rgba=[];
string=string.toLowerCase();
each(stringParsers, function(i, parser){
var parsed,
match=parser.re.exec(string),
values=match&&parser.parse(match),
spaceName=parser.space||"rgba";
if(values){
parsed=inst[ spaceName ](values);
inst[ spaces[ spaceName ].cache ]=parsed[ spaces[ spaceName ].cache ];
rgba=inst._rgba=parsed._rgba;
return false;
}});
if(rgba.length){
if(rgba.join()==="0,0,0,0"){
jQuery.extend(rgba, colors.transparent);
}
return inst;
}
return colors[ string ];
}
color.fn=jQuery.extend(color.prototype, {
parse: function(red, green, blue, alpha){
if(red===undefined){
this._rgba=[ null, null, null, null ];
return this;
}
if(red.jquery||red.nodeType){
red=jQuery(red).css(green);
green=undefined;
}
var inst=this,
type=jQuery.type(red),
rgba=this._rgba=[];
if(green!==undefined){
red=[ red, green, blue, alpha ];
type="array";
}
if(type==="string"){
return this.parse(stringParse(red)||colors._default);
}
if(type==="array"){
each(spaces.rgba.props, function(key, prop){
rgba[ prop.idx ]=clamp(red[ prop.idx ], prop);
});
return this;
}
if(type==="object"){
if(red instanceof color){
each(spaces, function(spaceName, space){
if(red[ space.cache ]){
inst[ space.cache ]=red[ space.cache ].slice();
}});
}else{
each(spaces, function(spaceName, space){
var cache=space.cache;
each(space.props, function(key, prop){
if(!inst[ cache ]&&space.to){
if(key==="alpha"||red[ key ]==null){
return;
}
inst[ cache ]=space.to(inst._rgba);
}
inst[ cache ][ prop.idx ]=clamp(red[ key ], prop, true);
});
if(inst[ cache ] &&
jQuery.inArray(null, inst[ cache ].slice(0, 3)) < 0){
inst[ cache ][ 3 ]=1;
if(space.from){
inst._rgba=space.from(inst[ cache ]);
}}
});
}
return this;
}},
is: function(compare){
var is=color(compare),
same=true,
inst=this;
each(spaces, function(_, space){
var localCache,
isCache=is[ space.cache ];
if(isCache){
localCache=inst[ space.cache ]||space.to&&space.to(inst._rgba)||[];
each(space.props, function(_, prop){
if(isCache[ prop.idx ]!=null){
same=(isCache[ prop.idx ]===localCache[ prop.idx ]);
return same;
}});
}
return same;
});
return same;
},
_space: function(){
var used=[],
inst=this;
each(spaces, function(spaceName, space){
if(inst[ space.cache ]){
used.push(spaceName);
}});
return used.pop();
},
transition: function(other, distance){
var end=color(other),
spaceName=end._space(),
space=spaces[ spaceName ],
startColor=this.alpha()===0 ? color("transparent"):this,
start=startColor[ space.cache ]||space.to(startColor._rgba),
result=start.slice();
end=end[ space.cache ];
each(space.props, function(key, prop){
var index=prop.idx,
startValue=start[ index ],
endValue=end[ index ],
type=propTypes[ prop.type ]||{};
if(endValue===null){
return;
}
if(startValue===null){
result[ index ]=endValue;
}else{
if(type.mod){
if(endValue - startValue > type.mod / 2){
startValue +=type.mod;
}else if(startValue - endValue > type.mod / 2){
startValue -=type.mod;
}}
result[ index ]=clamp(( endValue - startValue) * distance + startValue, prop);
}});
return this[ spaceName ](result);
},
blend: function(opaque){
if(this._rgba[ 3 ]===1){
return this;
}
var rgb=this._rgba.slice(),
a=rgb.pop(),
blend=color(opaque)._rgba;
return color(jQuery.map(rgb, function(v, i){
return(1 - a) * blend[ i ] + a * v;
}));
},
toRgbaString: function(){
var prefix="rgba(",
rgba=jQuery.map(this._rgba, function(v, i){
return v==null ?(i > 2 ? 1:0):v;
});
if(rgba[ 3 ]===1){
rgba.pop();
prefix="rgb(";
}
return prefix + rgba.join() + ")";
},
toHslaString: function(){
var prefix="hsla(",
hsla=jQuery.map(this.hsla(), function(v, i){
if(v==null){
v=i > 2 ? 1:0;
}
if(i&&i < 3){
v=Math.round(v * 100) + "%";
}
return v;
});
if(hsla[ 3 ]===1){
hsla.pop();
prefix="hsl(";
}
return prefix + hsla.join() + ")";
},
toHexString: function(includeAlpha){
var rgba=this._rgba.slice(),
alpha=rgba.pop();
if(includeAlpha){
rgba.push(~~(alpha * 255));
}
return "#" + jQuery.map(rgba, function(v){
v=(v||0).toString(16);
return v.length===1 ? "0" + v:v;
}).join("");
},
toString: function(){
return this._rgba[ 3 ]===0 ? "transparent":this.toRgbaString();
}});
color.fn.parse.prototype=color.fn;
function hue2rgb(p, q, h){
h=(h + 1) % 1;
if(h * 6 < 1){
return p +(q - p) * h * 6;
}
if(h * 2 < 1){
return q;
}
if(h * 3 < 2){
return p +(q - p) *(( 2 / 3) - h) * 6;
}
return p;
}
spaces.hsla.to=function(rgba){
if(rgba[ 0 ]==null||rgba[ 1 ]==null||rgba[ 2 ]==null){
return [ null, null, null, rgba[ 3 ] ];
}
var r=rgba[ 0 ] / 255,
g=rgba[ 1 ] / 255,
b=rgba[ 2 ] / 255,
a=rgba[ 3 ],
max=Math.max(r, g, b),
min=Math.min(r, g, b),
diff=max - min,
add=max + min,
l=add * 0.5,
h, s;
if(min===max){
h=0;
}else if(r===max){
h=(60 *(g - b) / diff) + 360;
}else if(g===max){
h=(60 *(b - r) / diff) + 120;
}else{
h=(60 *(r - g) / diff) + 240;
}
if(diff===0){
s=0;
}else if(l <=0.5){
s=diff / add;
}else{
s=diff /(2 - add);
}
return [ Math.round(h) % 360, s, l, a==null ? 1:a ];
};
spaces.hsla.from=function(hsla){
if(hsla[ 0 ]==null||hsla[ 1 ]==null||hsla[ 2 ]==null){
return [ null, null, null, hsla[ 3 ] ];
}
var h=hsla[ 0 ] / 360,
s=hsla[ 1 ],
l=hsla[ 2 ],
a=hsla[ 3 ],
q=l <=0.5 ? l *(1 + s):l + s - l * s,
p=2 * l - q;
return [
Math.round(hue2rgb(p, q, h +(1 / 3)) * 255),
Math.round(hue2rgb(p, q, h) * 255),
Math.round(hue2rgb(p, q, h -(1 / 3)) * 255),
a
];
};
each(spaces, function(spaceName, space){
var props=space.props,
cache=space.cache,
to=space.to,
from=space.from;
color.fn[ spaceName ]=function(value){
if(to&&!this[ cache ]){
this[ cache ]=to(this._rgba);
}
if(value===undefined){
return this[ cache ].slice();
}
var ret,
type=jQuery.type(value),
arr=(type==="array"||type==="object") ? value:arguments,
local=this[ cache ].slice();
each(props, function(key, prop){
var val=arr[ type==="object" ? key:prop.idx ];
if(val==null){
val=local[ prop.idx ];
}
local[ prop.idx ]=clamp(val, prop);
});
if(from){
ret=color(from(local));
ret[ cache ]=local;
return ret;
}else{
return color(local);
}};
each(props, function(key, prop){
if(color.fn[ key ]){
return;
}
color.fn[ key ]=function(value){
var vtype=jQuery.type(value),
fn=(key==="alpha" ?(this._hsla ? "hsla":"rgba"):spaceName),
local=this[ fn ](),
cur=local[ prop.idx ],
match;
if(vtype==="undefined"){
return cur;
}
if(vtype==="function"){
value=value.call(this, cur);
vtype=jQuery.type(value);
}
if(value==null&&prop.empty){
return this;
}
if(vtype==="string"){
match=rplusequals.exec(value);
if(match){
value=cur + parseFloat(match[ 2 ]) *(match[ 1 ]==="+" ? 1:-1);
}}
local[ prop.idx ]=value;
return this[ fn ](local);
};});
});
color.hook=function(hook){
var hooks=hook.split(" ");
each(hooks, function(i, hook){
jQuery.cssHooks[ hook ]={
set: function(elem, value){
var parsed, curElem,
backgroundColor="";
if(value!=="transparent"&&(jQuery.type(value)!=="string" ||
(parsed=stringParse(value)))){
value=color(parsed||value);
if(!support.rgba&&value._rgba[ 3 ]!==1){
curElem=hook==="backgroundColor" ? elem.parentNode:elem;
while (
(backgroundColor===""||backgroundColor==="transparent") &&
curElem&&curElem.style
){
try {
backgroundColor=jQuery.css(curElem, "backgroundColor");
curElem=curElem.parentNode;
} catch(e){
}}
value=value.blend(backgroundColor&&backgroundColor!=="transparent" ?
backgroundColor :
"_default");
}
value=value.toRgbaString();
}
try {
elem.style[ hook ]=value;
} catch(e){
}}
};
jQuery.fx.step[ hook ]=function(fx){
if(!fx.colorInit){
fx.start=color(fx.elem, hook);
fx.end=color(fx.end);
fx.colorInit=true;
}
jQuery.cssHooks[ hook ].set(fx.elem, fx.start.transition(fx.end, fx.pos));
};});
};
color.hook(stepHooks);
jQuery.cssHooks.borderColor={
expand: function(value){
var expanded={};
each([ "Top", "Right", "Bottom", "Left" ], function(i, part){
expanded[ "border" + part + "Color" ]=value;
});
return expanded;
}};
colors=jQuery.Color.names={
aqua: "#00ffff",
black: "#000000",
blue: "#0000ff",
fuchsia: "#ff00ff",
gray: "#808080",
green: "#008000",
lime: "#00ff00",
maroon: "#800000",
navy: "#000080",
olive: "#808000",
purple: "#800080",
red: "#ff0000",
silver: "#c0c0c0",
teal: "#008080",
white: "#ffffff",
yellow: "#ffff00",
transparent: [ null, null, null, 0 ],
_default: "#ffffff"
};})(jQuery);
(function(){
var classAnimationActions=[ "add", "remove", "toggle" ],
shorthandStyles={
border: 1,
borderBottom: 1,
borderColor: 1,
borderLeft: 1,
borderRight: 1,
borderTop: 1,
borderWidth: 1,
margin: 1,
padding: 1
};
$.each([ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ],
function(_, prop){
$.fx.step[ prop ]=function(fx){
if(fx.end!=="none"&&!fx.setAttr||fx.pos===1&&!fx.setAttr){
jQuery.style(fx.elem, prop, fx.end);
fx.setAttr=true;
}};}
);
function getElementStyles(elem){
var key, len,
style=elem.ownerDocument.defaultView ?
elem.ownerDocument.defaultView.getComputedStyle(elem, null) :
elem.currentStyle,
styles={};
if(style&&style.length&&style[ 0 ]&&style[ style[ 0 ] ]){
len=style.length;
while(len--){
key=style[ len ];
if(typeof style[ key ]==="string"){
styles[ $.camelCase(key) ]=style[ key ];
}}
}else{
for(key in style){
if(typeof style[ key ]==="string"){
styles[ key ]=style[ key ];
}}
}
return styles;
}
function styleDifference(oldStyle, newStyle){
var diff={},
name, value;
for(name in newStyle){
value=newStyle[ name ];
if(oldStyle[ name ]!==value){
if(!shorthandStyles[ name ]){
if($.fx.step[ name ]||!isNaN(parseFloat(value))){
diff[ name ]=value;
}}
}}
return diff;
}
if(!$.fn.addBack){
$.fn.addBack=function(selector){
return this.add(selector==null ?
this.prevObject:this.prevObject.filter(selector)
);
};}
$.effects.animateClass=function(value, duration, easing, callback){
var o=$.speed(duration, easing, callback);
return this.queue(function(){
var animated=$(this),
baseClass=animated.attr("class")||"",
applyClassChange,
allAnimations=o.children ? animated.find("*").addBack():animated;
allAnimations=allAnimations.map(function(){
var el=$(this);
return {
el: el,
start: getElementStyles(this)
};});
applyClassChange=function(){
$.each(classAnimationActions, function(i, action){
if(value[ action ]){
animated[ action + "Class" ](value[ action ]);
}});
};
applyClassChange();
allAnimations=allAnimations.map(function(){
this.end=getElementStyles(this.el[ 0 ]);
this.diff=styleDifference(this.start, this.end);
return this;
});
animated.attr("class", baseClass);
allAnimations=allAnimations.map(function(){
var styleInfo=this,
dfd=$.Deferred(),
opts=$.extend({}, o, {
queue: false,
complete: function(){
dfd.resolve(styleInfo);
}});
this.el.animate(this.diff, opts);
return dfd.promise();
});
$.when.apply($, allAnimations.get()).done(function(){
applyClassChange();
$.each(arguments, function(){
var el=this.el;
$.each(this.diff, function(key){
el.css(key, "");
});
});
o.complete.call(animated[ 0 ]);
});
});
};
$.fn.extend({
addClass:(function(orig){
return function(classNames, speed, easing, callback){
return speed ?
$.effects.animateClass.call(this,
{ add: classNames }, speed, easing, callback) :
orig.apply(this, arguments);
};})($.fn.addClass),
removeClass:(function(orig){
return function(classNames, speed, easing, callback){
return arguments.length > 1 ?
$.effects.animateClass.call(this,
{ remove: classNames }, speed, easing, callback) :
orig.apply(this, arguments);
};})($.fn.removeClass),
toggleClass:(function(orig){
return function(classNames, force, speed, easing, callback){
if(typeof force==="boolean"||force===undefined){
if(!speed){
return orig.apply(this, arguments);
}else{
return $.effects.animateClass.call(this,
(force ? { add: classNames }:{ remove: classNames }),
speed, easing, callback);
}}else{
return $.effects.animateClass.call(this,
{ toggle: classNames }, force, speed, easing);
}};})($.fn.toggleClass),
switchClass: function(remove, add, speed, easing, callback){
return $.effects.animateClass.call(this, {
add: add,
remove: remove
}, speed, easing, callback);
}});
})();
(function(){
if($.expr&&$.expr.filters&&$.expr.filters.animated){
$.expr.filters.animated=(function(orig){
return function(elem){
return !!$(elem).data(dataSpaceAnimated)||orig(elem);
};})($.expr.filters.animated);
}
if($.uiBackCompat!==false){
$.extend($.effects, {
save: function(element, set){
var i=0, length=set.length;
for(; i < length; i++){
if(set[ i ]!==null){
element.data(dataSpace + set[ i ], element[ 0 ].style[ set[ i ] ]);
}}
},
restore: function(element, set){
var val, i=0, length=set.length;
for(; i < length; i++){
if(set[ i ]!==null){
val=element.data(dataSpace + set[ i ]);
element.css(set[ i ], val);
}}
},
setMode: function(el, mode){
if(mode==="toggle"){
mode=el.is(":hidden") ? "show":"hide";
}
return mode;
},
createWrapper: function(element){
if(element.parent().is(".ui-effects-wrapper")){
return element.parent();
}
var props={
width: element.outerWidth(true),
height: element.outerHeight(true),
"float": element.css("float")
},
wrapper=$("<div></div>")
.addClass("ui-effects-wrapper")
.css({
fontSize: "100%",
background: "transparent",
border: "none",
margin: 0,
padding: 0
}),
size={
width: element.width(),
height: element.height()
},
active=document.activeElement;
try {
active.id;
} catch(e){
active=document.body;
}
element.wrap(wrapper);
if(element[ 0 ]===active||$.contains(element[ 0 ], active)){
$(active).trigger("focus");
}
wrapper=element.parent();
if(element.css("position")==="static"){
wrapper.css({ position: "relative" });
element.css({ position: "relative" });
}else{
$.extend(props, {
position: element.css("position"),
zIndex: element.css("z-index")
});
$.each([ "top", "left", "bottom", "right" ], function(i, pos){
props[ pos ]=element.css(pos);
if(isNaN(parseInt(props[ pos ], 10))){
props[ pos ]="auto";
}});
element.css({
position: "relative",
top: 0,
left: 0,
right: "auto",
bottom: "auto"
});
}
element.css(size);
return wrapper.css(props).show();
},
removeWrapper: function(element){
var active=document.activeElement;
if(element.parent().is(".ui-effects-wrapper")){
element.parent().replaceWith(element);
if(element[ 0 ]===active||$.contains(element[ 0 ], active)){
$(active).trigger("focus");
}}
return element;
}});
}
$.extend($.effects, {
version: "1.12.1",
define: function(name, mode, effect){
if(!effect){
effect=mode;
mode="effect";
}
$.effects.effect[ name ]=effect;
$.effects.effect[ name ].mode=mode;
return effect;
},
scaledDimensions: function(element, percent, direction){
if(percent===0){
return {
height: 0,
width: 0,
outerHeight: 0,
outerWidth: 0
};}
var x=direction!=="horizontal" ?(( percent||100) / 100):1,
y=direction!=="vertical" ?(( percent||100) / 100):1;
return {
height: element.height() * y,
width: element.width() * x,
outerHeight: element.outerHeight() * y,
outerWidth: element.outerWidth() * x
};},
clipToBox: function(animation){
return {
width: animation.clip.right - animation.clip.left,
height: animation.clip.bottom - animation.clip.top,
left: animation.clip.left,
top: animation.clip.top
};},
unshift: function(element, queueLength, count){
var queue=element.queue();
if(queueLength > 1){
queue.splice.apply(queue,
[ 1, 0 ].concat(queue.splice(queueLength, count)));
}
element.dequeue();
},
saveStyle: function(element){
element.data(dataSpaceStyle, element[ 0 ].style.cssText);
},
restoreStyle: function(element){
element[ 0 ].style.cssText=element.data(dataSpaceStyle)||"";
element.removeData(dataSpaceStyle);
},
mode: function(element, mode){
var hidden=element.is(":hidden");
if(mode==="toggle"){
mode=hidden ? "show":"hide";
}
if(hidden ? mode==="hide":mode==="show"){
mode="none";
}
return mode;
},
getBaseline: function(origin, original){
var y, x;
switch(origin[ 0 ]){
case "top":
y=0;
break;
case "middle":
y=0.5;
break;
case "bottom":
y=1;
break;
default:
y=origin[ 0 ] / original.height;
}
switch(origin[ 1 ]){
case "left":
x=0;
break;
case "center":
x=0.5;
break;
case "right":
x=1;
break;
default:
x=origin[ 1 ] / original.width;
}
return {
x: x,
y: y
};},
createPlaceholder: function(element){
var placeholder,
cssPosition=element.css("position"),
position=element.position();
element.css({
marginTop: element.css("marginTop"),
marginBottom: element.css("marginBottom"),
marginLeft: element.css("marginLeft"),
marginRight: element.css("marginRight")
})
.outerWidth(element.outerWidth())
.outerHeight(element.outerHeight());
if(/^(static|relative)/.test(cssPosition)){
cssPosition="absolute";
placeholder=$("<" + element[ 0 ].nodeName + ">").insertAfter(element).css({
display: /^(inline|ruby)/.test(element.css("display")) ?
"inline-block" :
"block",
visibility: "hidden",
marginTop: element.css("marginTop"),
marginBottom: element.css("marginBottom"),
marginLeft: element.css("marginLeft"),
marginRight: element.css("marginRight"),
"float": element.css("float")
})
.outerWidth(element.outerWidth())
.outerHeight(element.outerHeight())
.addClass("ui-effects-placeholder");
element.data(dataSpace + "placeholder", placeholder);
}
element.css({
position: cssPosition,
left: position.left,
top: position.top
});
return placeholder;
},
removePlaceholder: function(element){
var dataKey=dataSpace + "placeholder",
placeholder=element.data(dataKey);
if(placeholder){
placeholder.remove();
element.removeData(dataKey);
}},
cleanUp: function(element){
$.effects.restoreStyle(element);
$.effects.removePlaceholder(element);
},
setTransition: function(element, list, factor, value){
value=value||{};
$.each(list, function(i, x){
var unit=element.cssUnit(x);
if(unit[ 0 ] > 0){
value[ x ]=unit[ 0 ] * factor + unit[ 1 ];
}});
return value;
}});
function _normalizeArguments(effect, options, speed, callback){
if($.isPlainObject(effect)){
options=effect;
effect=effect.effect;
}
effect={ effect: effect };
if(options==null){
options={};}
if($.isFunction(options)){
callback=options;
speed=null;
options={};}
if(typeof options==="number"||$.fx.speeds[ options ]){
callback=speed;
speed=options;
options={};}
if($.isFunction(speed)){
callback=speed;
speed=null;
}
if(options){
$.extend(effect, options);
}
speed=speed||options.duration;
effect.duration=$.fx.off ? 0 :
typeof speed==="number" ? speed :
speed in $.fx.speeds ? $.fx.speeds[ speed ] :
$.fx.speeds._default;
effect.complete=callback||options.complete;
return effect;
}
function standardAnimationOption(option){
if(!option||typeof option==="number"||$.fx.speeds[ option ]){
return true;
}
if(typeof option==="string"&&!$.effects.effect[ option ]){
return true;
}
if($.isFunction(option)){
return true;
}
if(typeof option==="object"&&!option.effect){
return true;
}
return false;
}
$.fn.extend({
effect: function(){
var args=_normalizeArguments.apply(this, arguments),
effectMethod=$.effects.effect[ args.effect ],
defaultMode=effectMethod.mode,
queue=args.queue,
queueName=queue||"fx",
complete=args.complete,
mode=args.mode,
modes=[],
prefilter=function(next){
var el=$(this),
normalizedMode=$.effects.mode(el, mode)||defaultMode;
el.data(dataSpaceAnimated, true);
modes.push(normalizedMode);
if(defaultMode&&(normalizedMode==="show" ||
(normalizedMode===defaultMode&&normalizedMode==="hide"))){
el.show();
}
if(!defaultMode||normalizedMode!=="none"){
$.effects.saveStyle(el);
}
if($.isFunction(next)){
next();
}};
if($.fx.off||!effectMethod){
if(mode){
return this[ mode ](args.duration, complete);
}else{
return this.each(function(){
if(complete){
complete.call(this);
}});
}}
function run(next){
var elem=$(this);
function cleanup(){
elem.removeData(dataSpaceAnimated);
$.effects.cleanUp(elem);
if(args.mode==="hide"){
elem.hide();
}
done();
}
function done(){
if($.isFunction(complete)){
complete.call(elem[ 0 ]);
}
if($.isFunction(next)){
next();
}}
args.mode=modes.shift();
if($.uiBackCompat!==false&&!defaultMode){
if(elem.is(":hidden") ? mode==="hide":mode==="show"){
elem[ mode ]();
done();
}else{
effectMethod.call(elem[ 0 ], args, done);
}}else{
if(args.mode==="none"){
elem[ mode ]();
done();
}else{
effectMethod.call(elem[ 0 ], args, cleanup);
}}
}
return queue===false ?
this.each(prefilter).each(run) :
this.queue(queueName, prefilter).queue(queueName, run);
},
show:(function(orig){
return function(option){
if(standardAnimationOption(option)){
return orig.apply(this, arguments);
}else{
var args=_normalizeArguments.apply(this, arguments);
args.mode="show";
return this.effect.call(this, args);
}};})($.fn.show),
hide:(function(orig){
return function(option){
if(standardAnimationOption(option)){
return orig.apply(this, arguments);
}else{
var args=_normalizeArguments.apply(this, arguments);
args.mode="hide";
return this.effect.call(this, args);
}};})($.fn.hide),
toggle:(function(orig){
return function(option){
if(standardAnimationOption(option)||typeof option==="boolean"){
return orig.apply(this, arguments);
}else{
var args=_normalizeArguments.apply(this, arguments);
args.mode="toggle";
return this.effect.call(this, args);
}};})($.fn.toggle),
cssUnit: function(key){
var style=this.css(key),
val=[];
$.each([ "em", "px", "%", "pt" ], function(i, unit){
if(style.indexOf(unit) > 0){
val=[ parseFloat(style), unit ];
}});
return val;
},
cssClip: function(clipObj){
if(clipObj){
return this.css("clip", "rect(" + clipObj.top + "px " + clipObj.right + "px " +
clipObj.bottom + "px " + clipObj.left + "px)");
}
return parseClip(this.css("clip"), this);
},
transfer: function(options, done){
var element=$(this),
target=$(options.to),
targetFixed=target.css("position")==="fixed",
body=$("body"),
fixTop=targetFixed ? body.scrollTop():0,
fixLeft=targetFixed ? body.scrollLeft():0,
endPosition=target.offset(),
animation={
top: endPosition.top - fixTop,
left: endPosition.left - fixLeft,
height: target.innerHeight(),
width: target.innerWidth()
},
startPosition=element.offset(),
transfer=$("<div class='ui-effects-transfer'></div>")
.appendTo("body")
.addClass(options.className)
.css({
top: startPosition.top - fixTop,
left: startPosition.left - fixLeft,
height: element.innerHeight(),
width: element.innerWidth(),
position: targetFixed ? "fixed":"absolute"
})
.animate(animation, options.duration, options.easing, function(){
transfer.remove();
if($.isFunction(done)){
done();
}});
}});
function parseClip(str, element){
var outerWidth=element.outerWidth(),
outerHeight=element.outerHeight(),
clipRegex=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
values=clipRegex.exec(str)||[ "", 0, outerWidth, outerHeight, 0 ];
return {
top: parseFloat(values[ 1 ])||0,
right: values[ 2 ]==="auto" ? outerWidth:parseFloat(values[ 2 ]),
bottom: values[ 3 ]==="auto" ? outerHeight:parseFloat(values[ 3 ]),
left: parseFloat(values[ 4 ])||0
};}
$.fx.step.clip=function(fx){
if(!fx.clipInit){
fx.start=$(fx.elem).cssClip();
if(typeof fx.end==="string"){
fx.end=parseClip(fx.end, fx.elem);
}
fx.clipInit=true;
}
$(fx.elem).cssClip({
top: fx.pos *(fx.end.top - fx.start.top) + fx.start.top,
right: fx.pos *(fx.end.right - fx.start.right) + fx.start.right,
bottom: fx.pos *(fx.end.bottom - fx.start.bottom) + fx.start.bottom,
left: fx.pos *(fx.end.left - fx.start.left) + fx.start.left
});
};})();
(function(){
var baseEasings={};
$.each([ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function(i, name){
baseEasings[ name ]=function(p){
return Math.pow(p, i + 2);
};});
$.extend(baseEasings, {
Sine: function(p){
return 1 - Math.cos(p * Math.PI / 2);
},
Circ: function(p){
return 1 - Math.sqrt(1 - p * p);
},
Elastic: function(p){
return p===0||p===1 ? p :
-Math.pow(2, 8 *(p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);
},
Back: function(p){
return p * p *(3 * p - 2);
},
Bounce: function(p){
var pow2,
bounce=4;
while(p <(( pow2=Math.pow(2, --bounce)) - 1) / 11){}
return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow(( pow2 * 3 - 2) / 22 - p, 2);
}});
$.each(baseEasings, function(name, easeIn){
$.easing[ "easeIn" + name ]=easeIn;
$.easing[ "easeOut" + name ]=function(p){
return 1 - easeIn(1 - p);
};
$.easing[ "easeInOut" + name ]=function(p){
return p < 0.5 ?
easeIn(p * 2) / 2 :
1 - easeIn(p * -2 + 2) / 2;
};});
})();
var effect=$.effects;
var effectsEffectBlind=$.effects.define("blind", "hide", function(options, done){
var map={
up: [ "bottom", "top" ],
vertical: [ "bottom", "top" ],
down: [ "top", "bottom" ],
left: [ "right", "left" ],
horizontal: [ "right", "left" ],
right: [ "left", "right" ]
},
element=$(this),
direction=options.direction||"up",
start=element.cssClip(),
animate={ clip: $.extend({}, start) },
placeholder=$.effects.createPlaceholder(element);
animate.clip[ map[ direction ][ 0 ] ]=animate.clip[ map[ direction ][ 1 ] ];
if(options.mode==="show"){
element.cssClip(animate.clip);
if(placeholder){
placeholder.css($.effects.clipToBox(animate));
}
animate.clip=start;
}
if(placeholder){
placeholder.animate($.effects.clipToBox(animate), options.duration, options.easing);
}
element.animate(animate, {
queue: false,
duration: options.duration,
easing: options.easing,
complete: done
});
});
var effectsEffectBounce=$.effects.define("bounce", function(options, done){
var upAnim, downAnim, refValue,
element=$(this),
mode=options.mode,
hide=mode==="hide",
show=mode==="show",
direction=options.direction||"up",
distance=options.distance,
times=options.times||5,
anims=times * 2 +(show||hide ? 1:0),
speed=options.duration / anims,
easing=options.easing,
ref=(direction==="up"||direction==="down") ? "top":"left",
motion=(direction==="up"||direction==="left"),
i=0,
queuelen=element.queue().length;
$.effects.createPlaceholder(element);
refValue=element.css(ref);
if(!distance){
distance=element[ ref==="top" ? "outerHeight":"outerWidth" ]() / 3;
}
if(show){
downAnim={ opacity: 1 };
downAnim[ ref ]=refValue;
element
.css("opacity", 0)
.css(ref, motion ? -distance * 2:distance * 2)
.animate(downAnim, speed, easing);
}
if(hide){
distance=distance / Math.pow(2, times - 1);
}
downAnim={};
downAnim[ ref ]=refValue;
for(; i < times; i++){
upAnim={};
upAnim[ ref ]=(motion ? "-=":"+=") + distance;
element
.animate(upAnim, speed, easing)
.animate(downAnim, speed, easing);
distance=hide ? distance * 2:distance / 2;
}
if(hide){
upAnim={ opacity: 0 };
upAnim[ ref ]=(motion ? "-=":"+=") + distance;
element.animate(upAnim, speed, easing);
}
element.queue(done);
$.effects.unshift(element, queuelen, anims + 1);
});
var effectsEffectClip=$.effects.define("clip", "hide", function(options, done){
var start,
animate={},
element=$(this),
direction=options.direction||"vertical",
both=direction==="both",
horizontal=both||direction==="horizontal",
vertical=both||direction==="vertical";
start=element.cssClip();
animate.clip={
top: vertical ?(start.bottom - start.top) / 2:start.top,
right: horizontal ?(start.right - start.left) / 2:start.right,
bottom: vertical ?(start.bottom - start.top) / 2:start.bottom,
left: horizontal ?(start.right - start.left) / 2:start.left
};
$.effects.createPlaceholder(element);
if(options.mode==="show"){
element.cssClip(animate.clip);
animate.clip=start;
}
element.animate(animate, {
queue: false,
duration: options.duration,
easing: options.easing,
complete: done
});
});
var effectsEffectDrop=$.effects.define("drop", "hide", function(options, done){
var distance,
element=$(this),
mode=options.mode,
show=mode==="show",
direction=options.direction||"left",
ref=(direction==="up"||direction==="down") ? "top":"left",
motion=(direction==="up"||direction==="left") ? "-=":"+=",
oppositeMotion=(motion==="+=") ? "-=":"+=",
animation={
opacity: 0
};
$.effects.createPlaceholder(element);
distance=options.distance ||
element[ ref==="top" ? "outerHeight":"outerWidth" ](true) / 2;
animation[ ref ]=motion + distance;
if(show){
element.css(animation);
animation[ ref ]=oppositeMotion + distance;
animation.opacity=1;
}
element.animate(animation, {
queue: false,
duration: options.duration,
easing: options.easing,
complete: done
});
});
var effectsEffectExplode=$.effects.define("explode", "hide", function(options, done){
var i, j, left, top, mx, my,
rows=options.pieces ? Math.round(Math.sqrt(options.pieces)):3,
cells=rows,
element=$(this),
mode=options.mode,
show=mode==="show",
offset=element.show().css("visibility", "hidden").offset(),
width=Math.ceil(element.outerWidth() / cells),
height=Math.ceil(element.outerHeight() / rows),
pieces=[];
function childComplete(){
pieces.push(this);
if(pieces.length===rows * cells){
animComplete();
}}
for(i=0; i < rows; i++){
top=offset.top + i * height;
my=i -(rows - 1) / 2;
for(j=0; j < cells; j++){
left=offset.left + j * width;
mx=j -(cells - 1) / 2;
element
.clone()
.appendTo("body")
.wrap("<div></div>")
.css({
position: "absolute",
visibility: "visible",
left: -j * width,
top: -i * height
})
.parent()
.addClass("ui-effects-explode")
.css({
position: "absolute",
overflow: "hidden",
width: width,
height: height,
left: left +(show ? mx * width:0),
top: top +(show ? my * height:0),
opacity: show ? 0:1
})
.animate({
left: left +(show ? 0:mx * width),
top: top +(show ? 0:my * height),
opacity: show ? 1:0
}, options.duration||500, options.easing, childComplete);
}}
function animComplete(){
element.css({
visibility: "visible"
});
$(pieces).remove();
done();
}});
var effectsEffectFade=$.effects.define("fade", "toggle", function(options, done){
var show=options.mode==="show";
$(this)
.css("opacity", show ? 0:1)
.animate({
opacity: show ? 1:0
}, {
queue: false,
duration: options.duration,
easing: options.easing,
complete: done
});
});
var effectsEffectFold=$.effects.define("fold", "hide", function(options, done){
var element=$(this),
mode=options.mode,
show=mode==="show",
hide=mode==="hide",
size=options.size||15,
percent=/([0-9]+)%/.exec(size),
horizFirst = !!options.horizFirst,
ref=horizFirst ? [ "right", "bottom" ]:[ "bottom", "right" ],
duration=options.duration / 2,
placeholder=$.effects.createPlaceholder(element),
start=element.cssClip(),
animation1={ clip: $.extend({}, start) },
animation2={ clip: $.extend({}, start) },
distance=[ start[ ref[ 0 ] ], start[ ref[ 1 ] ] ],
queuelen=element.queue().length;
if(percent){
size=parseInt(percent[ 1 ], 10) / 100 * distance[ hide ? 0:1 ];
}
animation1.clip[ ref[ 0 ] ]=size;
animation2.clip[ ref[ 0 ] ]=size;
animation2.clip[ ref[ 1 ] ]=0;
if(show){
element.cssClip(animation2.clip);
if(placeholder){
placeholder.css($.effects.clipToBox(animation2));
}
animation2.clip=start;
}
element
.queue(function(next){
if(placeholder){
placeholder
.animate($.effects.clipToBox(animation1), duration, options.easing)
.animate($.effects.clipToBox(animation2), duration, options.easing);
}
next();
})
.animate(animation1, duration, options.easing)
.animate(animation2, duration, options.easing)
.queue(done);
$.effects.unshift(element, queuelen, 4);
});
var effectsEffectHighlight=$.effects.define("highlight", "show", function(options, done){
var element=$(this),
animation={
backgroundColor: element.css("backgroundColor")
};
if(options.mode==="hide"){
animation.opacity=0;
}
$.effects.saveStyle(element);
element
.css({
backgroundImage: "none",
backgroundColor: options.color||"#ffff99"
})
.animate(animation, {
queue: false,
duration: options.duration,
easing: options.easing,
complete: done
});
});
var effectsEffectSize=$.effects.define("size", function(options, done){
var baseline, factor, temp,
element=$(this),
cProps=[ "fontSize" ],
vProps=[ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ],
hProps=[ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ],
mode=options.mode,
restore=mode!=="effect",
scale=options.scale||"both",
origin=options.origin||[ "middle", "center" ],
position=element.css("position"),
pos=element.position(),
original=$.effects.scaledDimensions(element),
from=options.from||original,
to=options.to||$.effects.scaledDimensions(element, 0);
$.effects.createPlaceholder(element);
if(mode==="show"){
temp=from;
from=to;
to=temp;
}
factor={
from: {
y: from.height / original.height,
x: from.width / original.width
},
to: {
y: to.height / original.height,
x: to.width / original.width
}};
if(scale==="box"||scale==="both"){
if(factor.from.y!==factor.to.y){
from=$.effects.setTransition(element, vProps, factor.from.y, from);
to=$.effects.setTransition(element, vProps, factor.to.y, to);
}
if(factor.from.x!==factor.to.x){
from=$.effects.setTransition(element, hProps, factor.from.x, from);
to=$.effects.setTransition(element, hProps, factor.to.x, to);
}}
if(scale==="content"||scale==="both"){
if(factor.from.y!==factor.to.y){
from=$.effects.setTransition(element, cProps, factor.from.y, from);
to=$.effects.setTransition(element, cProps, factor.to.y, to);
}}
if(origin){
baseline=$.effects.getBaseline(origin, original);
from.top=(original.outerHeight - from.outerHeight) * baseline.y + pos.top;
from.left=(original.outerWidth - from.outerWidth) * baseline.x + pos.left;
to.top=(original.outerHeight - to.outerHeight) * baseline.y + pos.top;
to.left=(original.outerWidth - to.outerWidth) * baseline.x + pos.left;
}
element.css(from);
if(scale==="content"||scale==="both"){
vProps=vProps.concat([ "marginTop", "marginBottom" ]).concat(cProps);
hProps=hProps.concat([ "marginLeft", "marginRight" ]);
element.find("*[width]").each(function(){
var child=$(this),
childOriginal=$.effects.scaledDimensions(child),
childFrom={
height: childOriginal.height * factor.from.y,
width: childOriginal.width * factor.from.x,
outerHeight: childOriginal.outerHeight * factor.from.y,
outerWidth: childOriginal.outerWidth * factor.from.x
},
childTo={
height: childOriginal.height * factor.to.y,
width: childOriginal.width * factor.to.x,
outerHeight: childOriginal.height * factor.to.y,
outerWidth: childOriginal.width * factor.to.x
};
if(factor.from.y!==factor.to.y){
childFrom=$.effects.setTransition(child, vProps, factor.from.y, childFrom);
childTo=$.effects.setTransition(child, vProps, factor.to.y, childTo);
}
if(factor.from.x!==factor.to.x){
childFrom=$.effects.setTransition(child, hProps, factor.from.x, childFrom);
childTo=$.effects.setTransition(child, hProps, factor.to.x, childTo);
}
if(restore){
$.effects.saveStyle(child);
}
child.css(childFrom);
child.animate(childTo, options.duration, options.easing, function(){
if(restore){
$.effects.restoreStyle(child);
}});
});
}
element.animate(to, {
queue: false,
duration: options.duration,
easing: options.easing,
complete: function(){
var offset=element.offset();
if(to.opacity===0){
element.css("opacity", from.opacity);
}
if(!restore){
element
.css("position", position==="static" ? "relative":position)
.offset(offset);
$.effects.saveStyle(element);
}
done();
}});
});
var effectsEffectScale=$.effects.define("scale", function(options, done){
var el=$(this),
mode=options.mode,
percent=parseInt(options.percent, 10) ||
(parseInt(options.percent, 10)===0 ? 0:(mode!=="effect" ? 0:100)),
newOptions=$.extend(true, {
from: $.effects.scaledDimensions(el),
to: $.effects.scaledDimensions(el, percent, options.direction||"both"),
origin: options.origin||[ "middle", "center" ]
}, options);
if(options.fade){
newOptions.from.opacity=1;
newOptions.to.opacity=0;
}
$.effects.effect.size.call(this, newOptions, done);
});
var effectsEffectPuff=$.effects.define("puff", "hide", function(options, done){
var newOptions=$.extend(true, {}, options, {
fade: true,
percent: parseInt(options.percent, 10)||150
});
$.effects.effect.scale.call(this, newOptions, done);
});
var effectsEffectPulsate=$.effects.define("pulsate", "show", function(options, done){
var element=$(this),
mode=options.mode,
show=mode==="show",
hide=mode==="hide",
showhide=show||hide,
anims=(( options.times||5) * 2) +(showhide ? 1:0),
duration=options.duration / anims,
animateTo=0,
i=1,
queuelen=element.queue().length;
if(show||!element.is(":visible")){
element.css("opacity", 0).show();
animateTo=1;
}
for(; i < anims; i++){
element.animate({ opacity: animateTo }, duration, options.easing);
animateTo=1 - animateTo;
}
element.animate({ opacity: animateTo }, duration, options.easing);
element.queue(done);
$.effects.unshift(element, queuelen, anims + 1);
});
var effectsEffectShake=$.effects.define("shake", function(options, done){
var i=1,
element=$(this),
direction=options.direction||"left",
distance=options.distance||20,
times=options.times||3,
anims=times * 2 + 1,
speed=Math.round(options.duration / anims),
ref=(direction==="up"||direction==="down") ? "top":"left",
positiveMotion=(direction==="up"||direction==="left"),
animation={},
animation1={},
animation2={},
queuelen=element.queue().length;
$.effects.createPlaceholder(element);
animation[ ref ]=(positiveMotion ? "-=":"+=") + distance;
animation1[ ref ]=(positiveMotion ? "+=":"-=") + distance * 2;
animation2[ ref ]=(positiveMotion ? "-=":"+=") + distance * 2;
element.animate(animation, speed, options.easing);
for(; i < times; i++){
element
.animate(animation1, speed, options.easing)
.animate(animation2, speed, options.easing);
}
element
.animate(animation1, speed, options.easing)
.animate(animation, speed / 2, options.easing)
.queue(done);
$.effects.unshift(element, queuelen, anims + 1);
});
var effectsEffectSlide=$.effects.define("slide", "show", function(options, done){
var startClip, startRef,
element=$(this),
map={
up: [ "bottom", "top" ],
down: [ "top", "bottom" ],
left: [ "right", "left" ],
right: [ "left", "right" ]
},
mode=options.mode,
direction=options.direction||"left",
ref=(direction==="up"||direction==="down") ? "top":"left",
positiveMotion=(direction==="up"||direction==="left"),
distance=options.distance ||
element[ ref==="top" ? "outerHeight":"outerWidth" ](true),
animation={};
$.effects.createPlaceholder(element);
startClip=element.cssClip();
startRef=element.position()[ ref ];
animation[ ref ]=(positiveMotion ? -1:1) * distance + startRef;
animation.clip=element.cssClip();
animation.clip[ map[ direction ][ 1 ] ]=animation.clip[ map[ direction ][ 0 ] ];
if(mode==="show"){
element.cssClip(animation.clip);
element.css(ref, animation[ ref ]);
animation.clip=startClip;
animation[ ref ]=startRef;
}
element.animate(animation, {
queue: false,
duration: options.duration,
easing: options.easing,
complete: done
});
});
var effect;
if($.uiBackCompat!==false){
effect=$.effects.define("transfer", function(options, done){
$(this).transfer(options, done);
});
}
var effectsEffectTransfer=effect;
$.ui.focusable=function(element, hasTabindex){
var map, mapName, img, focusableIfVisible, fieldset,
nodeName=element.nodeName.toLowerCase();
if("area"===nodeName){
map=element.parentNode;
mapName=map.name;
if(!element.href||!mapName||map.nodeName.toLowerCase()!=="map"){
return false;
}
img=$("img[usemap='#" + mapName + "']");
return img.length > 0&&img.is(":visible");
}
if(/^(input|select|textarea|button|object)$/.test(nodeName)){
focusableIfVisible = !element.disabled;
if(focusableIfVisible){
fieldset=$(element).closest("fieldset")[ 0 ];
if(fieldset){
focusableIfVisible = !fieldset.disabled;
}}
}else if("a"===nodeName){
focusableIfVisible=element.href||hasTabindex;
}else{
focusableIfVisible=hasTabindex;
}
return focusableIfVisible&&$(element).is(":visible")&&visible($(element));
};
function visible(element){
var visibility=element.css("visibility");
while(visibility==="inherit"){
element=element.parent();
visibility=element.css("visibility");
}
return visibility!=="hidden";
}
$.extend($.expr[ ":" ], {
focusable: function(element){
return $.ui.focusable(element, $.attr(element, "tabindex")!=null);
}});
var focusable=$.ui.focusable;
var form=$.fn.form=function(){
return typeof this[ 0 ].form==="string" ? this.closest("form"):$(this[ 0 ].form);
};
var formResetMixin=$.ui.formResetMixin={
_formResetHandler: function(){
var form=$(this);
setTimeout(function(){
var instances=form.data("ui-form-reset-instances");
$.each(instances, function(){
this.refresh();
});
});
},
_bindFormResetHandler: function(){
this.form=this.element.form();
if(!this.form.length){
return;
}
var instances=this.form.data("ui-form-reset-instances")||[];
if(!instances.length){
this.form.on("reset.ui-form-reset", this._formResetHandler);
}
instances.push(this);
this.form.data("ui-form-reset-instances", instances);
},
_unbindFormResetHandler: function(){
if(!this.form.length){
return;
}
var instances=this.form.data("ui-form-reset-instances");
instances.splice($.inArray(this, instances), 1);
if(instances.length){
this.form.data("ui-form-reset-instances", instances);
}else{
this.form
.removeData("ui-form-reset-instances")
.off("reset.ui-form-reset");
}}
};
if($.fn.jquery.substring(0, 3)==="1.7"){
$.each([ "Width", "Height" ], function(i, name){
var side=name==="Width" ? [ "Left", "Right" ]:[ "Top", "Bottom" ],
type=name.toLowerCase(),
orig={
innerWidth: $.fn.innerWidth,
innerHeight: $.fn.innerHeight,
outerWidth: $.fn.outerWidth,
outerHeight: $.fn.outerHeight
};
function reduce(elem, size, border, margin){
$.each(side, function(){
size -=parseFloat($.css(elem, "padding" + this))||0;
if(border){
size -=parseFloat($.css(elem, "border" + this + "Width"))||0;
}
if(margin){
size -=parseFloat($.css(elem, "margin" + this))||0;
}});
return size;
}
$.fn[ "inner" + name ]=function(size){
if(size===undefined){
return orig[ "inner" + name ].call(this);
}
return this.each(function(){
$(this).css(type, reduce(this, size) + "px");
});
};
$.fn[ "outer" + name ]=function(size, margin){
if(typeof size!=="number"){
return orig[ "outer" + name ].call(this, size);
}
return this.each(function(){
$(this).css(type, reduce(this, size, true, margin) + "px");
});
};});
$.fn.addBack=function(selector){
return this.add(selector==null ?
this.prevObject:this.prevObject.filter(selector)
);
};}
;
var keycode=$.ui.keyCode={
BACKSPACE: 8,
COMMA: 188,
DELETE: 46,
DOWN: 40,
END: 35,
ENTER: 13,
ESCAPE: 27,
HOME: 36,
LEFT: 37,
PAGE_DOWN: 34,
PAGE_UP: 33,
PERIOD: 190,
RIGHT: 39,
SPACE: 32,
TAB: 9,
UP: 38
};
var escapeSelector=$.ui.escapeSelector=(function(){
var selectorEscape=/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
return function(selector){
return selector.replace(selectorEscape, "\\$1");
};})();
var labels=$.fn.labels=function(){
var ancestor, selector, id, labels, ancestors;
if(this[ 0 ].labels&&this[ 0 ].labels.length){
return this.pushStack(this[ 0 ].labels);
}
labels=this.eq(0).parents("label");
id=this.attr("id");
if(id){
ancestor=this.eq(0).parents().last();
ancestors=ancestor.add(ancestor.length ? ancestor.siblings():this.siblings());
selector="label[for='" + $.ui.escapeSelector(id) + "']";
labels=labels.add(ancestors.find(selector).addBack(selector));
}
return this.pushStack(labels);
};
var scrollParent=$.fn.scrollParent=function(includeHidden){
var position=this.css("position"),
excludeStaticParent=position==="absolute",
overflowRegex=includeHidden ? /(auto|scroll|hidden)/:/(auto|scroll)/,
scrollParent=this.parents().filter(function(){
var parent=$(this);
if(excludeStaticParent&&parent.css("position")==="static"){
return false;
}
return overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") +
parent.css("overflow-x"));
}).eq(0);
return position==="fixed"||!scrollParent.length ?
$(this[ 0 ].ownerDocument||document) :
scrollParent;
};
var tabbable=$.extend($.expr[ ":" ], {
tabbable: function(element){
var tabIndex=$.attr(element, "tabindex"),
hasTabindex=tabIndex!=null;
return(!hasTabindex||tabIndex >=0)&&$.ui.focusable(element, hasTabindex);
}});
var uniqueId=$.fn.extend({
uniqueId:(function(){
var uuid=0;
return function(){
return this.each(function(){
if(!this.id){
this.id="ui-id-" + ( ++uuid);
}});
};})(),
removeUniqueId: function(){
return this.each(function(){
if(/^ui-id-\d+$/.test(this.id)){
$(this).removeAttr("id");
}});
}});
var widgetsAccordion=$.widget("ui.accordion", {
version: "1.12.1",
options: {
active: 0,
animate: {},
classes: {
"ui-accordion-header": "ui-corner-top",
"ui-accordion-header-collapsed": "ui-corner-all",
"ui-accordion-content": "ui-corner-bottom"
},
collapsible: false,
event: "click",
header: "> li > :first-child, > :not(li):even",
heightStyle: "auto",
icons: {
activeHeader: "ui-icon-triangle-1-s",
header: "ui-icon-triangle-1-e"
},
activate: null,
beforeActivate: null
},
hideProps: {
borderTopWidth: "hide",
borderBottomWidth: "hide",
paddingTop: "hide",
paddingBottom: "hide",
height: "hide"
},
showProps: {
borderTopWidth: "show",
borderBottomWidth: "show",
paddingTop: "show",
paddingBottom: "show",
height: "show"
},
_create: function(){
var options=this.options;
this.prevShow=this.prevHide=$();
this._addClass("ui-accordion", "ui-widget ui-helper-reset");
this.element.attr("role", "tablist");
if(!options.collapsible&&(options.active===false||options.active==null)){
options.active=0;
}
this._processPanels();
if(options.active < 0){
options.active +=this.headers.length;
}
this._refresh();
},
_getCreateEventData: function(){
return {
header: this.active,
panel: !this.active.length ? $():this.active.next()
};},
_createIcons: function(){
var icon, children,
icons=this.options.icons;
if(icons){
icon=$("<span>");
this._addClass(icon, "ui-accordion-header-icon", "ui-icon " + icons.header);
icon.prependTo(this.headers);
children=this.active.children(".ui-accordion-header-icon");
this._removeClass(children, icons.header)
._addClass(children, null, icons.activeHeader)
._addClass(this.headers, "ui-accordion-icons");
}},
_destroyIcons: function(){
this._removeClass(this.headers, "ui-accordion-icons");
this.headers.children(".ui-accordion-header-icon").remove();
},
_destroy: function(){
var contents;
this.element.removeAttr("role");
this.headers
.removeAttr("role aria-expanded aria-selected aria-controls tabIndex")
.removeUniqueId();
this._destroyIcons();
contents=this.headers.next()
.css("display", "")
.removeAttr("role aria-hidden aria-labelledby")
.removeUniqueId();
if(this.options.heightStyle!=="content"){
contents.css("height", "");
}},
_setOption: function(key, value){
if(key==="active"){
this._activate(value);
return;
}
if(key==="event"){
if(this.options.event){
this._off(this.headers, this.options.event);
}
this._setupEvents(value);
}
this._super(key, value);
if(key==="collapsible"&&!value&&this.options.active===false){
this._activate(0);
}
if(key==="icons"){
this._destroyIcons();
if(value){
this._createIcons();
}}
},
_setOptionDisabled: function(value){
this._super(value);
this.element.attr("aria-disabled", value);
this._toggleClass(null, "ui-state-disabled", !!value);
this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled",
!!value);
},
_keydown: function(event){
if(event.altKey||event.ctrlKey){
return;
}
var keyCode=$.ui.keyCode,
length=this.headers.length,
currentIndex=this.headers.index(event.target),
toFocus=false;
switch(event.keyCode){
case keyCode.RIGHT:
case keyCode.DOWN:
toFocus=this.headers[(currentIndex + 1) % length ];
break;
case keyCode.LEFT:
case keyCode.UP:
toFocus=this.headers[(currentIndex - 1 + length) % length ];
break;
case keyCode.SPACE:
case keyCode.ENTER:
this._eventHandler(event);
break;
case keyCode.HOME:
toFocus=this.headers[ 0 ];
break;
case keyCode.END:
toFocus=this.headers[ length - 1 ];
break;
}
if(toFocus){
$(event.target).attr("tabIndex", -1);
$(toFocus).attr("tabIndex", 0);
$(toFocus).trigger("focus");
event.preventDefault();
}},
_panelKeyDown: function(event){
if(event.keyCode===$.ui.keyCode.UP&&event.ctrlKey){
$(event.currentTarget).prev().trigger("focus");
}},
refresh: function(){
var options=this.options;
this._processPanels();
if(( options.active===false&&options.collapsible===true) ||
!this.headers.length){
options.active=false;
this.active=$();
}else if(options.active===false){
this._activate(0);
}else if(this.active.length&&!$.contains(this.element[ 0 ], this.active[ 0 ])){
if(this.headers.length===this.headers.find(".ui-state-disabled").length){
options.active=false;
this.active=$();
}else{
this._activate(Math.max(0, options.active - 1));
}}else{
options.active=this.headers.index(this.active);
}
this._destroyIcons();
this._refresh();
},
_processPanels: function(){
var prevHeaders=this.headers,
prevPanels=this.panels;
this.headers=this.element.find(this.options.header);
this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed",
"ui-state-default");
this.panels=this.headers.next().filter(":not(.ui-accordion-content-active)").hide();
this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content");
if(prevPanels){
this._off(prevHeaders.not(this.headers));
this._off(prevPanels.not(this.panels));
}},
_refresh: function(){
var maxHeight,
options=this.options,
heightStyle=options.heightStyle,
parent=this.element.parent();
this.active=this._findActive(options.active);
this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")
._removeClass(this.active, "ui-accordion-header-collapsed");
this._addClass(this.active.next(), "ui-accordion-content-active");
this.active.next().show();
this.headers
.attr("role", "tab")
.each(function(){
var header=$(this),
headerId=header.uniqueId().attr("id"),
panel=header.next(),
panelId=panel.uniqueId().attr("id");
header.attr("aria-controls", panelId);
panel.attr("aria-labelledby", headerId);
})
.next()
.attr("role", "tabpanel");
this.headers
.not(this.active)
.attr({
"aria-selected": "false",
"aria-expanded": "false",
tabIndex: -1
})
.next()
.attr({
"aria-hidden": "true"
})
.hide();
if(!this.active.length){
this.headers.eq(0).attr("tabIndex", 0);
}else{
this.active.attr({
"aria-selected": "true",
"aria-expanded": "true",
tabIndex: 0
})
.next()
.attr({
"aria-hidden": "false"
});
}
this._createIcons();
this._setupEvents(options.event);
if(heightStyle==="fill"){
maxHeight=parent.height();
this.element.siblings(":visible").each(function(){
var elem=$(this),
position=elem.css("position");
if(position==="absolute"||position==="fixed"){
return;
}
maxHeight -=elem.outerHeight(true);
});
this.headers.each(function(){
maxHeight -=$(this).outerHeight(true);
});
this.headers.next()
.each(function(){
$(this).height(Math.max(0, maxHeight -
$(this).innerHeight() + $(this).height()));
})
.css("overflow", "auto");
}else if(heightStyle==="auto"){
maxHeight=0;
this.headers.next()
.each(function(){
var isVisible=$(this).is(":visible");
if(!isVisible){
$(this).show();
}
maxHeight=Math.max(maxHeight, $(this).css("height", "").height());
if(!isVisible){
$(this).hide();
}})
.height(maxHeight);
}},
_activate: function(index){
var active=this._findActive(index)[ 0 ];
if(active===this.active[ 0 ]){
return;
}
active=active||this.active[ 0 ];
this._eventHandler({
target: active,
currentTarget: active,
preventDefault: $.noop
});
},
_findActive: function(selector){
return typeof selector==="number" ? this.headers.eq(selector):$();
},
_setupEvents: function(event){
var events={
keydown: "_keydown"
};
if(event){
$.each(event.split(" "), function(index, eventName){
events[ eventName ]="_eventHandler";
});
}
this._off(this.headers.add(this.headers.next()));
this._on(this.headers, events);
this._on(this.headers.next(), { keydown: "_panelKeyDown" });
this._hoverable(this.headers);
this._focusable(this.headers);
},
_eventHandler: function(event){
var activeChildren, clickedChildren,
options=this.options,
active=this.active,
clicked=$(event.currentTarget),
clickedIsActive=clicked[ 0 ]===active[ 0 ],
collapsing=clickedIsActive&&options.collapsible,
toShow=collapsing ? $():clicked.next(),
toHide=active.next(),
eventData={
oldHeader: active,
oldPanel: toHide,
newHeader: collapsing ? $():clicked,
newPanel: toShow
};
event.preventDefault();
if((clickedIsActive&&!options.collapsible) ||
(this._trigger("beforeActivate", event, eventData)===false)){
return;
}
options.active=collapsing ? false:this.headers.index(clicked);
this.active=clickedIsActive ? $():clicked;
this._toggle(eventData);
this._removeClass(active, "ui-accordion-header-active", "ui-state-active");
if(options.icons){
activeChildren=active.children(".ui-accordion-header-icon");
this._removeClass(activeChildren, null, options.icons.activeHeader)
._addClass(activeChildren, null, options.icons.header);
}
if(!clickedIsActive){
this._removeClass(clicked, "ui-accordion-header-collapsed")
._addClass(clicked, "ui-accordion-header-active", "ui-state-active");
if(options.icons){
clickedChildren=clicked.children(".ui-accordion-header-icon");
this._removeClass(clickedChildren, null, options.icons.header)
._addClass(clickedChildren, null, options.icons.activeHeader);
}
this._addClass(clicked.next(), "ui-accordion-content-active");
}},
_toggle: function(data){
var toShow=data.newPanel,
toHide=this.prevShow.length ? this.prevShow:data.oldPanel;
this.prevShow.add(this.prevHide).stop(true, true);
this.prevShow=toShow;
this.prevHide=toHide;
if(this.options.animate){
this._animate(toShow, toHide, data);
}else{
toHide.hide();
toShow.show();
this._toggleComplete(data);
}
toHide.attr({
"aria-hidden": "true"
});
toHide.prev().attr({
"aria-selected": "false",
"aria-expanded": "false"
});
if(toShow.length&&toHide.length){
toHide.prev().attr({
"tabIndex": -1,
"aria-expanded": "false"
});
}else if(toShow.length){
this.headers.filter(function(){
return parseInt($(this).attr("tabIndex"), 10)===0;
})
.attr("tabIndex", -1);
}
toShow
.attr("aria-hidden", "false")
.prev()
.attr({
"aria-selected": "true",
"aria-expanded": "true",
tabIndex: 0
});
},
_animate: function(toShow, toHide, data){
var total, easing, duration,
that=this,
adjust=0,
boxSizing=toShow.css("box-sizing"),
down=toShow.length &&
(!toHide.length||(toShow.index() < toHide.index())),
animate=this.options.animate||{},
options=down&&animate.down||animate,
complete=function(){
that._toggleComplete(data);
};
if(typeof options==="number"){
duration=options;
}
if(typeof options==="string"){
easing=options;
}
easing=easing||options.easing||animate.easing;
duration=duration||options.duration||animate.duration;
if(!toHide.length){
return toShow.animate(this.showProps, duration, easing, complete);
}
if(!toShow.length){
return toHide.animate(this.hideProps, duration, easing, complete);
}
total=toShow.show().outerHeight();
toHide.animate(this.hideProps, {
duration: duration,
easing: easing,
step: function(now, fx){
fx.now=Math.round(now);
}});
toShow
.hide()
.animate(this.showProps, {
duration: duration,
easing: easing,
complete: complete,
step: function(now, fx){
fx.now=Math.round(now);
if(fx.prop!=="height"){
if(boxSizing==="content-box"){
adjust +=fx.now;
}}else if(that.options.heightStyle!=="content"){
fx.now=Math.round(total - toHide.outerHeight() - adjust);
adjust=0;
}}
});
},
_toggleComplete: function(data){
var toHide=data.oldPanel,
prev=toHide.prev();
this._removeClass(toHide, "ui-accordion-content-active");
this._removeClass(prev, "ui-accordion-header-active")
._addClass(prev, "ui-accordion-header-collapsed");
if(toHide.length){
toHide.parent()[ 0 ].className=toHide.parent()[ 0 ].className;
}
this._trigger("activate", null, data);
}});
var safeActiveElement=$.ui.safeActiveElement=function(document){
var activeElement;
try {
activeElement=document.activeElement;
} catch(error){
activeElement=document.body;
}
if(!activeElement){
activeElement=document.body;
}
if(!activeElement.nodeName){
activeElement=document.body;
}
return activeElement;
};
var widgetsMenu=$.widget("ui.menu", {
version: "1.12.1",
defaultElement: "<ul>",
delay: 300,
options: {
icons: {
submenu: "ui-icon-caret-1-e"
},
items: "> *",
menus: "ul",
position: {
my: "left top",
at: "right top"
},
role: "menu",
blur: null,
focus: null,
select: null
},
_create: function(){
this.activeMenu=this.element;
this.mouseHandled=false;
this.element
.uniqueId()
.attr({
role: this.options.role,
tabIndex: 0
});
this._addClass("ui-menu", "ui-widget ui-widget-content");
this._on({
"mousedown .ui-menu-item": function(event){
event.preventDefault();
},
"click .ui-menu-item": function(event){
var target=$(event.target);
var active=$($.ui.safeActiveElement(this.document[ 0 ]));
if(!this.mouseHandled&&target.not(".ui-state-disabled").length){
this.select(event);
if(!event.isPropagationStopped()){
this.mouseHandled=true;
}
if(target.has(".ui-menu").length){
this.expand (event);
}else if(!this.element.is(":focus") &&
active.closest(".ui-menu").length){
this.element.trigger("focus", [ true ]);
if(this.active&&this.active.parents(".ui-menu").length===1){
clearTimeout(this.timer);
}}
}},
"mouseenter .ui-menu-item": function(event){
if(this.previousFilter){
return;
}
var actualTarget=$(event.target).closest(".ui-menu-item"),
target=$(event.currentTarget);
if(actualTarget[ 0 ]!==target[ 0 ]){
return;
}
this._removeClass(target.siblings().children(".ui-state-active"),
null, "ui-state-active");
this.focus(event, target);
},
mouseleave: "collapseAll",
"mouseleave .ui-menu": "collapseAll",
focus: function(event, keepActiveItem){
var item=this.active||this.element.find(this.options.items).eq(0);
if(!keepActiveItem){
this.focus(event, item);
}},
blur: function(event){
this._delay(function(){
var notContained = !$.contains(this.element[ 0 ],
$.ui.safeActiveElement(this.document[ 0 ])
);
if(notContained){
this.collapseAll(event);
}});
},
keydown: "_keydown"
});
this.refresh();
this._on(this.document, {
click: function(event){
if(this._closeOnDocumentClick(event)){
this.collapseAll(event);
}
this.mouseHandled=false;
}});
},
_destroy: function(){
var items=this.element.find(".ui-menu-item")
.removeAttr("role aria-disabled"),
submenus=items.children(".ui-menu-item-wrapper")
.removeUniqueId()
.removeAttr("tabIndex role aria-haspopup");
this.element
.removeAttr("aria-activedescendant")
.find(".ui-menu").addBack()
.removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled " +
"tabIndex")
.removeUniqueId()
.show();
submenus.children().each(function(){
var elem=$(this);
if(elem.data("ui-menu-submenu-caret")){
elem.remove();
}});
},
_keydown: function(event){
var match, prev, character, skip,
preventDefault=true;
switch(event.keyCode){
case $.ui.keyCode.PAGE_UP:
this.previousPage(event);
break;
case $.ui.keyCode.PAGE_DOWN:
this.nextPage(event);
break;
case $.ui.keyCode.HOME:
this._move("first", "first", event);
break;
case $.ui.keyCode.END:
this._move("last", "last", event);
break;
case $.ui.keyCode.UP:
this.previous(event);
break;
case $.ui.keyCode.DOWN:
this.next(event);
break;
case $.ui.keyCode.LEFT:
this.collapse(event);
break;
case $.ui.keyCode.RIGHT:
if(this.active&&!this.active.is(".ui-state-disabled")){
this.expand (event);
}
break;
case $.ui.keyCode.ENTER:
case $.ui.keyCode.SPACE:
this._activate(event);
break;
case $.ui.keyCode.ESCAPE:
this.collapse(event);
break;
default:
preventDefault=false;
prev=this.previousFilter||"";
skip=false;
character=event.keyCode >=96&&event.keyCode <=105 ?
(event.keyCode - 96).toString():String.fromCharCode(event.keyCode);
clearTimeout(this.filterTimer);
if(character===prev){
skip=true;
}else{
character=prev + character;
}
match=this._filterMenuItems(character);
match=skip&&match.index(this.active.next())!==-1 ?
this.active.nextAll(".ui-menu-item") :
match;
if(!match.length){
character=String.fromCharCode(event.keyCode);
match=this._filterMenuItems(character);
}
if(match.length){
this.focus(event, match);
this.previousFilter=character;
this.filterTimer=this._delay(function(){
delete this.previousFilter;
}, 1000);
}else{
delete this.previousFilter;
}}
if(preventDefault){
event.preventDefault();
}},
_activate: function(event){
if(this.active&&!this.active.is(".ui-state-disabled")){
if(this.active.children("[aria-haspopup='true']").length){
this.expand (event);
}else{
this.select(event);
}}
},
refresh: function(){
var menus, items, newSubmenus, newItems, newWrappers,
that=this,
icon=this.options.icons.submenu,
submenus=this.element.find(this.options.menus);
this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length);
newSubmenus=submenus.filter(":not(.ui-menu)")
.hide()
.attr({
role: this.options.role,
"aria-hidden": "true",
"aria-expanded": "false"
})
.each(function(){
var menu=$(this),
item=menu.prev(),
submenuCaret=$("<span>").data("ui-menu-submenu-caret", true);
that._addClass(submenuCaret, "ui-menu-icon", "ui-icon " + icon);
item
.attr("aria-haspopup", "true")
.prepend(submenuCaret);
menu.attr("aria-labelledby", item.attr("id"));
});
this._addClass(newSubmenus, "ui-menu", "ui-widget ui-widget-content ui-front");
menus=submenus.add(this.element);
items=menus.find(this.options.items);
items.not(".ui-menu-item").each(function(){
var item=$(this);
if(that._isDivider(item)){
that._addClass(item, "ui-menu-divider", "ui-widget-content");
}});
newItems=items.not(".ui-menu-item, .ui-menu-divider");
newWrappers=newItems.children()
.not(".ui-menu")
.uniqueId()
.attr({
tabIndex: -1,
role: this._itemRole()
});
this._addClass(newItems, "ui-menu-item")
._addClass(newWrappers, "ui-menu-item-wrapper");
items.filter(".ui-state-disabled").attr("aria-disabled", "true");
if(this.active&&!$.contains(this.element[ 0 ], this.active[ 0 ])){
this.blur();
}},
_itemRole: function(){
return {
menu: "menuitem",
listbox: "option"
}[ this.options.role ];
},
_setOption: function(key, value){
if(key==="icons"){
var icons=this.element.find(".ui-menu-icon");
this._removeClass(icons, null, this.options.icons.submenu)
._addClass(icons, null, value.submenu);
}
this._super(key, value);
},
_setOptionDisabled: function(value){
this._super(value);
this.element.attr("aria-disabled", String(value));
this._toggleClass(null, "ui-state-disabled", !!value);
},
focus: function(event, item){
var nested, focused, activeParent;
this.blur(event, event&&event.type==="focus");
this._scrollIntoView(item);
this.active=item.first();
focused=this.active.children(".ui-menu-item-wrapper");
this._addClass(focused, null, "ui-state-active");
if(this.options.role){
this.element.attr("aria-activedescendant", focused.attr("id"));
}
activeParent=this.active
.parent()
.closest(".ui-menu-item")
.children(".ui-menu-item-wrapper");
this._addClass(activeParent, null, "ui-state-active");
if(event&&event.type==="keydown"){
this._close();
}else{
this.timer=this._delay(function(){
this._close();
}, this.delay);
}
nested=item.children(".ui-menu");
if(nested.length&&event&&(/^mouse/.test(event.type))){
this._startOpening(nested);
}
this.activeMenu=item.parent();
this._trigger("focus", event, { item: item });
},
_scrollIntoView: function(item){
var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
if(this._hasScroll()){
borderTop=parseFloat($.css(this.activeMenu[ 0 ], "borderTopWidth"))||0;
paddingTop=parseFloat($.css(this.activeMenu[ 0 ], "paddingTop"))||0;
offset=item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;
scroll=this.activeMenu.scrollTop();
elementHeight=this.activeMenu.height();
itemHeight=item.outerHeight();
if(offset < 0){
this.activeMenu.scrollTop(scroll + offset);
}else if(offset + itemHeight > elementHeight){
this.activeMenu.scrollTop(scroll + offset - elementHeight + itemHeight);
}}
},
blur: function(event, fromFocus){
if(!fromFocus){
clearTimeout(this.timer);
}
if(!this.active){
return;
}
this._removeClass(this.active.children(".ui-menu-item-wrapper"),
null, "ui-state-active");
this._trigger("blur", event, { item: this.active });
this.active=null;
},
_startOpening: function(submenu){
clearTimeout(this.timer);
if(submenu.attr("aria-hidden")!=="true"){
return;
}
this.timer=this._delay(function(){
this._close();
this._open(submenu);
}, this.delay);
},
_open: function(submenu){
var position=$.extend({
of: this.active
}, this.options.position);
clearTimeout(this.timer);
this.element.find(".ui-menu").not(submenu.parents(".ui-menu"))
.hide()
.attr("aria-hidden", "true");
submenu
.show()
.removeAttr("aria-hidden")
.attr("aria-expanded", "true")
.position(position);
},
collapseAll: function(event, all){
clearTimeout(this.timer);
this.timer=this._delay(function(){
var currentMenu=all ? this.element :
$(event&&event.target).closest(this.element.find(".ui-menu"));
if(!currentMenu.length){
currentMenu=this.element;
}
this._close(currentMenu);
this.blur(event);
this._removeClass(currentMenu.find(".ui-state-active"), null, "ui-state-active");
this.activeMenu=currentMenu;
}, this.delay);
},
_close: function(startMenu){
if(!startMenu){
startMenu=this.active ? this.active.parent():this.element;
}
startMenu.find(".ui-menu")
.hide()
.attr("aria-hidden", "true")
.attr("aria-expanded", "false");
},
_closeOnDocumentClick: function(event){
return !$(event.target).closest(".ui-menu").length;
},
_isDivider: function(item){
return !/[^\-\u2014\u2013\s]/.test(item.text());
},
collapse: function(event){
var newItem=this.active &&
this.active.parent().closest(".ui-menu-item", this.element);
if(newItem&&newItem.length){
this._close();
this.focus(event, newItem);
}},
expand: function(event){
var newItem=this.active &&
this.active
.children(".ui-menu ")
.find(this.options.items)
.first();
if(newItem&&newItem.length){
this._open(newItem.parent());
this._delay(function(){
this.focus(event, newItem);
});
}},
next: function(event){
this._move("next", "first", event);
},
previous: function(event){
this._move("prev", "last", event);
},
isFirstItem: function(){
return this.active&&!this.active.prevAll(".ui-menu-item").length;
},
isLastItem: function(){
return this.active&&!this.active.nextAll(".ui-menu-item").length;
},
_move: function(direction, filter, event){
var next;
if(this.active){
if(direction==="first"||direction==="last"){
next=this.active
[ direction==="first" ? "prevAll":"nextAll" ](".ui-menu-item")
.eq(-1);
}else{
next=this.active
[ direction + "All" ](".ui-menu-item")
.eq(0);
}}
if(!next||!next.length||!this.active){
next=this.activeMenu.find(this.options.items)[ filter ]();
}
this.focus(event, next);
},
nextPage: function(event){
var item, base, height;
if(!this.active){
this.next(event);
return;
}
if(this.isLastItem()){
return;
}
if(this._hasScroll()){
base=this.active.offset().top;
height=this.element.height();
this.active.nextAll(".ui-menu-item").each(function(){
item=$(this);
return item.offset().top - base - height < 0;
});
this.focus(event, item);
}else{
this.focus(event, this.activeMenu.find(this.options.items)
[ !this.active ? "first":"last" ]());
}},
previousPage: function(event){
var item, base, height;
if(!this.active){
this.next(event);
return;
}
if(this.isFirstItem()){
return;
}
if(this._hasScroll()){
base=this.active.offset().top;
height=this.element.height();
this.active.prevAll(".ui-menu-item").each(function(){
item=$(this);
return item.offset().top - base + height > 0;
});
this.focus(event, item);
}else{
this.focus(event, this.activeMenu.find(this.options.items).first());
}},
_hasScroll: function(){
return this.element.outerHeight() < this.element.prop("scrollHeight");
},
select: function(event){
this.active=this.active||$(event.target).closest(".ui-menu-item");
var ui={ item: this.active };
if(!this.active.has(".ui-menu").length){
this.collapseAll(event, true);
}
this._trigger("select", event, ui);
},
_filterMenuItems: function(character){
var escapedCharacter=character.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
regex=new RegExp("^" + escapedCharacter, "i");
return this.activeMenu
.find(this.options.items)
.filter(".ui-menu-item")
.filter(function(){
return regex.test($.trim($(this).children(".ui-menu-item-wrapper").text()));
});
}});
$.widget("ui.autocomplete", {
version: "1.12.1",
defaultElement: "<input>",
options: {
appendTo: null,
autoFocus: false,
delay: 300,
minLength: 1,
position: {
my: "left top",
at: "left bottom",
collision: "none"
},
source: null,
change: null,
close: null,
focus: null,
open: null,
response: null,
search: null,
select: null
},
requestIndex: 0,
pending: 0,
_create: function(){
var suppressKeyPress, suppressKeyPressRepeat, suppressInput,
nodeName=this.element[ 0 ].nodeName.toLowerCase(),
isTextarea=nodeName==="textarea",
isInput=nodeName==="input";
this.isMultiLine=isTextarea||!isInput&&this._isContentEditable(this.element);
this.valueMethod=this.element[ isTextarea||isInput ? "val":"text" ];
this.isNewMenu=true;
this._addClass("ui-autocomplete-input");
this.element.attr("autocomplete", "off");
this._on(this.element, {
keydown: function(event){
if(this.element.prop("readOnly")){
suppressKeyPress=true;
suppressInput=true;
suppressKeyPressRepeat=true;
return;
}
suppressKeyPress=false;
suppressInput=false;
suppressKeyPressRepeat=false;
var keyCode=$.ui.keyCode;
switch(event.keyCode){
case keyCode.PAGE_UP:
suppressKeyPress=true;
this._move("previousPage", event);
break;
case keyCode.PAGE_DOWN:
suppressKeyPress=true;
this._move("nextPage", event);
break;
case keyCode.UP:
suppressKeyPress=true;
this._keyEvent("previous", event);
break;
case keyCode.DOWN:
suppressKeyPress=true;
this._keyEvent("next", event);
break;
case keyCode.ENTER:
if(this.menu.active){
suppressKeyPress=true;
event.preventDefault();
this.menu.select(event);
}
break;
case keyCode.TAB:
if(this.menu.active){
this.menu.select(event);
}
break;
case keyCode.ESCAPE:
if(this.menu.element.is(":visible")){
if(!this.isMultiLine){
this._value(this.term);
}
this.close(event);
event.preventDefault();
}
break;
default:
suppressKeyPressRepeat=true;
this._searchTimeout(event);
break;
}},
keypress: function(event){
if(suppressKeyPress){
suppressKeyPress=false;
if(!this.isMultiLine||this.menu.element.is(":visible")){
event.preventDefault();
}
return;
}
if(suppressKeyPressRepeat){
return;
}
var keyCode=$.ui.keyCode;
switch(event.keyCode){
case keyCode.PAGE_UP:
this._move("previousPage", event);
break;
case keyCode.PAGE_DOWN:
this._move("nextPage", event);
break;
case keyCode.UP:
this._keyEvent("previous", event);
break;
case keyCode.DOWN:
this._keyEvent("next", event);
break;
}},
input: function(event){
if(suppressInput){
suppressInput=false;
event.preventDefault();
return;
}
this._searchTimeout(event);
},
focus: function(){
this.selectedItem=null;
this.previous=this._value();
},
blur: function(event){
if(this.cancelBlur){
delete this.cancelBlur;
return;
}
clearTimeout(this.searching);
this.close(event);
this._change(event);
}});
this._initSource();
this.menu=$("<ul>")
.appendTo(this._appendTo())
.menu({
role: null
})
.hide()
.menu("instance");
this._addClass(this.menu.element, "ui-autocomplete", "ui-front");
this._on(this.menu.element, {
mousedown: function(event){
event.preventDefault();
this.cancelBlur=true;
this._delay(function(){
delete this.cancelBlur;
if(this.element[ 0 ]!==$.ui.safeActiveElement(this.document[ 0 ])){
this.element.trigger("focus");
}});
},
menufocus: function(event, ui){
var label, item;
if(this.isNewMenu){
this.isNewMenu=false;
if(event.originalEvent&&/^mouse/.test(event.originalEvent.type)){
this.menu.blur();
this.document.one("mousemove", function(){
$(event.target).trigger(event.originalEvent);
});
return;
}}
item=ui.item.data("ui-autocomplete-item");
if(false!==this._trigger("focus", event, { item: item })){
if(event.originalEvent&&/^key/.test(event.originalEvent.type)){
this._value(item.value);
}}
label=ui.item.attr("aria-label")||item.value;
if(label&&$.trim(label).length){
this.liveRegion.children().hide();
$("<div>").text(label).appendTo(this.liveRegion);
}},
menuselect: function(event, ui){
var item=ui.item.data("ui-autocomplete-item"),
previous=this.previous;
if(this.element[ 0 ]!==$.ui.safeActiveElement(this.document[ 0 ])){
this.element.trigger("focus");
this.previous=previous;
this._delay(function(){
this.previous=previous;
this.selectedItem=item;
});
}
if(false!==this._trigger("select", event, { item: item })){
this._value(item.value);
}
this.term=this._value();
this.close(event);
this.selectedItem=item;
}});
this.liveRegion=$("<div>", {
role: "status",
"aria-live": "assertive",
"aria-relevant": "additions"
})
.appendTo(this.document[ 0 ].body);
this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible");
this._on(this.window, {
beforeunload: function(){
this.element.removeAttr("autocomplete");
}});
},
_destroy: function(){
clearTimeout(this.searching);
this.element.removeAttr("autocomplete");
this.menu.element.remove();
this.liveRegion.remove();
},
_setOption: function(key, value){
this._super(key, value);
if(key==="source"){
this._initSource();
}
if(key==="appendTo"){
this.menu.element.appendTo(this._appendTo());
}
if(key==="disabled"&&value&&this.xhr){
this.xhr.abort();
}},
_isEventTargetInWidget: function(event){
var menuElement=this.menu.element[ 0 ];
return event.target===this.element[ 0 ] ||
event.target===menuElement ||
$.contains(menuElement, event.target);
},
_closeOnClickOutside: function(event){
if(!this._isEventTargetInWidget(event)){
this.close();
}},
_appendTo: function(){
var element=this.options.appendTo;
if(element){
element=element.jquery||element.nodeType ?
$(element) :
this.document.find(element).eq(0);
}
if(!element||!element[ 0 ]){
element=this.element.closest(".ui-front, dialog");
}
if(!element.length){
element=this.document[ 0 ].body;
}
return element;
},
_initSource: function(){
var array, url,
that=this;
if($.isArray(this.options.source)){
array=this.options.source;
this.source=function(request, response){
response($.ui.autocomplete.filter(array, request.term));
};}else if(typeof this.options.source==="string"){
url=this.options.source;
this.source=function(request, response){
if(that.xhr){
that.xhr.abort();
}
that.xhr=$.ajax({
url: url,
data: request,
dataType: "json",
success: function(data){
response(data);
},
error: function(){
response([]);
}});
};}else{
this.source=this.options.source;
}},
_searchTimeout: function(event){
clearTimeout(this.searching);
this.searching=this._delay(function(){
var equalValues=this.term===this._value(),
menuVisible=this.menu.element.is(":visible"),
modifierKey=event.altKey||event.ctrlKey||event.metaKey||event.shiftKey;
if(!equalValues||(equalValues&&!menuVisible&&!modifierKey)){
this.selectedItem=null;
this.search(null, event);
}}, this.options.delay);
},
search: function(value, event){
value=value!=null ? value:this._value();
this.term=this._value();
if(value.length < this.options.minLength){
return this.close(event);
}
if(this._trigger("search", event)===false){
return;
}
return this._search(value);
},
_search: function(value){
this.pending++;
this._addClass("ui-autocomplete-loading");
this.cancelSearch=false;
this.source({ term: value }, this._response());
},
_response: function(){
var index=++this.requestIndex;
return $.proxy(function(content){
if(index===this.requestIndex){
this.__response(content);
}
this.pending--;
if(!this.pending){
this._removeClass("ui-autocomplete-loading");
}}, this);
},
__response: function(content){
if(content){
content=this._normalize(content);
}
this._trigger("response", null, { content: content });
if(!this.options.disabled&&content&&content.length&&!this.cancelSearch){
this._suggest(content);
this._trigger("open");
}else{
this._close();
}},
close: function(event){
this.cancelSearch=true;
this._close(event);
},
_close: function(event){
this._off(this.document, "mousedown");
if(this.menu.element.is(":visible")){
this.menu.element.hide();
this.menu.blur();
this.isNewMenu=true;
this._trigger("close", event);
}},
_change: function(event){
if(this.previous!==this._value()){
this._trigger("change", event, { item: this.selectedItem });
}},
_normalize: function(items){
if(items.length&&items[ 0 ].label&&items[ 0 ].value){
return items;
}
return $.map(items, function(item){
if(typeof item==="string"){
return {
label: item,
value: item
};}
return $.extend({}, item, {
label: item.label||item.value,
value: item.value||item.label
});
});
},
_suggest: function(items){
var ul=this.menu.element.empty();
this._renderMenu(ul, items);
this.isNewMenu=true;
this.menu.refresh();
ul.show();
this._resizeMenu();
ul.position($.extend({
of: this.element
}, this.options.position));
if(this.options.autoFocus){
this.menu.next();
}
this._on(this.document, {
mousedown: "_closeOnClickOutside"
});
},
_resizeMenu: function(){
var ul=this.menu.element;
ul.outerWidth(Math.max(ul.width("").outerWidth() + 1,
this.element.outerWidth()
));
},
_renderMenu: function(ul, items){
var that=this;
$.each(items, function(index, item){
that._renderItemData(ul, item);
});
},
_renderItemData: function(ul, item){
return this._renderItem(ul, item).data("ui-autocomplete-item", item);
},
_renderItem: function(ul, item){
return $("<li>")
.append($("<div>").text(item.label))
.appendTo(ul);
},
_move: function(direction, event){
if(!this.menu.element.is(":visible")){
this.search(null, event);
return;
}
if(this.menu.isFirstItem()&&/^previous/.test(direction) ||
this.menu.isLastItem()&&/^next/.test(direction)){
if(!this.isMultiLine){
this._value(this.term);
}
this.menu.blur();
return;
}
this.menu[ direction ](event);
},
widget: function(){
return this.menu.element;
},
_value: function(){
return this.valueMethod.apply(this.element, arguments);
},
_keyEvent: function(keyEvent, event){
if(!this.isMultiLine||this.menu.element.is(":visible")){
this._move(keyEvent, event);
event.preventDefault();
}},
_isContentEditable: function(element){
if(!element.length){
return false;
}
var editable=element.prop("contentEditable");
if(editable==="inherit"){
return this._isContentEditable(element.parent());
}
return editable==="true";
}});
$.extend($.ui.autocomplete, {
escapeRegex: function(value){
return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
},
filter: function(array, term){
var matcher=new RegExp($.ui.autocomplete.escapeRegex(term), "i");
return $.grep(array, function(value){
return matcher.test(value.label||value.value||value);
});
}});
$.widget("ui.autocomplete", $.ui.autocomplete, {
options: {
messages: {
noResults: "No search results.",
results: function(amount){
return amount +(amount > 1 ? " results are":" result is") +
" available, use up and down arrow keys to navigate.";
}}
},
__response: function(content){
var message;
this._superApply(arguments);
if(this.options.disabled||this.cancelSearch){
return;
}
if(content&&content.length){
message=this.options.messages.results(content.length);
}else{
message=this.options.messages.noResults;
}
this.liveRegion.children().hide();
$("<div>").text(message).appendTo(this.liveRegion);
}});
var widgetsAutocomplete=$.ui.autocomplete;
var controlgroupCornerRegex=/ui-corner-([a-z]){2,6}/g;
var widgetsControlgroup=$.widget("ui.controlgroup", {
version: "1.12.1",
defaultElement: "<div>",
options: {
direction: "horizontal",
disabled: null,
onlyVisible: true,
items: {
"button": "input[type=button], input[type=submit], input[type=reset], button, a",
"controlgroupLabel": ".ui-controlgroup-label",
"checkboxradio": "input[type='checkbox'], input[type='radio']",
"selectmenu": "select",
"spinner": ".ui-spinner-input"
}},
_create: function(){
this._enhance();
},
_enhance: function(){
this.element.attr("role", "toolbar");
this.refresh();
},
_destroy: function(){
this._callChildMethod("destroy");
this.childWidgets.removeData("ui-controlgroup-data");
this.element.removeAttr("role");
if(this.options.items.controlgroupLabel){
this.element
.find(this.options.items.controlgroupLabel)
.find(".ui-controlgroup-label-contents")
.contents().unwrap();
}},
_initWidgets: function(){
var that=this,
childWidgets=[];
$.each(this.options.items, function(widget, selector){
var labels;
var options={};
if(!selector){
return;
}
if(widget==="controlgroupLabel"){
labels=that.element.find(selector);
labels.each(function(){
var element=$(this);
if(element.children(".ui-controlgroup-label-contents").length){
return;
}
element.contents()
.wrapAll("<span class='ui-controlgroup-label-contents'></span>");
});
that._addClass(labels, null, "ui-widget ui-widget-content ui-state-default");
childWidgets=childWidgets.concat(labels.get());
return;
}
if(!$.fn[ widget ]){
return;
}
if(that[ "_" + widget + "Options" ]){
options=that[ "_" + widget + "Options" ]("middle");
}else{
options={ classes: {}};}
that.element
.find(selector)
.each(function(){
var element=$(this);
var instance=element[ widget ]("instance");
var instanceOptions=$.widget.extend({}, options);
if(widget==="button"&&element.parent(".ui-spinner").length){
return;
}
if(!instance){
instance=element[ widget ]()[ widget ]("instance");
}
if(instance){
instanceOptions.classes =
that._resolveClassesValues(instanceOptions.classes, instance);
}
element[ widget ](instanceOptions);
var widgetElement=element[ widget ]("widget");
$.data(widgetElement[ 0 ], "ui-controlgroup-data",
instance ? instance:element[ widget ]("instance"));
childWidgets.push(widgetElement[ 0 ]);
});
});
this.childWidgets=$($.unique(childWidgets));
this._addClass(this.childWidgets, "ui-controlgroup-item");
},
_callChildMethod: function(method){
this.childWidgets.each(function(){
var element=$(this),
data=element.data("ui-controlgroup-data");
if(data&&data[ method ]){
data[ method ]();
}});
},
_updateCornerClass: function(element, position){
var remove="ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all";
var add=this._buildSimpleOptions(position, "label").classes.label;
this._removeClass(element, null, remove);
this._addClass(element, null, add);
},
_buildSimpleOptions: function(position, key){
var direction=this.options.direction==="vertical";
var result={
classes: {}};
result.classes[ key ]={
"middle": "",
"first": "ui-corner-" +(direction ? "top":"left"),
"last": "ui-corner-" +(direction ? "bottom":"right"),
"only": "ui-corner-all"
}[ position ];
return result;
},
_spinnerOptions: function(position){
var options=this._buildSimpleOptions(position, "ui-spinner");
options.classes[ "ui-spinner-up" ]="";
options.classes[ "ui-spinner-down" ]="";
return options;
},
_buttonOptions: function(position){
return this._buildSimpleOptions(position, "ui-button");
},
_checkboxradioOptions: function(position){
return this._buildSimpleOptions(position, "ui-checkboxradio-label");
},
_selectmenuOptions: function(position){
var direction=this.options.direction==="vertical";
return {
width: direction ? "auto":false,
classes: {
middle: {
"ui-selectmenu-button-open": "",
"ui-selectmenu-button-closed": ""
},
first: {
"ui-selectmenu-button-open": "ui-corner-" +(direction ? "top":"tl"),
"ui-selectmenu-button-closed": "ui-corner-" +(direction ? "top":"left")
},
last: {
"ui-selectmenu-button-open": direction ? "":"ui-corner-tr",
"ui-selectmenu-button-closed": "ui-corner-" +(direction ? "bottom":"right")
},
only: {
"ui-selectmenu-button-open": "ui-corner-top",
"ui-selectmenu-button-closed": "ui-corner-all"
}}[ position ]
};},
_resolveClassesValues: function(classes, instance){
var result={};
$.each(classes, function(key){
var current=instance.options.classes[ key ]||"";
current=$.trim(current.replace(controlgroupCornerRegex, ""));
result[ key ]=(current + " " + classes[ key ]).replace(/\s+/g, " ");
});
return result;
},
_setOption: function(key, value){
if(key==="direction"){
this._removeClass("ui-controlgroup-" + this.options.direction);
}
this._super(key, value);
if(key==="disabled"){
this._callChildMethod(value ? "disable":"enable");
return;
}
this.refresh();
},
refresh: function(){
var children,
that=this;
this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction);
if(this.options.direction==="horizontal"){
this._addClass(null, "ui-helper-clearfix");
}
this._initWidgets();
children=this.childWidgets;
if(this.options.onlyVisible){
children=children.filter(":visible");
}
if(children.length){
$.each([ "first", "last" ], function(index, value){
var instance=children[ value ]().data("ui-controlgroup-data");
if(instance&&that[ "_" + instance.widgetName + "Options" ]){
var options=that[ "_" + instance.widgetName + "Options" ](
children.length===1 ? "only":value
);
options.classes=that._resolveClassesValues(options.classes, instance);
instance.element[ instance.widgetName ](options);
}else{
that._updateCornerClass(children[ value ](), value);
}});
this._callChildMethod("refresh");
}}
});
$.widget("ui.checkboxradio", [ $.ui.formResetMixin, {
version: "1.12.1",
options: {
disabled: null,
label: null,
icon: true,
classes: {
"ui-checkboxradio-label": "ui-corner-all",
"ui-checkboxradio-icon": "ui-corner-all"
}},
_getCreateOptions: function(){
var disabled, labels;
var that=this;
var options=this._super()||{};
this._readType();
labels=this.element.labels();
this.label=$(labels[ labels.length - 1 ]);
if(!this.label.length){
$.error("No label found for checkboxradio widget");
}
this.originalLabel="";
this.label.contents().not(this.element[ 0 ]).each(function(){
that.originalLabel +=this.nodeType===3 ? $(this).text():this.outerHTML;
});
if(this.originalLabel){
options.label=this.originalLabel;
}
disabled=this.element[ 0 ].disabled;
if(disabled!=null){
options.disabled=disabled;
}
return options;
},
_create: function(){
var checked=this.element[ 0 ].checked;
this._bindFormResetHandler();
if(this.options.disabled==null){
this.options.disabled=this.element[ 0 ].disabled;
}
this._setOption("disabled", this.options.disabled);
this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible");
this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget");
if(this.type==="radio"){
this._addClass(this.label, "ui-checkboxradio-radio-label");
}
if(this.options.label&&this.options.label!==this.originalLabel){
this._updateLabel();
}else if(this.originalLabel){
this.options.label=this.originalLabel;
}
this._enhance();
if(checked){
this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active");
if(this.icon){
this._addClass(this.icon, null, "ui-state-hover");
}}
this._on({
change: "_toggleClasses",
focus: function(){
this._addClass(this.label, null, "ui-state-focus ui-visual-focus");
},
blur: function(){
this._removeClass(this.label, null, "ui-state-focus ui-visual-focus");
}});
},
_readType: function(){
var nodeName=this.element[ 0 ].nodeName.toLowerCase();
this.type=this.element[ 0 ].type;
if(nodeName!=="input"||!/radio|checkbox/.test(this.type)){
$.error("Can't create checkboxradio on element.nodeName=" + nodeName +
" and element.type=" + this.type);
}},
_enhance: function(){
this._updateIcon(this.element[ 0 ].checked);
},
widget: function(){
return this.label;
},
_getRadioGroup: function(){
var group;
var name=this.element[ 0 ].name;
var nameSelector="input[name='" + $.ui.escapeSelector(name) + "']";
if(!name){
return $([]);
}
if(this.form.length){
group=$(this.form[ 0 ].elements).filter(nameSelector);
}else{
group=$(nameSelector).filter(function(){
return $(this).form().length===0;
});
}
return group.not(this.element);
},
_toggleClasses: function(){
var checked=this.element[ 0 ].checked;
this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", checked);
if(this.options.icon&&this.type==="checkbox"){
this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", checked)
._toggleClass(this.icon, null, "ui-icon-blank", !checked);
}
if(this.type==="radio"){
this._getRadioGroup()
.each(function(){
var instance=$(this).checkboxradio("instance");
if(instance){
instance._removeClass(instance.label,
"ui-checkboxradio-checked", "ui-state-active");
}});
}},
_destroy: function(){
this._unbindFormResetHandler();
if(this.icon){
this.icon.remove();
this.iconSpace.remove();
}},
_setOption: function(key, value){
if(key==="label"&&!value){
return;
}
this._super(key, value);
if(key==="disabled"){
this._toggleClass(this.label, null, "ui-state-disabled", value);
this.element[ 0 ].disabled=value;
return;
}
this.refresh();
},
_updateIcon: function(checked){
var toAdd="ui-icon ui-icon-background ";
if(this.options.icon){
if(!this.icon){
this.icon=$("<span>");
this.iconSpace=$("<span> </span>");
this._addClass(this.iconSpace, "ui-checkboxradio-icon-space");
}
if(this.type==="checkbox"){
toAdd +=checked ? "ui-icon-check ui-state-checked":"ui-icon-blank";
this._removeClass(this.icon, null, checked ? "ui-icon-blank":"ui-icon-check");
}else{
toAdd +="ui-icon-blank";
}
this._addClass(this.icon, "ui-checkboxradio-icon", toAdd);
if(!checked){
this._removeClass(this.icon, null, "ui-icon-check ui-state-checked");
}
this.icon.prependTo(this.label).after(this.iconSpace);
}else if(this.icon!==undefined){
this.icon.remove();
this.iconSpace.remove();
delete this.icon;
}},
_updateLabel: function(){
var contents=this.label.contents().not(this.element[ 0 ]);
if(this.icon){
contents=contents.not(this.icon[ 0 ]);
}
if(this.iconSpace){
contents=contents.not(this.iconSpace[ 0 ]);
}
contents.remove();
this.label.append(this.options.label);
},
refresh: function(){
var checked=this.element[ 0 ].checked,
isDisabled=this.element[ 0 ].disabled;
this._updateIcon(checked);
this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", checked);
if(this.options.label!==null){
this._updateLabel();
}
if(isDisabled!==this.options.disabled){
this._setOptions({ "disabled": isDisabled });
}}
} ]);
var widgetsCheckboxradio=$.ui.checkboxradio;
$.widget("ui.button", {
version: "1.12.1",
defaultElement: "<button>",
options: {
classes: {
"ui-button": "ui-corner-all"
},
disabled: null,
icon: null,
iconPosition: "beginning",
label: null,
showLabel: true
},
_getCreateOptions: function(){
var disabled,
options=this._super()||{};
this.isInput=this.element.is("input");
disabled=this.element[ 0 ].disabled;
if(disabled!=null){
options.disabled=disabled;
}
this.originalLabel=this.isInput ? this.element.val():this.element.html();
if(this.originalLabel){
options.label=this.originalLabel;
}
return options;
},
_create: function(){
if(!this.option.showLabel & !this.options.icon){
this.options.showLabel=true;
}
if(this.options.disabled==null){
this.options.disabled=this.element[ 0 ].disabled||false;
}
this.hasTitle = !!this.element.attr("title");
if(this.options.label&&this.options.label!==this.originalLabel){
if(this.isInput){
this.element.val(this.options.label);
}else{
this.element.html(this.options.label);
}}
this._addClass("ui-button", "ui-widget");
this._setOption("disabled", this.options.disabled);
this._enhance();
if(this.element.is("a")){
this._on({
"keyup": function(event){
if(event.keyCode===$.ui.keyCode.SPACE){
event.preventDefault();
if(this.element[ 0 ].click){
this.element[ 0 ].click();
}else{
this.element.trigger("click");
}}
}});
}},
_enhance: function(){
if(!this.element.is("button")){
this.element.attr("role", "button");
}
if(this.options.icon){
this._updateIcon("icon", this.options.icon);
this._updateTooltip();
}},
_updateTooltip: function(){
this.title=this.element.attr("title");
if(!this.options.showLabel&&!this.title){
this.element.attr("title", this.options.label);
}},
_updateIcon: function(option, value){
var icon=option!=="iconPosition",
position=icon ? this.options.iconPosition:value,
displayBlock=position==="top"||position==="bottom";
if(!this.icon){
this.icon=$("<span>");
this._addClass(this.icon, "ui-button-icon", "ui-icon");
if(!this.options.showLabel){
this._addClass("ui-button-icon-only");
}}else if(icon){
this._removeClass(this.icon, null, this.options.icon);
}
if(icon){
this._addClass(this.icon, null, value);
}
this._attachIcon(position);
if(displayBlock){
this._addClass(this.icon, null, "ui-widget-icon-block");
if(this.iconSpace){
this.iconSpace.remove();
}}else{
if(!this.iconSpace){
this.iconSpace=$("<span> </span>");
this._addClass(this.iconSpace, "ui-button-icon-space");
}
this._removeClass(this.icon, null, "ui-wiget-icon-block");
this._attachIconSpace(position);
}},
_destroy: function(){
this.element.removeAttr("role");
if(this.icon){
this.icon.remove();
}
if(this.iconSpace){
this.iconSpace.remove();
}
if(!this.hasTitle){
this.element.removeAttr("title");
}},
_attachIconSpace: function(iconPosition){
this.icon[ /^(?:end|bottom)/.test(iconPosition) ? "before":"after" ](this.iconSpace);
},
_attachIcon: function(iconPosition){
this.element[ /^(?:end|bottom)/.test(iconPosition) ? "append":"prepend" ](this.icon);
},
_setOptions: function(options){
var newShowLabel=options.showLabel===undefined ?
this.options.showLabel :
options.showLabel,
newIcon=options.icon===undefined ? this.options.icon:options.icon;
if(!newShowLabel&&!newIcon){
options.showLabel=true;
}
this._super(options);
},
_setOption: function(key, value){
if(key==="icon"){
if(value){
this._updateIcon(key, value);
}else if(this.icon){
this.icon.remove();
if(this.iconSpace){
this.iconSpace.remove();
}}
}
if(key==="iconPosition"){
this._updateIcon(key, value);
}
if(key==="showLabel"){
this._toggleClass("ui-button-icon-only", null, !value);
this._updateTooltip();
}
if(key==="label"){
if(this.isInput){
this.element.val(value);
}else{
this.element.html(value);
if(this.icon){
this._attachIcon(this.options.iconPosition);
this._attachIconSpace(this.options.iconPosition);
}}
}
this._super(key, value);
if(key==="disabled"){
this._toggleClass(null, "ui-state-disabled", value);
this.element[ 0 ].disabled=value;
if(value){
this.element.blur();
}}
},
refresh: function(){
var isDisabled=this.element.is("input, button") ?
this.element[ 0 ].disabled:this.element.hasClass("ui-button-disabled");
if(isDisabled!==this.options.disabled){
this._setOptions({ disabled: isDisabled });
}
this._updateTooltip();
}});
if($.uiBackCompat!==false){
$.widget("ui.button", $.ui.button, {
options: {
text: true,
icons: {
primary: null,
secondary: null
}},
_create: function(){
if(this.options.showLabel&&!this.options.text){
this.options.showLabel=this.options.text;
}
if(!this.options.showLabel&&this.options.text){
this.options.text=this.options.showLabel;
}
if(!this.options.icon&&(this.options.icons.primary ||
this.options.icons.secondary)){
if(this.options.icons.primary){
this.options.icon=this.options.icons.primary;
}else{
this.options.icon=this.options.icons.secondary;
this.options.iconPosition="end";
}}else if(this.options.icon){
this.options.icons.primary=this.options.icon;
}
this._super();
},
_setOption: function(key, value){
if(key==="text"){
this._super("showLabel", value);
return;
}
if(key==="showLabel"){
this.options.text=value;
}
if(key==="icon"){
this.options.icons.primary=value;
}
if(key==="icons"){
if(value.primary){
this._super("icon", value.primary);
this._super("iconPosition", "beginning");
}else if(value.secondary){
this._super("icon", value.secondary);
this._super("iconPosition", "end");
}}
this._superApply(arguments);
}});
$.fn.button=(function(orig){
return function(){
if(!this.length||(this.length&&this[ 0 ].tagName!=="INPUT") ||
(this.length&&this[ 0 ].tagName==="INPUT"&&(
this.attr("type")!=="checkbox"&&this.attr("type")!=="radio"
))){
return orig.apply(this, arguments);
}
if(!$.ui.checkboxradio){
$.error("Checkboxradio widget missing");
}
if(arguments.length===0){
return this.checkboxradio({
"icon": false
});
}
return this.checkboxradio.apply(this, arguments);
};})($.fn.button);
$.fn.buttonset=function(){
if(!$.ui.controlgroup){
$.error("Controlgroup widget missing");
}
if(arguments[ 0 ]==="option"&&arguments[ 1 ]==="items"&&arguments[ 2 ]){
return this.controlgroup.apply(this,
[ arguments[ 0 ], "items.button", arguments[ 2 ] ]);
}
if(arguments[ 0 ]==="option"&&arguments[ 1 ]==="items"){
return this.controlgroup.apply(this, [ arguments[ 0 ], "items.button" ]);
}
if(typeof arguments[ 0 ]==="object"&&arguments[ 0 ].items){
arguments[ 0 ].items={
button: arguments[ 0 ].items
};}
return this.controlgroup.apply(this, arguments);
};}
var widgetsButton=$.ui.button;
$.extend($.ui, { datepicker: { version: "1.12.1" }});
var datepicker_instActive;
function datepicker_getZindex(elem){
var position, value;
while(elem.length&&elem[ 0 ]!==document){
position=elem.css("position");
if(position==="absolute"||position==="relative"||position==="fixed"){
value=parseInt(elem.css("zIndex"), 10);
if(!isNaN(value)&&value!==0){
return value;
}}
elem=elem.parent();
}
return 0;
}
function Datepicker(){
this._curInst=null;
this._keyEvent=false;
this._disabledInputs=[];
this._datepickerShowing=false;
this._inDialog=false;
this._mainDivId="ui-datepicker-div";
this._inlineClass="ui-datepicker-inline";
this._appendClass="ui-datepicker-append";
this._triggerClass="ui-datepicker-trigger";
this._dialogClass="ui-datepicker-dialog";
this._disableClass="ui-datepicker-disabled";
this._unselectableClass="ui-datepicker-unselectable";
this._currentClass="ui-datepicker-current-day";
this._dayOverClass="ui-datepicker-days-cell-over";
this.regional=[];
this.regional[ "" ]={
closeText: "Done",
prevText: "Prev",
nextText: "Next",
currentText: "Today",
monthNames: [ "January","February","March","April","May","June",
"July","August","September","October","November","December" ],
monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
dayNamesMin: [ "Su","Mo","Tu","We","Th","Fr","Sa" ],
weekHeader: "Wk",
dateFormat: "mm/dd/yy",
firstDay: 0,
isRTL: false,
showMonthAfterYear: false,
yearSuffix: ""
};
this._defaults={
showOn: "focus", // "focus" for popup on focus,
showAnim: "fadeIn",
showOptions: {},
defaultDate: null,
appendText: "",
buttonText: "...",
buttonImage: "",
buttonImageOnly: false,
hideIfNoPrevNext: false,
navigationAsDateFormat: false,
gotoCurrent: false,
changeMonth: false,
changeYear: false,
yearRange: "c-10:c+10",
showOtherMonths: false,
selectOtherMonths: false,
showWeek: false,
calculateWeek: this.iso8601Week,
shortYearCutoff: "+10",
minDate: null,
maxDate: null,
duration: "fast",
beforeShowDay: null,
beforeShow: null,
onSelect: null,
onChangeMonthYear: null,
onClose: null,
numberOfMonths: 1,
showCurrentAtPos: 0,
stepMonths: 1,
stepBigMonths: 12,
altField: "",
altFormat: "",
constrainInput: true,
showButtonPanel: false,
autoSize: false,
disabled: false
};
$.extend(this._defaults, this.regional[ "" ]);
this.regional.en=$.extend(true, {}, this.regional[ "" ]);
this.regional[ "en-US" ]=$.extend(true, {}, this.regional.en);
this.dpDiv=datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
}
$.extend(Datepicker.prototype, {
markerClassName: "hasDatepicker",
maxRows: 4,
_widgetDatepicker: function(){
return this.dpDiv;
},
setDefaults: function(settings){
datepicker_extendRemove(this._defaults, settings||{});
return this;
},
_attachDatepicker: function(target, settings){
var nodeName, inline, inst;
nodeName=target.nodeName.toLowerCase();
inline=(nodeName==="div"||nodeName==="span");
if(!target.id){
this.uuid +=1;
target.id="dp" + this.uuid;
}
inst=this._newInst($(target), inline);
inst.settings=$.extend({}, settings||{});
if(nodeName==="input"){
this._connectDatepicker(target, inst);
}else if(inline){
this._inlineDatepicker(target, inst);
}},
_newInst: function(target, inline){
var id=target[ 0 ].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
return { id: id, input: target,
selectedDay: 0, selectedMonth: 0, selectedYear: 0,
drawMonth: 0, drawYear: 0,
inline: inline,
dpDiv:(!inline ? this.dpDiv :
datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))) };},
_connectDatepicker: function(target, inst){
var input=$(target);
inst.append=$([]);
inst.trigger=$([]);
if(input.hasClass(this.markerClassName)){
return;
}
this._attachments(input, inst);
input.addClass(this.markerClassName).on("keydown", this._doKeyDown).
on("keypress", this._doKeyPress).on("keyup", this._doKeyUp);
this._autoSize(inst);
$.data(target, "datepicker", inst);
if(inst.settings.disabled){
this._disableDatepicker(target);
}},
_attachments: function(input, inst){
var showOn, buttonText, buttonImage,
appendText=this._get(inst, "appendText"),
isRTL=this._get(inst, "isRTL");
if(inst.append){
inst.append.remove();
}
if(appendText){
inst.append=$("<span class='" + this._appendClass + "'>" + appendText + "</span>");
input[ isRTL ? "before":"after" ](inst.append);
}
input.off("focus", this._showDatepicker);
if(inst.trigger){
inst.trigger.remove();
}
showOn=this._get(inst, "showOn");
if(showOn==="focus"||showOn==="both"){
input.on("focus", this._showDatepicker);
}
if(showOn==="button"||showOn==="both"){
buttonText=this._get(inst, "buttonText");
buttonImage=this._get(inst, "buttonImage");
inst.trigger=$(this._get(inst, "buttonImageOnly") ?
$("<img/>").addClass(this._triggerClass).
attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
$("<button type='button'></button>").addClass(this._triggerClass).
html(!buttonImage ? buttonText:$("<img/>").attr({ src:buttonImage, alt:buttonText, title:buttonText })));
input[ isRTL ? "before":"after" ](inst.trigger);
inst.trigger.on("click", function(){
if($.datepicker._datepickerShowing&&$.datepicker._lastInput===input[ 0 ]){
$.datepicker._hideDatepicker();
}else if($.datepicker._datepickerShowing&&$.datepicker._lastInput!==input[ 0 ]){
$.datepicker._hideDatepicker();
$.datepicker._showDatepicker(input[ 0 ]);
}else{
$.datepicker._showDatepicker(input[ 0 ]);
}
return false;
});
}},
_autoSize: function(inst){
if(this._get(inst, "autoSize")&&!inst.inline){
var findMax, max, maxI, i,
date=new Date(2009, 12 - 1, 20),
dateFormat=this._get(inst, "dateFormat");
if(dateFormat.match(/[DM]/)){
findMax=function(names){
max=0;
maxI=0;
for(i=0; i < names.length; i++){
if(names[ i ].length > max){
max=names[ i ].length;
maxI=i;
}}
return maxI;
};
date.setMonth(findMax(this._get(inst,(dateFormat.match(/MM/) ?
"monthNames":"monthNamesShort"))));
date.setDate(findMax(this._get(inst,(dateFormat.match(/DD/) ?
"dayNames":"dayNamesShort"))) + 20 - date.getDay());
}
inst.input.attr("size", this._formatDate(inst, date).length);
}},
_inlineDatepicker: function(target, inst){
var divSpan=$(target);
if(divSpan.hasClass(this.markerClassName)){
return;
}
divSpan.addClass(this.markerClassName).append(inst.dpDiv);
$.data(target, "datepicker", inst);
this._setDate(inst, this._getDefaultDate(inst), true);
this._updateDatepicker(inst);
this._updateAlternate(inst);
if(inst.settings.disabled){
this._disableDatepicker(target);
}
inst.dpDiv.css("display", "block");
},
_dialogDatepicker: function(input, date, onSelect, settings, pos){
var id, browserWidth, browserHeight, scrollX, scrollY,
inst=this._dialogInst;
if(!inst){
this.uuid +=1;
id="dp" + this.uuid;
this._dialogInput=$("<input type='text' id='" + id +
"' style='position: absolute; top: -100px; width: 0px;'/>");
this._dialogInput.on("keydown", this._doKeyDown);
$("body").append(this._dialogInput);
inst=this._dialogInst=this._newInst(this._dialogInput, false);
inst.settings={};
$.data(this._dialogInput[ 0 ], "datepicker", inst);
}
datepicker_extendRemove(inst.settings, settings||{});
date=(date&&date.constructor===Date ? this._formatDate(inst, date):date);
this._dialogInput.val(date);
this._pos=(pos ?(pos.length ? pos:[ pos.pageX, pos.pageY ]):null);
if(!this._pos){
browserWidth=document.documentElement.clientWidth;
browserHeight=document.documentElement.clientHeight;
scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;
scrollY=document.documentElement.scrollTop||document.body.scrollTop;
this._pos =
[(browserWidth / 2) - 100 + scrollX,(browserHeight / 2) - 150 + scrollY ];
}
this._dialogInput.css("left",(this._pos[ 0 ] + 20) + "px").css("top", this._pos[ 1 ] + "px");
inst.settings.onSelect=onSelect;
this._inDialog=true;
this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[ 0 ]);
if($.blockUI){
$.blockUI(this.dpDiv);
}
$.data(this._dialogInput[ 0 ], "datepicker", inst);
return this;
},
_destroyDatepicker: function(target){
var nodeName,
$target=$(target),
inst=$.data(target, "datepicker");
if(!$target.hasClass(this.markerClassName)){
return;
}
nodeName=target.nodeName.toLowerCase();
$.removeData(target, "datepicker");
if(nodeName==="input"){
inst.append.remove();
inst.trigger.remove();
$target.removeClass(this.markerClassName).
off("focus", this._showDatepicker).
off("keydown", this._doKeyDown).
off("keypress", this._doKeyPress).
off("keyup", this._doKeyUp);
}else if(nodeName==="div"||nodeName==="span"){
$target.removeClass(this.markerClassName).empty();
}
if(datepicker_instActive===inst){
datepicker_instActive=null;
}},
_enableDatepicker: function(target){
var nodeName, inline,
$target=$(target),
inst=$.data(target, "datepicker");
if(!$target.hasClass(this.markerClassName)){
return;
}
nodeName=target.nodeName.toLowerCase();
if(nodeName==="input"){
target.disabled=false;
inst.trigger.filter("button").
each(function(){ this.disabled=false; }).end().
filter("img").css({ opacity: "1.0", cursor: "" });
}else if(nodeName==="div"||nodeName==="span"){
inline=$target.children("." + this._inlineClass);
inline.children().removeClass("ui-state-disabled");
inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
prop("disabled", false);
}
this._disabledInputs=$.map(this._disabledInputs,
function(value){ return(value===target ? null:value); });
},
_disableDatepicker: function(target){
var nodeName, inline,
$target=$(target),
inst=$.data(target, "datepicker");
if(!$target.hasClass(this.markerClassName)){
return;
}
nodeName=target.nodeName.toLowerCase();
if(nodeName==="input"){
target.disabled=true;
inst.trigger.filter("button").
each(function(){ this.disabled=true; }).end().
filter("img").css({ opacity: "0.5", cursor: "default" });
}else if(nodeName==="div"||nodeName==="span"){
inline=$target.children("." + this._inlineClass);
inline.children().addClass("ui-state-disabled");
inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
prop("disabled", true);
}
this._disabledInputs=$.map(this._disabledInputs,
function(value){ return(value===target ? null:value); });
this._disabledInputs[ this._disabledInputs.length ]=target;
},
_isDisabledDatepicker: function(target){
if(!target){
return false;
}
for(var i=0; i < this._disabledInputs.length; i++){
if(this._disabledInputs[ i ]===target){
return true;
}}
return false;
},
_getInst: function(target){
try {
return $.data(target, "datepicker");
}
catch(err){
throw "Missing instance data for this datepicker";
}},
_optionDatepicker: function(target, name, value){
var settings, date, minDate, maxDate,
inst=this._getInst(target);
if(arguments.length===2&&typeof name==="string"){
return(name==="defaults" ? $.extend({}, $.datepicker._defaults) :
(inst ?(name==="all" ? $.extend({}, inst.settings) :
this._get(inst, name)):null));
}
settings=name||{};
if(typeof name==="string"){
settings={};
settings[ name ]=value;
}
if(inst){
if(this._curInst===inst){
this._hideDatepicker();
}
date=this._getDateDatepicker(target, true);
minDate=this._getMinMaxDate(inst, "min");
maxDate=this._getMinMaxDate(inst, "max");
datepicker_extendRemove(inst.settings, settings);
if(minDate!==null&&settings.dateFormat!==undefined&&settings.minDate===undefined){
inst.settings.minDate=this._formatDate(inst, minDate);
}
if(maxDate!==null&&settings.dateFormat!==undefined&&settings.maxDate===undefined){
inst.settings.maxDate=this._formatDate(inst, maxDate);
}
if("disabled" in settings){
if(settings.disabled){
this._disableDatepicker(target);
}else{
this._enableDatepicker(target);
}}
this._attachments($(target), inst);
this._autoSize(inst);
this._setDate(inst, date);
this._updateAlternate(inst);
this._updateDatepicker(inst);
}},
_changeDatepicker: function(target, name, value){
this._optionDatepicker(target, name, value);
},
_refreshDatepicker: function(target){
var inst=this._getInst(target);
if(inst){
this._updateDatepicker(inst);
}},
_setDateDatepicker: function(target, date){
var inst=this._getInst(target);
if(inst){
this._setDate(inst, date);
this._updateDatepicker(inst);
this._updateAlternate(inst);
}},
_getDateDatepicker: function(target, noDefault){
var inst=this._getInst(target);
if(inst&&!inst.inline){
this._setDateFromField(inst, noDefault);
}
return(inst ? this._getDate(inst):null);
},
_doKeyDown: function(event){
var onSelect, dateStr, sel,
inst=$.datepicker._getInst(event.target),
handled=true,
isRTL=inst.dpDiv.is(".ui-datepicker-rtl");
inst._keyEvent=true;
if($.datepicker._datepickerShowing){
switch(event.keyCode){
case 9: $.datepicker._hideDatepicker();
handled=false;
break;
case 13: sel=$("td." + $.datepicker._dayOverClass + ":not(." +
$.datepicker._currentClass + ")", inst.dpDiv);
if(sel[ 0 ]){
$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[ 0 ]);
}
onSelect=$.datepicker._get(inst, "onSelect");
if(onSelect){
dateStr=$.datepicker._formatDate(inst);
onSelect.apply(( inst.input ? inst.input[ 0 ]:null), [ dateStr, inst ]);
}else{
$.datepicker._hideDatepicker();
}
return false;
case 27: $.datepicker._hideDatepicker();
break;
case 33: $.datepicker._adjustDate(event.target,(event.ctrlKey ?
-$.datepicker._get(inst, "stepBigMonths") :
-$.datepicker._get(inst, "stepMonths")), "M");
break;
case 34: $.datepicker._adjustDate(event.target,(event.ctrlKey ?
+$.datepicker._get(inst, "stepBigMonths") :
+$.datepicker._get(inst, "stepMonths")), "M");
break;
case 35: if(event.ctrlKey||event.metaKey){
$.datepicker._clearDate(event.target);
}
handled=event.ctrlKey||event.metaKey;
break;
case 36: if(event.ctrlKey||event.metaKey){
$.datepicker._gotoToday(event.target);
}
handled=event.ctrlKey||event.metaKey;
break;
case 37: if(event.ctrlKey||event.metaKey){
$.datepicker._adjustDate(event.target,(isRTL ? +1:-1), "D");
}
handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){
$.datepicker._adjustDate(event.target,(event.ctrlKey ?
-$.datepicker._get(inst, "stepBigMonths") :
-$.datepicker._get(inst, "stepMonths")), "M");
}
break;
case 38: if(event.ctrlKey||event.metaKey){
$.datepicker._adjustDate(event.target, -7, "D");
}
handled=event.ctrlKey||event.metaKey;
break;
case 39: if(event.ctrlKey||event.metaKey){
$.datepicker._adjustDate(event.target,(isRTL ? -1:+1), "D");
}
handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){
$.datepicker._adjustDate(event.target,(event.ctrlKey ?
+$.datepicker._get(inst, "stepBigMonths") :
+$.datepicker._get(inst, "stepMonths")), "M");
}
break;
case 40: if(event.ctrlKey||event.metaKey){
$.datepicker._adjustDate(event.target, +7, "D");
}
handled=event.ctrlKey||event.metaKey;
break;
default: handled=false;
}}else if(event.keyCode===36&&event.ctrlKey){
$.datepicker._showDatepicker(this);
}else{
handled=false;
}
if(handled){
event.preventDefault();
event.stopPropagation();
}},
_doKeyPress: function(event){
var chars, chr,
inst=$.datepicker._getInst(event.target);
if($.datepicker._get(inst, "constrainInput")){
chars=$.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
chr=String.fromCharCode(event.charCode==null ? event.keyCode:event.charCode);
return event.ctrlKey||event.metaKey||(chr < " "||!chars||chars.indexOf(chr) > -1);
}},
_doKeyUp: function(event){
var date,
inst=$.datepicker._getInst(event.target);
if(inst.input.val()!==inst.lastVal){
try {
date=$.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
(inst.input ? inst.input.val():null),
$.datepicker._getFormatConfig(inst));
if(date){
$.datepicker._setDateFromField(inst);
$.datepicker._updateAlternate(inst);
$.datepicker._updateDatepicker(inst);
}}
catch(err){
}}
return true;
},
_showDatepicker: function(input){
input=input.target||input;
if(input.nodeName.toLowerCase()!=="input"){
input=$("input", input.parentNode)[ 0 ];
}
if($.datepicker._isDisabledDatepicker(input)||$.datepicker._lastInput===input){
return;
}
var inst, beforeShow, beforeShowSettings, isFixed,
offset, showAnim, duration;
inst=$.datepicker._getInst(input);
if($.datepicker._curInst&&$.datepicker._curInst!==inst){
$.datepicker._curInst.dpDiv.stop(true, true);
if(inst&&$.datepicker._datepickerShowing){
$.datepicker._hideDatepicker($.datepicker._curInst.input[ 0 ]);
}}
beforeShow=$.datepicker._get(inst, "beforeShow");
beforeShowSettings=beforeShow ? beforeShow.apply(input, [ input, inst ]):{};
if(beforeShowSettings===false){
return;
}
datepicker_extendRemove(inst.settings, beforeShowSettings);
inst.lastVal=null;
$.datepicker._lastInput=input;
$.datepicker._setDateFromField(inst);
if($.datepicker._inDialog){
input.value="";
}
if(!$.datepicker._pos){
$.datepicker._pos=$.datepicker._findPos(input);
$.datepicker._pos[ 1 ] +=input.offsetHeight;
}
isFixed=false;
$(input).parents().each(function(){
isFixed |=$(this).css("position")==="fixed";
return !isFixed;
});
offset={ left: $.datepicker._pos[ 0 ], top: $.datepicker._pos[ 1 ] };
$.datepicker._pos=null;
inst.dpDiv.empty();
inst.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" });
$.datepicker._updateDatepicker(inst);
offset=$.datepicker._checkOffset(inst, offset, isFixed);
inst.dpDiv.css({ position:($.datepicker._inDialog&&$.blockUI ?
"static":(isFixed ? "fixed":"absolute")), display: "none",
left: offset.left + "px", top: offset.top + "px" });
if(!inst.inline){
showAnim=$.datepicker._get(inst, "showAnim");
duration=$.datepicker._get(inst, "duration");
inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1);
$.datepicker._datepickerShowing=true;
if($.effects&&$.effects.effect[ showAnim ]){
inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
}else{
inst.dpDiv[ showAnim||"show" ](showAnim ? duration:null);
}
if($.datepicker._shouldFocusInput(inst)){
inst.input.trigger("focus");
}
$.datepicker._curInst=inst;
}},
_updateDatepicker: function(inst){
this.maxRows=4;
datepicker_instActive=inst;
inst.dpDiv.empty().append(this._generateHTML(inst));
this._attachHandlers(inst);
var origyearshtml,
numMonths=this._getNumberOfMonths(inst),
cols=numMonths[ 1 ],
width=17,
activeCell=inst.dpDiv.find("." + this._dayOverClass + " a");
if(activeCell.length > 0){
datepicker_handleMouseover.apply(activeCell.get(0));
}
inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
if(cols > 1){
inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width",(width * cols) + "em");
}
inst.dpDiv[(numMonths[ 0 ]!==1||numMonths[ 1 ]!==1 ? "add":"remove") +
"Class" ]("ui-datepicker-multi");
inst.dpDiv[(this._get(inst, "isRTL") ? "add":"remove") +
"Class" ]("ui-datepicker-rtl");
if(inst===$.datepicker._curInst&&$.datepicker._datepickerShowing&&$.datepicker._shouldFocusInput(inst)){
inst.input.trigger("focus");
}
if(inst.yearshtml){
origyearshtml=inst.yearshtml;
setTimeout(function(){
if(origyearshtml===inst.yearshtml&&inst.yearshtml){
inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);
}
origyearshtml=inst.yearshtml=null;
}, 0);
}},
_shouldFocusInput: function(inst){
return inst.input&&inst.input.is(":visible")&&!inst.input.is(":disabled")&&!inst.input.is(":focus");
},
_checkOffset: function(inst, offset, isFixed){
var dpWidth=inst.dpDiv.outerWidth(),
dpHeight=inst.dpDiv.outerHeight(),
inputWidth=inst.input ? inst.input.outerWidth():0,
inputHeight=inst.input ? inst.input.outerHeight():0,
viewWidth=document.documentElement.clientWidth +(isFixed ? 0:$(document).scrollLeft()),
viewHeight=document.documentElement.clientHeight +(isFixed ? 0:$(document).scrollTop());
offset.left -=(this._get(inst, "isRTL") ?(dpWidth - inputWidth):0);
offset.left -=(isFixed&&offset.left===inst.input.offset().left) ? $(document).scrollLeft():0;
offset.top -=(isFixed&&offset.top===(inst.input.offset().top + inputHeight)) ? $(document).scrollTop():0;
offset.left -=Math.min(offset.left,(offset.left + dpWidth > viewWidth&&viewWidth > dpWidth) ?
Math.abs(offset.left + dpWidth - viewWidth):0);
offset.top -=Math.min(offset.top,(offset.top + dpHeight > viewHeight&&viewHeight > dpHeight) ?
Math.abs(dpHeight + inputHeight):0);
return offset;
},
_findPos: function(obj){
var position,
inst=this._getInst(obj),
isRTL=this._get(inst, "isRTL");
while(obj&&(obj.type==="hidden"||obj.nodeType!==1||$.expr.filters.hidden(obj))){
obj=obj[ isRTL ? "previousSibling":"nextSibling" ];
}
position=$(obj).offset();
return [ position.left, position.top ];
},
_hideDatepicker: function(input){
var showAnim, duration, postProcess, onClose,
inst=this._curInst;
if(!inst||(input&&inst!==$.data(input, "datepicker"))){
return;
}
if(this._datepickerShowing){
showAnim=this._get(inst, "showAnim");
duration=this._get(inst, "duration");
postProcess=function(){
$.datepicker._tidyDialog(inst);
};
if($.effects&&($.effects.effect[ showAnim ]||$.effects[ showAnim ])){
inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
}else{
inst.dpDiv[(showAnim==="slideDown" ? "slideUp" :
(showAnim==="fadeIn" ? "fadeOut":"hide")) ](( showAnim ? duration:null), postProcess);
}
if(!showAnim){
postProcess();
}
this._datepickerShowing=false;
onClose=this._get(inst, "onClose");
if(onClose){
onClose.apply(( inst.input ? inst.input[ 0 ]:null), [(inst.input ? inst.input.val():""), inst ]);
}
this._lastInput=null;
if(this._inDialog){
this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });
if($.blockUI){
$.unblockUI();
$("body").append(this.dpDiv);
}}
this._inDialog=false;
}},
_tidyDialog: function(inst){
inst.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
},
_checkExternalClick: function(event){
if(!$.datepicker._curInst){
return;
}
var $target=$(event.target),
inst=$.datepicker._getInst($target[ 0 ]);
if((($target[ 0 ].id!==$.datepicker._mainDivId &&
$target.parents("#" + $.datepicker._mainDivId).length===0 &&
!$target.hasClass($.datepicker.markerClassName) &&
!$target.closest("." + $.datepicker._triggerClass).length &&
$.datepicker._datepickerShowing&&!($.datepicker._inDialog&&$.blockUI))) ||
($target.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!==inst)){
$.datepicker._hideDatepicker();
}},
_adjustDate: function(id, offset, period){
var target=$(id),
inst=this._getInst(target[ 0 ]);
if(this._isDisabledDatepicker(target[ 0 ])){
return;
}
this._adjustInstDate(inst, offset +
(period==="M" ? this._get(inst, "showCurrentAtPos"):0),
period);
this._updateDatepicker(inst);
},
_gotoToday: function(id){
var date,
target=$(id),
inst=this._getInst(target[ 0 ]);
if(this._get(inst, "gotoCurrent")&&inst.currentDay){
inst.selectedDay=inst.currentDay;
inst.drawMonth=inst.selectedMonth=inst.currentMonth;
inst.drawYear=inst.selectedYear=inst.currentYear;
}else{
date=new Date();
inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();
}
this._notifyChange(inst);
this._adjustDate(target);
},
_selectMonthYear: function(id, select, period){
var target=$(id),
inst=this._getInst(target[ 0 ]);
inst[ "selected" +(period==="M" ? "Month":"Year") ] =
inst[ "draw" +(period==="M" ? "Month":"Year") ] =
parseInt(select.options[ select.selectedIndex ].value, 10);
this._notifyChange(inst);
this._adjustDate(target);
},
_selectDay: function(id, month, year, td){
var inst,
target=$(id);
if($(td).hasClass(this._unselectableClass)||this._isDisabledDatepicker(target[ 0 ])){
return;
}
inst=this._getInst(target[ 0 ]);
inst.selectedDay=inst.currentDay=$("a", td).html();
inst.selectedMonth=inst.currentMonth=month;
inst.selectedYear=inst.currentYear=year;
this._selectDate(id, this._formatDate(inst,
inst.currentDay, inst.currentMonth, inst.currentYear));
},
_clearDate: function(id){
var target=$(id);
this._selectDate(target, "");
},
_selectDate: function(id, dateStr){
var onSelect,
target=$(id),
inst=this._getInst(target[ 0 ]);
dateStr=(dateStr!=null ? dateStr:this._formatDate(inst));
if(inst.input){
inst.input.val(dateStr);
}
this._updateAlternate(inst);
onSelect=this._get(inst, "onSelect");
if(onSelect){
onSelect.apply(( inst.input ? inst.input[ 0 ]:null), [ dateStr, inst ]);
}else if(inst.input){
inst.input.trigger("change");
}
if(inst.inline){
this._updateDatepicker(inst);
}else{
this._hideDatepicker();
this._lastInput=inst.input[ 0 ];
if(typeof(inst.input[ 0 ])!=="object"){
inst.input.trigger("focus");
}
this._lastInput=null;
}},
_updateAlternate: function(inst){
var altFormat, date, dateStr,
altField=this._get(inst, "altField");
if(altField){
altFormat=this._get(inst, "altFormat")||this._get(inst, "dateFormat");
date=this._getDate(inst);
dateStr=this.formatDate(altFormat, date, this._getFormatConfig(inst));
$(altField).val(dateStr);
}},
noWeekends: function(date){
var day=date.getDay();
return [(day > 0&&day < 6), "" ];
},
iso8601Week: function(date){
var time,
checkDate=new Date(date.getTime());
checkDate.setDate(checkDate.getDate() + 4 -(checkDate.getDay()||7));
time=checkDate.getTime();
checkDate.setMonth(0);
checkDate.setDate(1);
return Math.floor(Math.round(( time - checkDate) / 86400000) / 7) + 1;
},
parseDate: function(format, value, settings){
if(format==null||value==null){
throw "Invalid arguments";
}
value=(typeof value==="object" ? value.toString():value + "");
if(value===""){
return null;
}
var iFormat, dim, extra,
iValue=0,
shortYearCutoffTemp=(settings ? settings.shortYearCutoff:null)||this._defaults.shortYearCutoff,
shortYearCutoff=(typeof shortYearCutoffTemp!=="string" ? shortYearCutoffTemp :
new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10)),
dayNamesShort=(settings ? settings.dayNamesShort:null)||this._defaults.dayNamesShort,
dayNames=(settings ? settings.dayNames:null)||this._defaults.dayNames,
monthNamesShort=(settings ? settings.monthNamesShort:null)||this._defaults.monthNamesShort,
monthNames=(settings ? settings.monthNames:null)||this._defaults.monthNames,
year=-1,
month=-1,
day=-1,
doy=-1,
literal=false,
date,
lookAhead=function(match){
var matches=(iFormat + 1 < format.length&&format.charAt(iFormat + 1)===match);
if(matches){
iFormat++;
}
return matches;
},
getNumber=function(match){
var isDoubled=lookAhead(match),
size=(match==="@" ? 14:(match==="!" ? 20 :
(match==="y"&&isDoubled ? 4:(match==="o" ? 3:2)))),
minSize=(match==="y" ? size:1),
digits=new RegExp("^\\d{" + minSize + "," + size + "}"),
num=value.substring(iValue).match(digits);
if(!num){
throw "Missing number at position " + iValue;
}
iValue +=num[ 0 ].length;
return parseInt(num[ 0 ], 10);
},
getName=function(match, shortNames, longNames){
var index=-1,
names=$.map(lookAhead(match) ? longNames:shortNames, function(v, k){
return [ [ k, v ] ];
}).sort(function(a, b){
return -(a[ 1 ].length - b[ 1 ].length);
});
$.each(names, function(i, pair){
var name=pair[ 1 ];
if(value.substr(iValue, name.length).toLowerCase()===name.toLowerCase()){
index=pair[ 0 ];
iValue +=name.length;
return false;
}});
if(index!==-1){
return index + 1;
}else{
throw "Unknown name at position " + iValue;
}},
checkLiteral=function(){
if(value.charAt(iValue)!==format.charAt(iFormat)){
throw "Unexpected literal at position " + iValue;
}
iValue++;
};
for(iFormat=0; iFormat < format.length; iFormat++){
if(literal){
if(format.charAt(iFormat)==="'"&&!lookAhead("'")){
literal=false;
}else{
checkLiteral();
}}else{
switch(format.charAt(iFormat)){
case "d":
day=getNumber("d");
break;
case "D":
getName("D", dayNamesShort, dayNames);
break;
case "o":
doy=getNumber("o");
break;
case "m":
month=getNumber("m");
break;
case "M":
month=getName("M", monthNamesShort, monthNames);
break;
case "y":
year=getNumber("y");
break;
case "@":
date=new Date(getNumber("@"));
year=date.getFullYear();
month=date.getMonth() + 1;
day=date.getDate();
break;
case "!":
date=new Date(( getNumber("!") - this._ticksTo1970) / 10000);
year=date.getFullYear();
month=date.getMonth() + 1;
day=date.getDate();
break;
case "'":
if(lookAhead("'")){
checkLiteral();
}else{
literal=true;
}
break;
default:
checkLiteral();
}}
}
if(iValue < value.length){
extra=value.substr(iValue);
if(!/^\s+/.test(extra)){
throw "Extra/unparsed characters found in date: " + extra;
}}
if(year===-1){
year=new Date().getFullYear();
}else if(year < 100){
year +=new Date().getFullYear() - new Date().getFullYear() % 100 +
(year <=shortYearCutoff ? 0:-100);
}
if(doy > -1){
month=1;
day=doy;
do {
dim=this._getDaysInMonth(year, month - 1);
if(day <=dim){
break;
}
month++;
day -=dim;
} while(true);
}
date=this._daylightSavingAdjust(new Date(year, month - 1, day));
if(date.getFullYear()!==year||date.getMonth() + 1!==month||date.getDate()!==day){
throw "Invalid date";
}
return date;
},
ATOM: "yy-mm-dd",
COOKIE: "D, dd M yy",
ISO_8601: "yy-mm-dd",
RFC_822: "D, d M y",
RFC_850: "DD, dd-M-y",
RFC_1036: "D, d M y",
RFC_1123: "D, d M yy",
RFC_2822: "D, d M yy",
RSS: "D, d M y",
TICKS: "!",
TIMESTAMP: "@",
W3C: "yy-mm-dd",
_ticksTo1970:(((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
formatDate: function(format, date, settings){
if(!date){
return "";
}
var iFormat,
dayNamesShort=(settings ? settings.dayNamesShort:null)||this._defaults.dayNamesShort,
dayNames=(settings ? settings.dayNames:null)||this._defaults.dayNames,
monthNamesShort=(settings ? settings.monthNamesShort:null)||this._defaults.monthNamesShort,
monthNames=(settings ? settings.monthNames:null)||this._defaults.monthNames,
lookAhead=function(match){
var matches=(iFormat + 1 < format.length&&format.charAt(iFormat + 1)===match);
if(matches){
iFormat++;
}
return matches;
},
formatNumber=function(match, value, len){
var num="" + value;
if(lookAhead(match)){
while(num.length < len){
num="0" + num;
}}
return num;
},
formatName=function(match, value, shortNames, longNames){
return(lookAhead(match) ? longNames[ value ]:shortNames[ value ]);
},
output="",
literal=false;
if(date){
for(iFormat=0; iFormat < format.length; iFormat++){
if(literal){
if(format.charAt(iFormat)==="'"&&!lookAhead("'")){
literal=false;
}else{
output +=format.charAt(iFormat);
}}else{
switch(format.charAt(iFormat)){
case "d":
output +=formatNumber("d", date.getDate(), 2);
break;
case "D":
output +=formatName("D", date.getDay(), dayNamesShort, dayNames);
break;
case "o":
output +=formatNumber("o",
Math.round(( new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
break;
case "m":
output +=formatNumber("m", date.getMonth() + 1, 2);
break;
case "M":
output +=formatName("M", date.getMonth(), monthNamesShort, monthNames);
break;
case "y":
output +=(lookAhead("y") ? date.getFullYear() :
(date.getFullYear() % 100 < 10 ? "0":"") + date.getFullYear() % 100);
break;
case "@":
output +=date.getTime();
break;
case "!":
output +=date.getTime() * 10000 + this._ticksTo1970;
break;
case "'":
if(lookAhead("'")){
output +="'";
}else{
literal=true;
}
break;
default:
output +=format.charAt(iFormat);
}}
}}
return output;
},
_possibleChars: function(format){
var iFormat,
chars="",
literal=false,
lookAhead=function(match){
var matches=(iFormat + 1 < format.length&&format.charAt(iFormat + 1)===match);
if(matches){
iFormat++;
}
return matches;
};
for(iFormat=0; iFormat < format.length; iFormat++){
if(literal){
if(format.charAt(iFormat)==="'"&&!lookAhead("'")){
literal=false;
}else{
chars +=format.charAt(iFormat);
}}else{
switch(format.charAt(iFormat)){
case "d": case "m": case "y": case "@":
chars +="0123456789";
break;
case "D": case "M":
return null;
case "'":
if(lookAhead("'")){
chars +="'";
}else{
literal=true;
}
break;
default:
chars +=format.charAt(iFormat);
}}
}
return chars;
},
_get: function(inst, name){
return inst.settings[ name ]!==undefined ?
inst.settings[ name ]:this._defaults[ name ];
},
_setDateFromField: function(inst, noDefault){
if(inst.input.val()===inst.lastVal){
return;
}
var dateFormat=this._get(inst, "dateFormat"),
dates=inst.lastVal=inst.input ? inst.input.val():null,
defaultDate=this._getDefaultDate(inst),
date=defaultDate,
settings=this._getFormatConfig(inst);
try {
date=this.parseDate(dateFormat, dates, settings)||defaultDate;
} catch(event){
dates=(noDefault ? "":dates);
}
inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();
inst.currentDay=(dates ? date.getDate():0);
inst.currentMonth=(dates ? date.getMonth():0);
inst.currentYear=(dates ? date.getFullYear():0);
this._adjustInstDate(inst);
},
_getDefaultDate: function(inst){
return this._restrictMinMax(inst,
this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
},
_determineDate: function(inst, date, defaultDate){
var offsetNumeric=function(offset){
var date=new Date();
date.setDate(date.getDate() + offset);
return date;
},
offsetString=function(offset){
try {
return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
offset, $.datepicker._getFormatConfig(inst));
}
catch(e){
}
var date=(offset.toLowerCase().match(/^c/) ?
$.datepicker._getDate(inst):null)||new Date(),
year=date.getFullYear(),
month=date.getMonth(),
day=date.getDate(),
pattern=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
matches=pattern.exec(offset);
while(matches){
switch(matches[ 2 ]||"d"){
case "d":case "D" :
day +=parseInt(matches[ 1 ], 10); break;
case "w":case "W" :
day +=parseInt(matches[ 1 ], 10) * 7; break;
case "m":case "M" :
month +=parseInt(matches[ 1 ], 10);
day=Math.min(day, $.datepicker._getDaysInMonth(year, month));
break;
case "y": case "Y" :
year +=parseInt(matches[ 1 ], 10);
day=Math.min(day, $.datepicker._getDaysInMonth(year, month));
break;
}
matches=pattern.exec(offset);
}
return new Date(year, month, day);
},
newDate=(date==null||date==="" ? defaultDate:(typeof date==="string" ? offsetString(date) :
(typeof date==="number" ?(isNaN(date) ? defaultDate:offsetNumeric(date)):new Date(date.getTime()))));
newDate=(newDate&&newDate.toString()==="Invalid Date" ? defaultDate:newDate);
if(newDate){
newDate.setHours(0);
newDate.setMinutes(0);
newDate.setSeconds(0);
newDate.setMilliseconds(0);
}
return this._daylightSavingAdjust(newDate);
},
_daylightSavingAdjust: function(date){
if(!date){
return null;
}
date.setHours(date.getHours() > 12 ? date.getHours() + 2:0);
return date;
},
_setDate: function(inst, date, noChange){
var clear = !date,
origMonth=inst.selectedMonth,
origYear=inst.selectedYear,
newDate=this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
inst.selectedDay=inst.currentDay=newDate.getDate();
inst.drawMonth=inst.selectedMonth=inst.currentMonth=newDate.getMonth();
inst.drawYear=inst.selectedYear=inst.currentYear=newDate.getFullYear();
if(( origMonth!==inst.selectedMonth||origYear!==inst.selectedYear)&&!noChange){
this._notifyChange(inst);
}
this._adjustInstDate(inst);
if(inst.input){
inst.input.val(clear ? "":this._formatDate(inst));
}},
_getDate: function(inst){
var startDate=(!inst.currentYear||(inst.input&&inst.input.val()==="") ? null :
this._daylightSavingAdjust(new Date(
inst.currentYear, inst.currentMonth, inst.currentDay)));
return startDate;
},
_attachHandlers: function(inst){
var stepMonths=this._get(inst, "stepMonths"),
id="#" + inst.id.replace(/\\\\/g, "\\");
inst.dpDiv.find("[data-handler]").map(function(){
var handler={
prev: function(){
$.datepicker._adjustDate(id, -stepMonths, "M");
},
next: function(){
$.datepicker._adjustDate(id, +stepMonths, "M");
},
hide: function(){
$.datepicker._hideDatepicker();
},
today: function(){
$.datepicker._gotoToday(id);
},
selectDay: function(){
$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
return false;
},
selectMonth: function(){
$.datepicker._selectMonthYear(id, this, "M");
return false;
},
selectYear: function(){
$.datepicker._selectMonthYear(id, this, "Y");
return false;
}};
$(this).on(this.getAttribute("data-event"), handler[ this.getAttribute("data-handler") ]);
});
},
_generateHTML: function(inst){
var maxDraw, prevText, prev, nextText, next, currentText, gotoDate,
controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin,
monthNames, monthNamesShort, beforeShowDay, showOtherMonths,
selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate,
cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows,
printDate, dRow, tbody, daySettings, otherMonth, unselectable,
tempDate=new Date(),
today=this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())),
isRTL=this._get(inst, "isRTL"),
showButtonPanel=this._get(inst, "showButtonPanel"),
hideIfNoPrevNext=this._get(inst, "hideIfNoPrevNext"),
navigationAsDateFormat=this._get(inst, "navigationAsDateFormat"),
numMonths=this._getNumberOfMonths(inst),
showCurrentAtPos=this._get(inst, "showCurrentAtPos"),
stepMonths=this._get(inst, "stepMonths"),
isMultiMonth=(numMonths[ 0 ]!==1||numMonths[ 1 ]!==1),
currentDate=this._daylightSavingAdjust(( !inst.currentDay ? new Date(9999, 9, 9) :
new Date(inst.currentYear, inst.currentMonth, inst.currentDay))),
minDate=this._getMinMaxDate(inst, "min"),
maxDate=this._getMinMaxDate(inst, "max"),
drawMonth=inst.drawMonth - showCurrentAtPos,
drawYear=inst.drawYear;
if(drawMonth < 0){
drawMonth +=12;
drawYear--;
}
if(maxDate){
maxDraw=this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
maxDate.getMonth() -(numMonths[ 0 ] * numMonths[ 1 ]) + 1, maxDate.getDate()));
maxDraw=(minDate&&maxDraw < minDate ? minDate:maxDraw);
while(this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw){
drawMonth--;
if(drawMonth < 0){
drawMonth=11;
drawYear--;
}}
}
inst.drawMonth=drawMonth;
inst.drawYear=drawYear;
prevText=this._get(inst, "prevText");
prevText=(!navigationAsDateFormat ? prevText:this.formatDate(prevText,
this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
this._getFormatConfig(inst)));
prev=(this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" +
" title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" +(isRTL ? "e":"w") + "'>" + prevText + "</span></a>" :
(hideIfNoPrevNext ? "":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" +(isRTL ? "e":"w") + "'>" + prevText + "</span></a>"));
nextText=this._get(inst, "nextText");
nextText=(!navigationAsDateFormat ? nextText:this.formatDate(nextText,
this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
this._getFormatConfig(inst)));
next=(this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" +
" title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" +(isRTL ? "w":"e") + "'>" + nextText + "</span></a>" :
(hideIfNoPrevNext ? "":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" +(isRTL ? "w":"e") + "'>" + nextText + "</span></a>"));
currentText=this._get(inst, "currentText");
gotoDate=(this._get(inst, "gotoCurrent")&&inst.currentDay ? currentDate:today);
currentText=(!navigationAsDateFormat ? currentText :
this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
controls=(!inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
this._get(inst, "closeText") + "</button>":"");
buttonPanel=(showButtonPanel) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +(isRTL ? controls:"") +
(this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" +
">" + currentText + "</button>":"") +(isRTL ? "":controls) + "</div>":"";
firstDay=parseInt(this._get(inst, "firstDay"), 10);
firstDay=(isNaN(firstDay) ? 0:firstDay);
showWeek=this._get(inst, "showWeek");
dayNames=this._get(inst, "dayNames");
dayNamesMin=this._get(inst, "dayNamesMin");
monthNames=this._get(inst, "monthNames");
monthNamesShort=this._get(inst, "monthNamesShort");
beforeShowDay=this._get(inst, "beforeShowDay");
showOtherMonths=this._get(inst, "showOtherMonths");
selectOtherMonths=this._get(inst, "selectOtherMonths");
defaultDate=this._getDefaultDate(inst);
html="";
for(row=0; row < numMonths[ 0 ]; row++){
group="";
this.maxRows=4;
for(col=0; col < numMonths[ 1 ]; col++){
selectedDate=this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
cornerClass=" ui-corner-all";
calender="";
if(isMultiMonth){
calender +="<div class='ui-datepicker-group";
if(numMonths[ 1 ] > 1){
switch(col){
case 0: calender +=" ui-datepicker-group-first";
cornerClass=" ui-corner-" +(isRTL ? "right":"left"); break;
case numMonths[ 1 ] - 1: calender +=" ui-datepicker-group-last";
cornerClass=" ui-corner-" +(isRTL ? "left":"right"); break;
default: calender +=" ui-datepicker-group-middle"; cornerClass=""; break;
}}
calender +="'>";
}
calender +="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" +
(/all|left/.test(cornerClass)&&row===0 ?(isRTL ? next:prev):"") +
(/all|right/.test(cornerClass)&&row===0 ?(isRTL ? prev:next):"") +
this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
row > 0||col > 0, monthNames, monthNamesShort) +
"</div><table class='ui-datepicker-calendar'><thead>" +
"<tr>";
thead=(showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>":"");
for(dow=0; dow < 7; dow++){
day=(dow + firstDay) % 7;
thead +="<th scope='col'" +(( dow + firstDay + 6) % 7 >=5 ? " class='ui-datepicker-week-end'":"") + ">" +
"<span title='" + dayNames[ day ] + "'>" + dayNamesMin[ day ] + "</span></th>";
}
calender +=thead + "</tr></thead><tbody>";
daysInMonth=this._getDaysInMonth(drawYear, drawMonth);
if(drawYear===inst.selectedYear&&drawMonth===inst.selectedMonth){
inst.selectedDay=Math.min(inst.selectedDay, daysInMonth);
}
leadDays=(this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
curRows=Math.ceil(( leadDays + daysInMonth) / 7);
numRows=(isMultiMonth ? this.maxRows > curRows ? this.maxRows:curRows:curRows);
this.maxRows=numRows;
printDate=this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
for(dRow=0; dRow < numRows; dRow++){
calender +="<tr>";
tbody=(!showWeek ? "":"<td class='ui-datepicker-week-col'>" +
this._get(inst, "calculateWeek")(printDate) + "</td>");
for(dow=0; dow < 7; dow++){
daySettings=(beforeShowDay ?
beforeShowDay.apply(( inst.input ? inst.input[ 0 ]:null), [ printDate ]):[ true, "" ]);
otherMonth=(printDate.getMonth()!==drawMonth);
unselectable=(otherMonth&&!selectOtherMonths)||!daySettings[ 0 ] ||
(minDate&&printDate < minDate)||(maxDate&&printDate > maxDate);
tbody +="<td class='" +
(( dow + firstDay + 6) % 7 >=5 ? " ui-datepicker-week-end":"") +
(otherMonth ? " ui-datepicker-other-month":"") +
(( printDate.getTime()===selectedDate.getTime()&&drawMonth===inst.selectedMonth&&inst._keyEvent) ||
(defaultDate.getTime()===printDate.getTime()&&defaultDate.getTime()===selectedDate.getTime()) ?
" " + this._dayOverClass:"") +
(unselectable ? " " + this._unselectableClass + " ui-state-disabled":"") +
(otherMonth&&!showOtherMonths ? "":" " + daySettings[ 1 ] +
(printDate.getTime()===currentDate.getTime() ? " " + this._currentClass:"") +
(printDate.getTime()===today.getTime() ? " ui-datepicker-today":"")) + "'" +
(( !otherMonth||showOtherMonths)&&daySettings[ 2 ] ? " title='" + daySettings[ 2 ].replace(/'/g, "&#39;") + "'":"") +
(unselectable ? "":" data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" +
(otherMonth&&!showOtherMonths ? "&#xa0;" :
(unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>":"<a class='ui-state-default" +
(printDate.getTime()===today.getTime() ? " ui-state-highlight":"") +
(printDate.getTime()===currentDate.getTime() ? " ui-state-active":"") +
(otherMonth ? " ui-priority-secondary":"") +
"' href='#'>" + printDate.getDate() + "</a>")) + "</td>";
printDate.setDate(printDate.getDate() + 1);
printDate=this._daylightSavingAdjust(printDate);
}
calender +=tbody + "</tr>";
}
drawMonth++;
if(drawMonth > 11){
drawMonth=0;
drawYear++;
}
calender +="</tbody></table>" +(isMultiMonth ? "</div>" +
(( numMonths[ 0 ] > 0&&col===numMonths[ 1 ] - 1) ? "<div class='ui-datepicker-row-break'></div>":""):"");
group +=calender;
}
html +=group;
}
html +=buttonPanel;
inst._keyEvent=false;
return html;
},
_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
secondary, monthNames, monthNamesShort){
var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
changeMonth=this._get(inst, "changeMonth"),
changeYear=this._get(inst, "changeYear"),
showMonthAfterYear=this._get(inst, "showMonthAfterYear"),
html="<div class='ui-datepicker-title'>",
monthHtml="";
if(secondary||!changeMonth){
monthHtml +="<span class='ui-datepicker-month'>" + monthNames[ drawMonth ] + "</span>";
}else{
inMinYear=(minDate&&minDate.getFullYear()===drawYear);
inMaxYear=(maxDate&&maxDate.getFullYear()===drawYear);
monthHtml +="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
for(month=0; month < 12; month++){
if(( !inMinYear||month >=minDate.getMonth())&&(!inMaxYear||month <=maxDate.getMonth())){
monthHtml +="<option value='" + month + "'" +
(month===drawMonth ? " selected='selected'":"") +
">" + monthNamesShort[ month ] + "</option>";
}}
monthHtml +="</select>";
}
if(!showMonthAfterYear){
html +=monthHtml +(secondary||!(changeMonth&&changeYear) ? "&#xa0;":"");
}
if(!inst.yearshtml){
inst.yearshtml="";
if(secondary||!changeYear){
html +="<span class='ui-datepicker-year'>" + drawYear + "</span>";
}else{
years=this._get(inst, "yearRange").split(":");
thisYear=new Date().getFullYear();
determineYear=function(value){
var year=(value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :
(value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :
parseInt(value, 10)));
return(isNaN(year) ? thisYear:year);
};
year=determineYear(years[ 0 ]);
endYear=Math.max(year, determineYear(years[ 1 ]||""));
year=(minDate ? Math.max(year, minDate.getFullYear()):year);
endYear=(maxDate ? Math.min(endYear, maxDate.getFullYear()):endYear);
inst.yearshtml +="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
for(; year <=endYear; year++){
inst.yearshtml +="<option value='" + year + "'" +
(year===drawYear ? " selected='selected'":"") +
">" + year + "</option>";
}
inst.yearshtml +="</select>";
html +=inst.yearshtml;
inst.yearshtml=null;
}}
html +=this._get(inst, "yearSuffix");
if(showMonthAfterYear){
html +=(secondary||!(changeMonth&&changeYear) ? "&#xa0;":"") + monthHtml;
}
html +="</div>";
return html;
},
_adjustInstDate: function(inst, offset, period){
var year=inst.selectedYear +(period==="Y" ? offset:0),
month=inst.selectedMonth +(period==="M" ? offset:0),
day=Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +(period==="D" ? offset:0),
date=this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();
if(period==="M"||period==="Y"){
this._notifyChange(inst);
}},
_restrictMinMax: function(inst, date){
var minDate=this._getMinMaxDate(inst, "min"),
maxDate=this._getMinMaxDate(inst, "max"),
newDate=(minDate&&date < minDate ? minDate:date);
return(maxDate&&newDate > maxDate ? maxDate:newDate);
},
_notifyChange: function(inst){
var onChange=this._get(inst, "onChangeMonthYear");
if(onChange){
onChange.apply(( inst.input ? inst.input[ 0 ]:null),
[ inst.selectedYear, inst.selectedMonth + 1, inst ]);
}},
_getNumberOfMonths: function(inst){
var numMonths=this._get(inst, "numberOfMonths");
return(numMonths==null ? [ 1, 1 ]:(typeof numMonths==="number" ? [ 1, numMonths ]:numMonths));
},
_getMinMaxDate: function(inst, minMax){
return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
},
_getDaysInMonth: function(year, month){
return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
},
_getFirstDayOfMonth: function(year, month){
return new Date(year, month, 1).getDay();
},
_canAdjustMonth: function(inst, offset, curYear, curMonth){
var numMonths=this._getNumberOfMonths(inst),
date=this._daylightSavingAdjust(new Date(curYear,
curMonth +(offset < 0 ? offset:numMonths[ 0 ] * numMonths[ 1 ]), 1));
if(offset < 0){
date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
}
return this._isInRange(inst, date);
},
_isInRange: function(inst, date){
var yearSplit, currentYear,
minDate=this._getMinMaxDate(inst, "min"),
maxDate=this._getMinMaxDate(inst, "max"),
minYear=null,
maxYear=null,
years=this._get(inst, "yearRange");
if(years){
yearSplit=years.split(":");
currentYear=new Date().getFullYear();
minYear=parseInt(yearSplit[ 0 ], 10);
maxYear=parseInt(yearSplit[ 1 ], 10);
if(yearSplit[ 0 ].match(/[+\-].*/)){
minYear +=currentYear;
}
if(yearSplit[ 1 ].match(/[+\-].*/)){
maxYear +=currentYear;
}}
return(( !minDate||date.getTime() >=minDate.getTime()) &&
(!maxDate||date.getTime() <=maxDate.getTime()) &&
(!minYear||date.getFullYear() >=minYear) &&
(!maxYear||date.getFullYear() <=maxYear));
},
_getFormatConfig: function(inst){
var shortYearCutoff=this._get(inst, "shortYearCutoff");
shortYearCutoff=(typeof shortYearCutoff!=="string" ? shortYearCutoff :
new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
return { shortYearCutoff: shortYearCutoff,
dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),
monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames") };},
_formatDate: function(inst, day, month, year){
if(!day){
inst.currentDay=inst.selectedDay;
inst.currentMonth=inst.selectedMonth;
inst.currentYear=inst.selectedYear;
}
var date=(day ?(typeof day==="object" ? day :
this._daylightSavingAdjust(new Date(year, month, day))) :
this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
}});
function datepicker_bindHover(dpDiv){
var selector="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
return dpDiv.on("mouseout", selector, function(){
$(this).removeClass("ui-state-hover");
if(this.className.indexOf("ui-datepicker-prev")!==-1){
$(this).removeClass("ui-datepicker-prev-hover");
}
if(this.className.indexOf("ui-datepicker-next")!==-1){
$(this).removeClass("ui-datepicker-next-hover");
}})
.on("mouseover", selector, datepicker_handleMouseover);
}
function datepicker_handleMouseover(){
if(!$.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[ 0 ]:datepicker_instActive.input[ 0 ])){
$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
$(this).addClass("ui-state-hover");
if(this.className.indexOf("ui-datepicker-prev")!==-1){
$(this).addClass("ui-datepicker-prev-hover");
}
if(this.className.indexOf("ui-datepicker-next")!==-1){
$(this).addClass("ui-datepicker-next-hover");
}}
}
function datepicker_extendRemove(target, props){
$.extend(target, props);
for(var name in props){
if(props[ name ]==null){
target[ name ]=props[ name ];
}}
return target;
}
$.fn.datepicker=function(options){
if(!this.length){
return this;
}
if(!$.datepicker.initialized){
$(document).on("mousedown", $.datepicker._checkExternalClick);
$.datepicker.initialized=true;
}
if($("#" + $.datepicker._mainDivId).length===0){
$("body").append($.datepicker.dpDiv);
}
var otherArgs=Array.prototype.slice.call(arguments, 1);
if(typeof options==="string"&&(options==="isDisabled"||options==="getDate"||options==="widget")){
return $.datepicker[ "_" + options + "Datepicker" ].
apply($.datepicker, [ this[ 0 ] ].concat(otherArgs));
}
if(options==="option"&&arguments.length===2&&typeof arguments[ 1 ]==="string"){
return $.datepicker[ "_" + options + "Datepicker" ].
apply($.datepicker, [ this[ 0 ] ].concat(otherArgs));
}
return this.each(function(){
typeof options==="string" ?
$.datepicker[ "_" + options + "Datepicker" ].
apply($.datepicker, [ this ].concat(otherArgs)) :
$.datepicker._attachDatepicker(this, options);
});
};
$.datepicker=new Datepicker();
$.datepicker.initialized=false;
$.datepicker.uuid=new Date().getTime();
$.datepicker.version="1.12.1";
var widgetsDatepicker=$.datepicker;
var ie=$.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
var mouseHandled=false;
$(document).on("mouseup", function(){
mouseHandled=false;
});
var widgetsMouse=$.widget("ui.mouse", {
version: "1.12.1",
options: {
cancel: "input, textarea, button, select, option",
distance: 1,
delay: 0
},
_mouseInit: function(){
var that=this;
this.element
.on("mousedown." + this.widgetName, function(event){
return that._mouseDown(event);
})
.on("click." + this.widgetName, function(event){
if(true===$.data(event.target, that.widgetName + ".preventClickEvent")){
$.removeData(event.target, that.widgetName + ".preventClickEvent");
event.stopImmediatePropagation();
return false;
}});
this.started=false;
},
_mouseDestroy: function(){
this.element.off("." + this.widgetName);
if(this._mouseMoveDelegate){
this.document
.off("mousemove." + this.widgetName, this._mouseMoveDelegate)
.off("mouseup." + this.widgetName, this._mouseUpDelegate);
}},
_mouseDown: function(event){
if(mouseHandled){
return;
}
this._mouseMoved=false;
(this._mouseStarted&&this._mouseUp(event));
this._mouseDownEvent=event;
var that=this,
btnIsLeft=(event.which===1),
elIsCancel=(typeof this.options.cancel==="string"&&event.target.nodeName ?
$(event.target).closest(this.options.cancel).length:false);
if(!btnIsLeft||elIsCancel||!this._mouseCapture(event)){
return true;
}
this.mouseDelayMet = !this.options.delay;
if(!this.mouseDelayMet){
this._mouseDelayTimer=setTimeout(function(){
that.mouseDelayMet=true;
}, this.options.delay);
}
if(this._mouseDistanceMet(event)&&this._mouseDelayMet(event)){
this._mouseStarted=(this._mouseStart(event)!==false);
if(!this._mouseStarted){
event.preventDefault();
return true;
}}
if(true===$.data(event.target, this.widgetName + ".preventClickEvent")){
$.removeData(event.target, this.widgetName + ".preventClickEvent");
}
this._mouseMoveDelegate=function(event){
return that._mouseMove(event);
};
this._mouseUpDelegate=function(event){
return that._mouseUp(event);
};
this.document
.on("mousemove." + this.widgetName, this._mouseMoveDelegate)
.on("mouseup." + this.widgetName, this._mouseUpDelegate);
event.preventDefault();
mouseHandled=true;
return true;
},
_mouseMove: function(event){
if(this._mouseMoved){
if($.ui.ie&&(!document.documentMode||document.documentMode < 9) &&
!event.button){
return this._mouseUp(event);
}else if(!event.which){
if(event.originalEvent.altKey||event.originalEvent.ctrlKey ||
event.originalEvent.metaKey||event.originalEvent.shiftKey){
this.ignoreMissingWhich=true;
}else if(!this.ignoreMissingWhich){
return this._mouseUp(event);
}}
}
if(event.which||event.button){
this._mouseMoved=true;
}
if(this._mouseStarted){
this._mouseDrag(event);
return event.preventDefault();
}
if(this._mouseDistanceMet(event)&&this._mouseDelayMet(event)){
this._mouseStarted =
(this._mouseStart(this._mouseDownEvent, event)!==false);
(this._mouseStarted ? this._mouseDrag(event):this._mouseUp(event));
}
return !this._mouseStarted;
},
_mouseUp: function(event){
this.document
.off("mousemove." + this.widgetName, this._mouseMoveDelegate)
.off("mouseup." + this.widgetName, this._mouseUpDelegate);
if(this._mouseStarted){
this._mouseStarted=false;
if(event.target===this._mouseDownEvent.target){
$.data(event.target, this.widgetName + ".preventClickEvent", true);
}
this._mouseStop(event);
}
if(this._mouseDelayTimer){
clearTimeout(this._mouseDelayTimer);
delete this._mouseDelayTimer;
}
this.ignoreMissingWhich=false;
mouseHandled=false;
event.preventDefault();
},
_mouseDistanceMet: function(event){
return(Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX),
Math.abs(this._mouseDownEvent.pageY - event.pageY)
) >=this.options.distance
);
},
_mouseDelayMet: function(){
return this.mouseDelayMet;
},
_mouseStart: function(){},
_mouseDrag: function(){},
_mouseStop: function(){},
_mouseCapture: function(){ return true; }});
var plugin=$.ui.plugin={
add: function(module, option, set){
var i,
proto=$.ui[ module ].prototype;
for(i in set){
proto.plugins[ i ]=proto.plugins[ i ]||[];
proto.plugins[ i ].push([ option, set[ i ] ]);
}},
call: function(instance, name, args, allowDisconnected){
var i,
set=instance.plugins[ name ];
if(!set){
return;
}
if(!allowDisconnected&&(!instance.element[ 0 ].parentNode ||
instance.element[ 0 ].parentNode.nodeType===11)){
return;
}
for(i=0; i < set.length; i++){
if(instance.options[ set[ i ][ 0 ] ]){
set[ i ][ 1 ].apply(instance.element, args);
}}
}};
var safeBlur=$.ui.safeBlur=function(element){
if(element&&element.nodeName.toLowerCase()!=="body"){
$(element).trigger("blur");
}};
$.widget("ui.draggable", $.ui.mouse, {
version: "1.12.1",
widgetEventPrefix: "drag",
options: {
addClasses: true,
appendTo: "parent",
axis: false,
connectToSortable: false,
containment: false,
cursor: "auto",
cursorAt: false,
grid: false,
handle: false,
helper: "original",
iframeFix: false,
opacity: false,
refreshPositions: false,
revert: false,
revertDuration: 500,
scope: "default",
scroll: true,
scrollSensitivity: 20,
scrollSpeed: 20,
snap: false,
snapMode: "both",
snapTolerance: 20,
stack: false,
zIndex: false,
drag: null,
start: null,
stop: null
},
_create: function(){
if(this.options.helper==="original"){
this._setPositionRelative();
}
if(this.options.addClasses){
this._addClass("ui-draggable");
}
this._setHandleClassName();
this._mouseInit();
},
_setOption: function(key, value){
this._super(key, value);
if(key==="handle"){
this._removeHandleClassName();
this._setHandleClassName();
}},
_destroy: function(){
if(( this.helper||this.element).is(".ui-draggable-dragging")){
this.destroyOnClear=true;
return;
}
this._removeHandleClassName();
this._mouseDestroy();
},
_mouseCapture: function(event){
var o=this.options;
if(this.helper||o.disabled ||
$(event.target).closest(".ui-resizable-handle").length > 0){
return false;
}
this.handle=this._getHandle(event);
if(!this.handle){
return false;
}
this._blurActiveElement(event);
this._blockFrames(o.iframeFix===true ? "iframe":o.iframeFix);
return true;
},
_blockFrames: function(selector){
this.iframeBlocks=this.document.find(selector).map(function(){
var iframe=$(this);
return $("<div>")
.css("position", "absolute")
.appendTo(iframe.parent())
.outerWidth(iframe.outerWidth())
.outerHeight(iframe.outerHeight())
.offset(iframe.offset())[ 0 ];
});
},
_unblockFrames: function(){
if(this.iframeBlocks){
this.iframeBlocks.remove();
delete this.iframeBlocks;
}},
_blurActiveElement: function(event){
var activeElement=$.ui.safeActiveElement(this.document[ 0 ]),
target=$(event.target);
if(target.closest(activeElement).length){
return;
}
$.ui.safeBlur(activeElement);
},
_mouseStart: function(event){
var o=this.options;
this.helper=this._createHelper(event);
this._addClass(this.helper, "ui-draggable-dragging");
this._cacheHelperProportions();
if($.ui.ddmanager){
$.ui.ddmanager.current=this;
}
this._cacheMargins();
this.cssPosition=this.helper.css("position");
this.scrollParent=this.helper.scrollParent(true);
this.offsetParent=this.helper.offsetParent();
this.hasFixedAncestor=this.helper.parents().filter(function(){
return $(this).css("position")==="fixed";
}).length > 0;
this.positionAbs=this.element.offset();
this._refreshOffsets(event);
this.originalPosition=this.position=this._generatePosition(event, false);
this.originalPageX=event.pageX;
this.originalPageY=event.pageY;
(o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt));
this._setContainment();
if(this._trigger("start", event)===false){
this._clear();
return false;
}
this._cacheHelperProportions();
if($.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(this, event);
}
this._mouseDrag(event, true);
if($.ui.ddmanager){
$.ui.ddmanager.dragStart(this, event);
}
return true;
},
_refreshOffsets: function(event){
this.offset={
top: this.positionAbs.top - this.margins.top,
left: this.positionAbs.left - this.margins.left,
scroll: false,
parent: this._getParentOffset(),
relative: this._getRelativeOffset()
};
this.offset.click={
left: event.pageX - this.offset.left,
top: event.pageY - this.offset.top
};},
_mouseDrag: function(event, noPropagation){
if(this.hasFixedAncestor){
this.offset.parent=this._getParentOffset();
}
this.position=this._generatePosition(event, true);
this.positionAbs=this._convertPositionTo("absolute");
if(!noPropagation){
var ui=this._uiHash();
if(this._trigger("drag", event, ui)===false){
this._mouseUp(new $.Event("mouseup", event));
return false;
}
this.position=ui.position;
}
this.helper[ 0 ].style.left=this.position.left + "px";
this.helper[ 0 ].style.top=this.position.top + "px";
if($.ui.ddmanager){
$.ui.ddmanager.drag(this, event);
}
return false;
},
_mouseStop: function(event){
var that=this,
dropped=false;
if($.ui.ddmanager&&!this.options.dropBehaviour){
dropped=$.ui.ddmanager.drop(this, event);
}
if(this.dropped){
dropped=this.dropped;
this.dropped=false;
}
if(( this.options.revert==="invalid"&&!dropped) ||
(this.options.revert==="valid"&&dropped) ||
this.options.revert===true||($.isFunction(this.options.revert) &&
this.options.revert.call(this.element, dropped))
){
$(this.helper).animate(this.originalPosition,
parseInt(this.options.revertDuration, 10),
function(){
if(that._trigger("stop", event)!==false){
that._clear();
}}
);
}else{
if(this._trigger("stop", event)!==false){
this._clear();
}}
return false;
},
_mouseUp: function(event){
this._unblockFrames();
if($.ui.ddmanager){
$.ui.ddmanager.dragStop(this, event);
}
if(this.handleElement.is(event.target)){
this.element.trigger("focus");
}
return $.ui.mouse.prototype._mouseUp.call(this, event);
},
cancel: function(){
if(this.helper.is(".ui-draggable-dragging")){
this._mouseUp(new $.Event("mouseup", { target: this.element[ 0 ] }));
}else{
this._clear();
}
return this;
},
_getHandle: function(event){
return this.options.handle ?
!!$(event.target).closest(this.element.find(this.options.handle)).length :
true;
},
_setHandleClassName: function(){
this.handleElement=this.options.handle ?
this.element.find(this.options.handle):this.element;
this._addClass(this.handleElement, "ui-draggable-handle");
},
_removeHandleClassName: function(){
this._removeClass(this.handleElement, "ui-draggable-handle");
},
_createHelper: function(event){
var o=this.options,
helperIsFunction=$.isFunction(o.helper),
helper=helperIsFunction ?
$(o.helper.apply(this.element[ 0 ], [ event ])) :
(o.helper==="clone" ?
this.element.clone().removeAttr("id") :
this.element);
if(!helper.parents("body").length){
helper.appendTo(( o.appendTo==="parent" ?
this.element[ 0 ].parentNode :
o.appendTo));
}
if(helperIsFunction&&helper[ 0 ]===this.element[ 0 ]){
this._setPositionRelative();
}
if(helper[ 0 ]!==this.element[ 0 ] &&
!(/(fixed|absolute)/).test(helper.css("position"))){
helper.css("position", "absolute");
}
return helper;
},
_setPositionRelative: function(){
if(!(/^(?:r|a|f)/).test(this.element.css("position"))){
this.element[ 0 ].style.position="relative";
}},
_adjustOffsetFromHelper: function(obj){
if(typeof obj==="string"){
obj=obj.split(" ");
}
if($.isArray(obj)){
obj={ left: +obj[ 0 ], top: +obj[ 1 ]||0 };}
if("left" in obj){
this.offset.click.left=obj.left + this.margins.left;
}
if("right" in obj){
this.offset.click.left=this.helperProportions.width - obj.right + this.margins.left;
}
if("top" in obj){
this.offset.click.top=obj.top + this.margins.top;
}
if("bottom" in obj){
this.offset.click.top=this.helperProportions.height - obj.bottom + this.margins.top;
}},
_isRootNode: function(element){
return(/(html|body)/i).test(element.tagName)||element===this.document[ 0 ];
},
_getParentOffset: function(){
var po=this.offsetParent.offset(),
document=this.document[ 0 ];
if(this.cssPosition==="absolute"&&this.scrollParent[ 0 ]!==document &&
$.contains(this.scrollParent[ 0 ], this.offsetParent[ 0 ])){
po.left +=this.scrollParent.scrollLeft();
po.top +=this.scrollParent.scrollTop();
}
if(this._isRootNode(this.offsetParent[ 0 ])){
po={ top: 0, left: 0 };}
return {
top: po.top +(parseInt(this.offsetParent.css("borderTopWidth"), 10)||0),
left: po.left +(parseInt(this.offsetParent.css("borderLeftWidth"), 10)||0)
};},
_getRelativeOffset: function(){
if(this.cssPosition!=="relative"){
return { top: 0, left: 0 };}
var p=this.element.position(),
scrollIsRootNode=this._isRootNode(this.scrollParent[ 0 ]);
return {
top: p.top -(parseInt(this.helper.css("top"), 10)||0) +
(!scrollIsRootNode ? this.scrollParent.scrollTop():0),
left: p.left -(parseInt(this.helper.css("left"), 10)||0) +
(!scrollIsRootNode ? this.scrollParent.scrollLeft():0)
};},
_cacheMargins: function(){
this.margins={
left:(parseInt(this.element.css("marginLeft"), 10)||0),
top:(parseInt(this.element.css("marginTop"), 10)||0),
right:(parseInt(this.element.css("marginRight"), 10)||0),
bottom:(parseInt(this.element.css("marginBottom"), 10)||0)
};},
_cacheHelperProportions: function(){
this.helperProportions={
width: this.helper.outerWidth(),
height: this.helper.outerHeight()
};},
_setContainment: function(){
var isUserScrollable, c, ce,
o=this.options,
document=this.document[ 0 ];
this.relativeContainer=null;
if(!o.containment){
this.containment=null;
return;
}
if(o.containment==="window"){
this.containment=[
$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
$(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
$(window).scrollLeft() + $(window).width() -
this.helperProportions.width - this.margins.left,
$(window).scrollTop() +
($(window).height()||document.body.parentNode.scrollHeight) -
this.helperProportions.height - this.margins.top
];
return;
}
if(o.containment==="document"){
this.containment=[
0,
0,
$(document).width() - this.helperProportions.width - this.margins.left,
($(document).height()||document.body.parentNode.scrollHeight) -
this.helperProportions.height - this.margins.top
];
return;
}
if(o.containment.constructor===Array){
this.containment=o.containment;
return;
}
if(o.containment==="parent"){
o.containment=this.helper[ 0 ].parentNode;
}
c=$(o.containment);
ce=c[ 0 ];
if(!ce){
return;
}
isUserScrollable=/(scroll|auto)/.test(c.css("overflow"));
this.containment=[
(parseInt(c.css("borderLeftWidth"), 10)||0) +
(parseInt(c.css("paddingLeft"), 10)||0),
(parseInt(c.css("borderTopWidth"), 10)||0) +
(parseInt(c.css("paddingTop"), 10)||0),
(isUserScrollable ? Math.max(ce.scrollWidth, ce.offsetWidth):ce.offsetWidth) -
(parseInt(c.css("borderRightWidth"), 10)||0) -
(parseInt(c.css("paddingRight"), 10)||0) -
this.helperProportions.width -
this.margins.left -
this.margins.right,
(isUserScrollable ? Math.max(ce.scrollHeight, ce.offsetHeight):ce.offsetHeight) -
(parseInt(c.css("borderBottomWidth"), 10)||0) -
(parseInt(c.css("paddingBottom"), 10)||0) -
this.helperProportions.height -
this.margins.top -
this.margins.bottom
];
this.relativeContainer=c;
},
_convertPositionTo: function(d, pos){
if(!pos){
pos=this.position;
}
var mod=d==="absolute" ? 1:-1,
scrollIsRootNode=this._isRootNode(this.scrollParent[ 0 ]);
return {
top: (
pos.top	+
this.offset.relative.top * mod +
this.offset.parent.top * mod -
(( this.cssPosition==="fixed" ?
-this.offset.scroll.top :
(scrollIsRootNode ? 0:this.offset.scroll.top)) * mod)
),
left: (
pos.left +
this.offset.relative.left * mod +
this.offset.parent.left * mod	-
(( this.cssPosition==="fixed" ?
-this.offset.scroll.left :
(scrollIsRootNode ? 0:this.offset.scroll.left)) * mod)
)
};},
_generatePosition: function(event, constrainPosition){
var containment, co, top, left,
o=this.options,
scrollIsRootNode=this._isRootNode(this.scrollParent[ 0 ]),
pageX=event.pageX,
pageY=event.pageY;
if(!scrollIsRootNode||!this.offset.scroll){
this.offset.scroll={
top: this.scrollParent.scrollTop(),
left: this.scrollParent.scrollLeft()
};}
if(constrainPosition){
if(this.containment){
if(this.relativeContainer){
co=this.relativeContainer.offset();
containment=[
this.containment[ 0 ] + co.left,
this.containment[ 1 ] + co.top,
this.containment[ 2 ] + co.left,
this.containment[ 3 ] + co.top
];
}else{
containment=this.containment;
}
if(event.pageX - this.offset.click.left < containment[ 0 ]){
pageX=containment[ 0 ] + this.offset.click.left;
}
if(event.pageY - this.offset.click.top < containment[ 1 ]){
pageY=containment[ 1 ] + this.offset.click.top;
}
if(event.pageX - this.offset.click.left > containment[ 2 ]){
pageX=containment[ 2 ] + this.offset.click.left;
}
if(event.pageY - this.offset.click.top > containment[ 3 ]){
pageY=containment[ 3 ] + this.offset.click.top;
}}
if(o.grid){
top=o.grid[ 1 ] ? this.originalPageY + Math.round(( pageY -
this.originalPageY) / o.grid[ 1 ]) * o.grid[ 1 ]:this.originalPageY;
pageY=containment ?(( top - this.offset.click.top >=containment[ 1 ] ||
top - this.offset.click.top > containment[ 3 ]) ?
top :
(( top - this.offset.click.top >=containment[ 1 ]) ?
top - o.grid[ 1 ]:top + o.grid[ 1 ])):top;
left=o.grid[ 0 ] ? this.originalPageX +
Math.round(( pageX - this.originalPageX) / o.grid[ 0 ]) * o.grid[ 0 ] :
this.originalPageX;
pageX=containment ?(( left - this.offset.click.left >=containment[ 0 ] ||
left - this.offset.click.left > containment[ 2 ]) ?
left :
(( left - this.offset.click.left >=containment[ 0 ]) ?
left - o.grid[ 0 ]:left + o.grid[ 0 ])):left;
}
if(o.axis==="y"){
pageX=this.originalPageX;
}
if(o.axis==="x"){
pageY=this.originalPageY;
}}
return {
top: (
pageY -
this.offset.click.top -
this.offset.relative.top -
this.offset.parent.top +
(this.cssPosition==="fixed" ?
-this.offset.scroll.top :
(scrollIsRootNode ? 0:this.offset.scroll.top))
),
left: (
pageX -
this.offset.click.left -
this.offset.relative.left -
this.offset.parent.left +
(this.cssPosition==="fixed" ?
-this.offset.scroll.left :
(scrollIsRootNode ? 0:this.offset.scroll.left))
)
};},
_clear: function(){
this._removeClass(this.helper, "ui-draggable-dragging");
if(this.helper[ 0 ]!==this.element[ 0 ]&&!this.cancelHelperRemoval){
this.helper.remove();
}
this.helper=null;
this.cancelHelperRemoval=false;
if(this.destroyOnClear){
this.destroy();
}},
_trigger: function(type, event, ui){
ui=ui||this._uiHash();
$.ui.plugin.call(this, type, [ event, ui, this ], true);
if(/^(drag|start|stop)/.test(type)){
this.positionAbs=this._convertPositionTo("absolute");
ui.offset=this.positionAbs;
}
return $.Widget.prototype._trigger.call(this, type, event, ui);
},
plugins: {},
_uiHash: function(){
return {
helper: this.helper,
position: this.position,
originalPosition: this.originalPosition,
offset: this.positionAbs
};}});
$.ui.plugin.add("draggable", "connectToSortable", {
start: function(event, ui, draggable){
var uiSortable=$.extend({}, ui, {
item: draggable.element
});
draggable.sortables=[];
$(draggable.options.connectToSortable).each(function(){
var sortable=$(this).sortable("instance");
if(sortable&&!sortable.options.disabled){
draggable.sortables.push(sortable);
sortable.refreshPositions();
sortable._trigger("activate", event, uiSortable);
}});
},
stop: function(event, ui, draggable){
var uiSortable=$.extend({}, ui, {
item: draggable.element
});
draggable.cancelHelperRemoval=false;
$.each(draggable.sortables, function(){
var sortable=this;
if(sortable.isOver){
sortable.isOver=0;
draggable.cancelHelperRemoval=true;
sortable.cancelHelperRemoval=false;
sortable._storedCSS={
position: sortable.placeholder.css("position"),
top: sortable.placeholder.css("top"),
left: sortable.placeholder.css("left")
};
sortable._mouseStop(event);
sortable.options.helper=sortable.options._helper;
}else{
sortable.cancelHelperRemoval=true;
sortable._trigger("deactivate", event, uiSortable);
}});
},
drag: function(event, ui, draggable){
$.each(draggable.sortables, function(){
var innermostIntersecting=false,
sortable=this;
sortable.positionAbs=draggable.positionAbs;
sortable.helperProportions=draggable.helperProportions;
sortable.offset.click=draggable.offset.click;
if(sortable._intersectsWith(sortable.containerCache)){
innermostIntersecting=true;
$.each(draggable.sortables, function(){
this.positionAbs=draggable.positionAbs;
this.helperProportions=draggable.helperProportions;
this.offset.click=draggable.offset.click;
if(this!==sortable &&
this._intersectsWith(this.containerCache) &&
$.contains(sortable.element[ 0 ], this.element[ 0 ])){
innermostIntersecting=false;
}
return innermostIntersecting;
});
}
if(innermostIntersecting){
if(!sortable.isOver){
sortable.isOver=1;
draggable._parent=ui.helper.parent();
sortable.currentItem=ui.helper
.appendTo(sortable.element)
.data("ui-sortable-item", true);
sortable.options._helper=sortable.options.helper;
sortable.options.helper=function(){
return ui.helper[ 0 ];
};
event.target=sortable.currentItem[ 0 ];
sortable._mouseCapture(event, true);
sortable._mouseStart(event, true, true);
sortable.offset.click.top=draggable.offset.click.top;
sortable.offset.click.left=draggable.offset.click.left;
sortable.offset.parent.left -=draggable.offset.parent.left -
sortable.offset.parent.left;
sortable.offset.parent.top -=draggable.offset.parent.top -
sortable.offset.parent.top;
draggable._trigger("toSortable", event);
draggable.dropped=sortable.element;
$.each(draggable.sortables, function(){
this.refreshPositions();
});
draggable.currentItem=draggable.element;
sortable.fromOutside=draggable;
}
if(sortable.currentItem){
sortable._mouseDrag(event);
ui.position=sortable.position;
}}else{
if(sortable.isOver){
sortable.isOver=0;
sortable.cancelHelperRemoval=true;
sortable.options._revert=sortable.options.revert;
sortable.options.revert=false;
sortable._trigger("out", event, sortable._uiHash(sortable));
sortable._mouseStop(event, true);
sortable.options.revert=sortable.options._revert;
sortable.options.helper=sortable.options._helper;
if(sortable.placeholder){
sortable.placeholder.remove();
}
ui.helper.appendTo(draggable._parent);
draggable._refreshOffsets(event);
ui.position=draggable._generatePosition(event, true);
draggable._trigger("fromSortable", event);
draggable.dropped=false;
$.each(draggable.sortables, function(){
this.refreshPositions();
});
}}
});
}});
$.ui.plugin.add("draggable", "cursor", {
start: function(event, ui, instance){
var t=$("body"),
o=instance.options;
if(t.css("cursor")){
o._cursor=t.css("cursor");
}
t.css("cursor", o.cursor);
},
stop: function(event, ui, instance){
var o=instance.options;
if(o._cursor){
$("body").css("cursor", o._cursor);
}}
});
$.ui.plugin.add("draggable", "opacity", {
start: function(event, ui, instance){
var t=$(ui.helper),
o=instance.options;
if(t.css("opacity")){
o._opacity=t.css("opacity");
}
t.css("opacity", o.opacity);
},
stop: function(event, ui, instance){
var o=instance.options;
if(o._opacity){
$(ui.helper).css("opacity", o._opacity);
}}
});
$.ui.plugin.add("draggable", "scroll", {
start: function(event, ui, i){
if(!i.scrollParentNotHidden){
i.scrollParentNotHidden=i.helper.scrollParent(false);
}
if(i.scrollParentNotHidden[ 0 ]!==i.document[ 0 ] &&
i.scrollParentNotHidden[ 0 ].tagName!=="HTML"){
i.overflowOffset=i.scrollParentNotHidden.offset();
}},
drag: function(event, ui, i){
var o=i.options,
scrolled=false,
scrollParent=i.scrollParentNotHidden[ 0 ],
document=i.document[ 0 ];
if(scrollParent!==document&&scrollParent.tagName!=="HTML"){
if(!o.axis||o.axis!=="x"){
if(( i.overflowOffset.top + scrollParent.offsetHeight) - event.pageY <
o.scrollSensitivity){
scrollParent.scrollTop=scrolled=scrollParent.scrollTop + o.scrollSpeed;
}else if(event.pageY - i.overflowOffset.top < o.scrollSensitivity){
scrollParent.scrollTop=scrolled=scrollParent.scrollTop - o.scrollSpeed;
}}
if(!o.axis||o.axis!=="y"){
if(( i.overflowOffset.left + scrollParent.offsetWidth) - event.pageX <
o.scrollSensitivity){
scrollParent.scrollLeft=scrolled=scrollParent.scrollLeft + o.scrollSpeed;
}else if(event.pageX - i.overflowOffset.left < o.scrollSensitivity){
scrollParent.scrollLeft=scrolled=scrollParent.scrollLeft - o.scrollSpeed;
}}
}else{
if(!o.axis||o.axis!=="x"){
if(event.pageY - $(document).scrollTop() < o.scrollSensitivity){
scrolled=$(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
}else if($(window).height() -(event.pageY - $(document).scrollTop()) <
o.scrollSensitivity){
scrolled=$(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
}}
if(!o.axis||o.axis!=="y"){
if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity){
scrolled=$(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed
);
}else if($(window).width() -(event.pageX - $(document).scrollLeft()) <
o.scrollSensitivity){
scrolled=$(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed
);
}}
}
if(scrolled!==false&&$.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(i, event);
}}
});
$.ui.plugin.add("draggable", "snap", {
start: function(event, ui, i){
var o=i.options;
i.snapElements=[];
$(o.snap.constructor!==String ?(o.snap.items||":data(ui-draggable)"):o.snap)
.each(function(){
var $t=$(this),
$o=$t.offset();
if(this!==i.element[ 0 ]){
i.snapElements.push({
item: this,
width: $t.outerWidth(), height: $t.outerHeight(),
top: $o.top, left: $o.left
});
}});
},
drag: function(event, ui, inst){
var ts, bs, ls, rs, l, r, t, b, i, first,
o=inst.options,
d=o.snapTolerance,
x1=ui.offset.left, x2=x1 + inst.helperProportions.width,
y1=ui.offset.top, y2=y1 + inst.helperProportions.height;
for(i=inst.snapElements.length - 1; i >=0; i--){
l=inst.snapElements[ i ].left - inst.margins.left;
r=l + inst.snapElements[ i ].width;
t=inst.snapElements[ i ].top - inst.margins.top;
b=t + inst.snapElements[ i ].height;
if(x2 < l - d||x1 > r + d||y2 < t - d||y1 > b + d ||
!$.contains(inst.snapElements[ i ].item.ownerDocument,
inst.snapElements[ i ].item)){
if(inst.snapElements[ i ].snapping){
(inst.options.snap.release &&
inst.options.snap.release.call(inst.element,
event,
$.extend(inst._uiHash(), { snapItem: inst.snapElements[ i ].item })
));
}
inst.snapElements[ i ].snapping=false;
continue;
}
if(o.snapMode!=="inner"){
ts=Math.abs(t - y2) <=d;
bs=Math.abs(b - y1) <=d;
ls=Math.abs(l - x2) <=d;
rs=Math.abs(r - x1) <=d;
if(ts){
ui.position.top=inst._convertPositionTo("relative", {
top: t - inst.helperProportions.height,
left: 0
}).top;
}
if(bs){
ui.position.top=inst._convertPositionTo("relative", {
top: b,
left: 0
}).top;
}
if(ls){
ui.position.left=inst._convertPositionTo("relative", {
top: 0,
left: l - inst.helperProportions.width
}).left;
}
if(rs){
ui.position.left=inst._convertPositionTo("relative", {
top: 0,
left: r
}).left;
}}
first=(ts||bs||ls||rs);
if(o.snapMode!=="outer"){
ts=Math.abs(t - y1) <=d;
bs=Math.abs(b - y2) <=d;
ls=Math.abs(l - x1) <=d;
rs=Math.abs(r - x2) <=d;
if(ts){
ui.position.top=inst._convertPositionTo("relative", {
top: t,
left: 0
}).top;
}
if(bs){
ui.position.top=inst._convertPositionTo("relative", {
top: b - inst.helperProportions.height,
left: 0
}).top;
}
if(ls){
ui.position.left=inst._convertPositionTo("relative", {
top: 0,
left: l
}).left;
}
if(rs){
ui.position.left=inst._convertPositionTo("relative", {
top: 0,
left: r - inst.helperProportions.width
}).left;
}}
if(!inst.snapElements[ i ].snapping&&(ts||bs||ls||rs||first)){
(inst.options.snap.snap &&
inst.options.snap.snap.call(inst.element,
event,
$.extend(inst._uiHash(), {
snapItem: inst.snapElements[ i ].item
})));
}
inst.snapElements[ i ].snapping=(ts||bs||ls||rs||first);
}}
});
$.ui.plugin.add("draggable", "stack", {
start: function(event, ui, instance){
var min,
o=instance.options,
group=$.makeArray($(o.stack)).sort(function(a, b){
return(parseInt($(a).css("zIndex"), 10)||0) -
(parseInt($(b).css("zIndex"), 10)||0);
});
if(!group.length){ return; }
min=parseInt($(group[ 0 ]).css("zIndex"), 10)||0;
$(group).each(function(i){
$(this).css("zIndex", min + i);
});
this.css("zIndex",(min + group.length));
}});
$.ui.plugin.add("draggable", "zIndex", {
start: function(event, ui, instance){
var t=$(ui.helper),
o=instance.options;
if(t.css("zIndex")){
o._zIndex=t.css("zIndex");
}
t.css("zIndex", o.zIndex);
},
stop: function(event, ui, instance){
var o=instance.options;
if(o._zIndex){
$(ui.helper).css("zIndex", o._zIndex);
}}
});
var widgetsDraggable=$.ui.draggable;
$.widget("ui.resizable", $.ui.mouse, {
version: "1.12.1",
widgetEventPrefix: "resize",
options: {
alsoResize: false,
animate: false,
animateDuration: "slow",
animateEasing: "swing",
aspectRatio: false,
autoHide: false,
classes: {
"ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
},
containment: false,
ghost: false,
grid: false,
handles: "e,s,se",
helper: false,
maxHeight: null,
maxWidth: null,
minHeight: 10,
minWidth: 10,
zIndex: 90,
resize: null,
start: null,
stop: null
},
_num: function(value){
return parseFloat(value)||0;
},
_isNumber: function(value){
return !isNaN(parseFloat(value));
},
_hasScroll: function(el, a){
if($(el).css("overflow")==="hidden"){
return false;
}
var scroll=(a&&a==="left") ? "scrollLeft":"scrollTop",
has=false;
if(el[ scroll ] > 0){
return true;
}
el[ scroll ]=1;
has=(el[ scroll ] > 0);
el[ scroll ]=0;
return has;
},
_create: function(){
var margins,
o=this.options,
that=this;
this._addClass("ui-resizable");
$.extend(this, {
_aspectRatio: !!(o.aspectRatio),
aspectRatio: o.aspectRatio,
originalElement: this.element,
_proportionallyResizeElements: [],
_helper: o.helper||o.ghost||o.animate ? o.helper||"ui-resizable-helper":null
});
if(this.element[ 0 ].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)){
this.element.wrap($("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
position: this.element.css("position"),
width: this.element.outerWidth(),
height: this.element.outerHeight(),
top: this.element.css("top"),
left: this.element.css("left")
})
);
this.element=this.element.parent().data("ui-resizable", this.element.resizable("instance")
);
this.elementIsWrapper=true;
margins={
marginTop: this.originalElement.css("marginTop"),
marginRight: this.originalElement.css("marginRight"),
marginBottom: this.originalElement.css("marginBottom"),
marginLeft: this.originalElement.css("marginLeft")
};
this.element.css(margins);
this.originalElement.css("margin", 0);
this.originalResizeStyle=this.originalElement.css("resize");
this.originalElement.css("resize", "none");
this._proportionallyResizeElements.push(this.originalElement.css({
position: "static",
zoom: 1,
display: "block"
}));
this.originalElement.css(margins);
this._proportionallyResize();
}
this._setupHandles();
if(o.autoHide){
$(this.element)
.on("mouseenter", function(){
if(o.disabled){
return;
}
that._removeClass("ui-resizable-autohide");
that._handles.show();
})
.on("mouseleave", function(){
if(o.disabled){
return;
}
if(!that.resizing){
that._addClass("ui-resizable-autohide");
that._handles.hide();
}});
}
this._mouseInit();
},
_destroy: function(){
this._mouseDestroy();
var wrapper,
_destroy=function(exp){
$(exp)
.removeData("resizable")
.removeData("ui-resizable")
.off(".resizable")
.find(".ui-resizable-handle")
.remove();
};
if(this.elementIsWrapper){
_destroy(this.element);
wrapper=this.element;
this.originalElement.css({
position: wrapper.css("position"),
width: wrapper.outerWidth(),
height: wrapper.outerHeight(),
top: wrapper.css("top"),
left: wrapper.css("left")
}).insertAfter(wrapper);
wrapper.remove();
}
this.originalElement.css("resize", this.originalResizeStyle);
_destroy(this.originalElement);
return this;
},
_setOption: function(key, value){
this._super(key, value);
switch(key){
case "handles":
this._removeHandles();
this._setupHandles();
break;
default:
break;
}},
_setupHandles: function(){
var o=this.options, handle, i, n, hname, axis, that=this;
this.handles=o.handles ||
(!$(".ui-resizable-handle", this.element).length ?
"e,s,se":{
n: ".ui-resizable-n",
e: ".ui-resizable-e",
s: ".ui-resizable-s",
w: ".ui-resizable-w",
se: ".ui-resizable-se",
sw: ".ui-resizable-sw",
ne: ".ui-resizable-ne",
nw: ".ui-resizable-nw"
});
this._handles=$();
if(this.handles.constructor===String){
if(this.handles==="all"){
this.handles="n,e,s,w,se,sw,ne,nw";
}
n=this.handles.split(",");
this.handles={};
for(i=0; i < n.length; i++){
handle=$.trim(n[ i ]);
hname="ui-resizable-" + handle;
axis=$("<div>");
this._addClass(axis, "ui-resizable-handle " + hname);
axis.css({ zIndex: o.zIndex });
this.handles[ handle ]=".ui-resizable-" + handle;
this.element.append(axis);
}}
this._renderAxis=function(target){
var i, axis, padPos, padWrapper;
target=target||this.element;
for(i in this.handles){
if(this.handles[ i ].constructor===String){
this.handles[ i ]=this.element.children(this.handles[ i ]).first().show();
}else if(this.handles[ i ].jquery||this.handles[ i ].nodeType){
this.handles[ i ]=$(this.handles[ i ]);
this._on(this.handles[ i ], { "mousedown": that._mouseDown });
}
if(this.elementIsWrapper &&
this.originalElement[ 0 ]
.nodeName
.match(/^(textarea|input|select|button)$/i)){
axis=$(this.handles[ i ], this.element);
padWrapper=/sw|ne|nw|se|n|s/.test(i) ?
axis.outerHeight() :
axis.outerWidth();
padPos=[ "padding",
/ne|nw|n/.test(i) ? "Top" :
/se|sw|s/.test(i) ? "Bottom" :
/^e$/.test(i) ? "Right":"Left" ].join("");
target.css(padPos, padWrapper);
this._proportionallyResize();
}
this._handles=this._handles.add(this.handles[ i ]);
}};
this._renderAxis(this.element);
this._handles=this._handles.add(this.element.find(".ui-resizable-handle"));
this._handles.disableSelection();
this._handles.on("mouseover", function(){
if(!that.resizing){
if(this.className){
axis=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
}
that.axis=axis&&axis[ 1 ] ? axis[ 1 ]:"se";
}});
if(o.autoHide){
this._handles.hide();
this._addClass("ui-resizable-autohide");
}},
_removeHandles: function(){
this._handles.remove();
},
_mouseCapture: function(event){
var i, handle,
capture=false;
for(i in this.handles){
handle=$(this.handles[ i ])[ 0 ];
if(handle===event.target||$.contains(handle, event.target)){
capture=true;
}}
return !this.options.disabled&&capture;
},
_mouseStart: function(event){
var curleft, curtop, cursor,
o=this.options,
el=this.element;
this.resizing=true;
this._renderProxy();
curleft=this._num(this.helper.css("left"));
curtop=this._num(this.helper.css("top"));
if(o.containment){
curleft +=$(o.containment).scrollLeft()||0;
curtop +=$(o.containment).scrollTop()||0;
}
this.offset=this.helper.offset();
this.position={ left: curleft, top: curtop };
this.size=this._helper ? {
width: this.helper.width(),
height: this.helper.height()
}:{
width: el.width(),
height: el.height()
};
this.originalSize=this._helper ? {
width: el.outerWidth(),
height: el.outerHeight()
}:{
width: el.width(),
height: el.height()
};
this.sizeDiff={
width: el.outerWidth() - el.width(),
height: el.outerHeight() - el.height()
};
this.originalPosition={ left: curleft, top: curtop };
this.originalMousePosition={ left: event.pageX, top: event.pageY };
this.aspectRatio=(typeof o.aspectRatio==="number") ?
o.aspectRatio :
(( this.originalSize.width / this.originalSize.height)||1);
cursor=$(".ui-resizable-" + this.axis).css("cursor");
$("body").css("cursor", cursor==="auto" ? this.axis + "-resize":cursor);
this._addClass("ui-resizable-resizing");
this._propagate("start", event);
return true;
},
_mouseDrag: function(event){
var data, props,
smp=this.originalMousePosition,
a=this.axis,
dx=(event.pageX - smp.left)||0,
dy=(event.pageY - smp.top)||0,
trigger=this._change[ a ];
this._updatePrevProperties();
if(!trigger){
return false;
}
data=trigger.apply(this, [ event, dx, dy ]);
this._updateVirtualBoundaries(event.shiftKey);
if(this._aspectRatio||event.shiftKey){
data=this._updateRatio(data, event);
}
data=this._respectSize(data, event);
this._updateCache(data);
this._propagate("resize", event);
props=this._applyChanges();
if(!this._helper&&this._proportionallyResizeElements.length){
this._proportionallyResize();
}
if(!$.isEmptyObject(props)){
this._updatePrevProperties();
this._trigger("resize", event, this.ui());
this._applyChanges();
}
return false;
},
_mouseStop: function(event){
this.resizing=false;
var pr, ista, soffseth, soffsetw, s, left, top,
o=this.options, that=this;
if(this._helper){
pr=this._proportionallyResizeElements;
ista=pr.length&&(/textarea/i).test(pr[ 0 ].nodeName);
soffseth=ista&&this._hasScroll(pr[ 0 ], "left") ? 0:that.sizeDiff.height;
soffsetw=ista ? 0:that.sizeDiff.width;
s={
width:(that.helper.width()  - soffsetw),
height:(that.helper.height() - soffseth)
};
left=(parseFloat(that.element.css("left")) +
(that.position.left - that.originalPosition.left))||null;
top=(parseFloat(that.element.css("top")) +
(that.position.top - that.originalPosition.top))||null;
if(!o.animate){
this.element.css($.extend(s, { top: top, left: left }));
}
that.helper.height(that.size.height);
that.helper.width(that.size.width);
if(this._helper&&!o.animate){
this._proportionallyResize();
}}
$("body").css("cursor", "auto");
this._removeClass("ui-resizable-resizing");
this._propagate("stop", event);
if(this._helper){
this.helper.remove();
}
return false;
},
_updatePrevProperties: function(){
this.prevPosition={
top: this.position.top,
left: this.position.left
};
this.prevSize={
width: this.size.width,
height: this.size.height
};},
_applyChanges: function(){
var props={};
if(this.position.top!==this.prevPosition.top){
props.top=this.position.top + "px";
}
if(this.position.left!==this.prevPosition.left){
props.left=this.position.left + "px";
}
if(this.size.width!==this.prevSize.width){
props.width=this.size.width + "px";
}
if(this.size.height!==this.prevSize.height){
props.height=this.size.height + "px";
}
this.helper.css(props);
return props;
},
_updateVirtualBoundaries: function(forceAspectRatio){
var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b,
o=this.options;
b={
minWidth: this._isNumber(o.minWidth) ? o.minWidth:0,
maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth:Infinity,
minHeight: this._isNumber(o.minHeight) ? o.minHeight:0,
maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight:Infinity
};
if(this._aspectRatio||forceAspectRatio){
pMinWidth=b.minHeight * this.aspectRatio;
pMinHeight=b.minWidth / this.aspectRatio;
pMaxWidth=b.maxHeight * this.aspectRatio;
pMaxHeight=b.maxWidth / this.aspectRatio;
if(pMinWidth > b.minWidth){
b.minWidth=pMinWidth;
}
if(pMinHeight > b.minHeight){
b.minHeight=pMinHeight;
}
if(pMaxWidth < b.maxWidth){
b.maxWidth=pMaxWidth;
}
if(pMaxHeight < b.maxHeight){
b.maxHeight=pMaxHeight;
}}
this._vBoundaries=b;
},
_updateCache: function(data){
this.offset=this.helper.offset();
if(this._isNumber(data.left)){
this.position.left=data.left;
}
if(this._isNumber(data.top)){
this.position.top=data.top;
}
if(this._isNumber(data.height)){
this.size.height=data.height;
}
if(this._isNumber(data.width)){
this.size.width=data.width;
}},
_updateRatio: function(data){
var cpos=this.position,
csize=this.size,
a=this.axis;
if(this._isNumber(data.height)){
data.width=(data.height * this.aspectRatio);
}else if(this._isNumber(data.width)){
data.height=(data.width / this.aspectRatio);
}
if(a==="sw"){
data.left=cpos.left +(csize.width - data.width);
data.top=null;
}
if(a==="nw"){
data.top=cpos.top +(csize.height - data.height);
data.left=cpos.left +(csize.width - data.width);
}
return data;
},
_respectSize: function(data){
var o=this._vBoundaries,
a=this.axis,
ismaxw=this._isNumber(data.width)&&o.maxWidth&&(o.maxWidth < data.width),
ismaxh=this._isNumber(data.height)&&o.maxHeight&&(o.maxHeight < data.height),
isminw=this._isNumber(data.width)&&o.minWidth&&(o.minWidth > data.width),
isminh=this._isNumber(data.height)&&o.minHeight&&(o.minHeight > data.height),
dw=this.originalPosition.left + this.originalSize.width,
dh=this.originalPosition.top + this.originalSize.height,
cw=/sw|nw|w/.test(a), ch=/nw|ne|n/.test(a);
if(isminw){
data.width=o.minWidth;
}
if(isminh){
data.height=o.minHeight;
}
if(ismaxw){
data.width=o.maxWidth;
}
if(ismaxh){
data.height=o.maxHeight;
}
if(isminw&&cw){
data.left=dw - o.minWidth;
}
if(ismaxw&&cw){
data.left=dw - o.maxWidth;
}
if(isminh&&ch){
data.top=dh - o.minHeight;
}
if(ismaxh&&ch){
data.top=dh - o.maxHeight;
}
if(!data.width&&!data.height&&!data.left&&data.top){
data.top=null;
}else if(!data.width&&!data.height&&!data.top&&data.left){
data.left=null;
}
return data;
},
_getPaddingPlusBorderDimensions: function(element){
var i=0,
widths=[],
borders=[
element.css("borderTopWidth"),
element.css("borderRightWidth"),
element.css("borderBottomWidth"),
element.css("borderLeftWidth")
],
paddings=[
element.css("paddingTop"),
element.css("paddingRight"),
element.css("paddingBottom"),
element.css("paddingLeft")
];
for(; i < 4; i++){
widths[ i ]=(parseFloat(borders[ i ])||0);
widths[ i ] +=(parseFloat(paddings[ i ])||0);
}
return {
height: widths[ 0 ] + widths[ 2 ],
width: widths[ 1 ] + widths[ 3 ]
};},
_proportionallyResize: function(){
if(!this._proportionallyResizeElements.length){
return;
}
var prel,
i=0,
element=this.helper||this.element;
for(; i < this._proportionallyResizeElements.length; i++){
prel=this._proportionallyResizeElements[ i ];
if(!this.outerDimensions){
this.outerDimensions=this._getPaddingPlusBorderDimensions(prel);
}
prel.css({
height:(element.height() - this.outerDimensions.height)||0,
width:(element.width() - this.outerDimensions.width)||0
});
}},
_renderProxy: function(){
var el=this.element, o=this.options;
this.elementOffset=el.offset();
if(this._helper){
this.helper=this.helper||$("<div style='overflow:hidden;'></div>");
this._addClass(this.helper, this._helper);
this.helper.css({
width: this.element.outerWidth(),
height: this.element.outerHeight(),
position: "absolute",
left: this.elementOffset.left + "px",
top: this.elementOffset.top + "px",
zIndex: ++o.zIndex
});
this.helper
.appendTo("body")
.disableSelection();
}else{
this.helper=this.element;
}},
_change: {
e: function(event, dx){
return { width: this.originalSize.width + dx };},
w: function(event, dx){
var cs=this.originalSize, sp=this.originalPosition;
return { left: sp.left + dx, width: cs.width - dx };},
n: function(event, dx, dy){
var cs=this.originalSize, sp=this.originalPosition;
return { top: sp.top + dy, height: cs.height - dy };},
s: function(event, dx, dy){
return { height: this.originalSize.height + dy };},
se: function(event, dx, dy){
return $.extend(this._change.s.apply(this, arguments),
this._change.e.apply(this, [ event, dx, dy ]));
},
sw: function(event, dx, dy){
return $.extend(this._change.s.apply(this, arguments),
this._change.w.apply(this, [ event, dx, dy ]));
},
ne: function(event, dx, dy){
return $.extend(this._change.n.apply(this, arguments),
this._change.e.apply(this, [ event, dx, dy ]));
},
nw: function(event, dx, dy){
return $.extend(this._change.n.apply(this, arguments),
this._change.w.apply(this, [ event, dx, dy ]));
}},
_propagate: function(n, event){
$.ui.plugin.call(this, n, [ event, this.ui() ]);
(n!=="resize"&&this._trigger(n, event, this.ui()));
},
plugins: {},
ui: function(){
return {
originalElement: this.originalElement,
element: this.element,
helper: this.helper,
position: this.position,
size: this.size,
originalSize: this.originalSize,
originalPosition: this.originalPosition
};}});
$.ui.plugin.add("resizable", "animate", {
stop: function(event){
var that=$(this).resizable("instance"),
o=that.options,
pr=that._proportionallyResizeElements,
ista=pr.length&&(/textarea/i).test(pr[ 0 ].nodeName),
soffseth=ista&&that._hasScroll(pr[ 0 ], "left") ? 0:that.sizeDiff.height,
soffsetw=ista ? 0:that.sizeDiff.width,
style={
width:(that.size.width - soffsetw),
height:(that.size.height - soffseth)
},
left=(parseFloat(that.element.css("left")) +
(that.position.left - that.originalPosition.left))||null,
top=(parseFloat(that.element.css("top")) +
(that.position.top - that.originalPosition.top))||null;
that.element.animate($.extend(style, top&&left ? { top: top, left: left }:{}), {
duration: o.animateDuration,
easing: o.animateEasing,
step: function(){
var data={
width: parseFloat(that.element.css("width")),
height: parseFloat(that.element.css("height")),
top: parseFloat(that.element.css("top")),
left: parseFloat(that.element.css("left"))
};
if(pr&&pr.length){
$(pr[ 0 ]).css({ width: data.width, height: data.height });
}
that._updateCache(data);
that._propagate("resize", event);
}}
);
}});
$.ui.plugin.add("resizable", "containment", {
start: function(){
var element, p, co, ch, cw, width, height,
that=$(this).resizable("instance"),
o=that.options,
el=that.element,
oc=o.containment,
ce=(oc instanceof $) ?
oc.get(0) :
(/parent/.test(oc)) ? el.parent().get(0):oc;
if(!ce){
return;
}
that.containerElement=$(ce);
if(/document/.test(oc)||oc===document){
that.containerOffset={
left: 0,
top: 0
};
that.containerPosition={
left: 0,
top: 0
};
that.parentData={
element: $(document),
left: 0,
top: 0,
width: $(document).width(),
height: $(document).height()||document.body.parentNode.scrollHeight
};}else{
element=$(ce);
p=[];
$([ "Top", "Right", "Left", "Bottom" ]).each(function(i, name){
p[ i ]=that._num(element.css("padding" + name));
});
that.containerOffset=element.offset();
that.containerPosition=element.position();
that.containerSize={
height:(element.innerHeight() - p[ 3 ]),
width:(element.innerWidth() - p[ 1 ])
};
co=that.containerOffset;
ch=that.containerSize.height;
cw=that.containerSize.width;
width=(that._hasScroll(ce, "left") ? ce.scrollWidth:cw);
height=(that._hasScroll(ce) ? ce.scrollHeight:ch) ;
that.parentData={
element: ce,
left: co.left,
top: co.top,
width: width,
height: height
};}},
resize: function(event){
var woset, hoset, isParent, isOffsetRelative,
that=$(this).resizable("instance"),
o=that.options,
co=that.containerOffset,
cp=that.position,
pRatio=that._aspectRatio||event.shiftKey,
cop={
top: 0,
left: 0
},
ce=that.containerElement,
continueResize=true;
if(ce[ 0 ]!==document&&(/static/).test(ce.css("position"))){
cop=co;
}
if(cp.left <(that._helper ? co.left:0)){
that.size.width=that.size.width +
(that._helper ?
(that.position.left - co.left) :
(that.position.left - cop.left));
if(pRatio){
that.size.height=that.size.width / that.aspectRatio;
continueResize=false;
}
that.position.left=o.helper ? co.left:0;
}
if(cp.top <(that._helper ? co.top:0)){
that.size.height=that.size.height +
(that._helper ?
(that.position.top - co.top) :
that.position.top);
if(pRatio){
that.size.width=that.size.height * that.aspectRatio;
continueResize=false;
}
that.position.top=that._helper ? co.top:0;
}
isParent=that.containerElement.get(0)===that.element.parent().get(0);
isOffsetRelative=/relative|absolute/.test(that.containerElement.css("position"));
if(isParent&&isOffsetRelative){
that.offset.left=that.parentData.left + that.position.left;
that.offset.top=that.parentData.top + that.position.top;
}else{
that.offset.left=that.element.offset().left;
that.offset.top=that.element.offset().top;
}
woset=Math.abs(that.sizeDiff.width +
(that._helper ?
that.offset.left - cop.left :
(that.offset.left - co.left)));
hoset=Math.abs(that.sizeDiff.height +
(that._helper ?
that.offset.top - cop.top :
(that.offset.top - co.top)));
if(woset + that.size.width >=that.parentData.width){
that.size.width=that.parentData.width - woset;
if(pRatio){
that.size.height=that.size.width / that.aspectRatio;
continueResize=false;
}}
if(hoset + that.size.height >=that.parentData.height){
that.size.height=that.parentData.height - hoset;
if(pRatio){
that.size.width=that.size.height * that.aspectRatio;
continueResize=false;
}}
if(!continueResize){
that.position.left=that.prevPosition.left;
that.position.top=that.prevPosition.top;
that.size.width=that.prevSize.width;
that.size.height=that.prevSize.height;
}},
stop: function(){
var that=$(this).resizable("instance"),
o=that.options,
co=that.containerOffset,
cop=that.containerPosition,
ce=that.containerElement,
helper=$(that.helper),
ho=helper.offset(),
w=helper.outerWidth() - that.sizeDiff.width,
h=helper.outerHeight() - that.sizeDiff.height;
if(that._helper&&!o.animate&&(/relative/).test(ce.css("position"))){
$(this).css({
left: ho.left - cop.left - co.left,
width: w,
height: h
});
}
if(that._helper&&!o.animate&&(/static/).test(ce.css("position"))){
$(this).css({
left: ho.left - cop.left - co.left,
width: w,
height: h
});
}}
});
$.ui.plugin.add("resizable", "alsoResize", {
start: function(){
var that=$(this).resizable("instance"),
o=that.options;
$(o.alsoResize).each(function(){
var el=$(this);
el.data("ui-resizable-alsoresize", {
width: parseFloat(el.width()), height: parseFloat(el.height()),
left: parseFloat(el.css("left")), top: parseFloat(el.css("top"))
});
});
},
resize: function(event, ui){
var that=$(this).resizable("instance"),
o=that.options,
os=that.originalSize,
op=that.originalPosition,
delta={
height:(that.size.height - os.height)||0,
width:(that.size.width - os.width)||0,
top:(that.position.top - op.top)||0,
left:(that.position.left - op.left)||0
};
$(o.alsoResize).each(function(){
var el=$(this), start=$(this).data("ui-resizable-alsoresize"), style={},
css=el.parents(ui.originalElement[ 0 ]).length ?
[ "width", "height" ] :
[ "width", "height", "top", "left" ];
$.each(css, function(i, prop){
var sum=(start[ prop ]||0) +(delta[ prop ]||0);
if(sum&&sum >=0){
style[ prop ]=sum||null;
}});
el.css(style);
});
},
stop: function(){
$(this).removeData("ui-resizable-alsoresize");
}});
$.ui.plugin.add("resizable", "ghost", {
start: function(){
var that=$(this).resizable("instance"), cs=that.size;
that.ghost=that.originalElement.clone();
that.ghost.css({
opacity: 0.25,
display: "block",
position: "relative",
height: cs.height,
width: cs.width,
margin: 0,
left: 0,
top: 0
});
that._addClass(that.ghost, "ui-resizable-ghost");
if($.uiBackCompat!==false&&typeof that.options.ghost==="string"){
that.ghost.addClass(this.options.ghost);
}
that.ghost.appendTo(that.helper);
},
resize: function(){
var that=$(this).resizable("instance");
if(that.ghost){
that.ghost.css({
position: "relative",
height: that.size.height,
width: that.size.width
});
}},
stop: function(){
var that=$(this).resizable("instance");
if(that.ghost&&that.helper){
that.helper.get(0).removeChild(that.ghost.get(0));
}}
});
$.ui.plugin.add("resizable", "grid", {
resize: function(){
var outerDimensions,
that=$(this).resizable("instance"),
o=that.options,
cs=that.size,
os=that.originalSize,
op=that.originalPosition,
a=that.axis,
grid=typeof o.grid==="number" ? [ o.grid, o.grid ]:o.grid,
gridX=(grid[ 0 ]||1),
gridY=(grid[ 1 ]||1),
ox=Math.round(( cs.width - os.width) / gridX) * gridX,
oy=Math.round(( cs.height - os.height) / gridY) * gridY,
newWidth=os.width + ox,
newHeight=os.height + oy,
isMaxWidth=o.maxWidth&&(o.maxWidth < newWidth),
isMaxHeight=o.maxHeight&&(o.maxHeight < newHeight),
isMinWidth=o.minWidth&&(o.minWidth > newWidth),
isMinHeight=o.minHeight&&(o.minHeight > newHeight);
o.grid=grid;
if(isMinWidth){
newWidth +=gridX;
}
if(isMinHeight){
newHeight +=gridY;
}
if(isMaxWidth){
newWidth -=gridX;
}
if(isMaxHeight){
newHeight -=gridY;
}
if(/^(se|s|e)$/.test(a)){
that.size.width=newWidth;
that.size.height=newHeight;
}else if(/^(ne)$/.test(a)){
that.size.width=newWidth;
that.size.height=newHeight;
that.position.top=op.top - oy;
}else if(/^(sw)$/.test(a)){
that.size.width=newWidth;
that.size.height=newHeight;
that.position.left=op.left - ox;
}else{
if(newHeight - gridY <=0||newWidth - gridX <=0){
outerDimensions=that._getPaddingPlusBorderDimensions(this);
}
if(newHeight - gridY > 0){
that.size.height=newHeight;
that.position.top=op.top - oy;
}else{
newHeight=gridY - outerDimensions.height;
that.size.height=newHeight;
that.position.top=op.top + os.height - newHeight;
}
if(newWidth - gridX > 0){
that.size.width=newWidth;
that.position.left=op.left - ox;
}else{
newWidth=gridX - outerDimensions.width;
that.size.width=newWidth;
that.position.left=op.left + os.width - newWidth;
}}
}});
var widgetsResizable=$.ui.resizable;
$.widget("ui.dialog", {
version: "1.12.1",
options: {
appendTo: "body",
autoOpen: true,
buttons: [],
classes: {
"ui-dialog": "ui-corner-all",
"ui-dialog-titlebar": "ui-corner-all"
},
closeOnEscape: true,
closeText: "Close",
draggable: true,
hide: null,
height: "auto",
maxHeight: null,
maxWidth: null,
minHeight: 150,
minWidth: 150,
modal: false,
position: {
my: "center",
at: "center",
of: window,
collision: "fit",
using: function(pos){
var topOffset=$(this).css(pos).offset().top;
if(topOffset < 0){
$(this).css("top", pos.top - topOffset);
}}
},
resizable: true,
show: null,
title: null,
width: 300,
beforeClose: null,
close: null,
drag: null,
dragStart: null,
dragStop: null,
focus: null,
open: null,
resize: null,
resizeStart: null,
resizeStop: null
},
sizeRelatedOptions: {
buttons: true,
height: true,
maxHeight: true,
maxWidth: true,
minHeight: true,
minWidth: true,
width: true
},
resizableRelatedOptions: {
maxHeight: true,
maxWidth: true,
minHeight: true,
minWidth: true
},
_create: function(){
this.originalCss={
display: this.element[ 0 ].style.display,
width: this.element[ 0 ].style.width,
minHeight: this.element[ 0 ].style.minHeight,
maxHeight: this.element[ 0 ].style.maxHeight,
height: this.element[ 0 ].style.height
};
this.originalPosition={
parent: this.element.parent(),
index: this.element.parent().children().index(this.element)
};
this.originalTitle=this.element.attr("title");
if(this.options.title==null&&this.originalTitle!=null){
this.options.title=this.originalTitle;
}
if(this.options.disabled){
this.options.disabled=false;
}
this._createWrapper();
this.element
.show()
.removeAttr("title")
.appendTo(this.uiDialog);
this._addClass("ui-dialog-content", "ui-widget-content");
this._createTitlebar();
this._createButtonPane();
if(this.options.draggable&&$.fn.draggable){
this._makeDraggable();
}
if(this.options.resizable&&$.fn.resizable){
this._makeResizable();
}
this._isOpen=false;
this._trackFocus();
},
_init: function(){
if(this.options.autoOpen){
this.open();
}},
_appendTo: function(){
var element=this.options.appendTo;
if(element&&(element.jquery||element.nodeType)){
return $(element);
}
return this.document.find(element||"body").eq(0);
},
_destroy: function(){
var next,
originalPosition=this.originalPosition;
this._untrackInstance();
this._destroyOverlay();
this.element
.removeUniqueId()
.css(this.originalCss)
.detach();
this.uiDialog.remove();
if(this.originalTitle){
this.element.attr("title", this.originalTitle);
}
next=originalPosition.parent.children().eq(originalPosition.index);
if(next.length&&next[ 0 ]!==this.element[ 0 ]){
next.before(this.element);
}else{
originalPosition.parent.append(this.element);
}},
widget: function(){
return this.uiDialog;
},
disable: $.noop,
enable: $.noop,
close: function(event){
var that=this;
if(!this._isOpen||this._trigger("beforeClose", event)===false){
return;
}
this._isOpen=false;
this._focusedElement=null;
this._destroyOverlay();
this._untrackInstance();
if(!this.opener.filter(":focusable").trigger("focus").length){
$.ui.safeBlur($.ui.safeActiveElement(this.document[ 0 ]));
}
this._hide(this.uiDialog, this.options.hide, function(){
that._trigger("close", event);
});
},
isOpen: function(){
return this._isOpen;
},
moveToTop: function(){
this._moveToTop();
},
_moveToTop: function(event, silent){
var moved=false,
zIndices=this.uiDialog.siblings(".ui-front:visible").map(function(){
return +$(this).css("z-index");
}).get(),
zIndexMax=Math.max.apply(null, zIndices);
if(zIndexMax >=+this.uiDialog.css("z-index")){
this.uiDialog.css("z-index", zIndexMax + 1);
moved=true;
}
if(moved&&!silent){
this._trigger("focus", event);
}
return moved;
},
open: function(){
var that=this;
if(this._isOpen){
if(this._moveToTop()){
this._focusTabbable();
}
return;
}
this._isOpen=true;
this.opener=$($.ui.safeActiveElement(this.document[ 0 ]));
this._size();
this._position();
this._createOverlay();
this._moveToTop(null, true);
if(this.overlay){
this.overlay.css("z-index", this.uiDialog.css("z-index") - 1);
}
this._show(this.uiDialog, this.options.show, function(){
that._focusTabbable();
that._trigger("focus");
});
this._makeFocusTarget();
this._trigger("open");
},
_focusTabbable: function(){
var hasFocus=this._focusedElement;
if(!hasFocus){
hasFocus=this.element.find("[autofocus]");
}
if(!hasFocus.length){
hasFocus=this.element.find(":tabbable");
}
if(!hasFocus.length){
hasFocus=this.uiDialogButtonPane.find(":tabbable");
}
if(!hasFocus.length){
hasFocus=this.uiDialogTitlebarClose.filter(":tabbable");
}
if(!hasFocus.length){
hasFocus=this.uiDialog;
}
hasFocus.eq(0).trigger("focus");
},
_keepFocus: function(event){
function checkFocus(){
var activeElement=$.ui.safeActiveElement(this.document[ 0 ]),
isActive=this.uiDialog[ 0 ]===activeElement ||
$.contains(this.uiDialog[ 0 ], activeElement);
if(!isActive){
this._focusTabbable();
}}
event.preventDefault();
checkFocus.call(this);
this._delay(checkFocus);
},
_createWrapper: function(){
this.uiDialog=$("<div>")
.hide()
.attr({
tabIndex: -1,
role: "dialog"
})
.appendTo(this._appendTo());
this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front");
this._on(this.uiDialog, {
keydown: function(event){
if(this.options.closeOnEscape&&!event.isDefaultPrevented()&&event.keyCode &&
event.keyCode===$.ui.keyCode.ESCAPE){
event.preventDefault();
this.close(event);
return;
}
if(event.keyCode!==$.ui.keyCode.TAB||event.isDefaultPrevented()){
return;
}
var tabbables=this.uiDialog.find(":tabbable"),
first=tabbables.filter(":first"),
last=tabbables.filter(":last");
if(( event.target===last[ 0 ]||event.target===this.uiDialog[ 0 ]) &&
!event.shiftKey){
this._delay(function(){
first.trigger("focus");
});
event.preventDefault();
}else if(( event.target===first[ 0 ] ||
event.target===this.uiDialog[ 0 ])&&event.shiftKey){
this._delay(function(){
last.trigger("focus");
});
event.preventDefault();
}},
mousedown: function(event){
if(this._moveToTop(event)){
this._focusTabbable();
}}
});
if(!this.element.find("[aria-describedby]").length){
this.uiDialog.attr({
"aria-describedby": this.element.uniqueId().attr("id")
});
}},
_createTitlebar: function(){
var uiDialogTitle;
this.uiDialogTitlebar=$("<div>");
this._addClass(this.uiDialogTitlebar,
"ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix");
this._on(this.uiDialogTitlebar, {
mousedown: function(event){
if(!$(event.target).closest(".ui-dialog-titlebar-close")){
this.uiDialog.trigger("focus");
}}
});
this.uiDialogTitlebarClose=$("<button type='button'></button>")
.button({
label: $("<a>").text(this.options.closeText).html(),
icon: "ui-icon-closethick",
showLabel: false
})
.appendTo(this.uiDialogTitlebar);
this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close");
this._on(this.uiDialogTitlebarClose, {
click: function(event){
event.preventDefault();
this.close(event);
}});
uiDialogTitle=$("<span>").uniqueId().prependTo(this.uiDialogTitlebar);
this._addClass(uiDialogTitle, "ui-dialog-title");
this._title(uiDialogTitle);
this.uiDialogTitlebar.prependTo(this.uiDialog);
this.uiDialog.attr({
"aria-labelledby": uiDialogTitle.attr("id")
});
},
_title: function(title){
if(this.options.title){
title.text(this.options.title);
}else{
title.html("&#160;");
}},
_createButtonPane: function(){
this.uiDialogButtonPane=$("<div>");
this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane",
"ui-widget-content ui-helper-clearfix");
this.uiButtonSet=$("<div>")
.appendTo(this.uiDialogButtonPane);
this._addClass(this.uiButtonSet, "ui-dialog-buttonset");
this._createButtons();
},
_createButtons: function(){
var that=this,
buttons=this.options.buttons;
this.uiDialogButtonPane.remove();
this.uiButtonSet.empty();
if($.isEmptyObject(buttons)||($.isArray(buttons)&&!buttons.length)){
this._removeClass(this.uiDialog, "ui-dialog-buttons");
return;
}
$.each(buttons, function(name, props){
var click, buttonOptions;
props=$.isFunction(props) ?
{ click: props, text: name } :
props;
props=$.extend({ type: "button" }, props);
click=props.click;
buttonOptions={
icon: props.icon,
iconPosition: props.iconPosition,
showLabel: props.showLabel,
icons: props.icons,
text: props.text
};
delete props.click;
delete props.icon;
delete props.iconPosition;
delete props.showLabel;
delete props.icons;
if(typeof props.text==="boolean"){
delete props.text;
}
$("<button></button>", props)
.button(buttonOptions)
.appendTo(that.uiButtonSet)
.on("click", function(){
click.apply(that.element[ 0 ], arguments);
});
});
this._addClass(this.uiDialog, "ui-dialog-buttons");
this.uiDialogButtonPane.appendTo(this.uiDialog);
},
_makeDraggable: function(){
var that=this,
options=this.options;
function filteredUi(ui){
return {
position: ui.position,
offset: ui.offset
};}
this.uiDialog.draggable({
cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
handle: ".ui-dialog-titlebar",
containment: "document",
start: function(event, ui){
that._addClass($(this), "ui-dialog-dragging");
that._blockFrames();
that._trigger("dragStart", event, filteredUi(ui));
},
drag: function(event, ui){
that._trigger("drag", event, filteredUi(ui));
},
stop: function(event, ui){
var left=ui.offset.left - that.document.scrollLeft(),
top=ui.offset.top - that.document.scrollTop();
options.position={
my: "left top",
at: "left" +(left >=0 ? "+":"") + left + " " +
"top" +(top >=0 ? "+":"") + top,
of: that.window
};
that._removeClass($(this), "ui-dialog-dragging");
that._unblockFrames();
that._trigger("dragStop", event, filteredUi(ui));
}});
},
_makeResizable: function(){
var that=this,
options=this.options,
handles=options.resizable,
position=this.uiDialog.css("position"),
resizeHandles=typeof handles==="string" ?
handles :
"n,e,s,w,se,sw,ne,nw";
function filteredUi(ui){
return {
originalPosition: ui.originalPosition,
originalSize: ui.originalSize,
position: ui.position,
size: ui.size
};}
this.uiDialog.resizable({
cancel: ".ui-dialog-content",
containment: "document",
alsoResize: this.element,
maxWidth: options.maxWidth,
maxHeight: options.maxHeight,
minWidth: options.minWidth,
minHeight: this._minHeight(),
handles: resizeHandles,
start: function(event, ui){
that._addClass($(this), "ui-dialog-resizing");
that._blockFrames();
that._trigger("resizeStart", event, filteredUi(ui));
},
resize: function(event, ui){
that._trigger("resize", event, filteredUi(ui));
},
stop: function(event, ui){
var offset=that.uiDialog.offset(),
left=offset.left - that.document.scrollLeft(),
top=offset.top - that.document.scrollTop();
options.height=that.uiDialog.height();
options.width=that.uiDialog.width();
options.position={
my: "left top",
at: "left" +(left >=0 ? "+":"") + left + " " +
"top" +(top >=0 ? "+":"") + top,
of: that.window
};
that._removeClass($(this), "ui-dialog-resizing");
that._unblockFrames();
that._trigger("resizeStop", event, filteredUi(ui));
}})
.css("position", position);
},
_trackFocus: function(){
this._on(this.widget(), {
focusin: function(event){
this._makeFocusTarget();
this._focusedElement=$(event.target);
}});
},
_makeFocusTarget: function(){
this._untrackInstance();
this._trackingInstances().unshift(this);
},
_untrackInstance: function(){
var instances=this._trackingInstances(),
exists=$.inArray(this, instances);
if(exists!==-1){
instances.splice(exists, 1);
}},
_trackingInstances: function(){
var instances=this.document.data("ui-dialog-instances");
if(!instances){
instances=[];
this.document.data("ui-dialog-instances", instances);
}
return instances;
},
_minHeight: function(){
var options=this.options;
return options.height==="auto" ?
options.minHeight :
Math.min(options.minHeight, options.height);
},
_position: function(){
var isVisible=this.uiDialog.is(":visible");
if(!isVisible){
this.uiDialog.show();
}
this.uiDialog.position(this.options.position);
if(!isVisible){
this.uiDialog.hide();
}},
_setOptions: function(options){
var that=this,
resize=false,
resizableOptions={};
$.each(options, function(key, value){
that._setOption(key, value);
if(key in that.sizeRelatedOptions){
resize=true;
}
if(key in that.resizableRelatedOptions){
resizableOptions[ key ]=value;
}});
if(resize){
this._size();
this._position();
}
if(this.uiDialog.is(":data(ui-resizable)")){
this.uiDialog.resizable("option", resizableOptions);
}},
_setOption: function(key, value){
var isDraggable, isResizable,
uiDialog=this.uiDialog;
if(key==="disabled"){
return;
}
this._super(key, value);
if(key==="appendTo"){
this.uiDialog.appendTo(this._appendTo());
}
if(key==="buttons"){
this._createButtons();
}
if(key==="closeText"){
this.uiDialogTitlebarClose.button({
label: $("<a>").text("" + this.options.closeText).html()
});
}
if(key==="draggable"){
isDraggable=uiDialog.is(":data(ui-draggable)");
if(isDraggable&&!value){
uiDialog.draggable("destroy");
}
if(!isDraggable&&value){
this._makeDraggable();
}}
if(key==="position"){
this._position();
}
if(key==="resizable"){
isResizable=uiDialog.is(":data(ui-resizable)");
if(isResizable&&!value){
uiDialog.resizable("destroy");
}
if(isResizable&&typeof value==="string"){
uiDialog.resizable("option", "handles", value);
}
if(!isResizable&&value!==false){
this._makeResizable();
}}
if(key==="title"){
this._title(this.uiDialogTitlebar.find(".ui-dialog-title"));
}},
_size: function(){
var nonContentHeight, minContentHeight, maxContentHeight,
options=this.options;
this.element.show().css({
width: "auto",
minHeight: 0,
maxHeight: "none",
height: 0
});
if(options.minWidth > options.width){
options.width=options.minWidth;
}
nonContentHeight=this.uiDialog.css({
height: "auto",
width: options.width
})
.outerHeight();
minContentHeight=Math.max(0, options.minHeight - nonContentHeight);
maxContentHeight=typeof options.maxHeight==="number" ?
Math.max(0, options.maxHeight - nonContentHeight) :
"none";
if(options.height==="auto"){
this.element.css({
minHeight: minContentHeight,
maxHeight: maxContentHeight,
height: "auto"
});
}else{
this.element.height(Math.max(0, options.height - nonContentHeight));
}
if(this.uiDialog.is(":data(ui-resizable)")){
this.uiDialog.resizable("option", "minHeight", this._minHeight());
}},
_blockFrames: function(){
this.iframeBlocks=this.document.find("iframe").map(function(){
var iframe=$(this);
return $("<div>")
.css({
position: "absolute",
width: iframe.outerWidth(),
height: iframe.outerHeight()
})
.appendTo(iframe.parent())
.offset(iframe.offset())[ 0 ];
});
},
_unblockFrames: function(){
if(this.iframeBlocks){
this.iframeBlocks.remove();
delete this.iframeBlocks;
}},
_allowInteraction: function(event){
if($(event.target).closest(".ui-dialog").length){
return true;
}
return !!$(event.target).closest(".ui-datepicker").length;
},
_createOverlay: function(){
if(!this.options.modal){
return;
}
var isOpening=true;
this._delay(function(){
isOpening=false;
});
if(!this.document.data("ui-dialog-overlays")){
this._on(this.document, {
focusin: function(event){
if(isOpening){
return;
}
if(!this._allowInteraction(event)){
event.preventDefault();
this._trackingInstances()[ 0 ]._focusTabbable();
}}
});
}
this.overlay=$("<div>")
.appendTo(this._appendTo());
this._addClass(this.overlay, null, "ui-widget-overlay ui-front");
this._on(this.overlay, {
mousedown: "_keepFocus"
});
this.document.data("ui-dialog-overlays",
(this.document.data("ui-dialog-overlays")||0) + 1);
},
_destroyOverlay: function(){
if(!this.options.modal){
return;
}
if(this.overlay){
var overlays=this.document.data("ui-dialog-overlays") - 1;
if(!overlays){
this._off(this.document, "focusin");
this.document.removeData("ui-dialog-overlays");
}else{
this.document.data("ui-dialog-overlays", overlays);
}
this.overlay.remove();
this.overlay=null;
}}
});
if($.uiBackCompat!==false){
$.widget("ui.dialog", $.ui.dialog, {
options: {
dialogClass: ""
},
_createWrapper: function(){
this._super();
this.uiDialog.addClass(this.options.dialogClass);
},
_setOption: function(key, value){
if(key==="dialogClass"){
this.uiDialog
.removeClass(this.options.dialogClass)
.addClass(value);
}
this._superApply(arguments);
}});
}
var widgetsDialog=$.ui.dialog;
$.widget("ui.droppable", {
version: "1.12.1",
widgetEventPrefix: "drop",
options: {
accept: "*",
addClasses: true,
greedy: false,
scope: "default",
tolerance: "intersect",
activate: null,
deactivate: null,
drop: null,
out: null,
over: null
},
_create: function(){
var proportions,
o=this.options,
accept=o.accept;
this.isover=false;
this.isout=true;
this.accept=$.isFunction(accept) ? accept:function(d){
return d.is(accept);
};
this.proportions=function(){
if(arguments.length){
proportions=arguments[ 0 ];
}else{
return proportions ?
proportions :
proportions={
width: this.element[ 0 ].offsetWidth,
height: this.element[ 0 ].offsetHeight
};}};
this._addToManager(o.scope);
o.addClasses&&this._addClass("ui-droppable");
},
_addToManager: function(scope){
$.ui.ddmanager.droppables[ scope ]=$.ui.ddmanager.droppables[ scope ]||[];
$.ui.ddmanager.droppables[ scope ].push(this);
},
_splice: function(drop){
var i=0;
for(; i < drop.length; i++){
if(drop[ i ]===this){
drop.splice(i, 1);
}}
},
_destroy: function(){
var drop=$.ui.ddmanager.droppables[ this.options.scope ];
this._splice(drop);
},
_setOption: function(key, value){
if(key==="accept"){
this.accept=$.isFunction(value) ? value:function(d){
return d.is(value);
};}else if(key==="scope"){
var drop=$.ui.ddmanager.droppables[ this.options.scope ];
this._splice(drop);
this._addToManager(value);
}
this._super(key, value);
},
_activate: function(event){
var draggable=$.ui.ddmanager.current;
this._addActiveClass();
if(draggable){
this._trigger("activate", event, this.ui(draggable));
}},
_deactivate: function(event){
var draggable=$.ui.ddmanager.current;
this._removeActiveClass();
if(draggable){
this._trigger("deactivate", event, this.ui(draggable));
}},
_over: function(event){
var draggable=$.ui.ddmanager.current;
if(!draggable||(draggable.currentItem ||
draggable.element)[ 0 ]===this.element[ 0 ]){
return;
}
if(this.accept.call(this.element[ 0 ],(draggable.currentItem ||
draggable.element))){
this._addHoverClass();
this._trigger("over", event, this.ui(draggable));
}},
_out: function(event){
var draggable=$.ui.ddmanager.current;
if(!draggable||(draggable.currentItem ||
draggable.element)[ 0 ]===this.element[ 0 ]){
return;
}
if(this.accept.call(this.element[ 0 ],(draggable.currentItem ||
draggable.element))){
this._removeHoverClass();
this._trigger("out", event, this.ui(draggable));
}},
_drop: function(event, custom){
var draggable=custom||$.ui.ddmanager.current,
childrenIntersection=false;
if(!draggable||(draggable.currentItem ||
draggable.element)[ 0 ]===this.element[ 0 ]){
return false;
}
this.element
.find(":data(ui-droppable)")
.not(".ui-draggable-dragging")
.each(function(){
var inst=$(this).droppable("instance");
if(inst.options.greedy &&
!inst.options.disabled &&
inst.options.scope===draggable.options.scope &&
inst.accept.call(inst.element[ 0 ],(draggable.currentItem||draggable.element)
) &&
intersect(
draggable,
$.extend(inst, { offset: inst.element.offset() }),
inst.options.tolerance, event
)
){
childrenIntersection=true;
return false; }});
if(childrenIntersection){
return false;
}
if(this.accept.call(this.element[ 0 ],
(draggable.currentItem||draggable.element))){
this._removeActiveClass();
this._removeHoverClass();
this._trigger("drop", event, this.ui(draggable));
return this.element;
}
return false;
},
ui: function(c){
return {
draggable:(c.currentItem||c.element),
helper: c.helper,
position: c.position,
offset: c.positionAbs
};},
_addHoverClass: function(){
this._addClass("ui-droppable-hover");
},
_removeHoverClass: function(){
this._removeClass("ui-droppable-hover");
},
_addActiveClass: function(){
this._addClass("ui-droppable-active");
},
_removeActiveClass: function(){
this._removeClass("ui-droppable-active");
}});
var intersect=$.ui.intersect=(function(){
function isOverAxis(x, reference, size){
return(x >=reference)&&(x <(reference + size));
}
return function(draggable, droppable, toleranceMode, event){
if(!droppable.offset){
return false;
}
var x1=(draggable.positionAbs ||
draggable.position.absolute).left + draggable.margins.left,
y1=(draggable.positionAbs ||
draggable.position.absolute).top + draggable.margins.top,
x2=x1 + draggable.helperProportions.width,
y2=y1 + draggable.helperProportions.height,
l=droppable.offset.left,
t=droppable.offset.top,
r=l + droppable.proportions().width,
b=t + droppable.proportions().height;
switch(toleranceMode){
case "fit":
return(l <=x1&&x2 <=r&&t <=y1&&y2 <=b);
case "intersect":
return(l < x1 +(draggable.helperProportions.width / 2) &&
x2 -(draggable.helperProportions.width / 2) < r &&
t < y1 +(draggable.helperProportions.height / 2) &&
y2 -(draggable.helperProportions.height / 2) < b);
case "pointer":
return isOverAxis(event.pageY, t, droppable.proportions().height) &&
isOverAxis(event.pageX, l, droppable.proportions().width);
case "touch":
return (
(y1 >=t&&y1 <=b) ||
(y2 >=t&&y2 <=b) ||
(y1 < t&&y2 > b)
)&&(
(x1 >=l&&x1 <=r) ||
(x2 >=l&&x2 <=r) ||
(x1 < l&&x2 > r)
);
default:
return false;
}};})();
$.ui.ddmanager={
current: null,
droppables: { "default": [] },
prepareOffsets: function(t, event){
var i, j,
m=$.ui.ddmanager.droppables[ t.options.scope ]||[],
type=event ? event.type:null,
list=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();
droppablesLoop: for(i=0; i < m.length; i++){
if(m[ i ].options.disabled||(t&&!m[ i ].accept.call(m[ i ].element[ 0 ],
(t.currentItem||t.element)))){
continue;
}
for(j=0; j < list.length; j++){
if(list[ j ]===m[ i ].element[ 0 ]){
m[ i ].proportions().height=0;
continue droppablesLoop;
}}
m[ i ].visible=m[ i ].element.css("display")!=="none";
if(!m[ i ].visible){
continue;
}
if(type==="mousedown"){
m[ i ]._activate.call(m[ i ], event);
}
m[ i ].offset=m[ i ].element.offset();
m[ i ].proportions({
width: m[ i ].element[ 0 ].offsetWidth,
height: m[ i ].element[ 0 ].offsetHeight
});
}},
drop: function(draggable, event){
var dropped=false;
$.each(( $.ui.ddmanager.droppables[ draggable.options.scope ]||[]).slice(), function(){
if(!this.options){
return;
}
if(!this.options.disabled&&this.visible &&
intersect(draggable, this, this.options.tolerance, event)){
dropped=this._drop.call(this, event)||dropped;
}
if(!this.options.disabled&&this.visible&&this.accept.call(this.element[ 0 ],
(draggable.currentItem||draggable.element))){
this.isout=true;
this.isover=false;
this._deactivate.call(this, event);
}});
return dropped;
},
dragStart: function(draggable, event){
draggable.element.parentsUntil("body").on("scroll.droppable", function(){
if(!draggable.options.refreshPositions){
$.ui.ddmanager.prepareOffsets(draggable, event);
}});
},
drag: function(draggable, event){
if(draggable.options.refreshPositions){
$.ui.ddmanager.prepareOffsets(draggable, event);
}
$.each($.ui.ddmanager.droppables[ draggable.options.scope ]||[], function(){
if(this.options.disabled||this.greedyChild||!this.visible){
return;
}
var parentInstance, scope, parent,
intersects=intersect(draggable, this, this.options.tolerance, event),
c = !intersects&&this.isover ?
"isout" :
(intersects&&!this.isover ? "isover":null);
if(!c){
return;
}
if(this.options.greedy){
scope=this.options.scope;
parent=this.element.parents(":data(ui-droppable)").filter(function(){
return $(this).droppable("instance").options.scope===scope;
});
if(parent.length){
parentInstance=$(parent[ 0 ]).droppable("instance");
parentInstance.greedyChild=(c==="isover");
}}
if(parentInstance&&c==="isover"){
parentInstance.isover=false;
parentInstance.isout=true;
parentInstance._out.call(parentInstance, event);
}
this[ c ]=true;
this[ c==="isout" ? "isover":"isout" ]=false;
this[ c==="isover" ? "_over":"_out" ].call(this, event);
if(parentInstance&&c==="isout"){
parentInstance.isout=false;
parentInstance.isover=true;
parentInstance._over.call(parentInstance, event);
}});
},
dragStop: function(draggable, event){
draggable.element.parentsUntil("body").off("scroll.droppable");
if(!draggable.options.refreshPositions){
$.ui.ddmanager.prepareOffsets(draggable, event);
}}
};
if($.uiBackCompat!==false){
$.widget("ui.droppable", $.ui.droppable, {
options: {
hoverClass: false,
activeClass: false
},
_addActiveClass: function(){
this._super();
if(this.options.activeClass){
this.element.addClass(this.options.activeClass);
}},
_removeActiveClass: function(){
this._super();
if(this.options.activeClass){
this.element.removeClass(this.options.activeClass);
}},
_addHoverClass: function(){
this._super();
if(this.options.hoverClass){
this.element.addClass(this.options.hoverClass);
}},
_removeHoverClass: function(){
this._super();
if(this.options.hoverClass){
this.element.removeClass(this.options.hoverClass);
}}
});
}
var widgetsDroppable=$.ui.droppable;
var widgetsProgressbar=$.widget("ui.progressbar", {
version: "1.12.1",
options: {
classes: {
"ui-progressbar": "ui-corner-all",
"ui-progressbar-value": "ui-corner-left",
"ui-progressbar-complete": "ui-corner-right"
},
max: 100,
value: 0,
change: null,
complete: null
},
min: 0,
_create: function(){
this.oldValue=this.options.value=this._constrainedValue();
this.element.attr({
role: "progressbar",
"aria-valuemin": this.min
});
this._addClass("ui-progressbar", "ui-widget ui-widget-content");
this.valueDiv=$("<div>").appendTo(this.element);
this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header");
this._refreshValue();
},
_destroy: function(){
this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow");
this.valueDiv.remove();
},
value: function(newValue){
if(newValue===undefined){
return this.options.value;
}
this.options.value=this._constrainedValue(newValue);
this._refreshValue();
},
_constrainedValue: function(newValue){
if(newValue===undefined){
newValue=this.options.value;
}
this.indeterminate=newValue===false;
if(typeof newValue!=="number"){
newValue=0;
}
return this.indeterminate ? false :
Math.min(this.options.max, Math.max(this.min, newValue));
},
_setOptions: function(options){
var value=options.value;
delete options.value;
this._super(options);
this.options.value=this._constrainedValue(value);
this._refreshValue();
},
_setOption: function(key, value){
if(key==="max"){
value=Math.max(this.min, value);
}
this._super(key, value);
},
_setOptionDisabled: function(value){
this._super(value);
this.element.attr("aria-disabled", value);
this._toggleClass(null, "ui-state-disabled", !!value);
},
_percentage: function(){
return this.indeterminate ?
100 :
100 *(this.options.value - this.min) /(this.options.max - this.min);
},
_refreshValue: function(){
var value=this.options.value,
percentage=this._percentage();
this.valueDiv
.toggle(this.indeterminate||value > this.min)
.width(percentage.toFixed(0) + "%");
this
._toggleClass(this.valueDiv, "ui-progressbar-complete", null,
value===this.options.max)
._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate);
if(this.indeterminate){
this.element.removeAttr("aria-valuenow");
if(!this.overlayDiv){
this.overlayDiv=$("<div>").appendTo(this.valueDiv);
this._addClass(this.overlayDiv, "ui-progressbar-overlay");
}}else{
this.element.attr({
"aria-valuemax": this.options.max,
"aria-valuenow": value
});
if(this.overlayDiv){
this.overlayDiv.remove();
this.overlayDiv=null;
}}
if(this.oldValue!==value){
this.oldValue=value;
this._trigger("change");
}
if(value===this.options.max){
this._trigger("complete");
}}
});
var widgetsSelectable=$.widget("ui.selectable", $.ui.mouse, {
version: "1.12.1",
options: {
appendTo: "body",
autoRefresh: true,
distance: 0,
filter: "*",
tolerance: "touch",
selected: null,
selecting: null,
start: null,
stop: null,
unselected: null,
unselecting: null
},
_create: function(){
var that=this;
this._addClass("ui-selectable");
this.dragged=false;
this.refresh=function(){
that.elementPos=$(that.element[ 0 ]).offset();
that.selectees=$(that.options.filter, that.element[ 0 ]);
that._addClass(that.selectees, "ui-selectee");
that.selectees.each(function(){
var $this=$(this),
selecteeOffset=$this.offset(),
pos={
left: selecteeOffset.left - that.elementPos.left,
top: selecteeOffset.top - that.elementPos.top
};
$.data(this, "selectable-item", {
element: this,
$element: $this,
left: pos.left,
top: pos.top,
right: pos.left + $this.outerWidth(),
bottom: pos.top + $this.outerHeight(),
startselected: false,
selected: $this.hasClass("ui-selected"),
selecting: $this.hasClass("ui-selecting"),
unselecting: $this.hasClass("ui-unselecting")
});
});
};
this.refresh();
this._mouseInit();
this.helper=$("<div>");
this._addClass(this.helper, "ui-selectable-helper");
},
_destroy: function(){
this.selectees.removeData("selectable-item");
this._mouseDestroy();
},
_mouseStart: function(event){
var that=this,
options=this.options;
this.opos=[ event.pageX, event.pageY ];
this.elementPos=$(this.element[ 0 ]).offset();
if(this.options.disabled){
return;
}
this.selectees=$(options.filter, this.element[ 0 ]);
this._trigger("start", event);
$(options.appendTo).append(this.helper);
this.helper.css({
"left": event.pageX,
"top": event.pageY,
"width": 0,
"height": 0
});
if(options.autoRefresh){
this.refresh();
}
this.selectees.filter(".ui-selected").each(function(){
var selectee=$.data(this, "selectable-item");
selectee.startselected=true;
if(!event.metaKey&&!event.ctrlKey){
that._removeClass(selectee.$element, "ui-selected");
selectee.selected=false;
that._addClass(selectee.$element, "ui-unselecting");
selectee.unselecting=true;
that._trigger("unselecting", event, {
unselecting: selectee.element
});
}});
$(event.target).parents().addBack().each(function(){
var doSelect,
selectee=$.data(this, "selectable-item");
if(selectee){
doSelect=(!event.metaKey&&!event.ctrlKey) ||
!selectee.$element.hasClass("ui-selected");
that._removeClass(selectee.$element, doSelect ? "ui-unselecting":"ui-selected")
._addClass(selectee.$element, doSelect ? "ui-selecting":"ui-unselecting");
selectee.unselecting = !doSelect;
selectee.selecting=doSelect;
selectee.selected=doSelect;
if(doSelect){
that._trigger("selecting", event, {
selecting: selectee.element
});
}else{
that._trigger("unselecting", event, {
unselecting: selectee.element
});
}
return false;
}});
},
_mouseDrag: function(event){
this.dragged=true;
if(this.options.disabled){
return;
}
var tmp,
that=this,
options=this.options,
x1=this.opos[ 0 ],
y1=this.opos[ 1 ],
x2=event.pageX,
y2=event.pageY;
if(x1 > x2){ tmp=x2; x2=x1; x1=tmp; }
if(y1 > y2){ tmp=y2; y2=y1; y1=tmp; }
this.helper.css({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 });
this.selectees.each(function(){
var selectee=$.data(this, "selectable-item"),
hit=false,
offset={};
if(!selectee||selectee.element===that.element[ 0 ]){
return;
}
offset.left=selectee.left   + that.elementPos.left;
offset.right=selectee.right  + that.elementPos.left;
offset.top=selectee.top    + that.elementPos.top;
offset.bottom=selectee.bottom + that.elementPos.top;
if(options.tolerance==="touch"){
hit=(!(offset.left > x2||offset.right < x1||offset.top > y2 ||
offset.bottom < y1));
}else if(options.tolerance==="fit"){
hit=(offset.left > x1&&offset.right < x2&&offset.top > y1 &&
offset.bottom < y2);
}
if(hit){
if(selectee.selected){
that._removeClass(selectee.$element, "ui-selected");
selectee.selected=false;
}
if(selectee.unselecting){
that._removeClass(selectee.$element, "ui-unselecting");
selectee.unselecting=false;
}
if(!selectee.selecting){
that._addClass(selectee.$element, "ui-selecting");
selectee.selecting=true;
that._trigger("selecting", event, {
selecting: selectee.element
});
}}else{
if(selectee.selecting){
if(( event.metaKey||event.ctrlKey)&&selectee.startselected){
that._removeClass(selectee.$element, "ui-selecting");
selectee.selecting=false;
that._addClass(selectee.$element, "ui-selected");
selectee.selected=true;
}else{
that._removeClass(selectee.$element, "ui-selecting");
selectee.selecting=false;
if(selectee.startselected){
that._addClass(selectee.$element, "ui-unselecting");
selectee.unselecting=true;
}
that._trigger("unselecting", event, {
unselecting: selectee.element
});
}}
if(selectee.selected){
if(!event.metaKey&&!event.ctrlKey&&!selectee.startselected){
that._removeClass(selectee.$element, "ui-selected");
selectee.selected=false;
that._addClass(selectee.$element, "ui-unselecting");
selectee.unselecting=true;
that._trigger("unselecting", event, {
unselecting: selectee.element
});
}}
}});
return false;
},
_mouseStop: function(event){
var that=this;
this.dragged=false;
$(".ui-unselecting", this.element[ 0 ]).each(function(){
var selectee=$.data(this, "selectable-item");
that._removeClass(selectee.$element, "ui-unselecting");
selectee.unselecting=false;
selectee.startselected=false;
that._trigger("unselected", event, {
unselected: selectee.element
});
});
$(".ui-selecting", this.element[ 0 ]).each(function(){
var selectee=$.data(this, "selectable-item");
that._removeClass(selectee.$element, "ui-selecting")
._addClass(selectee.$element, "ui-selected");
selectee.selecting=false;
selectee.selected=true;
selectee.startselected=true;
that._trigger("selected", event, {
selected: selectee.element
});
});
this._trigger("stop", event);
this.helper.remove();
return false;
}});
var widgetsSelectmenu=$.widget("ui.selectmenu", [ $.ui.formResetMixin, {
version: "1.12.1",
defaultElement: "<select>",
options: {
appendTo: null,
classes: {
"ui-selectmenu-button-open": "ui-corner-top",
"ui-selectmenu-button-closed": "ui-corner-all"
},
disabled: null,
icons: {
button: "ui-icon-triangle-1-s"
},
position: {
my: "left top",
at: "left bottom",
collision: "none"
},
width: false,
change: null,
close: null,
focus: null,
open: null,
select: null
},
_create: function(){
var selectmenuId=this.element.uniqueId().attr("id");
this.ids={
element: selectmenuId,
button: selectmenuId + "-button",
menu: selectmenuId + "-menu"
};
this._drawButton();
this._drawMenu();
this._bindFormResetHandler();
this._rendered=false;
this.menuItems=$();
},
_drawButton: function(){
var icon,
that=this,
item=this._parseOption(this.element.find("option:selected"),
this.element[ 0 ].selectedIndex
);
this.labels=this.element.labels().attr("for", this.ids.button);
this._on(this.labels, {
click: function(event){
this.button.focus();
event.preventDefault();
}});
this.element.hide();
this.button=$("<span>", {
tabindex: this.options.disabled ? -1:0,
id: this.ids.button,
role: "combobox",
"aria-expanded": "false",
"aria-autocomplete": "list",
"aria-owns": this.ids.menu,
"aria-haspopup": "true",
title: this.element.attr("title")
})
.insertAfter(this.element);
this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed",
"ui-button ui-widget");
icon=$("<span>").appendTo(this.button);
this._addClass(icon, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button);
this.buttonItem=this._renderButtonItem(item)
.appendTo(this.button);
if(this.options.width!==false){
this._resizeButton();
}
this._on(this.button, this._buttonEvents);
this.button.one("focusin", function(){
if(!that._rendered){
that._refreshMenu();
}});
},
_drawMenu: function(){
var that=this;
this.menu=$("<ul>", {
"aria-hidden": "true",
"aria-labelledby": this.ids.button,
id: this.ids.menu
});
this.menuWrap=$("<div>").append(this.menu);
this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front");
this.menuWrap.appendTo(this._appendTo());
this.menuInstance=this.menu
.menu({
classes: {
"ui-menu": "ui-corner-bottom"
},
role: "listbox",
select: function(event, ui){
event.preventDefault();
that._setSelection();
that._select(ui.item.data("ui-selectmenu-item"), event);
},
focus: function(event, ui){
var item=ui.item.data("ui-selectmenu-item");
if(that.focusIndex!=null&&item.index!==that.focusIndex){
that._trigger("focus", event, { item: item });
if(!that.isOpen){
that._select(item, event);
}}
that.focusIndex=item.index;
that.button.attr("aria-activedescendant",
that.menuItems.eq(item.index).attr("id"));
}})
.menu("instance");
this.menuInstance._off(this.menu, "mouseleave");
this.menuInstance._closeOnDocumentClick=function(){
return false;
};
this.menuInstance._isDivider=function(){
return false;
};},
refresh: function(){
this._refreshMenu();
this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item")||{}
)
);
if(this.options.width===null){
this._resizeButton();
}},
_refreshMenu: function(){
var item,
options=this.element.find("option");
this.menu.empty();
this._parseOptions(options);
this._renderMenu(this.menu, this.items);
this.menuInstance.refresh();
this.menuItems=this.menu.find("li")
.not(".ui-selectmenu-optgroup")
.find(".ui-menu-item-wrapper");
this._rendered=true;
if(!options.length){
return;
}
item=this._getSelectedItem();
this.menuInstance.focus(null, item);
this._setAria(item.data("ui-selectmenu-item"));
this._setOption("disabled", this.element.prop("disabled"));
},
open: function(event){
if(this.options.disabled){
return;
}
if(!this._rendered){
this._refreshMenu();
}else{
this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active");
this.menuInstance.focus(null, this._getSelectedItem());
}
if(!this.menuItems.length){
return;
}
this.isOpen=true;
this._toggleAttr();
this._resizeMenu();
this._position();
this._on(this.document, this._documentClick);
this._trigger("open", event);
},
_position: function(){
this.menuWrap.position($.extend({ of: this.button }, this.options.position));
},
close: function(event){
if(!this.isOpen){
return;
}
this.isOpen=false;
this._toggleAttr();
this.range=null;
this._off(this.document);
this._trigger("close", event);
},
widget: function(){
return this.button;
},
menuWidget: function(){
return this.menu;
},
_renderButtonItem: function(item){
var buttonItem=$("<span>");
this._setText(buttonItem, item.label);
this._addClass(buttonItem, "ui-selectmenu-text");
return buttonItem;
},
_renderMenu: function(ul, items){
var that=this,
currentOptgroup="";
$.each(items, function(index, item){
var li;
if(item.optgroup!==currentOptgroup){
li=$("<li>", {
text: item.optgroup
});
that._addClass(li, "ui-selectmenu-optgroup", "ui-menu-divider" +
(item.element.parent("optgroup").prop("disabled") ?
" ui-state-disabled" :
""));
li.appendTo(ul);
currentOptgroup=item.optgroup;
}
that._renderItemData(ul, item);
});
},
_renderItemData: function(ul, item){
return this._renderItem(ul, item).data("ui-selectmenu-item", item);
},
_renderItem: function(ul, item){
var li=$("<li>"),
wrapper=$("<div>", {
title: item.element.attr("title")
});
if(item.disabled){
this._addClass(li, null, "ui-state-disabled");
}
this._setText(wrapper, item.label);
return li.append(wrapper).appendTo(ul);
},
_setText: function(element, value){
if(value){
element.text(value);
}else{
element.html("&#160;");
}},
_move: function(direction, event){
var item, next,
filter=".ui-menu-item";
if(this.isOpen){
item=this.menuItems.eq(this.focusIndex).parent("li");
}else{
item=this.menuItems.eq(this.element[ 0 ].selectedIndex).parent("li");
filter +=":not(.ui-state-disabled)";
}
if(direction==="first"||direction==="last"){
next=item[ direction==="first" ? "prevAll":"nextAll" ](filter).eq(-1);
}else{
next=item[ direction + "All" ](filter).eq(0);
}
if(next.length){
this.menuInstance.focus(event, next);
}},
_getSelectedItem: function(){
return this.menuItems.eq(this.element[ 0 ].selectedIndex).parent("li");
},
_toggle: function(event){
this[ this.isOpen ? "close":"open" ](event);
},
_setSelection: function(){
var selection;
if(!this.range){
return;
}
if(window.getSelection){
selection=window.getSelection();
selection.removeAllRanges();
selection.addRange(this.range);
}else{
this.range.select();
}
this.button.focus();
},
_documentClick: {
mousedown: function(event){
if(!this.isOpen){
return;
}
if(!$(event.target).closest(".ui-selectmenu-menu, #" +
$.ui.escapeSelector(this.ids.button)).length){
this.close(event);
}}
},
_buttonEvents: {
mousedown: function(){
var selection;
if(window.getSelection){
selection=window.getSelection();
if(selection.rangeCount){
this.range=selection.getRangeAt(0);
}}else{
this.range=document.selection.createRange();
}},
click: function(event){
this._setSelection();
this._toggle(event);
},
keydown: function(event){
var preventDefault=true;
switch(event.keyCode){
case $.ui.keyCode.TAB:
case $.ui.keyCode.ESCAPE:
this.close(event);
preventDefault=false;
break;
case $.ui.keyCode.ENTER:
if(this.isOpen){
this._selectFocusedItem(event);
}
break;
case $.ui.keyCode.UP:
if(event.altKey){
this._toggle(event);
}else{
this._move("prev", event);
}
break;
case $.ui.keyCode.DOWN:
if(event.altKey){
this._toggle(event);
}else{
this._move("next", event);
}
break;
case $.ui.keyCode.SPACE:
if(this.isOpen){
this._selectFocusedItem(event);
}else{
this._toggle(event);
}
break;
case $.ui.keyCode.LEFT:
this._move("prev", event);
break;
case $.ui.keyCode.RIGHT:
this._move("next", event);
break;
case $.ui.keyCode.HOME:
case $.ui.keyCode.PAGE_UP:
this._move("first", event);
break;
case $.ui.keyCode.END:
case $.ui.keyCode.PAGE_DOWN:
this._move("last", event);
break;
default:
this.menu.trigger(event);
preventDefault=false;
}
if(preventDefault){
event.preventDefault();
}}
},
_selectFocusedItem: function(event){
var item=this.menuItems.eq(this.focusIndex).parent("li");
if(!item.hasClass("ui-state-disabled")){
this._select(item.data("ui-selectmenu-item"), event);
}},
_select: function(item, event){
var oldIndex=this.element[ 0 ].selectedIndex;
this.element[ 0 ].selectedIndex=item.index;
this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(item));
this._setAria(item);
this._trigger("select", event, { item: item });
if(item.index!==oldIndex){
this._trigger("change", event, { item: item });
}
this.close(event);
},
_setAria: function(item){
var id=this.menuItems.eq(item.index).attr("id");
this.button.attr({
"aria-labelledby": id,
"aria-activedescendant": id
});
this.menu.attr("aria-activedescendant", id);
},
_setOption: function(key, value){
if(key==="icons"){
var icon=this.button.find("span.ui-icon");
this._removeClass(icon, null, this.options.icons.button)
._addClass(icon, null, value.button);
}
this._super(key, value);
if(key==="appendTo"){
this.menuWrap.appendTo(this._appendTo());
}
if(key==="width"){
this._resizeButton();
}},
_setOptionDisabled: function(value){
this._super(value);
this.menuInstance.option("disabled", value);
this.button.attr("aria-disabled", value);
this._toggleClass(this.button, null, "ui-state-disabled", value);
this.element.prop("disabled", value);
if(value){
this.button.attr("tabindex", -1);
this.close();
}else{
this.button.attr("tabindex", 0);
}},
_appendTo: function(){
var element=this.options.appendTo;
if(element){
element=element.jquery||element.nodeType ?
$(element) :
this.document.find(element).eq(0);
}
if(!element||!element[ 0 ]){
element=this.element.closest(".ui-front, dialog");
}
if(!element.length){
element=this.document[ 0 ].body;
}
return element;
},
_toggleAttr: function(){
this.button.attr("aria-expanded", this.isOpen);
this._removeClass(this.button, "ui-selectmenu-button-" +
(this.isOpen ? "closed":"open"))
._addClass(this.button, "ui-selectmenu-button-" +
(this.isOpen ? "open":"closed"))
._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen);
this.menu.attr("aria-hidden", !this.isOpen);
},
_resizeButton: function(){
var width=this.options.width;
if(width===false){
this.button.css("width", "");
return;
}
if(width===null){
width=this.element.show().outerWidth();
this.element.hide();
}
this.button.outerWidth(width);
},
_resizeMenu: function(){
this.menu.outerWidth(Math.max(this.button.outerWidth(),
this.menu.width("").outerWidth() + 1
));
},
_getCreateOptions: function(){
var options=this._super();
options.disabled=this.element.prop("disabled");
return options;
},
_parseOptions: function(options){
var that=this,
data=[];
options.each(function(index, item){
data.push(that._parseOption($(item), index));
});
this.items=data;
},
_parseOption: function(option, index){
var optgroup=option.parent("optgroup");
return {
element: option,
index: index,
value: option.val(),
label: option.text(),
optgroup: optgroup.attr("label")||"",
disabled: optgroup.prop("disabled")||option.prop("disabled")
};},
_destroy: function(){
this._unbindFormResetHandler();
this.menuWrap.remove();
this.button.remove();
this.element.show();
this.element.removeUniqueId();
this.labels.attr("for", this.ids.element);
}} ]);
var widgetsSlider=$.widget("ui.slider", $.ui.mouse, {
version: "1.12.1",
widgetEventPrefix: "slide",
options: {
animate: false,
classes: {
"ui-slider": "ui-corner-all",
"ui-slider-handle": "ui-corner-all",
"ui-slider-range": "ui-corner-all ui-widget-header"
},
distance: 0,
max: 100,
min: 0,
orientation: "horizontal",
range: false,
step: 1,
value: 0,
values: null,
change: null,
slide: null,
start: null,
stop: null
},
numPages: 5,
_create: function(){
this._keySliding=false;
this._mouseSliding=false;
this._animateOff=true;
this._handleIndex=null;
this._detectOrientation();
this._mouseInit();
this._calculateNewMax();
this._addClass("ui-slider ui-slider-" + this.orientation,
"ui-widget ui-widget-content");
this._refresh();
this._animateOff=false;
},
_refresh: function(){
this._createRange();
this._createHandles();
this._setupEvents();
this._refreshValue();
},
_createHandles: function(){
var i, handleCount,
options=this.options,
existingHandles=this.element.find(".ui-slider-handle"),
handle="<span tabindex='0'></span>",
handles=[];
handleCount=(options.values&&options.values.length)||1;
if(existingHandles.length > handleCount){
existingHandles.slice(handleCount).remove();
existingHandles=existingHandles.slice(0, handleCount);
}
for(i=existingHandles.length; i < handleCount; i++){
handles.push(handle);
}
this.handles=existingHandles.add($(handles.join("")).appendTo(this.element));
this._addClass(this.handles, "ui-slider-handle", "ui-state-default");
this.handle=this.handles.eq(0);
this.handles.each(function(i){
$(this)
.data("ui-slider-handle-index", i)
.attr("tabIndex", 0);
});
},
_createRange: function(){
var options=this.options;
if(options.range){
if(options.range===true){
if(!options.values){
options.values=[ this._valueMin(), this._valueMin() ];
}else if(options.values.length&&options.values.length!==2){
options.values=[ options.values[ 0 ], options.values[ 0 ] ];
}else if($.isArray(options.values)){
options.values=options.values.slice(0);
}}
if(!this.range||!this.range.length){
this.range=$("<div>")
.appendTo(this.element);
this._addClass(this.range, "ui-slider-range");
}else{
this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max");
this.range.css({
"left": "",
"bottom": ""
});
}
if(options.range==="min"||options.range==="max"){
this._addClass(this.range, "ui-slider-range-" + options.range);
}}else{
if(this.range){
this.range.remove();
}
this.range=null;
}},
_setupEvents: function(){
this._off(this.handles);
this._on(this.handles, this._handleEvents);
this._hoverable(this.handles);
this._focusable(this.handles);
},
_destroy: function(){
this.handles.remove();
if(this.range){
this.range.remove();
}
this._mouseDestroy();
},
_mouseCapture: function(event){
var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle,
that=this,
o=this.options;
if(o.disabled){
return false;
}
this.elementSize={
width: this.element.outerWidth(),
height: this.element.outerHeight()
};
this.elementOffset=this.element.offset();
position={ x: event.pageX, y: event.pageY };
normValue=this._normValueFromMouse(position);
distance=this._valueMax() - this._valueMin() + 1;
this.handles.each(function(i){
var thisDistance=Math.abs(normValue - that.values(i));
if(( distance > thisDistance) ||
(distance===thisDistance &&
(i===that._lastChangedValue||that.values(i)===o.min))){
distance=thisDistance;
closestHandle=$(this);
index=i;
}});
allowed=this._start(event, index);
if(allowed===false){
return false;
}
this._mouseSliding=true;
this._handleIndex=index;
this._addClass(closestHandle, null, "ui-state-active");
closestHandle.trigger("focus");
offset=closestHandle.offset();
mouseOverHandle = !$(event.target).parents().addBack().is(".ui-slider-handle");
this._clickOffset=mouseOverHandle ? { left: 0, top: 0 }:{
left: event.pageX - offset.left -(closestHandle.width() / 2),
top: event.pageY - offset.top -
(closestHandle.height() / 2) -
(parseInt(closestHandle.css("borderTopWidth"), 10)||0) -
(parseInt(closestHandle.css("borderBottomWidth"), 10)||0) +
(parseInt(closestHandle.css("marginTop"), 10)||0)
};
if(!this.handles.hasClass("ui-state-hover")){
this._slide(event, index, normValue);
}
this._animateOff=true;
return true;
},
_mouseStart: function(){
return true;
},
_mouseDrag: function(event){
var position={ x: event.pageX, y: event.pageY },
normValue=this._normValueFromMouse(position);
this._slide(event, this._handleIndex, normValue);
return false;
},
_mouseStop: function(event){
this._removeClass(this.handles, null, "ui-state-active");
this._mouseSliding=false;
this._stop(event, this._handleIndex);
this._change(event, this._handleIndex);
this._handleIndex=null;
this._clickOffset=null;
this._animateOff=false;
return false;
},
_detectOrientation: function(){
this.orientation=(this.options.orientation==="vertical") ? "vertical":"horizontal";
},
_normValueFromMouse: function(position){
var pixelTotal,
pixelMouse,
percentMouse,
valueTotal,
valueMouse;
if(this.orientation==="horizontal"){
pixelTotal=this.elementSize.width;
pixelMouse=position.x - this.elementOffset.left -
(this._clickOffset ? this._clickOffset.left:0);
}else{
pixelTotal=this.elementSize.height;
pixelMouse=position.y - this.elementOffset.top -
(this._clickOffset ? this._clickOffset.top:0);
}
percentMouse=(pixelMouse / pixelTotal);
if(percentMouse > 1){
percentMouse=1;
}
if(percentMouse < 0){
percentMouse=0;
}
if(this.orientation==="vertical"){
percentMouse=1 - percentMouse;
}
valueTotal=this._valueMax() - this._valueMin();
valueMouse=this._valueMin() + percentMouse * valueTotal;
return this._trimAlignValue(valueMouse);
},
_uiHash: function(index, value, values){
var uiHash={
handle: this.handles[ index ],
handleIndex: index,
value: value!==undefined ? value:this.value()
};
if(this._hasMultipleValues()){
uiHash.value=value!==undefined ? value:this.values(index);
uiHash.values=values||this.values();
}
return uiHash;
},
_hasMultipleValues: function(){
return this.options.values&&this.options.values.length;
},
_start: function(event, index){
return this._trigger("start", event, this._uiHash(index));
},
_slide: function(event, index, newVal){
var allowed, otherVal,
currentValue=this.value(),
newValues=this.values();
if(this._hasMultipleValues()){
otherVal=this.values(index ? 0:1);
currentValue=this.values(index);
if(this.options.values.length===2&&this.options.range===true){
newVal=index===0 ? Math.min(otherVal, newVal):Math.max(otherVal, newVal);
}
newValues[ index ]=newVal;
}
if(newVal===currentValue){
return;
}
allowed=this._trigger("slide", event, this._uiHash(index, newVal, newValues));
if(allowed===false){
return;
}
if(this._hasMultipleValues()){
this.values(index, newVal);
}else{
this.value(newVal);
}},
_stop: function(event, index){
this._trigger("stop", event, this._uiHash(index));
},
_change: function(event, index){
if(!this._keySliding&&!this._mouseSliding){
this._lastChangedValue=index;
this._trigger("change", event, this._uiHash(index));
}},
value: function(newValue){
if(arguments.length){
this.options.value=this._trimAlignValue(newValue);
this._refreshValue();
this._change(null, 0);
return;
}
return this._value();
},
values: function(index, newValue){
var vals,
newValues,
i;
if(arguments.length > 1){
this.options.values[ index ]=this._trimAlignValue(newValue);
this._refreshValue();
this._change(null, index);
return;
}
if(arguments.length){
if($.isArray(arguments[ 0 ])){
vals=this.options.values;
newValues=arguments[ 0 ];
for(i=0; i < vals.length; i +=1){
vals[ i ]=this._trimAlignValue(newValues[ i ]);
this._change(null, i);
}
this._refreshValue();
}else{
if(this._hasMultipleValues()){
return this._values(index);
}else{
return this.value();
}}
}else{
return this._values();
}},
_setOption: function(key, value){
var i,
valsLength=0;
if(key==="range"&&this.options.range===true){
if(value==="min"){
this.options.value=this._values(0);
this.options.values=null;
}else if(value==="max"){
this.options.value=this._values(this.options.values.length - 1);
this.options.values=null;
}}
if($.isArray(this.options.values)){
valsLength=this.options.values.length;
}
this._super(key, value);
switch(key){
case "orientation":
this._detectOrientation();
this._removeClass("ui-slider-horizontal ui-slider-vertical")
._addClass("ui-slider-" + this.orientation);
this._refreshValue();
if(this.options.range){
this._refreshRange(value);
}
this.handles.css(value==="horizontal" ? "bottom":"left", "");
break;
case "value":
this._animateOff=true;
this._refreshValue();
this._change(null, 0);
this._animateOff=false;
break;
case "values":
this._animateOff=true;
this._refreshValue();
for(i=valsLength - 1; i >=0; i--){
this._change(null, i);
}
this._animateOff=false;
break;
case "step":
case "min":
case "max":
this._animateOff=true;
this._calculateNewMax();
this._refreshValue();
this._animateOff=false;
break;
case "range":
this._animateOff=true;
this._refresh();
this._animateOff=false;
break;
}},
_setOptionDisabled: function(value){
this._super(value);
this._toggleClass(null, "ui-state-disabled", !!value);
},
_value: function(){
var val=this.options.value;
val=this._trimAlignValue(val);
return val;
},
_values: function(index){
var val,
vals,
i;
if(arguments.length){
val=this.options.values[ index ];
val=this._trimAlignValue(val);
return val;
}else if(this._hasMultipleValues()){
vals=this.options.values.slice();
for(i=0; i < vals.length; i +=1){
vals[ i ]=this._trimAlignValue(vals[ i ]);
}
return vals;
}else{
return [];
}},
_trimAlignValue: function(val){
if(val <=this._valueMin()){
return this._valueMin();
}
if(val >=this._valueMax()){
return this._valueMax();
}
var step=(this.options.step > 0) ? this.options.step:1,
valModStep=(val - this._valueMin()) % step,
alignValue=val - valModStep;
if(Math.abs(valModStep) * 2 >=step){
alignValue +=(valModStep > 0) ? step:(-step);
}
return parseFloat(alignValue.toFixed(5));
},
_calculateNewMax: function(){
var max=this.options.max,
min=this._valueMin(),
step=this.options.step,
aboveMin=Math.round(( max - min) / step) * step;
max=aboveMin + min;
if(max > this.options.max){
max -=step;
}
this.max=parseFloat(max.toFixed(this._precision()));
},
_precision: function(){
var precision=this._precisionOf(this.options.step);
if(this.options.min!==null){
precision=Math.max(precision, this._precisionOf(this.options.min));
}
return precision;
},
_precisionOf: function(num){
var str=num.toString(),
decimal=str.indexOf(".");
return decimal===-1 ? 0:str.length - decimal - 1;
},
_valueMin: function(){
return this.options.min;
},
_valueMax: function(){
return this.max;
},
_refreshRange: function(orientation){
if(orientation==="vertical"){
this.range.css({ "width": "", "left": "" });
}
if(orientation==="horizontal"){
this.range.css({ "height": "", "bottom": "" });
}},
_refreshValue: function(){
var lastValPercent, valPercent, value, valueMin, valueMax,
oRange=this.options.range,
o=this.options,
that=this,
animate=(!this._animateOff) ? o.animate:false,
_set={};
if(this._hasMultipleValues()){
this.handles.each(function(i){
valPercent=(that.values(i) - that._valueMin()) /(that._valueMax() -
that._valueMin()) * 100;
_set[ that.orientation==="horizontal" ? "left":"bottom" ]=valPercent + "%";
$(this).stop(1, 1)[ animate ? "animate":"css" ](_set, o.animate);
if(that.options.range===true){
if(that.orientation==="horizontal"){
if(i===0){
that.range.stop(1, 1)[ animate ? "animate":"css" ]({
left: valPercent + "%"
}, o.animate);
}
if(i===1){
that.range[ animate ? "animate":"css" ]({
width:(valPercent - lastValPercent) + "%"
}, {
queue: false,
duration: o.animate
});
}}else{
if(i===0){
that.range.stop(1, 1)[ animate ? "animate":"css" ]({
bottom:(valPercent) + "%"
}, o.animate);
}
if(i===1){
that.range[ animate ? "animate":"css" ]({
height:(valPercent - lastValPercent) + "%"
}, {
queue: false,
duration: o.animate
});
}}
}
lastValPercent=valPercent;
});
}else{
value=this.value();
valueMin=this._valueMin();
valueMax=this._valueMax();
valPercent=(valueMax!==valueMin) ?
(value - valueMin) /(valueMax - valueMin) * 100 :
0;
_set[ this.orientation==="horizontal" ? "left":"bottom" ]=valPercent + "%";
this.handle.stop(1, 1)[ animate ? "animate":"css" ](_set, o.animate);
if(oRange==="min"&&this.orientation==="horizontal"){
this.range.stop(1, 1)[ animate ? "animate":"css" ]({
width: valPercent + "%"
}, o.animate);
}
if(oRange==="max"&&this.orientation==="horizontal"){
this.range.stop(1, 1)[ animate ? "animate":"css" ]({
width:(100 - valPercent) + "%"
}, o.animate);
}
if(oRange==="min"&&this.orientation==="vertical"){
this.range.stop(1, 1)[ animate ? "animate":"css" ]({
height: valPercent + "%"
}, o.animate);
}
if(oRange==="max"&&this.orientation==="vertical"){
this.range.stop(1, 1)[ animate ? "animate":"css" ]({
height:(100 - valPercent) + "%"
}, o.animate);
}}
},
_handleEvents: {
keydown: function(event){
var allowed, curVal, newVal, step,
index=$(event.target).data("ui-slider-handle-index");
switch(event.keyCode){
case $.ui.keyCode.HOME:
case $.ui.keyCode.END:
case $.ui.keyCode.PAGE_UP:
case $.ui.keyCode.PAGE_DOWN:
case $.ui.keyCode.UP:
case $.ui.keyCode.RIGHT:
case $.ui.keyCode.DOWN:
case $.ui.keyCode.LEFT:
event.preventDefault();
if(!this._keySliding){
this._keySliding=true;
this._addClass($(event.target), null, "ui-state-active");
allowed=this._start(event, index);
if(allowed===false){
return;
}}
break;
}
step=this.options.step;
if(this._hasMultipleValues()){
curVal=newVal=this.values(index);
}else{
curVal=newVal=this.value();
}
switch(event.keyCode){
case $.ui.keyCode.HOME:
newVal=this._valueMin();
break;
case $.ui.keyCode.END:
newVal=this._valueMax();
break;
case $.ui.keyCode.PAGE_UP:
newVal=this._trimAlignValue(curVal +(( this._valueMax() - this._valueMin()) / this.numPages)
);
break;
case $.ui.keyCode.PAGE_DOWN:
newVal=this._trimAlignValue(curVal -(( this._valueMax() - this._valueMin()) / this.numPages));
break;
case $.ui.keyCode.UP:
case $.ui.keyCode.RIGHT:
if(curVal===this._valueMax()){
return;
}
newVal=this._trimAlignValue(curVal + step);
break;
case $.ui.keyCode.DOWN:
case $.ui.keyCode.LEFT:
if(curVal===this._valueMin()){
return;
}
newVal=this._trimAlignValue(curVal - step);
break;
}
this._slide(event, index, newVal);
},
keyup: function(event){
var index=$(event.target).data("ui-slider-handle-index");
if(this._keySliding){
this._keySliding=false;
this._stop(event, index);
this._change(event, index);
this._removeClass($(event.target), null, "ui-state-active");
}}
}});
var widgetsSortable=$.widget("ui.sortable", $.ui.mouse, {
version: "1.12.1",
widgetEventPrefix: "sort",
ready: false,
options: {
appendTo: "parent",
axis: false,
connectWith: false,
containment: false,
cursor: "auto",
cursorAt: false,
dropOnEmpty: true,
forcePlaceholderSize: false,
forceHelperSize: false,
grid: false,
handle: false,
helper: "original",
items: "> *",
opacity: false,
placeholder: false,
revert: false,
scroll: true,
scrollSensitivity: 20,
scrollSpeed: 20,
scope: "default",
tolerance: "intersect",
zIndex: 1000,
activate: null,
beforeStop: null,
change: null,
deactivate: null,
out: null,
over: null,
receive: null,
remove: null,
sort: null,
start: null,
stop: null,
update: null
},
_isOverAxis: function(x, reference, size){
return(x >=reference)&&(x <(reference + size));
},
_isFloating: function(item){
return(/left|right/).test(item.css("float")) ||
(/inline|table-cell/).test(item.css("display"));
},
_create: function(){
this.containerCache={};
this._addClass("ui-sortable");
this.refresh();
this.offset=this.element.offset();
this._mouseInit();
this._setHandleClassName();
this.ready=true;
},
_setOption: function(key, value){
this._super(key, value);
if(key==="handle"){
this._setHandleClassName();
}},
_setHandleClassName: function(){
var that=this;
this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle");
$.each(this.items, function(){
that._addClass(this.instance.options.handle ?
this.item.find(this.instance.options.handle) :
this.item,
"ui-sortable-handle"
);
});
},
_destroy: function(){
this._mouseDestroy();
for(var i=this.items.length - 1; i >=0; i--){
this.items[ i ].item.removeData(this.widgetName + "-item");
}
return this;
},
_mouseCapture: function(event, overrideHandle){
var currentItem=null,
validHandle=false,
that=this;
if(this.reverting){
return false;
}
if(this.options.disabled||this.options.type==="static"){
return false;
}
this._refreshItems(event);
$(event.target).parents().each(function(){
if($.data(this, that.widgetName + "-item")===that){
currentItem=$(this);
return false;
}});
if($.data(event.target, that.widgetName + "-item")===that){
currentItem=$(event.target);
}
if(!currentItem){
return false;
}
if(this.options.handle&&!overrideHandle){
$(this.options.handle, currentItem).find("*").addBack().each(function(){
if(this===event.target){
validHandle=true;
}});
if(!validHandle){
return false;
}}
this.currentItem=currentItem;
this._removeCurrentsFromItems();
return true;
},
_mouseStart: function(event, overrideHandle, noActivation){
var i, body,
o=this.options;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(event);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={
top: this.offset.top - this.margins.top,
left: this.offset.left - this.margins.left
};
$.extend(this.offset, {
click: {
left: event.pageX - this.offset.left,
top: event.pageY - this.offset.top
},
parent: this._getParentOffset(),
relative: this._getRelativeOffset()
});
this.helper.css("position", "absolute");
this.cssPosition=this.helper.css("position");
this.originalPosition=this._generatePosition(event);
this.originalPageX=event.pageX;
this.originalPageY=event.pageY;
(o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt));
this.domPosition={
prev: this.currentItem.prev()[ 0 ],
parent: this.currentItem.parent()[ 0 ]
};
if(this.helper[ 0 ]!==this.currentItem[ 0 ]){
this.currentItem.hide();
}
this._createPlaceholder();
if(o.containment){
this._setContainment();
}
if(o.cursor&&o.cursor!=="auto"){
body=this.document.find("body");
this.storedCursor=body.css("cursor");
body.css("cursor", o.cursor);
this.storedStylesheet =
$("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body);
}
if(o.opacity){
if(this.helper.css("opacity")){
this._storedOpacity=this.helper.css("opacity");
}
this.helper.css("opacity", o.opacity);
}
if(o.zIndex){
if(this.helper.css("zIndex")){
this._storedZIndex=this.helper.css("zIndex");
}
this.helper.css("zIndex", o.zIndex);
}
if(this.scrollParent[ 0 ]!==this.document[ 0 ] &&
this.scrollParent[ 0 ].tagName!=="HTML"){
this.overflowOffset=this.scrollParent.offset();
}
this._trigger("start", event, this._uiHash());
if(!this._preserveHelperProportions){
this._cacheHelperProportions();
}
if(!noActivation){
for(i=this.containers.length - 1; i >=0; i--){
this.containers[ i ]._trigger("activate", event, this._uiHash(this));
}}
if($.ui.ddmanager){
$.ui.ddmanager.current=this;
}
if($.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(this, event);
}
this.dragging=true;
this._addClass(this.helper, "ui-sortable-helper");
this._mouseDrag(event);
return true;
},
_mouseDrag: function(event){
var i, item, itemElement, intersection,
o=this.options,
scrolled=false;
this.position=this._generatePosition(event);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){
this.lastPositionAbs=this.positionAbs;
}
if(this.options.scroll){
if(this.scrollParent[ 0 ]!==this.document[ 0 ] &&
this.scrollParent[ 0 ].tagName!=="HTML"){
if(( this.overflowOffset.top + this.scrollParent[ 0 ].offsetHeight) -
event.pageY < o.scrollSensitivity){
this.scrollParent[ 0 ].scrollTop =
scrolled=this.scrollParent[ 0 ].scrollTop + o.scrollSpeed;
}else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity){
this.scrollParent[ 0 ].scrollTop =
scrolled=this.scrollParent[ 0 ].scrollTop - o.scrollSpeed;
}
if(( this.overflowOffset.left + this.scrollParent[ 0 ].offsetWidth) -
event.pageX < o.scrollSensitivity){
this.scrollParent[ 0 ].scrollLeft=scrolled =
this.scrollParent[ 0 ].scrollLeft + o.scrollSpeed;
}else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity){
this.scrollParent[ 0 ].scrollLeft=scrolled =
this.scrollParent[ 0 ].scrollLeft - o.scrollSpeed;
}}else{
if(event.pageY - this.document.scrollTop() < o.scrollSensitivity){
scrolled=this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed);
}else if(this.window.height() -(event.pageY - this.document.scrollTop()) <
o.scrollSensitivity){
scrolled=this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed);
}
if(event.pageX - this.document.scrollLeft() < o.scrollSensitivity){
scrolled=this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed
);
}else if(this.window.width() -(event.pageX - this.document.scrollLeft()) <
o.scrollSensitivity){
scrolled=this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed
);
}}
if(scrolled!==false&&$.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(this, event);
}}
this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!=="y"){
this.helper[ 0 ].style.left=this.position.left + "px";
}
if(!this.options.axis||this.options.axis!=="x"){
this.helper[ 0 ].style.top=this.position.top + "px";
}
for(i=this.items.length - 1; i >=0; i--){
item=this.items[ i ];
itemElement=item.item[ 0 ];
intersection=this._intersectsWithPointer(item);
if(!intersection){
continue;
}
if(item.instance!==this.currentContainer){
continue;
}
if(itemElement!==this.currentItem[ 0 ] &&
this.placeholder[ intersection===1 ? "next":"prev" ]()[ 0 ]!==itemElement &&
!$.contains(this.placeholder[ 0 ], itemElement) &&
(this.options.type==="semi-dynamic" ?
!$.contains(this.element[ 0 ], itemElement) :
true
)
){
this.direction=intersection===1 ? "down":"up";
if(this.options.tolerance==="pointer"||this._intersectsWithSides(item)){
this._rearrange(event, item);
}else{
break;
}
this._trigger("change", event, this._uiHash());
break;
}}
this._contactContainers(event);
if($.ui.ddmanager){
$.ui.ddmanager.drag(this, event);
}
this._trigger("sort", event, this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false;
},
_mouseStop: function(event, noPropagation){
if(!event){
return;
}
if($.ui.ddmanager&&!this.options.dropBehaviour){
$.ui.ddmanager.drop(this, event);
}
if(this.options.revert){
var that=this,
cur=this.placeholder.offset(),
axis=this.options.axis,
animation={};
if(!axis||axis==="x"){
animation.left=cur.left - this.offset.parent.left - this.margins.left +
(this.offsetParent[ 0 ]===this.document[ 0 ].body ?
0 :
this.offsetParent[ 0 ].scrollLeft
);
}
if(!axis||axis==="y"){
animation.top=cur.top - this.offset.parent.top - this.margins.top +
(this.offsetParent[ 0 ]===this.document[ 0 ].body ?
0 :
this.offsetParent[ 0 ].scrollTop
);
}
this.reverting=true;
$(this.helper).animate(animation,
parseInt(this.options.revert, 10)||500,
function(){
that._clear(event);
}
);
}else{
this._clear(event, noPropagation);
}
return false;
},
cancel: function(){
if(this.dragging){
this._mouseUp(new $.Event("mouseup", { target: null }));
if(this.options.helper==="original"){
this.currentItem.css(this._storedCSS);
this._removeClass(this.currentItem, "ui-sortable-helper");
}else{
this.currentItem.show();
}
for(var i=this.containers.length - 1; i >=0; i--){
this.containers[ i ]._trigger("deactivate", null, this._uiHash(this));
if(this.containers[ i ].containerCache.over){
this.containers[ i ]._trigger("out", null, this._uiHash(this));
this.containers[ i ].containerCache.over=0;
}}
}
if(this.placeholder){
if(this.placeholder[ 0 ].parentNode){
this.placeholder[ 0 ].parentNode.removeChild(this.placeholder[ 0 ]);
}
if(this.options.helper!=="original"&&this.helper &&
this.helper[ 0 ].parentNode){
this.helper.remove();
}
$.extend(this, {
helper: null,
dragging: false,
reverting: false,
_noFinalSort: null
});
if(this.domPosition.prev){
$(this.domPosition.prev).after(this.currentItem);
}else{
$(this.domPosition.parent).prepend(this.currentItem);
}}
return this;
},
serialize: function(o){
var items=this._getItemsAsjQuery(o&&o.connected),
str=[];
o=o||{};
$(items).each(function(){
var res=($(o.item||this).attr(o.attribute||"id")||"")
.match(o.expression||(/(.+)[\-=_](.+)/));
if(res){
str.push((o.key||res[ 1 ] + "[]") +
"=" +(o.key&&o.expression ? res[ 1 ]:res[ 2 ]));
}});
if(!str.length&&o.key){
str.push(o.key + "=");
}
return str.join("&");
},
toArray: function(o){
var items=this._getItemsAsjQuery(o&&o.connected),
ret=[];
o=o||{};
items.each(function(){
ret.push($(o.item||this).attr(o.attribute||"id")||"");
});
return ret;
},
_intersectsWith: function(item){
var x1=this.positionAbs.left,
x2=x1 + this.helperProportions.width,
y1=this.positionAbs.top,
y2=y1 + this.helperProportions.height,
l=item.left,
r=l + item.width,
t=item.top,
b=t + item.height,
dyClick=this.offset.click.top,
dxClick=this.offset.click.left,
isOverElementHeight=(this.options.axis==="x")||(( y1 + dyClick) > t &&
(y1 + dyClick) < b),
isOverElementWidth=(this.options.axis==="y")||(( x1 + dxClick) > l &&
(x1 + dxClick) < r),
isOverElement=isOverElementHeight&&isOverElementWidth;
if(this.options.tolerance==="pointer" ||
this.options.forcePointerForContainers ||
(this.options.tolerance!=="pointer" &&
this.helperProportions[ this.floating ? "width":"height" ] >
item[ this.floating ? "width":"height" ])
){
return isOverElement;
}else{
return(l < x1 +(this.helperProportions.width / 2) &&
x2 -(this.helperProportions.width / 2) < r &&
t < y1 +(this.helperProportions.height / 2) &&
y2 -(this.helperProportions.height / 2) < b);
}},
_intersectsWithPointer: function(item){
var verticalDirection, horizontalDirection,
isOverElementHeight=(this.options.axis==="x") ||
this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
isOverElementWidth=(this.options.axis==="y") ||
this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
isOverElement=isOverElementHeight&&isOverElementWidth;
if(!isOverElement){
return false;
}
verticalDirection=this._getDragVerticalDirection();
horizontalDirection=this._getDragHorizontalDirection();
return this.floating ?
(( horizontalDirection==="right"||verticalDirection==="down") ? 2:1)
:(verticalDirection&&(verticalDirection==="down" ? 2:1));
},
_intersectsWithSides: function(item){
var isOverBottomHalf=this._isOverAxis(this.positionAbs.top +
this.offset.click.top, item.top +(item.height / 2), item.height),
isOverRightHalf=this._isOverAxis(this.positionAbs.left +
this.offset.click.left, item.left +(item.width / 2), item.width),
verticalDirection=this._getDragVerticalDirection(),
horizontalDirection=this._getDragHorizontalDirection();
if(this.floating&&horizontalDirection){
return(( horizontalDirection==="right"&&isOverRightHalf) ||
(horizontalDirection==="left"&&!isOverRightHalf));
}else{
return verticalDirection&&(( verticalDirection==="down"&&isOverBottomHalf) ||
(verticalDirection==="up"&&!isOverBottomHalf));
}},
_getDragVerticalDirection: function(){
var delta=this.positionAbs.top - this.lastPositionAbs.top;
return delta!==0&&(delta > 0 ? "down":"up");
},
_getDragHorizontalDirection: function(){
var delta=this.positionAbs.left - this.lastPositionAbs.left;
return delta!==0&&(delta > 0 ? "right":"left");
},
refresh: function(event){
this._refreshItems(event);
this._setHandleClassName();
this.refreshPositions();
return this;
},
_connectWith: function(){
var options=this.options;
return options.connectWith.constructor===String ?
[ options.connectWith ] :
options.connectWith;
},
_getItemsAsjQuery: function(connected){
var i, j, cur, inst,
items=[],
queries=[],
connectWith=this._connectWith();
if(connectWith&&connected){
for(i=connectWith.length - 1; i >=0; i--){
cur=$(connectWith[ i ], this.document[ 0 ]);
for(j=cur.length - 1; j >=0; j--){
inst=$.data(cur[ j ], this.widgetFullName);
if(inst&&inst!==this&&!inst.options.disabled){
queries.push([ $.isFunction(inst.options.items) ?
inst.options.items.call(inst.element) :
$(inst.options.items, inst.element)
.not(".ui-sortable-helper")
.not(".ui-sortable-placeholder"), inst ]);
}}
}}
queries.push([ $.isFunction(this.options.items) ?
this.options.items
.call(this.element, null, { options: this.options, item: this.currentItem }) :
$(this.options.items, this.element)
.not(".ui-sortable-helper")
.not(".ui-sortable-placeholder"), this ]);
function addItems(){
items.push(this);
}
for(i=queries.length - 1; i >=0; i--){
queries[ i ][ 0 ].each(addItems);
}
return $(items);
},
_removeCurrentsFromItems: function(){
var list=this.currentItem.find(":data(" + this.widgetName + "-item)");
this.items=$.grep(this.items, function(item){
for(var j=0; j < list.length; j++){
if(list[ j ]===item.item[ 0 ]){
return false;
}}
return true;
});
},
_refreshItems: function(event){
this.items=[];
this.containers=[ this ];
var i, j, cur, inst, targetData, _queries, item, queriesLength,
items=this.items,
queries=[ [ $.isFunction(this.options.items) ?
this.options.items.call(this.element[ 0 ], event, { item: this.currentItem }) :
$(this.options.items, this.element), this ] ],
connectWith=this._connectWith();
if(connectWith&&this.ready){
for(i=connectWith.length - 1; i >=0; i--){
cur=$(connectWith[ i ], this.document[ 0 ]);
for(j=cur.length - 1; j >=0; j--){
inst=$.data(cur[ j ], this.widgetFullName);
if(inst&&inst!==this&&!inst.options.disabled){
queries.push([ $.isFunction(inst.options.items) ?
inst.options.items
.call(inst.element[ 0 ], event, { item: this.currentItem }) :
$(inst.options.items, inst.element), inst ]);
this.containers.push(inst);
}}
}}
for(i=queries.length - 1; i >=0; i--){
targetData=queries[ i ][ 1 ];
_queries=queries[ i ][ 0 ];
for(j=0, queriesLength=_queries.length; j < queriesLength; j++){
item=$(_queries[ j ]);
item.data(this.widgetName + "-item", targetData);
items.push({
item: item,
instance: targetData,
width: 0, height: 0,
left: 0, top: 0
});
}}
},
refreshPositions: function(fast){
this.floating=this.items.length ?
this.options.axis==="x"||this._isFloating(this.items[ 0 ].item) :
false;
if(this.offsetParent&&this.helper){
this.offset.parent=this._getParentOffset();
}
var i, item, t, p;
for(i=this.items.length - 1; i >=0; i--){
item=this.items[ i ];
if(item.instance!==this.currentContainer&&this.currentContainer &&
item.item[ 0 ]!==this.currentItem[ 0 ]){
continue;
}
t=this.options.toleranceElement ?
$(this.options.toleranceElement, item.item) :
item.item;
if(!fast){
item.width=t.outerWidth();
item.height=t.outerHeight();
}
p=t.offset();
item.left=p.left;
item.top=p.top;
}
if(this.options.custom&&this.options.custom.refreshContainers){
this.options.custom.refreshContainers.call(this);
}else{
for(i=this.containers.length - 1; i >=0; i--){
p=this.containers[ i ].element.offset();
this.containers[ i ].containerCache.left=p.left;
this.containers[ i ].containerCache.top=p.top;
this.containers[ i ].containerCache.width =
this.containers[ i ].element.outerWidth();
this.containers[ i ].containerCache.height =
this.containers[ i ].element.outerHeight();
}}
return this;
},
_createPlaceholder: function(that){
that=that||this;
var className,
o=that.options;
if(!o.placeholder||o.placeholder.constructor===String){
className=o.placeholder;
o.placeholder={
element: function(){
var nodeName=that.currentItem[ 0 ].nodeName.toLowerCase(),
element=$("<" + nodeName + ">", that.document[ 0 ]);
that._addClass(element, "ui-sortable-placeholder",
className||that.currentItem[ 0 ].className)
._removeClass(element, "ui-sortable-helper");
if(nodeName==="tbody"){
that._createTrPlaceholder(that.currentItem.find("tr").eq(0),
$("<tr>", that.document[ 0 ]).appendTo(element)
);
}else if(nodeName==="tr"){
that._createTrPlaceholder(that.currentItem, element);
}else if(nodeName==="img"){
element.attr("src", that.currentItem.attr("src"));
}
if(!className){
element.css("visibility", "hidden");
}
return element;
},
update: function(container, p){
if(className&&!o.forcePlaceholderSize){
return;
}
if(!p.height()){
p.height(that.currentItem.innerHeight() -
parseInt(that.currentItem.css("paddingTop")||0, 10) -
parseInt(that.currentItem.css("paddingBottom")||0, 10));
}
if(!p.width()){
p.width(that.currentItem.innerWidth() -
parseInt(that.currentItem.css("paddingLeft")||0, 10) -
parseInt(that.currentItem.css("paddingRight")||0, 10));
}}
};}
that.placeholder=$(o.placeholder.element.call(that.element, that.currentItem));
that.currentItem.after(that.placeholder);
o.placeholder.update(that, that.placeholder);
},
_createTrPlaceholder: function(sourceTr, targetTr){
var that=this;
sourceTr.children().each(function(){
$("<td>&#160;</td>", that.document[ 0 ])
.attr("colspan", $(this).attr("colspan")||1)
.appendTo(targetTr);
});
},
_contactContainers: function(event){
var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, cur, nearBottom,
floating, axis,
innermostContainer=null,
innermostIndex=null;
for(i=this.containers.length - 1; i >=0; i--){
if($.contains(this.currentItem[ 0 ], this.containers[ i ].element[ 0 ])){
continue;
}
if(this._intersectsWith(this.containers[ i ].containerCache)){
if(innermostContainer &&
$.contains(this.containers[ i ].element[ 0 ],
innermostContainer.element[ 0 ])){
continue;
}
innermostContainer=this.containers[ i ];
innermostIndex=i;
}else{
if(this.containers[ i ].containerCache.over){
this.containers[ i ]._trigger("out", event, this._uiHash(this));
this.containers[ i ].containerCache.over=0;
}}
}
if(!innermostContainer){
return;
}
if(this.containers.length===1){
if(!this.containers[ innermostIndex ].containerCache.over){
this.containers[ innermostIndex ]._trigger("over", event, this._uiHash(this));
this.containers[ innermostIndex ].containerCache.over=1;
}}else{
dist=10000;
itemWithLeastDistance=null;
floating=innermostContainer.floating||this._isFloating(this.currentItem);
posProperty=floating ? "left":"top";
sizeProperty=floating ? "width":"height";
axis=floating ? "pageX":"pageY";
for(j=this.items.length - 1; j >=0; j--){
if(!$.contains(this.containers[ innermostIndex ].element[ 0 ], this.items[ j ].item[ 0 ])
){
continue;
}
if(this.items[ j ].item[ 0 ]===this.currentItem[ 0 ]){
continue;
}
cur=this.items[ j ].item.offset()[ posProperty ];
nearBottom=false;
if(event[ axis ] - cur > this.items[ j ][ sizeProperty ] / 2){
nearBottom=true;
}
if(Math.abs(event[ axis ] - cur) < dist){
dist=Math.abs(event[ axis ] - cur);
itemWithLeastDistance=this.items[ j ];
this.direction=nearBottom ? "up":"down";
}}
if(!itemWithLeastDistance&&!this.options.dropOnEmpty){
return;
}
if(this.currentContainer===this.containers[ innermostIndex ]){
if(!this.currentContainer.containerCache.over){
this.containers[ innermostIndex ]._trigger("over", event, this._uiHash());
this.currentContainer.containerCache.over=1;
}
return;
}
itemWithLeastDistance ?
this._rearrange(event, itemWithLeastDistance, null, true) :
this._rearrange(event, null, this.containers[ innermostIndex ].element, true);
this._trigger("change", event, this._uiHash());
this.containers[ innermostIndex ]._trigger("change", event, this._uiHash(this));
this.currentContainer=this.containers[ innermostIndex ];
this.options.placeholder.update(this.currentContainer, this.placeholder);
this.containers[ innermostIndex ]._trigger("over", event, this._uiHash(this));
this.containers[ innermostIndex ].containerCache.over=1;
}},
_createHelper: function(event){
var o=this.options,
helper=$.isFunction(o.helper) ?
$(o.helper.apply(this.element[ 0 ], [ event, this.currentItem ])) :
(o.helper==="clone" ? this.currentItem.clone():this.currentItem);
if(!helper.parents("body").length){
$(o.appendTo!=="parent" ?
o.appendTo :
this.currentItem[ 0 ].parentNode)[ 0 ].appendChild(helper[ 0 ]);
}
if(helper[ 0 ]===this.currentItem[ 0 ]){
this._storedCSS={
width: this.currentItem[ 0 ].style.width,
height: this.currentItem[ 0 ].style.height,
position: this.currentItem.css("position"),
top: this.currentItem.css("top"),
left: this.currentItem.css("left")
};}
if(!helper[ 0 ].style.width||o.forceHelperSize){
helper.width(this.currentItem.width());
}
if(!helper[ 0 ].style.height||o.forceHelperSize){
helper.height(this.currentItem.height());
}
return helper;
},
_adjustOffsetFromHelper: function(obj){
if(typeof obj==="string"){
obj=obj.split(" ");
}
if($.isArray(obj)){
obj={ left: +obj[ 0 ], top: +obj[ 1 ]||0 };}
if("left" in obj){
this.offset.click.left=obj.left + this.margins.left;
}
if("right" in obj){
this.offset.click.left=this.helperProportions.width - obj.right + this.margins.left;
}
if("top" in obj){
this.offset.click.top=obj.top + this.margins.top;
}
if("bottom" in obj){
this.offset.click.top=this.helperProportions.height - obj.bottom + this.margins.top;
}},
_getParentOffset: function(){
this.offsetParent=this.helper.offsetParent();
var po=this.offsetParent.offset();
if(this.cssPosition==="absolute"&&this.scrollParent[ 0 ]!==this.document[ 0 ] &&
$.contains(this.scrollParent[ 0 ], this.offsetParent[ 0 ])){
po.left +=this.scrollParent.scrollLeft();
po.top +=this.scrollParent.scrollTop();
}
if(this.offsetParent[ 0 ]===this.document[ 0 ].body ||
(this.offsetParent[ 0 ].tagName &&
this.offsetParent[ 0 ].tagName.toLowerCase()==="html"&&$.ui.ie)){
po={ top: 0, left: 0 };}
return {
top: po.top +(parseInt(this.offsetParent.css("borderTopWidth"), 10)||0),
left: po.left +(parseInt(this.offsetParent.css("borderLeftWidth"), 10)||0)
};},
_getRelativeOffset: function(){
if(this.cssPosition==="relative"){
var p=this.currentItem.position();
return {
top: p.top -(parseInt(this.helper.css("top"), 10)||0) +
this.scrollParent.scrollTop(),
left: p.left -(parseInt(this.helper.css("left"), 10)||0) +
this.scrollParent.scrollLeft()
};}else{
return { top: 0, left: 0 };}},
_cacheMargins: function(){
this.margins={
left:(parseInt(this.currentItem.css("marginLeft"), 10)||0),
top:(parseInt(this.currentItem.css("marginTop"), 10)||0)
};},
_cacheHelperProportions: function(){
this.helperProportions={
width: this.helper.outerWidth(),
height: this.helper.outerHeight()
};},
_setContainment: function(){
var ce, co, over,
o=this.options;
if(o.containment==="parent"){
o.containment=this.helper[ 0 ].parentNode;
}
if(o.containment==="document"||o.containment==="window"){
this.containment=[
0 - this.offset.relative.left - this.offset.parent.left,
0 - this.offset.relative.top - this.offset.parent.top,
o.containment==="document" ?
this.document.width() :
this.window.width() - this.helperProportions.width - this.margins.left,
(o.containment==="document" ?
(this.document.height()||document.body.parentNode.scrollHeight) :
this.window.height()||this.document[ 0 ].body.parentNode.scrollHeight
) - this.helperProportions.height - this.margins.top
];
}
if(!(/^(document|window|parent)$/).test(o.containment)){
ce=$(o.containment)[ 0 ];
co=$(o.containment).offset();
over=($(ce).css("overflow")!=="hidden");
this.containment=[
co.left +(parseInt($(ce).css("borderLeftWidth"), 10)||0) +
(parseInt($(ce).css("paddingLeft"), 10)||0) - this.margins.left,
co.top +(parseInt($(ce).css("borderTopWidth"), 10)||0) +
(parseInt($(ce).css("paddingTop"), 10)||0) - this.margins.top,
co.left +(over ? Math.max(ce.scrollWidth, ce.offsetWidth):ce.offsetWidth) -
(parseInt($(ce).css("borderLeftWidth"), 10)||0) -
(parseInt($(ce).css("paddingRight"), 10)||0) -
this.helperProportions.width - this.margins.left,
co.top +(over ? Math.max(ce.scrollHeight, ce.offsetHeight):ce.offsetHeight) -
(parseInt($(ce).css("borderTopWidth"), 10)||0) -
(parseInt($(ce).css("paddingBottom"), 10)||0) -
this.helperProportions.height - this.margins.top
];
}},
_convertPositionTo: function(d, pos){
if(!pos){
pos=this.position;
}
var mod=d==="absolute" ? 1:-1,
scroll=this.cssPosition==="absolute" &&
!(this.scrollParent[ 0 ]!==this.document[ 0 ] &&
$.contains(this.scrollParent[ 0 ], this.offsetParent[ 0 ])) ?
this.offsetParent :
this.scrollParent,
scrollIsRootNode=(/(html|body)/i).test(scroll[ 0 ].tagName);
return {
top: (
pos.top	+
this.offset.relative.top * mod +
this.offset.parent.top * mod -
(( this.cssPosition==="fixed" ?
-this.scrollParent.scrollTop() :
(scrollIsRootNode ? 0:scroll.scrollTop())) * mod)
),
left: (
pos.left +
this.offset.relative.left * mod +
this.offset.parent.left * mod	-
(( this.cssPosition==="fixed" ?
-this.scrollParent.scrollLeft():scrollIsRootNode ? 0 :
scroll.scrollLeft()) * mod)
)
};},
_generatePosition: function(event){
var top, left,
o=this.options,
pageX=event.pageX,
pageY=event.pageY,
scroll=this.cssPosition==="absolute" &&
!(this.scrollParent[ 0 ]!==this.document[ 0 ] &&
$.contains(this.scrollParent[ 0 ], this.offsetParent[ 0 ])) ?
this.offsetParent :
this.scrollParent,
scrollIsRootNode=(/(html|body)/i).test(scroll[ 0 ].tagName);
if(this.cssPosition==="relative"&&!(this.scrollParent[ 0 ]!==this.document[ 0 ] &&
this.scrollParent[ 0 ]!==this.offsetParent[ 0 ])){
this.offset.relative=this._getRelativeOffset();
}
if(this.originalPosition){
if(this.containment){
if(event.pageX - this.offset.click.left < this.containment[ 0 ]){
pageX=this.containment[ 0 ] + this.offset.click.left;
}
if(event.pageY - this.offset.click.top < this.containment[ 1 ]){
pageY=this.containment[ 1 ] + this.offset.click.top;
}
if(event.pageX - this.offset.click.left > this.containment[ 2 ]){
pageX=this.containment[ 2 ] + this.offset.click.left;
}
if(event.pageY - this.offset.click.top > this.containment[ 3 ]){
pageY=this.containment[ 3 ] + this.offset.click.top;
}}
if(o.grid){
top=this.originalPageY + Math.round(( pageY - this.originalPageY) /
o.grid[ 1 ]) * o.grid[ 1 ];
pageY=this.containment ?
(( top - this.offset.click.top >=this.containment[ 1 ] &&
top - this.offset.click.top <=this.containment[ 3 ]) ?
top :
(( top - this.offset.click.top >=this.containment[ 1 ]) ?
top - o.grid[ 1 ]:top + o.grid[ 1 ])) :
top;
left=this.originalPageX + Math.round(( pageX - this.originalPageX) /
o.grid[ 0 ]) * o.grid[ 0 ];
pageX=this.containment ?
(( left - this.offset.click.left >=this.containment[ 0 ] &&
left - this.offset.click.left <=this.containment[ 2 ]) ?
left :
(( left - this.offset.click.left >=this.containment[ 0 ]) ?
left - o.grid[ 0 ]:left + o.grid[ 0 ])) :
left;
}}
return {
top: (
pageY -
this.offset.click.top -
this.offset.relative.top -
this.offset.parent.top +
(( this.cssPosition==="fixed" ?
-this.scrollParent.scrollTop() :
(scrollIsRootNode ? 0:scroll.scrollTop())))
),
left: (
pageX -
this.offset.click.left -
this.offset.relative.left -
this.offset.parent.left +
(( this.cssPosition==="fixed" ?
-this.scrollParent.scrollLeft() :
scrollIsRootNode ? 0:scroll.scrollLeft()))
)
};},
_rearrange: function(event, i, a, hardRefresh){
a ? a[ 0 ].appendChild(this.placeholder[ 0 ]) :
i.item[ 0 ].parentNode.insertBefore(this.placeholder[ 0 ],
(this.direction==="down" ? i.item[ 0 ]:i.item[ 0 ].nextSibling));
this.counter=this.counter ? ++this.counter:1;
var counter=this.counter;
this._delay(function(){
if(counter===this.counter){
this.refreshPositions(!hardRefresh);
}});
},
_clear: function(event, noPropagation){
this.reverting=false;
var i,
delayedTriggers=[];
if(!this._noFinalSort&&this.currentItem.parent().length){
this.placeholder.before(this.currentItem);
}
this._noFinalSort=null;
if(this.helper[ 0 ]===this.currentItem[ 0 ]){
for(i in this._storedCSS){
if(this._storedCSS[ i ]==="auto"||this._storedCSS[ i ]==="static"){
this._storedCSS[ i ]="";
}}
this.currentItem.css(this._storedCSS);
this._removeClass(this.currentItem, "ui-sortable-helper");
}else{
this.currentItem.show();
}
if(this.fromOutside&&!noPropagation){
delayedTriggers.push(function(event){
this._trigger("receive", event, this._uiHash(this.fromOutside));
});
}
if(( this.fromOutside ||
this.domPosition.prev!==this.currentItem.prev().not(".ui-sortable-helper")[ 0 ] ||
this.domPosition.parent!==this.currentItem.parent()[ 0 ])&&!noPropagation){
delayedTriggers.push(function(event){
this._trigger("update", event, this._uiHash());
});
}
if(this!==this.currentContainer){
if(!noPropagation){
delayedTriggers.push(function(event){
this._trigger("remove", event, this._uiHash());
});
delayedTriggers.push(( function(c){
return function(event){
c._trigger("receive", event, this._uiHash(this));
};}).call(this, this.currentContainer));
delayedTriggers.push(( function(c){
return function(event){
c._trigger("update", event, this._uiHash(this));
};}).call(this, this.currentContainer));
}}
function delayEvent(type, instance, container){
return function(event){
container._trigger(type, event, instance._uiHash(instance));
};}
for(i=this.containers.length - 1; i >=0; i--){
if(!noPropagation){
delayedTriggers.push(delayEvent("deactivate", this, this.containers[ i ]));
}
if(this.containers[ i ].containerCache.over){
delayedTriggers.push(delayEvent("out", this, this.containers[ i ]));
this.containers[ i ].containerCache.over=0;
}}
if(this.storedCursor){
this.document.find("body").css("cursor", this.storedCursor);
this.storedStylesheet.remove();
}
if(this._storedOpacity){
this.helper.css("opacity", this._storedOpacity);
}
if(this._storedZIndex){
this.helper.css("zIndex", this._storedZIndex==="auto" ? "":this._storedZIndex);
}
this.dragging=false;
if(!noPropagation){
this._trigger("beforeStop", event, this._uiHash());
}
this.placeholder[ 0 ].parentNode.removeChild(this.placeholder[ 0 ]);
if(!this.cancelHelperRemoval){
if(this.helper[ 0 ]!==this.currentItem[ 0 ]){
this.helper.remove();
}
this.helper=null;
}
if(!noPropagation){
for(i=0; i < delayedTriggers.length; i++){
delayedTriggers[ i ].call(this, event);
}
this._trigger("stop", event, this._uiHash());
}
this.fromOutside=false;
return !this.cancelHelperRemoval;
},
_trigger: function(){
if($.Widget.prototype._trigger.apply(this, arguments)===false){
this.cancel();
}},
_uiHash: function(_inst){
var inst=_inst||this;
return {
helper: inst.helper,
placeholder: inst.placeholder||$([]),
position: inst.position,
originalPosition: inst.originalPosition,
offset: inst.positionAbs,
item: inst.currentItem,
sender: _inst ? _inst.element:null
};}});
function spinnerModifer(fn){
return function(){
var previous=this.element.val();
fn.apply(this, arguments);
this._refresh();
if(previous!==this.element.val()){
this._trigger("change");
}};}
$.widget("ui.spinner", {
version: "1.12.1",
defaultElement: "<input>",
widgetEventPrefix: "spin",
options: {
classes: {
"ui-spinner": "ui-corner-all",
"ui-spinner-down": "ui-corner-br",
"ui-spinner-up": "ui-corner-tr"
},
culture: null,
icons: {
down: "ui-icon-triangle-1-s",
up: "ui-icon-triangle-1-n"
},
incremental: true,
max: null,
min: null,
numberFormat: null,
page: 10,
step: 1,
change: null,
spin: null,
start: null,
stop: null
},
_create: function(){
this._setOption("max", this.options.max);
this._setOption("min", this.options.min);
this._setOption("step", this.options.step);
if(this.value()!==""){
this._value(this.element.val(), true);
}
this._draw();
this._on(this._events);
this._refresh();
this._on(this.window, {
beforeunload: function(){
this.element.removeAttr("autocomplete");
}});
},
_getCreateOptions: function(){
var options=this._super();
var element=this.element;
$.each([ "min", "max", "step" ], function(i, option){
var value=element.attr(option);
if(value!=null&&value.length){
options[ option ]=value;
}});
return options;
},
_events: {
keydown: function(event){
if(this._start(event)&&this._keydown(event)){
event.preventDefault();
}},
keyup: "_stop",
focus: function(){
this.previous=this.element.val();
},
blur: function(event){
if(this.cancelBlur){
delete this.cancelBlur;
return;
}
this._stop();
this._refresh();
if(this.previous!==this.element.val()){
this._trigger("change", event);
}},
mousewheel: function(event, delta){
if(!delta){
return;
}
if(!this.spinning&&!this._start(event)){
return false;
}
this._spin(( delta > 0 ? 1:-1) * this.options.step, event);
clearTimeout(this.mousewheelTimer);
this.mousewheelTimer=this._delay(function(){
if(this.spinning){
this._stop(event);
}}, 100);
event.preventDefault();
},
"mousedown .ui-spinner-button": function(event){
var previous;
previous=this.element[ 0 ]===$.ui.safeActiveElement(this.document[ 0 ]) ?
this.previous:this.element.val();
function checkFocus(){
var isActive=this.element[ 0 ]===$.ui.safeActiveElement(this.document[ 0 ]);
if(!isActive){
this.element.trigger("focus");
this.previous=previous;
this._delay(function(){
this.previous=previous;
});
}}
event.preventDefault();
checkFocus.call(this);
this.cancelBlur=true;
this._delay(function(){
delete this.cancelBlur;
checkFocus.call(this);
});
if(this._start(event)===false){
return;
}
this._repeat(null, $(event.currentTarget)
.hasClass("ui-spinner-up") ? 1:-1, event);
},
"mouseup .ui-spinner-button": "_stop",
"mouseenter .ui-spinner-button": function(event){
if(!$(event.currentTarget).hasClass("ui-state-active")){
return;
}
if(this._start(event)===false){
return false;
}
this._repeat(null, $(event.currentTarget)
.hasClass("ui-spinner-up") ? 1:-1, event);
},
"mouseleave .ui-spinner-button": "_stop"
},
_enhance: function(){
this.uiSpinner=this.element
.attr("autocomplete", "off")
.wrap("<span>")
.parent()
.append("<a></a><a></a>"
);
},
_draw: function(){
this._enhance();
this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content");
this._addClass("ui-spinner-input");
this.element.attr("role", "spinbutton");
this.buttons=this.uiSpinner.children("a")
.attr("tabIndex", -1)
.attr("aria-hidden", true)
.button({
classes: {
"ui-button": ""
}});
this._removeClass(this.buttons, "ui-corner-all");
this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up");
this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down");
this.buttons.first().button({
"icon": this.options.icons.up,
"showLabel": false
});
this.buttons.last().button({
"icon": this.options.icons.down,
"showLabel": false
});
if(this.buttons.height() > Math.ceil(this.uiSpinner.height() * 0.5) &&
this.uiSpinner.height() > 0){
this.uiSpinner.height(this.uiSpinner.height());
}},
_keydown: function(event){
var options=this.options,
keyCode=$.ui.keyCode;
switch(event.keyCode){
case keyCode.UP:
this._repeat(null, 1, event);
return true;
case keyCode.DOWN:
this._repeat(null, -1, event);
return true;
case keyCode.PAGE_UP:
this._repeat(null, options.page, event);
return true;
case keyCode.PAGE_DOWN:
this._repeat(null, -options.page, event);
return true;
}
return false;
},
_start: function(event){
if(!this.spinning&&this._trigger("start", event)===false){
return false;
}
if(!this.counter){
this.counter=1;
}
this.spinning=true;
return true;
},
_repeat: function(i, steps, event){
i=i||500;
clearTimeout(this.timer);
this.timer=this._delay(function(){
this._repeat(40, steps, event);
}, i);
this._spin(steps * this.options.step, event);
},
_spin: function(step, event){
var value=this.value()||0;
if(!this.counter){
this.counter=1;
}
value=this._adjustValue(value + step * this._increment(this.counter));
if(!this.spinning||this._trigger("spin", event, { value: value })!==false){
this._value(value);
this.counter++;
}},
_increment: function(i){
var incremental=this.options.incremental;
if(incremental){
return $.isFunction(incremental) ?
incremental(i) :
Math.floor(i * i * i / 50000 - i * i / 500 + 17 * i / 200 + 1);
}
return 1;
},
_precision: function(){
var precision=this._precisionOf(this.options.step);
if(this.options.min!==null){
precision=Math.max(precision, this._precisionOf(this.options.min));
}
return precision;
},
_precisionOf: function(num){
var str=num.toString(),
decimal=str.indexOf(".");
return decimal===-1 ? 0:str.length - decimal - 1;
},
_adjustValue: function(value){
var base, aboveMin,
options=this.options;
base=options.min!==null ? options.min:0;
aboveMin=value - base;
aboveMin=Math.round(aboveMin / options.step) * options.step;
value=base + aboveMin;
value=parseFloat(value.toFixed(this._precision()));
if(options.max!==null&&value > options.max){
return options.max;
}
if(options.min!==null&&value < options.min){
return options.min;
}
return value;
},
_stop: function(event){
if(!this.spinning){
return;
}
clearTimeout(this.timer);
clearTimeout(this.mousewheelTimer);
this.counter=0;
this.spinning=false;
this._trigger("stop", event);
},
_setOption: function(key, value){
var prevValue, first, last;
if(key==="culture"||key==="numberFormat"){
prevValue=this._parse(this.element.val());
this.options[ key ]=value;
this.element.val(this._format(prevValue));
return;
}
if(key==="max"||key==="min"||key==="step"){
if(typeof value==="string"){
value=this._parse(value);
}}
if(key==="icons"){
first=this.buttons.first().find(".ui-icon");
this._removeClass(first, null, this.options.icons.up);
this._addClass(first, null, value.up);
last=this.buttons.last().find(".ui-icon");
this._removeClass(last, null, this.options.icons.down);
this._addClass(last, null, value.down);
}
this._super(key, value);
},
_setOptionDisabled: function(value){
this._super(value);
this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!value);
this.element.prop("disabled", !!value);
this.buttons.button(value ? "disable":"enable");
},
_setOptions: spinnerModifer(function(options){
this._super(options);
}),
_parse: function(val){
if(typeof val==="string"&&val!==""){
val=window.Globalize&&this.options.numberFormat ?
Globalize.parseFloat(val, 10, this.options.culture):+val;
}
return val===""||isNaN(val) ? null:val;
},
_format: function(value){
if(value===""){
return "";
}
return window.Globalize&&this.options.numberFormat ?
Globalize.format(value, this.options.numberFormat, this.options.culture) :
value;
},
_refresh: function(){
this.element.attr({
"aria-valuemin": this.options.min,
"aria-valuemax": this.options.max,
"aria-valuenow": this._parse(this.element.val())
});
},
isValid: function(){
var value=this.value();
if(value===null){
return false;
}
return value===this._adjustValue(value);
},
_value: function(value, allowAny){
var parsed;
if(value!==""){
parsed=this._parse(value);
if(parsed!==null){
if(!allowAny){
parsed=this._adjustValue(parsed);
}
value=this._format(parsed);
}}
this.element.val(value);
this._refresh();
},
_destroy: function(){
this.element
.prop("disabled", false)
.removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow");
this.uiSpinner.replaceWith(this.element);
},
stepUp: spinnerModifer(function(steps){
this._stepUp(steps);
}),
_stepUp: function(steps){
if(this._start()){
this._spin(( steps||1) * this.options.step);
this._stop();
}},
stepDown: spinnerModifer(function(steps){
this._stepDown(steps);
}),
_stepDown: function(steps){
if(this._start()){
this._spin(( steps||1) * -this.options.step);
this._stop();
}},
pageUp: spinnerModifer(function(pages){
this._stepUp(( pages||1) * this.options.page);
}),
pageDown: spinnerModifer(function(pages){
this._stepDown(( pages||1) * this.options.page);
}),
value: function(newVal){
if(!arguments.length){
return this._parse(this.element.val());
}
spinnerModifer(this._value).call(this, newVal);
},
widget: function(){
return this.uiSpinner;
}});
if($.uiBackCompat!==false){
$.widget("ui.spinner", $.ui.spinner, {
_enhance: function(){
this.uiSpinner=this.element
.attr("autocomplete", "off")
.wrap(this._uiSpinnerHtml())
.parent()
.append(this._buttonHtml());
},
_uiSpinnerHtml: function(){
return "<span>";
},
_buttonHtml: function(){
return "<a></a><a></a>";
}});
}
var widgetsSpinner=$.ui.spinner;
$.widget("ui.tabs", {
version: "1.12.1",
delay: 300,
options: {
active: null,
classes: {
"ui-tabs": "ui-corner-all",
"ui-tabs-nav": "ui-corner-all",
"ui-tabs-panel": "ui-corner-bottom",
"ui-tabs-tab": "ui-corner-top"
},
collapsible: false,
event: "click",
heightStyle: "content",
hide: null,
show: null,
activate: null,
beforeActivate: null,
beforeLoad: null,
load: null
},
_isLocal:(function(){
var rhash=/#.*$/;
return function(anchor){
var anchorUrl, locationUrl;
anchorUrl=anchor.href.replace(rhash, "");
locationUrl=location.href.replace(rhash, "");
try {
anchorUrl=decodeURIComponent(anchorUrl);
} catch(error){}
try {
locationUrl=decodeURIComponent(locationUrl);
} catch(error){}
return anchor.hash.length > 1&&anchorUrl===locationUrl;
};})(),
_create: function(){
var that=this,
options=this.options;
this.running=false;
this._addClass("ui-tabs", "ui-widget ui-widget-content");
this._toggleClass("ui-tabs-collapsible", null, options.collapsible);
this._processTabs();
options.active=this._initialActive();
if($.isArray(options.disabled)){
options.disabled=$.unique(options.disabled.concat($.map(this.tabs.filter(".ui-state-disabled"), function(li){
return that.tabs.index(li);
})
)).sort();
}
if(this.options.active!==false&&this.anchors.length){
this.active=this._findActive(options.active);
}else{
this.active=$();
}
this._refresh();
if(this.active.length){
this.load(options.active);
}},
_initialActive: function(){
var active=this.options.active,
collapsible=this.options.collapsible,
locationHash=location.hash.substring(1);
if(active===null){
if(locationHash){
this.tabs.each(function(i, tab){
if($(tab).attr("aria-controls")===locationHash){
active=i;
return false;
}});
}
if(active===null){
active=this.tabs.index(this.tabs.filter(".ui-tabs-active"));
}
if(active===null||active===-1){
active=this.tabs.length ? 0:false;
}}
if(active!==false){
active=this.tabs.index(this.tabs.eq(active));
if(active===-1){
active=collapsible ? false:0;
}}
if(!collapsible&&active===false&&this.anchors.length){
active=0;
}
return active;
},
_getCreateEventData: function(){
return {
tab: this.active,
panel: !this.active.length ? $():this._getPanelForTab(this.active)
};},
_tabKeydown: function(event){
var focusedTab=$($.ui.safeActiveElement(this.document[ 0 ])).closest("li"),
selectedIndex=this.tabs.index(focusedTab),
goingForward=true;
if(this._handlePageNav(event)){
return;
}
switch(event.keyCode){
case $.ui.keyCode.RIGHT:
case $.ui.keyCode.DOWN:
selectedIndex++;
break;
case $.ui.keyCode.UP:
case $.ui.keyCode.LEFT:
goingForward=false;
selectedIndex--;
break;
case $.ui.keyCode.END:
selectedIndex=this.anchors.length - 1;
break;
case $.ui.keyCode.HOME:
selectedIndex=0;
break;
case $.ui.keyCode.SPACE:
event.preventDefault();
clearTimeout(this.activating);
this._activate(selectedIndex);
return;
case $.ui.keyCode.ENTER:
event.preventDefault();
clearTimeout(this.activating);
this._activate(selectedIndex===this.options.active ? false:selectedIndex);
return;
default:
return;
}
event.preventDefault();
clearTimeout(this.activating);
selectedIndex=this._focusNextTab(selectedIndex, goingForward);
if(!event.ctrlKey&&!event.metaKey){
focusedTab.attr("aria-selected", "false");
this.tabs.eq(selectedIndex).attr("aria-selected", "true");
this.activating=this._delay(function(){
this.option("active", selectedIndex);
}, this.delay);
}},
_panelKeydown: function(event){
if(this._handlePageNav(event)){
return;
}
if(event.ctrlKey&&event.keyCode===$.ui.keyCode.UP){
event.preventDefault();
this.active.trigger("focus");
}},
_handlePageNav: function(event){
if(event.altKey&&event.keyCode===$.ui.keyCode.PAGE_UP){
this._activate(this._focusNextTab(this.options.active - 1, false));
return true;
}
if(event.altKey&&event.keyCode===$.ui.keyCode.PAGE_DOWN){
this._activate(this._focusNextTab(this.options.active + 1, true));
return true;
}},
_findNextTab: function(index, goingForward){
var lastTabIndex=this.tabs.length - 1;
function constrain(){
if(index > lastTabIndex){
index=0;
}
if(index < 0){
index=lastTabIndex;
}
return index;
}
while($.inArray(constrain(), this.options.disabled)!==-1){
index=goingForward ? index + 1:index - 1;
}
return index;
},
_focusNextTab: function(index, goingForward){
index=this._findNextTab(index, goingForward);
this.tabs.eq(index).trigger("focus");
return index;
},
_setOption: function(key, value){
if(key==="active"){
this._activate(value);
return;
}
this._super(key, value);
if(key==="collapsible"){
this._toggleClass("ui-tabs-collapsible", null, value);
if(!value&&this.options.active===false){
this._activate(0);
}}
if(key==="event"){
this._setupEvents(value);
}
if(key==="heightStyle"){
this._setupHeightStyle(value);
}},
_sanitizeSelector: function(hash){
return hash ? hash.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&"):"";
},
refresh: function(){
var options=this.options,
lis=this.tablist.children(":has(a[href])");
options.disabled=$.map(lis.filter(".ui-state-disabled"), function(tab){
return lis.index(tab);
});
this._processTabs();
if(options.active===false||!this.anchors.length){
options.active=false;
this.active=$();
}else if(this.active.length&&!$.contains(this.tablist[ 0 ], this.active[ 0 ])){
if(this.tabs.length===options.disabled.length){
options.active=false;
this.active=$();
}else{
this._activate(this._findNextTab(Math.max(0, options.active - 1), false));
}}else{
options.active=this.tabs.index(this.active);
}
this._refresh();
},
_refresh: function(){
this._setOptionDisabled(this.options.disabled);
this._setupEvents(this.options.event);
this._setupHeightStyle(this.options.heightStyle);
this.tabs.not(this.active).attr({
"aria-selected": "false",
"aria-expanded": "false",
tabIndex: -1
});
this.panels.not(this._getPanelForTab(this.active))
.hide()
.attr({
"aria-hidden": "true"
});
if(!this.active.length){
this.tabs.eq(0).attr("tabIndex", 0);
}else{
this.active
.attr({
"aria-selected": "true",
"aria-expanded": "true",
tabIndex: 0
});
this._addClass(this.active, "ui-tabs-active", "ui-state-active");
this._getPanelForTab(this.active)
.show()
.attr({
"aria-hidden": "false"
});
}},
_processTabs: function(){
var that=this,
prevTabs=this.tabs,
prevAnchors=this.anchors,
prevPanels=this.panels;
this.tablist=this._getList().attr("role", "tablist");
this._addClass(this.tablist, "ui-tabs-nav",
"ui-helper-reset ui-helper-clearfix ui-widget-header");
this.tablist
.on("mousedown" + this.eventNamespace, "> li", function(event){
if($(this).is(".ui-state-disabled")){
event.preventDefault();
}})
.on("focus" + this.eventNamespace, ".ui-tabs-anchor", function(){
if($(this).closest("li").is(".ui-state-disabled")){
this.blur();
}});
this.tabs=this.tablist.find("> li:has(a[href])")
.attr({
role: "tab",
tabIndex: -1
});
this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default");
this.anchors=this.tabs.map(function(){
return $("a", this)[ 0 ];
})
.attr({
role: "presentation",
tabIndex: -1
});
this._addClass(this.anchors, "ui-tabs-anchor");
this.panels=$();
this.anchors.each(function(i, anchor){
var selector, panel, panelId,
anchorId=$(anchor).uniqueId().attr("id"),
tab=$(anchor).closest("li"),
originalAriaControls=tab.attr("aria-controls");
if(that._isLocal(anchor)){
selector=anchor.hash;
panelId=selector.substring(1);
panel=that.element.find(that._sanitizeSelector(selector));
}else{
panelId=tab.attr("aria-controls")||$({}).uniqueId()[ 0 ].id;
selector="#" + panelId;
panel=that.element.find(selector);
if(!panel.length){
panel=that._createPanel(panelId);
panel.insertAfter(that.panels[ i - 1 ]||that.tablist);
}
panel.attr("aria-live", "polite");
}
if(panel.length){
that.panels=that.panels.add(panel);
}
if(originalAriaControls){
tab.data("ui-tabs-aria-controls", originalAriaControls);
}
tab.attr({
"aria-controls": panelId,
"aria-labelledby": anchorId
});
panel.attr("aria-labelledby", anchorId);
});
this.panels.attr("role", "tabpanel");
this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content");
if(prevTabs){
this._off(prevTabs.not(this.tabs));
this._off(prevAnchors.not(this.anchors));
this._off(prevPanels.not(this.panels));
}},
_getList: function(){
return this.tablist||this.element.find("ol, ul").eq(0);
},
_createPanel: function(id){
return $("<div>")
.attr("id", id)
.data("ui-tabs-destroy", true);
},
_setOptionDisabled: function(disabled){
var currentItem, li, i;
if($.isArray(disabled)){
if(!disabled.length){
disabled=false;
}else if(disabled.length===this.anchors.length){
disabled=true;
}}
for(i=0;(li=this.tabs[ i ]); i++){
currentItem=$(li);
if(disabled===true||$.inArray(i, disabled)!==-1){
currentItem.attr("aria-disabled", "true");
this._addClass(currentItem, null, "ui-state-disabled");
}else{
currentItem.removeAttr("aria-disabled");
this._removeClass(currentItem, null, "ui-state-disabled");
}}
this.options.disabled=disabled;
this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null,
disabled===true);
},
_setupEvents: function(event){
var events={};
if(event){
$.each(event.split(" "), function(index, eventName){
events[ eventName ]="_eventHandler";
});
}
this._off(this.anchors.add(this.tabs).add(this.panels));
this._on(true, this.anchors, {
click: function(event){
event.preventDefault();
}});
this._on(this.anchors, events);
this._on(this.tabs, { keydown: "_tabKeydown" });
this._on(this.panels, { keydown: "_panelKeydown" });
this._focusable(this.tabs);
this._hoverable(this.tabs);
},
_setupHeightStyle: function(heightStyle){
var maxHeight,
parent=this.element.parent();
if(heightStyle==="fill"){
maxHeight=parent.height();
maxHeight -=this.element.outerHeight() - this.element.height();
this.element.siblings(":visible").each(function(){
var elem=$(this),
position=elem.css("position");
if(position==="absolute"||position==="fixed"){
return;
}
maxHeight -=elem.outerHeight(true);
});
this.element.children().not(this.panels).each(function(){
maxHeight -=$(this).outerHeight(true);
});
this.panels.each(function(){
$(this).height(Math.max(0, maxHeight -
$(this).innerHeight() + $(this).height()));
})
.css("overflow", "auto");
}else if(heightStyle==="auto"){
maxHeight=0;
this.panels.each(function(){
maxHeight=Math.max(maxHeight, $(this).height("").height());
}).height(maxHeight);
}},
_eventHandler: function(event){
var options=this.options,
active=this.active,
anchor=$(event.currentTarget),
tab=anchor.closest("li"),
clickedIsActive=tab[ 0 ]===active[ 0 ],
collapsing=clickedIsActive&&options.collapsible,
toShow=collapsing ? $():this._getPanelForTab(tab),
toHide = !active.length ? $():this._getPanelForTab(active),
eventData={
oldTab: active,
oldPanel: toHide,
newTab: collapsing ? $():tab,
newPanel: toShow
};
event.preventDefault();
if(tab.hasClass("ui-state-disabled") ||
tab.hasClass("ui-tabs-loading") ||
this.running ||
(clickedIsActive&&!options.collapsible) ||
(this._trigger("beforeActivate", event, eventData)===false)){
return;
}
options.active=collapsing ? false:this.tabs.index(tab);
this.active=clickedIsActive ? $():tab;
if(this.xhr){
this.xhr.abort();
}
if(!toHide.length&&!toShow.length){
$.error("jQuery UI Tabs: Mismatching fragment identifier.");
}
if(toShow.length){
this.load(this.tabs.index(tab), event);
}
this._toggle(event, eventData);
},
_toggle: function(event, eventData){
var that=this,
toShow=eventData.newPanel,
toHide=eventData.oldPanel;
this.running=true;
function complete(){
that.running=false;
that._trigger("activate", event, eventData);
}
function show(){
that._addClass(eventData.newTab.closest("li"), "ui-tabs-active", "ui-state-active");
if(toShow.length&&that.options.show){
that._show(toShow, that.options.show, complete);
}else{
toShow.show();
complete();
}}
if(toHide.length&&this.options.hide){
this._hide(toHide, this.options.hide, function(){
that._removeClass(eventData.oldTab.closest("li"),
"ui-tabs-active", "ui-state-active");
show();
});
}else{
this._removeClass(eventData.oldTab.closest("li"),
"ui-tabs-active", "ui-state-active");
toHide.hide();
show();
}
toHide.attr("aria-hidden", "true");
eventData.oldTab.attr({
"aria-selected": "false",
"aria-expanded": "false"
});
if(toShow.length&&toHide.length){
eventData.oldTab.attr("tabIndex", -1);
}else if(toShow.length){
this.tabs.filter(function(){
return $(this).attr("tabIndex")===0;
})
.attr("tabIndex", -1);
}
toShow.attr("aria-hidden", "false");
eventData.newTab.attr({
"aria-selected": "true",
"aria-expanded": "true",
tabIndex: 0
});
},
_activate: function(index){
var anchor,
active=this._findActive(index);
if(active[ 0 ]===this.active[ 0 ]){
return;
}
if(!active.length){
active=this.active;
}
anchor=active.find(".ui-tabs-anchor")[ 0 ];
this._eventHandler({
target: anchor,
currentTarget: anchor,
preventDefault: $.noop
});
},
_findActive: function(index){
return index===false ? $():this.tabs.eq(index);
},
_getIndex: function(index){
if(typeof index==="string"){
index=this.anchors.index(this.anchors.filter("[href$='" +
$.ui.escapeSelector(index) + "']"));
}
return index;
},
_destroy: function(){
if(this.xhr){
this.xhr.abort();
}
this.tablist
.removeAttr("role")
.off(this.eventNamespace);
this.anchors
.removeAttr("role tabIndex")
.removeUniqueId();
this.tabs.add(this.panels).each(function(){
if($.data(this, "ui-tabs-destroy")){
$(this).remove();
}else{
$(this).removeAttr("role tabIndex " +
"aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded");
}});
this.tabs.each(function(){
var li=$(this),
prev=li.data("ui-tabs-aria-controls");
if(prev){
li
.attr("aria-controls", prev)
.removeData("ui-tabs-aria-controls");
}else{
li.removeAttr("aria-controls");
}});
this.panels.show();
if(this.options.heightStyle!=="content"){
this.panels.css("height", "");
}},
enable: function(index){
var disabled=this.options.disabled;
if(disabled===false){
return;
}
if(index===undefined){
disabled=false;
}else{
index=this._getIndex(index);
if($.isArray(disabled)){
disabled=$.map(disabled, function(num){
return num!==index ? num:null;
});
}else{
disabled=$.map(this.tabs, function(li, num){
return num!==index ? num:null;
});
}}
this._setOptionDisabled(disabled);
},
disable: function(index){
var disabled=this.options.disabled;
if(disabled===true){
return;
}
if(index===undefined){
disabled=true;
}else{
index=this._getIndex(index);
if($.inArray(index, disabled)!==-1){
return;
}
if($.isArray(disabled)){
disabled=$.merge([ index ], disabled).sort();
}else{
disabled=[ index ];
}}
this._setOptionDisabled(disabled);
},
load: function(index, event){
index=this._getIndex(index);
var that=this,
tab=this.tabs.eq(index),
anchor=tab.find(".ui-tabs-anchor"),
panel=this._getPanelForTab(tab),
eventData={
tab: tab,
panel: panel
},
complete=function(jqXHR, status){
if(status==="abort"){
that.panels.stop(false, true);
}
that._removeClass(tab, "ui-tabs-loading");
panel.removeAttr("aria-busy");
if(jqXHR===that.xhr){
delete that.xhr;
}};
if(this._isLocal(anchor[ 0 ])){
return;
}
this.xhr=$.ajax(this._ajaxSettings(anchor, event, eventData));
if(this.xhr&&this.xhr.statusText!=="canceled"){
this._addClass(tab, "ui-tabs-loading");
panel.attr("aria-busy", "true");
this.xhr
.done(function(response, status, jqXHR){
setTimeout(function(){
panel.html(response);
that._trigger("load", event, eventData);
complete(jqXHR, status);
}, 1);
})
.fail(function(jqXHR, status){
setTimeout(function(){
complete(jqXHR, status);
}, 1);
});
}},
_ajaxSettings: function(anchor, event, eventData){
var that=this;
return {
url: anchor.attr("href").replace(/#.*$/, ""),
beforeSend: function(jqXHR, settings){
return that._trigger("beforeLoad", event,
$.extend({ jqXHR: jqXHR, ajaxSettings: settings }, eventData));
}};},
_getPanelForTab: function(tab){
var id=$(tab).attr("aria-controls");
return this.element.find(this._sanitizeSelector("#" + id));
}});
if($.uiBackCompat!==false){
$.widget("ui.tabs", $.ui.tabs, {
_processTabs: function(){
this._superApply(arguments);
this._addClass(this.tabs, "ui-tab");
}});
}
var widgetsTabs=$.ui.tabs;
$.widget("ui.tooltip", {
version: "1.12.1",
options: {
classes: {
"ui-tooltip": "ui-corner-all ui-widget-shadow"
},
content: function(){
var title=$(this).attr("title")||"";
return $("<a>").text(title).html();
},
hide: true,
items: "[title]:not([disabled])",
position: {
my: "left top+15",
at: "left bottom",
collision: "flipfit flip"
},
show: true,
track: false,
close: null,
open: null
},
_addDescribedBy: function(elem, id){
var describedby=(elem.attr("aria-describedby")||"").split(/\s+/);
describedby.push(id);
elem
.data("ui-tooltip-id", id)
.attr("aria-describedby", $.trim(describedby.join(" ")));
},
_removeDescribedBy: function(elem){
var id=elem.data("ui-tooltip-id"),
describedby=(elem.attr("aria-describedby")||"").split(/\s+/),
index=$.inArray(id, describedby);
if(index!==-1){
describedby.splice(index, 1);
}
elem.removeData("ui-tooltip-id");
describedby=$.trim(describedby.join(" "));
if(describedby){
elem.attr("aria-describedby", describedby);
}else{
elem.removeAttr("aria-describedby");
}},
_create: function(){
this._on({
mouseover: "open",
focusin: "open"
});
this.tooltips={};
this.parents={};
this.liveRegion=$("<div>")
.attr({
role: "log",
"aria-live": "assertive",
"aria-relevant": "additions"
})
.appendTo(this.document[ 0 ].body);
this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible");
this.disabledTitles=$([]);
},
_setOption: function(key, value){
var that=this;
this._super(key, value);
if(key==="content"){
$.each(this.tooltips, function(id, tooltipData){
that._updateContent(tooltipData.element);
});
}},
_setOptionDisabled: function(value){
this[ value ? "_disable":"_enable" ]();
},
_disable: function(){
var that=this;
$.each(this.tooltips, function(id, tooltipData){
var event=$.Event("blur");
event.target=event.currentTarget=tooltipData.element[ 0 ];
that.close(event, true);
});
this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack()
.filter(function(){
var element=$(this);
if(element.is("[title]")){
return element
.data("ui-tooltip-title", element.attr("title"))
.removeAttr("title");
}})
);
},
_enable: function(){
this.disabledTitles.each(function(){
var element=$(this);
if(element.data("ui-tooltip-title")){
element.attr("title", element.data("ui-tooltip-title"));
}});
this.disabledTitles=$([]);
},
open: function(event){
var that=this,
target=$(event ? event.target:this.element)
.closest(this.options.items);
if(!target.length||target.data("ui-tooltip-id")){
return;
}
if(target.attr("title")){
target.data("ui-tooltip-title", target.attr("title"));
}
target.data("ui-tooltip-open", true);
if(event&&event.type==="mouseover"){
target.parents().each(function(){
var parent=$(this),
blurEvent;
if(parent.data("ui-tooltip-open")){
blurEvent=$.Event("blur");
blurEvent.target=blurEvent.currentTarget=this;
that.close(blurEvent, true);
}
if(parent.attr("title")){
parent.uniqueId();
that.parents[ this.id ]={
element: this,
title: parent.attr("title")
};
parent.attr("title", "");
}});
}
this._registerCloseHandlers(event, target);
this._updateContent(target, event);
},
_updateContent: function(target, event){
var content,
contentOption=this.options.content,
that=this,
eventType=event ? event.type:null;
if(typeof contentOption==="string"||contentOption.nodeType ||
contentOption.jquery){
return this._open(event, target, contentOption);
}
content=contentOption.call(target[ 0 ], function(response){
that._delay(function(){
if(!target.data("ui-tooltip-open")){
return;
}
if(event){
event.type=eventType;
}
this._open(event, target, response);
});
});
if(content){
this._open(event, target, content);
}},
_open: function(event, target, content){
var tooltipData, tooltip, delayedShow, a11yContent,
positionOption=$.extend({}, this.options.position);
if(!content){
return;
}
tooltipData=this._find(target);
if(tooltipData){
tooltipData.tooltip.find(".ui-tooltip-content").html(content);
return;
}
if(target.is("[title]")){
if(event&&event.type==="mouseover"){
target.attr("title", "");
}else{
target.removeAttr("title");
}}
tooltipData=this._tooltip(target);
tooltip=tooltipData.tooltip;
this._addDescribedBy(target, tooltip.attr("id"));
tooltip.find(".ui-tooltip-content").html(content);
this.liveRegion.children().hide();
a11yContent=$("<div>").html(tooltip.find(".ui-tooltip-content").html());
a11yContent.removeAttr("name").find("[name]").removeAttr("name");
a11yContent.removeAttr("id").find("[id]").removeAttr("id");
a11yContent.appendTo(this.liveRegion);
function position(event){
positionOption.of=event;
if(tooltip.is(":hidden")){
return;
}
tooltip.position(positionOption);
}
if(this.options.track&&event&&/^mouse/.test(event.type)){
this._on(this.document, {
mousemove: position
});
position(event);
}else{
tooltip.position($.extend({
of: target
}, this.options.position));
}
tooltip.hide();
this._show(tooltip, this.options.show);
if(this.options.track&&this.options.show&&this.options.show.delay){
delayedShow=this.delayedShow=setInterval(function(){
if(tooltip.is(":visible")){
position(positionOption.of);
clearInterval(delayedShow);
}}, $.fx.interval);
}
this._trigger("open", event, { tooltip: tooltip });
},
_registerCloseHandlers: function(event, target){
var events={
keyup: function(event){
if(event.keyCode===$.ui.keyCode.ESCAPE){
var fakeEvent=$.Event(event);
fakeEvent.currentTarget=target[ 0 ];
this.close(fakeEvent, true);
}}
};
if(target[ 0 ]!==this.element[ 0 ]){
events.remove=function(){
this._removeTooltip(this._find(target).tooltip);
};}
if(!event||event.type==="mouseover"){
events.mouseleave="close";
}
if(!event||event.type==="focusin"){
events.focusout="close";
}
this._on(true, target, events);
},
close: function(event){
var tooltip,
that=this,
target=$(event ? event.currentTarget:this.element),
tooltipData=this._find(target);
if(!tooltipData){
target.removeData("ui-tooltip-open");
return;
}
tooltip=tooltipData.tooltip;
if(tooltipData.closing){
return;
}
clearInterval(this.delayedShow);
if(target.data("ui-tooltip-title")&&!target.attr("title")){
target.attr("title", target.data("ui-tooltip-title"));
}
this._removeDescribedBy(target);
tooltipData.hiding=true;
tooltip.stop(true);
this._hide(tooltip, this.options.hide, function(){
that._removeTooltip($(this));
});
target.removeData("ui-tooltip-open");
this._off(target, "mouseleave focusout keyup");
if(target[ 0 ]!==this.element[ 0 ]){
this._off(target, "remove");
}
this._off(this.document, "mousemove");
if(event&&event.type==="mouseleave"){
$.each(this.parents, function(id, parent){
$(parent.element).attr("title", parent.title);
delete that.parents[ id ];
});
}
tooltipData.closing=true;
this._trigger("close", event, { tooltip: tooltip });
if(!tooltipData.hiding){
tooltipData.closing=false;
}},
_tooltip: function(element){
var tooltip=$("<div>").attr("role", "tooltip"),
content=$("<div>").appendTo(tooltip),
id=tooltip.uniqueId().attr("id");
this._addClass(content, "ui-tooltip-content");
this._addClass(tooltip, "ui-tooltip", "ui-widget ui-widget-content");
tooltip.appendTo(this._appendTo(element));
return this.tooltips[ id ]={
element: element,
tooltip: tooltip
};},
_find: function(target){
var id=target.data("ui-tooltip-id");
return id ? this.tooltips[ id ]:null;
},
_removeTooltip: function(tooltip){
tooltip.remove();
delete this.tooltips[ tooltip.attr("id") ];
},
_appendTo: function(target){
var element=target.closest(".ui-front, dialog");
if(!element.length){
element=this.document[ 0 ].body;
}
return element;
},
_destroy: function(){
var that=this;
$.each(this.tooltips, function(id, tooltipData){
var event=$.Event("blur"),
element=tooltipData.element;
event.target=event.currentTarget=element[ 0 ];
that.close(event, true);
$("#" + id).remove();
if(element.data("ui-tooltip-title")){
if(!element.attr("title")){
element.attr("title", element.data("ui-tooltip-title"));
}
element.removeData("ui-tooltip-title");
}});
this.liveRegion.remove();
}});
if($.uiBackCompat!==false){
$.widget("ui.tooltip", $.ui.tooltip, {
options: {
tooltipClass: null
},
_tooltip: function(){
var tooltipData=this._superApply(arguments);
if(this.options.tooltipClass){
tooltipData.tooltip.addClass(this.options.tooltipClass);
}
return tooltipData;
}});
}
var widgetsTooltip=$.ui.tooltip;
}));
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g--;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var b,c,e;b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&e<=0&&this.preloadAutoWidthImages(b)}this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.$element.is(":visible")&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var d=-1,e=30,f=this.width(),g=this.coordinates();return this.settings.freeDrag||a.each(g,a.proxy(function(a,h){return"left"===c&&b>h-e&&b<h+e?d=a:"right"===c&&b>h-f-e&&b<h-f+e?d=a+1:this.op(b,"<",h)&&this.op(b,">",g[a+1]||h-f)&&(d="left"===c?a+1:a),d===-1},this)),this.settings.loop||(this.op(b,">",g[this.minimum()])?d=b=this.minimum():this.op(b,"<",g[this.maximum()])&&(d=b=this.maximum())),d},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){for(b=this._items.length,c=this._items[--b].width(),d=this.$element.width();b--&&(c+=this._items[b].width()+this.settings.margin,!(c>d)););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=f*-1*g),a=c+e,d=((a-h)%g+g)%g+h,d!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.$element.is(":visible")&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),this.settings.responsive!==!1&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&a.namespace.indexOf("owl")!==-1?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&e*-1||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.$stage.children().toArray().slice(b,c),e=[],f=0;a.each(d,function(b,c){e.push(a(c).height())}),f=Math.max.apply(null,e),this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};if(b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),"youtube"===f.type?c='<iframe width="'+g+'" height="'+h+'" src="//www.youtube.com/embed/'+f.id+"?autoplay=1&rel=0&v="+f.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===f.type?c='<iframe src="//player.vimeo.com/video/'+f.id+'?autoplay=1" width="'+g+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>':"vzaar"===f.type&&(c='<iframe frameborder="0"height="'+h+'"width="'+g+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/'+f.id+'/player?autoplay=true"></iframe>'),a('<div class="owl-video-frame">'+c+"</div>").insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},
a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._timeout=null,this._paused=!1,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._core.settings.autoplay&&this._setAutoPlayInterval()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype.play=function(a,b){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._setAutoPlayInterval())},e.prototype._getNextTimeout=function(d,e){return this._timeout&&b.clearTimeout(this._timeout),b.setTimeout(a.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||c.hidden||this._core.next(e||this._core.settings.autoplaySpeed)},this),d||this._core.settings.autoplayTimeout)},e.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout()},e.prototype.stop=function(){this._core.is("rotating")&&(b.clearTimeout(this._timeout),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
!function(t){"use strict";t.fn.counterUp=function(a){var e,n=t.extend({time:400,delay:10,formatter:!1,callback:function(){}},a);return this.each(function(){var a=t(this),u={time:t(this).data("counterup-time")||n.time,delay:t(this).data("counterup-delay")||n.delay},r=function(){var t=[],r=u.time/u.delay,o=a.text(),c=/[0-9]+,[0-9]+/.test(o);o=o.replace(/,/g,"");var i=(o.split(".")[1]||[]).length,l=/[0-9]+:[0-9]+:[0-9]+/.test(o);if(l){var s=o.split(":"),d=1;for(e=0;s.length>0;)e+=d*parseInt(s.pop(),10),d*=60}for(var f=r;f>=1;f--){var p=parseFloat(o/r*f).toFixed(i);if(l){p=parseInt(e/r*f);var m=parseInt(p/3600)%24,h=parseInt(p/60)%60,v=parseInt(p%60,10);p=(10>m?"0"+m:m)+":"+(10>h?"0"+h:h)+":"+(10>v?"0"+v:v)}if(c)for(;/(\d+)(\d{3})/.test(p.toString());)p=p.toString().replace(/(\d+)(\d{3})/,"$1,$2");n.formatter&&(p=n.formatter.call(this,p)),t.unshift(p)}a.data("counterup-nums",t),a.text("0");var y=function(){return a.data("counterup-nums")?(a.html(a.data("counterup-nums").shift()),void(a.data("counterup-nums").length?setTimeout(a.data("counterup-func"),u.delay):(a.data("counterup-nums",null),a.data("counterup-func",null),n.callback.call(this)))):void n.callback.call(this)};a.data("counterup-func",y),setTimeout(a.data("counterup-func"),u.delay)};a.waypoint(function(t){r(),this.destroy()},{offset:"100%"})})}}(jQuery);
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){return function(b){var c=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(c)for(var e=0,f=c.length;f>e;++e){var g=c[e].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),i=new RegExp(g[0]),j=g[1]||"",k=g[3]||"",l=null;g=g[2],h.hasOwnProperty(g)&&(l=h[g],l=Number(a[l])),null!==l&&("!"===j&&(l=d(k,l)),""===j&&10>l&&(l="0"+l.toString()),b=b.replace(i,l.toString()))}return b=b.replace(/%%/,"%")}}function d(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),1===Math.abs(b)?d:c}var e=100,f=[],g=[];g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}([0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}([0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var h={Y:"years",m:"months",w:"weeks",d:"days",D:"totalDays",H:"hours",M:"minutes",S:"seconds"},i=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)),this.setFinalDate(c),this.start()};a.extend(i.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},e)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},pause:function(){this.stop.call(this)},resume:function(){this.start.call(this)},remove:function(){this.stop(),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){return 0===this.$el.closest("html").length?void this.remove():(this.totalSecsLeft=this.finalDate.getTime()-(new Date).getTime(),this.totalSecsLeft=Math.ceil(this.totalSecsLeft/1e3),this.totalSecsLeft=this.totalSecsLeft<0?0:this.totalSecsLeft,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,totalDays:Math.floor(this.totalSecsLeft/60/60/24),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),months:Math.floor(this.totalSecsLeft/60/60/24/30),years:Math.floor(this.totalSecsLeft/60/60/24/365)},void(0===this.totalSecsLeft?(this.stop(),this.dispatchEvent("finish")):this.dispatchEvent("update")))},dispatchEvent:function(b){var d=a.Event(b+".countdown");d.finalDate=this.finalDate,d.offset=a.extend({},this.offset),d.strftime=c(this.offset),this.$el.trigger(d)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];i.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new i(this,b[0],b[1])})}});
!(function (u){
u.fn.stellarNav=function (n, r, h){
(nav=u(this)), (r=u(window).width());
var f=u.extend({
theme: "plain",
breakpoint: 768,
menuLabel: "Menu",
sticky: !1,
position: "static",
openingSpeed: 250,
closingDelay: 250,
showArrows: !0,
phoneBtn: "",
phoneLabel: "Call Us",
locationBtn: "",
locationLabel: "Location",
closeBtn: !1,
closeLabel: "Close",
mobileMode: !1,
scrollbarFix: !1,
},
n
);
return this.each(function (){
if((("light"!=f.theme&&"dark"!=f.theme)||nav.addClass(f.theme),
f.breakpoint&&(h=f.breakpoint),
f.menuLabel ? (menuLabel=f.menuLabel):(menuLabel=""),
f.phoneLabel ? (phoneLabel=f.phoneLabel):(phoneLabel=""),
f.locationLabel ? (locationLabel=f.locationLabel):(locationLabel=""),
f.closeLabel ? (closeLabel=f.closeLabel):(closeLabel=""),
f.phoneBtn&&f.locationBtn)
)
var n="third";
else if(f.phoneBtn||f.locationBtn) n="half";
else n="full";
if(("right"==f.position||"left"==f.position
? nav.prepend('<a href="#" class="menu-toggle"><span class="bars"><span></span><span></span><span></span></span> ' + menuLabel + "</a>")
: nav.prepend('<a href="#" class="menu-toggle ' + n + '"><span class="bars"><span></span><span></span><span></span></span> ' + menuLabel + "</a>"),
f.phoneBtn&&"right"!=f.position&&"left"!=f.position)
){
var e='<a href="tel:' + f.phoneBtn + '" class="call-btn-mobile ' + n + '"><svg id="icon-phone"></svg> <span>' + phoneLabel + "</span></a>";
nav.find("a.menu-toggle").after(e);
}
if(f.locationBtn&&"right"!=f.position&&"left"!=f.position){
e='<a href="' + f.locationBtn + '" class="location-btn-mobile ' + n + '" target="_blank"><svg id="icon-location"></svg> <span>' + locationLabel + "</span></a>";
nav.find("a.menu-toggle").after(e);
}
if((f.sticky &&
((navPos=nav.offset().top),
h <=r &&
u(window).on("scroll", function (){
u(window).scrollTop() > navPos ? nav.addClass("fixed"):nav.removeClass("fixed");
})),
"top"==f.position&&nav.addClass("top"),
"left"==f.position||"right"==f.position)
){
var i='<a href="#" class="close-menu ' + n + '"><span class="icon-close"></span>' + closeLabel + "</a>",
s='<a href="tel:' + f.phoneBtn + '" class="call-btn-mobile ' + n + '"><svg id="icon-phone"></svg></a>',
t='<a href="mailto:' + f.locationBtn + '" class="location-btn-mobile ' + n + '"><svg id="icon-location"></svg></i></a>';
nav.find("ul:first").prepend(i), f.locationBtn&&nav.find("ul:first").prepend(t), f.phoneBtn&&nav.find("ul:first").prepend(s);
}
"right"==f.position&&nav.addClass("right"),
"left"==f.position&&nav.addClass("left"),
f.showArrows||nav.addClass("hide-arrows"),
f.closeBtn&&"right"!=f.position&&"left"!=f.position&&nav.find("ul:first").append('<li><a href="#" class="close-menu"><span class="icon-close"></span> ' + closeLabel + "</a></li>"),
f.scrollbarFix&&u("body").addClass("stellarnav-noscroll-x");
var a=document.getElementById("icon-phone");
if(a){
a.setAttribute("viewBox", "0 0 480 480");
var l=document.createElementNS("http://www.w3.org/2000/svg", "path");
l.setAttribute("d",
"M340.273,275.083l-53.755-53.761c-10.707-10.664-28.438-10.34-39.518,0.744l-27.082,27.076 c-1.711-0.943-3.482-1.928-5.344-2.973c-17.102-9.476-40.509-22.464-65.14-47.113c-24.704-24.701-37.704-48.144-47.209-65.257     c-1.003-1.813-1.964-3.561-2.913-5.221l18.176-18.149l8.936-8.947c11.097-11.1,11.403-28.826,0.721-39.521L73.39,8.194 C62.708-2.486,44.969-2.162,33.872,8.938l-15.15,15.237l0.414,0.411c-5.08,6.482-9.325,13.958-12.484,22.02     C3.74,54.28,1.927,61.603,1.098,68.941C-6,127.785,20.89,181.564,93.866,254.541c100.875,100.868,182.167,93.248,185.674,92.876 c7.638-0.913,14.958-2.738,22.397-5.627c7.992-3.122,15.463-7.361,21.941-12.43l0.331,0.294l15.348-15.029     C350.631,303.527,350.95,285.795,340.273,275.083z"
),
a.appendChild(l);
}
var o=document.getElementById("icon-location");
if(o){
o.setAttribute("viewBox", "0 0 480 480");
var d=document.createElementNS("http://www.w3.org/2000/svg", "path");
d.setAttribute("d",
"M229.376,271.616c-4.096,2.56-8.704,3.584-12.8,3.584s-8.704-1.024-12.8-3.584L0,147.2v165.376c0,35.328,28.672,64,64,64     h305.664c35.328,0,64-28.672,64-64V147.2L229.376,271.616z M369.664,57.088H64c-30.208,0-55.808,21.504-61.952,50.176l215.04,131.072l214.528-131.072      C425.472,78.592,399.872,57.088,369.664,57.088z"
),
o.appendChild(d);
}
u(".menu-toggle, .stellarnav-open").on("click", function (n){
n.preventDefault(),
"left"==f.position||"right"==f.position
? (nav.find("ul:first").stop(!0, !0).fadeToggle(f.openingSpeed),
nav.toggleClass("active"),
nav.hasClass("active") &&
nav.hasClass("mobile") &&
u(document).on("click", function (n){
nav.hasClass("mobile")&&(u(n.target).closest(nav).length||(nav.find("ul:first").stop(!0, !0).fadeOut(f.openingSpeed), nav.removeClass("active")));
}))
: (nav.find("ul:first").stop(!0, !0).slideToggle(f.openingSpeed), nav.toggleClass("active"));
}),
u(".close-menu, .stellarnav-close").on("click", function (){
nav.removeClass("active"), "left"==f.position||"right"==f.position ? nav.find("ul:first").stop(!0, !0).fadeToggle(f.openingSpeed):nav.find("ul:first").stop(!0, !0).slideUp(f.openingSpeed).toggleClass("active");
}),
nav.find("li a").each(function (){
0 < u(this).next().length&&u(this).parent("li").addClass("has-sub").append('<a class="dd-toggle" href="#"><span class="icon-plus"></span></a>');
}),
nav.find("li .dd-toggle").on("click", function (n){
n.preventDefault(), u(this).parent("li").children("ul").stop(!0, !0).slideToggle(f.openingSpeed), u(this).parent("li").toggleClass("open");
});
var c=function (){
nav.find("li").off("mouseenter"), nav.find("li").off("mouseleave");
};
parentItems=nav.find("> ul > li");
function p(){
window.innerWidth <=h||f.mobileMode
? (c(),
nav.addClass("mobile"),
nav.removeClass("desktop"),
!nav.hasClass("active")&&nav.find("ul:first").is(":visible")&&nav.find("ul:first").hide(),
nav.find("li.mega").each(function (){
u(this).find("ul").first().removeAttr("style"), u(this).find("ul").first().children().removeAttr("style");
}))
: (nav.addClass("desktop"),
nav.removeClass("mobile"),
nav.hasClass("active")&&nav.removeClass("active"),
!nav.hasClass("active")&&nav.find("ul:first").is(":hidden")&&nav.find("ul:first").show(),
u("li.open").removeClass("open").find("ul:visible").hide(),
c(),
u(parentItems).each(function (){
u(this).hasClass("mega")
? (u(this).on("mouseenter", function (){
u(this).find("ul").first().stop(!0, !0).slideDown(f.openingSpeed);
}),
u(this).on("mouseleave", function (){
u(this).find("ul").first().stop(!0, !0).slideUp(f.openingSpeed);
}))
: (u(this).on("mouseenter", function (){
u(this).children("ul").stop(!0, !0).slideDown(f.openingSpeed);
}),
u(this).on("mouseleave", function (){
u(this).children("ul").stop(!0, !0).delay(f.closingDelay).slideUp(f.openingSpeed);
}),
u(this)
.find("li.has-sub")
.on("mouseenter", function (){
u(this).children("ul").stop(!0, !0).slideDown(f.openingSpeed);
}),
u(this)
.find("li.has-sub")
.on("mouseleave", function (){
u(this).children("ul").stop(!0, !0).delay(f.closingDelay).slideUp(f.openingSpeed);
}));
}),
(navWidth=0),
u(parentItems).each(function (){
(navWidth +=u(this)[0].getBoundingClientRect().width),
(navWidth=Math.round(navWidth)),
u(this).hasClass("mega") &&
(u(this).find("ul").first().css({ left: 0, right: 0, margin: "0px auto" }),
(numCols=u(this).attr("data-columns")),
2==numCols
? u(this).find("li.has-sub").width("50%")
: 3==numCols
? u(this).find("ul").first().children().width("33.33%")
: 4==numCols
? u(this).find("ul").first().children().width("25%")
: 5==numCols
? u(this).find("ul").first().children().width("20%")
: 6==numCols
? u(this).find("ul").first().children().width("16.66%")
: 7==numCols
? u(this).find("ul").first().children().width("14.28%")
: 8==numCols
? u(this).find("ul").first().children().width("12.5%")
: u(this).find("ul").first().children().width("25%"));
}),
parentItems.hasClass("mega")&&nav.find("li.mega > ul").css({ "max-width": navWidth }));
}
p(),
u(window).on("resize", function (){
p();
});
});
};})(jQuery);
!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return-1==n.indexOf(t)&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return-1!=n&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=0,o=i[n];t=t||[];for(var r=this._onceEvents&&this._onceEvents[e];o;){var s=r&&r[o];s&&(this.off(e,o),delete r[o]),o.apply(this,t),n+=s?0:1,o=i[n]}return this}},t.allOff=t.removeAllListeners=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){var t=[];if(Array.isArray(e))t=e;else if("number"==typeof e.length)for(var i=0;i<e.length;i++)t.push(e[i]);else t.push(e);return t}function o(e,t,r){return this instanceof o?("string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=n(e),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(e,t,r)}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&d[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});
!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,o){var n,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,o);n=void 0===n?l:n}),void 0!==n?n:t}function h(t,e){t.each(function(t,o){var n=a.data(o,i);n?(n.option(e),n._init()):(n=new s(o,e),a.data(o,i,n))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=n.call(arguments,1);return u(this,t,e)}return h(this,t),this},o(a))}function o(t){!t||t&&t.bridget||(t.bridget=i)}var n=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return o(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},o=i[t]=i[t]||[];return o.indexOf(e)==-1&&o.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},o=i[t]=i[t]||{};return o[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var o=i.indexOf(e);return o!=-1&&i.splice(o,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var o=0,n=i[o];e=e||[];for(var s=this._onceEvents&&this._onceEvents[t];n;){var r=s&&s[n];r&&(this.off(t,n),delete s[n]),n.apply(this,e),o+=r?0:1,n=i[o]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=u[e];t[i]=0}return t}function o(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function n(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var n=o(e);s.isBoxSizeOuter=r=200==t(n.width),i.removeChild(e)}}function s(e){if(n(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=o(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;l<h;l++){var f=u[l],c=s[f],m=parseFloat(c);a[f]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,I=a.borderTopWidth+a.borderBottomWidth,z=d&&r,x=t(s.width);x!==!1&&(a.width=x+(z?0:p+_));var S=t(s.height);return S!==!1&&(a.height=S+(z?0:y+I)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+I),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var o=e[i],n=o+"MatchesSelector";if(t[n])return n}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,o){t=i.makeArray(t);var n=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!o)return void n.push(t);e(t,o)&&n.push(t);for(var i=t.querySelectorAll(o),s=0;s<i.length;s++)n.push(i[s])}}),n},i.debounceMethod=function(t,e,i){var o=t.prototype[e],n=e+"Timeout";t.prototype[e]=function(){var t=this[n];t&&clearTimeout(t);var e=arguments,s=this;this[n]=setTimeout(function(){o.apply(s,e),delete s[n]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var o=t.console;return i.htmlInit=function(e,n){i.docReady(function(){var s=i.toDashed(n),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(o&&o.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,n,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function o(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function n(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=o.prototype=Object.create(t.prototype);d.constructor=o,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var o=h[i]||i;e[o]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),o=t[e?"left":"right"],n=t[i?"top":"bottom"],s=this.layout.size,r=o.indexOf("%")!=-1?parseFloat(o)/100*s.width:parseInt(o,10),a=n.indexOf("%")!=-1?parseFloat(n)/100*s.height:parseInt(n,10);r=isNaN(r)?0:r,a=isNaN(a)?0:a,r-=e?s.paddingLeft:s.paddingRight,a-=i?s.paddingTop:s.paddingBottom,this.position.x=r,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop"),n=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[n];e[s]=this.getXValue(a),e[r]="";var u=o?"paddingTop":"paddingBottom",h=o?"top":"bottom",d=o?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=parseInt(t,10),s=parseInt(e,10),r=n===this.position.x&&s===this.position.y;if(this.setPosition(t,e),r&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,u=e-o,h={};h.transform=this.getTranslate(a,u),this.transition({to:h,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop");return t=i?t:-t,e=o?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+n(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var c={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(c)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,o,n,s){return e(t,i,o,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,o,n){"use strict";function s(t,e){var i=o.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=o.extend({},this.constructor.defaults),this.option(e);var n=++l;this.element.outlayerGUID=n,f[n]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],o=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var n=m[o]||1;return i*n}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=n,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var c=s.prototype;o.extend(c,e.prototype),c.option=function(t){o.extend(this.options,t)},c._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},c._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),o.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},c.reloadItems=function(){this.items=this._itemize(this.element.children)},c._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0;n<e.length;n++){var s=e[n],r=new i(s,this);o.push(r)}return o},c._filterFindItemElements=function(t){return o.filterFindElements(t,this.options.itemSelector)},c.getItemElements=function(){return this.items.map(function(t){return t.element})},c.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},c._init=c.layout,c._resetLayout=function(){this.getSize()},c.getSize=function(){this.size=i(this.element)},c._getMeasurement=function(t,e){var o,n=this.options[t];n?("string"==typeof n?o=this.element.querySelector(n):n instanceof HTMLElement&&(o=n),this[t]=o?i(o)[e]:n):this[t]=0},c.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},c._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},c._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var o=this._getItemLayoutPosition(t);o.item=t,o.isInstant=e||t.isLayoutInstant,i.push(o)},this),this._processLayoutQueue(i)}},c._getItemLayoutPosition=function(){return{x:0,y:0}},c._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},c.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},c._positionItem=function(t,e,i,o,n){o?t.goTo(e,i):(t.stagger(n*this.stagger),t.moveTo(e,i))},c._postLayout=function(){this.resizeContainer()},c.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},c._getContainerSize=d,c._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},c._emitCompleteOnItems=function(t,e){function i(){n.dispatchEvent(t+"Complete",null,[e])}function o(){r++,r==s&&i()}var n=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,o)})},c.dispatchEvent=function(t,e,i){var o=e?[e].concat(i):i;if(this.emitEvent(t,o),h)if(this.$element=this.$element||h(this.element),e){var n=h.Event(e);n.type=t,this.$element.trigger(n,i)}else this.$element.trigger(t,i)},c.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},c.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},c.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},c.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){o.removeFrom(this.stamps,t),this.unignore(t)},this)},c._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o.makeArray(t)},c._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},c._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},c._manageStamp=d,c._getElementOffset=function(t){var e=t.getBoundingClientRect(),o=this._boundingRect,n=i(t),s={left:e.left-o.left-n.marginLeft,top:e.top-o.top-n.marginTop,right:o.right-e.right-n.marginRight,bottom:o.bottom-e.bottom-n.marginBottom};return s},c.handleEvent=o.handleEvent,c.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},c.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},c.onresize=function(){this.resize()},o.debounceMethod(s,"onresize",100),c.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},c.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},c.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},c.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},c.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},c.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},c.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},c.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},c.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},c.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},c.getItems=function(t){t=o.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},c.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),o.removeFrom(this.items,t)},this)},c.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=o.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=o.extend({},s.defaults),o.extend(i.defaults,e),i.compatOptions=o.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(n),o.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var m={ms:1,s:1e3};return s.Item=n,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),o=i._create;i._create=function(){this.id=this.layout.itemGUID++,o.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var n=i.destroy;return i.destroy=function(){n.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var o=i.prototype,n=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return n.forEach(function(t){o[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),o.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},o._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},o.getColumnWidth=function(){this.getSegmentSize("column","Width")},o.getRowHeight=function(){this.getSegmentSize("row","Height")},o.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},o.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},o.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},o.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function n(){i.apply(this,arguments)}return n.prototype=Object.create(o),n.prototype.constructor=n,e&&(n.options=e),n.prototype.namespace=t,i.modes[t]=n,n},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var o=i.prototype;return o._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},o.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var o=this.columnWidth+=this.gutter,n=this.containerWidth+this.gutter,s=n/o,r=o-n%o,a=r&&r<1?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},o.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,o=e(i);this.containerWidth=o&&o.innerWidth},o._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&e<1?"round":"ceil",o=Math[i](t.size.outerWidth/this.columnWidth);o=Math.min(o,this.cols);for(var n=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",s=this[n](o,t),r={x:this.columnWidth*s.col,y:s.y},a=s.y+t.size.outerHeight,u=o+s.col,h=s.col;h<u;h++)this.colYs[h]=a;return r},o._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},o._getTopColGroup=function(t){if(t<2)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;o<i;o++)e[o]=this._getColGroupY(o,t);return e},o._getColGroupY=function(t,e){if(e<2)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},o._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,o=t>1&&i+t>this.cols;i=o?0:i;var n=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=n?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},o._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this._getOption("originLeft"),s=n?o.left:o.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?o.top:o.bottom)+i.outerHeight,l=a;l<=u;l++)this.colYs[l]=Math.max(d,this.colYs[l])},o._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},o._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),o=i.prototype,n={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)n[s]||(o[s]=e.prototype[s]);var r=o.measureColumns;o.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=o._getOption;return o._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var o={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,o},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(i,o,n,s,r,a){return e(t,i,o,n,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope/js/item"),require("isotope/js/layout-mode"),require("isotope/js/layout-modes/masonry"),require("isotope/js/layout-modes/fit-rows"),require("isotope/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,o,n,s,r){function a(t,e){return function(i,o){for(var n=0;n<t.length;n++){var s=t[n],r=i.sortData[s],a=o.sortData[s];if(r>a||r<a){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var o=t[i];o.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?n.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&o&&n.dispatchEvent("arrangeComplete",null,[n.filteredItems])}var e,i,o,n=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){o=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],o=[],n=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?o.push(a):u||a.isHidden||n.push(a)}}return{matches:i,needReveal:o,needHide:n}},l._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return o(e.element,t)}},l.updateSortData=function(t){
var e;t?(t=n.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&i<e;i++){var o=t[i];o.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),s=n&&n[1],r=e(s,o),a=d.sortDataParsers[i[1]];return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){if(this.options.sortBy){var t=n.makeArray(this.options.sortBy);this._getIsSameSortBy(t)||(this.sortHistory=t.concat(this.sortHistory));var e=a(this.sortHistory,this.options.sortAscending);this.filteredItems.sort(e)}},l._getIsSameSortBy=function(t){for(var e=0;e<t.length;e++)if(t[e]!=this.sortHistory[e])return!1;return!0},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;i<n;i++)o=e[i],this.element.appendChild(o.element);var s=this._filter(e).matches;for(i=0;i<n;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;i<n;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var c=l.remove;return l.remove=function(t){t=n.makeArray(t);var e=this.getItems(t);c.call(this,t);for(var i=e&&e.length,o=0;i&&o<i;o++){var s=e[o];n.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var o=t.apply(this,e);return this.options.transitionDuration=i,o},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});
!(function (a){
"function"==typeof define&&define.amd ? define(["jquery"], a):a("object"==typeof exports ? require("jquery"):window.jQuery||window.Zepto);
})(function (a){
var b,
c,
d,
e,
f,
g,
h="Close",
i="BeforeClose",
j="AfterClose",
k="BeforeAppend",
l="MarkupParse",
m="Open",
n="Change",
o="mfp",
p="." + o,
q="mfp-ready",
r="mfp-removing",
s="mfp-prevent-close",
t=function (){},
u = !!window.jQuery,
v=a(window),
w=function (a, c){
b.ev.on(o + a + p, c);
},
x=function (b, c, d, e){
var f=document.createElement("div");
return (f.className="mfp-" + b), d&&(f.innerHTML=d), e ? c&&c.appendChild(f):((f=a(f)), c&&f.appendTo(c)), f;
},
y=function (c, d){
b.ev.triggerHandler(o + c, d), b.st.callbacks&&((c=c.charAt(0).toLowerCase() + c.slice(1)), b.st.callbacks[c]&&b.st.callbacks[c].apply(b, a.isArray(d) ? d:[d]));
},
z=function (c){
return (c===g&&b.currTemplate.closeBtn)||((b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%", b.st.tClose))), (g=c)), b.currTemplate.closeBtn;
},
A=function (){
a.magnificPopup.instance||((b=new t()), b.init(), (a.magnificPopup.instance=b));
},
B=function (){
var a=document.createElement("p").style,
b=["ms", "O", "Moz", "Webkit"];
if(void 0!==a.transition) return !0;
for (; b.length;) if(b.pop() + "Transition" in a) return !0;
return !1;
};
(t.prototype={
constructor: t,
init: function (){
var c=navigator.appVersion;
(b.isLowIE=b.isIE8=document.all&&!document.addEventListener),
(b.isAndroid=/android/gi.test(c)),
(b.isIOS=/iphone|ipad|ipod/gi.test(c)),
(b.supportsTransition=B()),
(b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent)),
(d=a(document)),
(b.popupsCache={});
},
open: function (c){
var e;
if(c.isObj===!1){
(b.items=c.items.toArray()), (b.index=0);
var g,
h=c.items;
for (e=0; e < h.length; e++)
if(((g=h[e]), g.parsed&&(g=g.el[0]), g===c.el[0])){
b.index=e;
break;
}} else (b.items=a.isArray(c.items) ? c.items:[c.items]), (b.index=c.index||0);
if(b.isOpen) return void b.updateItemHTML();
(b.types=[]),
(f=""),
c.mainEl&&c.mainEl.length ? (b.ev=c.mainEl.eq(0)):(b.ev=d),
c.key ? (b.popupsCache[c.key]||(b.popupsCache[c.key]={}), (b.currTemplate=b.popupsCache[c.key])):(b.currTemplate={}),
(b.st=a.extend(!0, {}, a.magnificPopup.defaults, c)),
(b.fixedContentPos="auto"===b.st.fixedContentPos ? !b.probablyMobile:b.st.fixedContentPos),
b.st.modal&&((b.st.closeOnContentClick = !1), (b.st.closeOnBgClick = !1), (b.st.showCloseBtn = !1), (b.st.enableEscapeKey = !1)),
b.bgOverlay ||
((b.bgOverlay=x("bg").on("click" + p, function (){
b.close();
})),
(b.wrap=x("wrap")
.attr("tabindex", -1)
.on("click" + p, function (a){
b._checkIfClose(a.target)&&b.close();
})),
(b.container=x("container", b.wrap))),
(b.contentContainer=x("content")),
b.st.preloader&&(b.preloader=x("preloader", b.container, b.st.tLoading));
var i=a.magnificPopup.modules;
for (e=0; e < i.length; e++){
var j=i[e];
(j=j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
}
y("BeforeOpen"),
b.st.showCloseBtn &&
(b.st.closeBtnInside
? (w(l, function (a, b, c, d){
c.close_replaceWith=z(d.type);
}),
(f +=" mfp-close-btn-in"))
: b.wrap.append(z())),
b.st.alignTop&&(f +=" mfp-align-top"),
b.fixedContentPos ? b.wrap.css({ overflow: b.st.overflowY, overflowX: "hidden", overflowY: b.st.overflowY }):b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
(b.st.fixedBgPos===!1||("auto"===b.st.fixedBgPos&&!b.fixedContentPos))&&b.bgOverlay.css({ height: d.height(), position: "absolute" }),
b.st.enableEscapeKey &&
d.on("keyup" + p, function (a){
27===a.keyCode&&b.close();
}),
v.on("resize" + p, function (){
b.updateSize();
}),
b.st.closeOnContentClick||(f +=" mfp-auto-cursor"),
f&&b.wrap.addClass(f);
var k=(b.wH=v.height()),
n={};
if(b.fixedContentPos&&b._hasScrollBar(k)){
var o=b._getScrollbarSize();
o&&(n.marginRight=o);
}
b.fixedContentPos&&(b.isIE7 ? a("body, html").css("overflow", "hidden"):(n.overflow="hidden"));
var r=b.st.mainClass;
return (
b.isIE7&&(r +=" mfp-ie7"),
r&&b._addClassToMFP(r),
b.updateItemHTML(),
y("BuildControls"),
a("html").css(n),
b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),
(b._lastFocusedEl=document.activeElement),
setTimeout(function (){
b.content ? (b._addClassToMFP(q), b._setFocus()):b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn);
}, 16),
(b.isOpen = !0),
b.updateSize(k),
y(m),
c
);
},
close: function (){
b.isOpen &&
(y(i),
(b.isOpen = !1),
b.st.removalDelay&&!b.isLowIE&&b.supportsTransition
? (b._addClassToMFP(r),
setTimeout(function (){
b._close();
}, b.st.removalDelay))
: b._close());
},
_close: function (){
y(h);
var c=r + " " + q + " ";
if((b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass&&(c +=b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos)){
var e={ marginRight: "" };
b.isIE7 ? a("body, html").css("overflow", ""):(e.overflow=""), a("html").css(e);
}
d.off("keyup" + p + " focusin" + p),
b.ev.off(p),
b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
b.bgOverlay.attr("class", "mfp-bg"),
b.container.attr("class", "mfp-container"),
!b.st.showCloseBtn||(b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0)||(b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach()),
b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),
(b.currItem=null),
(b.content=null),
(b.currTemplate=null),
(b.prevHeight=0),
y(j);
},
updateSize: function (a){
if(b.isIOS){
var c=document.documentElement.clientWidth / window.innerWidth,
d=window.innerHeight * c;
b.wrap.css("height", d), (b.wH=d);
} else b.wH=a||v.height();
b.fixedContentPos||b.wrap.css("height", b.wH), y("Resize");
},
updateItemHTML: function (){
var c=b.items[b.index];
b.contentContainer.detach(), b.content&&b.content.detach(), c.parsed||(c=b.parseEl(b.index));
var d=c.type;
if((y("BeforeChange", [b.currItem ? b.currItem.type:"", d]), (b.currItem=c), !b.currTemplate[d])){
var f=b.st[d] ? b.st[d].markup:!1;
y("FirstMarkupParse", f), f ? (b.currTemplate[d]=a(f)):(b.currTemplate[d] = !0);
}
e&&e!==c.type&&b.container.removeClass("mfp-" + e + "-holder");
var g=b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
b.appendContent(g, d), (c.preloaded = !0), y(n, c), (e=c.type), b.container.prepend(b.contentContainer), y("AfterChange");
},
appendContent: function (a, c){
(b.content=a),
a ? (b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0 ? b.content.find(".mfp-close").length||b.content.append(z()):(b.content=a)):(b.content=""),
y(k),
b.container.addClass("mfp-" + c + "-holder"),
b.contentContainer.append(b.content);
},
parseEl: function (c){
var d,
e=b.items[c];
if((e.tagName ? (e={ el: a(e) }):((d=e.type), (e={ data: e, src: e.src })), e.el)){
for (var f=b.types, g=0; g < f.length; g++)
if(e.el.hasClass("mfp-" + f[g])){
d=f[g];
break;
}
(e.src=e.el.attr("data-mfp-src")), e.src||(e.src=e.el.attr("href"));
}
return (e.type=d||b.st.type||"inline"), (e.index=c), (e.parsed = !0), (b.items[c]=e), y("ElementParse", e), b.items[c];
},
addGroup: function (a, c){
var d=function (d){
(d.mfpEl=this), b._openClick(d, a, c);
};
c||(c={});
var e="click.magnificPopup";
(c.mainEl=a), c.items ? ((c.isObj = !0), a.off(e).on(e, d)):((c.isObj = !1), c.delegate ? a.off(e).on(e, c.delegate, d):((c.items=a), a.off(e).on(e, d)));
},
_openClick: function (c, d, e){
var f=void 0!==e.midClick ? e.midClick:a.magnificPopup.defaults.midClick;
if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){
var g=void 0!==e.disableOn ? e.disableOn:a.magnificPopup.defaults.disableOn;
if(g)
if(a.isFunction(g)){
if(!g.call(b)) return !0;
}else if(v.width() < g) return !0;
c.type&&(c.preventDefault(), b.isOpen&&c.stopPropagation()), (e.el=a(c.mfpEl)), e.delegate&&(e.items=d.find(e.delegate)), b.open(e);
}},
updateStatus: function (a, d){
if(b.preloader){
c!==a&&b.container.removeClass("mfp-s-" + c), d||"loading"!==a||(d=b.st.tLoading);
var e={ status: a, text: d };
y("UpdateStatus", e),
(a=e.status),
(d=e.text),
b.preloader.html(d),
b.preloader.find("a").on("click", function (a){
a.stopImmediatePropagation();
}),
b.container.addClass("mfp-s-" + a),
(c=a);
}},
_checkIfClose: function (c){
if(!a(c).hasClass(s)){
var d=b.st.closeOnContentClick,
e=b.st.closeOnBgClick;
if(d&&e) return !0;
if(!b.content||a(c).hasClass("mfp-close")||(b.preloader&&c===b.preloader[0])) return !0;
if(c===b.content[0]||a.contains(b.content[0], c)){
if(d) return !0;
}else if(e&&a.contains(document, c)) return !0;
return !1;
}},
_addClassToMFP: function (a){
b.bgOverlay.addClass(a), b.wrap.addClass(a);
},
_removeClassFromMFP: function (a){
this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
},
_hasScrollBar: function (a){
return (b.isIE7 ? d.height():document.body.scrollHeight) > (a||v.height());
},
_setFocus: function (){
(b.st.focus ? b.content.find(b.st.focus).eq(0):b.wrap).focus();
},
_onFocusIn: function (c){
return c.target===b.wrap[0]||a.contains(b.wrap[0], c.target) ? void 0:(b._setFocus(), !1);
},
_parseMarkup: function (b, c, d){
var e;
d.data&&(c=a.extend(d.data, c)),
y(l, [b, c, d]),
a.each(c, function (c, d){
if(void 0===d||d===!1) return !0;
if(((e=c.split("_")), e.length > 1)){
var f=b.find(p + "-" + e[0]);
if(f.length > 0){
var g=e[1];
"replaceWith"===g ? f[0]!==d[0]&&f.replaceWith(d):"img"===g ? (f.is("img") ? f.attr("src", d):f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class")))):f.attr(e[1], d);
}} else b.find(p + "-" + c).html(d);
});
},
_getScrollbarSize: function (){
if(void 0===b.scrollbarSize){
var a=document.createElement("div");
(a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"), document.body.appendChild(a), (b.scrollbarSize=a.offsetWidth - a.clientWidth), document.body.removeChild(a);
}
return b.scrollbarSize;
},
}),
(a.magnificPopup={
instance: null,
proto: t.prototype,
modules: [],
open: function (b, c){
return A(), (b=b ? a.extend(!0, {}, b):{}), (b.isObj = !0), (b.index=c||0), this.instance.open(b);
},
close: function (){
return a.magnificPopup.instance&&a.magnificPopup.instance.close();
},
registerModule: function (b, c){
c.options&&(a.magnificPopup.defaults[b]=c.options), a.extend(this.proto, c.proto), this.modules.push(b);
},
defaults: {
disableOn: 0,
key: null,
midClick: !1,
mainClass: "",
preloader: !0,
focus: "",
closeOnContentClick: !1,
closeOnBgClick: !0,
closeBtnInside: !0,
showCloseBtn: !0,
enableEscapeKey: !0,
modal: !1,
alignTop: !1,
removalDelay: 0,
prependTo: null,
fixedContentPos: "auto",
fixedBgPos: "auto",
overflowY: "auto",
closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
tClose: "Close (Esc)",
tLoading: "Loading...",
autoFocusLast: !0,
},
}),
(a.fn.magnificPopup=function (c){
A();
var d=a(this);
if("string"==typeof c)
if("open"===c){
var e,
f=u ? d.data("magnificPopup"):d[0].magnificPopup,
g=parseInt(arguments[1], 10)||0;
f.items ? (e=f.items[g]):((e=d), f.delegate&&(e=e.find(f.delegate)), (e=e.eq(g))), b._openClick({ mfpEl: e }, d, f);
} else b.isOpen&&b[c].apply(b, Array.prototype.slice.call(arguments, 1));
else (c=a.extend(!0, {}, c)), u ? d.data("magnificPopup", c):(d[0].magnificPopup=c), b.addGroup(d, c);
return d;
});
var C,
D,
E,
F="inline",
G=function (){
E&&(D.after(E.addClass(C)).detach(), (E=null));
};
a.magnificPopup.registerModule(F, {
options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
proto: {
initInline: function (){
b.types.push(F),
w(h + "." + F, function (){
G();
});
},
getInline: function (c, d){
if((G(), c.src)){
var e=b.st.inline,
f=a(c.src);
if(f.length){
var g=f[0].parentNode;
g&&g.tagName&&(D||((C=e.hiddenClass), (D=x(C)), (C="mfp-" + C)), (E=f.after(D).detach().removeClass(C))), b.updateStatus("ready");
} else b.updateStatus("error", e.tNotFound), (f=a("<div>"));
return (c.inlineElement=f), f;
}
return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
},
},
});
var H,
I="ajax",
J=function (){
H&&a(document.body).removeClass(H);
},
K=function (){
J(), b.req&&b.req.abort();
};
a.magnificPopup.registerModule(I, {
options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
proto: {
initAjax: function (){
b.types.push(I), (H=b.st.ajax.cursor), w(h + "." + I, K), w("BeforeChange." + I, K);
},
getAjax: function (c){
H&&a(document.body).addClass(H), b.updateStatus("loading");
var d=a.extend({
url: c.src,
success: function (d, e, f){
var g={ data: d, xhr: f };
y("ParseAjax", g),
b.appendContent(a(g.data), I),
(c.finished = !0),
J(),
b._setFocus(),
setTimeout(function (){
b.wrap.addClass(q);
}, 16),
b.updateStatus("ready"),
y("AjaxContentAdded");
},
error: function (){
J(), (c.finished=c.loadError = !0), b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src));
},
},
b.st.ajax.settings
);
return (b.req=a.ajax(d)), "";
},
},
});
var L,
M=function (c){
if(c.data&&void 0!==c.data.title) return c.data.title;
var d=b.st.image.titleSrc;
if(d){
if(a.isFunction(d)) return d.call(b, c);
if(c.el) return c.el.attr(d)||"";
}
return "";
};
a.magnificPopup.registerModule("image", {
options: {
markup:
'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
cursor: "mfp-zoom-out-cur",
titleSrc: "title",
verticalFit: !0,
tError: '<a href="%url%">The image</a> could not be loaded.',
},
proto: {
initImage: function (){
var c=b.st.image,
d=".image";
b.types.push("image"),
w(m + d, function (){
"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor);
}),
w(h + d, function (){
c.cursor&&a(document.body).removeClass(c.cursor), v.off("resize" + p);
}),
w("Resize" + d, b.resizeImage),
b.isLowIE&&w("AfterChange", b.resizeImage);
},
resizeImage: function (){
var a=b.currItem;
if(a&&a.img&&b.st.image.verticalFit){
var c=0;
b.isLowIE&&(c=parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c);
}},
_onImageHasSize: function (a){
a.img&&((a.hasSize = !0), L&&clearInterval(L), (a.isCheckingImgSize = !1), y("ImageHasSize", a), a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"), (a.imgHidden = !1)));
},
findImageSize: function (a){
var c=0,
d=a.img[0],
e=function (f){
L&&clearInterval(L),
(L=setInterval(function (){
return d.naturalWidth > 0 ? void b._onImageHasSize(a):(c > 200&&clearInterval(L), c++, void (3===c ? e(10):40===c ? e(50):100===c&&e(500)));
}, f));
};
e(1);
},
getImage: function (c, d){
var e=0,
f=function (){
c &&
(c.img[0].complete
? (c.img.off(".mfploader"), c===b.currItem&&(b._onImageHasSize(c), b.updateStatus("ready")), (c.hasSize = !0), (c.loaded = !0), y("ImageLoadComplete"))
: (e++, 200 > e ? setTimeout(f, 100):g()));
},
g=function (){
c&&(c.img.off(".mfploader"), c===b.currItem&&(b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), (c.hasSize = !0), (c.loaded = !0), (c.loadError = !0));
},
h=b.st.image,
i=d.find(".mfp-img");
if(i.length){
var j=document.createElement("img");
(j.className="mfp-img"),
c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),
(c.img=a(j).on("load.mfploader", f).on("error.mfploader", g)),
(j.src=c.src),
i.is("img")&&(c.img=c.img.clone()),
(j=c.img[0]),
j.naturalWidth > 0 ? (c.hasSize = !0):j.width||(c.hasSize = !1);
}
return (
b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
b.resizeImage(),
c.hasSize
? (L&&clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))):(d.removeClass("mfp-loading"), b.updateStatus("ready")), d)
: (b.updateStatus("loading"), (c.loading = !0), c.hasSize||((c.imgHidden = !0), d.addClass("mfp-loading"), b.findImageSize(c)), d)
);
},
},
});
var N,
O=function (){
return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform), N;
};
a.magnificPopup.registerModule("zoom", {
options: {
enabled: !1,
easing: "ease-in-out",
duration: 300,
opener: function (a){
return a.is("img") ? a:a.find("img");
},
},
proto: {
initZoom: function (){
var a,
c=b.st.zoom,
d=".zoom";
if(c.enabled&&b.supportsTransition){
var e,
f,
g=c.duration,
j=function (a){
var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
d="all " + c.duration / 1e3 + "s " + c.easing,
e={ position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
f="transition";
return (e["-webkit-" + f]=e["-moz-" + f]=e["-o-" + f]=e[f]=d), b.css(e), b;
},
k=function (){
b.content.css("visibility", "visible");
};
w("BuildControls" + d, function (){
if(b._allowZoom()){
if((clearTimeout(e), b.content.css("visibility", "hidden"), (a=b._getItemToZoom()), !a)) return void k();
(f=j(a)),
f.css(b._getOffset()),
b.wrap.append(f),
(e=setTimeout(function (){
f.css(b._getOffset(!0)),
(e=setTimeout(function (){
k(),
setTimeout(function (){
f.remove(), (a=f = null), y("ZoomAnimationEnded");
}, 16);
}, g));
}, 16));
}}),
w(i + d, function (){
if(b._allowZoom()){
if((clearTimeout(e), (b.st.removalDelay=g), !a)){
if(((a=b._getItemToZoom()), !a)) return;
f=j(a);
}
f.css(b._getOffset(!0)),
b.wrap.append(f),
b.content.css("visibility", "hidden"),
setTimeout(function (){
f.css(b._getOffset());
}, 16);
}}),
w(h + d, function (){
b._allowZoom()&&(k(), f&&f.remove(), (a=null));
});
}},
_allowZoom: function (){
return "image"===b.currItem.type;
},
_getItemToZoom: function (){
return b.currItem.hasSize ? b.currItem.img:!1;
},
_getOffset: function (c){
var d;
d=c ? b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);
var e=d.offset(),
f=parseInt(d.css("padding-top"), 10),
g=parseInt(d.css("padding-bottom"), 10);
e.top -=a(window).scrollTop() - f;
var h={ width: d.width(), height: (u ? d.innerHeight():d[0].offsetHeight) - g - f };
return O() ? (h["-moz-transform"]=h.transform="translate(" + e.left + "px," + e.top + "px)"):((h.left=e.left), (h.top=e.top)), h;
},
},
});
var P="iframe",
Q="//about:blank",
R=function (a){
if(b.currTemplate[P]){
var c=b.currTemplate[P].find("iframe");
c.length&&(a||(c[0].src=Q), b.isIE8&&c.css("display", a ? "block":"none"));
}};
a.magnificPopup.registerModule(P, {
options: {
markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="" frameborder="0" allowfullscreen></iframe></div>',
srcAction: "iframe_src",
patterns: {
youtube: { index: "youtube.com", id: "v=", src: "h%id%" },
vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
},
},
proto: {
initIframe: function (){
b.types.push(P),
w("BeforeChange", function (a, b, c){
b!==c&&(b===P ? R():c===P&&R(!0));
}),
w(h + "." + P, function (){
R();
});
},
getIframe: function (c, d){
var e=c.src,
f=b.st.iframe;
a.each(f.patterns, function (){
return e.indexOf(this.index) > -1 ? (this.id&&(e="string"==typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length):this.id.call(this, e)), (e=this.src.replace("%id%", e)), !1):void 0;
});
var g={};
return f.srcAction&&(g[f.srcAction]=e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d;
},
},
});
var S=function (a){
var c=b.items.length;
return a > c - 1 ? a - c:0 > a ? c + a:a;
},
T=function (a, b, c){
return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
};
a.magnificPopup.registerModule("gallery", {
options: {
enabled: !1,
arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
preload: [0, 2],
navigateByImgClick: !0,
arrows: !0,
tPrev: "Previous (Left arrow key)",
tNext: "Next (Right arrow key)",
tCounter: "%curr% of %total%",
},
proto: {
initGallery: function (){
var c=b.st.gallery,
e=".mfp-gallery";
return (
(b.direction = !0),
c&&c.enabled
? ((f +=" mfp-gallery"),
w(m + e, function (){
c.navigateByImgClick &&
b.wrap.on("click" + e, ".mfp-img", function (){
return b.items.length > 1 ? (b.next(), !1):void 0;
}),
d.on("keydown" + e, function (a){
37===a.keyCode ? b.prev():39===a.keyCode&&b.next();
});
}),
w("UpdateStatus" + e, function (a, c){
c.text&&(c.text=T(c.text, b.currItem.index, b.items.length));
}),
w(l + e, function (a, d, e, f){
var g=b.items.length;
e.counter=g > 1 ? T(c.tCounter, f.index, g):"";
}),
w("BuildControls" + e, function (){
if(b.items.length > 1&&c.arrows&&!b.arrowLeft){
var d=c.arrowMarkup,
e=(b.arrowLeft=a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s)),
f=(b.arrowRight=a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s));
e.click(function (){
b.prev();
}),
f.click(function (){
b.next();
}),
b.container.append(e.add(f));
}}),
w(n + e, function (){
b._preloadTimeout&&clearTimeout(b._preloadTimeout),
(b._preloadTimeout=setTimeout(function (){
b.preloadNearbyImages(), (b._preloadTimeout=null);
}, 16));
}),
void w(h + e, function (){
d.off(e), b.wrap.off("click" + e), (b.arrowRight=b.arrowLeft=null);
}))
: !1
);
},
next: function (){
(b.direction = !0), (b.index=S(b.index + 1)), b.updateItemHTML();
},
prev: function (){
(b.direction = !1), (b.index=S(b.index - 1)), b.updateItemHTML();
},
goTo: function (a){
(b.direction=a >=b.index), (b.index=a), b.updateItemHTML();
},
preloadNearbyImages: function (){
var a,
c=b.st.gallery.preload,
d=Math.min(c[0], b.items.length),
e=Math.min(c[1], b.items.length);
for (a=1; a <=(b.direction ? e:d); a++) b._preloadItem(b.index + a);
for (a=1; a <=(b.direction ? d:e); a++) b._preloadItem(b.index - a);
},
_preloadItem: function (c){
if(((c=S(c)), !b.items[c].preloaded)){
var d=b.items[c];
d.parsed||(d=b.parseEl(c)),
y("LazyLoad", d),
"image"===d.type &&
(d.img=a('<img class="mfp-img" />')
.on("load.mfploader", function (){
d.hasSize = !0;
})
.on("error.mfploader", function (){
(d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
})
.attr("src", d.src)),
(d.preloaded = !0);
}},
},
});
var U="retina";
a.magnificPopup.registerModule(U, {
options: {
replaceSrc: function (a){
return a.src.replace(/\.\w+$/, function (a){
return "@2x" + a;
});
},
ratio: 1,
},
proto: {
initRetina: function (){
if(window.devicePixelRatio > 1){
var a=b.st.retina,
c=a.ratio;
(c=isNaN(c) ? c():c),
c > 1 &&
(w("ImageHasSize." + U, function (a, b){
b.img.css({ "max-width": b.img[0].naturalWidth / c, width: "100%" });
}),
w("ElementParse." + U, function (b, d){
d.src=a.replaceSrc(d, c);
}));
}},
},
}),
A();
});
(function ($, window, document){
'use strict';
$.fn.scrollUp=function (options){
if(!$.data(document.body, 'scrollUp')){
$.data(document.body, 'scrollUp', true);
$.fn.scrollUp.init(options);
}};
$.fn.scrollUp.init=function (options){
var o=$.fn.scrollUp.settings=$.extend({}, $.fn.scrollUp.defaults, options),
triggerVisible=false,
animIn, animOut, animSpeed, scrollDis, scrollEvent, scrollTarget, $self;
if(o.scrollTrigger){
$self=$(o.scrollTrigger);
}else{
$self=$('<a/>', {
id: o.scrollName,
href: '#top'
});
}
if(o.scrollTitle){
$self.attr('title', o.scrollTitle);
}
$self.appendTo('body');
if(!(o.scrollImg||o.scrollTrigger)){
$self.html(o.scrollText);
}
$self.css({
display: 'none',
position: 'fixed',
zIndex: o.zIndex
});
if(o.activeOverlay){
$('<div/>', {
id: o.scrollName + '-active'
}).css({
position: 'absolute',
'top': o.scrollDistance + 'px',
width: '100%',
borderTop: '1px dotted' + o.activeOverlay,
zIndex: o.zIndex
}).appendTo('body');
}
switch (o.animation){
case 'fade':
animIn='fadeIn';
animOut='fadeOut';
animSpeed=o.animationSpeed;
break;
case 'slide':
animIn='slideDown';
animOut='slideUp';
animSpeed=o.animationSpeed;
break;
default:
animIn='show';
animOut='hide';
animSpeed=0;
}
if(o.scrollFrom==='top'){
scrollDis=o.scrollDistance;
}else{
scrollDis=$(document).height() - $(window).height() - o.scrollDistance;
}
scrollEvent=$(window).scroll(function (){
if($(window).scrollTop() > scrollDis){
if(!triggerVisible){
$self[animIn](animSpeed);
triggerVisible=true;
}}else{
if(triggerVisible){
$self[animOut](animSpeed);
triggerVisible=false;
}}
});
if(o.scrollTarget){
if(typeof o.scrollTarget==='number'){
scrollTarget=o.scrollTarget;
}else if(typeof o.scrollTarget==='string'){
scrollTarget=Math.floor($(o.scrollTarget).offset().top);
}}else{
scrollTarget=0;
}
$self.click(function (e){
e.preventDefault();
$('html, body').animate({
scrollTop: scrollTarget
}, o.scrollSpeed, o.easingType);
});
};
$.fn.scrollUp.defaults={
scrollName: 'scrollUp',
scrollDistance: 300,
scrollFrom: 'top',           // 'top' or 'bottom'
scrollSpeed: 300,
easingType: 'linear',
animation: 'fade',
animationSpeed: 200,
scrollTrigger: false,
scrollTarget: false,
scrollText: 'Scroll to top',
scrollTitle: false,
scrollImg: false,
activeOverlay: false,
zIndex: 2147483647 
};
$.fn.scrollUp.destroy=function (scrollEvent){
$.removeData(document.body, 'scrollUp');
$('#' + $.fn.scrollUp.settings.scrollName).remove();
$('#' + $.fn.scrollUp.settings.scrollName + '-active').remove();
if($.fn.jquery.split('.')[1] >=7){
$(window).off('scroll', scrollEvent);
}else{
$(window).unbind('scroll', scrollEvent);
}};
$.scrollUp=$.fn.scrollUp;
})(jQuery, window, document);
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.Context.refreshAll();for(var e in i)i[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,n.windowContext||(n.windowContext=!0,n.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s];if(null!==a.triggerPoint){var l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=Math.floor(y+l-f),h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
(function(e,t){'object'==typeof exports&&'undefined'!=typeof module?module.exports=t():'function'==typeof define&&define.amd?define(t):e.Popper=t()})(this,function(){'use strict';function e(e){return e&&'[object Function]'==={}.toString.call(e)}function t(e,t){if(1!==e.nodeType)return[];var o=window.getComputedStyle(e,null);return t?o[t]:o}function o(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function n(e){if(!e||-1!==['HTML','BODY','#document'].indexOf(e.nodeName))return window.document.body;var i=t(e),r=i.overflow,p=i.overflowX,s=i.overflowY;return /(auto|scroll)/.test(r+s+p)?e:n(o(e))}function r(e){var o=e&&e.offsetParent,i=o&&o.nodeName;return i&&'BODY'!==i&&'HTML'!==i?-1!==['TD','TABLE'].indexOf(o.nodeName)&&'static'===t(o,'position')?r(o):o:window.document.documentElement}function p(e){var t=e.nodeName;return'BODY'!==t&&('HTML'===t||r(e.firstElementChild)===e)}function s(e){return null===e.parentNode?e:s(e.parentNode)}function d(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return window.document.documentElement;var o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,i=o?e:t,n=o?t:e,a=document.createRange();a.setStart(i,0),a.setEnd(n,0);var f=a.commonAncestorContainer;if(e!==f&&t!==f||i.contains(n))return p(f)?f:r(f);var l=s(e);return l.host?d(l.host,t):d(e,s(t).host)}function a(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:'top',o='top'===t?'scrollTop':'scrollLeft',i=e.nodeName;if('BODY'===i||'HTML'===i){var n=window.document.documentElement,r=window.document.scrollingElement||n;return r[o]}return e[o]}function f(e,t){var o=2<arguments.length&&void 0!==arguments[2]&&arguments[2],i=a(t,'top'),n=a(t,'left'),r=o?-1:1;return e.top+=i*r,e.bottom+=i*r,e.left+=n*r,e.right+=n*r,e}function l(e,t){var o='x'===t?'Left':'Top',i='Left'==o?'Right':'Bottom';return+e['border'+o+'Width'].split('px')[0]+ +e['border'+i+'Width'].split('px')[0]}function m(e,t,o,i){return _(t['offset'+e],o['client'+e],o['offset'+e],ie()?o['offset'+e]+i['margin'+('Height'===e?'Top':'Left')]+i['margin'+('Height'===e?'Bottom':'Right')]:0)}function h(){var e=window.document.body,t=window.document.documentElement,o=ie()&&window.getComputedStyle(t);return{height:m('Height',e,t,o),width:m('Width',e,t,o)}}function c(e){return se({},e,{right:e.left+e.width,bottom:e.top+e.height})}function g(e){var o={};if(ie())try{o=e.getBoundingClientRect();var i=a(e,'top'),n=a(e,'left');o.top+=i,o.left+=n,o.bottom+=i,o.right+=n}catch(e){}else o=e.getBoundingClientRect();var r={left:o.left,top:o.top,width:o.right-o.left,height:o.bottom-o.top},p='HTML'===e.nodeName?h():{},s=p.width||e.clientWidth||r.right-r.left,d=p.height||e.clientHeight||r.bottom-r.top,f=e.offsetWidth-s,m=e.offsetHeight-d;if(f||m){var g=t(e);f-=l(g,'x'),m-=l(g,'y'),r.width-=f,r.height-=m}return c(r)}function u(e,o){var i=ie(),r='HTML'===o.nodeName,p=g(e),s=g(o),d=n(e),a=t(o),l=+a.borderTopWidth.split('px')[0],m=+a.borderLeftWidth.split('px')[0],h=c({top:p.top-s.top-l,left:p.left-s.left-m,width:p.width,height:p.height});if(h.marginTop=0,h.marginLeft=0,!i&&r){var u=+a.marginTop.split('px')[0],b=+a.marginLeft.split('px')[0];h.top-=l-u,h.bottom-=l-u,h.left-=m-b,h.right-=m-b,h.marginTop=u,h.marginLeft=b}return(i?o.contains(d):o===d&&'BODY'!==d.nodeName)&&(h=f(h,o)),h}function b(e){var t=window.document.documentElement,o=u(e,t),i=_(t.clientWidth,window.innerWidth||0),n=_(t.clientHeight,window.innerHeight||0),r=a(t),p=a(t,'left'),s={top:r-o.top+o.marginTop,left:p-o.left+o.marginLeft,width:i,height:n};return c(s)}function y(e){var i=e.nodeName;return'BODY'===i||'HTML'===i?!1:'fixed'===t(e,'position')||y(o(e))}function w(e,t,i,r){var p={top:0,left:0},s=d(e,t);if('viewport'===r)p=b(s);else{var a;'scrollParent'===r?(a=n(o(e)),'BODY'===a.nodeName&&(a=window.document.documentElement)):'window'===r?a=window.document.documentElement:a=r;var f=u(a,s);if('HTML'===a.nodeName&&!y(s)){var l=h(),m=l.height,c=l.width;p.top+=f.top-f.marginTop,p.bottom=m+f.top,p.left+=f.left-f.marginLeft,p.right=c+f.left}else p=f}return p.left+=i,p.top+=i,p.right-=i,p.bottom-=i,p}function v(e){var t=e.width,o=e.height;return t*o}function E(e,t,o,i,n){var r=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf('auto'))return e;var p=w(o,i,r,n),s={top:{width:p.width,height:t.top-p.top},right:{width:p.right-t.right,height:p.height},bottom:{width:p.width,height:p.bottom-t.bottom},left:{width:t.left-p.left,height:p.height}},d=Object.keys(s).map(function(e){return se({key:e},s[e],{area:v(s[e])})}).sort(function(e,t){return t.area-e.area}),a=d.filter(function(e){var t=e.width,i=e.height;return t>=o.clientWidth&&i>=o.clientHeight}),f=0<a.length?a[0].key:d[0].key,l=e.split('-')[1];return f+(l?'-'+l:'')}function x(e,t,o){var i=d(t,o);return u(o,i)}function O(e){var t=window.getComputedStyle(e),o=parseFloat(t.marginTop)+parseFloat(t.marginBottom),i=parseFloat(t.marginLeft)+parseFloat(t.marginRight),n={width:e.offsetWidth+i,height:e.offsetHeight+o};return n}function L(e){var t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function S(e,t,o){o=o.split('-')[0];var i=O(e),n={width:i.width,height:i.height},r=-1!==['right','left'].indexOf(o),p=r?'top':'left',s=r?'left':'top',d=r?'height':'width',a=r?'width':'height';return n[p]=t[p]+t[d]/2-i[d]/2,n[s]=o===s?t[s]-i[a]:t[L(s)],n}function T(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function C(e,t,o){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===o});var i=T(e,function(e){return e[t]===o});return e.indexOf(i)}function N(t,o,i){var n=void 0===i?t:t.slice(0,C(t,'name',i));return n.forEach(function(t){t.function&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var i=t.function||t.fn;t.enabled&&e(i)&&(o.offsets.popper=c(o.offsets.popper),o.offsets.reference=c(o.offsets.reference),o=i(o,t))}),o}function k(){if(!this.state.isDestroyed){var e={instance:this,styles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=x(this.state,this.popper,this.reference),e.placement=E(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.offsets.popper=S(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position='absolute',e=N(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function W(e,t){return e.some(function(e){var o=e.name,i=e.enabled;return i&&o===t})}function B(e){for(var t=[!1,'ms','Webkit','Moz','O'],o=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<t.length-1;n++){var i=t[n],r=i?''+i+o:e;if('undefined'!=typeof window.document.body.style[r])return r}return null}function D(){return this.state.isDestroyed=!0,W(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.left='',this.popper.style.position='',this.popper.style.top='',this.popper.style[B('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function H(e,t,o,i){var r='BODY'===e.nodeName,p=r?window:e;p.addEventListener(t,o,{passive:!0}),r||H(n(p.parentNode),t,o,i),i.push(p)}function P(e,t,o,i){o.updateBound=i,window.addEventListener('resize',o.updateBound,{passive:!0});var r=n(e);return H(r,'scroll',o.updateBound,o.scrollParents),o.scrollElement=r,o.eventsEnabled=!0,o}function A(){this.state.eventsEnabled||(this.state=P(this.reference,this.options,this.state,this.scheduleUpdate))}function M(e,t){return window.removeEventListener('resize',t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function I(){this.state.eventsEnabled&&(window.cancelAnimationFrame(this.scheduleUpdate),this.state=M(this.reference,this.state))}function R(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function U(e,t){Object.keys(t).forEach(function(o){var i='';-1!==['width','height','top','right','bottom','left'].indexOf(o)&&R(t[o])&&(i='px'),e.style[o]=t[o]+i})}function Y(e,t){Object.keys(t).forEach(function(o){var i=t[o];!1===i?e.removeAttribute(o):e.setAttribute(o,t[o])})}function F(e,t,o){var i=T(e,function(e){var o=e.name;return o===t}),n=!!i&&e.some(function(e){return e.name===o&&e.enabled&&e.order<i.order});if(!n){var r='`'+t+'`';console.warn('`'+o+'`'+' modifier is required by '+r+' modifier in order to work, be sure to include it before '+r+'!')}return n}function j(e){return'end'===e?'start':'start'===e?'end':e}function K(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],o=ae.indexOf(e),i=ae.slice(o+1).concat(ae.slice(0,o));return t?i.reverse():i}function q(e,t,o,i){var n=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+n[1],p=n[2];if(!r)return e;if(0===p.indexOf('%')){var s;switch(p){case'%p':s=o;break;case'%':case'%r':default:s=i;}var d=c(s);return d[t]/100*r}if('vh'===p||'vw'===p){var a;return a='vh'===p?_(document.documentElement.clientHeight,window.innerHeight||0):_(document.documentElement.clientWidth,window.innerWidth||0),a/100*r}return r}function G(e,t,o,i){var n=[0,0],r=-1!==['right','left'].indexOf(i),p=e.split(/(\+|\-)/).map(function(e){return e.trim()}),s=p.indexOf(T(p,function(e){return-1!==e.search(/,|\s/)}));p[s]&&-1===p[s].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var d=/\s*,\s*|\s+/,a=-1===s?[p]:[p.slice(0,s).concat([p[s].split(d)[0]]),[p[s].split(d)[1]].concat(p.slice(s+1))];return a=a.map(function(e,i){var n=(1===i?!r:r)?'height':'width',p=!1;return e.reduce(function(e,t){return''===e[e.length-1]&&-1!==['+','-'].indexOf(t)?(e[e.length-1]=t,p=!0,e):p?(e[e.length-1]+=t,p=!1,e):e.concat(t)},[]).map(function(e){return q(e,n,t,o)})}),a.forEach(function(e,t){e.forEach(function(o,i){R(o)&&(n[t]+=o*('-'===e[i-1]?-1:1))})}),n}for(var z=Math.min,V=Math.floor,_=Math.max,X=['native code','[object MutationObserverConstructor]'],Q=function(e){return X.some(function(t){return-1<(e||'').toString().indexOf(t)})},J='undefined'!=typeof window,Z=['Edge','Trident','Firefox'],$=0,ee=0;ee<Z.length;ee+=1)if(J&&0<=navigator.userAgent.indexOf(Z[ee])){$=1;break}var i,te=J&&Q(window.MutationObserver),oe=te?function(e){var t=!1,o=0,i=document.createElement('span'),n=new MutationObserver(function(){e(),t=!1});return n.observe(i,{attributes:!0}),function(){t||(t=!0,i.setAttribute('x-index',o),++o)}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},$))}},ie=function(){return void 0==i&&(i=-1!==navigator.appVersion.indexOf('MSIE 10')),i},ne=function(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')},re=function(){function e(e,t){for(var o,n=0;n<t.length;n++)o=t[n],o.enumerable=o.enumerable||!1,o.configurable=!0,'value'in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),pe=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e},se=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var i in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},de=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'],ae=de.slice(3),fe={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'},le=function(){function t(o,i){var n=this,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};ne(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},this.update=oe(this.update.bind(this)),this.options=se({},t.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=o.jquery?o[0]:o,this.popper=i.jquery?i[0]:i,this.options.modifiers={},Object.keys(se({},t.Defaults.modifiers,r.modifiers)).forEach(function(e){n.options.modifiers[e]=se({},t.Defaults.modifiers[e]||{},r.modifiers?r.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return se({name:e},n.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(t){t.enabled&&e(t.onLoad)&&t.onLoad(n.reference,n.popper,n.options,t,n.state)}),this.update();var p=this.options.eventsEnabled;p&&this.enableEventListeners(),this.state.eventsEnabled=p}return re(t,[{key:'update',value:function(){return k.call(this)}},{key:'destroy',value:function(){return D.call(this)}},{key:'enableEventListeners',value:function(){return A.call(this)}},{key:'disableEventListeners',value:function(){return I.call(this)}}]),t}();return le.Utils=('undefined'==typeof window?global:window).PopperUtils,le.placements=de,le.Defaults={placement:'bottom',eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,o=t.split('-')[0],i=t.split('-')[1];if(i){var n=e.offsets,r=n.reference,p=n.popper,s=-1!==['bottom','top'].indexOf(o),d=s?'left':'top',a=s?'width':'height',f={start:pe({},d,r[d]),end:pe({},d,r[d]+r[a]-p[a])};e.offsets.popper=se({},p,f[i])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var o,i=t.offset,n=e.placement,r=e.offsets,p=r.popper,s=r.reference,d=n.split('-')[0];return o=R(+i)?[+i,0]:G(i,p,s,d),'left'===d?(p.top+=o[0],p.left-=o[1]):'right'===d?(p.top+=o[0],p.left+=o[1]):'top'===d?(p.left+=o[0],p.top-=o[1]):'bottom'===d&&(p.left+=o[0],p.top+=o[1]),e.popper=p,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var o=t.boundariesElement||r(e.instance.popper);e.instance.reference===o&&(o=r(o));var i=w(e.instance.popper,e.instance.reference,t.padding,o);t.boundaries=i;var n=t.priority,p=e.offsets.popper,s={primary:function(e){var o=p[e];return p[e]<i[e]&&!t.escapeWithReference&&(o=_(p[e],i[e])),pe({},e,o)},secondary:function(e){var o='right'===e?'left':'top',n=p[o];return p[e]>i[e]&&!t.escapeWithReference&&(n=z(p[o],i[e]-('right'===e?p.width:p.height))),pe({},o,n)}};return n.forEach(function(e){var t=-1===['left','top'].indexOf(e)?'secondary':'primary';p=se({},p,s[t](e))}),e.offsets.popper=p,e},priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,o=t.popper,i=t.reference,n=e.placement.split('-')[0],r=V,p=-1!==['top','bottom'].indexOf(n),s=p?'right':'bottom',d=p?'left':'top',a=p?'width':'height';return o[s]<r(i[d])&&(e.offsets.popper[d]=r(i[d])-o[a]),o[d]>r(i[s])&&(e.offsets.popper[d]=r(i[s])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){if(!F(e.instance.modifiers,'arrow','keepTogether'))return e;var o=t.element;if('string'==typeof o){if(o=e.instance.popper.querySelector(o),!o)return e;}else if(!e.instance.popper.contains(o))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;var i=e.placement.split('-')[0],n=e.offsets,r=n.popper,p=n.reference,s=-1!==['left','right'].indexOf(i),d=s?'height':'width',a=s?'top':'left',f=s?'left':'top',l=s?'bottom':'right',m=O(o)[d];p[l]-m<r[a]&&(e.offsets.popper[a]-=r[a]-(p[l]-m)),p[a]+m>r[l]&&(e.offsets.popper[a]+=p[a]+m-r[l]);var h=p[a]+p[d]/2-m/2,g=h-c(e.offsets.popper)[a];return g=_(z(r[d]-m,g),0),e.arrowElement=o,e.offsets.arrow={},e.offsets.arrow[a]=Math.round(g),e.offsets.arrow[f]='',e},element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:function(e,t){if(W(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var o=w(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement),i=e.placement.split('-')[0],n=L(i),r=e.placement.split('-')[1]||'',p=[];switch(t.behavior){case fe.FLIP:p=[i,n];break;case fe.CLOCKWISE:p=K(i);break;case fe.COUNTERCLOCKWISE:p=K(i,!0);break;default:p=t.behavior;}return p.forEach(function(s,d){if(i!==s||p.length===d+1)return e;i=e.placement.split('-')[0],n=L(i);var a=e.offsets.popper,f=e.offsets.reference,l=V,m='left'===i&&l(a.right)>l(f.left)||'right'===i&&l(a.left)<l(f.right)||'top'===i&&l(a.bottom)>l(f.top)||'bottom'===i&&l(a.top)<l(f.bottom),h=l(a.left)<l(o.left),c=l(a.right)>l(o.right),g=l(a.top)<l(o.top),u=l(a.bottom)>l(o.bottom),b='left'===i&&h||'right'===i&&c||'top'===i&&g||'bottom'===i&&u,y=-1!==['top','bottom'].indexOf(i),w=!!t.flipVariations&&(y&&'start'===r&&h||y&&'end'===r&&c||!y&&'start'===r&&g||!y&&'end'===r&&u);(m||b||w)&&(e.flipped=!0,(m||b)&&(i=p[d+1]),w&&(r=j(r)),e.placement=i+(r?'-'+r:''),e.offsets.popper=se({},e.offsets.popper,S(e.instance.popper,e.offsets.reference,e.placement)),e=N(e.instance.modifiers,e,'flip'))}),e},behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,o=t.split('-')[0],i=e.offsets,n=i.popper,r=i.reference,p=-1!==['left','right'].indexOf(o),s=-1===['top','left'].indexOf(o);return n[p?'left':'top']=r[t]-(s?n[p?'width':'height']:0),e.placement=L(t),e.offsets.popper=c(n),e}},hide:{order:800,enabled:!0,fn:function(e){if(!F(e.instance.modifiers,'hide','preventOverflow'))return e;var t=e.offsets.reference,o=T(e.instance.modifiers,function(e){return'preventOverflow'===e.name}).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var o=t.x,i=t.y,n=e.offsets.popper,p=T(e.instance.modifiers,function(e){return'applyStyle'===e.name}).gpuAcceleration;void 0!==p&&console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var s,d,a=void 0===p?t.gpuAcceleration:p,f=r(e.instance.popper),l=g(f),m={position:n.position},h={left:V(n.left),top:V(n.top),bottom:V(n.bottom),right:V(n.right)},c='bottom'===o?'top':'bottom',u='right'===i?'left':'right',b=B('transform');if(d='bottom'==c?-l.height+h.bottom:h.top,s='right'==u?-l.width+h.right:h.left,a&&b)m[b]='translate3d('+s+'px, '+d+'px, 0)',m[c]=0,m[u]=0,m.willChange='transform';else{var y='bottom'==c?-1:1,w='right'==u?-1:1;m[c]=d*y,m[u]=s*w,m.willChange=c+', '+u}var v={"x-placement":e.placement};return e.attributes=se({},v,e.attributes),e.styles=se({},m,e.styles),e},gpuAcceleration:!0,x:'bottom',y:'right'},applyStyle:{order:900,enabled:!0,fn:function(e){return U(e.instance.popper,e.styles),Y(e.instance.popper,e.attributes),e.offsets.arrow&&U(e.arrowElement,e.offsets.arrow),e},onLoad:function(e,t,o,i,n){var r=x(n,t,e),p=E(o.placement,r,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute('x-placement',p),U(t,{position:'absolute'}),o},gpuAcceleration:void 0}}},le});
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("jquery"),require("popper.js")):"function"==typeof define&&define.amd?define(["exports","jquery","popper.js"],e):e(t.bootstrap={},t.jQuery,t.Popper)}(this,function(t,e,h){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function l(r){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},e=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(o).filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable}))),e.forEach(function(t){var e,n,i;e=r,i=o[n=t],n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i})}return r}e=e&&e.hasOwnProperty("default")?e.default:e,h=h&&h.hasOwnProperty("default")?h.default:h;var r,n,o,a,c,u,f,d,g,_,m,p,v,y,E,C,T,b,S,I,A,D,w,N,O,k,P,j,H,L,R,x,W,U,q,F,K,M,Q,B,V,Y,z,J,Z,G,$,X,tt,et,nt,it,rt,ot,st,at,lt,ct,ht,ut,ft,dt,gt,_t,mt,pt,vt,yt,Et,Ct,Tt,bt,St,It,At,Dt,wt,Nt,Ot,kt,Pt,jt,Ht,Lt,Rt,xt,Wt,Ut,qt,Ft,Kt,Mt,Qt,Bt,Vt,Yt,zt,Jt,Zt,Gt,$t,Xt,te,ee,ne,ie,re,oe,se,ae,le,ce,he,ue,fe,de,ge,_e,me,pe,ve,ye,Ee,Ce,Te,be,Se,Ie,Ae,De,we,Ne,Oe,ke,Pe,je,He,Le,Re,xe,We,Ue,qe,Fe,Ke,Me,Qe,Be,Ve,Ye,ze,Je,Ze,Ge,$e,Xe,tn,en,nn,rn,on,sn,an,ln,cn,hn,un,fn,dn,gn,_n,mn,pn,vn,yn,En,Cn,Tn,bn,Sn,In,An,Dn,wn,Nn,On,kn,Pn,jn,Hn,Ln,Rn,xn,Wn,Un,qn,Fn=function(i){var e="transitionend";function t(t){var e=this,n=!1;return i(this).one(l.TRANSITION_END,function(){n=!0}),setTimeout(function(){n||l.triggerTransitionEnd(e)},t),this}var l={TRANSITION_END:"bsTransitionEnd",getUID:function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},getSelectorFromElement:function(t){var e=t.getAttribute("data-target");e&&"#"!==e||(e=t.getAttribute("href")||"");try{return document.querySelector(e)?e:null}catch(t){return null}},getTransitionDurationFromElement:function(t){if(!t)return 0;var e=i(t).css("transition-duration");return parseFloat(e)?(e=e.split(",")[0],1e3*parseFloat(e)):0},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(t){i(t).trigger(e)},supportsTransitionEnd:function(){return Boolean(e)},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,e,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var r=n[i],o=e[i],s=o&&l.isElement(o)?"element":(a=o,{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if(!new RegExp(r).test(s))throw new Error(t.toUpperCase()+': Option "'+i+'" provided type "'+s+'" but expected type "'+r+'".')}var a}};return i.fn.emulateTransitionEnd=t,i.event.special[l.TRANSITION_END]={bindType:e,delegateType:e,handle:function(t){if(i(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}},l}(e),Kn=(n="alert",a="."+(o="bs.alert"),c=(r=e).fn[n],u={CLOSE:"close"+a,CLOSED:"closed"+a,CLICK_DATA_API:"click"+a+".data-api"},f="alert",d="fade",g="show",_=function(){function i(t){this._element=t}var t=i.prototype;return t.close=function(t){var e=this._element;t&&(e=this._getRootElement(t)),this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},t.dispose=function(){r.removeData(this._element,o),this._element=null},t._getRootElement=function(t){var e=Fn.getSelectorFromElement(t),n=!1;return e&&(n=document.querySelector(e)),n||(n=r(t).closest("."+f)[0]),n},t._triggerCloseEvent=function(t){var e=r.Event(u.CLOSE);return r(t).trigger(e),e},t._removeElement=function(e){var n=this;if(r(e).removeClass(g),r(e).hasClass(d)){var t=Fn.getTransitionDurationFromElement(e);r(e).one(Fn.TRANSITION_END,function(t){return n._destroyElement(e,t)}).emulateTransitionEnd(t)}else this._destroyElement(e)},t._destroyElement=function(t){r(t).detach().trigger(u.CLOSED).remove()},i._jQueryInterface=function(n){return this.each(function(){var t=r(this),e=t.data(o);e||(e=new i(this),t.data(o,e)),"close"===n&&e[n](this)})},i._handleDismiss=function(e){return function(t){t&&t.preventDefault(),e.close(this)}},s(i,null,[{key:"VERSION",get:function(){return"4.1.3"}}]),i}(),r(document).on(u.CLICK_DATA_API,'[data-dismiss="alert"]',_._handleDismiss(new _)),r.fn[n]=_._jQueryInterface,r.fn[n].Constructor=_,r.fn[n].noConflict=function(){return r.fn[n]=c,_._jQueryInterface},_),Mn=(p="button",y="."+(v="bs.button"),E=".data-api",C=(m=e).fn[p],T="active",b="btn",I='[data-toggle^="button"]',A='[data-toggle="buttons"]',D="input",w=".active",N=".btn",O={CLICK_DATA_API:"click"+y+E,FOCUS_BLUR_DATA_API:(S="focus")+y+E+" blur"+y+E},k=function(){function n(t){this._element=t}var t=n.prototype;return t.toggle=function(){var t=!0,e=!0,n=m(this._element).closest(A)[0];if(n){var i=this._element.querySelector(D);if(i){if("radio"===i.type)if(i.checked&&this._element.classList.contains(T))t=!1;else{var r=n.querySelector(w);r&&m(r).removeClass(T)}if(t){if(i.hasAttribute("disabled")||n.hasAttribute("disabled")||i.classList.contains("disabled")||n.classList.contains("disabled"))return;i.checked=!this._element.classList.contains(T),m(i).trigger("change")}i.focus(),e=!1}}e&&this._element.setAttribute("aria-pressed",!this._element.classList.contains(T)),t&&m(this._element).toggleClass(T)},t.dispose=function(){m.removeData(this._element,v),this._element=null},n._jQueryInterface=function(e){return this.each(function(){var t=m(this).data(v);t||(t=new n(this),m(this).data(v,t)),"toggle"===e&&t[e]()})},s(n,null,[{key:"VERSION",get:function(){return"4.1.3"}}]),n}(),m(document).on(O.CLICK_DATA_API,I,function(t){t.preventDefault();var e=t.target;m(e).hasClass(b)||(e=m(e).closest(N)),k._jQueryInterface.call(m(e),"toggle")}).on(O.FOCUS_BLUR_DATA_API,I,function(t){var e=m(t.target).closest(N)[0];m(e).toggleClass(S,/^focus(in)?$/.test(t.type))}),m.fn[p]=k._jQueryInterface,m.fn[p].Constructor=k,m.fn[p].noConflict=function(){return m.fn[p]=C,k._jQueryInterface},k),Qn=(j="carousel",L="."+(H="bs.carousel"),R=".data-api",x=(P=e).fn[j],W={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},U={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},q="next",F="prev",K="left",M="right",Q={SLIDE:"slide"+L,SLID:"slid"+L,KEYDOWN:"keydown"+L,MOUSEENTER:"mouseenter"+L,MOUSELEAVE:"mouseleave"+L,TOUCHEND:"touchend"+L,LOAD_DATA_API:"load"+L+R,CLICK_DATA_API:"click"+L+R},B="carousel",V="active",Y="slide",z="carousel-item-right",J="carousel-item-left",Z="carousel-item-next",G="carousel-item-prev",$=".active",X=".active.carousel-item",tt=".carousel-item",et=".carousel-item-next, .carousel-item-prev",nt=".carousel-indicators",it="[data-slide], [data-slide-to]",rt='[data-ride="carousel"]',ot=function(){function o(t,e){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(e),this._element=P(t)[0],this._indicatorsElement=this._element.querySelector(nt),this._addEventListeners()}var t=o.prototype;return t.next=function(){this._isSliding||this._slide(q)},t.nextWhenVisible=function(){!document.hidden&&P(this._element).is(":visible")&&"hidden"!==P(this._element).css("visibility")&&this.next()},t.prev=function(){this._isSliding||this._slide(F)},t.pause=function(t){t||(this._isPaused=!0),this._element.querySelector(et)&&(Fn.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},t.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},t.to=function(t){var e=this;this._activeElement=this._element.querySelector(X);var n=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)P(this._element).one(Q.SLID,function(){return e.to(t)});else{if(n===t)return this.pause(),void this.cycle();var i=n<t?q:F;this._slide(i,this._items[t])}},t.dispose=function(){P(this._element).off(L),P.removeData(this._element,H),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},t._getConfig=function(t){return t=l({},W,t),Fn.typeCheckConfig(j,t,U),t},t._addEventListeners=function(){var e=this;this._config.keyboard&&P(this._element).on(Q.KEYDOWN,function(t){return e._keydown(t)}),"hover"===this._config.pause&&(P(this._element).on(Q.MOUSEENTER,function(t){return e.pause(t)}).on(Q.MOUSELEAVE,function(t){return e.cycle(t)}),"ontouchstart"in document.documentElement&&P(this._element).on(Q.TOUCHEND,function(){e.pause(),e.touchTimeout&&clearTimeout(e.touchTimeout),e.touchTimeout=setTimeout(function(t){return e.cycle(t)},500+e._config.interval)}))},t._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next()}},t._getItemIndex=function(t){return this._items=t&&t.parentNode?[].slice.call(t.parentNode.querySelectorAll(tt)):[],this._items.indexOf(t)},t._getItemByDirection=function(t,e){var n=t===q,i=t===F,r=this._getItemIndex(e),o=this._items.length-1;if((i&&0===r||n&&r===o)&&!this._config.wrap)return e;var s=(r+(t===F?-1:1))%this._items.length;return-1===s?this._items[this._items.length-1]:this._items[s]},t._triggerSlideEvent=function(t,e){var n=this._getItemIndex(t),i=this._getItemIndex(this._element.querySelector(X)),r=P.Event(Q.SLIDE,{relatedTarget:t,direction:e,from:i,to:n});return P(this._element).trigger(r),r},t._setActiveIndicatorElement=function(t){if(this._indicatorsElement){var e=[].slice.call(this._indicatorsElement.querySelectorAll($));P(e).removeClass(V);var n=this._indicatorsElement.children[this._getItemIndex(t)];n&&P(n).addClass(V)}},t._slide=function(t,e){var n,i,r,o=this,s=this._element.querySelector(X),a=this._getItemIndex(s),l=e||s&&this._getItemByDirection(t,s),c=this._getItemIndex(l),h=Boolean(this._interval);if(t===q?(n=J,i=Z,r=K):(n=z,i=G,r=M),l&&P(l).hasClass(V))this._isSliding=!1;else if(!this._triggerSlideEvent(l,r).isDefaultPrevented()&&s&&l){this._isSliding=!0,h&&this.pause(),this._setActiveIndicatorElement(l);var u=P.Event(Q.SLID,{relatedTarget:l,direction:r,from:a,to:c});if(P(this._element).hasClass(Y)){P(l).addClass(i),Fn.reflow(l),P(s).addClass(n),P(l).addClass(n);var f=Fn.getTransitionDurationFromElement(s);P(s).one(Fn.TRANSITION_END,function(){P(l).removeClass(n+" "+i).addClass(V),P(s).removeClass(V+" "+i+" "+n),o._isSliding=!1,setTimeout(function(){return P(o._element).trigger(u)},0)}).emulateTransitionEnd(f)}else P(s).removeClass(V),P(l).addClass(V),this._isSliding=!1,P(this._element).trigger(u);h&&this.cycle()}},o._jQueryInterface=function(i){return this.each(function(){var t=P(this).data(H),e=l({},W,P(this).data());"object"==typeof i&&(e=l({},e,i));var n="string"==typeof i?i:e.slide;if(t||(t=new o(this,e),P(this).data(H,t)),"number"==typeof i)t.to(i);else if("string"==typeof n){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n]()}else e.interval&&(t.pause(),t.cycle())})},o._dataApiClickHandler=function(t){var e=Fn.getSelectorFromElement(this);if(e){var n=P(e)[0];if(n&&P(n).hasClass(B)){var i=l({},P(n).data(),P(this).data()),r=this.getAttribute("data-slide-to");r&&(i.interval=!1),o._jQueryInterface.call(P(n),i),r&&P(n).data(H).to(r),t.preventDefault()}}},s(o,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return W}}]),o}(),P(document).on(Q.CLICK_DATA_API,it,ot._dataApiClickHandler),P(window).on(Q.LOAD_DATA_API,function(){for(var t=[].slice.call(document.querySelectorAll(rt)),e=0,n=t.length;e<n;e++){var i=P(t[e]);ot._jQueryInterface.call(i,i.data())}}),P.fn[j]=ot._jQueryInterface,P.fn[j].Constructor=ot,P.fn[j].noConflict=function(){return P.fn[j]=x,ot._jQueryInterface},ot),Bn=(at="collapse",ct="."+(lt="bs.collapse"),ht=(st=e).fn[at],ut={toggle:!0,parent:""},ft={toggle:"boolean",parent:"(string|element)"},dt={SHOW:"show"+ct,SHOWN:"shown"+ct,HIDE:"hide"+ct,HIDDEN:"hidden"+ct,CLICK_DATA_API:"click"+ct+".data-api"},gt="show",_t="collapse",mt="collapsing",pt="collapsed",vt="width",yt="height",Et=".show, .collapsing",Ct='[data-toggle="collapse"]',Tt=function(){function a(e,t){this._isTransitioning=!1,this._element=e,this._config=this._getConfig(t),this._triggerArray=st.makeArray(document.querySelectorAll('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'));for(var n=[].slice.call(document.querySelectorAll(Ct)),i=0,r=n.length;i<r;i++){var o=n[i],s=Fn.getSelectorFromElement(o),a=[].slice.call(document.querySelectorAll(s)).filter(function(t){return t===e});null!==s&&0<a.length&&(this._selector=s,this._triggerArray.push(o))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var t=a.prototype;return t.toggle=function(){st(this._element).hasClass(gt)?this.hide():this.show()},t.show=function(){var t,e,n=this;if(!this._isTransitioning&&!st(this._element).hasClass(gt)&&(this._parent&&0===(t=[].slice.call(this._parent.querySelectorAll(Et)).filter(function(t){return t.getAttribute("data-parent")===n._config.parent})).length&&(t=null),!(t&&(e=st(t).not(this._selector).data(lt))&&e._isTransitioning))){var i=st.Event(dt.SHOW);if(st(this._element).trigger(i),!i.isDefaultPrevented()){t&&(a._jQueryInterface.call(st(t).not(this._selector),"hide"),e||st(t).data(lt,null));var r=this._getDimension();st(this._element).removeClass(_t).addClass(mt),this._element.style[r]=0,this._triggerArray.length&&st(this._triggerArray).removeClass(pt).attr("aria-expanded",!0),this.setTransitioning(!0);var o="scroll"+(r[0].toUpperCase()+r.slice(1)),s=Fn.getTransitionDurationFromElement(this._element);st(this._element).one(Fn.TRANSITION_END,function(){st(n._element).removeClass(mt).addClass(_t).addClass(gt),n._element.style[r]="",n.setTransitioning(!1),st(n._element).trigger(dt.SHOWN)}).emulateTransitionEnd(s),this._element.style[r]=this._element[o]+"px"}}},t.hide=function(){var t=this;if(!this._isTransitioning&&st(this._element).hasClass(gt)){var e=st.Event(dt.HIDE);if(st(this._element).trigger(e),!e.isDefaultPrevented()){var n=this._getDimension();this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",Fn.reflow(this._element),st(this._element).addClass(mt).removeClass(_t).removeClass(gt);var i=this._triggerArray.length;if(0<i)for(var r=0;r<i;r++){var o=this._triggerArray[r],s=Fn.getSelectorFromElement(o);if(null!==s)st([].slice.call(document.querySelectorAll(s))).hasClass(gt)||st(o).addClass(pt).attr("aria-expanded",!1)}this.setTransitioning(!0);this._element.style[n]="";var a=Fn.getTransitionDurationFromElement(this._element);st(this._element).one(Fn.TRANSITION_END,function(){t.setTransitioning(!1),st(t._element).removeClass(mt).addClass(_t).trigger(dt.HIDDEN)}).emulateTransitionEnd(a)}}},t.setTransitioning=function(t){this._isTransitioning=t},t.dispose=function(){st.removeData(this._element,lt),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},t._getConfig=function(t){return(t=l({},ut,t)).toggle=Boolean(t.toggle),Fn.typeCheckConfig(at,t,ft),t},t._getDimension=function(){return st(this._element).hasClass(vt)?vt:yt},t._getParent=function(){var n=this,t=null;Fn.isElement(this._config.parent)?(t=this._config.parent,"undefined"!=typeof this._config.parent.jquery&&(t=this._config.parent[0])):t=document.querySelector(this._config.parent);var e='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',i=[].slice.call(t.querySelectorAll(e));return st(i).each(function(t,e){n._addAriaAndCollapsedClass(a._getTargetFromElement(e),[e])}),t},t._addAriaAndCollapsedClass=function(t,e){if(t){var n=st(t).hasClass(gt);e.length&&st(e).toggleClass(pt,!n).attr("aria-expanded",n)}},a._getTargetFromElement=function(t){var e=Fn.getSelectorFromElement(t);return e?document.querySelector(e):null},a._jQueryInterface=function(i){return this.each(function(){var t=st(this),e=t.data(lt),n=l({},ut,t.data(),"object"==typeof i&&i?i:{});if(!e&&n.toggle&&/show|hide/.test(i)&&(n.toggle=!1),e||(e=new a(this,n),t.data(lt,e)),"string"==typeof i){if("undefined"==typeof e[i])throw new TypeError('No method named "'+i+'"');e[i]()}})},s(a,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return ut}}]),a}(),st(document).on(dt.CLICK_DATA_API,Ct,function(t){"A"===t.currentTarget.tagName&&t.preventDefault();var n=st(this),e=Fn.getSelectorFromElement(this),i=[].slice.call(document.querySelectorAll(e));st(i).each(function(){var t=st(this),e=t.data(lt)?"toggle":n.data();Tt._jQueryInterface.call(t,e)})}),st.fn[at]=Tt._jQueryInterface,st.fn[at].Constructor=Tt,st.fn[at].noConflict=function(){return st.fn[at]=ht,Tt._jQueryInterface},Tt),Vn=(St="dropdown",At="."+(It="bs.dropdown"),Dt=".data-api",wt=(bt=e).fn[St],Nt=new RegExp("38|40|27"),Ot={HIDE:"hide"+At,HIDDEN:"hidden"+At,SHOW:"show"+At,SHOWN:"shown"+At,CLICK:"click"+At,CLICK_DATA_API:"click"+At+Dt,KEYDOWN_DATA_API:"keydown"+At+Dt,KEYUP_DATA_API:"keyup"+At+Dt},kt="disabled",Pt="show",jt="dropup",Ht="dropright",Lt="dropleft",Rt="dropdown-menu-right",xt="position-static",Wt='[data-toggle="dropdown"]',Ut=".dropdown form",qt=".dropdown-menu",Ft=".navbar-nav",Kt=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",Mt="top-start",Qt="top-end",Bt="bottom-start",Vt="bottom-end",Yt="right-start",zt="left-start",Jt={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic"},Zt={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string"},Gt=function(){function c(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var t=c.prototype;return t.toggle=function(){if(!this._element.disabled&&!bt(this._element).hasClass(kt)){var t=c._getParentFromElement(this._element),e=bt(this._menu).hasClass(Pt);if(c._clearMenus(),!e){var n={relatedTarget:this._element},i=bt.Event(Ot.SHOW,n);if(bt(t).trigger(i),!i.isDefaultPrevented()){if(!this._inNavbar){if("undefined"==typeof h)throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");var r=this._element;"parent"===this._config.reference?r=t:Fn.isElement(this._config.reference)&&(r=this._config.reference,"undefined"!=typeof this._config.reference.jquery&&(r=this._config.reference[0])),"scrollParent"!==this._config.boundary&&bt(t).addClass(xt),this._popper=new h(r,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===bt(t).closest(Ft).length&&bt(document.body).children().on("mouseover",null,bt.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),bt(this._menu).toggleClass(Pt),bt(t).toggleClass(Pt).trigger(bt.Event(Ot.SHOWN,n))}}}},t.dispose=function(){bt.removeData(this._element,It),bt(this._element).off(At),this._element=null,(this._menu=null)!==this._popper&&(this._popper.destroy(),this._popper=null)},t.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},t._addEventListeners=function(){var e=this;bt(this._element).on(Ot.CLICK,function(t){t.preventDefault(),t.stopPropagation(),e.toggle()})},t._getConfig=function(t){return t=l({},this.constructor.Default,bt(this._element).data(),t),Fn.typeCheckConfig(St,t,this.constructor.DefaultType),t},t._getMenuElement=function(){if(!this._menu){var t=c._getParentFromElement(this._element);t&&(this._menu=t.querySelector(qt))}return this._menu},t._getPlacement=function(){var t=bt(this._element.parentNode),e=Bt;return t.hasClass(jt)?(e=Mt,bt(this._menu).hasClass(Rt)&&(e=Qt)):t.hasClass(Ht)?e=Yt:t.hasClass(Lt)?e=zt:bt(this._menu).hasClass(Rt)&&(e=Vt),e},t._detectNavbar=function(){return 0<bt(this._element).closest(".navbar").length},t._getPopperConfig=function(){var e=this,t={};"function"==typeof this._config.offset?t.fn=function(t){return t.offsets=l({},t.offsets,e._config.offset(t.offsets)||{}),t}:t.offset=this._config.offset;var n={placement:this._getPlacement(),modifiers:{offset:t,flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(n.modifiers.applyStyle={enabled:!1}),n},c._jQueryInterface=function(e){return this.each(function(){var t=bt(this).data(It);if(t||(t=new c(this,"object"==typeof e?e:null),bt(this).data(It,t)),"string"==typeof e){if("undefined"==typeof t[e])throw new TypeError('No method named "'+e+'"');t[e]()}})},c._clearMenus=function(t){if(!t||3!==t.which&&("keyup"!==t.type||9===t.which))for(var e=[].slice.call(document.querySelectorAll(Wt)),n=0,i=e.length;n<i;n++){var r=c._getParentFromElement(e[n]),o=bt(e[n]).data(It),s={relatedTarget:e[n]};if(t&&"click"===t.type&&(s.clickEvent=t),o){var a=o._menu;if(bt(r).hasClass(Pt)&&!(t&&("click"===t.type&&/input|textarea/i.test(t.target.tagName)||"keyup"===t.type&&9===t.which)&&bt.contains(r,t.target))){var l=bt.Event(Ot.HIDE,s);bt(r).trigger(l),l.isDefaultPrevented()||("ontouchstart"in document.documentElement&&bt(document.body).children().off("mouseover",null,bt.noop),e[n].setAttribute("aria-expanded","false"),bt(a).removeClass(Pt),bt(r).removeClass(Pt).trigger(bt.Event(Ot.HIDDEN,s)))}}}},c._getParentFromElement=function(t){var e,n=Fn.getSelectorFromElement(t);return n&&(e=document.querySelector(n)),e||t.parentNode},c._dataApiKeydownHandler=function(t){if((/input|textarea/i.test(t.target.tagName)?!(32===t.which||27!==t.which&&(40!==t.which&&38!==t.which||bt(t.target).closest(qt).length)):Nt.test(t.which))&&(t.preventDefault(),t.stopPropagation(),!this.disabled&&!bt(this).hasClass(kt))){var e=c._getParentFromElement(this),n=bt(e).hasClass(Pt);if((n||27===t.which&&32===t.which)&&(!n||27!==t.which&&32!==t.which)){var i=[].slice.call(e.querySelectorAll(Kt));if(0!==i.length){var r=i.indexOf(t.target);38===t.which&&0<r&&r--,40===t.which&&r<i.length-1&&r++,r<0&&(r=0),i[r].focus()}}else{if(27===t.which){var o=e.querySelector(Wt);bt(o).trigger("focus")}bt(this).trigger("click")}}},s(c,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return Jt}},{key:"DefaultType",get:function(){return Zt}}]),c}(),bt(document).on(Ot.KEYDOWN_DATA_API,Wt,Gt._dataApiKeydownHandler).on(Ot.KEYDOWN_DATA_API,qt,Gt._dataApiKeydownHandler).on(Ot.CLICK_DATA_API+" "+Ot.KEYUP_DATA_API,Gt._clearMenus).on(Ot.CLICK_DATA_API,Wt,function(t){t.preventDefault(),t.stopPropagation(),Gt._jQueryInterface.call(bt(this),"toggle")}).on(Ot.CLICK_DATA_API,Ut,function(t){t.stopPropagation()}),bt.fn[St]=Gt._jQueryInterface,bt.fn[St].Constructor=Gt,bt.fn[St].noConflict=function(){return bt.fn[St]=wt,Gt._jQueryInterface},Gt),Yn=(Xt="modal",ee="."+(te="bs.modal"),ne=($t=e).fn[Xt],ie={backdrop:!0,keyboard:!0,focus:!0,show:!0},re={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},oe={HIDE:"hide"+ee,HIDDEN:"hidden"+ee,SHOW:"show"+ee,SHOWN:"shown"+ee,FOCUSIN:"focusin"+ee,RESIZE:"resize"+ee,CLICK_DISMISS:"click.dismiss"+ee,KEYDOWN_DISMISS:"keydown.dismiss"+ee,MOUSEUP_DISMISS:"mouseup.dismiss"+ee,MOUSEDOWN_DISMISS:"mousedown.dismiss"+ee,CLICK_DATA_API:"click"+ee+".data-api"},se="modal-scrollbar-measure",ae="modal-backdrop",le="modal-open",ce="fade",he="show",ue=".modal-dialog",fe='[data-toggle="modal"]',de='[data-dismiss="modal"]',ge=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",_e=".sticky-top",me=function(){function r(t,e){this._config=this._getConfig(e),this._element=t,this._dialog=t.querySelector(ue),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._scrollbarWidth=0}var t=r.prototype;return t.toggle=function(t){return this._isShown?this.hide():this.show(t)},t.show=function(t){var e=this;if(!this._isTransitioning&&!this._isShown){$t(this._element).hasClass(ce)&&(this._isTransitioning=!0);var n=$t.Event(oe.SHOW,{relatedTarget:t});$t(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),$t(document.body).addClass(le),this._setEscapeEvent(),this._setResizeEvent(),$t(this._element).on(oe.CLICK_DISMISS,de,function(t){return e.hide(t)}),$t(this._dialog).on(oe.MOUSEDOWN_DISMISS,function(){$t(e._element).one(oe.MOUSEUP_DISMISS,function(t){$t(t.target).is(e._element)&&(e._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return e._showElement(t)}))}},t.hide=function(t){var e=this;if(t&&t.preventDefault(),!this._isTransitioning&&this._isShown){var n=$t.Event(oe.HIDE);if($t(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var i=$t(this._element).hasClass(ce);if(i&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),$t(document).off(oe.FOCUSIN),$t(this._element).removeClass(he),$t(this._element).off(oe.CLICK_DISMISS),$t(this._dialog).off(oe.MOUSEDOWN_DISMISS),i){var r=Fn.getTransitionDurationFromElement(this._element);$t(this._element).one(Fn.TRANSITION_END,function(t){return e._hideModal(t)}).emulateTransitionEnd(r)}else this._hideModal()}}},t.dispose=function(){$t.removeData(this._element,te),$t(window,document,this._element,this._backdrop).off(ee),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._scrollbarWidth=null},t.handleUpdate=function(){this._adjustDialog()},t._getConfig=function(t){return t=l({},ie,t),Fn.typeCheckConfig(Xt,t,re),t},t._showElement=function(t){var e=this,n=$t(this._element).hasClass(ce);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,n&&Fn.reflow(this._element),$t(this._element).addClass(he),this._config.focus&&this._enforceFocus();var i=$t.Event(oe.SHOWN,{relatedTarget:t}),r=function(){e._config.focus&&e._element.focus(),e._isTransitioning=!1,$t(e._element).trigger(i)};if(n){var o=Fn.getTransitionDurationFromElement(this._element);$t(this._dialog).one(Fn.TRANSITION_END,r).emulateTransitionEnd(o)}else r()},t._enforceFocus=function(){var e=this;$t(document).off(oe.FOCUSIN).on(oe.FOCUSIN,function(t){document!==t.target&&e._element!==t.target&&0===$t(e._element).has(t.target).length&&e._element.focus()})},t._setEscapeEvent=function(){var e=this;this._isShown&&this._config.keyboard?$t(this._element).on(oe.KEYDOWN_DISMISS,function(t){27===t.which&&(t.preventDefault(),e.hide())}):this._isShown||$t(this._element).off(oe.KEYDOWN_DISMISS)},t._setResizeEvent=function(){var e=this;this._isShown?$t(window).on(oe.RESIZE,function(t){return e.handleUpdate(t)}):$t(window).off(oe.RESIZE)},t._hideModal=function(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._isTransitioning=!1,this._showBackdrop(function(){$t(document.body).removeClass(le),t._resetAdjustments(),t._resetScrollbar(),$t(t._element).trigger(oe.HIDDEN)})},t._removeBackdrop=function(){this._backdrop&&($t(this._backdrop).remove(),this._backdrop=null)},t._showBackdrop=function(t){var e=this,n=$t(this._element).hasClass(ce)?ce:"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className=ae,n&&this._backdrop.classList.add(n),$t(this._backdrop).appendTo(document.body),$t(this._element).on(oe.CLICK_DISMISS,function(t){e._ignoreBackdropClick?e._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===e._config.backdrop?e._element.focus():e.hide())}),n&&Fn.reflow(this._backdrop),$t(this._backdrop).addClass(he),!t)return;if(!n)return void t();var i=Fn.getTransitionDurationFromElement(this._backdrop);$t(this._backdrop).one(Fn.TRANSITION_END,t).emulateTransitionEnd(i)}else if(!this._isShown&&this._backdrop){$t(this._backdrop).removeClass(he);var r=function(){e._removeBackdrop(),t&&t()};if($t(this._element).hasClass(ce)){var o=Fn.getTransitionDurationFromElement(this._backdrop);$t(this._backdrop).one(Fn.TRANSITION_END,r).emulateTransitionEnd(o)}else r()}else t&&t()},t._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},t._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},t._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=t.left+t.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},t._setScrollbar=function(){var r=this;if(this._isBodyOverflowing){var t=[].slice.call(document.querySelectorAll(ge)),e=[].slice.call(document.querySelectorAll(_e));$t(t).each(function(t,e){var n=e.style.paddingRight,i=$t(e).css("padding-right");$t(e).data("padding-right",n).css("padding-right",parseFloat(i)+r._scrollbarWidth+"px")}),$t(e).each(function(t,e){var n=e.style.marginRight,i=$t(e).css("margin-right");$t(e).data("margin-right",n).css("margin-right",parseFloat(i)-r._scrollbarWidth+"px")});var n=document.body.style.paddingRight,i=$t(document.body).css("padding-right");$t(document.body).data("padding-right",n).css("padding-right",parseFloat(i)+this._scrollbarWidth+"px")}},t._resetScrollbar=function(){var t=[].slice.call(document.querySelectorAll(ge));$t(t).each(function(t,e){var n=$t(e).data("padding-right");$t(e).removeData("padding-right"),e.style.paddingRight=n||""});var e=[].slice.call(document.querySelectorAll(""+_e));$t(e).each(function(t,e){var n=$t(e).data("margin-right");"undefined"!=typeof n&&$t(e).css("margin-right",n).removeData("margin-right")});var n=$t(document.body).data("padding-right");$t(document.body).removeData("padding-right"),document.body.style.paddingRight=n||""},t._getScrollbarWidth=function(){var t=document.createElement("div");t.className=se,document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},r._jQueryInterface=function(n,i){return this.each(function(){var t=$t(this).data(te),e=l({},ie,$t(this).data(),"object"==typeof n&&n?n:{});if(t||(t=new r(this,e),$t(this).data(te,t)),"string"==typeof n){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n](i)}else e.show&&t.show(i)})},s(r,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return ie}}]),r}(),$t(document).on(oe.CLICK_DATA_API,fe,function(t){var e,n=this,i=Fn.getSelectorFromElement(this);i&&(e=document.querySelector(i));var r=$t(e).data(te)?"toggle":l({},$t(e).data(),$t(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault();var o=$t(e).one(oe.SHOW,function(t){t.isDefaultPrevented()||o.one(oe.HIDDEN,function(){$t(n).is(":visible")&&n.focus()})});me._jQueryInterface.call($t(e),r,this)}),$t.fn[Xt]=me._jQueryInterface,$t.fn[Xt].Constructor=me,$t.fn[Xt].noConflict=function(){return $t.fn[Xt]=ne,me._jQueryInterface},me),zn=(ve="tooltip",Ee="."+(ye="bs.tooltip"),Ce=(pe=e).fn[ve],Te="bs-tooltip",be=new RegExp("(^|\\s)"+Te+"\\S+","g"),Ae={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!(Ie={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"}),selector:!(Se={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)"}),placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent"},we="out",Ne={HIDE:"hide"+Ee,HIDDEN:"hidden"+Ee,SHOW:(De="show")+Ee,SHOWN:"shown"+Ee,INSERTED:"inserted"+Ee,CLICK:"click"+Ee,FOCUSIN:"focusin"+Ee,FOCUSOUT:"focusout"+Ee,MOUSEENTER:"mouseenter"+Ee,MOUSELEAVE:"mouseleave"+Ee},Oe="fade",ke="show",Pe=".tooltip-inner",je=".arrow",He="hover",Le="focus",Re="click",xe="manual",We=function(){function i(t,e){if("undefined"==typeof h)throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}var t=i.prototype;return t.enable=function(){this._isEnabled=!0},t.disable=function(){this._isEnabled=!1},t.toggleEnabled=function(){this._isEnabled=!this._isEnabled},t.toggle=function(t){if(this._isEnabled)if(t){var e=this.constructor.DATA_KEY,n=pe(t.currentTarget).data(e);n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),pe(t.currentTarget).data(e,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(pe(this.getTipElement()).hasClass(ke))return void this._leave(null,this);this._enter(null,this)}},t.dispose=function(){clearTimeout(this._timeout),pe.removeData(this.element,this.constructor.DATA_KEY),pe(this.element).off(this.constructor.EVENT_KEY),pe(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&pe(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,(this._activeTrigger=null)!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},t.show=function(){var e=this;if("none"===pe(this.element).css("display"))throw new Error("Please use show on visible elements");var t=pe.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){pe(this.element).trigger(t);var n=pe.contains(this.element.ownerDocument.documentElement,this.element);if(t.isDefaultPrevented()||!n)return;var i=this.getTipElement(),r=Fn.getUID(this.constructor.NAME);i.setAttribute("id",r),this.element.setAttribute("aria-describedby",r),this.setContent(),this.config.animation&&pe(i).addClass(Oe);var o="function"==typeof this.config.placement?this.config.placement.call(this,i,this.element):this.config.placement,s=this._getAttachment(o);this.addAttachmentClass(s);var a=!1===this.config.container?document.body:pe(document).find(this.config.container);pe(i).data(this.constructor.DATA_KEY,this),pe.contains(this.element.ownerDocument.documentElement,this.tip)||pe(i).appendTo(a),pe(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new h(this.element,i,{placement:s,modifiers:{offset:{offset:this.config.offset},flip:{behavior:this.config.fallbackPlacement},arrow:{element:je},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){e._handlePopperPlacementChange(t)}}),pe(i).addClass(ke),"ontouchstart"in document.documentElement&&pe(document.body).children().on("mouseover",null,pe.noop);var l=function(){e.config.animation&&e._fixTransition();var t=e._hoverState;e._hoverState=null,pe(e.element).trigger(e.constructor.Event.SHOWN),t===we&&e._leave(null,e)};if(pe(this.tip).hasClass(Oe)){var c=Fn.getTransitionDurationFromElement(this.tip);pe(this.tip).one(Fn.TRANSITION_END,l).emulateTransitionEnd(c)}else l()}},t.hide=function(t){var e=this,n=this.getTipElement(),i=pe.Event(this.constructor.Event.HIDE),r=function(){e._hoverState!==De&&n.parentNode&&n.parentNode.removeChild(n),e._cleanTipClass(),e.element.removeAttribute("aria-describedby"),pe(e.element).trigger(e.constructor.Event.HIDDEN),null!==e._popper&&e._popper.destroy(),t&&t()};if(pe(this.element).trigger(i),!i.isDefaultPrevented()){if(pe(n).removeClass(ke),"ontouchstart"in document.documentElement&&pe(document.body).children().off("mouseover",null,pe.noop),this._activeTrigger[Re]=!1,this._activeTrigger[Le]=!1,this._activeTrigger[He]=!1,pe(this.tip).hasClass(Oe)){var o=Fn.getTransitionDurationFromElement(n);pe(n).one(Fn.TRANSITION_END,r).emulateTransitionEnd(o)}else r();this._hoverState=""}},t.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},t.isWithContent=function(){return Boolean(this.getTitle())},t.addAttachmentClass=function(t){pe(this.getTipElement()).addClass(Te+"-"+t)},t.getTipElement=function(){return this.tip=this.tip||pe(this.config.template)[0],this.tip},t.setContent=function(){var t=this.getTipElement();this.setElementContent(pe(t.querySelectorAll(Pe)),this.getTitle()),pe(t).removeClass(Oe+" "+ke)},t.setElementContent=function(t,e){var n=this.config.html;"object"==typeof e&&(e.nodeType||e.jquery)?n?pe(e).parent().is(t)||t.empty().append(e):t.text(pe(e).text()):t[n?"html":"text"](e)},t.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},t._getAttachment=function(t){return Ie[t.toUpperCase()]},t._setListeners=function(){var i=this;this.config.trigger.split(" ").forEach(function(t){if("click"===t)pe(i.element).on(i.constructor.Event.CLICK,i.config.selector,function(t){return i.toggle(t)});else if(t!==xe){var e=t===He?i.constructor.Event.MOUSEENTER:i.constructor.Event.FOCUSIN,n=t===He?i.constructor.Event.MOUSELEAVE:i.constructor.Event.FOCUSOUT;pe(i.element).on(e,i.config.selector,function(t){return i._enter(t)}).on(n,i.config.selector,function(t){return i._leave(t)})}pe(i.element).closest(".modal").on("hide.bs.modal",function(){return i.hide()})}),this.config.selector?this.config=l({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},t._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},t._enter=function(t,e){var n=this.constructor.DATA_KEY;(e=e||pe(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),pe(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusin"===t.type?Le:He]=!0),pe(e.getTipElement()).hasClass(ke)||e._hoverState===De?e._hoverState=De:(clearTimeout(e._timeout),e._hoverState=De,e.config.delay&&e.config.delay.show?e._timeout=setTimeout(function(){e._hoverState===De&&e.show()},e.config.delay.show):e.show())},t._leave=function(t,e){var n=this.constructor.DATA_KEY;(e=e||pe(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),pe(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusout"===t.type?Le:He]=!1),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState=we,e.config.delay&&e.config.delay.hide?e._timeout=setTimeout(function(){e._hoverState===we&&e.hide()},e.config.delay.hide):e.hide())},t._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},t._getConfig=function(t){return"number"==typeof(t=l({},this.constructor.Default,pe(this.element).data(),"object"==typeof t&&t?t:{})).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),Fn.typeCheckConfig(ve,t,this.constructor.DefaultType),t},t._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},t._cleanTipClass=function(){var t=pe(this.getTipElement()),e=t.attr("class").match(be);null!==e&&e.length&&t.removeClass(e.join(""))},t._handlePopperPlacementChange=function(t){var e=t.instance;this.tip=e.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},t._fixTransition=function(){var t=this.getTipElement(),e=this.config.animation;null===t.getAttribute("x-placement")&&(pe(t).removeClass(Oe),this.config.animation=!1,this.hide(),this.show(),this.config.animation=e)},i._jQueryInterface=function(n){return this.each(function(){var t=pe(this).data(ye),e="object"==typeof n&&n;if((t||!/dispose|hide/.test(n))&&(t||(t=new i(this,e),pe(this).data(ye,t)),"string"==typeof n)){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return Ae}},{key:"NAME",get:function(){return ve}},{key:"DATA_KEY",get:function(){return ye}},{key:"Event",get:function(){return Ne}},{key:"EVENT_KEY",get:function(){return Ee}},{key:"DefaultType",get:function(){return Se}}]),i}(),pe.fn[ve]=We._jQueryInterface,pe.fn[ve].Constructor=We,pe.fn[ve].noConflict=function(){return pe.fn[ve]=Ce,We._jQueryInterface},We),Jn=(qe="popover",Ke="."+(Fe="bs.popover"),Me=(Ue=e).fn[qe],Qe="bs-popover",Be=new RegExp("(^|\\s)"+Qe+"\\S+","g"),Ve=l({},zn.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),Ye=l({},zn.DefaultType,{content:"(string|element|function)"}),ze="fade",Ze=".popover-header",Ge=".popover-body",$e={HIDE:"hide"+Ke,HIDDEN:"hidden"+Ke,SHOW:(Je="show")+Ke,SHOWN:"shown"+Ke,INSERTED:"inserted"+Ke,CLICK:"click"+Ke,FOCUSIN:"focusin"+Ke,FOCUSOUT:"focusout"+Ke,MOUSEENTER:"mouseenter"+Ke,MOUSELEAVE:"mouseleave"+Ke},Xe=function(t){var e,n;function i(){return t.apply(this,arguments)||this}n=t,(e=i).prototype=Object.create(n.prototype),(e.prototype.constructor=e).__proto__=n;var r=i.prototype;return r.isWithContent=function(){return this.getTitle()||this._getContent()},r.addAttachmentClass=function(t){Ue(this.getTipElement()).addClass(Qe+"-"+t)},r.getTipElement=function(){return this.tip=this.tip||Ue(this.config.template)[0],this.tip},r.setContent=function(){var t=Ue(this.getTipElement());this.setElementContent(t.find(Ze),this.getTitle());var e=this._getContent();"function"==typeof e&&(e=e.call(this.element)),this.setElementContent(t.find(Ge),e),t.removeClass(ze+" "+Je)},r._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},r._cleanTipClass=function(){var t=Ue(this.getTipElement()),e=t.attr("class").match(Be);null!==e&&0<e.length&&t.removeClass(e.join(""))},i._jQueryInterface=function(n){return this.each(function(){var t=Ue(this).data(Fe),e="object"==typeof n?n:null;if((t||!/destroy|hide/.test(n))&&(t||(t=new i(this,e),Ue(this).data(Fe,t)),"string"==typeof n)){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return Ve}},{key:"NAME",get:function(){return qe}},{key:"DATA_KEY",get:function(){return Fe}},{key:"Event",get:function(){return $e}},{key:"EVENT_KEY",get:function(){return Ke}},{key:"DefaultType",get:function(){return Ye}}]),i}(zn),Ue.fn[qe]=Xe._jQueryInterface,Ue.fn[qe].Constructor=Xe,Ue.fn[qe].noConflict=function(){return Ue.fn[qe]=Me,Xe._jQueryInterface},Xe),Zn=(en="scrollspy",rn="."+(nn="bs.scrollspy"),on=(tn=e).fn[en],sn={offset:10,method:"auto",target:""},an={offset:"number",method:"string",target:"(string|element)"},ln={ACTIVATE:"activate"+rn,SCROLL:"scroll"+rn,LOAD_DATA_API:"load"+rn+".data-api"},cn="dropdown-item",hn="active",un='[data-spy="scroll"]',fn=".active",dn=".nav, .list-group",gn=".nav-link",_n=".nav-item",mn=".list-group-item",pn=".dropdown",vn=".dropdown-item",yn=".dropdown-toggle",En="offset",Cn="position",Tn=function(){function n(t,e){var n=this;this._element=t,this._scrollElement="BODY"===t.tagName?window:t,this._config=this._getConfig(e),this._selector=this._config.target+" "+gn+","+this._config.target+" "+mn+","+this._config.target+" "+vn,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,tn(this._scrollElement).on(ln.SCROLL,function(t){return n._process(t)}),this.refresh(),this._process()}var t=n.prototype;return t.refresh=function(){var e=this,t=this._scrollElement===this._scrollElement.window?En:Cn,r="auto"===this._config.method?t:this._config.method,o=r===Cn?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map(function(t){var e,n=Fn.getSelectorFromElement(t);if(n&&(e=document.querySelector(n)),e){var i=e.getBoundingClientRect();if(i.width||i.height)return[tn(e)[r]().top+o,n]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(t){e._offsets.push(t[0]),e._targets.push(t[1])})},t.dispose=function(){tn.removeData(this._element,nn),tn(this._scrollElement).off(rn),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},t._getConfig=function(t){if("string"!=typeof(t=l({},sn,"object"==typeof t&&t?t:{})).target){var e=tn(t.target).attr("id");e||(e=Fn.getUID(en),tn(t.target).attr("id",e)),t.target="#"+e}return Fn.typeCheckConfig(en,t,an),t},t._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},t._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},t._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},t._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),n<=t){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&0<this._offsets[0])return this._activeTarget=null,void this._clear();for(var r=this._offsets.length;r--;){this._activeTarget!==this._targets[r]&&t>=this._offsets[r]&&("undefined"==typeof this._offsets[r+1]||t<this._offsets[r+1])&&this._activate(this._targets[r])}}},t._activate=function(e){this._activeTarget=e,this._clear();var t=this._selector.split(",");t=t.map(function(t){return t+'[data-target="'+e+'"],'+t+'[href="'+e+'"]'});var n=tn([].slice.call(document.querySelectorAll(t.join(","))));n.hasClass(cn)?(n.closest(pn).find(yn).addClass(hn),n.addClass(hn)):(n.addClass(hn),n.parents(dn).prev(gn+", "+mn).addClass(hn),n.parents(dn).prev(_n).children(gn).addClass(hn)),tn(this._scrollElement).trigger(ln.ACTIVATE,{relatedTarget:e})},t._clear=function(){var t=[].slice.call(document.querySelectorAll(this._selector));tn(t).filter(fn).removeClass(hn)},n._jQueryInterface=function(e){return this.each(function(){var t=tn(this).data(nn);if(t||(t=new n(this,"object"==typeof e&&e),tn(this).data(nn,t)),"string"==typeof e){if("undefined"==typeof t[e])throw new TypeError('No method named "'+e+'"');t[e]()}})},s(n,null,[{key:"VERSION",get:function(){return"4.1.3"}},{key:"Default",get:function(){return sn}}]),n}(),tn(window).on(ln.LOAD_DATA_API,function(){for(var t=[].slice.call(document.querySelectorAll(un)),e=t.length;e--;){var n=tn(t[e]);Tn._jQueryInterface.call(n,n.data())}}),tn.fn[en]=Tn._jQueryInterface,tn.fn[en].Constructor=Tn,tn.fn[en].noConflict=function(){return tn.fn[en]=on,Tn._jQueryInterface},Tn),Gn=(In="."+(Sn="bs.tab"),An=(bn=e).fn.tab,Dn={HIDE:"hide"+In,HIDDEN:"hidden"+In,SHOW:"show"+In,SHOWN:"shown"+In,CLICK_DATA_API:"click"+In+".data-api"},wn="dropdown-menu",Nn="active",On="disabled",kn="fade",Pn="show",jn=".dropdown",Hn=".nav, .list-group",Ln=".active",Rn="> li > .active",xn='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',Wn=".dropdown-toggle",Un="> .dropdown-menu .active",qn=function(){function i(t){this._element=t}var t=i.prototype;return t.show=function(){var n=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&bn(this._element).hasClass(Nn)||bn(this._element).hasClass(On))){var t,i,e=bn(this._element).closest(Hn)[0],r=Fn.getSelectorFromElement(this._element);if(e){var o="UL"===e.nodeName?Rn:Ln;i=(i=bn.makeArray(bn(e).find(o)))[i.length-1]}var s=bn.Event(Dn.HIDE,{relatedTarget:this._element}),a=bn.Event(Dn.SHOW,{relatedTarget:i});if(i&&bn(i).trigger(s),bn(this._element).trigger(a),!a.isDefaultPrevented()&&!s.isDefaultPrevented()){r&&(t=document.querySelector(r)),this._activate(this._element,e);var l=function(){var t=bn.Event(Dn.HIDDEN,{relatedTarget:n._element}),e=bn.Event(Dn.SHOWN,{relatedTarget:i});bn(i).trigger(t),bn(n._element).trigger(e)};t?this._activate(t,t.parentNode,l):l()}}},t.dispose=function(){bn.removeData(this._element,Sn),this._element=null},t._activate=function(t,e,n){var i=this,r=("UL"===e.nodeName?bn(e).find(Rn):bn(e).children(Ln))[0],o=n&&r&&bn(r).hasClass(kn),s=function(){return i._transitionComplete(t,r,n)};if(r&&o){var a=Fn.getTransitionDurationFromElement(r);bn(r).one(Fn.TRANSITION_END,s).emulateTransitionEnd(a)}else s()},t._transitionComplete=function(t,e,n){if(e){bn(e).removeClass(Pn+" "+Nn);var i=bn(e.parentNode).find(Un)[0];i&&bn(i).removeClass(Nn),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}if(bn(t).addClass(Nn),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),Fn.reflow(t),bn(t).addClass(Pn),t.parentNode&&bn(t.parentNode).hasClass(wn)){var r=bn(t).closest(jn)[0];if(r){var o=[].slice.call(r.querySelectorAll(Wn));bn(o).addClass(Nn)}t.setAttribute("aria-expanded",!0)}n&&n()},i._jQueryInterface=function(n){return this.each(function(){var t=bn(this),e=t.data(Sn);if(e||(e=new i(this),t.data(Sn,e)),"string"==typeof n){if("undefined"==typeof e[n])throw new TypeError('No method named "'+n+'"');e[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.1.3"}}]),i}(),bn(document).on(Dn.CLICK_DATA_API,xn,function(t){t.preventDefault(),qn._jQueryInterface.call(bn(this),"show")}),bn.fn.tab=qn._jQueryInterface,bn.fn.tab.Constructor=qn,bn.fn.tab.noConflict=function(){return bn.fn.tab=An,qn._jQueryInterface},qn);!function(t){if("undefined"==typeof t)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1===e[0]&&9===e[1]&&e[2]<1||4<=e[0])throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(e),t.Util=Fn,t.Alert=Kn,t.Button=Mn,t.Carousel=Qn,t.Collapse=Bn,t.Dropdown=Vn,t.Modal=Yn,t.Popover=Jn,t.Scrollspy=Zn,t.Tab=Gn,t.Tooltip=zn,Object.defineProperty(t,"__esModule",{value:!0})});
(function($){
"use strict";
$('header a').click(function(){
$('header').before('<div id="preloader"></div>');
});
$('footer a').click(function(){
$('header').before('<div id="preloader"></div>');
});
$(window).on('load', function(){
$('#preloader').fadeOut('slow', function(){ $(this).remove(); });
});
jQuery('.stellarnav').stellarNav({
theme: 'light',
breakpoint: 960,
position: 'right',
phoneBtn: '+918918560266',
locationBtn: 'hello@amartadey.com'
});
$(window).on('scroll', function(){
if($(window).scrollTop() > 85){
$('header').addClass('navbar-fixed-top');
}else{
$('header').removeClass('navbar-fixed-top');
}});
$.scrollUp({
scrollText: '<i class="fa fa-arrow-up" aria-hidden="true"></i>',
easingType: 'linear',
scrollSpeed: 500,
animation: 'fade'
});
$('.counter-up').counterUp();
$('.smoothscroll').on('click', function(e){
e.preventDefault();
var target=this.hash;
$('html, body').stop().animate({
'scrollTop': $(target).offset().top - 80
}, 1200);
});
$('[data-countdown]').each(function(){
var $this=$(this),
finalDate=$(this).data('countdown');
$this.countdown(finalDate, function(event){
$this.html(event.strftime('<span class="cdown days"><span class="time-count">%-D</span> <p>Days</p></span> <span class="cdown hour"><span class="time-count">%-H</span> <p>Hour</p></span> <span class="cdown minutes"><span class="time-count">%M</span> <p>Min</p></span> <span class="cdown second"> <span><span class="time-count">%S</span> <p>Sec</p></span>'));
});
});
$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
disableOn: 700,
type: 'iframe',
mainClass: 'mfp-fade',
removalDelay: 300,
preloader: false,
fixedContentPos: false
});
$('.test-popup-link').magnificPopup({
type: 'image',
callbacks: {
resize: changeImgSize,
imageLoadComplete:changeImgSize,
change:changeImgSize
}});
function changeImgSize(){
var img=this.content.find('img');
img.css('max-height', '100%');
img.css('width', 'auto');
img.css('max-width', 'auto');
}
$('#container').imagesLoaded(function (){
$('.project-menu').on('click', 'button', function (){
var filterValue=$(this).attr('data-filter');
$grid.isotope({ filter: filterValue });
$('.project-menu').find('.checked').removeClass('checked');
$(this).addClass('checked');
});
var $grid=$('.grid_container').isotope({
itemSelector: '.grid',
percentPosition: true,
masonry: {
columnWidth: '.grid'
}})
});
function project_carousel(){
var owl=$(".project-carousel");
owl.owlCarousel({
loop: false,
margin: 40,
responsiveClass: true,
navigation: true,
navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
nav: false,
items: 5,
smartSpeed: 2000,
dots: false,
autoplay: false,
autoplayTimeout: 4000,
center: true,
autoWidth: true,
responsive: {
0: {
items: 1
},
480: {
items: 1
},
760: {
items: 3
}}
});
}
project_carousel();
function testimonial_carousel(){
var owl=$(".testimonial-carousel");
owl.owlCarousel({
loop: true,
margin: 30,
responsiveClass: true,
navigation: true,
navText: ["<i class='fal fa-long-arrow-left'></i>", "<i class='fal fa-long-arrow-right'></i>"],
nav: true,
items: 2,
smartSpeed: 2000,
dots: false,
autoplay: false,
autoplayTimeout: 4000,
center: false,
responsive: {
0: {
items: 1
},
480: {
items: 1
},
760: {
items: 2
}}
});
}
testimonial_carousel();
}(jQuery));
(function(n){typeof define=="function"&&!1&&define.amd&&define.amd.jQuery?define(["jquery"],n):typeof module!="undefined"&&!1&&module.exports?n(require("jquery")):n(jQuery)})(function(n){var r="left",u="right",f="up",e="down",v="in",y="out",p="none",nt="auto",w="swipe",b="pinch",k="tap",tt="doubletap",it="longtap",d="horizontal",g="vertical",l="all",ut=10,rt="start",o="move",t="end",i="cancel",c="ontouchstart"in window,a=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled&&!c,s=(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&!c,h="TouchSwipe";n.fn.swipe=function(t){var r=n(this),i=r.data(h);if(i&&typeof t=="string"){if(i[t])return i[t].apply(this,Array.prototype.slice.call(arguments,1));n.error("Method "+t+" does not exist on jQuery.swipe")}else if(i&&typeof t=="object")i.option.apply(this,arguments);else if(!i&&(typeof t=="object"||!t))return ft.apply(this,arguments);return r};n.fn.swipe.version="1.6.15";n.fn.swipe.defaults={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:!0};n.fn.swipe.phases={PHASE_START:rt,PHASE_MOVE:o,PHASE_END:t,PHASE_CANCEL:i};n.fn.swipe.directions={LEFT:r,RIGHT:u,UP:f,DOWN:e,IN:v,OUT:y};n.fn.swipe.pageScroll={NONE:p,HORIZONTAL:d,VERTICAL:g,AUTO:nt};n.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,ALL:l};function ft(t){return t&&t.allowPageScroll===undefined&&(t.swipe!==undefined||t.swipeStatus!==undefined)&&(t.allowPageScroll=p),t.click!==undefined&&t.tap===undefined&&(t.tap=t.click),t||(t={}),t=n.extend({},n.fn.swipe.defaults,t),this.each(function(){var r=n(this),i=r.data(h);i||(i=new et(this,t),r.data(h,i))})}function et(ft,et){var et=n.extend({},et),si=c||s||!et.fallbackToMouseEvents,hi=si?s?a?"MSPointerDown":"pointerdown":"touchstart":"mousedown",ki=si?s?a?"MSPointerMove":"pointermove":"touchmove":"mousemove",di=si?s?a?"MSPointerUp":"pointerup":"touchend":"mouseup",ri=si?s?"mouseleave":null:"mouseleave",ci=s?a?"MSPointerCancel":"pointercancel":"touchcancel",at=0,vt=null,yt=null,lt=0,gt=0,ni=0,pt=1,bt=0,kt=0,li=null,ot=n(ft),st="start",ct=0,ht={},gi=0,ai=0,vi=0,nr=0,ti=0,fi=null,ei=null;try{ot.bind(hi,tr);ot.bind(ci,ui)}catch(ff){n.error("events not supported "+hi+","+ci+" on jQuery.swipe")}this.enable=function(){return ot.bind(hi,tr),ot.bind(ci,ui),ot};this.disable=function(){return lr(),ot};this.destroy=function(){lr();ot.data(h,null);ot=null};this.option=function(t,i){if(typeof t=="object")et=n.extend(et,t);else if(et[t]!==undefined){if(i===undefined)return et[t];et[t]=i}else if(t)n.error("Option "+t+" does not exist on jQuery.swipe.options");else return et;return null};function tr(t){if(!pu()&&!(n(t.target).closest(et.excludedElements,ot).length>0)){var r=t.originalEvent?t.originalEvent:t,f,u=r.touches,e=u?u[0]:r;return(st=rt,u?ct=u.length:et.preventDefaultEvents!==!1&&t.preventDefault(),at=0,vt=null,yt=null,kt=null,lt=0,gt=0,ni=0,pt=1,bt=0,li=ku(),dr(),wi(0,e),!u||ct===et.fingers||et.fingers===l||oi()?(gi=ii(),ct==2&&(wi(1,u[1]),gt=ni=cr(ht[0].start,ht[1].start)),(et.swipeStatus||et.pinchStatus)&&(f=wt(r,st))):f=!1,f===!1)?(st=i,wt(r,st),f):(et.hold&&(ei=setTimeout(n.proxy(function(){ot.trigger("hold",[r.target]);et.hold&&(f=et.hold.call(ot,r,r.target))},this),et.longTapThreshold)),pi(!0),null)}}function ir(n){var f=n.originalEvent?n.originalEvent:n;if(st!==t&&st!==i&&!yi()){var s,r=f.touches,h=r?r[0]:f,u=gr(h);if(ai=ii(),r&&(ct=r.length),et.hold&&clearTimeout(ei),st=o,ct==2&&(gt==0?(wi(1,r[1]),gt=ni=cr(ht[0].start,ht[1].start)):(gr(r[1]),ni=cr(ht[0].end,ht[1].end),kt=gu(ht[0].end,ht[1].end)),pt=du(gt,ni),bt=Math.abs(gt-ni)),ct===et.fingers||et.fingers===l||!r||oi()){if(vt=iu(u.start,u.end),yt=iu(u.last,u.end),uu(n,yt),at=nf(u.start,u.end),lt=tu(),bu(vt,at),s=wt(f,st),!et.triggerOnTouchEnd||et.triggerOnTouchLeave){var e=!0;if(et.triggerOnTouchLeave){var c=rf(this);e=uf(u.end,c)}!et.triggerOnTouchEnd&&e?st=fr(o):et.triggerOnTouchLeave&&!e&&(st=fr(t));(st==i||st==t)&&wt(f,st)}}else st=i,wt(f,st);s===!1&&(st=i,wt(f,st))}}function rr(n){var r=n.originalEvent?n.originalEvent:n,u=r.touches;if(u){if(u.length&&!yi())return yu(r),!0;if(u.length&&yi())return!0}return yi()&&(ct=nr),ai=ii(),lt=tu(),or()||!er()?(st=i,wt(r,st)):et.triggerOnTouchEnd||et.triggerOnTouchEnd==!1&&st===o?(et.preventDefaultEvents!==!1&&n.preventDefault(),st=t,wt(r,st)):!et.triggerOnTouchEnd&&br()?(st=t,dt(r,st,k)):st===o&&(st=i,wt(r,st)),pi(!1),null}function ui(){ct=0;ai=0;gi=0;gt=0;ni=0;pt=1;dr();pi(!1)}function ur(n){var i=n.originalEvent?n.originalEvent:n;et.triggerOnTouchLeave&&(st=fr(t),wt(i,st))}function lr(){ot.unbind(hi,tr);ot.unbind(ci,ui);ot.unbind(ki,ir);ot.unbind(di,rr);ri&&ot.unbind(ri,ur);pi(!1)}function fr(n){var r=n,f=ar(),u=er(),e=or();return!f||e?r=i:u&&n==o&&(!et.triggerOnTouchEnd||et.triggerOnTouchLeave)?r=t:!u&&n==t&&et.triggerOnTouchLeave&&(r=i),r}function wt(n,r){var u,f=n.touches;return(eu()||sr())&&(u=dt(n,r,w)),(fu()||oi())&&u!==!1&&(u=dt(n,r,b)),au()&&u!==!1?u=dt(n,r,tt):vu()&&u!==!1?u=dt(n,r,it):lu()&&u!==!1&&(u=dt(n,r,k)),r===i&&(sr()&&(u=dt(n,r,w)),oi()&&(u=dt(n,r,b)),ui(n)),r===t&&(f?f.length||ui(n):ui(n)),u}function dt(o,s,h){var c;if(h==w){if(ot.trigger("swipeStatus",[s,vt||null,at||0,lt||0,ct,ht,yt]),et.swipeStatus&&(c=et.swipeStatus.call(ot,o,s,vt||null,at||0,lt||0,ct,ht,yt),c===!1))return!1;if(s==t&&yr()){if(clearTimeout(fi),clearTimeout(ei),ot.trigger("swipe",[vt,at,lt,ct,ht,yt]),et.swipe&&(c=et.swipe.call(ot,o,vt,at,lt,ct,ht,yt),c===!1))return!1;switch(vt){case r:ot.trigger("swipeLeft",[vt,at,lt,ct,ht,yt]);et.swipeLeft&&(c=et.swipeLeft.call(ot,o,vt,at,lt,ct,ht,yt));break;case u:ot.trigger("swipeRight",[vt,at,lt,ct,ht,yt]);et.swipeRight&&(c=et.swipeRight.call(ot,o,vt,at,lt,ct,ht,yt));break;case f:ot.trigger("swipeUp",[vt,at,lt,ct,ht,yt]);et.swipeUp&&(c=et.swipeUp.call(ot,o,vt,at,lt,ct,ht,yt));break;case e:ot.trigger("swipeDown",[vt,at,lt,ct,ht,yt]);et.swipeDown&&(c=et.swipeDown.call(ot,o,vt,at,lt,ct,ht,yt))}}}if(h==b){if(ot.trigger("pinchStatus",[s,kt||null,bt||0,lt||0,ct,pt,ht]),et.pinchStatus&&(c=et.pinchStatus.call(ot,o,s,kt||null,bt||0,lt||0,ct,pt,ht),c===!1))return!1;if(s==t&&vr())switch(kt){case v:ot.trigger("pinchIn",[kt||null,bt||0,lt||0,ct,pt,ht]);et.pinchIn&&(c=et.pinchIn.call(ot,o,kt||null,bt||0,lt||0,ct,pt,ht));break;case y:ot.trigger("pinchOut",[kt||null,bt||0,lt||0,ct,pt,ht]);et.pinchOut&&(c=et.pinchOut.call(ot,o,kt||null,bt||0,lt||0,ct,pt,ht))}}return h==k?(s===i||s===t)&&(clearTimeout(fi),clearTimeout(ei),hr()&&!su()?(ti=ii(),fi=setTimeout(n.proxy(function(){ti=null;ot.trigger("tap",[o.target]);et.tap&&(c=et.tap.call(ot,o,o.target))},this),et.doubleTapThreshold)):(ti=null,ot.trigger("tap",[o.target]),et.tap&&(c=et.tap.call(ot,o,o.target)))):h==tt?(s===i||s===t)&&(clearTimeout(fi),clearTimeout(ei),ti=null,ot.trigger("doubletap",[o.target]),et.doubleTap&&(c=et.doubleTap.call(ot,o,o.target))):h==it&&(s===i||s===t)&&(clearTimeout(fi),ti=null,ot.trigger("longtap",[o.target]),et.longTap&&(c=et.longTap.call(ot,o,o.target))),c}function er(){var n=!0;return et.threshold!==null&&(n=at>=et.threshold),n}function or(){var n=!1;return et.cancelThreshold!==null&&vt!==null&&(n=nu(vt)-at>=et.cancelThreshold),n}function ru(){return et.pinchThreshold!==null?bt>=et.pinchThreshold:!0}function ar(){return et.maxTimeThreshold?lt>=et.maxTimeThreshold?!1:!0:!0}function uu(n,t){if(et.preventDefaultEvents!==!1)if(et.allowPageScroll===p)n.preventDefault();else{var i=et.allowPageScroll===nt;switch(t){case r:(et.swipeLeft&&i||!i&&et.allowPageScroll!=d)&&n.preventDefault();break;case u:(et.swipeRight&&i||!i&&et.allowPageScroll!=d)&&n.preventDefault();break;case f:(et.swipeUp&&i||!i&&et.allowPageScroll!=g)&&n.preventDefault();break;case e:(et.swipeDown&&i||!i&&et.allowPageScroll!=g)&&n.preventDefault()}}}function vr(){var n=pr(),t=wr(),i=ru();return n&&t&&i}function oi(){return!!(et.pinchStatus||et.pinchIn||et.pinchOut)}function fu(){return!!(vr()&&oi())}function yr(){var n=ar(),t=er(),i=pr(),r=wr(),u=or();return!u&&r&&i&&t&&n}function sr(){return!!(et.swipe||et.swipeStatus||et.swipeLeft||et.swipeRight||et.swipeUp||et.swipeDown)}function eu(){return!!(yr()&&sr())}function pr(){return ct===et.fingers||et.fingers===l||!c}function wr(){return ht[0].end.x!==0}function br(){return!!et.tap}function hr(){return!!et.doubleTap}function ou(){return!!et.longTap}function kr(){if(ti==null)return!1;var n=ii();return hr()&&n-ti<=et.doubleTapThreshold}function su(){return kr()}function hu(){return(ct===1||!c)&&(isNaN(at)||at<et.threshold)}function cu(){return lt>et.longTapThreshold&&at<ut}function lu(){return!!(hu()&&br())}function au(){return!!(kr()&&hr())}function vu(){return!!(cu()&&ou())}function yu(n){vi=ii();nr=n.touches.length+1}function dr(){vi=0;nr=0}function yi(){var n=!1;if(vi){var t=ii()-vi;t<=et.fingerReleaseThreshold&&(n=!0)}return n}function pu(){return!!(ot.data(h+"_intouch")===!0)}function pi(n){ot&&(n===!0?(ot.bind(ki,ir),ot.bind(di,rr),ri&&ot.bind(ri,ur)):(ot.unbind(ki,ir,!1),ot.unbind(di,rr,!1),ri&&ot.unbind(ri,ur,!1)),ot.data(h+"_intouch",n===!0))}function wi(n,t){var i={start:{x:0,y:0},last:{x:0,y:0},end:{x:0,y:0}};return i.start.x=i.last.x=i.end.x=t.pageX||t.clientX,i.start.y=i.last.y=i.end.y=t.pageY||t.clientY,ht[n]=i,i}function gr(n){var i=n.identifier!==undefined?n.identifier:0,t=wu(i);return t===null&&(t=wi(i,n)),t.last.x=t.end.x,t.last.y=t.end.y,t.end.x=n.pageX||n.clientX,t.end.y=n.pageY||n.clientY,t}function wu(n){return ht[n]||null}function bu(n,t){t=Math.max(t,nu(n));li[n].distance=t}function nu(n){return li[n]?li[n].distance:undefined}function ku(){var n={};return n[r]=bi(r),n[u]=bi(u),n[f]=bi(f),n[e]=bi(e),n}function bi(n){return{direction:n,distance:0}}function tu(){return ai-gi}function cr(n,t){var i=Math.abs(n.x-t.x),r=Math.abs(n.y-t.y);return Math.round(Math.sqrt(i*i+r*r))}function du(n,t){var i=t/n*1;return i.toFixed(2)}function gu(){return pt<1?y:v}function nf(n,t){return Math.round(Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2)))}function tf(n,t){var r=n.x-t.x,u=t.y-n.y,f=Math.atan2(u,r),i=Math.round(f*180/Math.PI);return i<0&&(i=360-Math.abs(i)),i}function iu(n,t){var i=tf(n,t);return i<=45&&i>=0?r:i<=360&&i>=315?r:i>=135&&i<=225?u:i>45&&i<135?e:f}function ii(){var n=new Date;return n.getTime()}function rf(t){t=n(t);var i=t.offset();return{left:i.left,right:i.left+t.outerWidth(),top:i.top,bottom:i.top+t.outerHeight()}}function uf(n,t){return n.x>t.left&&n.x<t.right&&n.y>t.top&&n.y<t.bottom}}});jQuery.extend({highlight:function(n,t,i,r){if(n.nodeType===3){var u=n.data.match(t);if(u){var o=document.createElement(i||"span");if(o.className=r||"highlight",/\.|,|\s/.test(u[0].charAt(0)))var s=u.index+1;else var s=u.index;var f=n.splitText(s);f.splitText(u[1].length);var h=f.cloneNode(!0);return o.appendChild(h),f.parentNode.replaceChild(o,f),1}}else if(n.nodeType===1&&n.childNodes&&!/(script|style)/i.test(n.tagName)&&!(n.tagName===i.toUpperCase()&&n.className===r))for(var e=0;e<n.childNodes.length;e++)e+=jQuery.highlight(n.childNodes[e],t,i,r);return 0}});jQuery.fn.unhighlight=function(n){var t={className:"highlight",element:"span"};return jQuery.extend(t,n),this.find(t.element+"."+t.className).each(function(){var n=this.parentNode;n.replaceChild(this.firstChild,this);n.normalize()}).end()};jQuery.fn.highlight=function(n,t){var i={className:"highlight",element:"span",caseSensitive:!1,wordsOnly:!1};if(jQuery.extend(i,t),n.constructor===String&&(n=[n]),n=jQuery.grep(n,function(n){return n!=""}),n=jQuery.map(n,function(n){return n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}),n.length==0)return this;var u=i.caseSensitive?"":"i",r="("+n.join("|")+")";i.wordsOnly&&(r="(?:,|^|\\s)"+r+"(?:,|$|\\s)");var f=new RegExp(r,u);return this.each(function(){jQuery.highlight(this,f,i.element,i.className)})},function(n,t){typeof exports=="object"&&typeof module!="undefined"?module.exports=t():typeof define=="function"&&define.amd?define(t):(n=n||self,n.asl_SimpleBar=t())}(this,function(){"use strict";var f=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function ft(n,t){return t={exports:{}},n(t,t.exports),t.exports}var yt="object",pt=function(n){return n&&n.Math==Math&&n},t=pt(typeof globalThis==yt&&globalThis)||pt(typeof window==yt&&window)||pt(typeof self==yt&&self)||pt(typeof f==yt&&f)||Function("return this")(),u=function(n){try{return!!n()}catch(t){return!0}},a=!u(function(){return Object.defineProperty({},"a",{get:function(){return 7}}).a!=7}),uf={}.propertyIsEnumerable,ff=Object.getOwnPropertyDescriptor,ds=ff&&!uf.call({1:2},1),gs=ds?function(n){var t=ff(this,n);return!!t&&t.enumerable}:uf,ef={f:gs},er=function(n,t){return{enumerable:!(n&1),configurable:!(n&2),writable:!(n&4),value:t}},nh={}.toString,b=function(n){return nh.call(n).slice(8,-1)},th="".split,wt=u(function(){return!Object("z").propertyIsEnumerable(0)})?function(n){return b(n)=="String"?th.call(n,""):Object(n)}:Object,bt=function(n){if(n==undefined)throw TypeError("Can't call method on "+n);return n},kt=function(n){return wt(bt(n))},n=function(n){return typeof n=="object"?n!==null:typeof n=="function"},of=function(t,i){if(!n(t))return t;var r,u;if(i&&typeof(r=t.toString)=="function"&&!n(u=r.call(t))||typeof(r=t.valueOf)=="function"&&!n(u=r.call(t))||!i&&typeof(r=t.toString)=="function"&&!n(u=r.call(t)))return u;throw TypeError("Can't convert object to primitive value");},ih={}.hasOwnProperty,r=function(n,t){return ih.call(n,t)},or=t.document,rh=n(or)&&n(or.createElement),sf=function(n){return rh?or.createElement(n):{}},hf=!a&&!u(function(){return Object.defineProperty(sf("div"),"a",{get:function(){return 7}}).a!=7}),cf=Object.getOwnPropertyDescriptor,uh=a?cf:function(n,t){if(n=kt(n),t=of(t,!0),hf)try{return cf(n,t)}catch(i){}if(r(n,t))return er(!ef.f.call(n,t),n[t])},lf={f:uh},s=function(t){if(!n(t))throw TypeError(String(t)+" is not an object");return t},af=Object.defineProperty,fh=a?af:function(n,t,i){if(s(n),t=of(t,!0),s(i),hf)try{return af(n,t,i)}catch(r){}if("get"in i||"set"in i)throw TypeError("Accessors not supported");return"value"in i&&(n[t]=i.value),n},k={f:fh},o=a?function(n,t,i){return k.f(n,t,er(1,i))}:function(n,t,i){return n[t]=i,n},sr=function(n,i){try{o(t,n,i)}catch(r){t[n]=i}return i},dt=ft(function(n){var i="__core-js_shared__",r=t[i]||sr(i,{});(n.exports=function(n,t){return r[n]||(r[n]=t!==undefined?t:{})})("versions",[]).push({version:"3.2.1",mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),gt=dt("native-function-to-string",Function.toString),vf=t.WeakMap,yf=typeof vf=="function"&&/native code/.test(gt.call(vf)),eh=0,oh=Math.random(),hr=function(n){return"Symbol("+String(n===undefined?"":n)+")_"+(++eh+oh).toString(36)},pf=dt("keys"),cr=function(n){return pf[n]||(pf[n]=hr(n))},ni={},sh=t.WeakMap,ti,et,ii,hh=function(n){return ii(n)?et(n):ti(n,{})},ch=function(t){return function(i){var r;if(!n(i)||(r=et(i)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}};if(yf){var d=new sh,lh=d.get,ah=d.has,vh=d.set;ti=function(n,t){return vh.call(d,n,t),t};et=function(n){return lh.call(d,n)||{}};ii=function(n){return ah.call(d,n)}}else{var ot=cr("state");ni[ot]=!0;ti=function(n,t){return o(n,ot,t),t};et=function(n){return r(n,ot)?n[ot]:{}};ii=function(n){return r(n,ot)}}var h={set:ti,get:et,has:ii,enforce:hh,getterFor:ch},st=ft(function(n){var i=h.get,u=h.enforce,f=String(gt).split("toString");dt("inspectSource",function(n){return gt.call(n)});(n.exports=function(n,i,e,s){var c=s?!!s.unsafe:!1,h=s?!!s.enumerable:!1,l=s?!!s.noTargetGet:!1;if(typeof e=="function"&&(typeof i!="string"||r(e,"name")||o(e,"name",i),u(e).source=f.join(typeof i=="string"?i:"")),n===t){h?n[i]=e:sr(i,e);return}c?!l&&n[i]&&(h=!0):delete n[i];h?n[i]=e:o(n,i,e)})(Function.prototype,"toString",function(){return typeof this=="function"&&i(this).source||gt.call(this)})}),lr=t,wf=function(n){return typeof n=="function"?n:undefined},bf=function(n,i){return arguments.length<2?wf(lr[n])||wf(t[n]):lr[n]&&lr[n][i]||t[n]&&t[n][i]},yh=Math.ceil,ph=Math.floor,ar=function(n){return isNaN(n=+n)?0:(n>0?ph:yh)(n)},wh=Math.min,ri=function(n){return n>0?wh(ar(n),9007199254740991):0},bh=Math.max,kh=Math.min,dh=function(n,t){var i=ar(n);return i<0?bh(i+t,0):kh(i,t)},kf=function(n){return function(t,i,r){var f=kt(t),e=ri(f.length),u=dh(r,e),o;if(n&&i!=i){while(e>u)if(o=f[u++],o!=o)return!0}else for(;e>u;u++)if((n||u in f)&&f[u]===i)return n||u||0;return!n&&-1}},gh={includes:kf(!0),indexOf:kf(!1)},nc=gh.indexOf,df=function(n,t){var f=kt(n),e=0,u=[];for(var i in f)!r(ni,i)&&r(f,i)&&u.push(i);while(t.length>e)r(f,i=t[e++])&&(~nc(u,i)||u.push(i));return u},ui=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],tc=ui.concat("length","prototype"),ic=Object.getOwnPropertyNames||function(n){return df(n,tc)},rc={f:ic},uc=Object.getOwnPropertySymbols,gf={f:uc},fc=bf("Reflect","ownKeys")||function(n){var t=rc.f(s(n)),i=gf.f;return i?t.concat(i(n)):t},ec=function(n,t){for(var f=fc(t),e=k.f,o=lf.f,i=0;i<f.length;i++){var u=f[i];r(n,u)||e(n,u,o(t,u))}},oc=/#|\.prototype\./,ht=function(n,t){var i=hc[sc(n)];return i==lc?!0:i==cc?!1:typeof t=="function"?u(t):!!t},sc=ht.normalize=function(n){return String(n).replace(oc,".").toLowerCase()},hc=ht.data={},cc=ht.NATIVE="N",lc=ht.POLYFILL="P",vr=ht,ac=lf.f,l=function(n,i){var s=n.target,c=n.global,l=n.stat,a,f,r,u,e,h;if(f=c?t:l?t[s]||sr(s,{}):(t[s]||{}).prototype,f)for(r in i){if(e=i[r],n.noTargetGet?(h=ac(f,r),u=h&&h.value):u=f[r],a=vr(c?r:s+(l?".":"#")+r,n.forced),!a&&u!==undefined){if(typeof e==typeof u)continue;ec(e,u)}(n.sham||u&&u.sham)&&o(e,"sham",!0);st(f,r,e,n)}},ne=function(n){if(typeof n!="function")throw TypeError(String(n)+" is not a function");return n},te=function(n,t,i){if(ne(n),t===undefined)return n;switch(i){case 0:return function(){return n.call(t)};case 1:return function(i){return n.call(t,i)};case 2:return function(i,r){return n.call(t,i,r)};case 3:return function(i,r,u){return n.call(t,i,r,u)}}return function(){return n.apply(t,arguments)}},fi=function(n){return Object(bt(n))},ie=Array.isArray||function(n){return b(n)=="Array"},re=!!Object.getOwnPropertySymbols&&!u(function(){return!String(Symbol())}),ue=t.Symbol,fe=dt("wks"),e=function(n){return fe[n]||(fe[n]=re&&ue[n]||(re?ue:hr)("Symbol."+n))},vc=e("species"),yc=function(t,i){var r;return ie(t)&&(r=t.constructor,typeof r=="function"&&(r===Array||ie(r.prototype))?r=undefined:n(r)&&(r=r[vc],r===null&&(r=undefined))),new(r===undefined?Array:r)(i===0?0:i)},pc=[].push,v=function(n){var i=n==1,u=n==2,f=n==3,t=n==4,r=n==6,e=n==5||r;return function(o,s,h,c){for(var w=fi(o),v=wt(w),d=te(s,h,3),b=ri(v.length),l=0,k=c||yc,y=i?k(o,b):u?k(o,0):undefined,a,p;b>l;l++)if((e||l in v)&&(a=v[l],p=d(a,l,w),n))if(i)y[l]=p;else if(p)switch(n){case 3:return!0;case 5:return a;case 6:return l;case 2:pc.call(y,a)}else if(t)return!1;return r?-1:f||t?t:y}},ei={forEach:v(0),map:v(1),filter:v(2),some:v(3),every:v(4),find:v(5),findIndex:v(6)},ee=function(n,t){var i=[][n];return!i||!u(function(){i.call(null,t||function(){throw 1;},1)})},wc=ei.forEach,ct=ee("forEach")?function(n){return wc(this,n,arguments.length>1?arguments[1]:undefined)}:[].forEach;l({target:"Array",proto:!0,forced:[].forEach!=ct},{forEach:ct});var yr={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0};for(var bc in yr){var oe=t[bc],oi=oe&&oe.prototype;if(oi&&oi.forEach!==ct)try{o(oi,"forEach",ct)}catch(bb){oi.forEach=ct}}var kc=!!(typeof window!="undefined"&&window.document&&window.document.createElement),pr=kc,dc=e("species"),gc=function(n){return!u(function(){var t=[],i=t.constructor={};return i[dc]=function(){return{foo:1}},t[n](Boolean).foo!==1})},nl=ei.filter;l({target:"Array",proto:!0,forced:!gc("filter")},{filter:function(n){return nl(this,n,arguments.length>1?arguments[1]:undefined)}});var si=Object.keys||function(n){return df(n,ui)},tl=a?Object.defineProperties:function(n,t){s(n);for(var i=si(t),f=i.length,r=0,u;f>r;)k.f(n,u=i[r++],t[u]);return n},il=bf("document","documentElement"),se=cr("IE_PROTO"),wr="prototype",br=function(){},hi=function(){var t=sf("iframe"),r=ui.length,u="<",i="script",f=">",e="java"+i+":",n;for(t.style.display="none",il.appendChild(t),t.src=String(e),n=t.contentWindow.document,n.open(),n.write(u+i+f+"document.F=Object"+u+"/"+i+f),n.close(),hi=n.F;r--;)delete hi[wr][ui[r]];return hi()},he=Object.create||function(n,t){var i;return n!==null?(br[wr]=s(n),i=new br,br[wr]=null,i[se]=n):i=hi(),t===undefined?i:tl(i,t)};ni[se]=!0;var kr=e("unscopables"),dr=Array.prototype;dr[kr]==undefined&&o(dr,kr,he(null));var gr=function(n){dr[kr][n]=!0},g={},rl=!u(function(){function n(){}return n.prototype.constructor=null,Object.getPrototypeOf(new n)!==n.prototype}),ce=cr("IE_PROTO"),ul=Object.prototype,ci=rl?Object.getPrototypeOf:function(n){return(n=fi(n),r(n,ce))?n[ce]:typeof n.constructor=="function"&&n instanceof n.constructor?n.constructor.prototype:n instanceof Object?ul:null},le=e("iterator"),ae=!1,fl=function(){return this},nt,nu,tu;[].keys&&(tu=[].keys(),"next"in tu?(nu=ci(ci(tu)),nu!==Object.prototype&&(nt=nu)):ae=!0);nt==undefined&&(nt={});r(nt,le)||o(nt,le,fl);var iu={IteratorPrototype:nt,BUGGY_SAFARI_ITERATORS:ae},el=k.f,ve=e("toStringTag"),ru=function(n,t,i){n&&!r(n=i?n:n.prototype,ve)&&el(n,ve,{configurable:!0,value:t})},ol=iu.IteratorPrototype,sl=function(){return this},hl=function(n,t,i){var r=t+" Iterator";return n.prototype=he(ol,{next:er(1,i)}),ru(n,r,!1),g[r]=sl,n},cl=function(t){if(!n(t)&&t!==null)throw TypeError("Can't set "+String(t)+" as a prototype");return t},li=Object.setPrototypeOf||("__proto__"in{}?function(){var t=!1,i={},n;try{n=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set;n.call(i,[]);t=i instanceof Array}catch(r){}return function(i,r){return s(i),cl(r),t?n.call(i,r):i.__proto__=r,i}}():undefined),uu=iu.IteratorPrototype,ai=iu.BUGGY_SAFARI_ITERATORS,lt=e("iterator"),ye="keys",vi="values",pe="entries",ll=function(){return this},we=function(n,t,i,r,u,f,e){hl(i,t,r);var y=function(n){if(n===u&&h)return h;if(!ai&&n in s)return s[n];switch(n){case ye:return function(){return new i(this,n)};case vi:return function(){return new i(this,n)};case pe:return function(){return new i(this,n)}}return function(){return new i(this)}},k=t+" Iterator",w=!1,s=n.prototype,a=s[lt]||s["@@iterator"]||u&&s[u],h=!ai&&a||y(u),b=t=="Array"?s.entries||a:a,c,v,p;if(b&&(c=ci(b.call(new n)),uu!==Object.prototype&&c.next&&(ci(c)!==uu&&(li?li(c,uu):typeof c[lt]!="function"&&o(c,lt,ll)),ru(c,k,!0))),u==vi&&a&&a.name!==vi&&(w=!0,h=function(){return a.call(this)}),s[lt]!==h&&o(s,lt,h),g[t]=h,u)if(v={values:y(vi),keys:f?h:y(ye),entries:y(pe)},e)for(p in v)!ai&&!w&&p in s||st(s,p,v[p]);else l({target:t,proto:!0,forced:ai||w},v);return v},be="Array Iterator",al=h.set,vl=h.getterFor(be),at=we(Array,"Array",function(n,t){al(this,{type:be,target:kt(n),index:0,kind:t})},function(){var t=vl(this),i=t.target,r=t.kind,n=t.index++;return!i||n>=i.length?(t.target=undefined,{value:undefined,done:!0}):r=="keys"?{value:n,done:!1}:r=="values"?{value:i[n],done:!1}:{value:[n,i[n]],done:!1}},"values");g.Arguments=g.Array;gr("keys");gr("values");gr("entries");var yi=Object.assign,ke=!yi||u(function(){var n={},t={},i=Symbol(),r="abcdefghijklmnopqrst";return n[i]=7,r.split("").forEach(function(n){t[n]=n}),yi({},n)[i]!=7||si(yi({},t)).join("")!=r})?function(n){for(var r=fi(n),s=arguments.length,u=1,f=gf.f,h=ef.f;s>u;)for(var t=wt(arguments[u++]),e=f?si(t).concat(f(t)):si(t),c=e.length,o=0,i;c>o;)i=e[o++],(!a||h.call(t,i))&&(r[i]=t[i]);return r}:yi;l({target:"Object",stat:!0,forced:Object.assign!==ke},{assign:ke});var yl=e("toStringTag"),pl=b(function(){return arguments}())=="Arguments",wl=function(n,t){try{return n[t]}catch(i){}},de=function(n){var t,i,r;return n===undefined?"Undefined":n===null?"Null":typeof(i=wl(t=Object(n),yl))=="string"?i:pl?b(t):(r=b(t))=="Object"&&typeof t.callee=="function"?"Arguments":r},bl=e("toStringTag"),fu={};fu[bl]="z";var ge=String(fu)!=="[object z]"?function(){return"[object "+de(this)+"]"}:fu.toString,no=Object.prototype;ge!==no.toString&&st(no,"toString",ge,{unsafe:!0});var eu="\t\n\x0b\f\r                　\u2028\u2029",pi="["+eu+"]",kl=RegExp("^"+pi+pi+"*"),dl=RegExp(pi+pi+"*$"),ou=function(n){return function(t){var i=String(bt(t));return n&1&&(i=i.replace(kl,"")),n&2&&(i=i.replace(dl,"")),i}},gl={start:ou(1),end:ou(2),trim:ou(3)},na=gl.trim,wi=t.parseInt,ta=/^[+-]?0[Xx]/,ia=wi(eu+"08")!==8||wi(eu+"0x16")!==22,to=ia?function(n,t){var i=na(String(n));return wi(i,t>>>0||(ta.test(i)?16:10))}:wi;l({global:!0,forced:parseInt!=to},{parseInt:to});var io=function(n){return function(t,i){var u=String(bt(t)),r=ar(i),o=u.length,f,e;return r<0||r>=o?n?"":undefined:(f=u.charCodeAt(r),f<55296||f>56319||r+1===o||(e=u.charCodeAt(r+1))<56320||e>57343?n?u.charAt(r):f:n?u.slice(r,r+2):(f-55296<<10)+(e-56320)+65536)}},ro={codeAt:io(!1),charAt:io(!0)},ra=ro.charAt,uo="String Iterator",ua=h.set,fa=h.getterFor(uo);we(String,"String",function(n){ua(this,{type:uo,string:String(n),index:0})},function(){var n=fa(this),i=n.string,r=n.index,t;return r>=i.length?{value:undefined,done:!0}:(t=ra(i,r),n.index+=t.length,{value:t,done:!1})});var su=function(n,t,i){for(var r in t)st(n,r,t[r],i);return n},ea=!u(function(){return Object.isExtensible(Object.preventExtensions({}))}),y=ft(function(t){var e=k.f,i=hr("meta"),o=0,u=Object.isExtensible||function(){return!0},f=function(n){e(n,i,{value:{objectID:"O"+ ++o,weakData:{}}})},s=function(t,e){if(!n(t))return typeof t=="symbol"?t:(typeof t=="string"?"S":"P")+t;if(!r(t,i)){if(!u(t))return"F";if(!e)return"E";f(t)}return t[i].objectID},h=function(n,t){if(!r(n,i)){if(!u(n))return!0;if(!t)return!1;f(n)}return n[i].weakData},c=function(n){return ea&&l.REQUIRED&&u(n)&&!r(n,i)&&f(n),n},l=t.exports={REQUIRED:!1,fastKey:s,getWeakData:h,onFreeze:c};ni[i]=!0}),ik=y.REQUIRED,rk=y.fastKey,uk=y.getWeakData,fk=y.onFreeze,oa=e("iterator"),sa=Array.prototype,ha=function(n){return n!==undefined&&(g.Array===n||sa[oa]===n)},ca=e("iterator"),la=function(n){if(n!=undefined)return n[ca]||n["@@iterator"]||g[de(n)]},aa=function(n,t,i,r){try{return r?t(s(i)[0],i[1]):t(i)}catch(f){var u=n["return"];u!==undefined&&s(u.call(n));throw f;}},fo=ft(function(n){var t=function(n,t){this.stopped=n;this.result=t},i=n.exports=function(n,i,r,u,f){var a=te(i,r,u?2:1),h,c,o,v,e,l;if(f)h=n;else{if(c=la(n),typeof c!="function")throw TypeError("Target is not iterable");if(ha(c)){for(o=0,v=ri(n.length);v>o;o++)if(e=u?a(s(l=n[o])[0],l[1]):a(n[o]),e&&e instanceof t)return e;return new t(!1)}h=c.call(n)}while(!(l=h.next()).done)if(e=aa(h,a,l.value,u),e&&e instanceof t)return e;return new t(!1)};i.stop=function(n){return new t(!0,n)}}),eo=function(n,t,i){if(!(n instanceof t))throw TypeError("Incorrect "+(i?i+" ":"")+"invocation");return n},oo=e("iterator"),so=!1;try{var va=0,ho={next:function(){return{done:!!va++}},"return":function(){so=!0}};ho[oo]=function(){return this};Array.from(ho,function(){throw 2;})}catch(bb){}var ya=function(n,t){if(!t&&!so)return!1;var i=!1;try{var r={};r[oo]=function(){return{next:function(){return{done:i=!0}}}};n(r)}catch(u){}return i},pa=function(t,i,r){var u,f;return li&&typeof(u=i.constructor)=="function"&&u!==r&&n(f=u.prototype)&&f!==r.prototype&&li(t,f),t},wa=function(i,r,f,e,o){var h=t[i],c=h&&h.prototype,s=h,a=e?"set":"add",w={},v=function(t){var i=c[t];st(c,t,t=="add"?function(n){return i.call(this,n===0?0:n),this}:t=="delete"?function(t){return o&&!n(t)?!1:i.call(this,t===0?0:t)}:t=="get"?function(t){return o&&!n(t)?undefined:i.call(this,t===0?0:t)}:t=="has"?function(t){return o&&!n(t)?!1:i.call(this,t===0?0:t)}:function(n,t){return i.call(this,n===0?0:n,t),this})};if(vr(i,typeof h!="function"||!(o||c.forEach&&!u(function(){(new h).entries().next()}))))s=f.getConstructor(r,i,e,a),y.REQUIRED=!0;else if(vr(i,!0)){var p=new s,k=p[a](o?{}:-0,1)!=p,d=u(function(){p.has(1)}),g=ya(function(n){new h(n)}),b=!o&&u(function(){for(var t=new h,n=5;n--;)t[a](n,n);return!t.has(-0)});g||(s=r(function(n,t){eo(n,s,i);var r=pa(new h,n,s);return t!=undefined&&fo(t,r[a],r,e),r}),s.prototype=c,c.constructor=s);(d||b)&&(v("delete"),v("has"),e&&v("get"));(b||k)&&v(a);o&&c.clear&&delete c.clear}return w[i]=s,l({global:!0,forced:s!=h},w),ru(s,i),o||f.setStrong(s,i,e),s},bi=y.getWeakData,ba=h.set,ka=h.getterFor,da=ei.find,ga=ei.findIndex,nv=0,ki=function(n){return n.frozen||(n.frozen=new co)},co=function(){this.entries=[]},hu=function(n,t){return da(n.entries,function(n){return n[0]===t})};co.prototype={get:function(n){var t=hu(this,n);if(t)return t[1]},has:function(n){return!!hu(this,n)},set:function(n,t){var i=hu(this,n);i?i[1]=t:this.entries.push([n,t])},"delete":function(n){var t=ga(this.entries,function(t){return t[0]===n});return~t&&this.entries.splice(t,1),!!~t}};var lo={getConstructor:function(t,i,u,f){var e=t(function(n,t){eo(n,e,i);ba(n,{type:i,id:nv++,frozen:undefined});t!=undefined&&fo(t,n[f],n,u)}),o=ka(i),h=function(n,t,i){var r=o(n),u=bi(s(t),!0);return u===!0?ki(r).set(t,i):u[r.id]=i,n};return su(e.prototype,{"delete":function(t){var u=o(this);if(!n(t))return!1;var i=bi(t);return i===!0?ki(u)["delete"](t):i&&r(i,u.id)&&delete i[u.id]},has:function(t){var u=o(this);if(!n(t))return!1;var i=bi(t);return i===!0?ki(u).has(t):i&&r(i,u.id)}}),su(e.prototype,u?{get:function(t){var r=o(this);if(n(t)){var i=bi(t);return i===!0?ki(r).get(t):i?i[r.id]:undefined}},set:function(n,t){return h(this,n,t)}}:{add:function(n){return h(this,n,!0)}}),e}},ek=ft(function(i){var f=h.enforce,v=!t.ActiveXObject&&"ActiveXObject"in t,e=Object.isExtensible,r,s=function(n){return function(){return n(this,arguments.length?arguments[0]:undefined)}},p=i.exports=wa("WeakMap",s,lo,!0,!0);if(yf&&v){r=lo.getConstructor(s,"WeakMap",!0);y.REQUIRED=!0;var u=p.prototype,c=u["delete"],o=u.has,l=u.get,a=u.set;su(u,{"delete":function(t){if(n(t)&&!e(t)){var i=f(this);return i.frozen||(i.frozen=new r),c.call(this,t)||i.frozen["delete"](t)}return c.call(this,t)},has:function(t){if(n(t)&&!e(t)){var i=f(this);return i.frozen||(i.frozen=new r),o.call(this,t)||i.frozen.has(t)}return o.call(this,t)},get:function(t){if(n(t)&&!e(t)){var i=f(this);return i.frozen||(i.frozen=new r),o.call(this,t)?l.call(this,t):i.frozen.get(t)}return l.call(this,t)},set:function(t,i){if(n(t)&&!e(t)){var u=f(this);u.frozen||(u.frozen=new r);o.call(this,t)?a.call(this,t,i):u.frozen.set(t,i)}else a.call(this,t,i);return this}})}}),cu=e("iterator"),ao=e("toStringTag"),lu=at.values;for(var au in yr){var vo=t[au],c=vo&&vo.prototype;if(c){if(c[cu]!==lu)try{o(c,cu,lu)}catch(bb){c[cu]=lu}if(c[ao]||o(c,ao,au),yr[au])for(var tt in at)if(c[tt]!==at[tt])try{o(c,tt,at[tt])}catch(bb){c[tt]=at[tt]}}}var yo="Expected a function",po=0/0,tv="[object Symbol]",iv=/^\s+|\s+$/g,rv=/^[-+]0x[0-9a-f]+$/i,uv=/^0b[01]+$/i,fv=/^0o[0-7]+$/i,ev=parseInt,ov=typeof f=="object"&&f&&f.Object===Object&&f,sv=typeof self=="object"&&self&&self.Object===Object&&self,hv=ov||sv||Function("return this")(),cv=Object.prototype,lv=cv.toString,av=Math.max,vv=Math.min,vu=function(){return hv.Date.now()};function yv(n,t,i){var f,o,c,e,r,u,s=0,p=!1,h=!1,a=!0;if(typeof n!="function")throw new TypeError(yo);t=wo(t)||0;di(i)&&(p=!!i.leading,h="maxWait"in i,c=h?av(wo(i.maxWait)||0,t):c,a="trailing"in i?!!i.trailing:a);function v(t){var i=f,r=o;return f=o=undefined,s=t,e=n.apply(r,i)}function k(n){return s=n,r=setTimeout(l,t),p?v(n):e}function d(n){var r=n-u,f=n-s,i=t-r;return h?vv(i,c-f):i}function w(n){var i=n-u,r=n-s;return u===undefined||i>=t||i<0||h&&r>=c}function l(){var n=vu();if(w(n))return b(n);r=setTimeout(l,d(n))}function b(n){return(r=undefined,a&&f)?v(n):(f=o=undefined,e)}function g(){r!==undefined&&clearTimeout(r);s=0;f=u=o=r=undefined}function nt(){return r===undefined?e:b(vu())}function y(){var n=vu(),i=w(n);if(f=arguments,o=this,u=n,i){if(r===undefined)return k(u);if(h)return r=setTimeout(l,t),v(u)}return r===undefined&&(r=setTimeout(l,t)),e}return y.cancel=g,y.flush=nt,y}function pv(n,t,i){var r=!0,u=!0;if(typeof n!="function")throw new TypeError(yo);return di(i)&&(r="leading"in i?!!i.leading:r,u="trailing"in i?!!i.trailing:u),yv(n,t,{leading:r,maxWait:t,trailing:u})}function di(n){var t=typeof n;return!!n&&(t=="object"||t=="function")}function wv(n){return!!n&&typeof n=="object"}function bv(n){return typeof n=="symbol"||wv(n)&&lv.call(n)==tv}function wo(n){if(typeof n=="number")return n;if(bv(n))return po;if(di(n)){var t=typeof n.valueOf=="function"?n.valueOf():n;n=di(t)?t+"":t}if(typeof n!="string")return n===0?n:+n;n=n.replace(iv,"");var i=uv.test(n);return i||fv.test(n)?ev(n.slice(2),i?2:8):rv.test(n)?po:+n}var bo=pv,kv="Expected a function",ko=0/0,dv="[object Symbol]",gv=/^\s+|\s+$/g,ny=/^[-+]0x[0-9a-f]+$/i,ty=/^0b[01]+$/i,iy=/^0o[0-7]+$/i,ry=parseInt,uy=typeof f=="object"&&f&&f.Object===Object&&f,fy=typeof self=="object"&&self&&self.Object===Object&&self,ey=uy||fy||Function("return this")(),oy=Object.prototype,sy=oy.toString,hy=Math.max,cy=Math.min,yu=function(){return ey.Date.now()};function ly(n,t,i){var f,o,c,e,r,u,s=0,p=!1,h=!1,a=!0;if(typeof n!="function")throw new TypeError(kv);t=go(t)||0;pu(i)&&(p=!!i.leading,h="maxWait"in i,c=h?hy(go(i.maxWait)||0,t):c,a="trailing"in i?!!i.trailing:a);function v(t){var i=f,r=o;return f=o=undefined,s=t,e=n.apply(r,i)}function k(n){return s=n,r=setTimeout(l,t),p?v(n):e}function d(n){var r=n-u,f=n-s,i=t-r;return h?cy(i,c-f):i}function w(n){var i=n-u,r=n-s;return u===undefined||i>=t||i<0||h&&r>=c}function l(){var n=yu();if(w(n))return b(n);r=setTimeout(l,d(n))}function b(n){return(r=undefined,a&&f)?v(n):(f=o=undefined,e)}function g(){r!==undefined&&clearTimeout(r);s=0;f=u=o=r=undefined}function nt(){return r===undefined?e:b(yu())}function y(){var n=yu(),i=w(n);if(f=arguments,o=this,u=n,i){if(r===undefined)return k(u);if(h)return r=setTimeout(l,t),v(u)}return r===undefined&&(r=setTimeout(l,t)),e}return y.cancel=g,y.flush=nt,y}function pu(n){var t=typeof n;return!!n&&(t=="object"||t=="function")}function ay(n){return!!n&&typeof n=="object"}function vy(n){return typeof n=="symbol"||ay(n)&&sy.call(n)==dv}function go(n){if(typeof n=="number")return n;if(vy(n))return ko;if(pu(n)){var t=typeof n.valueOf=="function"?n.valueOf():n;n=pu(t)?t+"":t}if(typeof n!="string")return n===0?n:+n;n=n.replace(gv,"");var i=ty.test(n);return i||iy.test(n)?ry(n.slice(2),i?2:8):ny.test(n)?ko:+n}var ns=ly,yy="Expected a function",ts="__lodash_hash_undefined__",py="[object Function]",wy="[object GeneratorFunction]",by=/^\[object .+?Constructor\]$/,ky=typeof f=="object"&&f&&f.Object===Object&&f,dy=typeof self=="object"&&self&&self.Object===Object&&self,is=ky||dy||Function("return this")();function gy(n,t){return n==null?undefined:n[t]}function np(n){var t=!1;if(n!=null&&typeof n.toString!="function")try{t=!!(n+"")}catch(i){}return t}var tp=Array.prototype,ip=Function.prototype,rs=Object.prototype,wu=is["__core-js_shared__"],us=function(){var n=/[^.]+$/.exec(wu&&wu.keys&&wu.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""}(),fs=ip.toString,bu=rs.hasOwnProperty,rp=rs.toString,up=RegExp("^"+fs.call(bu).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),fp=tp.splice,ep=es(is,"Map"),vt=es(Object,"create");function p(n){var t=-1,r=n?n.length:0;for(this.clear();++t<r;){var i=n[t];this.set(i[0],i[1])}}function op(){this.__data__=vt?vt(null):{}}function sp(n){return this.has(n)&&delete this.__data__[n]}function hp(n){var t=this.__data__;if(vt){var i=t[n];return i===ts?undefined:i}return bu.call(t,n)?t[n]:undefined}function cp(n){var t=this.__data__;return vt?t[n]!==undefined:bu.call(t,n)}function lp(n,t){var i=this.__data__;return i[n]=vt&&t===undefined?ts:t,this}p.prototype.clear=op;p.prototype["delete"]=sp;p.prototype.get=hp;p.prototype.has=cp;p.prototype.set=lp;function it(n){var t=-1,r=n?n.length:0;for(this.clear();++t<r;){var i=n[t];this.set(i[0],i[1])}}function ap(){this.__data__=[]}function vp(n){var t=this.__data__,i=gi(t,n);if(i<0)return!1;var r=t.length-1;return i==r?t.pop():fp.call(t,i,1),!0}function yp(n){var t=this.__data__,i=gi(t,n);return i<0?undefined:t[i][1]}function pp(n){return gi(this.__data__,n)>-1}function wp(n,t){var i=this.__data__,r=gi(i,n);return r<0?i.push([n,t]):i[r][1]=t,this}it.prototype.clear=ap;it.prototype["delete"]=vp;it.prototype.get=yp;it.prototype.has=pp;it.prototype.set=wp;function w(n){var t=-1,r=n?n.length:0;for(this.clear();++t<r;){var i=n[t];this.set(i[0],i[1])}}function bp(){this.__data__={hash:new p,map:new(ep||it),string:new p}}function kp(n){return nr(this,n)["delete"](n)}function dp(n){return nr(this,n).get(n)}function gp(n){return nr(this,n).has(n)}function nw(n,t){return nr(this,n).set(n,t),this}w.prototype.clear=bp;w.prototype["delete"]=kp;w.prototype.get=dp;w.prototype.has=gp;w.prototype.set=nw;function gi(n,t){for(var i=n.length;i--;)if(fw(n[i][0],t))return i;return-1}function tw(n){if(!os(n)||rw(n))return!1;var t=ew(n)||np(n)?up:by;return t.test(uw(n))}function nr(n,t){var i=n.__data__;return iw(t)?i[typeof t=="string"?"string":"hash"]:i.map}function es(n,t){var i=gy(n,t);return tw(i)?i:undefined}function iw(n){var t=typeof n;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?n!=="__proto__":n===null}function rw(n){return!!us&&us in n}function uw(n){if(n!=null){try{return fs.call(n)}catch(t){}try{return n+""}catch(t){}}return""}function ku(n,t){if(typeof n!="function"||t&&typeof t!="function")throw new TypeError(yy);var i=function(){var r=arguments,u=t?t.apply(this,r):r[0],f=i.cache;if(f.has(u))return f.get(u);var e=n.apply(this,r);return i.cache=f.set(u,e),e};return i.cache=new(ku.Cache||w),i}ku.Cache=w;function fw(n,t){return n===t||n!==n&&t!==t}function ew(n){var t=os(n)?rp.call(n):"";return t==py||t==wy}function os(n){var t=typeof n;return!!n&&(t=="object"||t=="function")}var ow=ku,ss=function(){function n(n,t){var i=-1;return n.some(function(n,r){return n[0]===t?(i=r,!0):!1}),i}return typeof Map!="undefined"?Map:function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(t){var r=n(this.__entries__,t),i=this.__entries__[r];return i&&i[1]},t.prototype.set=function(t,i){var r=n(this.__entries__,t);~r?this.__entries__[r][1]=i:this.__entries__.push([t,i])},t.prototype.delete=function(t){var i=this.__entries__,r=n(i,t);~r&&i.splice(r,1)},t.prototype.has=function(t){return!!~n(this.__entries__,t)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(n,t){t===void 0&&(t=null);for(var i=0,r=this.__entries__;i<r.length;i++){var u=r[i];n.call(t,u[1],u[0])}},t}()}(),du=typeof window!="undefined"&&typeof document!="undefined"&&window.document===document,tr=function(){return typeof global!="undefined"&&global.Math===Math?global:typeof self!="undefined"&&self.Math===Math?self:typeof window!="undefined"&&window.Math===Math?window:Function("return this")()}(),sw=function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(tr):function(n){return setTimeout(function(){return n(Date.now())},1e3/60)}}(),hw=2;function cw(n,t){var i=!1,r=!1,u=0;function e(){i&&(i=!1,n());r&&f()}function o(){sw(e)}function f(){var n=Date.now();if(i){if(n-u<hw)return;r=!0}else i=!0,r=!1,setTimeout(o,t);u=n}return f}var lw=20,aw=["top","right","bottom","left","width","height","size","weight"],vw=typeof MutationObserver!="undefined",yw=function(){function n(){this.connected_=!1;this.mutationEventsAdded_=!1;this.mutationsObserver_=null;this.observers_=[];this.onTransitionEnd_=this.onTransitionEnd_.bind(this);this.refresh=cw(this.refresh.bind(this),lw)}return n.prototype.addObserver=function(n){~this.observers_.indexOf(n)||this.observers_.push(n);this.connected_||this.connect_()},n.prototype.removeObserver=function(n){var t=this.observers_,i=t.indexOf(n);~i&&t.splice(i,1);!t.length&&this.connected_&&this.disconnect_()},n.prototype.refresh=function(){var n=this.updateObservers_();n&&this.refresh()},n.prototype.updateObservers_=function(){var n=this.observers_.filter(function(n){return n.gatherActive(),n.hasActive()});return n.forEach(function(n){return n.broadcastActive()}),n.length>0},n.prototype.connect_=function(){du&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),vw?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},n.prototype.disconnect_=function(){du&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},n.prototype.onTransitionEnd_=function(n){var t=n.propertyName,i=t===void 0?"":t,r=aw.some(function(n){return!!~i.indexOf(n)});r&&this.refresh()},n.getInstance=function(){return this.instance_||(this.instance_=new n),this.instance_},n.instance_=null,n}(),hs=function(n,t){for(var i=0,r=Object.keys(t);i<r.length;i++){var u=r[i];Object.defineProperty(n,u,{value:t[u],enumerable:!1,writable:!1,configurable:!0})}return n},rt=function(n){var t=n&&n.ownerDocument&&n.ownerDocument.defaultView;return t||tr},cs=rr(0,0,0,0);function ir(n){return parseFloat(n)||0}function ls(n){for(var i=[],t=1;t<arguments.length;t++)i[t-1]=arguments[t];return i.reduce(function(t,i){var r=n["border-"+i+"-width"];return t+ir(r)},0)}function pw(n){for(var i={},t=0,r=["top","right","bottom","left"];t<r.length;t++){var u=r[t],f=n["padding-"+u];i[u]=ir(f)}return i}function ww(n){var t=n.getBBox();return rr(0,0,t.width,t.height)}function bw(n){var f=n.clientWidth,e=n.clientHeight;if(!f&&!e)return cs;var t=rt(n).getComputedStyle(n),i=pw(t),o=i.left+i.right,s=i.top+i.bottom,r=ir(t.width),u=ir(t.height);if(t.boxSizing==="border-box"&&(Math.round(r+o)!==f&&(r-=ls(t,"left","right")+o),Math.round(u+s)!==e&&(u-=ls(t,"top","bottom")+s)),!dw(n)){var h=Math.round(r+o)-f,c=Math.round(u+s)-e;Math.abs(h)!==1&&(r-=h);Math.abs(c)!==1&&(u-=c)}return rr(i.left,i.top,r,u)}var kw=function(){return typeof SVGGraphicsElement!="undefined"?function(n){return n instanceof rt(n).SVGGraphicsElement}:function(n){return n instanceof rt(n).SVGElement&&typeof n.getBBox=="function"}}();function dw(n){return n===rt(n).document.documentElement}function gw(n){return du?kw(n)?ww(n):bw(n):cs}function nb(n){var t=n.x,i=n.y,r=n.width,u=n.height,e=typeof DOMRectReadOnly!="undefined"?DOMRectReadOnly:Object,f=Object.create(e.prototype);return hs(f,{x:t,y:i,width:r,height:u,top:i,right:t+r,bottom:u+i,left:t}),f}function rr(n,t,i,r){return{x:n,y:t,width:i,height:r}}var tb=function(){function n(n){this.broadcastWidth=0;this.broadcastHeight=0;this.contentRect_=rr(0,0,0,0);this.target=n}return n.prototype.isActive=function(){var n=gw(this.target);return this.contentRect_=n,n.width!==this.broadcastWidth||n.height!==this.broadcastHeight},n.prototype.broadcastRect=function(){var n=this.contentRect_;return this.broadcastWidth=n.width,this.broadcastHeight=n.height,n},n}(),ib=function(){function n(n,t){var i=nb(t);hs(this,{target:n,contentRect:i})}return n}(),rb=function(){function n(n,t,i){if(this.activeObservations_=[],this.observations_=new ss,typeof n!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=n;this.controller_=t;this.callbackCtx_=i}return n.prototype.observe=function(n){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(typeof Element!="undefined"&&Element instanceof Object){if(!(n instanceof rt(n).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(n)||(t.set(n,new tb(n)),this.controller_.addObserver(this),this.controller_.refresh())}},n.prototype.unobserve=function(n){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(typeof Element!="undefined"&&Element instanceof Object){if(!(n instanceof rt(n).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(n)&&(t.delete(n),t.size||this.controller_.removeObserver(this))}},n.prototype.disconnect=function(){this.clearActive();this.observations_.clear();this.controller_.removeObserver(this)},n.prototype.gatherActive=function(){var n=this;this.clearActive();this.observations_.forEach(function(t){t.isActive()&&n.activeObservations_.push(t)})},n.prototype.broadcastActive=function(){if(this.hasActive()){var n=this.callbackCtx_,t=this.activeObservations_.map(function(n){return new ib(n.target,n.broadcastRect())});this.callback_.call(n,t,n);this.clearActive()}},n.prototype.clearActive=function(){this.activeObservations_.splice(0)},n.prototype.hasActive=function(){return this.activeObservations_.length>0},n}(),as=typeof WeakMap!="undefined"?new WeakMap:new ss,vs=function(){function n(t){if(!(this instanceof n))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var i=yw.getInstance(),r=new rb(t,i,this);as.set(this,r)}return n}();["observe","unobserve","disconnect"].forEach(function(n){vs.prototype[n]=function(){var t;return(t=as.get(this))[n].apply(t,arguments)}});var ub=function(){return typeof tr.ResizeObserver!="undefined"?tr.ResizeObserver:vs}(),ut=null,ys=null;pr&&window.addEventListener("resize",function(){ys!==window.devicePixelRatio&&(ys=window.devicePixelRatio,ut=null)});function ps(){if(ut===null){if(typeof document=="undefined")return ut=0;var t=document.body,n=document.createElement("div");n.classList.add("asl_simplebar-hide-scrollbar");t.appendChild(n);var i=n.getBoundingClientRect().right;t.removeChild(n);ut=i}return ut}var i=function(){function t(n,i){var r=this;(this.onScroll=function(){r.scrollXTicking||(window.requestAnimationFrame(r.scrollX),r.scrollXTicking=!0);r.scrollYTicking||(window.requestAnimationFrame(r.scrollY),r.scrollYTicking=!0)},this.scrollX=function(){r.axis.x.isOverflowing&&(r.showScrollbar("x"),r.positionScrollbar("x"));r.scrollXTicking=!1},this.scrollY=function(){r.axis.y.isOverflowing&&(r.showScrollbar("y"),r.positionScrollbar("y"));r.scrollYTicking=!1},this.onMouseEnter=function(){r.showScrollbar("x");r.showScrollbar("y")},this.onMouseMove=function(n){if(r.mouseX=n.clientX,r.mouseY=n.clientY,r.axis.x.isOverflowing||r.axis.x.forceVisible)r.onMouseMoveForAxis("x");if(r.axis.y.isOverflowing||r.axis.y.forceVisible)r.onMouseMoveForAxis("y")},this.onMouseLeave=function(){if(r.onMouseMove.cancel(),r.axis.x.isOverflowing||r.axis.x.forceVisible)r.onMouseLeaveForAxis("x");if(r.axis.y.isOverflowing||r.axis.y.forceVisible)r.onMouseLeaveForAxis("y");r.mouseX=-1;r.mouseY=-1},this.onWindowResize=function(){r.scrollbarWidth=r.getScrollbarWidth();r.hideNativeScrollbar()},this.hideScrollbars=function(){r.axis.x.track.rect=r.axis.x.track.el.getBoundingClientRect();r.axis.y.track.rect=r.axis.y.track.el.getBoundingClientRect();r.isWithinBounds(r.axis.y.track.rect)||(r.axis.y.scrollbar.el.classList.remove(r.classNames.visible),r.axis.y.isVisible=!1);r.isWithinBounds(r.axis.x.track.rect)||(r.axis.x.scrollbar.el.classList.remove(r.classNames.visible),r.axis.x.isVisible=!1)},this.onPointerEvent=function(n){var t,i;if(r.axis.x.track.rect=r.axis.x.track.el.getBoundingClientRect(),r.axis.y.track.rect=r.axis.y.track.el.getBoundingClientRect(),(r.axis.x.isOverflowing||r.axis.x.forceVisible)&&(t=r.isWithinBounds(r.axis.x.track.rect)),(r.axis.y.isOverflowing||r.axis.y.forceVisible)&&(i=r.isWithinBounds(r.axis.y.track.rect)),(t||i)&&(n.preventDefault(),n.stopPropagation(),n.type==="mousedown")){if(t)if(r.axis.x.scrollbar.rect=r.axis.x.scrollbar.el.getBoundingClientRect(),r.isWithinBounds(r.axis.x.scrollbar.rect))r.onDragStart(n,"x");else r.onTrackClick(n,"x");if(i)if(r.axis.y.scrollbar.rect=r.axis.y.scrollbar.el.getBoundingClientRect(),r.isWithinBounds(r.axis.y.scrollbar.rect))r.onDragStart(n,"y");else r.onTrackClick(n,"y")}},this.drag=function(n){var u,f=r.axis[r.draggedAxis].track,e=f.rect[r.axis[r.draggedAxis].sizeAttr],o=r.axis[r.draggedAxis].scrollbar,s=r.contentWrapperEl[r.axis[r.draggedAxis].scrollSizeAttr],h=parseInt(r.elStyles[r.axis[r.draggedAxis].sizeAttr],10);n.preventDefault();n.stopPropagation();u=r.draggedAxis==="y"?n.pageY:n.pageX;var c=u-f.rect[r.axis[r.draggedAxis].offsetAttr]-r.axis[r.draggedAxis].dragOffset,l=c/(e-o.size),i=l*(s-h);r.draggedAxis==="x"&&(i=r.isRtl&&t.getRtlHelpers().isRtlScrollbarInverted?i-(e+o.size):i,i=r.isRtl&&t.getRtlHelpers().isRtlScrollingInverted?-i:i);r.contentWrapperEl[r.axis[r.draggedAxis].scrollOffsetAttr]=i},this.onEndDrag=function(n){n.preventDefault();n.stopPropagation();r.el.classList.remove(r.classNames.dragging);document.removeEventListener("mousemove",r.drag,!0);document.removeEventListener("mouseup",r.onEndDrag,!0);r.removePreventClickId=window.setTimeout(function(){document.removeEventListener("click",r.preventClick,!0);document.removeEventListener("dblclick",r.preventClick,!0);r.removePreventClickId=null})},this.preventClick=function(n){n.preventDefault();n.stopPropagation()},this.el=n,this.minScrollbarWidth=20,this.options=Object.assign({},t.defaultOptions,{},i),this.classNames=Object.assign({},t.defaultOptions.classNames,{},this.options.classNames),this.axis={x:{scrollOffsetAttr:"scrollLeft",sizeAttr:"width",scrollSizeAttr:"scrollWidth",offsetSizeAttr:"offsetWidth",offsetAttr:"left",overflowAttr:"overflowX",dragOffset:0,isOverflowing:!0,isVisible:!1,forceVisible:!1,track:{},scrollbar:{}},y:{scrollOffsetAttr:"scrollTop",sizeAttr:"height",scrollSizeAttr:"scrollHeight",offsetSizeAttr:"offsetHeight",offsetAttr:"top",overflowAttr:"overflowY",dragOffset:0,isOverflowing:!0,isVisible:!1,forceVisible:!1,track:{},scrollbar:{}}},this.removePreventClickId=null,t.instances.has(this.el))||(this.recalculate=bo(this.recalculate.bind(this),64),this.onMouseMove=bo(this.onMouseMove.bind(this),64),this.hideScrollbars=ns(this.hideScrollbars.bind(this),this.options.timeout),this.onWindowResize=ns(this.onWindowResize.bind(this),64,{leading:!0}),t.getRtlHelpers=ow(t.getRtlHelpers),this.init())}t.getRtlHelpers=function(){var r=document.createElement("div");r.innerHTML='<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"><\/div><\/div>';var n=r.firstElementChild;document.body.appendChild(n);var u=n.firstElementChild;n.scrollLeft=0;var f=t.getOffset(n),i=t.getOffset(u);n.scrollLeft=999;var e=t.getOffset(u);return{isRtlScrollingInverted:f.left!==i.left&&i.left-e.left!=0,isRtlScrollbarInverted:f.left!==i.left}};t.getOffset=function(n){var t=n.getBoundingClientRect();return{top:t.top+(window.pageYOffset||document.documentElement.scrollTop),left:t.left+(window.pageXOffset||document.documentElement.scrollLeft)}};var n=t.prototype;return n.init=function(){t.instances.set(this.el,this);pr&&(this.initDOM(),this.scrollbarWidth=this.getScrollbarWidth(),this.recalculate(),this.initListeners())},n.initDOM=function(){var i=this;if(Array.prototype.filter.call(this.el.children,function(n){return n.classList.contains(i.classNames.wrapper)}).length)this.wrapperEl=this.el.querySelector("."+this.classNames.wrapper),this.contentWrapperEl=this.options.scrollableNode||this.el.querySelector("."+this.classNames.contentWrapper),this.contentEl=this.options.contentNode||this.el.querySelector("."+this.classNames.contentEl),this.offsetEl=this.el.querySelector("."+this.classNames.offset),this.maskEl=this.el.querySelector("."+this.classNames.mask),this.placeholderEl=this.findChild(this.wrapperEl,"."+this.classNames.placeholder),this.heightAutoObserverWrapperEl=this.el.querySelector("."+this.classNames.heightAutoObserverWrapperEl),this.heightAutoObserverEl=this.el.querySelector("."+this.classNames.heightAutoObserverEl),this.axis.x.track.el=this.findChild(this.el,"."+this.classNames.track+"."+this.classNames.horizontal),this.axis.y.track.el=this.findChild(this.el,"."+this.classNames.track+"."+this.classNames.vertical);else{for(this.wrapperEl=document.createElement("div"),this.contentWrapperEl=document.createElement("div"),this.offsetEl=document.createElement("div"),this.maskEl=document.createElement("div"),this.contentEl=document.createElement("div"),this.placeholderEl=document.createElement("div"),this.heightAutoObserverWrapperEl=document.createElement("div"),this.heightAutoObserverEl=document.createElement("div"),this.wrapperEl.classList.add(this.classNames.wrapper),this.contentWrapperEl.classList.add(this.classNames.contentWrapper),this.offsetEl.classList.add(this.classNames.offset),this.maskEl.classList.add(this.classNames.mask),this.contentEl.classList.add(this.classNames.contentEl),this.placeholderEl.classList.add(this.classNames.placeholder),this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl),this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);this.el.firstChild;)this.contentEl.appendChild(this.el.firstChild);this.contentWrapperEl.appendChild(this.contentEl);this.offsetEl.appendChild(this.contentWrapperEl);this.maskEl.appendChild(this.offsetEl);this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);this.wrapperEl.appendChild(this.maskEl);this.wrapperEl.appendChild(this.placeholderEl);this.el.appendChild(this.wrapperEl)}if(!this.axis.x.track.el||!this.axis.y.track.el){var n=document.createElement("div"),t=document.createElement("div");n.classList.add(this.classNames.track);t.classList.add(this.classNames.scrollbar);n.appendChild(t);this.axis.x.track.el=n.cloneNode(!0);this.axis.x.track.el.classList.add(this.classNames.horizontal);this.axis.y.track.el=n.cloneNode(!0);this.axis.y.track.el.classList.add(this.classNames.vertical);this.el.appendChild(this.axis.x.track.el);this.el.appendChild(this.axis.y.track.el)}this.axis.x.scrollbar.el=this.axis.x.track.el.querySelector("."+this.classNames.scrollbar);this.axis.y.scrollbar.el=this.axis.y.track.el.querySelector("."+this.classNames.scrollbar);this.options.autoHide||(this.axis.x.scrollbar.el.classList.add(this.classNames.visible),this.axis.y.scrollbar.el.classList.add(this.classNames.visible));this.el.setAttribute("data-asl_simplebar","init")},n.initListeners=function(){var n=this;this.options.autoHide&&this.el.addEventListener("mouseenter",this.onMouseEnter);["mousedown","click","dblclick"].forEach(function(t){n.el.addEventListener(t,n.onPointerEvent,!0)});["touchstart","touchend","touchmove"].forEach(function(t){n.el.addEventListener(t,n.onPointerEvent,{capture:!0,passive:!0})});this.el.addEventListener("mousemove",this.onMouseMove);this.el.addEventListener("mouseleave",this.onMouseLeave);this.contentWrapperEl.addEventListener("scroll",this.onScroll);window.addEventListener("resize",this.onWindowResize);var t=!1;this.resizeObserver=new ub(function(){t&&n.recalculate()});this.resizeObserver.observe(this.el);this.resizeObserver.observe(this.contentEl);window.requestAnimationFrame(function(){t=!0});this.mutationObserver=new MutationObserver(this.recalculate);this.mutationObserver.observe(this.contentEl,{childList:!0,subtree:!0,characterData:!0})},n.recalculate=function(){this.elStyles=window.getComputedStyle(this.el);this.isRtl=this.elStyles.direction==="rtl";var u=this.heightAutoObserverEl.offsetHeight<=1,f=this.heightAutoObserverEl.offsetWidth<=1,t=this.contentEl.offsetWidth,e=this.contentWrapperEl.offsetWidth,o=this.elStyles.overflowX,s=this.elStyles.overflowY;this.contentEl.style.padding=this.elStyles.paddingTop+" "+this.elStyles.paddingRight+" "+this.elStyles.paddingBottom+" "+this.elStyles.paddingLeft;this.wrapperEl.style.margin="-"+this.elStyles.paddingTop+" -"+this.elStyles.paddingRight+" -"+this.elStyles.paddingBottom+" -"+this.elStyles.paddingLeft;var n=this.contentEl.scrollHeight,i=this.contentEl.scrollWidth;this.contentWrapperEl.style.height=u?"auto":"100%";this.placeholderEl.style.width=f?t+"px":"auto";this.placeholderEl.style.height=n+"px";var r=this.contentWrapperEl.offsetHeight;this.axis.x.isOverflowing=i>t;this.axis.y.isOverflowing=n>r;this.axis.x.isOverflowing=o==="hidden"?!1:this.axis.x.isOverflowing;this.axis.y.isOverflowing=s==="hidden"?!1:this.axis.y.isOverflowing;this.axis.x.forceVisible=this.options.forceVisible==="x"||this.options.forceVisible===!0;this.axis.y.forceVisible=this.options.forceVisible==="y"||this.options.forceVisible===!0;this.hideNativeScrollbar();var h=this.axis.x.isOverflowing?this.scrollbarWidth:0,c=this.axis.y.isOverflowing?this.scrollbarWidth:0;this.axis.x.isOverflowing=this.axis.x.isOverflowing&&i>e-c;this.axis.y.isOverflowing=this.axis.y.isOverflowing&&n>r-h;this.axis.x.scrollbar.size=this.getScrollbarSize("x");this.axis.y.scrollbar.size=this.getScrollbarSize("y");this.axis.x.scrollbar.el.style.width=this.axis.x.scrollbar.size+"px";this.axis.y.scrollbar.el.style.height=this.axis.y.scrollbar.size+"px";this.positionScrollbar("x");this.positionScrollbar("y");this.toggleTrackVisibility("x");this.toggleTrackVisibility("y")},n.getScrollbarSize=function(n){if(n===void 0&&(n="y"),!this.axis[n].isOverflowing)return 0;var r=this.contentEl[this.axis[n].scrollSizeAttr],i=this.axis[n].track.el[this.axis[n].offsetSizeAttr],t,u=i/r;return t=Math.max(~~(u*i),this.options.scrollbarMinSize),this.options.scrollbarMaxSize&&(t=Math.min(t,this.options.scrollbarMaxSize)),t},n.positionScrollbar=function(n){if(n===void 0&&(n="y"),this.axis[n].isOverflowing){var e=this.contentWrapperEl[this.axis[n].scrollSizeAttr],f=this.axis[n].track.el[this.axis[n].offsetSizeAttr],o=parseInt(this.elStyles[this.axis[n].sizeAttr],10),u=this.axis[n].scrollbar,r=this.contentWrapperEl[this.axis[n].scrollOffsetAttr];r=n==="x"&&this.isRtl&&t.getRtlHelpers().isRtlScrollingInverted?-r:r;var s=r/(e-o),i=~~((f-u.size)*s);i=n==="x"&&this.isRtl&&t.getRtlHelpers().isRtlScrollbarInverted?i+(f-u.size):i;u.el.style.transform=n==="x"?"translate3d("+i+"px, 0, 0)":"translate3d(0, "+i+"px, 0)"}},n.toggleTrackVisibility=function(n){n===void 0&&(n="y");var t=this.axis[n].track.el,i=this.axis[n].scrollbar.el;this.axis[n].isOverflowing||this.axis[n].forceVisible?(t.style.visibility="visible",this.contentWrapperEl.style[this.axis[n].overflowAttr]="scroll"):(t.style.visibility="hidden",this.contentWrapperEl.style[this.axis[n].overflowAttr]="hidden");i.style.display=this.axis[n].isOverflowing?"block":"none"},n.hideNativeScrollbar=function(){this.offsetEl.style[this.isRtl?"left":"right"]=this.axis.y.isOverflowing||this.axis.y.forceVisible?"-"+this.scrollbarWidth+"px":0;this.offsetEl.style.bottom=this.axis.x.isOverflowing||this.axis.x.forceVisible?"-"+this.scrollbarWidth+"px":0},n.onMouseMoveForAxis=function(n){n===void 0&&(n="y");this.axis[n].track.rect=this.axis[n].track.el.getBoundingClientRect();this.axis[n].scrollbar.rect=this.axis[n].scrollbar.el.getBoundingClientRect();var t=this.isWithinBounds(this.axis[n].scrollbar.rect);t?this.axis[n].scrollbar.el.classList.add(this.classNames.hover):this.axis[n].scrollbar.el.classList.remove(this.classNames.hover);this.isWithinBounds(this.axis[n].track.rect)?(this.showScrollbar(n),this.axis[n].track.el.classList.add(this.classNames.hover)):this.axis[n].track.el.classList.remove(this.classNames.hover)},n.onMouseLeaveForAxis=function(n){n===void 0&&(n="y");this.axis[n].track.el.classList.remove(this.classNames.hover);this.axis[n].scrollbar.el.classList.remove(this.classNames.hover)},n.showScrollbar=function(n){n===void 0&&(n="y");var t=this.axis[n].scrollbar.el;this.axis[n].isVisible||(t.classList.add(this.classNames.visible),this.axis[n].isVisible=!0);this.options.autoHide&&this.hideScrollbars()},n.onDragStart=function(n,t){t===void 0&&(t="y");var i=this.axis[t].scrollbar,r=t==="y"?n.pageY:n.pageX;this.axis[t].dragOffset=r-i.rect[this.axis[t].offsetAttr];this.draggedAxis=t;this.el.classList.add(this.classNames.dragging);document.addEventListener("mousemove",this.drag,!0);document.addEventListener("mouseup",this.onEndDrag,!0);this.removePreventClickId===null?(document.addEventListener("click",this.preventClick,!0),document.addEventListener("dblclick",this.preventClick,!0)):(window.clearTimeout(this.removePreventClickId),this.removePreventClickId=null)},n.onTrackClick=function(n,t){var r=this;t===void 0&&(t="y");this.axis[t].scrollbar.rect=this.axis[t].scrollbar.el.getBoundingClientRect();var c=this.axis[t].scrollbar,f=c.rect[this.axis[t].offsetAttr],e=parseInt(this.elStyles[this.axis[t].sizeAttr],10),i=this.contentWrapperEl[this.axis[t].scrollOffsetAttr],l=t==="y"?this.mouseY-f:this.mouseX-f,o=l<0?-1:1,s=o===-1?i-e:i+e,h=40,u=function u(){if(o===-1){if(i>s){var n;i-=h;r.contentWrapperEl.scrollTo((n={},n[r.axis[t].offsetAttr]=i,n));window.requestAnimationFrame(u)}}else if(i<s){var f;i+=h;r.contentWrapperEl.scrollTo((f={},f[r.axis[t].offsetAttr]=i,f));window.requestAnimationFrame(u)}};u()},n.getContentElement=function(){return this.contentEl},n.getScrollElement=function(){return this.contentWrapperEl},n.getScrollbarWidth=function(){try{return getComputedStyle(this.contentWrapperEl,"::-webkit-scrollbar").display==="none"||"scrollbarWidth"in document.documentElement.style?0:ps()}catch(n){return ps()}},n.removeListeners=function(){var n=this;this.options.autoHide&&this.el.removeEventListener("mouseenter",this.onMouseEnter);["mousedown","click","dblclick"].forEach(function(t){n.el.removeEventListener(t,n.onPointerEvent,!0)});["touchstart","touchend","touchmove"].forEach(function(t){n.el.removeEventListener(t,n.onPointerEvent,{capture:!0,passive:!0})});this.el.removeEventListener("mousemove",this.onMouseMove);this.el.removeEventListener("mouseleave",this.onMouseLeave);this.contentWrapperEl.removeEventListener("scroll",this.onScroll);window.removeEventListener("resize",this.onWindowResize);this.mutationObserver.disconnect();this.resizeObserver.disconnect();this.recalculate.cancel();this.onMouseMove.cancel();this.hideScrollbars.cancel();this.onWindowResize.cancel()},n.unMount=function(){this.removeListeners();t.instances.delete(this.el)},n.isWithinBounds=function(n){return this.mouseX>=n.left&&this.mouseX<=n.left+n.width&&this.mouseY>=n.top&&this.mouseY<=n.top+n.height},n.findChild=function(n,t){var i=n.matches||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector;return Array.prototype.filter.call(n.children,function(n){return i.call(n,t)})[0]},t}();i.defaultOptions={autoHide:!0,forceVisible:!1,classNames:{contentEl:"asl_simplebar-content",contentWrapper:"asl_simplebar-content-wrapper",offset:"asl_simplebar-offset",mask:"asl_simplebar-mask",wrapper:"asl_simplebar-wrapper",placeholder:"asl_simplebar-placeholder",scrollbar:"asl_simplebar-scrollbar",track:"asl_simplebar-track",heightAutoObserverWrapperEl:"asl_simplebar-height-auto-observer-wrapper",heightAutoObserverEl:"asl_simplebar-height-auto-observer",visible:"asl_simplebar-visible",horizontal:"asl_simplebar-horizontal",vertical:"asl_simplebar-vertical",hover:"asl_simplebar-hover",dragging:"asl_simplebar-dragging"},scrollbarMinSize:25,scrollbarMaxSize:0,timeout:1e3};i.instances=new WeakMap;var ws=function(n){return function(t,i,r,u){ne(i);var o=fi(t),e=wt(o),s=ri(o.length),f=n?s-1:0,h=n?-1:1;if(r<2)while(!0){if(f in e){u=e[f];f+=h;break}if(f+=h,n?f<0:s<=f)throw TypeError("Reduce of empty array with no initial value");}for(;n?f>=0:s>f;f+=h)f in e&&(u=i(u,e[f],f,o));return u}},fb={left:ws(!1),right:ws(!0)},eb=fb.left;l({target:"Array",proto:!0,forced:ee("reduce")},{reduce:function(n){return eb(this,n,arguments.length,arguments.length>1?arguments[1]:undefined)}});var ob=k.f,gu=Function.prototype,sb=gu.toString,hb=/^\s*function ([^ (]*)/,bs="name";!a||bs in gu||ob(gu,bs,{configurable:!0,get:function(){try{return sb.call(this).match(hb)[1]}catch(n){return""}}});var cb=function(){var t=s(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.dotAll&&(n+="s"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n},ur=RegExp.prototype.exec,lb=String.prototype.replace,ks=ur,nf=function(){var n=/a/,t=/b*/g;return ur.call(n,"a"),ur.call(t,"a"),n.lastIndex!==0||t.lastIndex!==0}(),tf=/()??/.exec("")[1]!==undefined,ab=nf||tf;ab&&(ks=function(n){var i=this,u,f,t,r;return tf&&(f=new RegExp("^"+i.source+"$(?!\\s)",cb.call(i))),nf&&(u=i.lastIndex),t=ur.call(i,n),nf&&t&&(i.lastIndex=i.global?t.index+t[0].length:u),tf&&t&&t.length>1&&lb.call(t[0],f,function(){for(r=1;r<arguments.length-2;r++)arguments[r]===undefined&&(t[r]=undefined)}),t});var rf=ks;l({target:"RegExp",proto:!0,forced:/./.exec!==rf},{exec:rf});var hk=e("species"),ck=!u(function(){var n=/./;return n.exec=function(){var n=[];return n.groups={a:"7"},n},"".replace(n,"$<a>")!=="7"}),lk=!u(function(){var n=/(?:)/,i=n.exec;n.exec=function(){return i.apply(this,arguments)};var t="ab".split(n);return t.length!==2||t[0]!=="a"||t[1]!=="b"}),vb=ro.charAt,ak=function(n,t,i){return t+(i?vb(n,t).length:1)},vk=function(n,t){var i=n.exec;if(typeof i=="function"){var r=i.call(n,t);if(typeof r!="object")throw TypeError("RegExp exec method returned something other than an Object or null");return r}if(b(n)!=="RegExp")throw TypeError("RegExp#exec called on incompatible receiver");return rf.call(n,t)},yk=Math.max,pk=Math.min,wk=Math.floor,bk=function(n){return n===undefined?n:String(n)},fr=function(n){return Array.prototype.reduce.call(n,function(n,t){var r=t.name.match(/data-asl_simplebar-(.+)/);if(r){var i=r[1].replace(/\W+(.)/g,function(n,t){return t.toUpperCase()});switch(t.value){case"true":n[i]=!0;break;case"false":n[i]=!1;break;case undefined:n[i]=!0;break;default:n[i]=t.value}}return n},{})};return i.initDOMLoadedElements=function(){document.removeEventListener("DOMContentLoaded",this.initDOMLoadedElements);window.removeEventListener("load",this.initDOMLoadedElements);Array.prototype.forEach.call(document.querySelectorAll('[data-asl_simplebar]:not([data-asl_simplebar="init"])'),function(n){i.instances.has(n)||new i(n,fr(n.attributes))})},i.removeObserver=function(){this.globalObserver.disconnect()},i.initHtmlApi=function(){this.initDOMLoadedElements=this.initDOMLoadedElements.bind(this);typeof MutationObserver!="undefined"&&(this.globalObserver=new MutationObserver(i.handleMutations),this.globalObserver.observe(document,{childList:!0,subtree:!0}));document.readyState!=="complete"&&(document.readyState==="loading"||document.documentElement.doScroll)?(document.addEventListener("DOMContentLoaded",this.initDOMLoadedElements),window.addEventListener("load",this.initDOMLoadedElements)):window.setTimeout(this.initDOMLoadedElements)},i.handleMutations=function(n){n.forEach(function(n){Array.prototype.forEach.call(n.addedNodes,function(n){n.nodeType===1&&(n.hasAttribute("data-asl_simplebar")?i.instances.has(n)||new i(n,fr(n.attributes)):Array.prototype.forEach.call(n.querySelectorAll('[data-asl_simplebar]:not([data-asl_simplebar="init"])'),function(n){i.instances.has(n)||new i(n,fr(n.attributes))}))});Array.prototype.forEach.call(n.removedNodes,function(n){n.nodeType===1&&(n.hasAttribute('[data-asl_simplebar="init"]')?i.instances.has(n)&&i.instances.get(n).unMount():Array.prototype.forEach.call(n.querySelectorAll('[data-asl_simplebar="init"]'),function(n){i.instances.has(n)&&i.instances.get(n).unMount()}))})})},i.getOptions=fr,pr&&i.initHtmlApi(),i});
(function(n){var t,c=!0,s={init:function(t,i){var r=this;this.elem=i;this.$elem=n(i);r.searching=!1;r.o=n.extend({blocking:!1},t);r.n={};r.n.container=n(this.elem);r.o.rid=r.n.container.attr("id").match(/^ajaxsearchlite(.*)/)[1];r.o.id=r.n.container.attr("id").match(/^ajaxsearchlite(.*)/)[1];r.n.probox=n(".probox",r.n.container);r.n.proinput=n(".proinput",r.n.container);r.n.text=n(".proinput input.orig",r.n.container);r.n.textAutocomplete=n(".proinput input.autocomplete",r.n.container);r.n.loading=n(".proinput .loading",r.n.container);r.n.proloading=n(".proloading",r.n.container);r.n.proclose=n(".proclose",r.n.container);r.n.promagnifier=n(".promagnifier",r.n.container);r.n.prosettings=n(".prosettings",r.n.container);r.n.searchsettings=n("#ajaxsearchlitesettings"+r.o.rid);r.n.resultsDiv=n("#ajaxsearchliteres"+r.o.rid);r.n.hiddenContainer=n("#asl_hidden_data");r.n.aslItemOverlay=n(".asl_item_overlay",r.n.hiddenContainer);r.resizeTimeout=null;r.n.showmore=n(".showmore",r.n.resultsDiv);r.n.items=n(".item",r.n.resultsDiv);r.n.results=n(".results",r.n.resultsDiv);r.n.resdrg=n(".resdrg",r.n.resultsDiv);r.il={columns:3,itemsPerPage:6};r.firstClick=!0;r.post=null;r.postAuto=null;r.cleanUp();r.n.textAutocomplete.val("");r.o.resultitemheight=parseInt(r.o.resultitemheight);r.scroll={};r.savedScrollTop=0;r.savedContainerTop=0;r.is_scroll=typeof asl_SimpleBar!="undefined";typeof ASL.scrollbar!="undefined"&&ASL.scrollbar==0&&(r.is_scroll=!1);r.settScroll=null;r.n.resultsAppend=n("#wpdreams_asl_results_"+r.o.id);r.currentPage=1;r.isotopic=null;r.lastSuccesfulSearch="";r.lastSearchData={};r.triggerPrevState=!1;r.animation="bounceIn";switch(r.o.resultstype){case"vertical":r.animation=r.o.vresultanimation;break;default:r.animation=r.o.hresultanimation}return r.filterFns={number:function(){for(var t=n(this).parent();!t.hasClass("isotopic");)t=t.parent();var i=n(this).attr("data-itemnum"),u=r.currentPage,f=r.il.itemsPerPage;return parseInt(i,10)<f*u&&parseInt(i,10)>=f*(u-1)}},r.disableMobileScroll=!1,r.n.searchsettings.detach().appendTo("body"),r.o.resultsposition=="hover"?r.n.resultsDiv.detach().appendTo("body"):r.n.resultsAppend.length>0&&r.n.resultsDiv.detach().appendTo(r.n.resultsAppend),typeof ASL.resHTML=="undefined"&&(ASL.resHTML=r.n.resultsDiv.html()),typeof ASL.setHTML=="undefined"&&(ASL.setHTML=r.n.searchsettings.html()),n("fieldset",r.n.searchsettings).each(function(){n(".asl_option:not(.hiddend)",this).last().addClass("asl-o-last")}),ASL.js_retain_popstate==1&&r.initPrevState(),a()&&r.n.container.addClass("asl_msie"),r.initSettingsAnimations(),r.initResultsAnimations(),r.initEvents(),r.initAutop(),r.initEtc(),this},initPrevState:function(){var r=this;c&&t==null&&(t=localStorage.getItem("asl-"+i.encode(location.href)),t!=null&&(t=JSON.parse(t),t.settings=i.decode(t.settings)));t!=null&&typeof t.id!="undefined"&&t.id==r.o.id&&(t.phrase!=""&&(r.triggerPrevState=!0,r.n.text.val(t.phrase)),o(n("form",r.n.searchsettings))!=t.settings&&(r.triggerPrevState=!0,o(n("form",r.n.searchsettings),t.settings)));localStorage.removeItem("asl-"+i.encode(location.href));r.n.resultsDiv.on("click",".results .item",function(){var t=r.n.text.val();if(t!=""||r.settingsChanged){var u={id:r.o.id,phrase:t,settings:i.encode(o(n("form",r.n.searchsettings)))};localStorage.setItem("asl-"+i.encode(location.href),JSON.stringify(u))}})},duplicateCheck:function(){var i=this,t={};n("div[id*=ajaxsearchlite]").each(function(){t.hasOwnProperty(this.id)?n(this).remove():t[this.id]="true"})},gaPageview:function(n){var r=this,t=r.gaGetTrackingID();if(typeof ASL.analytics=="undefined"||ASL.analytics.method!="pageview")return!1;if(ASL.analytics.string!=""){var i=typeof __gaTracker=="function"?__gaTracker:typeof ga=="function"?ga:!1,u=typeof gtag=="function"?gtag:!1;window.location.origin||(window.location.origin=window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:""));var f=r.o.homeurl.replace(window.location.origin,"");u!==!1?t!==!1&&u("config",t,{page_path:f+ASL.analytics.string.replace("{asl_term}",n)}):i!==!1&&(t!==!1&&i("create",t,"auto"),i("send","pageview",{page:f+ASL.analytics.string.replace("{asl_term}",n),title:"Ajax Search"}))}},gaEvent:function(t,i){var u=this,f=u.gaGetTrackingID();if(typeof ASL.analytics=="undefined"||ASL.analytics.method!="event")return!1;var e=typeof gtag=="function"?gtag:!1,o=typeof __gaTracker=="function"?__gaTracker:typeof ga=="function"?ga:!1;if(e===!1&&o===!1)return!1;if(typeof ASL.analytics.event[t]!="undefined"&&ASL.analytics.event[t].active==1&&typeof"gtag"!="undefined"){var s={search_id:u.o.id,search_name:u.o.name,phrase:u.n.text.val(),option_name:"",option_value:"",result_title:"",result_url:"",results_count:""},r={event_category:ASL.analytics.event[t].category,event_label:ASL.analytics.event[t].label,value:ASL.analytics.event[t].value};i=n.extend(s,i);n.each(i,function(t,i){i=String(i).replace(/[\s\n\r]+/g," ").trim();n.each(r,function(n,u){var f=new RegExp("{"+t+"}","gmi");r[n]=u.replace(f,i)})});e===!1?(f!==!1&&o("create",f,"auto"),o("send","event",r.event_category,ASL.analytics.event[t].action,r.event_label,r.value)):(f!==!1&&(r.send_to=f),e("event",ASL.analytics.event[t].action,r))}},gaGetTrackingID:function(){var r=this,n=!1;if(typeof ASL.analytics=="undefined")return n;if(typeof ASL.analytics.tracking_id!="undefined"&&ASL.analytics.tracking_id!="")return ASL.analytics.tracking_id;var i=typeof gtag=="function"?gtag:!1;if(i!==!1&&typeof ga!="undefined"&&typeof ga.getAll!="undefined"){var t=!1;return ga.getAll().forEach(function(n){t=n.get("trackingId")}),t}return n},createVerticalScroll:function(){var t=this;t.is_scroll&&typeof t.scroll.recalculate=="undefined"&&(t.scroll=new asl_SimpleBar(t.n.results.get(0),{direction:n("body").hasClass("rtl")?"rtl":"ltr",autoHide:!0}))},initEvents:function(){var t=this;if(r()&&e())t.n.text.on("touchstart",function(){t.savedScrollTop=n(window).scrollTop();t.savedContainerTop=t.n.container.offset().top});t.n.text.click(function(){n(this).focus();t.gaEvent("focus")});t.n.text.on("focus input",function(){t.searching||(n(this).val()!=""?t.n.proclose.css("display","block"):t.n.proclose.css({display:"none"}))});n(t.n.text.parent()).submit(function(n){if(n.preventDefault(),r())if(t.o.redirect_on_enter){var i=jQuery.Event("keyup");i.keyCode=i.which=13;t.n.text.trigger(i)}else t.o.redirectEnterTo=="ajax_search"&&(t.search(),document.activeElement.blur());else t.o.redirectEnterTo=="ajax_search"&&t.search()});t.n.text.click(function(){t.firstClick&&(n(this).val(""),t.firstClick=!1)});t.n.resultsDiv.css({opacity:0});n(document).bind("click touchend",function(){(t.hideSettings(),t.opened!=!1&&t.o.closeOnDocClick==1)&&t.hideResults()});t.n.proclose.on("click touchend",function(){t.n.text.val("");t.n.textAutocomplete.val("");t.hideResults();t.n.text.focus()});n(t.elem).bind("click touchend",function(n){n.stopImmediatePropagation()});t.n.resultsDiv.bind("click touchend",function(n){n.stopImmediatePropagation()});t.n.searchsettings.bind("click touchend",function(n){n.stopImmediatePropagation()});t.n.prosettings.on("click",function(){t.n.prosettings.data("opened")==0?t.showSettings():t.hideSettings()});var f=t.n.container.parents().filter(function(){return n(this).css("position")=="fixed"});if((f.length>0||t.n.container.css("position")=="fixed")&&(t.n.resultsDiv.css("position")=="absolute"&&t.n.resultsDiv.css("position","fixed"),t.n.resultsDiv.css("z-index",99999999999),t.o.blocking||t.n.searchsettings.css("position","fixed")),r())n(window).on("orientationchange",function(){t.orientationChange();setTimeout(function(){t.orientationChange()},800)});else{var i;n(window).on("resize",function(){clearTimeout(i);i=setTimeout(function(){t.resize()},100)})}var u;n(window).on("scroll",function(){clearTimeout(u);u=setTimeout(function(){t.scrolling(!1)},400)});e()&&r()&&l()&&parseInt(t.n.text.css("font-size"))<16&&(t.n.text.data("fontSize",t.n.text.css("font-size")).css("font-size","16px"),t.n.textAutocomplete.css("font-size","16px"),n("<style>#ajaxsearchlite"+t.o.rid+" input.orig::-webkit-input-placeholder{font-size: 16px !important;}<\/style>").appendTo("head"));t.initNavigationEvent();t.initMagnifierEvent();t.initAutocompleteEvent();t.initFacetEvents()},initAutop:function(){var n=this;if(t!=null&&n.triggerPrevState)return n.search(),t=null,!1},initEtc:function(){var t=this,i=null;n("div.asl_option",t.n.searchsettings).on("mouseup touchend",function(r){if(r.preventDefault(),r.stopImmediatePropagation(),t.dragging)return!1;n('input[type="checkbox"]',this).prop("checked",!n('input[type="checkbox"]',this).prop("checked"));clearTimeout(i);var u=this;i=setTimeout(function(){n('input[type="checkbox"]',u).trigger("asl_chbx_change")},50)});n("div.asl_option label",t.n.searchsettings).click(function(n){n.preventDefault()});t.n.resultsDiv.on("click",".results .item",function(){t.gaEvent("result_click",{result_title:n(this).find("a.asl_res_url").text(),result_url:n(this).find("a.asl_res_url").attr("href")})})},initNavigationEvent:function(){var t=this;n(t.n.resultsDiv).on("mouseenter",".item",function(){n(".item",t.n.resultsDiv).removeClass("hovered");n(this).addClass("hovered")});n(t.n.resultsDiv).on("mouseleave",".item",function(){n(".item",t.n.resultsDiv).removeClass("hovered")});n(document).keydown(function(i){if(window.event)var r=window.event.keyCode,e=window.event.type;else if(i)var r=i.which,e=i.type;if(n(".item",t.n.resultsDiv).length>0&&t.n.resultsDiv.css("display")!="none"){if(r==40||r==38){r==40&&(t.n.text.blur(),n(".item.hovered",t.n.resultsDiv).length==0?n(".item",t.n.resultsDiv).first().addClass("hovered"):n(".item.hovered",t.n.resultsDiv).removeClass("hovered").next(".item").addClass("hovered"));r==38&&(t.n.text.blur(),n(".item.hovered",t.n.resultsDiv).length==0?n(".item",t.n.resultsDiv).last().addClass("hovered"):n(".item.hovered",t.n.resultsDiv).removeClass("hovered").prev(".item").addClass("hovered"));i.stopPropagation();i.preventDefault();var u=t.is_scroll?n(t.scroll.getScrollElement()):t.n.results,f=t.n.resultsDiv.find(".resdrg .item.hovered");f.length==0&&(f=t.n.resultsDiv.children().first());u.animate({scrollTop:f.offset().top-u.offset().top+u.scrollTop()},{duration:120})}r==13&&n(".item.hovered",t.n.resultsDiv).length>0&&(i.stopPropagation(),i.preventDefault(),n(".item.hovered a.asl_res_url",t.n.resultsDiv).get(0).click())}})},initMagnifierEvent:function(){var t=this,i,u,r=!1;t.n.text.on("keyup",function(f){if(window.event?(t.keycode=window.event.keyCode,t.ktype=window.event.type):f&&(t.keycode=f.which,t.ktype=f.type),t.keycode==13){if(clearTimeout(u),u=setTimeout(function(){r=!1},300),r)return!1;r=!0}var e=n(this).hasClass("orig");if(t.n.text.val().length>=t.o.charcount&&e&&t.ktype=="keyup"&&t.keycode==13){if(t.gaEvent("return"),t.o.redirect_on_enter==1)t.o.redirectEnterTo!="first_result"?t.doRedirectToResults(t.ktype):t.search();else{if(t.o.redirectEnterTo=="nothing")return!1;n("form",t.n.searchsettings).serialize()+t.n.text.val().trim()==t.lastSuccesfulSearch&&t.resultsOpened||t.search()}clearTimeout(i)}});t.n.promagnifier.add(t.n.text).bind("click input",function(r){window.event?(t.keycode=window.event.keyCode,t.ktype=window.event.type):r&&(t.keycode=r.which,t.ktype=r.type);var u=n(this).hasClass("orig");if(t.n.text.val().length<t.o.charcount){t.n.proloading.css("display","none");t.hideResults();t.post!=null&&t.post.abort();clearTimeout(i);return}if(t.n.text.val().length>=t.o.charcount&&!u&&t.o.redirectonclick==1&&t.ktype=="click"&&t.o.redirectClickTo!="first_result"){t.doRedirectToResults(t.ktype);clearTimeout(i);return}if((!(t.keycode>=37)||!(t.keycode<=40))&&(!(t.keycode>=112)||!(t.keycode<=123))){if(u&&t.ktype=="click"||t.keycode==32){n("form",t.n.searchsettings).serialize()+t.n.text.val().trim()==t.lastSuccesfulSearch&&(t.n.proclose.css("display","block"),t.resultsOpened||t.showResults());return}n(this).hasClass("orig")&&t.ktype=="click"||(u||t.ktype!="click"||t.gaEvent("magnifier"),t.o.trigger_on_click!=0||t.ktype!="click")&&(t.o.triggerontype!=0||t.ktype!="input")&&(!u||t.ktype!="input"||t.o.redirectEnterTo!="nothing")&&(u||t.ktype!="click"||t.o.redirectClickTo!="nothing")&&(t.post!=null&&t.post.abort(),clearTimeout(i),t.hideLoader(),i=setTimeout(function(){if(n("form",t.n.searchsettings).serialize()+t.n.text.val().trim()!=t.lastSuccesfulSearch)t.search();else{if(t.n.proclose.css("display","block"),t.isRedirectToFirstResult())return t.doRedirectToFirstResult(),!1;t.resultsOpened||t.showResults()}},250))}})},initFacetEvents:function(){var t=this,i=null;if(t.o.trigger_on_facet_change==1){n("input[type!=checkbox], select",t.n.searchsettings).on("change slidechange",function(){t.n.text.val().length<t.o.charcount||(t.post!=null&&t.post.abort(),clearTimeout(i),i=setTimeout(function(){t.search()},50))});n("input[type=checkbox]",t.n.searchsettings).on("asl_chbx_change",function(){t.n.text.val().length<t.o.charcount||(t.post!=null&&t.post.abort(),t.gaEvent("facet_change",{option_label:n(this).closest("fieldset").find("legend").text(),option_value:n(this).closest(".asl_option").find(".asl_option_label").text()+(n(this).prop("checked")?"(checked)":"(unchecked)")}),clearTimeout(i),i=setTimeout(function(){t.search()},50))})}},isRedirectToFirstResult:function(){var t=this;return n(".asl_res_url",t.n.resultsDiv).length>0&&(t.o.redirectonclick==1&&t.ktype=="click"&&t.o.redirectClickTo=="first_result"||t.o.redirect_on_enter==1&&(t.ktype=="input"||t.ktype=="keyup")&&t.keycode==13&&t.o.redirectEnterTo=="first_result")?!0:!1},doRedirectToFirstResult:function(){var t=this,i;return i=t.ktype=="click"?t.o.redirectClickLoc:t.o.redirectEnterLoc,i=="same"?location.href=n(n(".asl_res_url",t.n.resultsDiv).get(0)).attr("href"):h(n(n(".asl_res_url",t.n.resultsDiv).get(0)).attr("href")),t.hideLoader(),t.hideResults(),!1},doRedirectToResults:function(t){var r=this,s=r.ktype=="click"?r.o.redirectClickTo:r.o.redirectEnterTo,e=t=="click"?r.o.redirectClickLoc:r.o.redirectEnterLoc;if(s=="results_page")var o="?s="+u(r.n.text.val());else if(s=="woo_results_page")var o="?post_type=product&s="+u(r.n.text.val());else var o=r.o.redirect_url.replace("{phrase}",u(r.n.text.val()));if(r.o.overridewpdefault)if(r.o.override_method=="post")f(r.o.homeurl+o,"post",{asl_active:1,p_asl_data:n("form",r.n.searchsettings).serialize()},e);else{var c=r.o.homeurl+o+"&asl_active=1&p_asid="+r.o.id+"&p_asl_data="+i.encode(n("form",r.n.searchsettings).serialize());e=="same"?location.href=c:h(c)}else f(r.o.homeurl+o,"post",{np_asl_data:n("form",r.n.searchsettings).serialize()},e);r.n.proloading.css("display","none");r.hideLoader();r.hideResults();r.post!=null&&r.post.abort()},destroy:function(){return this.each(function(){var t=n.extend({},this,s);n(window).unbind(t)})},searchfor:function(t){n(".proinput input",this).val(t).trigger("keyup")},initAutocompleteEvent:function(){var t=this;t.o.autocomplete.enabled!=1||r()||t.n.text.keyup(function(i){window.event?(t.keycode=window.event.keyCode,t.ktype=window.event.type):i&&(t.keycode=i.which,t.ktype=i.type);var r=39;n("body").hasClass("rtl")&&(r=37);t.keycode==r&&t.n.textAutocomplete.val()!=""?(i.preventDefault(),t.n.text.val(t.n.textAutocomplete.val()),t.post!=null&&t.post.abort(),t.search()):(t.postAuto!=null&&t.postAuto.abort(),t.autocompleteGoogleOnly())})},autocompleteGoogleOnly:function(){var t=this,i=t.n.text.val();if(t.n.text.val()==""){t.n.textAutocomplete.val("");return}var r=t.n.textAutocomplete.val();(r==""||r.indexOf(i)!=0)&&(t.n.textAutocomplete.val(""),n.ajax({url:"https://clients1.google.com/complete/search",dataType:"jsonp",data:{q:i,hl:t.o.autocomplete.lang,nolabels:"t",client:"hp",ds:""},success:function(r){r[1].length>0&&(response=r[1][0][0].replace(/(<([^>]+)>)/ig,""),response=n("<textarea />").html(response).text(),response=response.substr(i.length),t.n.textAutocomplete.val(i+response))}}))},search:function(){var t=this;if((!t.searching||!0)&&!(t.n.text.val().length<t.o.charcount)){t.searching=!0;t.n.proloading.css({display:"block"});t.n.proclose.css({display:"none"});var r={action:"ajaxsearchlite_search",aslp:t.n.text.val(),asid:t.o.id,options:n("form",t.n.searchsettings).serialize()};if(JSON.stringify(r)===JSON.stringify(t.lastSearchData))return(t.resultsOpened||t.showResults(),t.hideLoader(),t.isRedirectToFirstResult())?(t.doRedirectToFirstResult(),!1):!1;t.gaEvent("search_start");t.post=n.post(ASL.ajaxurl,r,function(e){if(e=e.replace(/^\s*[\r\n]/gm,""),e=e.match(/!!ASLSTART!!(.*[\s\S]*)!!ASLEND!!/)[1],t.n.resdrg.html(""),t.n.resdrg.html(e),n(".asl_keyword",t.n.resdrg).bind("click",function(){t.n.text.val(n(this).html());n("input.orig",t.n.container).val(n(this).html()).keydown();n("form",t.n.container).trigger("submit","ajax");t.search()}),t.n.items=n(".item",t.n.resultsDiv),t.gaEvent("search_end",{results_count:t.n.items.length}),t.gaPageview(t.n.text.val()),t.isRedirectToFirstResult())return t.doRedirectToFirstResult(),!1;if(t.hideLoader(),t.showResults(),t.scrollToResults(),t.lastSuccesfulSearch=n("form",t.n.searchsettings).serialize()+t.n.text.val().trim(),t.lastSearchData=r,t.n.items.length==0)t.n.showmore!=null&&t.n.showmore.css("display","none");else if(t.n.showmore!=null){t.n.showmore.css("display","block");n("a",t.n.showmore).off();n("a",t.n.showmore).on("click",function(){var e=t.o.redirectClickTo,r="?s="+u(t.n.text.val());r=e=="results_page"?"?s="+u(t.n.text.val()):e=="woo_results_page"?"?post_type=product&s="+u(t.n.text.val()):t.o.redirect_url.replace("{phrase}",u(t.n.text.val()));t.o.overridewpdefault?t.o.override_method=="post"?f(t.o.homeurl+r,"post",{asl_active:1,p_asl_data:n("form",t.n.searchsettings).serialize()}):location.href=t.o.homeurl+r+"&asl_active=1&p_asid="+t.o.id+"&p_asl_data="+i.encode(n("form",t.n.searchsettings).serialize()):f(t.o.homeurl+r,"post",{np_asl_data:n("form",t.n.searchsettings).serialize()})})}},"text").fail(function(i,r){i.aborted||r=="abort"||(t.n.resdrg.html(""),t.n.resdrg.html('<div class="asl_nores">The request failed. Please check your connection! Status: '+i.status+"<\/div>"),t.n.items=n(".item",t.n.resultsDiv),t.hideLoader(),t.showResults(),t.scrollToResults())})}},showLoader:function(){var n=this;n.n.proloading.css({display:"block"})},hideLoader:function(){var n=this;n.n.proloading.css({display:"none"});n.n.results.css("display","")},showResultsBox:function(){var n=this;n.n.resultsDiv.css({display:"block",height:"auto"});n.n.items.addClass(n.animationOpacity);n.fixResultsPosition(!0);n.n.resultsDiv.css(n.resAnim.showCSS);n.n.resultsDiv.removeClass(n.resAnim.hideClass).addClass(n.resAnim.showClass)},showResults:function(){var n=this;n.createVerticalScroll();switch(n.o.resultstype){case"vertical":n.showVerticalResults();break;default:n.showHorizontalResults()}n.hideLoader();n.n.proclose.css({display:"block"});n.n.showmore!=null&&(n.n.items.length>0?n.n.showmore.css({display:"block"}):n.n.showmore.css({display:"none"}));n.is_scroll&&typeof n.scroll.recalculate!="undefined"&&setTimeout(function(){n.scroll.recalculate()},500);n.resultsOpened=!0},hideResults:function(){var n=this;if(!n.resultsOpened)return!1;n.n.resultsDiv.removeClass(n.resAnim.showClass).addClass(n.resAnim.hideClass);setTimeout(function(){n.n.resultsDiv.css(n.resAnim.hideCSS)},n.resAnim.duration);n.n.proclose.css({display:"none"});n.n.showmore!=null&&n.n.showmore.css({display:"none"});r()&&document.activeElement.blur();n.resultsOpened=!1},scrollToResults:function(){if(($this=this,this.o.scrollToResults==1)&&!this.$elem.parent().hasClass("asl_preview_data")){if($this.o.resultsposition=="hover")var t=$this.n.probox.offset().top-20;else var t=$this.n.resultsDiv.offset().top-20;n("#wpadminbar").length>0&&(t-=n("#wpadminbar").height());t=t<0?0:t;n("body, html").animate({scrollTop:t},{duration:500})}},createGroup:function(n){return"<div class='group'>"+n+"<\/div>"},showVerticalResults:function(){var t=this;if(t.showResultsBox(),t.n.items.length>0){var e=t.n.items.length<t.o.itemscount?t.n.items.length:t.o.itemscount,h=n(".group",t.n.resultsDiv);if(t.n.items.length<=t.o.itemscount)t.n.results.css({height:"auto"});else{t.n.results.css({height:30});t.resize();var i=0,r=0,u=0,f=0;t.n.items.each(function(){r+=n(this).outerHeight(!0);n(this).outerHeight(!0)>f&&(f=n(this).outerHeight(!0));i++});u=f*e;u>r&&(u=r);i=i<1?1:i;r=r/i*e;t.n.results.css({height:u})}if(t.resize(),t.n.items.last().addClass("asl_last_item"),t.o.highlight==1){var o=t.o.highlightwholewords==1?!0:!1;n("div.item",t.n.resultsDiv).highlight(t.n.text.val().split(" "),{element:"span",className:"highlighted",wordsOnly:o})}}t.resize();t.n.items.length==0&&t.n.results.css({height:"auto"});t.n.results.css({overflowY:"auto"});var s=t.is_scroll?n(t.scroll.getScrollElement()):t.n.results;s.scrollTop(0);t.addAnimation();t.fixResultsPosition(!0);t.searching=!1},addAnimation:function(){var i=this,t=0,r=1;i.n.items.each(function(){var u=this;setTimeout(function(){n(u).addClass(i.animation)},t);t=t+60;r++})},removeAnimation:function(){var t=this;t.n.items.each(function(){var i=this;n(i).removeClass(t.animation)})},initSettingsAnimations:function(){var n=this,t=300;n.settAnim={showClass:"asl_an_fadeInDrop",showCSS:{visibility:"visible",display:"block",opacity:1,"animation-duration":t},hideClass:"asl_an_fadeOutDrop",hideCSS:{visibility:"hidden",opacity:0,display:"none"},duration:t};n.n.searchsettings.css({"-webkit-animation-duration":n.settAnim.duration+"ms","animation-duration":n.settAnim.duration+"ms"})},initResultsAnimations:function(){var t=this,n=300;t.resAnim={showClass:"asl_an_fadeInDrop",showCSS:{visibility:"visible",display:"block",opacity:1,"animation-duration":n},hideClass:"asl_an_fadeOutDrop",hideCSS:{visibility:"hidden",opacity:0,display:"none"},duration:n};t.n.resultsDiv.css({"-webkit-animation-duration":n+"ms","animation-duration":n+"ms"})},showSettings:function(){var t=this;t.n.searchsettings.css(t.settAnim.showCSS);t.n.searchsettings.removeClass(t.settAnim.hideClass).addClass(t.settAnim.showClass);t.settScroll==null&&t.is_scroll&&(t.settScroll=[],n(".asl_sett_scroll",t.n.searchsettings).each(function(i){var r=this;setTimeout(function(){t.settScroll[i]=new asl_SimpleBar(n(r).get(0),{direction:n("body").hasClass("rtl")?"rtl":"ltr",autoHide:!0})},20)}));t.n.prosettings.data("opened",1);t.fixSettingsPosition(!0)},hideSettings:function(){var n=this;n.n.searchsettings.removeClass(n.settAnim.showClass).addClass(n.settAnim.hideClass);setTimeout(function(){n.n.searchsettings.css(n.settAnim.hideCSS)},n.settAnim.duration);n.n.prosettings.data("opened",0)},cleanUp:function(){var t=this;n(".searchsettings",t.n.container).length>0&&(n("body>#ajaxsearchlitesettings"+t.o.rid).remove(),n("body>#ajaxsearchliteres"+t.o.rid).remove())},orientationChange:function(){var n=this;n.fixSettingsPosition();n.fixResultsPosition();n.fixTryThisPosition()},resize:function(){var n=this;n.fixSettingsPosition();n.fixResultsPosition();n.fixTryThisPosition()},scrolling:function(n){var t=this;t.fixSettingsPosition(n);t.fixResultsPosition(n)},fixTryThisPosition:function(){},fixResultsPosition:function(t){t=typeof t=="undefined"?!1:t;var i=this,f=i.n.resultsDiv.css("position");if(f=="fixed"||f=="absolute"){var o=0;if(n("body").css("position")!="static"&&(o=n("body").offset().top),t==!0||i.n.resultsDiv.css("visibility")=="visible"){var s=0,h=0,u=i.n.container.offset();if(f=="fixed"&&(o=0,s=n(document).scrollTop(),h=n(document).scrollLeft(),r()&&e()&&i.n.text.is(":focus")&&(s=i.savedScrollTop,u.top=i.savedContainerTop)),typeof u!="undefined"){var c=i.n.container.outerWidth()<240?240:i.n.container.outerWidth();i.n.resultsDiv.outerWidth(c);i.n.resultsDiv.css({top:u.top+i.n.container.outerHeight(!0)+10-o-s,left:u.left-h})}}}},fixSettingsPosition:function(t){t=typeof t=="undefined"?!1:t;var i=this,s=0;if(n("body").css("position")!="static"&&(s=n("body").offset().top),(t==!0||i.n.prosettings.data("opened")!=0)&&i.o.blocking!=!0){if(i.fixSettingsWidth(),i.n.prosettings.css("display")!="none")var f=i.n.prosettings;else var f=i.n.promagnifier;var u=f.offset(),o=0,h=0;i.n.searchsettings.css("position")=="fixed"&&(o=n(window).scrollTop(),h=n(window).scrollLeft(),r()&&e()&&i.n.text.is(":focus")&&(u.top=i.savedContainerTop,o=i.savedScrollTop));i.o.settingsimagepos=="left"?i.n.searchsettings.css({display:"block",top:u.top+f.height()-2-s-o,left:u.left-h}):i.n.searchsettings.css({display:"block",top:u.top+f.height()-2-s-o,left:u.left+f.width()-i.n.searchsettings.width()-h})}},fixSettingsWidth:function(){}};function l(){return!("ontouchstart"in window)?0:1}function r(){try{return document.createEvent("TouchEvent"),!0}catch(n){return!1}}function o(t,i){var r=t.find(":input").get();return arguments.length===1?(i={},n.each(r,function(){!this.name||this.disabled||!(this.checked||/select|textarea/i.test(this.nodeName)||/text/i.test(this.type))||n(this).hasClass("asp_datepicker_field")||n(this).hasClass("asp_datepicker")||(i[this.name]==undefined&&(i[this.name]=[]),i[this.name].push(n(this).val()))}),JSON.stringify(i)):(typeof i!="object"&&(i=JSON.parse(i)),n.each(r,function(){if(this.name&&i[this.name]){var t=i[this.name],r=n(this);if(Object.prototype.toString.call(t)!=="[object Array]"&&(t=[t]),this.type=="checkbox"||this.type=="radio"){for(var e=r.val(),f=!1,u=0;u<t.length;u++)if(t[u]==e){f=!0;break}r.attr("checked",f)}else r.val(t[0])}}),t)}function u(n){return encodeURIComponent(n).replace(/\%20/g,"+")}function f(t,i,r,u){"use strict";var f;f=n("<form />",{action:t,method:i,style:"display: none;"});typeof r!="undefined"&&r!==null&&n.each(r,function(t,i){n("<input />",{type:"hidden",name:t,value:i}).appendTo(f)});typeof u!="undefined"&&u=="new"&&f.attr("target","_blank");f.appendTo("body").submit()}function h(t){n('<a href="'+t+'" target="_blank">').get(0).click()}function e(){return typeof navigator!="undefined"&&typeof window.navigator.userAgent!="undefined"?window.navigator.userAgent.match(/(iPod|iPhone|iPad)/)!=null:!1}function a(){var n=window.navigator.userAgent,t=n.indexOf("MSIE ");return t>0?!0:!1}typeof Object.create!="function"&&(Object.create=function(n){function t(){}return t.prototype=n,new t});n.plugin=function(t,i){n.fn[t]=function(r){return this.each(function(){n.data(this,t)||n.data(this,t,Object.create(i).init(r,this))})}};n.plugin("ajaxsearchlite",s);var i={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(n){var e="",o,t,r,h,c,s,u,f=0;for(n=i._utf8_encode(n);f<n.length;)o=n.charCodeAt(f++),t=n.charCodeAt(f++),r=n.charCodeAt(f++),h=o>>2,c=(o&3)<<4|t>>4,s=(t&15)<<2|r>>6,u=r&63,isNaN(t)?s=u=64:isNaN(r)&&(u=64),e=e+this._keyStr.charAt(h)+this._keyStr.charAt(c)+this._keyStr.charAt(s)+this._keyStr.charAt(u);return e},decode:function(n){var t="",o,s,h,c,f,u,e,r=0;for(n=n.replace(/[^A-Za-z0-9\+\/\=]/g,"");r<n.length;)c=this._keyStr.indexOf(n.charAt(r++)),f=this._keyStr.indexOf(n.charAt(r++)),u=this._keyStr.indexOf(n.charAt(r++)),e=this._keyStr.indexOf(n.charAt(r++)),o=c<<2|f>>4,s=(f&15)<<4|u>>2,h=(u&3)<<6|e,t=t+String.fromCharCode(o),u!=64&&(t=t+String.fromCharCode(s)),e!=64&&(t=t+String.fromCharCode(h));return i._utf8_decode(t)},_utf8_encode:function(n){n=n.replace(/\r\n/g,"\n");for(var i="",r=0;r<n.length;r++){var t=n.charCodeAt(r);t<128?i+=String.fromCharCode(t):t>127&&t<2048?(i+=String.fromCharCode(t>>6|192),i+=String.fromCharCode(t&63|128)):(i+=String.fromCharCode(t>>12|224),i+=String.fromCharCode(t>>6&63|128),i+=String.fromCharCode(t&63|128))}return i},_utf8_decode:function(n){for(var r="",t=0,i=c1=c2=0;t<n.length;)i=n.charCodeAt(t),i<128?(r+=String.fromCharCode(i),t++):i>191&&i<224?(c2=n.charCodeAt(t+1),r+=String.fromCharCode((i&31)<<6|c2&63),t+=2):(c2=n.charCodeAt(t+1),c3=n.charCodeAt(t+2),r+=String.fromCharCode((i&15)<<12|(c2&63)<<6|c3&63),t+=3);return r}}})(jQuery);window.ASL=window.ASL||{};window.ASL.getScope=function(){if(typeof jQuery!="undefined")if(typeof jQuery.fn.ajaxsearchlite=="undefined")for(var n=jQuery,t=jQuery,i=0;i<10;i++)if(typeof n.fn.ajaxsearchlite=="undefined")n=jQuery.noConflict(!0);else return n.fn.jquery!=t.fn.jquery&&(window.jQuery=window.$=t),n;else return jQuery;return typeof window[ASL.js_scope]!="undefined"?window[ASL.js_scope]:eval(ASL.js_scope)};window.ASL.initialized=!1;window.ASL.initialize=function(n){var i=this;if(typeof i.getScope=="undefined")return!1;var t=i.getScope(),r=".asl_init_data";if(typeof ASL_INSTANCES!="undefined"&&Object.keys(ASL_INSTANCES).length>0)t.each(ASL_INSTANCES,function(n,i){return typeof i=="undefined"?!1:t("#ajaxsearchlite"+n).hasClass("hasASL")?!1:(t("#ajaxsearchlite"+n).addClass("hasASL"),t("#ajaxsearchlite"+n).ajaxsearchlite(i))});else{typeof n!="undefined"&&(r="div[id*=asl_init_id_"+n+"]");function u(n){for(var r="",t=0,i=c1=c2=0;t<n.length;)i=n.charCodeAt(t),i<128?(r+=String.fromCharCode(i),t++):i>191&&i<224?(c2=n.charCodeAt(t+1),r+=String.fromCharCode((i&31)<<6|c2&63),t+=2):(c2=n.charCodeAt(t+1),c3=n.charCodeAt(t+2),r+=String.fromCharCode((i&15)<<12|(c2&63)<<6|c3&63),t+=3);return r}function f(n){var t="",s,h,c,l,e,r,o,i=0,f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";for(n=n.replace(/[^A-Za-z0-9\+\/\=]/g,"");i<n.length;)l=f.indexOf(n.charAt(i++)),e=f.indexOf(n.charAt(i++)),r=f.indexOf(n.charAt(i++)),o=f.indexOf(n.charAt(i++)),s=l<<2|e>>4,h=(e&15)<<4|r>>2,c=(r&3)<<6|o,t=t+String.fromCharCode(s),r!=64&&(t=t+String.fromCharCode(h)),o!=64&&(t=t+String.fromCharCode(c));return u(t)}t(r).each(function(){var i=t(this).attr("id").match(/^asl_init_id_(.*)/)[1],n=t(this).data("asldata");if(typeof n=="undefined"||(n=f(n),typeof n=="undefined"||n==""))return!1;var r=JSON.parse(n);return t("#ajaxsearchlite"+i).addClass("hasASL"),t("#ajaxsearchlite"+i).ajaxsearchlite(r)})}i.initialized=!0};window.ASL.fixClones=function(){var t=this;if((t.fix_duplicates=t.fix_duplicates||0,t.fix_duplicates==0)||typeof t.getScope=="undefined")return!1;var n=t.getScope(),i={};n(".asl_init_data").each(function(){var t=n(this).attr("id").match(/^asl_init_id_(.*)/)[1];typeof i[t]=="undefined"?i[t]={rid:t,id:t,count:1}:i[t].count++});n.each(i,function(i,r){r.count>1&&n(".asl_m_"+r.rid).each(function(i){if(i==0)return!0;for(var f=n(this).parent(),u=r.id;n("#ajaxsearchlite"+u).length!=0;)u++;n(this).attr("id","ajaxsearchlite"+u);n(this).removeClass("asl_m_"+r.rid).addClass("asl_m_"+u);n(this).removeClass("hasASL");n(".asl_r_"+r.rid,this).length==0&&n(".asl_r_"+r.rid).clone().appendTo(n(this));n(".asl_r_"+r.rid,this).attr("id","ajaxsearchliteres"+u);n(".asl_r_"+r.rid,this).attr("data-id",u);n(".asl_r_"+r.rid,this).removeClass("asl_r_"+r.rid).addClass("asl_r_"+u);typeof ASL.resHTML!="undefined"&&n("#ajaxsearchliteres"+u).html(ASL.resHTML);n(".asl_s_"+r.rid,this).length==0&&n(".asl_s_"+r.rid).length!=0&&n(".asl_s_"+r.rid).clone().appendTo(n(this));n(".asl_sb_"+r.rid,this).length==0&&n(".asl_sb_"+r.rid).length!=0&&n(".asl_sb_"+r.rid).clone().appendTo(n(this));n(".asl_s_"+r.rid,this).attr("id","ajaxsearchlitesettings"+u);typeof ASL.setHTML!="undefined"&&n("#ajaxsearchlitesettings"+u).html(ASL.setHTML);n(".asl_sb_"+r.rid,f).attr("id","ajaxsearchlitebsettings"+u);typeof ASL.setHTML!="undefined"&&n("#ajaxsearchlitebsettings"+u).html(ASL.setHTML);n(".asl_hidden_data",f).length>0&&n(".asl_hidden_data",f).attr("id","asl_hidden_data_"+u);n(".asl_init_data",f).length>0&&n(".asl_init_data",f).attr("id","asl_init_id_"+u);t.initialize(u)})})};window.ASL.ready=function(){var t=this,i=t.getScope(),r=null;i(document).ready(function(){t.initialize();setTimeout(function(){t.fixClones()},2500)});i(window).on("load",function(){t.initialized||(t.initialize(),setTimeout(function(){t.fixClones()},2500),console.log("ASL initialized via window.load"))});typeof ASL.detect_ajax!="undefined"&&ASL.detect_ajax==1&&i("body").bind("DOMSubtreeModified",function(){clearTimeout(r);r=setTimeout(function(){t.initialize()},500)});var u;i(window).on("resize",function(){clearTimeout(u);u=setTimeout(function(){t.fixClones()},2e3)});var f,n="#menu-item-search, .fa-search, .fa, .fas";n=n+", .fusion-flyout-menu-toggle, .fusion-main-menu-search-open";n=n+", #search_button";n=n+", .mini-search.popup-search";n=n+", .icon-search";n=n+", .menu-item-search-dropdown";n=n+", .mobile-menu-button";n=n+", .td-icon-search, .tdb-search-icon";n=n+", .side_menu_button, .search_button";n=n+", .raven-search-form-toggle";n=n+", [data-elementor-open-lightbox], .elementor-button-link, .elementor-button";i(function(){i("body").on("click touchend",n,function(){clearTimeout(f);f=setTimeout(function(){t.initialize()},500)})})};window._ASL=ASL;window._ASL.ready();
function heateorSssCallAjax(e){if(typeof jQuery!="undefined"){e()}else{heateorSssGetScript("https://code.jquery.com/jquery-latest.min.js",e)}}
function heateorSssGetScript(e,t){var n=document.createElement("script");n.src=e;var r=document.getElementsByTagName("head")[0],i=false;n.onload=n.onreadystatechange=function(){if(!i&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){i=true;t();n.onload=n.onreadystatechange=null;r.removeChild(n)}};r.appendChild(n)}
function heateorSssDetermineWhatsappShareAPI(a){if(a)return-1!=navigator.userAgent.indexOf("Mobi")?"api.whatsapp.com":"web.whatsapp.com";var p=jQuery("i.heateorSssWhatsappBackground a").attr("href");return void 0!==p?-1!=navigator.userAgent.indexOf("Mobi")?(jQuery("i.heateorSssWhatsappBackground a").attr("href",p.replace("web.whatsapp.com","api.whatsapp.com")),"api.whatsapp.com"):(jQuery("i.heateorSssWhatsappBackground a").attr("href",p.replace("api.whatsapp.com","web.whatsapp.com")),"web.whatsapp.com"):""}
function heateorSssMoreSharingPopup(elem, postUrl, postTitle, twitterTitle){
postUrl=encodeURIComponent(postUrl);
concate='</ul></div><div class="footer-panel"><p></p></div></div>';
var heateorSssMoreSharingServices={
facebook: {
title: "Facebook",
locale: "en-US",
redirect_url: "https://www.facebook.com/sharer.php?u=" + postUrl + "&t=" + postTitle + "&v=3",
},
twitter: {
title: "Twitter",
locale: "en-US",
redirect_url: "https://twitter.com/intent/tweet?text=" + (twitterTitle ? twitterTitle:postTitle) + " " + postUrl,
},
linkedin: {
title: "Linkedin",
locale: "en-US",
redirect_url: "https://www.linkedin.com/shareArticle?mini=true&url=" + postUrl + "&title=" + postTitle,
},
parler: {
title: "Parler",
locale: "en-US",
redirect_url: "https://parler.com/new-post?message=" + postTitle + "&url=" + postUrl
},
pinterest: {
title: "Pinterest",
locale: "en-US",
redirect_url: "https://pinterest.com/pin/create/button/?url=" + postUrl + "&media=${media_link}&description=" + postTitle,
bookmarklet_url: "javascript:void((function(){var e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','//assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)})());"
},
CopyLink: {
title: "Copy Link",
locale: "en-US",
redirect_url: "",
bookmarklet_url: ""
},
Diaspora: {
title: "Diaspora",
locale: "en-US",
redirect_url: "https://joindiaspora.com/bookmarklet?url=" + postUrl + "&title=" + postTitle + "&v=1"
},
Douban: {
title: "Douban",
locale: "en-US",
redirect_url: "https://www.douban.com/share/service?name="+postTitle+"&href="+postUrl+"&image=&updated=&bm=&url="+postUrl+"&title="+postTitle+"&sel="
},
Draugiem: {
title: "Draugiem",
locale: "en-US",
redirect_url: "https://www.draugiem.lv/say/ext/add.php?link="+postUrl+"&title="+postTitle
},
Facebook_Messenger: {
title: "Facebook Messenger",
locale: "en-US",
redirect_url: "https://www.facebook.com/dialog/send?app_id=1904103319867886&display=popup&link="+postUrl+"&redirect_uri="+postUrl
},
Google_Classroom: {
title: "Google Classroom",
locale: "en-US",
redirect_url: "https://classroom.google.com/u/0/share?url="+postUrl
},
Kik: {
title: "Kik",
locale: "en-US",
redirect_url: "https://www.kik.com/send/article/?app_name=Share&text=&title="+postTitle+"&url="+postUrl
},
Papaly: {
title: "Papaly",
locale: "en-US",
redirect_url: "https://papaly.com/api/share.html?url="+postUrl+"&title="+postTitle
},
Refind: {
title: "Refind",
locale: "en-US",
redirect_url: "https://refind.com/?url="+postUrl
},
Skype: {
title: "Skype",
locale: "en-US",
redirect_url: "https://web.skype.com/share?url="+postUrl
},
SMS: {
title: "SMS",
locale: "en-US",
bookmarklet_url: "sms:?&body="+postTitle+" "+postUrl
},
Trello: {
title: "Trello",
locale: "en-US",
redirect_url: "https://trello.com/add-card?mode=popup&url="+postUrl+"&name="+postTitle+"&desc="
},
Viber: {
title: "Viber",
locale: "en-US",
bookmarklet_url: "viber://forward?text="+postTitle+" "+postUrl
},
Threema: {
title: "Threema",
locale: "en-US",
bookmarklet_url: "threema://compose?text="+postTitle+" "+postUrl
},
Telegram: {
title: "Telegram",
locale: "en-US",
redirect_url: "https://telegram.me/share/url?url="+postUrl+"&text="+postTitle
},
email: {
title: "Email",
locale: "en-US",
redirect_url: "mailto:?subject=" + postTitle + "&body=Link: " + postUrl,
},
reddit: {
title: "Reddit",
locale: "en-US",
redirect_url: "http://reddit.com/submit?url=" + postUrl + "&title=" + postTitle,
},
float_it: {
title: "Float it",
locale: "en-US",
redirect_url: "http://www.designfloat.com/submit.php?url=" + postUrl + "&title=" + postTitle,
},
google_mail: {
title: "Google Gmail",
locale: "en-US",
redirect_url: "https://mail.google.com/mail/?ui=2&view=cm&fs=1&tf=1&su=" + postTitle + "&body=Link: " + postUrl,
},
gentlereader: {
title: "GentleReader",
locale: "en-US",
redirect_url: "https://app.gentlereader.com/bookmark?url=" + postUrl,
},
google_bookmarks: {
title: "Google Bookmarks",
locale: "en-US",
redirect_url: "http://www.google.com/bookmarks/mark?op=edit&bkmk=" + postUrl + "&title=" + postTitle,
},
digg: {
title: "Digg",
locale: "en-US",
redirect_url: "http://digg.com/submit?phase=2&url=" + postUrl + "&title=" + postTitle,
},
printfriendly: {
title: "PrintFriendly",
locale: "en-US",
redirect_url: "http://www.printfriendly.com/print?url=" + postUrl,
},
print: {
title: "Print",
locale: "en-US",
redirect_url: "http://www.printfriendly.com/print?url=" + postUrl,
bookmarklet_url: "javascript:window.print()"
},
tumblr: {
title: "Tumblr",
locale: "en-US",
redirect_url: "https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl=" + postUrl + "&title=" + postTitle + "&caption=",
bookmarklet_url: "javascript:var d=document,w=window,e=w.getSelection,k=d.getSelection,x=d.selection,s=(e?e():(k)?k():(x?x.createRange().text:0)),f='http://www.tumblr.com/share',l=d.location,e=encodeURIComponent,p='?v=3&u='+e(l.href) +'&t='+e(d.title) +'&s='+e(s),u=f+p;try{if(!/^(.*\\.)?tumblr[^.]*$/.test(l.host))throw(0);tstbklt();}catch(z){a=function(){if(!w.open(u,'t','toolbar=0,resizable=0,status=1,width=450,height=430'))l.href=u;};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else a();}void(0);"
},
vk: {
title: "Vkontakte",
locale: "ru",
redirect_url: "https://vk.com/share.php?url=" + postUrl + "&title=" + postTitle,
},
evernote: {
title: "Evernote",
locale: "en-US",
redirect_url: "https://www.evernote.com/clip.action?url=" + postUrl + "&title=" + postTitle,
bookmarklet_url: "javascript:(function(){EN_CLIP_HOST='http://www.evernote.com';try{var x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new Date().getTime()/100000);document.getElementsByTagName('head')[0].appendChild(x);}catch(e){location.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);}})();"
},
amazon_us_wish_list: {
title: "Amazon Wish List",
locale: "en-US",
redirect_url: "http://www.amazon.com/wishlist/add?u=" + postUrl + "&t=" + postTitle,
bookmarklet_url: "javascript:(function(){var w=window,l=w.location,d=w.document,s=d.createElement('script'),e=encodeURIComponent,x='undefined',u='http://www.amazon.com/gp/wishlist/add';if(typeof s!='object')l.href=u+'?u='+e(l)+'&t='+e(d.title);function g(){if(d.readyState&&d.readyState!='complete'){setTimeout(g,200);}else{if(typeof AUWLBook==x)s.setAttribute('src',u+'.js?loc='+e(l)),d.body.appendChild(s);function f(){(typeof AUWLBook==x)?setTimeout(f,200):AUWLBook.showPopover();}f();}}g();}())"
},
wordpress_blog: {
title: "WordPress",
locale: "en-US",
redirect_url: "http://www.addtoany.com/ext/wordpress/press_this?linkurl=" + postUrl + "&linkname=" + postTitle,
},
whatsapp: {
title: "Whatsapp",
locale: "en-US",
bookmarklet_url: "https://" + heateorSssDetermineWhatsappShareAPI(true) + "/send?text=" + postTitle + " " + postUrl,
},
diigo: {
title: "Diigo",
locale: "en-US",
redirect_url: "http://www.diigo.com/post?url=" + postUrl + "&title=" + postTitle,
},
yc_hacker_news: {
title: "Hacker News",
locale: "en-US",
redirect_url: "http://news.ycombinator.com/submitlink?u=" + postUrl + "&t=" + postTitle,
},
box_net: {
title: "Box.net",
locale: "en-US",
redirect_url: "https://www.box.net/api/1.0/import?url=" + postUrl + "&name=" + postTitle + "&import_as=link",
},
aol_mail: {
title: "AOL Mail",
locale: "en-US",
redirect_url: "http://webmail.aol.com/25045/aol/en-us/Mail/compose-message.aspx?subject=" + postTitle + "&body=" + postUrl,
},
yahoo_mail: {
title: "Yahoo Mail",
locale: "en-US",
redirect_url: "http://compose.mail.yahoo.com/?Subject=" + postTitle + "&body=Link: " + postUrl,
},
instapaper: {
title: "Instapaper",
locale: "en-US",
redirect_url: "http://www.instapaper.com/edit?url=" + postUrl + "&title=" + postTitle,
},
plurk: {
title: "Plurk",
locale: "en-US",
redirect_url: "http://www.plurk.com/m?content=" + postUrl + "&qualifier=shares",
},
aim: {
title: "AIM",
locale: "en-US",
redirect_url: "http://share.aim.com/share/?url=" + postUrl + "&title=" + postTitle,
},
viadeo: {
title: "Viadeo",
locale: "en-US",
redirect_url: "http://www.viadeo.com/shareit/share/?url=" + postUrl + "&title=" + postTitle,
},
pinboard_in: {
title: "Pinboard",
locale: "en-US",
redirect_url: "http://pinboard.in/add?url=" + postUrl + "&title=" + postTitle,
},
blogger_post: {
title: "Blogger Post",
locale: "en-US",
redirect_url: "http://www.blogger.com/blog_this.pyra?t=&u=" + postUrl + "&l&n=" + postTitle,
},
typepad_post: {
title: "TypePad Post",
locale: "en-US",
redirect_url: "http://www.typepad.com/services/quickpost/post?v=2&qp_show=ac&qp_title=" + postTitle + "&qp_href=" + postUrl + "&qp_text=" + postTitle,
},
buffer: {
title: "Buffer",
locale: "en-US",
redirect_url: "http://bufferapp.com/add?url=" + postUrl + "&text=" + postTitle,
},
flipboard: {
title: "Flipboard",
locale: "en-US",
redirect_url: "https://share.flipboard.com/bookmarklet/popout?v=2&url=" + postUrl + "&title=" + postTitle,
},
pocket: {
title: "Pocket",
locale: "en-US",
redirect_url: "https://readitlaterlist.com/save?url=" + postUrl + "&title=" + postTitle,
},
fark: {
title: "Fark",
locale: "en-US",
redirect_url: "http://cgi.fark.com/cgi/fark/submit.pl?new_url=" + postUrl,
},
fintel: {
title: "Fintel",
locale: "en-US",
redirect_url: "https://fintel.io/submit?url=" + postUrl,
},
yummly: {
title: "Yummly",
locale: "en-US",
redirect_url: "http://www.yummly.com/urb/verify?url=" + postUrl + "&title=" + postTitle,
},
app_net: {
title: "App.net",
locale: "en-US",
redirect_url: "https://account.app.net/login/",
},
balatarin: {
title: "Balatarin",
locale: "en-US",
redirect_url: "https://www.balatarin.com/login",
},
bibSonomy: {
title: "BibSonomy",
locale: "en-US",
redirect_url: "http://www.bibsonomy.org/login",
},
Bitty_Browser: {
title: "Bitty Browser",
locale: "en-US",
redirect_url: "http://www.bitty.com/manual/?contenttype=&contentvalue=" + postUrl,
},
Blinklist: {
title: "Blinklist",
locale: "en-US",
redirect_url: "http://blinklist.com/blink?t=" + postTitle + "&d=&u=" + postUrl,
},
BlogMarks: {
title: "BlogMarks",
locale: "en-US",
redirect_url: "http://blogmarks.net/my/new.php?mini=1&simple=1&title=" + postTitle + "&url=" + postUrl,
},
Bookmarks_fr: {
title: "Bookmarks.fr",
locale: "en-US",
redirect_url: "http://www.bookmarks.fr/Connexion/?action=add&address=" + postUrl + "&title=" + postTitle,
},
BuddyMarks: {
title: "BuddyMarks",
locale: "en-US",
redirect_url: "http://buddymarks.com/login.php?bookmark_title=" + postTitle + "&bookmark_url=" + postUrl + "&bookmark_desc=&bookmark_tags=",
},
Care2_news: {
title: "Care2 News",
locale: "en-US",
redirect_url: "http://www.care2.com/passport/login.html?promoID=10&pg=http://www.care2.com/news/compose?sharehint=news&share[share_type]news&bookmarklet=Y&share[title]=" + postTitle + "&share[link_url]=" + postUrl + "&share[content]=",
},
Diary_Ru: {
title: "Diary.Ru",
locale: "en-US",
redirect_url: "http://www.diary.ru/?newpost&title=" + postTitle + "&text=" + postUrl,
},
Folkd: {
title: "Folkd",
locale: "en-US",
redirect_url: "http://www.folkd.com/page/social-bookmarking.html?addurl=" + postUrl,
},
Hatena: {
title: "Hatena",
locale: "en-US",
redirect_url: "http://b.hatena.ne.jp/bookmarklet?url=" + postUrl + "&btitle=" + postTitle,
},
Jamespot: {
title: "Jamespot",
locale: "en-US",
redirect_url: "//my.jamespot.com/",
},
Kakao: {
title: "Kakao",
locale: "en-US",
redirect_url: "https://story.kakao.com/share?url=" + postUrl,
},
Kindle_It: {
title: "Kindle_It",
locale: "en-US",
redirect_url: "//fivefilters.org/kindle-it/send.php?url=" + postUrl,
},
Known: {
title: "Known",
locale: "en-US",
redirect_url: "https://withknown.com/share/?url=" + postUrl + "&title=" + postTitle,
},
Line: {
title: "Line",
locale: "en-US",
redirect_url: "https://social-plugins.line.me/lineit/share?url=" + postUrl,
},
LiveJournal: {
title: "LiveJournal",
locale: "en-US",
redirect_url: "http://www.livejournal.com/update.bml?subject=" + postTitle + "&event=" + postUrl,
},
Mail_Ru: {
title: "Mail.Ru",
locale: "en-US",
redirect_url: "https://connect.mail.ru/share?share_url=" + postUrl,
},
Mendeley: {
title: "Mendeley",
locale: "en-US",
redirect_url: "https://www.mendeley.com/sign-in/",
},
Meneame: {
title: "Meneame",
locale: "en-US",
redirect_url: "https://www.meneame.net/submit.php?url=" + postUrl,
},
MeWe: {
title: "MeWe",
locale: "en-US",
redirect_url: "https://mewe.com/share?link=" + postUrl,
},
Mix: {
title: "Mix",
locale: "en-US",
redirect_url: "https://mix.com/mixit?url=" + postUrl,
},
Mixi: {
title: "Mixi",
locale: "en-US",
redirect_url: "https://mixi.jp/share.pl?mode=login&u=" + postUrl,
},
MySpace: {
title: "MySpace",
locale: "en-US",
redirect_url: "https://myspace.com/post?u=" + encodeURIComponent(postUrl) + "&t=" + postTitle + "&l=3&c=" + postTitle,
},
Netvouz: {
title: "Netvouz",
locale: "en-US",
redirect_url: "http://www.netvouz.com/action/submitBookmark?url=" + postUrl + "&title=" + postTitle + "&popup=no&description=",
},
Odnoklassniki: {
title: "Odnoklassniki",
locale: "en-US",
redirect_url: "https://connect.ok.ru/dk?cmd=WidgetSharePreview&st.cmd=WidgetSharePreview&st.shareUrl=" + postUrl + "&st.client_id=-1",
},
Outlook_com: {
title: "Outlook.com",
locale: "en-US",
redirect_url: "https://mail.live.com/default.aspx?rru=compose?subject=" + postTitle + "&body=" + postUrl + "&lc=1033&id=64855&mkt=en-us&cbcxt=mai",
},
Protopage_Bookmarks: {
title: "Protopage_Bookmarks",
locale: "en-US",
redirect_url: "http://www.protopage.com/add-button-site?url=" + postUrl + "&label=&type=page",
},
Pusha: {
title: "Pusha",
locale: "en-US",
redirect_url: "//www.pusha.se/posta?url=" + postUrl,
},
Qzone: {
title: "Qzone",
locale: "en-US",
redirect_url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + postUrl,
},
Rediff_MyPage: {
title: "Rediff MyPage",
locale: "en-US",
redirect_url: "//share.rediff.com/bookmark/addbookmark?bookmarkurl=" + postUrl + "&title=" + postTitle,
},
Renren: {
title: "Renren",
locale: "en-US",
redirect_url: "//www.connect.renren.com/share/sharer?url=" + postUrl + "&title=" + postTitle,
},
Sina_Weibo: {
title: "Sina Weibo",
locale: "en-US",
redirect_url: "http://service.weibo.com/share/share.php?url=" + postUrl + "&title=" + postTitle,
},
SiteJot: {
title: "SiteJot",
locale: "en-US",
redirect_url: "http://www.sitejot.com/loginform.php?iSiteAdd=&iSiteDes=",
},
Slashdot: {
title: "Slashdot",
locale: "en-US",
redirect_url: "//slashdot.org/submission?url=" + postUrl,
},
StockTwits: {
title: "StockTwits",
locale: "en-US",
redirect_url: "https://stocktwits.com/widgets/share?body=" + postTitle + " " + postUrl,
},
Svejo: {
title: "Svejo",
locale: "en-US",
redirect_url: "https://svejo.net/story/submit_by_url?url=" + postUrl + "&title=" + postTitle + "&summary=",
},
Symbaloo_Feeds: {
title: "Symbaloo_Feeds",
locale: "en-US",
redirect_url: "//www.symbaloo.com/",
},
Tuenti: {
title: "Tuenti",
locale: "en-US",
redirect_url: "https://www.tuenti.com/share?p=b5dd6602&url=" + postUrl,
},
Twiddla: {
title: "Twiddla",
locale: "en-US",
redirect_url: "//www.twiddla.com/New.aspx?url=" + postUrl + "&title=" + postTitle,
},
Webnews: {
title: "Webnews",
locale: "en-US",
redirect_url: "//www.webnews.de/login",
},
Wykop: {
title: "Wykop",
locale: "en-US",
redirect_url: "//www.wykop.pl/dodaj?url=" + postUrl + "&title=" + postTitle,
},
Xing: {
title: "Xing",
locale: "en-US",
redirect_url: "https://www.xing.com/spi/shares/new?cb=0&url=" + postUrl,
},
Yoolink: {
title: "Yoolink",
locale: "en-US",
redirect_url: "//yoolink.to/addorshare?url_value=" + postUrl + "&title=" + postTitle,
}};
var heateorSssMoreSharingServicesHtml='<button id="heateor_sss_sharing_popup_close" class="close-button separated"><img src="'+ heateorSssCloseIconPath +'" /></button><div id="heateor_sss_sharing_more_content" data-href="'+ decodeURIComponent(postUrl) +'"><div class="filter"><input type="text" onkeyup="heateorSssFilterSharing(this.value.trim())" placeholder="Search" class="search"></div><div class="all-services"><ul class="mini">';
for(var i in heateorSssMoreSharingServices){
var tempTitle=heateorSssCapitaliseFirstLetter(heateorSssMoreSharingServices[i].title.replace(/[_. ]/g, ""));
heateorSssMoreSharingServicesHtml +='<li><a rel="nofollow" class="heateorSss'+i+'Share" title="'+ heateorSssMoreSharingServices[i].title +'" alt="'+ heateorSssMoreSharingServices[i].title +'" ';
if(heateorSssMoreSharingServices[i].bookmarklet_url){
heateorSssMoreSharingServicesHtml +='href="' + heateorSssMoreSharingServices[i].bookmarklet_url + '" ';
}else if(heateorSssMoreSharingServices[i].redirect_url){
heateorSssMoreSharingServicesHtml +='onclick="heateorSssPopup(\'' + heateorSssMoreSharingServices[i].redirect_url + '\')" href="javascript:void(0)" ';
}else{
heateorSssMoreSharingServicesHtml +='href="javascript:void(0)" ';
}
heateorSssMoreSharingServicesHtml +='"><i style="width:22px;height:22px" title="'+ heateorSssMoreSharingServices[i].title +'" class="heateorSssSharing heateorSss' + tempTitle + 'Background"><ss style="display:block;width:100%;height:100%;" class="heateorSssSharingSvg heateorSss' + tempTitle + 'Svg"></ss></i>' + heateorSssMoreSharingServices[i].title + '</a></li>';
}
heateorSssMoreSharingServicesHtml +=concate;
var mainDiv=document.createElement('div');
mainDiv.innerHTML=heateorSssMoreSharingServicesHtml;
mainDiv.setAttribute('id', 'heateor_sss_sharing_more_providers');
var bgDiv=document.createElement('div');
bgDiv.setAttribute('id', 'heateor_sss_popup_bg');
jQuery('body').append(mainDiv).append(bgDiv);
document.getElementById('heateor_sss_popup_bg').onclick=document.getElementById('heateor_sss_sharing_popup_close').onclick=function(){
mainDiv.parentNode.removeChild(mainDiv);
bgDiv.parentNode.removeChild(bgDiv);
}}
if(heateorSssHorizontalSharingCountEnable||heateorSssVerticalSharingCountEnable){
heateorSssLoadEvent(
function(){
heateorSssCallAjax(function(){
heateorSssGetSharingCounts();
});
}
);
}
function heateorSssFilterSharing(val){
jQuery('ul.mini li a').each(function(){
if(jQuery(this).text().toLowerCase().indexOf(val.toLowerCase())!=-1){
jQuery(this).parent().css('display', 'block');
}else{
jQuery(this).parent().css('display', 'none');
}});
};
var heateorSssFacebookTargetUrls=[];
function heateorSssGetSharingCounts(){
var targetUrls=[];
jQuery('.heateor_sss_sharing_container').each(function(){
if(typeof jQuery(this).attr('heateor-sss-no-counts')=='undefined'){
var currentTargetUrl=jQuery(this).attr('heateor-sss-data-href');
if(currentTargetUrl!=null&&jQuery.inArray(currentTargetUrl, heateorSssUrlCountFetched)==-1){
targetUrls.push(currentTargetUrl);
heateorSssUrlCountFetched.push(currentTargetUrl);
}}
});
if(targetUrls.length==0){
return;
}
jQuery.ajax({
type: 'GET',
dataType: 'json',
url: heateorSssSharingAjaxUrl,
data: {
action: 'heateor_sss_sharing_count',
urls: targetUrls,
},
success: function(data, textStatus, XMLHttpRequest){
if(data.status==1){
if(data.facebook){
heateorSssFacebookTargetUrls=data.facebook_urls;
}
for(var i in data.message){
var sharingContainers=jQuery("div[heateor-sss-data-href='"+i+"']");
jQuery(sharingContainers).each(function(){
var totalCount=0;
for(var j in data.message[i]){
var sharingCount=parseInt(data.message[i][j])||0;
var targetElement=jQuery(this).find('.heateor_sss_'+j+'_count');
if(jQuery(targetElement).attr('sss_st_count')){
sharingCount=parseInt(sharingCount) + parseInt(jQuery(targetElement).attr('sss_st_count'));
}
totalCount +=parseInt(sharingCount);
if(sharingCount < 1){ continue; }
jQuery(targetElement).html(heateorSssCalculateApproxCount(sharingCount)).css({'visibility': 'visible', 'display': 'block'});
if(( typeof heateorSssReduceHorizontalSvgWidth!='undefined'&&jQuery(this).hasClass('heateor_sss_horizontal_sharing'))||(typeof heateorSssReduceVerticalSvgWidth!='undefined'&&jQuery(this).hasClass('heateor_sss_vertical_sharing'))){
jQuery(targetElement).parents('li').find('.heateorSssSharingSvg').css('float', 'left');
}
if(( typeof heateorSssReduceHorizontalSvgHeight!='undefined'&&jQuery(this).hasClass('heateor_sss_horizontal_sharing'))||(typeof heateorSssReduceVerticalSvgHeight!='undefined'&&jQuery(this).hasClass('heateor_sss_vertical_sharing'))){
jQuery(targetElement).parents('li').find('.heateorSssSharingSvg').css('marginTop', '0');
}}
var totalCountContainer=jQuery(this).find('.heateorSssTCBackground'), totalShares=heateorSssCalculateApproxCount(totalCount);
jQuery(totalCountContainer).each(function(){
var containerHeight=jQuery(this).css('height');
jQuery(this).html('<div class="heateorSssTotalShareCount" style="font-size: '+ (parseInt(containerHeight) * 62/100) +'px">' + totalShares + '</div><div class="heateorSssTotalShareText" style="font-size: '+ (parseInt(containerHeight) * 38/100) +'px">' + (totalCount==0||totalCount > 1 ? heateorSssSharesText:heateorSssShareText) + '</div>').css('visibility', 'visible');
});
});
}
if(heateorSssFacebookTargetUrls.length!=0){
heateorSssFetchFacebookShares(heateorSssFacebookTargetUrls);
}}
}});
}
function heateorSssFetchFacebookShares(targetUrls){
var loopCounter=0;
for(var i in targetUrls){
for(var j in targetUrls[i]){
loopCounter++;
heateorSssFBShareJSONCall(targetUrls[i][j], loopCounter, targetUrls[0].length*targetUrls.length, targetUrls[0][j]);
}}
}
function heateorSssFBShareJSONCall(targetUrl, loopCounter, targetUrlsLength, dataHref){
jQuery.getJSON('//graph.facebook.com/?id=' + targetUrl, function(data){
if(data.share&&data.share.share_count >=0){
var sharingContainers=jQuery("div[heateor-sss-data-href='"+dataHref+"']");
jQuery(sharingContainers).each(function(){
var targetElement=jQuery(this).find('.heateor_sss_facebook_count');
var facebookBackground=jQuery(this).find('i.heateorSssFacebookBackground');
var sharingCount=parseInt(data.share.share_count);
if(jQuery(targetElement).attr('sss_st_count')!==undefined){
sharingCount +=parseInt(jQuery(targetElement).attr('sss_st_count'));
}
if(sharingCount > 0){
if(typeof jQuery(facebookBackground).attr('heateor-sss-fb-shares')=='undefined'){
jQuery(targetElement).html(heateorSssCalculateApproxCount(sharingCount)).css({'visibility': 'visible', 'display': 'block'});
jQuery(facebookBackground).attr('heateor-sss-fb-shares', sharingCount);
}else if(typeof jQuery(facebookBackground).attr('heateor-sss-fb-shares')!='undefined'){
var tempShareCount=parseInt(jQuery(facebookBackground).attr('heateor-sss-fb-shares'));
jQuery(facebookBackground).attr('heateor-sss-fb-shares', sharingCount + tempShareCount);
jQuery(targetElement).html(heateorSssCalculateApproxCount(sharingCount + tempShareCount));
}
if(( typeof heateorSssReduceHorizontalSvgWidth!='undefined'&&jQuery(this).hasClass('heateor_sss_horizontal_sharing'))||(typeof heateorSssReduceVerticalSvgWidth!='undefined'&&jQuery(this).hasClass('heateor_sss_vertical_sharing'))){
jQuery(targetElement).parents('li').find('.heateorSssSharingSvg').css('float', 'left');
}
if(( typeof heateorSssReduceHorizontalSvgHeight!='undefined'&&jQuery(this).hasClass('heateor_sss_horizontal_sharing'))||(typeof heateorSssReduceVerticalSvgHeight!='undefined'&&jQuery(this).hasClass('heateor_sss_vertical_sharing'))){
jQuery(targetElement).parents('li').find('.heateorSssSharingSvg').css('marginTop', '0');
}
var totalCountContainer=jQuery(this).find('.heateorSssTCBackground');
jQuery(totalCountContainer).each(function(){
var totalShareCountElem=jQuery(this).find('.heateorSssTotalShareCount');
var totalShareCount=jQuery(totalShareCountElem).text();
var newTotalCount=heateorSssCalculateActualCount(totalShareCount) + sharingCount;
jQuery(totalShareCountElem).text(heateorSssCalculateApproxCount(newTotalCount));
jQuery(this).find('.heateorSssTotalShareText').text(newTotalCount==0||newTotalCount > 1 ? heateorSssSharesText:heateorSssShareText);
});
}});
}
if(loopCounter==targetUrlsLength){
setTimeout(function(){
var facebookShares={};
for(var i in heateorSssFacebookTargetUrls[0]){
var sharingContainers=jQuery("div[heateor-sss-data-href='"+heateorSssFacebookTargetUrls[0][i]+"']");
jQuery(sharingContainers).each(function(){
var facebookCountElement=jQuery(this).find('.heateor_sss_facebook_count');
var facebookCountElementBg=jQuery(this).find('i.heateorSssFacebookBackground');
var shareCountString=typeof jQuery(facebookCountElementBg).attr('heateor-sss-fb-shares')!='undefined' ? jQuery(facebookCountElementBg).attr('heateor-sss-fb-shares').trim():'';
if(shareCountString!=''){
var shareCount=parseInt(heateorSssCalculateActualCount(shareCountString));
if(jQuery(facebookCountElement).attr('sss_st_count')!==undefined){
var startingCount=parseInt(jQuery(facebookCountElement).attr('sss_st_count').trim());
shareCount=Math.abs(shareCount - startingCount);
}
facebookShares[heateorSssFacebookTargetUrls[0][i]]=shareCount;
return;
}});
}
if(!jQuery.isEmptyObject(facebookShares)){
heateorSssSaveFacebookShares(facebookShares);
}}, 1000);
}});
}
function heateorSssSaveFacebookShares(facebookShares){
jQuery.ajax({
type: 'GET',
dataType: 'json',
url: heateorSssSharingAjaxUrl,
data: {
action: 'heateor_sss_save_facebook_shares',
share_counts: facebookShares,
},
success: function(data, textStatus, XMLHttpRequest){}});
}
function heateorSssCalculateApproxCount(sharingCount){
if(sharingCount > 999&&sharingCount < 10000){
sharingCount=(Math.round(sharingCount/100))/10 + 'K';
}else if(sharingCount > 9999&&sharingCount < 100000){
sharingCount=(Math.round(sharingCount/100))/10 + 'K';
}else if(sharingCount > 99999&&sharingCount < 1000000){
sharingCount=(Math.round(sharingCount/100))/10 + 'K';
}else if(sharingCount > 999999){
sharingCount=(Math.round(sharingCount/100000))/10 + 'M';
}
return sharingCount;
}
function heateorSssCalculateActualCount(sharingCount){
if(sharingCount.indexOf('K') > 0){
sharingCount=sharingCount.replace('K', '') * 1000;
}else if(sharingCount.indexOf('M') > 0){
sharingCount=sharingCount.replace('M', '') * 1000000;
}
return parseInt(sharingCount);
}
function heateorSssCapitaliseFirstLetter(e){
return e.charAt(0).toUpperCase() + e.slice(1)
}
jQuery(function(){
var heateorSssWhatsappJSAPI=heateorSssDetermineWhatsappShareAPI(false);
var classes=['heateor_sss_vertical_sharing', 'heateor_sss_vertical_counter'];
for(var i=0; i < classes.length; i++){
if(jQuery('.' + classes[i]).length){
jQuery('.' + classes[i]).each(function(){
var verticalSharingHtml=jQuery(this).html();
if(jQuery(this).attr('style').indexOf('right') >=0){
var removeClass='heateorSssPushIn', margin='Right', alignment='right', addClass='heateorSssPullOut';
}else{
var removeClass='heateorSssPullOut', margin='Left', alignment='left', addClass='heateorSssPushIn';
}
jQuery(this).html(verticalSharingHtml + '<div title="Hide" style="float:' + alignment + '" onclick="heateorSssHideSharing(this, \''+ removeClass +'\', \''+ addClass +'\',\'' + margin +'\', \'' + alignment + '\')" class="heateorSssSharingArrow ' + removeClass + '"></div>');
});
}}
if(heateorSssMobileStickySharingEnabled==1){
if(jQuery('div.heateor_sss_vertical_sharing').length){
jQuery(document.body).append("<div class='heateor_sss_mobile_footer'></div>");
}}
var heateorSssClipboard=new ClipboardJS('.heateorSssCopyLinkBackground, .heateorSssCopyLinkShare, .heateorSssCopyLinkSvg', {
text: function(trigger){
if(jQuery(trigger).hasClass('heateorSssCopyLinkShare')){
var element=trigger.parentElement.parentElement.parentElement.parentElement;
var url=jQuery(element).attr("data-href")||"";
}else if(jQuery(trigger).hasClass('heateorSssCopyLinkSvg')){
var element=trigger.parentElement.parentElement.parentElement.parentElement;
var url=jQuery(element).attr("heateor-sss-data-href")||"";
if(!url){
var element=trigger.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
var url=jQuery(element).attr("data-href")||"";
}}
return url;
}});
heateorSssClipboard.on('success', function(e){
alert(heateorSssCopyLinkMessage);
});
});
function heateorSssHideSharing(elem, removeClass, addClass, margin, alignment){
var animation={}, counter=jQuery(elem).parent().hasClass('heateor_sss_vertical_counter'), offset=parseInt(jQuery(elem).parent().css('width')) + 10 - (counter ? 16:0);
var ssOffset=jQuery(elem).parent().attr('ss-offset');
if(ssOffset){
var savedOffset=parseInt(ssOffset);
}else{
var savedOffset=(counter ? heateorSssCounterOffset:heateorSssSharingOffset);
}
if(jQuery(elem).attr('title')=='Hide'){
animation[alignment]="-=" + (offset + savedOffset);
jQuery(elem).parent().animate(animation, 400, function(){
jQuery(elem).removeClass(removeClass).addClass(addClass).attr('title', 'Share');
if(counter){
var cssFloat=alignment=='left' ? 'right':'left';
jQuery(elem).css('float', cssFloat);
}else{
jQuery(elem).css('margin' + margin, offset + 'px')
}});
}else{
animation[alignment]="+=" + (offset + savedOffset);
jQuery(elem).parent().animate(animation, 400, function(){
jQuery(elem).removeClass(addClass).addClass(removeClass).attr('title', 'Hide');
if(counter){
jQuery(elem).css('float', alignment);
}else{
jQuery(elem).css('margin' + margin, '0px');
}});
}}
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ClipboardJS=e():t.ClipboardJS=e()}(this,function(){return o={},r.m=n=[function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),r=document.createRange();r.selectNodeContents(t),o.removeAllRanges(),o.addRange(r),e=o.toString()}return e}},function(t,e){function n(){}n.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var o=this;function r(){o.off(t,r),e.apply(n,arguments)}return r._=e,this.on(t,r,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,r=n.length;o<r;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],r=[];if(o&&e)for(var i=0,a=o.length;i<a;i++)o[i].fn!==e&&o[i].fn._!==e&&r.push(o[i]);return r.length?n[t]=r:delete n[t],this}},t.exports=n,t.exports.TinyEmitter=n},function(t,e,n){var d=n(3),h=n(4);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!d.string(e))throw new TypeError("Second argument must be a String");if(!d.fn(n))throw new TypeError("Third argument must be a Function");if(d.node(t))return s=e,f=n,(u=t).addEventListener(s,f),{destroy:function(){u.removeEventListener(s,f)}};if(d.nodeList(t))return a=t,c=e,l=n,Array.prototype.forEach.call(a,function(t){t.addEventListener(c,l)}),{destroy:function(){Array.prototype.forEach.call(a,function(t){t.removeEventListener(c,l)})}};if(d.string(t))return o=t,r=e,i=n,h(document.body,o,r,i);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var o,r,i,a,c,l,u,s,f}},function(t,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e,n){var a=n(5);function i(t,e,n,o,r){var i=function(e,n,t,o){return function(t){t.delegateTarget=a(t.target,n),t.delegateTarget&&o.call(e,t)}}.apply(this,arguments);return t.addEventListener(n,i,r),{destroy:function(){t.removeEventListener(n,i,r)}}}t.exports=function(t,e,n,o,r){return"function"==typeof t.addEventListener?i.apply(null,arguments):"function"==typeof n?i.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return i(t,e,n,o,r)}))}},function(t,e){if("undefined"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}t.exports=function(t,e){for(;t&&9!==t.nodeType;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}},function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),this.resolveOptions(t),this.initSelection()}var l=(function(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}(c,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=r()(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=r()(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand (this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(t){var e=0<arguments.length&&void 0!==t?t:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":i(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),c),u=n(1),s=n.n(u),f=n(2),d=n.n(f),h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p=function(t,e,n){return e&&y(t.prototype,e),n&&y(t,n),t};function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var m=(function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(v,s.a),p(v,[{key:"resolveOptions",value:function(t){var e=0<arguments.length&&void 0!==t?t:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===h(e.container)?e.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=d()(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return b("action",t)}},{key:"defaultTarget",value:function(t){var e=b("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return b("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(t){var e=0<arguments.length&&void 0!==t?t:["copy","cut"],n="string"==typeof e?[e]:e,o=!!document.queryCommandSupported;return n.forEach(function(t){o=o&&!!document.queryCommandSupported(t)}),o}}]),v);function v(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,v);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(v.__proto__||Object.getPrototypeOf(v)).call(this));return n.resolveOptions(e),n.listenClick(t),n}function b(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}e.default=m}],r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=6).default;function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}var n,o});
!function(d,l){"use strict";var e=!1,o=!1;if(l.querySelector)if(d.addEventListener)e=!0;if(d.wp=d.wp||{},!d.wp.receiveEmbedMessage)if(d.wp.receiveEmbedMessage=function(e){var t=e.data;if(t)if(t.secret||t.message||t.value)if(!/[^a-zA-Z0-9]/.test(t.secret)){var r,a,i,s,n,o=l.querySelectorAll('iframe[data-secret="'+t.secret+'"]'),c=l.querySelectorAll('blockquote[data-secret="'+t.secret+'"]');for(r=0;r<c.length;r++)c[r].style.display="none";for(r=0;r<o.length;r++)if(a=o[r],e.source===a.contentWindow){if(a.removeAttribute("style"),"height"===t.message){if(1e3<(i=parseInt(t.value,10)))i=1e3;else if(~~i<200)i=200;a.height=i}if("link"===t.message)if(s=l.createElement("a"),n=l.createElement("a"),s.href=a.getAttribute("src"),n.href=t.value,n.host===s.host)if(l.activeElement===a)d.top.location.href=t.value}}},e)d.addEventListener("message",d.wp.receiveEmbedMessage,!1),l.addEventListener("DOMContentLoaded",t,!1),d.addEventListener("load",t,!1);function t(){if(!o){o=!0;var e,t,r,a,i=-1!==navigator.appVersion.indexOf("MSIE 10"),s=!!navigator.userAgent.match(/Trident.*rv:11\./),n=l.querySelectorAll("iframe.wp-embedded-content");for(t=0;t<n.length;t++){if(!(r=n[t]).getAttribute("data-secret"))a=Math.random().toString(36).substr(2,10),r.src+="#?secret="+a,r.setAttribute("data-secret",a);if(i||s)(e=r.cloneNode(!0)).removeAttribute("security"),r.parentNode.replaceChild(e,r)}}}}(window,document);