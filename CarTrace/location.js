var boshService = "http://nictsox-lv2.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "nictsox-lv2.ht.sfc.keio.ac.jp";

var jid = "htcarsensor@sox.ht.sfc.keio.ac.jp";
var password = "carsensor";


var map;
var markers =[];
var home;
var homeloction = new google.maps.LatLng(35.377580, 139.446397);
var northRecycleCenter;
var northRecycleLocation = new google.maps.LatLng(35.3951, 139.451450);
var ishinazakaRecycleCenter;
var ishinazakaRecycleLocation = new google.maps.LatLng(35.350003, 139.468605);
var lifetime = 10 * 1000;
//var lifetime = 10 *1000;
//var internal = 10 * 1000;
//var opacityScale = internal * 1.0 / lifetime ;
var scale = 5 ;
function initialize() {
    // Initialize map
    var mapOptions = {
    center: homeloction,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: false
    //draggable: false
    };

    var mapDiv = document.getElementById('map-canvas');
    map = new google.maps.Map(mapDiv, mapOptions);
    
    // Initialize home and recycle centers
    var homeIGM = {
    url:'images/home.png',
    scaledSize: new google.maps.Size(38.6,52.6)
    };
    home = new google.maps.Marker({
                                  position: homeloction,
                                  title:"Enviroment Center",
                                  icon:homeIGM
                                  });
    
    //home.setMap(map);
    home.infowindow = new google.maps.InfoWindow({
                                                 content:'<div id="content">'+
                                                 
                                                 '<h1 id="firstHeading" class="firstHeading"> Environment Business Center of Fujisawa City</h1>'+
                                                 '<div id="bodyContent">'+
                                                 '<p><b> Environment Business Center of Fujisawa City</b> is the major base of the waste collecting trucks of Fujisawa City.</p>'+
                                                 '<p><a href="http://www.city.fujisawa.kanagawa.jp/kankyo-j/index.html">'+
                                                 'http://www.city.fujisawa.kanagawa.jp/kankyo-j/index.html</a> '+
                                                 '(In Japanese, last visited August 13, 2015).</p>'+
                                                
                                                 '<IMG BORDER="0" ALIGN="Left" SRC="images/Enviroment Center.png" WIDTH="260">'+
                                                 '</div>'+
                                                 '</div>',
                                                 maxWidth: 300
                                                 });
    google.maps.event.addListener(home, 'click', function() {
                                  
                                  home.infowindow.open(map,home);
                                  });
    
    
    
    
    /*var imgNRC = {
    url:'images/recycle.png',
    size: new google.maps.Size(34,34),
    //origin: new google.maps.Point(0,0),
    //anchor: new google.maps.Point(0,0)
    };
     */
    var imgNRC = {
        url:'images/recycle.png',
        size: new google.maps.Size(28,28)
    };
   
    // North Recycle Center
    northRecycleCenter = new google.maps.Marker({
                                  position: northRecycleLocation,
                                  title:"North Recycle Center",
                                  icon: imgNRC
                                  });
    
    
    
    //northRecycleCenter.setMap(map);
    
    northRecycleCenter.infowindow = new google.maps.InfoWindow({
                                                               content: '<div id="content">'+
                                                               '<div id="siteNotice">'+
                                                               '</div>'+
                                                               '<h1 id="firstHeading" class="firstHeading">North Recycle Center</h1>'+
                                                               '<div id="bodyContent">'+
                                                               '<p><b>North Recycle Center</b> is one  recycle center of Fujisawa City.</p>'+
                                                               '<p><a href="http://www.city.fujisawa.kanagawa.jp/hokubu-k/index.html">'+
                                                               'http://www.city.fujisawa.kanagawa.jp/hokubu-k/index.html</a> '+
                                                               '(In Japanese, last visited August 13, 2015).</p>'+
                                                               '</div>'+
                                                               '</div>',
                                                               maxWidth: 300

                                                 });
    google.maps.event.addListener(northRecycleCenter, 'click', function() {
                                  
                                  northRecycleCenter.infowindow.open(map,northRecycleCenter);
                                  });
    
    // Ishinazaka Recycle Center
    ishinazakaRecycleCenter = new google.maps.Marker({
                                                position: ishinazakaRecycleLocation,
                                                title:"North Recycle Center",
                                                icon: imgNRC
                                                });
    
    
    
    //ishinazakaRecycleCenter.setMap(map);
    
    ishinazakaRecycleCenter.infowindow = new google.maps.InfoWindow({
                                                               content: '<div id="content">'+
                                                               '<div id="siteNotice">'+
                                                               '</div>'+
                                                               '<h1 id="firstHeading" class="firstHeading">Ishinazaka Recycle Center</h1>'+
                                                               '<div id="bodyContent">'+
                                                               '<p><b>Ishinazaka Recycle Center</b> is one  recycle center of Fujisawa City.</p>'+
                                                               '<p><a href="http://www.city.fujisawa.kanagawa.jp/ishinaza/index.html">'+
                                                               'http://www.city.fujisawa.kanagawa.jp/ishinaza/index.html</a> '+
                                                               '(In Japanese, last visited August 18, 2015).</p>'+
                                                               '</div>'+
                                                                    '</div>',
                                                                    maxWidth: 300

                                                               });
    google.maps.event.addListener(ishinazakaRecycleCenter, 'click', function() {
                                  
                                  ishinazakaRecycleCenter.infowindow.open(map,ishinazakaRecycleCenter);
                                  });
    
    // Set the defual life time
    lifetime = $("#lifetime :selected").val() * 1000;
}




window.onload = function() {
	//$("#content").html("<span>hoge</span>");
	
	var client = new SoxClient(boshService, xmppServer);
	client.unsubscribeAll();
	
	var soxEventListener = new SoxEventListener();
	soxEventListener.connected = function(soxEvent) {
		console.log("[main.js] Connected "+soxEvent.soxClient);
		status("Connected: "+soxEvent.soxClient);
		
		var deviceNames = ["carsensor001",
"carsensor002",
"carsensor003",
"carsensor004",
"carsensor005",
"carsensor006",
"carsensor007",
"carsensor008",
"carsensor009",
"carsensor010",
"carsensor011",
"carsensor012",
"carsensor013",
"carsensor014",
"carsensor015",
"carsensor016",
"carsensor017",
"carsensor018",
"carsensor019",
"carsensor020",
"carsensor021",
"carsensor022",
"carsensor023",
"carsensor024",
"carsensor025",
"carsensor026",
"carsensor027",
"carsensor028",
"carsensor029",
"carsensor030",
"carsensor031",
"carsensor032",
"carsensor033",
"carsensor034",
"carsensor035",
"carsensor036",
"carsensor037",
"carsensor038",
"carsensor039",
"carsensor040",
"carsensor041",
"carsensor042",
"carsensor043",
"carsensor044",
"carsensor045",
"carsensor046",
"carsensor047",
"carsensor048",
"carsensor049",
"carsensor050",
"carsensor051",
"carsensor052",
"carsensor053",
"carsensor054",
"carsensor055",
"carsensor056",
"carsensor057",
"carsensor058",
"carsensor059",
"carsensor060",
"carsensor061",
"carsensor062",
"carsensor063",
"carsensor064",
"carsensor065",
"carsensor066",
"carsensor067",
"carsensor068",
"carsensor069",
"carsensor070",
"carsensor071",
"carsensor072",
"carsensor073",
"carsensor074",
"carsensor075",
"carsensor076",
"carsensor077",
"carsensor078",
"carsensor079",
"carsensor080",
"carsensor081",
"carsensor082",
"carsensor083",
"carsensor084",
"carsensor085"];
//		var deviceNames = ["しらすの入荷情報湘南"];
		deviceNames.forEach(function(name){
			var device = new Device(name);//デバイス名に_dataや_metaはつけない
			/* クライアントに繋がったら、デバイスにサブスクライブする */
			if(!client.subscribeDevice(device)){
				/* サーバに繋がってない場合などで、要求を送信できなかった場合はfalseが返ってくる */
				status("Couldn't send subscription request: "+device);
			}			
		});
	};
	soxEventListener.connectionFailed = function(soxEvent) {
		status("Connection Failed: "+soxEvent.soxClient);
	};
	soxEventListener.subscribed = function(soxEvent){
		status("Subscribed: "+soxEvent.device);
	};
	soxEventListener.subscriptionFailed = function(soxEvent){
		status("Subscription Failed: "+soxEvent.device);
	};
	soxEventListener.metaDataReceived = function(soxEvent){
		/**
		 * SoXサーバからデバイスのメタ情報を受信すると呼ばれる。
		 * 受信したメタ情報に基づいて、Device内にTransducerインスタンスが生成されている。
		 */
		status("Meta data received: "+soxEvent.device.toMetaString());
	};
	soxEventListener.sensorDataReceived = function(soxEvent){
		/**
		 * SoXサーバからセンサデータを受信すると呼ばれる。
		 * 受信したデータはTransducerインスタンスにセットされ、そのTransducerがイベントオブジェクトとして渡される。
		 */
        var receivedDate, collectedDate;
        receivedDate = new Date;
        var msg = "";
        var lat,lon, timeDiff=0, i=0;
        var course;
        var speed;
        var pm25 = 0;
        
        var carInfo = carDict[soxEvent.device.name.substring(9,12)] ;
        if(carInfo == null){
            return;
        }
        var info = carInfo.split(",");
        var affilitation = info[0];
        var carNo = info[1];


                //status("Sensor data received　from "+soxEvent.device.name+"\n");
        //if (Array.isArray(soxEvent.transducers){
        soxEvent.transducers.forEach(function(item){
                                     
                                     if(item.sensorData.getId() == "Cource"){
                                        course = item.sensorData.getRawValue();
                                     }
                                     if(item.sensorData.getId() == "Speed"){
                                        speed = item.sensorData.getRawValue();
                                     }
                                     
                                     
                                            collectedDate = item.sensorData.getTimestamp();
                                            timeDiff += receivedDate.getTime() - collectedDate.getTime();
                                            i++;
                                            if(item.sensorData.getId() == "Longitude"){
                                                lon =item.sensorData.getRawValue();
                                            }else if(item.sensorData.getId() == "Latitude"){
                                                lat = item.sensorData.getRawValue();
                                            }
                                     });
        
        msg = (receivedDate.toLocaleString()) + "<p>センサー番号:"+soxEvent.device.name+"<br>所属: "+affilitation + "," +carNo
        + "<br>" +"lat:"+lat+",lon:"+lon+"<br>speed:"+speed+"km/h"+",方向:"+course+"&#176";
        +"</p>"
        + msg;
        //status(msg);

        //if( lon != 0.0 && lat != 0.0 && timeDiff/i < 600 * 1000)
        {
            // Add a new data point of the reported location
            
            var rotation = (Number(course))%360;
            
            var image;
            
            
            switch(affilitation){
                case "環境事業センター南部":
                case "環境事業センター北部":
                image = {
                url:'data:image/svg+xml;utf-8, \<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10.22 24.98" width="24.98" height="24.98" transform="rotate(' + rotation +
                    ' 12.49 12.49)"><defs><style>.a,.d{fill:aqua;}.a,.b,.c,.d,.f,.h,.i{stroke:#000;stroke-miterlimit:10;}.a,.b,.c,.f{stroke-width:0.5px;}.b{fill:gray;}.d{stroke-width:0.25px;}.e{fill:url(#a);}.f,.g{fill:#fff;}.h{fill:#ccc;stroke-width:0.1px;}.i{stroke-width:0.01px;}</style><linearGradient id="a" x1="1.33" y1="1.6" x2="8.89" y2="1.6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1"/></linearGradient></defs><title>市役所</title><path class="a" d="M9.61,2.41,8.89.25H1.33L.61,2.41v4.5h0c0,.71.08.91.36.91H9.26c.28,0,.36-.19.36-.91h0V2.23"/><rect class="b" x="0.61" y="8.17" width="9" height="2.52"/><rect class="a" x="0.61" y="10.69" width="9" height="14.04"/><polygon class="c" points="0.61 15.01 0.25 15.73 0.25 16.81 0.61 17.38 0.61 15.01"/><polygon class="c" points="9.61 15.01 9.97 15.73 9.97 16.81 9.61 17.38 9.61 15.01"/><polyline class="c" points="0.61 3.49 0.25 4.21 0.25 5.29 0.61 5.86"/><polygon class="c" points="9.61 3.49 9.97 4.21 9.97 5.29 9.61 5.86 9.61 3.49"/><rect class="d" x="1.33" y="2.41" width="7.56" height="5.04" rx="0.05" ry="0.05"/><polyline class="e" points="1.33 2.41 1.69 0.79 8.53 0.79 8.89 2.41"/><path class="f" d="M4.93,8.17v0Z"/><path class="f" d="M2.77,8.17v0Z"/><path class="f" d="M7.09,8.17v0Z"/><path class="g" d="M3.78,16.61l.29.18s.07,0,.07-.06a.27.27,0,0,0,0-.11l-.64-1.2-1.42,0a.09.09,0,0,0-.1.1s0,0,.06.06l.29.18L2,16.27a.7.7,0,0,0-.13.34.56.56,0,0,0,.09.27l1,1.68a1.43,1.43,0,0,1,0-.3.91.91,0,0,1,.16-.5l.74-1.16Z"/><path class="g" d="M4.16,15.63,5,14.39q-.45-1-.95-1a.44.44,0,0,0-.41.17l-.75,1.2,1.31.88Z"/><path class="g" d="M3.51,19H5v-1.6H3.56a5.39,5.39,0,0,0-.34.53,1,1,0,0,0-.11.45q0,.62.4.62Z"/><path class="g" d="M6.67,15.33l.68-1.15a.25.25,0,0,0,0-.13q0-.08-.05-.08l-.07,0L7,14.15l-.29-.57a.77.77,0,0,0-.76-.38H4.13a1.41,1.41,0,0,1,.44.19,2.34,2.34,0,0,1,.56.81l.36.74-.26.13a.07.07,0,0,0,0,.07s0,.07.08.07l1.41.11Z"/><path class="g" d="M7.35,18.73l1-1.81a1.11,1.11,0,0,1-.48.34,2,2,0,0,1-.59.07H6.17V17.1q0-.13-.06-.13A.08.08,0,0,0,6,17l-.7,1.22.73,1.12c.05.08.1.12.14.1s.06,0,.06-.06V19h.61a.5.5,0,0,0,.48-.26Z"/><path class="g" d="M6.92,17.1h.66a.79.79,0,0,0,.49-.21.6.6,0,0,0,.27-.46.39.39,0,0,0-.07-.22L7.49,15l-1.36.79.79,1.3Z"/><rect class="h" x="3.13" y="4.93" width="3.6" height="2.16"/><circle class="i" cx="4.21" cy="6.01" r="0.36"/></svg>',
                    anchor: new google.maps.Point(12.49,12.49)}
                    break;
                case "興業公社":
                    image = {
                    url:'data:image/svg+xml;utf-8, \<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10.22 24.98" width="24.98" height="24.98" transform="rotate(' + rotation +
                        ' 12.49 12.49)"><defs><style>.a,.d{fill:#7f47dd;}.a,.b,.c,.d,.f,.h,.i{stroke:#000;stroke-miterlimit:10;}.a,.b,.c,.f{stroke-width:0.5px;}.b{fill:gray;}.d{stroke-width:0.25px;}.e{fill:url(#a);}.f,.g{fill:#fff;}.h{fill:#ccc;stroke-width:0.1px;}.i{stroke-width:0.01px;}</style><linearGradient id="a" x1="1.33" y1="1.6" x2="8.89" y2="1.6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1"/></linearGradient></defs><title>公社</title><path class="a" d="M9.61,2.41,8.89.25H1.33L.61,2.41v4.5h0c0,.71.08.91.36.91H9.26c.28,0,.36-.19.36-.91h0V2.23"/><rect class="b" x="0.61" y="8.17" width="9" height="2.52"/><rect class="a" x="0.61" y="10.69" width="9" height="14.04"/><polygon class="c" points="0.61 15.01 0.25 15.73 0.25 16.81 0.61 17.38 0.61 15.01"/><polygon class="c" points="9.61 15.01 9.97 15.73 9.97 16.81 9.61 17.38 9.61 15.01"/><polyline class="c" points="0.61 3.49 0.25 4.21 0.25 5.29 0.61 5.86"/><polygon class="c" points="9.61 3.49 9.97 4.21 9.97 5.29 9.61 5.86 9.61 3.49"/><rect class="d" x="1.33" y="2.41" width="7.56" height="5.04" rx="0.05" ry="0.05"/><polyline class="e" points="1.33 2.41 1.69 0.79 8.53 0.79 8.89 2.41"/><path class="f" d="M4.93,8.17v0Z"/><path class="f" d="M2.77,8.17v0Z"/><path class="f" d="M7.09,8.17v0Z"/><path class="g" d="M3.78,16.61l.29.18s.07,0,.07-.06a.27.27,0,0,0,0-.11l-.64-1.2-1.42,0a.09.09,0,0,0-.1.1s0,0,.06.06l.29.18L2,16.27a.7.7,0,0,0-.13.34.56.56,0,0,0,.09.27l1,1.68a1.43,1.43,0,0,1,0-.3.91.91,0,0,1,.16-.5l.74-1.16Z"/><path class="g" d="M4.16,15.63,5,14.39q-.45-1-.95-1a.44.44,0,0,0-.41.17l-.75,1.2,1.31.88Z"/><path class="g" d="M3.51,19H5v-1.6H3.56a5.39,5.39,0,0,0-.34.53,1,1,0,0,0-.11.45q0,.62.4.62Z"/><path class="g" d="M6.67,15.33l.68-1.15a.25.25,0,0,0,0-.13q0-.08-.05-.08l-.07,0L7,14.15l-.29-.57a.77.77,0,0,0-.76-.38H4.13a1.41,1.41,0,0,1,.44.19,2.34,2.34,0,0,1,.56.81l.36.74-.26.13a.07.07,0,0,0,0,.07s0,.07.08.07l1.41.11Z"/><path class="g" d="M7.35,18.73l1-1.81a1.11,1.11,0,0,1-.48.34,2,2,0,0,1-.59.07H6.17V17.1q0-.13-.06-.13A.08.08,0,0,0,6,17l-.7,1.22.73,1.12c.05.08.1.12.14.1s.06,0,.06-.06V19h.61a.5.5,0,0,0,.48-.26Z"/><path class="g" d="M6.92,17.1h.66a.79.79,0,0,0,.49-.21.6.6,0,0,0,.27-.46.39.39,0,0,0-.07-.22L7.49,15l-1.36.79.79,1.3Z"/><rect class="h" x="3.13" y="4.93" width="3.6" height="2.16"/><circle class="i" cx="4.21" cy="6.01" r="0.36"/></svg>',
                        anchor: new google.maps.Point(12.49,12.49)}
                    break;
                case "資源組合":
                    image = {
                    url:'data:image/svg+xml;utf-8, \<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10.22 24.98" width="24.98" height="24.98" transform="rotate(' + rotation +
                        ' 12.49 12.49)"><defs><style>.a,.d{fill:#009245;}.a,.b,.c,.d,.f,.h,.i{stroke:#000;stroke-miterlimit:10;}.a,.b,.c,.f{stroke-width:0.5px;}.b{fill:gray;}.d{stroke-width:0.25px;}.e{fill:url(#a);}.f,.g{fill:#fff;}.h{fill:#ccc;stroke-width:0.1px;}.i{stroke-width:0.01px;}</style><linearGradient id="a" x1="1.33" y1="1.6" x2="8.89" y2="1.6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1"/></linearGradient></defs><title>資源組合</title><path class="a" d="M9.61,2.41,8.89.25H1.33L.61,2.41v4.5h0c0,.71.08.91.36.91H9.26c.28,0,.36-.19.36-.91h0V2.23"/><rect class="b" x="0.61" y="8.17" width="9" height="2.52"/><rect class="a" x="0.61" y="10.69" width="9" height="14.04"/><polygon class="c" points="0.61 15.01 0.25 15.73 0.25 16.81 0.61 17.38 0.61 15.01"/><polygon class="c" points="9.61 15.01 9.97 15.73 9.97 16.81 9.61 17.38 9.61 15.01"/><polyline class="c" points="0.61 3.49 0.25 4.21 0.25 5.29 0.61 5.86"/><polygon class="c" points="9.61 3.49 9.97 4.21 9.97 5.29 9.61 5.86 9.61 3.49"/><rect class="d" x="1.33" y="2.41" width="7.56" height="5.04" rx="0.05" ry="0.05"/><polyline class="e" points="1.33 2.41 1.69 0.79 8.53 0.79 8.89 2.41"/><path class="f" d="M4.93,8.17v0Z"/><path class="f" d="M2.77,8.17v0Z"/><path class="f" d="M7.09,8.17v0Z"/><path class="g" d="M3.78,16.61l.29.18s.07,0,.07-.06a.27.27,0,0,0,0-.11l-.64-1.2-1.42,0a.09.09,0,0,0-.1.1s0,0,.06.06l.29.18L2,16.27a.7.7,0,0,0-.13.34.56.56,0,0,0,.09.27l1,1.68a1.43,1.43,0,0,1,0-.3.91.91,0,0,1,.16-.5l.74-1.16Z"/><path class="g" d="M4.16,15.63,5,14.39q-.45-1-.95-1a.44.44,0,0,0-.41.17l-.75,1.2,1.31.88Z"/><path class="g" d="M3.51,19H5v-1.6H3.56a5.39,5.39,0,0,0-.34.53,1,1,0,0,0-.11.45q0,.62.4.62Z"/><path class="g" d="M6.67,15.33l.68-1.15a.25.25,0,0,0,0-.13q0-.08-.05-.08l-.07,0L7,14.15l-.29-.57a.77.77,0,0,0-.76-.38H4.13a1.41,1.41,0,0,1,.44.19,2.34,2.34,0,0,1,.56.81l.36.74-.26.13a.07.07,0,0,0,0,.07s0,.07.08.07l1.41.11Z"/><path class="g" d="M7.35,18.73l1-1.81a1.11,1.11,0,0,1-.48.34,2,2,0,0,1-.59.07H6.17V17.1q0-.13-.06-.13A.08.08,0,0,0,6,17l-.7,1.22.73,1.12c.05.08.1.12.14.1s.06,0,.06-.06V19h.61a.5.5,0,0,0,.48-.26Z"/><path class="g" d="M6.92,17.1h.66a.79.79,0,0,0,.49-.21.6.6,0,0,0,.27-.46.39.39,0,0,0-.07-.22L7.49,15l-1.36.79.79,1.3Z"/><rect class="h" x="3.13" y="4.93" width="3.6" height="2.16"/><circle class="i" cx="4.21" cy="6.01" r="0.36"/></svg>',
                        anchor: new google.maps.Point(12.49,12.49)}
                    break;
                default:
                    image = {
                    url:'data:image/svg+xml;utf-8, \<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10.22 24.98" width="24.98" height="24.98" transform="rotate(' + rotation +
                        ' 12.49 12.49)"><defs><style>.a{fill:gray;}.a,.b,.c,.d,.f,.h,.i{stroke:#000;stroke-miterlimit:10;}.a,.b,.c,.f{stroke-width:0.5px;}.c,.d{fill:blue;}.d{stroke-width:0.25px;}.e{fill:url(#a);}.f,.g{fill:#fff;}.h{fill:#ccc;stroke-width:0.1px;}.i{stroke-width:0.01px;}</style><linearGradient id="a" x1="1.33" y1="1.6" x2="8.89" y2="1.6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1"/></linearGradient></defs><title>其の他</title><rect class="a" x="0.61" y="8.17" width="9" height="2.52"/><polygon class="b" points="0.61 15.01 0.25 15.73 0.25 16.81 0.61 17.38 0.61 15.01"/><polygon class="b" points="9.61 15.01 9.97 15.73 9.97 16.81 9.61 17.38 9.61 15.01"/><polyline class="b" points="0.61 3.49 0.25 4.21 0.25 5.29 0.61 5.86"/><polygon class="b" points="9.61 3.49 9.97 4.21 9.97 5.29 9.61 5.86 9.61 3.49"/><path class="c" d="M9.61,2.41,8.89.25H1.33L.61,2.41v4.5h0c0,.71.08.91.36.91H9.26c.28,0,.36-.19.36-.91h0V2.23"/><rect class="c" x="0.61" y="10.69" width="9" height="14.04"/><rect class="d" x="1.33" y="2.41" width="7.56" height="5.04" rx="0.05" ry="0.05"/><polyline class="e" points="1.33 2.41 1.69 0.79 8.53 0.79 8.89 2.41"/><path class="f" d="M4.93,8.17v0Z"/><path class="f" d="M2.77,8.17v0Z"/><path class="f" d="M7.09,8.17v0Z"/><path class="g" d="M3.78,16.61l.29.18s.07,0,.07-.06a.27.27,0,0,0,0-.11l-.64-1.2-1.42,0a.09.09,0,0,0-.1.1s0,0,.06.06l.29.18L2,16.27a.7.7,0,0,0-.13.34.56.56,0,0,0,.09.27l1,1.68a1.43,1.43,0,0,1,0-.3.91.91,0,0,1,.16-.5l.74-1.16Z"/><path class="g" d="M4.16,15.63,5,14.39q-.45-1-.95-1a.44.44,0,0,0-.41.17l-.75,1.2,1.31.88Z"/><path class="g" d="M3.51,19H5v-1.6H3.56a5.39,5.39,0,0,0-.34.53,1,1,0,0,0-.11.45q0,.62.4.62Z"/><path class="g" d="M6.67,15.33l.68-1.15a.25.25,0,0,0,0-.13q0-.08-.05-.08l-.07,0L7,14.15l-.29-.57a.77.77,0,0,0-.76-.38H4.13a1.41,1.41,0,0,1,.44.19,2.34,2.34,0,0,1,.56.81l.36.74-.26.13a.07.07,0,0,0,0,.07s0,.07.08.07l1.41.11Z"/><path class="g" d="M7.35,18.73l1-1.81a1.11,1.11,0,0,1-.48.34,2,2,0,0,1-.59.07H6.17V17.1q0-.13-.06-.13A.08.08,0,0,0,6,17l-.7,1.22.73,1.12c.05.08.1.12.14.1s.06,0,.06-.06V19h.61a.5.5,0,0,0,.48-.26Z"/><path class="g" d="M6.92,17.1h.66a.79.79,0,0,0,.49-.21.6.6,0,0,0,.27-.46.39.39,0,0,0-.07-.22L7.49,15l-1.36.79.79,1.3Z"/><rect class="h" x="3.13" y="4.93" width="3.6" height="2.16"/><circle class="i" cx="4.21" cy="6.01" r="0.36"/></svg>',
                        anchor: new google.maps.Point(12.49,12.49)}
                
            
            }
            

            
//            if (rotation < 180){
//                image = {
//                //path: "M23,51a5,5,0,1,0-5-5A5,5,0,0,0,23,51ZM11.23,63H23V19H0V52Q5.63,57.47,11.23,63ZM5,5.17Q7.68,2.6,10.34,0H23V19H5ZM23,15.81a5,5,0,1,0-5-5A5,5,0,0,0,23,15.81Z",
//                //url:'data:image/svg+xml;utf-8, \ <svg xmlns="http://www.w3.org/2000/svg" width="31.5" height="31.5" viewBox="0 0 14 31.5" fill="'+ color  + '" stroke="black" stroke-width="1" transform="rotate(' + rotation + ' 15.75 15.75)"><path d="M11.5,25.5A2.5,2.5,0,1,0,9,23,2.5,2.5,0,0,0,11.5,25.5Zm-5.89,6H11.5V9.5H0V26ZM2.5,2.59,5.17,0H11.5V9.5h-9Zm9,5.32A2.5,2.5,0,1,0,9,5.4,2.5,2.5,0,0,0,11.5,7.9Z"/></svg>',
//                url:'data:image/svg+xml;utf-8, \<svg xmlns="http://www.w3.org/2000/svg" width="68.5" height="68.5" viewBox="0 0 27.5 68.5" fill="'+ color  + '" transform="rotate(' + rotation + ' 34.25 34.25)"> <defs><style>.a{fill:none;}.a,.b,.c,.d{stroke:#000;stroke-miterlimit:10;}.a,.b,.c{stroke-width:0.5px;}.b,.d{fill:#fff;}.d{stroke-width:0.25px;}.e{fill:#ccc;}.f{fill:#006837;}</style></defs><path class="a" d="M26.25,6.25l-2-6h-21l-2,6V18.73c0,2,.21,2.52,1,2.52h23c.79,0,1-.54,1-2.52l0,0v-13"/><rect class="b" x="1.25" y="22.25" width="25" height="7"/><rect class="a" x="1.25" y="29.25" width="25" height="39"/><polygon class="c" points="1.25 41.25 0.25 43.25 0.25 46.25 1.25 47.82 1.25 41.25"/><polygon class="c" points="26.25 41.25 27.25 43.25 27.25 46.25 26.25 47.82 26.25 41.25"/><polyline class="c" points="1.25 9.25 0.25 11.25 0.25 14.25 1.25 15.82"/><polygon class="c" points="26.25 9.25 27.25 11.25 27.25 14.25 26.25 15.82 26.25 9.25"/><rect class="d" x="3.25" y="6.25" width="21" height="14" rx="0.13" ry="0.13"/><polyline class="e" points="3.25 6.25 4.25 1.75 23.25 1.75 24.25 6.25"/><path class="b" d="M13.25,22.25v0Z"/><path class="b" d="M7.25,22.25v0Z"/><path class="b" d="M19.25,22.25v0Z"/><path class="f" d="M10.07,45.69l.81.49c.14,0,.2-.06.2-.17a.76.76,0,0,0-.1-.3L9.2,42.37l-3.94.1a.25.25,0,0,0-.26.28s.06.1.17.17l.82.49-.87,1.35a1.94,1.94,0,0,0-.36,1,1.55,1.55,0,0,0,.24.76l2.68,4.68a4,4,0,0,1-.1-.84A2.54,2.54,0,0,1,8,48.9l2-3.21Z"/><path class="f" d="M11.1,43l2.21-3.43q-1.24-2.83-2.63-2.83a1.22,1.22,0,0,0-1.13.47L7.46,40.52,11.1,43Z"/><path class="f" d="M9.3,52.25h4.27V47.81H9.45a15,15,0,0,0-.95,1.47,2.72,2.72,0,0,0-.31,1.25q0,1.72,1.11,1.72Z"/><path class="f" d="M18.09,42.15l1.9-3.2a.69.69,0,0,0,.1-.35q0-.22-.14-.22l-.19.07-.87.4-.79-1.57A2.13,2.13,0,0,0,16,36.22H11a3.93,3.93,0,0,1,1.23.54A6.5,6.5,0,0,1,13.8,39l1,2.07-.73.35a.19.19,0,0,0-.11.19c0,.12.08.19.23.2l3.91.31Z"/><path class="f" d="M20,51.58l2.77-5a3.09,3.09,0,0,1-1.33.94,5.46,5.46,0,0,1-1.65.19H16.69v-.64q0-.37-.18-.37a.21.21,0,0,0-.19.1l-1.95,3.38,2,3.1c.15.23.28.32.4.28s.17-.09.17-.18V52.29h1.71A1.38,1.38,0,0,0,20,51.58Z"/><path class="f" d="M18.78,47.05h1.84A2.2,2.2,0,0,0,22,46.47a1.67,1.67,0,0,0,.76-1.27,1.08,1.08,0,0,0-.2-.61l-2.19-3.34-3.76,2.19,2.19,3.62Z"/></svg>',
//                //url: 'data:image/svg+xml;utf-8, \
//                 //   <svg width="31.5" height="31.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 31.5" fill="'+ color  +'" stroke="black" stroke-width="1" transform="rotate(' + rotation +
//                 //   ' 15.75 15.75)"><path d="M11.5,25.5A2.5,2.5,0,1,0,9,23,2.5,2.5,0,0,0,11.5,25.5Zm-5.89,6H11.5V9.5H0V26ZM2.5,2.59,5.17,0H11.5V9.5h-9Zm9,5.32A2.5,2.5,0,1,0,9,5.4,2.5,2.5,0,0,0,11.5,7.9Z"</svg>',
//                anchor: new google.maps.Point(34.25,34.25)
//                };
//            }else{
//                image = {
//                //path: "M10,46a5,5,0,1,0-5,5A5,5,0,0,0,10,46Zm18,6V19H5V63H16.77Q22.37,57.47,28,52ZM23,19H5V0H17.66Q20.32,2.59,23,5.17ZM10,10.81a5,5,0,1,0-5,5A5,5,0,0,0,10,10.81Z",
//                url:'data:image/svg+xml;utf-8, \ <svg xmlns="http://www.w3.org/2000/svg" width="31.5" height="31.5" viewBox="0 0 14 31.5" fill="'+ color  + '" stroke="black" stroke-width="1" transform="rotate(' + rotation +
//                    ' 15.75 15.75)"><path d="M5,23a2.5,2.5,0,1,0-2.5,2.5A2.5,2.5,0,0,0,5,23Zm9,3V9.5H2.5v22H8.39ZM11.5,9.5h-9V0H8.83L11.5,2.59ZM5,5.4A2.5,2.5,0,1,0,2.5,7.9,2.5,2.5,0,0,0,5,5.4Z"/></svg>',
//                anchor: new google.maps.Point(15.75, 15.75)
//                };
//            }
            

            var dataPoint = new google.maps.Marker({position: new google.maps.LatLng(lat, lon),
                                                   icon: image,
                                                   clickable: true,
                                                   title: soxEvent.device.name});
            
            dataPoint.setMap(map);
            if(lifetime > 0){
                
                
                // fade the marker  out  untill it disappears
                var opacityScale = 1 / scale;
                for (var opacity = 1.0 - opacityScale; opacity > 1e-6; opacity = opacity - opacityScale){
                    window.setTimeout(function(param1, param2){
                                      if(dataPoint != null){
                                      //var opacity = param1.getOpacity();
                                      //console.log("[main.js]:" +"opacity change event is invoked!\n"+
                                      //            "Opacity is "+param2);
                                      param1.setOpacity(param2);
                                      }
                                      
                                      }, lifetime * (1.0 - opacity), dataPoint, opacity);

                }
                
                /*var timer = window.setInterval(function(){
                                   var opacity=dataPoint.getOpacity();
                                   if(opacity > opacityScale){
                                        dataPoint.setOpacity(opacity-opacityScale);
                                   }
                                   else{
                                
                                        clearInterval(timer);
                                   }
                                   
                                   },internal,dataPoint,opacityScale,timer);
                
                                   };
                                   
                */
                //markers.push(dataPoint);

                window.setTimeout(function(param1){
                                  //var expired = markers.shift();
                                  if(param1 != null){
                                  google.maps.event.clearInstanceListeners(param1);
                                  param1.setMap(null);
                                  }
                                  
                }, lifetime,dataPoint);
            }
            // Add an InfoWindow object containing the data of the marker
            dataPoint.infowindow = new google.maps.InfoWindow({
                                                        content: msg
                                                        });
            google.maps.event.addListener(dataPoint, 'click', function() {
                                          
                                          dataPoint.infowindow.open(map,dataPoint);
                                          });
            
            
            
        }
        
        

	};
	
	client.setSoxEventListener(soxEventListener);
	client.connect();
    initialize();
};
/*
function opacityDecrease(dataPoint,rOpacity){
    window.setTimeout(function(){
                      if(dataPoint != null){
                      var opacity = dataPoint.getOpacity();
                      console.log("[main.js]:" +"opacity change event is invoked!\n"+
                                  "Opacity is "+opacity);
                      dataPoint.setOpacity(opacity - opacityScale);
                      }
                      
                      }, lifetime * (1.0 - rOpacity), dataPoint);

}*/

$(document).ready(function() {
                  $("#update").click(function(){
                                   lifetime = $("#lifetime :selected").val() * 1000;
                                     alert("Setting life time of data point to" + $("#lifetime :selected").text() + "!");
                  
                  });
});



var staCount = 0;
function status(message){
    staCount++;
    if(staCount == 100){
        $("#status").html("");
        staCount = 0;
    }
    var html = message+"<hr>\n"+$("#status").html();
    $("#status").html(html);
    //$('#message').prepend(message);
    
}
