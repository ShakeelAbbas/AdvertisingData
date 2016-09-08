if(!document.createElement("canvas").getContext){(function(){function f(){return this.context_||(this.context_=new I(this))}function c(e,t,n){var r=l.call(arguments,2);return function(){return e.apply(t,r.concat(l.call(arguments)))}}function h(e){return String(e).replace(/&/g,"&").replace(/"/g,"&quot;")}function p(e,t,n){if(!e.namespaces[t]){e.namespaces.add(t,n,"#default#VML")}}function d(e){p(e,"g_vml_","urn:schemas-microsoft-com:vml");p(e,"g_o_","urn:schemas-microsoft-com:office:office");if(!e.styleSheets["ex_canvas_"]){var t=e.createStyleSheet();t.owningElement.id="ex_canvas_";t.cssText="canvas{display:inline-block;overflow:hidden;"+"text-align:left;width:300px;height:150px}"}}function m(e){var t=e.srcElement;switch(e.propertyName){case"width":t.getContext().clearRect();t.style.width=t.attributes.width.nodeValue+"px";t.firstChild.style.width=t.clientWidth+"px";break;case"height":t.getContext().clearRect();t.style.height=t.attributes.height.nodeValue+"px";t.firstChild.style.height=t.clientHeight+"px";break}}function g(e){var t=e.srcElement;if(t.firstChild){t.firstChild.style.width=t.clientWidth+"px";t.firstChild.style.height=t.clientHeight+"px"}}function E(){return[[1,0,0],[0,1,0],[0,0,1]]}function S(e,t){var n=E();for(var r=0;r<3;r++){for(var i=0;i<3;i++){var s=0;for(var o=0;o<3;o++){s+=e[r][o]*t[o][i]}n[r][i]=s}}return n}function x(e,t){t.fillStyle=e.fillStyle;t.lineCap=e.lineCap;t.lineJoin=e.lineJoin;t.lineWidth=e.lineWidth;t.miterLimit=e.miterLimit;t.shadowBlur=e.shadowBlur;t.shadowColor=e.shadowColor;t.shadowOffsetX=e.shadowOffsetX;t.shadowOffsetY=e.shadowOffsetY;t.strokeStyle=e.strokeStyle;t.globalAlpha=e.globalAlpha;t.font=e.font;t.textAlign=e.textAlign;t.textBaseline=e.textBaseline;t.arcScaleX_=e.arcScaleX_;t.arcScaleY_=e.arcScaleY_;t.lineScale_=e.lineScale_}function N(e){var t=e.indexOf("(",3);var n=e.indexOf(")",t+1);var r=e.substring(t+1,n).split(",");if(r.length!=4||e.charAt(3)!="a"){r[3]=1}return r}function C(e){return parseFloat(e)/100}function k(e,t,n){return Math.min(n,Math.max(t,e))}function L(e){var t,n,r,i,s,o;i=parseFloat(e[0])/360%360;if(i<0)i++;s=k(C(e[1]),0,1);o=k(C(e[2]),0,1);if(s==0){t=n=r=o}else{var u=o<.5?o*(1+s):o+s-o*s;var a=2*o-u;t=A(a,u,i+1/3);n=A(a,u,i);r=A(a,u,i-1/3)}return"#"+y[Math.floor(t*255)]+y[Math.floor(n*255)]+y[Math.floor(r*255)]}function A(e,t,n){if(n<0)n++;if(n>1)n--;if(6*n<1)return e+(t-e)*6*n;else if(2*n<1)return t;else if(3*n<2)return e+(t-e)*(2/3-n)*6;else return e}function M(e){if(e in O){return O[e]}var t,n=1;e=String(e);if(e.charAt(0)=="#"){t=e}else if(/^rgb/.test(e)){var r=N(e);var t="#",i;for(var s=0;s<3;s++){if(r[s].indexOf("%")!=-1){i=Math.floor(C(r[s])*255)}else{i=+r[s]}t+=y[k(i,0,255)]}n=+r[3]}else if(/^hsl/.test(e)){var r=N(e);t=L(r);n=r[3]}else{t=T[e]||e}return O[e]={color:t,alpha:n}}function P(e){if(D[e]){return D[e]}var t=document.createElement("div");var n=t.style;try{n.font=e}catch(r){}return D[e]={style:n.fontStyle||_.style,variant:n.fontVariant||_.variant,weight:n.fontWeight||_.weight,size:n.fontSize||_.size,family:n.fontFamily||_.family}}function H(e,t){var n={};for(var r in e){n[r]=e[r]}var i=parseFloat(t.currentStyle.fontSize),s=parseFloat(e.size);if(typeof e.size=="number"){n.size=e.size}else if(e.size.indexOf("px")!=-1){n.size=s}else if(e.size.indexOf("em")!=-1){n.size=i*s}else if(e.size.indexOf("%")!=-1){n.size=i/100*s}else if(e.size.indexOf("pt")!=-1){n.size=s/.75}else{n.size=i}n.size*=.981;return n}function B(e){return e.style+" "+e.variant+" "+e.weight+" "+e.size+"px "+e.family}function F(e){return j[e]||"square"}function I(e){this.m_=E();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.strokeStyle="#000";this.fillStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=o*1;this.globalAlpha=1;this.font="10px sans-serif";this.textAlign="left";this.textBaseline="alphabetic";this.canvas=e;var t="width:"+e.clientWidth+"px;height:"+e.clientHeight+"px;overflow:hidden;position:absolute";var n=e.ownerDocument.createElement("div");n.style.cssText=t;e.appendChild(n);var r=n.cloneNode(false);r.style.backgroundColor="red";r.style.filter="alpha(opacity=0)";e.appendChild(r);this.element_=n;this.arcScaleX_=1;this.arcScaleY_=1;this.lineScale_=1}function R(e,t,n,r){e.currentPath_.push({type:"bezierCurveTo",cp1x:t.x,cp1y:t.y,cp2x:n.x,cp2y:n.y,x:r.x,y:r.y});e.currentX_=r.x;e.currentY_=r.y}function U(e,t){var n=M(e.strokeStyle);var r=n.color;var i=n.alpha*e.globalAlpha;var s=e.lineScale_*e.lineWidth;if(s<1){i*=s}t.push("<g_vml_:stroke",' opacity="',i,'"',' joinstyle="',e.lineJoin,'"',' miterlimit="',e.miterLimit,'"',' endcap="',F(e.lineCap),'"',' weight="',s,'px"',' color="',r,'" />')}function z(t,n,r,i){var s=t.fillStyle;var u=t.arcScaleX_;var a=t.arcScaleY_;var f=i.x-r.x;var l=i.y-r.y;if(s instanceof $){var c=0;var h={x:0,y:0};var p=0;var d=1;if(s.type_=="gradient"){var v=s.x0_/u;var m=s.y0_/a;var g=s.x1_/u;var y=s.y1_/a;var b=W(t,v,m);var w=W(t,g,y);var E=w.x-b.x;var S=w.y-b.y;c=Math.atan2(E,S)*180/Math.PI;if(c<0){c+=360}if(c<1e-6){c=0}}else{var b=W(t,s.x0_,s.y0_);h={x:(b.x-r.x)/f,y:(b.y-r.y)/l};f/=u*o;l/=a*o;var x=e.max(f,l);p=2*s.r0_/x;d=2*s.r1_/x-p}var T=s.colors_;T.sort(function(e,t){return e.offset-t.offset});var N=T.length;var C=T[0].color;var k=T[N-1].color;var L=T[0].alpha*t.globalAlpha;var A=T[N-1].alpha*t.globalAlpha;var O=[];for(var _=0;_<N;_++){var D=T[_];O.push(D.offset*d+p+" "+D.color)}n.push('<g_vml_:fill type="',s.type_,'"',' method="none" focus="100%"',' color="',C,'"',' color2="',k,'"',' colors="',O.join(","),'"',' opacity="',A,'"',' g_o_:opacity2="',L,'"',' angle="',c,'"',' focusposition="',h.x,",",h.y,'" />')}else if(s instanceof J){if(f&&l){var P=-r.x;var H=-r.y;n.push("<g_vml_:fill",' position="',P/f*u*u,",",H/l*a*a,'"',' type="tile"',' src="',s.src_,'" />')}}else{var B=M(t.fillStyle);var j=B.color;var F=B.alpha*t.globalAlpha;n.push('<g_vml_:fill color="',j,'" opacity="',F,'" />')}}function W(e,t,n){var r=e.m_;return{x:o*(t*r[0][0]+n*r[1][0]+r[2][0])-u,y:o*(t*r[0][1]+n*r[1][1]+r[2][1])-u}}function X(e){return isFinite(e[0][0])&&isFinite(e[0][1])&&isFinite(e[1][0])&&isFinite(e[1][1])&&isFinite(e[2][0])&&isFinite(e[2][1])}function V(e,t,n){if(!X(t)){return}e.m_=t;if(n){var r=t[0][0]*t[1][1]-t[0][1]*t[1][0];e.lineScale_=s(i(r))}}function $(e){this.type_=e;this.x0_=0;this.y0_=0;this.r0_=0;this.x1_=0;this.y1_=0;this.r1_=0;this.colors_=[]}function J(e,t){Q(e);switch(t){case"repeat":case null:case"":this.repetition_="repeat";break;case"repeat-x":case"repeat-y":case"no-repeat":this.repetition_=t;break;default:K("SYNTAX_ERR")}this.src_=e.src;this.width_=e.width;this.height_=e.height}function K(e){throw new G(e)}function Q(e){if(!e||e.nodeType!=1||e.tagName!="IMG"){K("TYPE_MISMATCH_ERR")}if(e.readyState!="complete"){K("INVALID_STATE_ERR")}}function G(e){this.code=this[e];this.message=e+": DOM Exception "+this.code}var e=Math;var t=e.round;var n=e.sin;var r=e.cos;var i=e.abs;var s=e.sqrt;var o=10;var u=o/2;var a=+navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];var l=Array.prototype.slice;d(document);var v={init:function(e){var t=e||document;t.createElement("canvas");t.attachEvent("onreadystatechange",c(this.init_,this,t))},init_:function(e){var t=e.getElementsByTagName("canvas");for(var n=0;n<t.length;n++){this.initElement(t[n])}},initElement:function(e){if(!e.getContext){e.getContext=f;d(e.ownerDocument);e.innerHTML="";e.attachEvent("onpropertychange",m);e.attachEvent("onresize",g);var t=e.attributes;if(t.width&&t.width.specified){e.style.width=t.width.nodeValue+"px"}else{e.width=e.clientWidth}if(t.height&&t.height.specified){e.style.height=t.height.nodeValue+"px"}else{e.height=e.clientHeight}}return e}};v.init();var y=[];for(var b=0;b<16;b++){for(var w=0;w<16;w++){y[b*16+w]=b.toString(16)+w.toString(16)}}var T={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",grey:"#808080",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",oldlace:"#FDF5E6",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",whitesmoke:"#F5F5F5",yellowgreen:"#9ACD32"};var O={};var _={style:"normal",variant:"normal",weight:"normal",size:10,family:"sans-serif"};var D={};var j={butt:"flat",round:"round"};var q=I.prototype;q.clearRect=function(){if(this.textMeasureEl_){this.textMeasureEl_.removeNode(true);this.textMeasureEl_=null}this.element_.innerHTML=""};q.beginPath=function(){this.currentPath_=[]};q.moveTo=function(e,t){var n=W(this,e,t);this.currentPath_.push({type:"moveTo",x:n.x,y:n.y});this.currentX_=n.x;this.currentY_=n.y};q.lineTo=function(e,t){var n=W(this,e,t);this.currentPath_.push({type:"lineTo",x:n.x,y:n.y});this.currentX_=n.x;this.currentY_=n.y};q.bezierCurveTo=function(e,t,n,r,i,s){var o=W(this,i,s);var u=W(this,e,t);var a=W(this,n,r);R(this,u,a,o)};q.quadraticCurveTo=function(e,t,n,r){var i=W(this,e,t);var s=W(this,n,r);var o={x:this.currentX_+2/3*(i.x-this.currentX_),y:this.currentY_+2/3*(i.y-this.currentY_)};var u={x:o.x+(s.x-this.currentX_)/3,y:o.y+(s.y-this.currentY_)/3};R(this,o,u,s)};q.arc=function(e,t,i,s,a,f){i*=o;var l=f?"at":"wa";var c=e+r(s)*i-u;var h=t+n(s)*i-u;var p=e+r(a)*i-u;var d=t+n(a)*i-u;if(c==p&&!f){c+=.125}var v=W(this,e,t);var m=W(this,c,h);var g=W(this,p,d);this.currentPath_.push({type:l,x:v.x,y:v.y,radius:i,xStart:m.x,yStart:m.y,xEnd:g.x,yEnd:g.y})};q.rect=function(e,t,n,r){this.moveTo(e,t);this.lineTo(e+n,t);this.lineTo(e+n,t+r);this.lineTo(e,t+r);this.closePath()};q.strokeRect=function(e,t,n,r){var i=this.currentPath_;this.beginPath();this.moveTo(e,t);this.lineTo(e+n,t);this.lineTo(e+n,t+r);this.lineTo(e,t+r);this.closePath();this.stroke();this.currentPath_=i};q.fillRect=function(e,t,n,r){var i=this.currentPath_;this.beginPath();this.moveTo(e,t);this.lineTo(e+n,t);this.lineTo(e+n,t+r);this.lineTo(e,t+r);this.closePath();this.fill();this.currentPath_=i};q.createLinearGradient=function(e,t,n,r){var i=new $("gradient");i.x0_=e;i.y0_=t;i.x1_=n;i.y1_=r;return i};q.createRadialGradient=function(e,t,n,r,i,s){var o=new $("gradientradial");o.x0_=e;o.y0_=t;o.r0_=n;o.x1_=r;o.y1_=i;o.r1_=s;return o};q.drawImage=function(n,r){var i,s,u,a,f,l,c,h;var p=n.runtimeStyle.width;var d=n.runtimeStyle.height;n.runtimeStyle.width="auto";n.runtimeStyle.height="auto";var v=n.width;var m=n.height;n.runtimeStyle.width=p;n.runtimeStyle.height=d;if(arguments.length==3){i=arguments[1];s=arguments[2];f=l=0;c=u=v;h=a=m}else if(arguments.length==5){i=arguments[1];s=arguments[2];u=arguments[3];a=arguments[4];f=l=0;c=v;h=m}else if(arguments.length==9){f=arguments[1];l=arguments[2];c=arguments[3];h=arguments[4];i=arguments[5];s=arguments[6];u=arguments[7];a=arguments[8]}else{throw Error("Invalid number of arguments")}var g=W(this,i,s);var y=c/2;var b=h/2;var w=[];var E=10;var S=10;w.push(" <g_vml_:group",' coordsize="',o*E,",",o*S,'"',' coordorigin="0,0"',' style="width:',E,"px;height:",S,"px;position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]||this.m_[1][1]!=1||this.m_[1][0]){var x=[];x.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",t(g.x/o),",","Dy=",t(g.y/o),"");var T=g;var N=W(this,i+u,s);var C=W(this,i,s+a);var k=W(this,i+u,s+a);T.x=e.max(T.x,N.x,C.x,k.x);T.y=e.max(T.y,N.y,C.y,k.y);w.push("padding:0 ",t(T.x/o),"px ",t(T.y/o),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",x.join(""),", sizingmethod='clip');")}else{w.push("top:",t(g.y/o),"px;left:",t(g.x/o),"px;")}w.push(' ">','<g_vml_:image src="',n.src,'"',' style="width:',o*u,"px;"," height:",o*a,'px"',' cropleft="',f/v,'"',' croptop="',l/m,'"',' cropright="',(v-f-c)/v,'"',' cropbottom="',(m-l-h)/m,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",w.join(""))};q.stroke=function(e){var n=[];var r=false;var i=10;var s=10;n.push("<g_vml_:shape",' filled="',!!e,'"',' style="position:absolute;width:',i,"px;height:",s,'px;"',' coordorigin="0,0"',' coordsize="',o*i,",",o*s,'"',' stroked="',!e,'"',' path="');var u=false;var a={x:null,y:null};var f={x:null,y:null};for(var l=0;l<this.currentPath_.length;l++){var c=this.currentPath_[l];var h;switch(c.type){case"moveTo":h=c;n.push(" m ",t(c.x),",",t(c.y));break;case"lineTo":n.push(" l ",t(c.x),",",t(c.y));break;case"close":n.push(" x ");c=null;break;case"bezierCurveTo":n.push(" c ",t(c.cp1x),",",t(c.cp1y),",",t(c.cp2x),",",t(c.cp2y),",",t(c.x),",",t(c.y));break;case"at":case"wa":n.push(" ",c.type," ",t(c.x-this.arcScaleX_*c.radius),",",t(c.y-this.arcScaleY_*c.radius)," ",t(c.x+this.arcScaleX_*c.radius),",",t(c.y+this.arcScaleY_*c.radius)," ",t(c.xStart),",",t(c.yStart)," ",t(c.xEnd),",",t(c.yEnd));break}if(c){if(a.x==null||c.x<a.x){a.x=c.x}if(f.x==null||c.x>f.x){f.x=c.x}if(a.y==null||c.y<a.y){a.y=c.y}if(f.y==null||c.y>f.y){f.y=c.y}}}n.push(' ">');if(!e){U(this,n)}else{z(this,n,a,f)}n.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",n.join(""))};q.fill=function(){this.stroke(true)};q.closePath=function(){this.currentPath_.push({type:"close"})};q.save=function(){var e={};x(this,e);this.aStack_.push(e);this.mStack_.push(this.m_);this.m_=S(E(),this.m_)};q.restore=function(){if(this.aStack_.length){x(this.aStack_.pop(),this);this.m_=this.mStack_.pop()}};q.translate=function(e,t){var n=[[1,0,0],[0,1,0],[e,t,1]];V(this,S(n,this.m_),false)};q.rotate=function(e){var t=r(e);var i=n(e);var s=[[t,i,0],[-i,t,0],[0,0,1]];V(this,S(s,this.m_),false)};q.scale=function(e,t){this.arcScaleX_*=e;this.arcScaleY_*=t;var n=[[e,0,0],[0,t,0],[0,0,1]];V(this,S(n,this.m_),true)};q.transform=function(e,t,n,r,i,s){var o=[[e,t,0],[n,r,0],[i,s,1]];V(this,S(o,this.m_),true)};q.setTransform=function(e,t,n,r,i,s){var o=[[e,t,0],[n,r,0],[i,s,1]];V(this,o,true)};q.drawText_=function(e,n,r,i,s){var u=this.m_,a=1e3,f=0,l=a,c={x:0,y:0},p=[];var d=H(P(this.font),this.element_);var v=B(d);var m=this.element_.currentStyle;var g=this.textAlign.toLowerCase();switch(g){case"left":case"center":case"right":break;case"end":g=m.direction=="ltr"?"right":"left";break;case"start":g=m.direction=="rtl"?"right":"left";break;default:g="left"}switch(this.textBaseline){case"hanging":case"top":c.y=d.size/1.75;break;case"middle":break;default:case null:case"alphabetic":case"ideographic":case"bottom":c.y=-d.size/2.25;break}switch(g){case"right":f=a;l=.05;break;case"center":f=l=a/2;break}var y=W(this,n+c.x,r+c.y);p.push('<g_vml_:line from="',-f,' 0" to="',l,' 0.05" ',' coordsize="100 100" coordorigin="0 0"',' filled="',!s,'" stroked="',!!s,'" style="position:absolute;width:1px;height:1px;">');if(s){U(this,p)}else{z(this,p,{x:-f,y:0},{x:l,y:d.size})}var b=u[0][0].toFixed(3)+","+u[1][0].toFixed(3)+","+u[0][1].toFixed(3)+","+u[1][1].toFixed(3)+",0,0";var w=t(y.x/o)+","+t(y.y/o);p.push('<g_vml_:skew on="t" matrix="',b,'" ',' offset="',w,'" origin="',f,' 0" />','<g_vml_:path textpathok="true" />','<g_vml_:textpath on="true" string="',h(e),'" style="v-text-align:',g,";font:",h(v),'" /></g_vml_:line>');this.element_.insertAdjacentHTML("beforeEnd",p.join(""))};q.fillText=function(e,t,n,r){this.drawText_(e,t,n,r,false)};q.strokeText=function(e,t,n,r){this.drawText_(e,t,n,r,true)};q.measureText=function(e){if(!this.textMeasureEl_){var t='<span style="position:absolute;'+"top:-20000px;left:0;padding:0;margin:0;border:none;"+'white-space:pre;"></span>';this.element_.insertAdjacentHTML("beforeEnd",t);this.textMeasureEl_=this.element_.lastChild}var n=this.element_.ownerDocument;this.textMeasureEl_.innerHTML="";this.textMeasureEl_.style.font=this.font;this.textMeasureEl_.appendChild(n.createTextNode(e));return{width:this.textMeasureEl_.offsetWidth}};q.clip=function(){};q.arcTo=function(){};q.createPattern=function(e,t){return new J(e,t)};$.prototype.addColorStop=function(e,t){t=M(t);this.colors_.push({offset:e,color:t.color,alpha:t.alpha})};var Y=G.prototype=new Error;Y.INDEX_SIZE_ERR=1;Y.DOMSTRING_SIZE_ERR=2;Y.HIERARCHY_REQUEST_ERR=3;Y.WRONG_DOCUMENT_ERR=4;Y.INVALID_CHARACTER_ERR=5;Y.NO_DATA_ALLOWED_ERR=6;Y.NO_MODIFICATION_ALLOWED_ERR=7;Y.NOT_FOUND_ERR=8;Y.NOT_SUPPORTED_ERR=9;Y.INUSE_ATTRIBUTE_ERR=10;Y.INVALID_STATE_ERR=11;Y.SYNTAX_ERR=12;Y.INVALID_MODIFICATION_ERR=13;Y.NAMESPACE_ERR=14;Y.INVALID_ACCESS_ERR=15;Y.VALIDATION_ERR=16;Y.TYPE_MISMATCH_ERR=17;G_vmlCanvasManager=v;CanvasRenderingContext2D=I;CanvasGradient=$;CanvasPattern=J;DOMException=G})()}