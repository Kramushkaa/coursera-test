$(function (){
    $("#navbarToggle").blur(function(event){
        var screenWidth = window.innerWidth;
        if (screenWidth < 768){
            $("#collapsable-nav").collapse('hide');
        }
    });
});

var switchMenuToActive = function (){
    // Убираем с home button активность
    var classes = document.querySelector("#navHomeButton").className;
    classes=classes.replace(new RegExp("active", "g"), "");
    document.querySelector("#navHomeButton").className = classes;

    classes = document.querySelector("#navMenuButton").className;
    if (classes.indexOf("active") == -1){
        classes+=" active"
        document.querySelector("#navMenuButton").className = classes;
    }
};

(function (global){

var ct = {};
var homeHtml = "snippets/home-snippet.html"
var menuUrl = "snippets/menu-snippet.html"
var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
}

var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif;></div>";
    insertHtml(selector,html);
}


document.addEventListener("DOMContentLoaded", function(event) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
        homeHtml,
        function (responseText){
            document.querySelector("#main-content").innerHTML = responseText;
        },
        false);
});

// Load the menu categories view
ct.loadMenu = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
        menuUrl,
        function (responseText){
            document.querySelector("#main-content").innerHTML = responseText;
        },
    false);
    switchMenuToActive();
};

global.$ct= ct;
})(window);