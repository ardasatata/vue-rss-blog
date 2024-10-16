var container = document.getElementById("retainable-rss-embed3");
if (container) {
    var css = document.createElement('link');
    css.href = "https://raw.githubusercontent.com/vbalko-claimate/vue-rss-blog/refs/heads/newvue/dist/retainable.css";
    css.rel = "stylesheet"
    document.getElementsByTagName('head')[0].appendChild(css);
    var script = document.createElement('script');
    script.src = "https://www.twilik.com/assets/retainable/rss-embed/retainable.js";
    document.getElementsByTagName('body')[0].appendChild(script);
}
