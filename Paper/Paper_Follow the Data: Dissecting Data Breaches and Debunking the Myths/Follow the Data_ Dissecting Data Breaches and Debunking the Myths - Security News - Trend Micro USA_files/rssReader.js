// JavaScript Document

var gfeedfetcher_loading_image = "/jscript/indicator.gif"

google.load("feeds", "1")


function gfeedfetcher(divid, divClass, linktarget) {
    this.linktarget = linktarget || ""
    this.feedlabels = []
    this.feedurls = []
    this.feeds = []
    this.feedsfetched = 0
    this.feedlimit = 6
    this.showoptions = ""
    this.sortstring = "pubDate"
    document.write('<aside id="' + divid + '" role="complementary"></aside>')
    this.feedcontainer = document.getElementById(divid)
    this.itemcontainer = ""
}

gfeedfetcher.prototype.addFeed = function (label, url) {
    this.feedlabels[this.feedlabels.length] = label
    this.feedurls[this.feedurls.length] = url
}

gfeedfetcher.prototype.filterfeed = function (feedlimit, sortstr) {
    this.feedlimit = feedlimit
    if (typeof sortstr != "undefined")
        this.sortstring = sortstr
}

gfeedfetcher.prototype.displayoptions = function (parts) {
    this.showoptions = parts
}

gfeedfetcher.prototype.setentrycontainer = function (containerstr) {
    this.itemcontainer = "<" + containerstr.toLowerCase() + ">"
}

gfeedfetcher.prototype.init = function () {
    this.feedsfetched = 0
    this.feeds = []
    this.feedcontainer.innerHTML = '<p><center><br><br>Retrieving Data...</center></p>'
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


gfeedfetcher._formatdate = function (datestr, showoptions) {
    var itemdate = new Date(datestr)
    var parseddate = (showoptions.indexOf("datetime") != -1) ? itemdate.toLocaleString() : (showoptions.indexOf("date") != -1) ? itemdate.toLocaleDateString() : (showoptions.indexOf("time") != -1) ? itemdate.toLocaleTimeString() : ""
    return "<span class='datefield'>" + parseddate + "</span>"
}

gfeedfetcher.prototype.stripTags = function (value) {
    return value.replace(/<\/?[^>]+>/gi, '');
}

gfeedfetcher._sortarray = function (arr, sortstr) {
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

gfeedfetcher.prototype._fetch_data_as_array = function (result, ddlabel) {
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

gfeedfetcher.prototype._signaldownloadcomplete = function () {
    this.feedsfetched += 1
    if (this.feedsfetched == this.feedurls.length)
        this._displayresult(this.feeds)
}

gfeedfetcher.prototype._formatDate = function (d) {
    var d = new Date(d);
    var ds = d.toDateString().split(" ");
    return ds[1] + " " + ds[2] + ", " + ds[3];
}


gfeedfetcher.prototype._displayresult = function (feeds) {
    var rssoutput = (this.itemcontainer == "") ? "<ul>\n" : ""
    var onlyone = false;
    gfeedfetcher._sortarray(feeds, this.sortstring)
    for (var i = 0; i < 3; i++) {
        var d = new Date();
        var pubDate = new Date(feeds[i].publishedDate);
        var itemhtml = "";
        var itemdesc = feeds[i].content;
        if (!onlyone) {
            var desc = "";
		if(itemdesc){
			desc = this.stripTags(itemdesc);
		}
            if (this.feedcontainer.id == 'rssfeeds') {
                itemhtml = "<li class=\"" + (desc.length > 200 ? desc.substr(0, 6) + "" : desc).toLowerCase() + "\"><div class=\"textholder\"><a href=\"" + feeds[i].link + "\">" + feeds[i].title + "</a></div></li>";
            }
            if (this.feedcontainer.id == 'rssfeedsspam') {
                itemhtml = "<li><div class=\"textholder\"><a href=\"" + feeds[i].link + "\">" + feeds[i].title + "</a><span style=\"font-size:10px;\">" + this._formatDate(feeds[i].publishedDate) + "</span></div></li>";
            }
            if (this.feedcontainer.id == 'rssfeedsurl') {
                itemhtml = "<li><div class=\"textholder\"><a href=\"" + feeds[i].link + "\">" + feeds[i].title + "</a><span style=\"font-size:10px;\">" + this._formatDate(feeds[i].publishedDate) + "</span></div></li>";
            }
            if (this.feedcontainer.id == 'rssfeedsvul') {
                itemhtml = "<li><div class=\"textholder\"><a href=\"" + feeds[i].link + "\">" + feeds[i].title + "</a><span style=\"font-size:10px;\">SEVERITY: " + (desc.length > 200 ? desc.substr(0, 20) + "" : desc).toLowerCase() +"<br>"+this._formatDate(feeds[i].publishedDate) + "</span></div></li>";
            }

        }
        
        rssoutput += this.itemcontainer + itemhtml;
        $(".titleFeedRow").removeClass("selectedFeedRow");
        $(".titleFeedRow").removeClass("minusicon");
        $(".titleFeedRow").addClass("crossicon");
        $(".contentFeedRow").removeClass("selectedFeedRowContent");
        $(".contentFeedRow").css("height","");

        $(".titleFeedRow[data-name='malware']").addClass("selectedFeedRow");
        $(".titleFeedRow[data-name='malware']").addClass("minusicon");
        $(".titleFeedRow[data-name='malware']").removeClass("crossicon");
        $('.malware').addClass("selectedFeedRowContent");
        $('.malware').removeClass("closeheight");
    }
    rssoutput += (this.itemcontainer == "") ? "</ul>" : ""
    this.feedcontainer.innerHTML = rssoutput
}

