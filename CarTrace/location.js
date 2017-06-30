/**
 *  Sox server configuration
 */
var boshService = "http://nictsox-lv2.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "nictsox-lv2.ht.sfc.keio.ac.jp";
var jid = "htcarsensor@sox.ht.sfc.keio.ac.jp";
var password = "carsensor";
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



/**
 *  Map Configuration
 */
var map;
var markers =[];
var home;
var homeloction = new google.maps.LatLng(35.377580, 139.446397);
var northRecycleCenter;
var northRecycleLocation = new google.maps.LatLng(35.3951, 139.451450);
var ishinazakaRecycleCenter;
var ishinazakaRecycleLocation = new google.maps.LatLng(35.350003, 139.468605);
var lifetime = 10 * 1000;
var kml = 'http://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1LYe5Gv-WU_uLB0OzDgzx7CqFo2U'
var scale = 5 ;




/**
 *  Map Initialization
 */
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
    
    // Load kml layer, i.e., the boundaries of Fujisawa city
    var fujisawaKML = new google.maps.KmlLayer({
                                               url: kml,
                                               map: map,
                                               preserveViewport: true
                                               });
    
    fujisawaKML.addListener('click', function(kmlEvent) {
                        // Repalce the content of infowindow with the name of the clicked place
                        kmlEvent.featureData.infoWindowHtml=kmlEvent.featureData.name;
                         });
    
    

    
    
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



/**
 *
 */
window.onload = function() {
	
    // Connect to sox servers
	var client = new SoxClient(boshService, xmppServer);
	client.unsubscribeAll();
	
	var soxEventListener = new SoxEventListener();
	soxEventListener.connected = function(soxEvent) {
		console.log("[main.js] Connected "+soxEvent.soxClient);
		status("Connected: "+soxEvent.soxClient);
		

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
        
        msg = (collectedDate.toString()) + "<p>センサー番号:"+soxEvent.device.name+"<br>所属: "+affilitation + "," +carNo
        + "<br>" +"lat:"+lat+",lon:"+lon+"<br>速度:"+speed+"km/h"+",方向:"+course+"&#176";
        +"</p>"
        + msg;
        //status(msg);

        if( lon != 0.0 && lat != 0.0 && timeDiff/i < 600 * 1000)
        {
            // Add a new data point of the reported location
            
            var rotation = (Number(course))%360;
            
            var image;
            var color;
            
            switch(affilitation){
                case "環境事業センター南部":
                case "環境事業センター北部":
                    color='Aqua';
                    break;
                case "興業公社":
                     color='MediumPurple';
                    break;
                case "資源組合":
                    color='Green';
                    break;
                default:
                    color='Red';
                
            
            }

	    image = {
        
        path: "M9.61,2.41,8.89.25H1.33L.61,2.41v4.5h0c0,.71.08.91.36.91H9.26c.28,0,.36-.19.36-.91h0V2.23m-9,5.94h9v2.52h-9Zm0,2.52h9v14h-9ZM.61,15l-.36.72v1.08l.36.57Zm9,0,.36.72v1.08l-.36.57ZM.61,3.49l-.36.72V5.29l.36.57m9-2.37.36.72V5.29l-.36.57ZM1.33,2.41,1.69.79H8.53l.36,1.62m-4,5.76Zm-2.16,0Zm4.32,0ZM3.78,16.61l.29.18s.07,0,.07-.06a.27.27,0,0,0,0-.11l-.64-1.2H2.08a.09.09,0,0,0-.1.1l.06.06.29.18L2,16.27a.7.7,0,0,0-.13.34.56.56,0,0,0,.09.27l1,1.68a1.43,1.43,0,0,1,0-.3.91.91,0,0,1,.16-.5l.74-1.16Zm.38-1L5,14.39q-.45-1-.95-1a.44.44,0,0,0-.41.17l-.75,1.2,1.31.88ZM3.51,19H5V17.4H3.56a5.39,5.39,0,0,0-.34.53,1,1,0,0,0-.11.45Q3.11,19,3.51,19Zm3.16-3.67.68-1.15a.25.25,0,0,0,0-.13q0-.08-.05-.08H7.23L7,14.15l-.29-.57a.77.77,0,0,0-.76-.38H4.13a1.41,1.41,0,0,1,.44.19,2.34,2.34,0,0,1,.56.81l.36.74-.26.13a.07.07,0,0,0,0,.07.07.07,0,0,0,.08.07l1.41.11Zm.68,3.4,1-1.81a1.11,1.11,0,0,1-.48.34,2,2,0,0,1-.59.07H6.17V17.1q0-.13-.06-.13A.08.08,0,0,0,6,17H6l-.7,1.22L6,19.34c.05.08.1.12.14.1s.06,0,.06-.06V19h.61a.5.5,0,0,0,.48-.26ZM6.92,17.1h.66a.79.79,0,0,0,.49-.21.6.6,0,0,0,.27-.46.39.39,0,0,0-.07-.22L7.49,15l-1.36.79.79,1.3ZM3.13,4.93h3.6V7.09H3.13Zm1.08.72A.36.36,0,1,1,3.85,6,.36.36,0,0,1,4.21,5.65Z",
        fillColor: color,
        fillOpacity: 1,
        strokeWeight: 0.1,
        scale: 1,
        rotation: rotation,
        
    }

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
