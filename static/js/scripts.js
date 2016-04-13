var addContainer = function(id) {
    var divID = "image-container-" + id
    var imgID = "image-" + id
    var template = ["<div id='", divID, "' class='image-container'><div class='loader loading-background'></div></div>"].join("")
    $("#images").append(template)
}

var retrieveImage = function(id) {
    var id = id
    $.ajax({
        type:"GET",
        dataType :"jsonp",
        url:"http://dynamic.xkcd.com/api-0/jsonp/comic/" + id,
        timeout:5000,
        success: function (data) {
            var divID = "#image-container-" + id
            var filename = data.img.split("/")[data.img.split("/").length - 1]
            var filenameTemplate = ["<div class='image-filename'>", filename ,"</div>"].join("")
            var imgTemplate = ["<img data-id='", id ,"'' class='image-thumbnail' src='", data.img, "'/>"].join("")
            $(divID).empty()
            $(divID).append(imgTemplate)
            $(divID).append(filenameTemplate)
        },
        error: function () {
            var divID = "#image-container-" + id
            $(divID).remove()
        }
    })
}

var loadImages = function (n) {
    $("#images").empty()
    for (var i=0; i<n; i++) {
        var id = parseInt(Math.random()*1666) //getRandomID()
        addContainer(id)
        retrieveImage(id)
    }
}

var loadImageDetail = function (event) {
    console.log($(event.target).data().id)
}

$('#images').on('click', '.image-container', ()=> loadImageDetail(event))
$('#loadImages').click(()=> loadImages(10))