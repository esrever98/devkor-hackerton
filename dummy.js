// d3.js 로 marker 표시
var data = [{ "OBJECTID": "21", "GU_NM": "구로구", "HNR_NAM": "구로3동", "MTC_AT": "1", "MASTERNO": "777", "SLAVENO": "1", "NEADRES_NM": "구로구 디지털로 27다길 65 2층", "FCLTY_NM": "꿈마을 도서관", "ORN_ORG": "구로구 시설관리공단", "EBT_MAN": " ", "FLY_GBN": "구립도서관", "OPNNG_DE": "2007-04-05", "AR": "476", "HMPG_CN": "lib.guro.go.kr/dreamtown/", "CTTPC_CN": "830-5807", "CREAT_DE": " ", "LNG": "126.8901147", "LAT": "37.4872202" }, /*생략*/];


var color = d3.scale.category10(); var radius = d3.scale.linear().domain([0, 3000]).range([10, 50]);
var layer = d3.select('.nmap_drawing_pane').append("div").attr("class", "library");

var padding = 50, pluspadding = 1;
var marker = layer.selectAll("svg")
    .data(d3.entries(data))
    .each(transform).enter()
    .append("svg:svg")
    .each(transform)
    .attr("class", "marker");

marker.append("svg:circle")
    .attr("r", function (d) { return radius(d.value.AR) >= 50 ? 50 : radius(d.value.AR); })
    .attr("cx", function (d) { return padding; })
    .attr("cy", function (d) { return padding; })
    .style("fill", function (d, i) { return color(d.value.GU_NM); })
    .attr("fill-opacity", "0.7")
    .on("click", function (d) { alert(d.value.FCLTY_NM); map.setCenter(new nhn.api.map.LatLng(d.value.LAT, d.value.LNG)); });

marker.append("svg:text")
    .attr("x", function (d) { return padding; })
    .attr("y", function (d) { return padding; })
    .attr("dy", ".31em")
    .style("text-anchor", "middle")
    .text(function (d) { return d.value.LNG > 0 ? d.value.HNR_NAM : ""; });


function transform(d) {
    var r = radius(d.value.AR) >= 50 ? 50 : radius(d.value.AR);
    LatLng = new nhn.api.map.LatLng(d.value.LAT, d.value.LNG);
    var oSize = new nhn.api.map.Size(28, 37);
    var oOffset = new nhn.api.map.Size(28, 37);
    var oIcon = new nhn.api.map.Icon('http://static.naver.com/maps2/icons/pin_spot2.png', oSize, oOffset);
    var oMarker = new nhn.api.map.Marker(oIcon, { title: d.value.FCLTY_NM });
    oMarker.setPoint(LatLng);
    map.addOverlay(oMarker); oMarker.setVisible(true);

    return d3.select(this)
        .style("left", (parseInt(d3.select(oMarker)[0][0]["_elEl"].style.left) - padding) + "px")
        .style("top", (parseInt(d3.select(oMarker)[0][0]["_elEl"].style.top) - padding) + "px")
        .style("width", (r + padding + pluspadding) + "px")
        .style("height", (r + padding + pluspadding) + "px");
}