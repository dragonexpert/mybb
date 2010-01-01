//scriptaculous.js
var Scriptaculous={Version:'1.8.1',require:function(a){document.write('<script type="text/javascript" src="'+a+'"><\/script>')},REQUIRED_PROTOTYPE:'1.6.0',load:function(){function convertVersionString(a){var r=a.split('.');return parseInt(r[0])*100000+parseInt(r[1])*1000+parseInt(r[2])}if((typeof Prototype=='undefined')||(typeof Element=='undefined')||(typeof Element.Methods=='undefined')||(convertVersionString(Prototype.Version)<convertVersionString(Scriptaculous.REQUIRED_PROTOTYPE)))throw("script.aculo.us requires the Prototype JavaScript framework >= "+Scriptaculous.REQUIRED_PROTOTYPE);var d=/(proto|scripta)culous[a-z0-9._-]*\.js(\?.*)?$/;$A(document.getElementsByTagName("script")).findAll(function(s){return(s.src&&s.src.match(d))}).each(function(s){var b=s.src.replace(d,'');var c=(s.src.match(/\?.*load=([a-z,]*)/)||['',''])[1];c.split(',').without('').each(function(a){Scriptaculous.require(b+a+'.js')})})}};
//builder.js
var Builder={NODEMAP:{AREA:'map',CAPTION:'table',COL:'table',COLGROUP:'table',LEGEND:'fieldset',OPTGROUP:'select',OPTION:'select',PARAM:'object',TBODY:'table',TD:'table',TFOOT:'table',TH:'table',THEAD:'table',TR:'table'},node:function(a){a=a.toUpperCase();var b=this.NODEMAP[a]||'div';var c=document.createElement(b);try{c.innerHTML="<"+a+"></"+a+">"}catch(e){}var d=c.firstChild||null;if(d&&(d.tagName.toUpperCase()!=a))d=d.getElementsByTagName(a)[0];if(!d)d=document.createElement(a);if(!d)return;if(arguments[1])if(this._isStringOrNumber(arguments[1])||(arguments[1]instanceof Array)||arguments[1].tagName){this._children(d,arguments[1])}else{var f=this._attributes(arguments[1]);if(f.length){try{c.innerHTML="<"+a+" "+f+"></"+a+">"}catch(e){}d=c.firstChild||null;if(!d){d=document.createElement(a);for(attr in arguments[1])d[attr=='class'?'className':attr]=arguments[1][attr]}if(d.tagName.toUpperCase()!=a)d=c.getElementsByTagName(a)[0]}}if(arguments[2])this._children(d,arguments[2]);return d},_text:function(a){return document.createTextNode(a)},ATTR_MAP:{'className':'class','htmlFor':'for'},_attributes:function(a){var b=[];for(attribute in a)b.push((attribute in this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+a[attribute].toString().escapeHTML().gsub(/"/,'&quot;')+'"');return b.join(" ")},_children:function(a,b){if(b.tagName){a.appendChild(b);return}if(typeof b=='object'){b.flatten().each(function(e){if(typeof e=='object')a.appendChild(e);else if(Builder._isStringOrNumber(e))a.appendChild(Builder._text(e))})}else if(Builder._isStringOrNumber(b))a.appendChild(Builder._text(b))},_isStringOrNumber:function(a){return(typeof a=='string'||typeof a=='number')},build:function(a){var b=this.node('div');$(b).update(a.strip());return b.down()},dump:function(b){if(typeof b!='object'&&typeof b!='function')b=window;var c=("A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY "+"BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET "+"FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX "+"KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P "+"PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD "+"TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR").split(/\s+/);c.each(function(a){b[a]=function(){return Builder.node.apply(Builder,[a].concat($A(arguments)))}})}};
//sound.js
Sound={tracks:{},_enabled:true,template:new Template('<embed style="height:0" id="sound_#{track}_#{id}" src="#{url}" loop="false" autostart="true" hidden="true"/>'),enable:function(){Sound._enabled=true},disable:function(){Sound._enabled=false},play:function(c){if(!Sound._enabled)return;var d=Object.extend({track:'global',url:c,replace:false},arguments[1]||{});if(d.replace&&this.tracks[d.track]){$R(0,this.tracks[d.track].id).each(function(a){var b=$('sound_'+d.track+'_'+a);b.Stop&&b.Stop();b.remove()});this.tracks[d.track]=null}if(!this.tracks[d.track])this.tracks[d.track]={id:0};else this.tracks[d.track].id++;d.id=this.tracks[d.track].id;$$('body')[0].insert(Prototype.Browser.IE?new Element('bgsound',{id:'sound_'+d.track+'_'+d.id,src:d.url,loop:1,autostart:true}):Sound.template.evaluate(d))}};if(Prototype.Browser.Gecko&&navigator.userAgent.indexOf("Win")>0){if(navigator.plugins&&$A(navigator.plugins).detect(function(p){return p.name.indexOf('QuickTime')!=-1}))Sound.template=new Template('<object id="sound_#{track}_#{id}" width="0" height="0" type="audio/mpeg" data="#{url}"/>');else Sound.play=function(){}}
//load additional files
Scriptaculous.load();