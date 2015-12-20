$(document).ready(function () {
    $(".dropdown dt a").click(function () {
        $(".dropdown dd ul").toggle('medium');
    });

    $(".dropdown dd ul li a").click(function () {
        var text = $(this).html();
        $(".dropdown dt a span").html(text);
        $(".dropdown dd ul").hide('medium');
        var url = $(location).attr('href');
        var breakURL = url.replace('http://', '').split('/');
        var consURL = 'http://';
        var country = getSelectedValue("sample").toLowerCase();
        var consPage = '';
        switch (country) {
            case 'uk':
                {
                    var consDomainCountry = consURL + breakURL[0] + "/uk";
                    var consDomainCountryO = consURL + breakURL[0] + "/us";
                    window.location = url.replace(consDomainCountryO, consDomainCountry);
                } break;
            case 'fr':
                {
                    var consDomainCountry = consURL + breakURL[0] + "/fr";
                    var consDomainCountryO = consURL + breakURL[0] + "/us";
                    window.location = url.replace(consDomainCountryO, consDomainCountry);
                } break;
            case 'pt':
                {
                    var consDomainCountry = consURL + breakURL[0] + "/pt";
                    var consDomainCountryO = consURL + breakURL[0] + "/us";
                    window.location = url.replace(consDomainCountryO, consDomainCountry);
                } break;
            case 'es':
                {
                    var consDomainCountry = consURL + breakURL[0] + "/es";
                    var consDomainCountryO = consURL + breakURL[0] + "/us";
                    window.location = url.replace(consDomainCountryO, consDomainCountry);
                } break;
            case 'it':
                {
                    var consDomainCountry = consURL + breakURL[0] + "/it";
                    var consDomainCountryO = consURL + breakURL[0] + "/us";
                    window.location = url.replace(consDomainCountryO, consDomainCountry);
                } break;
            case 'de':
                {
                    var consDomainCountry = consURL + breakURL[0] + "/de";
                    var consDomainCountryO = consURL + breakURL[0] + "/us";
                    window.location = url.replace(consDomainCountryO, consDomainCountry);
                } break;
            case 'apac':
                {
                    var consDomainCountry = consURL + breakURL[0] + "/apac";
                    var consDomainCountryO = consURL + breakURL[0] + "/us";
                    window.location = url.replace(consDomainCountryO, consDomainCountry);
                } break;
            case 'jp':
                {
                    var getPage = breakURL[2];
                    var getQuery = breakURL[3];
					
					
                    if (getPage != undefined)
                    {
                        switch (getPage.toLowerCase())
                        {
                            case 'threatencyclopedia#vulnerability':
                            case 'threatencyclopedia#spam':
                            case 'threatencyclopedia#url':
                            case 'threatencyclopedia#malware':
                            case 'threatencyclopedia':
                                {
                                    consPage = 'threatencyclopedia.aspx';
                                    consPage = consPage + '?language=' + country + '&tab=' + location.hash.replace('#', '');
                                }
                                break;
                            case 'malware':
                                {
                                    consPage = 'malware.aspx';
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                }
                                break;
                            case 'spam':
                                {
                                    consPage = 'spam.aspx';
                                    getQuery = $('input[name*="lblOrigName"]').val();
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                }
                                break;
                            case 'url':
                                {
                                    consPage = 'url.aspx';
                                    var expression = new RegExp('\\D', 'g');
                                    var conQueryVal = getQuery != null ? escape(getQuery.replace(expression, '')) : '';

                                    consPage = consPage + '?language=' + country + '&id=' + conQueryVal;
                                }
                                break;
                            case 'vulnerability':
                                {
                                    consPage = 'vulnerability.aspx';
                                    getQuery = $('input[name*="lblOrigName"]').val();
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                }
                                break;
			    
			     case 'webattack':
                                {
                                    consPage = 'relatedthreats.aspx';
                                    getQuery = $('input[name*="lblOrigName"]').val();
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    consPage = consPage + '?language=' + country + '&name=' + conQueryVal;

                                    if (breakURL[4] != undefined) {
                                        getQuery = breakURL[3];
                                        if (getQuery == "malware" || getQuery == "spam" || getQuery == "vulnerability" || getQuery == "webattack")
                                            consPage += '&tab=' + getQuery;
                                    }
                                }
                                break;

			    case 'definition':
                                {
                                    consPage = 'definition.aspx';
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                }
                                break;
			    case 'related':
                                {
                                    consPage = 'related.aspx';
                                    var expression = new RegExp('\\D', 'g');
                                    var conQueryVal = getQuery != null ? escape(getQuery.replace(expression, '')) : '';
                                    var conQueryValId = breakURL[4] != undefined ? escape(breakURL[4].replace(expression, '')) : '0';
                                    var conQueryValidParent = breakURL[5] != undefined ? escape(breakURL[5]) : '';
                                    consPage = consPage + '?language=' + country + '&rel=' + conQueryVal + '&id=' + conQueryValId
                                        + '&parentName=' + conQueryValidParent;
                                }
                                break;
                            case 'archive':
                                {
                                    switch (getQuery.toLowerCase()) {
                                        case 'malware':
                                            {
                                                consPage = 'archivemalware.aspx';
                                                var conQueryVal = breakURL[4] != null ? escape(breakURL[4]) : '';
                                                consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                            } break;
                                        case 'grayware':
                                            {
                                                consPage = 'archivegrayware.aspx';
                                                var conQueryVal = breakURL[4] != null ? escape(breakURL[4]) : '';
                                                consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                            } break;
                                        case 'vulnerability':
                                            {
                                                consPage = 'archivevulnerability.aspx';
                                                var getVar = getParameterByName("name");
                                                var conQueryVal = getVar != '' ? escape(getVar) : '';
                                                consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                            } break;
                                        default:
                                            {
                                                if (getQuery.toLowerCase().indexOf('vulnerability.aspx') != -1)
                                                    consPage = getQuery.toLowerCase() + '&language=' + country;
                                                else
                                                    consPage = 'threatencyclopedia.aspx?language=' + country;
                                            } break;
                                    }
                                }
                                break;
                            case 'help':
                                {
                                    consPage = 'help.aspx';
                                    consPage = consPage + '?language=' + country;
                                }
                                break;
                            default:
                                {
                                    consPage = 'Search.aspx';
                                    getQuery = $('input[name*="tbxSearchString"]').val();
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    consPage = consPage + '?language=' + country + '&p=' + conQueryVal;
                                }
                                break;
                        }
                    }
                } break;
            case 'cn':
            case 'tw':
                {
                    var getPage = breakURL[2];
                    var getQuery = breakURL[3];
                    if (getPage != undefined) {
                        switch (getPage.toLowerCase()) {
                            case 'threatencyclopedia#vulnerability':
                            case 'threatencyclopedia#spam':
                            case 'threatencyclopedia#url':
                            case 'threatencyclopedia#malware':
                            case 'threatencyclopedia':
                                {
                                    consPage = 'threatencyclopedia.aspx';
                                    consPage = consPage + '?language=' + country + '&tab=' + location.hash.replace('#', '');
                                }
                                break;
                            case 'malware':
                                {
                                    consPage = 'malware.aspx';
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                }
                                break;
                            case 'vulnerability':
                                {
                                    consPage = 'vulnerability.aspx';
                                    getQuery = $('input[name*="lblOrigName"]').val();
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                }
                                break;
                            case 'webattack':
                                {
                                    consPage = 'relatedthreats.aspx';
                                    getQuery = $('input[name*="lblOrigName"]').val();
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    consPage = consPage + '?language=' + country + '&name=' + conQueryVal;

                                    if (breakURL[4] != undefined) {
                                        getQuery = breakURL[3];
                                        if (getQuery == "malware" || getQuery == "spam" || getQuery == "vulnerability" || getQuery == "webattack")
                                            consPage += '&tab=' + getQuery;
                                    }
                                }
                                break;
                            case 'url':
                                {
                                    consPage = 'url.aspx';
                                    var expression = new RegExp('\\D', 'g');
                                    var conQueryVal = getQuery != null ? escape(getQuery.replace(expression, '')) : '';

                                    consPage = consPage + '?language=' + country + '&id=' + conQueryVal;
                                }
                                break;
                            case 'spam':
                                {
                                    consPage = 'spam.aspx';
                                    getQuery = $('input[name*="lblOrigName"]').val();
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                }
                                break;
                            case 'related':
                                {
                                    consPage = 'related.aspx';
                                    var expression = new RegExp('\\D', 'g');
                                    var conQueryVal = getQuery != null ? escape(getQuery.replace(expression, '')) : '';
                                    var conQueryValId = breakURL[4] != undefined ? escape(breakURL[4].replace(expression, '')) : '0';
                                    var conQueryValidParent = breakURL[5] != undefined ? escape(breakURL[5]) : '';
                                    consPage = consPage + '?language=' + country + '&rel=' + conQueryVal + '&id=' + conQueryValId
                                        + '&parentName=' + conQueryValidParent;
                                }
                                break;
                            case 'archive':
                                {
                                    switch (getQuery.toLowerCase()) {
                                        case 'malware':
                                            {
                                                consPage = 'archivemalware.aspx';
                                                var conQueryVal = breakURL[4] != null ? escape(breakURL[4]) : '';
                                                consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                            } break;
                                        case 'grayware':
                                            {
                                                consPage = 'archivegrayware.aspx';
                                                var conQueryVal = breakURL[4] != null ? escape(breakURL[4]) : '';
                                                consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                            } break;
                                        case 'vulnerability':
                                            {
                                                consPage = 'archivevulnerability.aspx';
                                                var getVar = getParameterByName("name");
                                                var conQueryVal = getVar != '' ? escape(getVar) : '';
                                                consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                            } break;
                                        default:
                                            {
                                                if (getQuery.toLowerCase().indexOf('vulnerability.aspx') != -1)
                                                    consPage = getQuery.toLowerCase() + '&language=' + country;
                                                else
                                                    consPage = 'threatencyclopedia.aspx?language=' + country;
                                            } break;
                                    }
                                }
                                break;
                            case 'help':
                                {
                                    consPage = 'help.aspx';
                                    consPage = consPage + '?language=' + country;
                                }
                                break;
                            case 'glossary':
                                {
                                    consPage = 'glossary.aspx';
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    if (conQueryVal != 'all')
                                        consPage = consPage + '?language=' + country + '&index=' + conQueryVal;
                                    else
                                        consPage = consPage + '?language=' + country;
                                }
                                break;
                            case 'definition':
                                {
                                    consPage = 'definition.aspx';
                                    var conQueryVal = getQuery != null ? escape(getQuery) : '';
                                    consPage = consPage + '?language=' + country + '&name=' + conQueryVal;
                                }
                                break;
                            case 'description':
                                {
                                    if (getQuery != '') {
                                        switch (getQuery.toLowerCase()) {
                                            default: consPage = '' + getQuery + '.aspx?language=' + country; break;
                                        }
                                    }
                                } break;
                            default:
                                {
                                    consPage = 'threatencyclopedia.aspx?language=' + country;
                                }
                                break;
                        }
                    }
                } break;

        }

        if (consPage != '')
            window.location = consURL + breakURL[0] + '/' + consPage;

    });

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function getSelectedValue(id) {
        return $("#" + id).find("dt a span.value").html();
    }

    $(document).bind('click', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("dropdown"))
            $(".dropdown dd ul").hide('medium');
    });
});