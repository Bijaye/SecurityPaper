// JavaScript Document

var gfeedfetcherEntries_loading_image = "/vinfo/imgFiles/indicator.gif"


google.load("feeds", "1")

function show(str, wid) {
    var str, wid;

   // document.getElementById("demo").innerHTML = "<div class=\"demo roundedcorner\"  id=\"block\" style=\"opacity:0;width:\" align=\"center\"> <div align=right style=\"height:25px; margin-bottom:10px; width:100%; float right;\"><a href=# onclick=javascript:closewindow();><img src=\"images/close.png\" border=\"0\"></div><iframe width=" + wid + "% height=95% scrolling=auto frameborder=0 src=\"" + str + "\"></iframe></div>";
    fade("block");

}

function closewindow() {

    fade("block");

    mytime = setTimeout('closeall()', 1000);

}

function closeall() {

    el = document.getElementById("block");
    el.style.visibility = (el.style.visibility == "hidden") ? "visible" : "hidden";

    frameDoc = el.contentDocument || el.contentWindow.document;
    frameDoc.documentElement.innerHTML = "";


}

var TimeToFade = 1000.0;

function fade(eid) {
    var element = document.getElementById(eid);
    if (element == null)
        return;

    if (element.FadeState == null) {
        if (element.style.opacity == null
            || element.style.opacity == ''
            || element.style.opacity == '1') {
            element.FadeState = 2;
        }
        else {
            element.FadeState = -2;
        }
    }

    if (element.FadeState == 1 || element.FadeState == -1) {
        element.FadeState = element.FadeState == 1 ? -1 : 1;
        element.FadeTimeLeft = TimeToFade - element.FadeTimeLeft;


    }
    else {
        element.FadeState = element.FadeState == 2 ? -1 : 1;
        element.FadeTimeLeft = TimeToFade;
        setTimeout("animateFade(" + new Date().getTime() + ",'" + eid + "')", 33);
    }
}




function animateFade(lastTick, eid) {
    var curTick = new Date().getTime();
    var elapsedTicks = curTick - lastTick;

    var element = document.getElementById(eid);

    if (element.FadeTimeLeft <= elapsedTicks) {
        element.style.opacity = element.FadeState == 1 ? '1' : '0';
        element.style.filter = 'alpha(opacity = '
            + (element.FadeState == 1 ? '100' : '0') + ')';
        element.FadeState = element.FadeState == 1 ? 2 : -2;
        return;
    }

    element.FadeTimeLeft -= elapsedTicks;
    var newOpVal = element.FadeTimeLeft / TimeToFade;
    if (element.FadeState == 1)
        newOpVal = 1 - newOpVal;

    element.style.opacity = newOpVal;
    element.style.filter = 'alpha(opacity = ' + (newOpVal * 100) + ')';

    setTimeout("animateFade(" + curTick + ",'" + eid + "')", 33);

}




function gfeedfetcherEntriesVul(divid, divClass, linktarget) {
    this.linktarget = linktarget || ""
    this.feedlabels = []
    this.feedurls = []
    this.feeds = []
    this.feedsfetched = 0
    this.showoptions = ""
    this.sortstring = "date"

    //document.write('<aside id="' + divid + '" role="complementary"></aside>')
    $('.newsContent').append('<aside id="' + divid + '" role="complementary" style=\"display:block;\"></aside>')
    this.feedcontainer = document.getElementById(divid)
    this.itemcontainer = ""
}

gfeedfetcherEntriesVul.prototype.addFeedEntriesVul = function (label, url) {
    this.feedlabels[this.feedlabels.length] = label
    this.feedurls[this.feedurls.length] = url
}

gfeedfetcherEntriesVul.prototype.filterfeedEntriesVul = function (feedlimit, sortstr) {
    this.feedlimit = feedlimit
    if (typeof sortstr != "undefined")
        this.sortstring = sortstr
}

gfeedfetcherEntriesVul.prototype.displayoptions = function (parts) {
    this.showoptions = parts
}

gfeedfetcherEntriesVul.prototype.setentrycontainer = function (containerstr) {
    this.itemcontainer = "<" + containerstr.toLowerCase() + ">"
}

gfeedfetcherEntriesVul.prototype.init = function () {
    this.feedsfetched = 0
    this.feeds = []
    this.feedcontainer.innerHTML = '<p><img src="' + gfeedfetcherEntries_loading_image + '" style="width:16px !important;height:16px !important;"/> Retrieving Data...</p'
    var displayer = this
    for (var i = 0; i < this.feedurls.length; i++) {
        var feedpointer = new google.feeds.Feed(this.feedurls[i])
        var items_to_show = (this.feedlimit <= this.feedurls.length) ? 1 : Math.floor(this.feedlimit / this.feedurls.length)
        if (this.feedlimit % this.feedurls.length > 0 && this.feedlimit > this.feedurls.length && i == this.feedurls.length - 1)
            items_to_show += (this.feedlimit % this.feedurls.length)
        feedpointer.setNumEntries(items_to_show)
        feedpointer.load(function (label) {
            return function (r) {
                displayer._fetch_data_as_array(r, label)
            }
        }(this.feedlabels[i]))
    }
}


gfeedfetcherEntriesVul._formatdate = function (datestr, showoptions) {
    var itemdate = new Date(datestr)
    var parseddate = (showoptions.indexOf("datetime") != -1) ? itemdate.toLocaleString() : (showoptions.indexOf("date") != -1) ? itemdate.toLocaleDateString() : (showoptions.indexOf("time") != -1) ? itemdate.toLocaleTimeString() : ""
    return "<span class='datefield'>" + parseddate + "</span>"
}

gfeedfetcherEntriesVul.prototype.stripTags = function (value) {
    return value.replace(/<\/?[^>]+>/gi, '');
}

gfeedfetcherEntriesVul._sortarray = function (arr, sortstr) {
    var sortstr = (sortstr == "label") ? "ddlabel" : sortstr
    if (sortstr == "title" || sortstr == "ddlabel") {
        arr.sort(function (a, b) {
            var fielda = a[sortstr].toLowerCase()
            var fieldb = b[sortstr].toLowerCase()
            return (fielda < fieldb) ? -1 : (fielda > fieldb) ? 1 : 0
        })
    }
    else {
        try {
            arr.sort(function (a, b) { return new Date(b.publishedDate) - new Date(a.publishedDate) })
        }
        catch (err) { }
    }
}

gfeedfetcherEntriesVul.prototype._fetch_data_as_array = function (result, ddlabel) {
    var thisfeed = (!result.error) ? result.feed.entries : ""
    if (thisfeed == "") {
        alert("Some blog posts could not be loaded: " + result.error.message)
    }
    for (var i = 0; i < thisfeed.length; i++) {
        result.feed.entries[i].ddlabel = ddlabel
    }
    this.feeds = this.feeds.concat(thisfeed)
    this._signaldownloadcomplete()
}

gfeedfetcherEntriesVul.prototype._signaldownloadcomplete = function () {
    this.feedsfetched += 1
    if (this.feedsfetched == this.feedurls.length)
        this._displayresult(this.feeds)
}

gfeedfetcherEntriesVul.prototype._formatDate = function (d) {
    var d = new Date(d);
    var ds = d.toDateString().split(" ");
    return ds[1] + " " + ds[2] + ", " + ds[3];
}


gfeedfetcherEntriesVul.prototype._displayresult = function (feeds) {

    var rssoutput = (this.itemcontainer == "") ? "<ul>\n" : ""
    var onlyone = false;
    gfeedfetcherEntriesVul._sortarray(feeds, this.sortstring)
    for (var i = 0; i < feeds.length; i++) {
        var d = new Date();
        var pubDate = new Date(feeds[i].publishedDate);
        var itemhtml = "";
        var itemdesc = feeds[i].content;
        if (!onlyone) {
            var desc = this.stripTags(itemdesc);
            itemhtml = "<li><div class=\"entityItem\" style=\"margin-top: 0px; text-transform:uppercase;\"><a href=\"" + feeds[i].link + "\" target='_new'>" + feeds[i].title + "</a></div><div class=\"entityInfo\">" + this._formatDate(feeds[i].publishedDate) + "</div></li>";
            //<br><span style='color:#999; font-size:11px;'>" + (desc.length > 200 ? desc.substr(0, 200) + "..." : desc) + "<br><br></span>
            onlyone = true;
          
            $('.linkTitleBanner').append(feeds[i].title);
            $('.BannerDescText').append((desc.length > 200 ? desc.substr(0, 200) + "..." : desc));
            $('.linkTitleBanner').attr("href", feeds[i].link);
            $('.readmorebox').attr("href", feeds[i].link);
            $('.readmorebox').attr("target", "_blank");
         

            var description = [
                "http://about-threats.trendmicro.com/resources/images/apt/plead-targeted-attacks.jpg","http://about-threats.trendmicro.com/resources/images/apt/microsoft-word-zero-day.jpg",
                            "http://about-threats.trendmicro.com/resources/images/apt/New-IE-Zero-Day-Targets-IE9-and-IE10.jpg", "http://about-threats.trendmicro.com/resources/images/apt/EvilGrab-Malware.jpg",
                            "http://about-threats.trendmicro.com/resources/images/apt/common-it-admin-misconceptions-raise-security-concerns.jpg"
            ];
            var size = description.length
            var x = Math.floor(size * Math.random())
            $('#imgBanner').css("background-image","url("+description[x]+")");

        }
        else {
            // if (i == 1)
            itemhtml = "<li><div class=\"entityItem\" style=\"margin-top: 0px;  text-transform:uppercase;\"><a href='" + feeds[i].link + "' target='_new'>" + feeds[i].title + "</a></div><div class=\"entityInfo\" >" + this._formatDate(feeds[i].publishedDate) + "</div></li>";
            // else if (i == 2)
            // itemhtml = "<li><a h ref='" + feeds[i].link + "' rel='bookmark' title='Permanent Link: " + feeds[i].title + "'>" + feeds[i].title + "</a> <span style='color:#C60; font-size:11px;'> " + this._formatDate(feeds[i].publishedDate) + "</span><br></li>";
        }
        rssoutput += this.itemcontainer + itemhtml;
      
    }
    rssoutput += (this.itemcontainer == "") ? "</ul>" : ""
    this.feedcontainer.innerHTML = rssoutput
}

