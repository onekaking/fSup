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
        get : function(el) { console.log(typeof el);
            if (typeof el == 'object') {
                return el;
            }
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
            if (typeof target == 'object') {
                var obj = el.get(target);
                if (obj.length) { // obj la list
                    for(var i = 0 ; i < obj.length ;i++) {
                        this.addEvent(event,obj[i],cb);
                    }
                } else {
                    this.addEvent(event,obj[i],cb);
                }
            } else {
                if (!this.liveArr[event]) {
                    this.liveArr[event] = [];
                }
                this.liveArr[event].push({sel:target,cb:cb});
            }
        },
        dispatch : function(el) {

        }
    }

    event.addEvent("DOMNodeInserted", document , function(e) {
        if (event.liveArr) {
            var arr = event.liveArr;
            var el = e.target;
            for(var i = 0 ; i < arr.length ; i++) {
                if (el.tagName == arr[i].sel) {
                    event.addEvent(arr[i].ev, el, arr[i].cb);
                } else if (el.classList.contains(arr[i].sel.replace('.',''))) {
                    event.addEvent(arr[i].ev, el, arr[i].cb);
                } else if (el.getAttribute('id') == arr[i].sel.replace('#','')) {
                    event.addEvent(arr[i].ev, el, arr[i].cb);
                }
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
            var e = document.createElement('button');
            e.innerHTML = conf.v;
            e.classList.add('button');
            if (conf.class) {
                e.classList.add(conf.class);
            }

            for(var i in conf.attr) {
                e.setAttribute(i,conf.attr[i]);
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

    var slide = {
        get : function(xmlDoc){

        },
        next : function(i) {
            if (i) {

            }
        }
    }

    var support = {
        add : function(obj) {

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
        event : event,
        parseXML : xml.parse,
        ui : ui
    };
}());

jj.sendAjax({a:"a"});

console.log(jj.parseXML("<xml><new>aaa</new></xml>"));

jj.event.addEvent("DOMNodeInserted", document , function (e) {
    jj.event.dispatch.apply(e.target,arguments);
})

jj.event.live('click','button',function(e) {
    console.log(e.target.clientHeight);
});

