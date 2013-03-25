/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 3/21/13
 * Time: 6:59 PM
 * To change this template use File | Settings | File Templates.
 */

var jj = jj || (function() {
    var ajax = {
        xmlHttp : null,
        createXMLHTTP : function() {
            if (this.xmlHttp) {
                if (window.XMLHttpRequest)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                    this.xmlHttp=new XMLHttpRequest();
                } else {// code for IE6, IE5
                    this.xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
                }
            }
        },
        sendAjax :function(e) {
            if (e || typeof e != 'object') {
                console.log("Error : Input object config");
                return;
            }
            this.createXMLHTTP();

            this.xmlHttp.onreadystatechange=function() {
                if (this.xmlHttp.readyState==4 && this.xmlHttp.status==200) {
                    e.success(this.xmlHttp.responseText);
                }
            }

            this.xmlHttp.open(e.type || "GET", e.url + (e.type == "POST" ? "" : (e.data ? "?" + e.data : "" )) ,true);
            this.xmlHttp.setRequestHeader("Content-type", e["Content-Type"] ? e["Content-Type"] : "application/x-www-form-urlencoded");
            this.xmlHttp.send(e.type == "GET" ? null : (e.data ? e.data : null));
        }
    };

    var postBack  = {

    };

    var el = {
        attr : function() {
            console.log(document.getAnonymousElementByAttribute(document.body,'data-popup','true'));
        },
        get : function(el) {
            var obj;
            if (el.indexOf('#') != -1) {
                el = el.replace('#','');
                obj = document.getElementById(el);
            } else if (el.indexOf('.') != -1) {
                el = el.replace('.','');
                obj = document.getElementsByClassName(el);
            } else {
                obj = document.getElementsByTagName(el)[0];
            }
            return obj;
        }
    };

    var event = {
        liveArr :[],
        click : function(e,cb) {
            var obj;
            if (typeof el != "object") {
                obj = el.get(e);
            }
            if (obj.length) {
                for(var i =0;i<obj.length ; i++) {
                    this.addEvent('click',obj[i],cb);
                }
            } else {
                this.addEvent('click',obj);
            }
        },
        addEvent : function(event,target,cb) {
            if (target.addEventListener) {
                target.addEventListener(event, cb, false);
            } else if (target.attachEvent) {
                target.attachEvent("on" + event, cb);
            }
        },
        live : function(event,target,cb) {
        }
    }

    event.addEvent('DOMNodeInserted',document,function() {
        if(event.liveArr.length && event.liveArr.length > 0) {
            for(var i = 0 ; i < event.liveArr.length ; i++) {
                event.addEvent(event.liveArr[i].ev,event.liveArr[i].el)
            }
        }
    })

    var xml = {
        parse : function(text) {
            if (window.DOMParser)
            {
                var parser=new DOMParser();
                var xmlDoc= parser.parseFromString(text,"text/xml");
                //console.log(typeof xmlDoc);
                return xmlDoc;
            }
            else // Internet Explorer
            {
                var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async=false;
                xmlDoc.loadXML(text);
                return xmlDoc;
            }
        },
        show : function() {
            console.log(typeof this);
        }
    }

    var ui = {
        button : function(conf) {
            var e = document.createElement('div');
            e.innerHTML = conf.v;
            e.classList.add('btn');
            if (conf.class) {
                e.classList.add(conf.class);
            }
            var obj = conf.e;
            if (typeof conf.e != "object") {
                obj = el.get(conf.e);
            }
            obj.appendChild(e);
            return e;
        },
        text : function(conf) {

        },
        comboBox : function(conf) {

        }
    }

// func get : get a xml file ( list slide )
// func next : send action next slide , if end slide , nothing happen


    var slide = {
        get : function(){

        }
    }

    var support = {
        add : function(config) {

        },
        remove : function(el) {

        },
        get : function(config){
            ajax.sendAjax({
                url : '',
                success : function(data) {

                }
            });
        }
    }

    return {
        sendAjax : ajax.sendAjax,
        click : event.click,
        parseXML : xml.parse,
        ui : ui
    };
}());

jj.sendAjax({a:"a"});
setInterval(function() {
    //jj.ui.button({v:'Submit',e:'body'});
},1000);

console.log(jj.parseXML("<xml><new>aaa</new></xml>"));

document.addEventListener("DOMNodeInserted", function(event) {
   console.log(event.target);
});

jj.ui.button({v:'Submit',e:'body'});
