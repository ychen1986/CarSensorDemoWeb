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
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
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
    
    home.setMap(map);
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
    
    
    
    northRecycleCenter.setMap(map);
    
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
    
    
    
    ishinazakaRecycleCenter.setMap(map);
    
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
        var pm25 = 0;
        //status("Sensor data received　from "+soxEvent.device.name+"\n");
        //if (Array.isArray(soxEvent.transducers){
        soxEvent.transducers.forEach(function(item){
                                            if(item.sensorData.getId() == "PM2.5"){
                                                msg+=("<p>"+item.sensorData.toString()+"</p>");
                                                pm25= item.sensorData.getRawValue();
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
        msg = (receivedDate.toLocaleString()) + "<p>Sensor data received　from "+soxEvent.device.name +" Delay:  "+ timeDiff/i + " milliseconds</p>" + msg;
        //status(msg);

        if( lon != 0.0 && lat != 0.0 && timeDiff/i < 600 * 1000)
        {
            // Add a new data point of the reported location
            var color;
            
            if(pm25 <= 10){
                color = "DeepSkyBlue";
            }else if (pm25 <= 20){
                color = "Aqua";
            }else if (pm25 <= 35){
                color = "LawnGreen";
            }else if (pm25 < 50){
                color = "Yellow";
            }else if (pm25 <= 85){
                color = "GoldenRod";
            }else{
                color = "DarkOrange";

            }
            
            
            var dataPoint = new google.maps.Marker({position: new google.maps.LatLng(lat, lon),
                                                   icon:{
                                                   path: google.maps.SymbolPath.CIRCLE,
                                                   scale:10,
                                                   fillColor:color,
                                                   fillOpacity:1,
                                                   strokeWeight:1
                                                   },
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
