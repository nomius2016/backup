Array.prototype.clone = function() {
    return this.concat()
};
var GbPlatform = new function() {
    this.lgn = "0";
    this.ckname = "";
    this.conid = "";
    this.JSON_DATA_ROW_SPLIT = "";
    this.JSON_DATA_COLUMN_SPLIT = "";
    this.columnName = "";
    this.rawData = "";
    this.data = [];
    this.getScript = function(c, e) {
        var b;
        b = document.createElement("script");
        b.setAttribute("language", "javascript");
        b.setAttribute("type", "text/javascript");
        b.setAttribute("src", c);
        var a = false;
        vObj = b.onload;
        b.onload = b.onreadystatechange = function() {
            if (!a && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                a = true;
                if (typeof e === "function") {
                    e(this.ownerDocument.attributes)
                }
            }
        };
        var d = document.getElementsByTagName("head")[0];
        d.appendChild(b)
    };
    this.compressToJSON = function(f, k) {
        var d = GbPlatform.compressToJSON.arguments;
        var e = (d.length > 2) ? d[2] : false;
        if (e == true) {
            f += ",RowIndexId"
        }
        var g = f.split(",");
        var h = k.split(GbPlatform.JSON_DATA_ROW_SPLIT);
        var a = "";
        for (var c = 0; c < h.length; c++) {
            if (e == true) {
                h[c] += GbPlatform.JSON_DATA_COLUMN_SPLIT + c.toString()
            }
            var l = h[c].split(GbPlatform.JSON_DATA_COLUMN_SPLIT);
            a += "{";
            for (var b = 0; b < g.length; b++) {
                a += '"' + g[b] + '":"' + l[b] + '"' + ((b == g.length - 1) ? "" : ",")
            }
            a += "}" + ((c == h.length - 1) ? "" : ",")
        }
        return (k == "") ? [] : $.parseJSON("[" + a + "]")
    };
    this.Idx = new function() {
        this.options = {
            gbUrl: "http://sportmobile.johnny.com",
            pgLogin: "LoginSvc.ashx",
            pgSvc: "IdxSvc.ashx",
            tpid: "",
            token: "",
            lang: "",
            oddstype: "00001"
        };
        this.bind = function(c) {
            if (typeof c !== "function") {
                return
            }
            var a = this;
            if (a.options.tpid == "" || a.options.lang == "") {
                c("error options");
                return
            }
            var b = a.options.gbUrl + "/mobile/common/";
            GbPlatform.getScript(b + a.options.pgLogin + "?m=0&tpid=" + a.options.tpid + "&languagecode=" + a.options.lang + "&token=" + a.options.token, function() {
                if (GbPlatform.conid == "") {
                    c("login error")
                } else {
                    GbPlatform.push.include.calljquery(function() {
                        GbPlatform.getScript(b + a.options.pgSvc + "?m=0&tpid=" + a.options.tpid + "&languagecode=" + a.options.lang, function() {
                            if (GbPlatform.rawData == "") {
                                c([])
                            } else {
                                GbPlatform.data = GbPlatform.compressToJSON(GbPlatform.columnName, GbPlatform.rawData);
                                for (var d = 0; d < GbPlatform.data.length; d++) {
                                    var e = GbPlatform.data[d];
                                    e.RteA = OddsFormat.ChangeOdds(e.RteA, e.GidA);
                                    e.RteB = OddsFormat.ChangeOdds(e.RteB, e.GidB);
                                    e.RteX = (e.RteX == "") ? "" : OddsFormat.ChangeOdds(e.RteX, e.GidX)
                                }
                                c(GbPlatform.data.clone())
                            }
                        })
                    })
                }
            })
        };
        this.push = null
    };
    this.push = new function() {
        this.connSport = null;
        this.transport = ["webSockets", "serverSentEvents", "longPolling"];
        this.lvp = null;
        this.include = new function() {
            this.calljquery = function(a) {
                if (typeof jQuery === "undefined") {
                    GbPlatform.getScript(GbPlatform.Idx.options.gbUrl + "/js/jquery-1.11.3.min.js", function() {
                        GbPlatform.push.include.calllzstring(a)
                    })
                } else {
                    GbPlatform.push.include.calllzstring(a)
                }
            };
            this.calllzstring = function(a) {
                if (typeof LZString === "undefined") {
                    GbPlatform.getScript(GbPlatform.Idx.options.gbUrl + "/js/lz-string-1.3.3-min.js", function() {
                        GbPlatform.push.include.callsignalr(a)
                    })
                } else {
                    GbPlatform.push.include.callsignalr(a)
                }
            };
            this.callsignalr = function(a) {
                if (typeof $.hubConnection === "undefined") {
                    GbPlatform.getScript(GbPlatform.Idx.options.gbUrl + "/js/jquery.signalR-2.2.0.js", function() {
                        GbPlatform.push.include.callback(a)
                    })
                } else {
                    GbPlatform.push.include.callback(a)
                }
            };
            this.callback = function(a) {
                if (typeof a === "function") {
                    a()
                }
                GbPlatform.push.connSport = $.hubConnection(GbPlatform.Idx.options.gbUrl);
                GbPlatform.push.connSport.qs = {
                    version: "1.0"
                };
                GbPlatform.push.lvp = GbPlatform.push.connSport.createHubProxy("sp_m_ts");
                GbPlatform.push.lvp.on("spmp", function(g, f) {
                    if (typeof GbPlatform.Idx.push === "function" && g == "h") {
                        var b = f.split("[h]");
                        GbPlatform.rawData = b[1];
                        GbPlatform.data = GbPlatform.compressToJSON(GbPlatform.columnName, LZString.decompressFromUTF16(GbPlatform.rawData));
                        for (var c = 0; c < GbPlatform.data.length; c++) {
                            var e = GbPlatform.data[c];
                            e.RteA = OddsFormat.ChangeOdds(e.RteA, e.GidA);
                            e.RteB = OddsFormat.ChangeOdds(e.RteB, e.GidB);
                            e.RteX = (e.RteX == "") ? "" : OddsFormat.ChangeOdds(e.RteX, e.GidX)
                        }
                        GbPlatform.Idx.push(GbPlatform.data.clone())
                    }
                });
                GbPlatform.push.connSport.start({
                    transport: GbPlatform.push.transport
                }).done(function() {
                    GbPlatform.push.include.joinroom()
                }).fail(function() {
                    if (GbPlatform.push.connSport.state === $.signalR.connectionState.disconnected) {
                        GbPlatform.push.connSport.start({
                            transport: vtransport
                        }).done(function() {
                            GbPlatform.push.include.joinroom()
                        })
                    }
                })
            };
            this.joinroom = function() {
                GbPlatform.push.lvp.invoke("cjgp", "h_" + GbPlatform.Idx.options.lang.toLowerCase() + "_" + GbPlatform.Idx.options.tpid + "_2")
            };
            this.leaveroom = function() {
                GbPlatform.push.lvp.invoke("clgp", "h_" + GbPlatform.Idx.options.lang.toLowerCase() + "_" + GbPlatform.Idx.options.tpid + "_2")
            }
        }
    }
};
var OddsFormat = new function() {
    this.FractionalJSON = [{
        Name: "3/100",
        Value: "1/33"
    }, {
        Name: "3/50",
        Value: "1/18"
    }, {
        Name: "7/100",
        Value: "1/14"
    }, {
        Name: "2/25",
        Value: "1/12"
    }, {
        Name: "9/100",
        Value: "1/11"
    }, {
        Name: "11/100",
        Value: "1/9"
    }, {
        Name: "3/25",
        Value: "1/8"
    }, {
        Name: "13/100",
        Value: "2/15"
    }, {
        Name: "7/50",
        Value: "1/7"
    }, {
        Name: "3/20",
        Value: "2/13"
    }, {
        Name: "4/25",
        Value: "2/13"
    }, {
        Name: "17/100",
        Value: "1/6"
    }, {
        Name: "9/50",
        Value: "2/11"
    }, {
        Name: "11/50",
        Value: "2/9"
    }, {
        Name: "29/100",
        Value: "2/7"
    }, {
        Name: "33/100",
        Value: "1/3"
    }, {
        Name: "67/100",
        Value: "4/6"
    }];
    this.OddsFixId = function() {
        return ",21,29,31,42,43,63,64,65,66,99,101,121,138,139,150,151,152,167,168,1280,1287,1290,22,23,24,25,28,30,32,35,43,45,49,50,59,60,61,62,67,68,69,70,72,73,96,100,102,109,110,113,114,118,122,124,128,129,130,134,139,142,143,144,160,161,162,166,170,178,183,184,185,186,188,195,199,200,201,202,223,224,234,235,240,241,246,247,275,282,287,288,290,299,1266,1267,1273,1274,1279,1281,1282,1288,1289,1291,1292,1293,1297,1300,1301,1303,1325,1337,1343,1350,1356,1363,1404,1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,2549,2550,2551,2552,2556,2557,2559,2561,2564,2565,2569,2572,2574,2575,2576,2584,2586,2587,2588,2592,2594,2596,2597,2598,2599,2600,2602,3416,3417,3418,3801,3830,3831,3836,3838,3841,3846,3849,3851,3852,3856,3857,3863,3871,3880,3895,3898,3906,3907,3913,3914,3916,3919,3920,3930,3932,3934,3935,3940,3943,3944,3945,3946,3956,3962,3968,3976,3981,3982,3985,3997,4000,4005,4015,4019,4020,4030,4035,4045,4046,4053,4058,4059,4061,4064,4068,4071,4074,4077,4079,4082,4083,4097,4098,4102,4103,4104,4105,4107,4108,4123,4135,4136,4137,4139,4140,4145,4146,4153,4161,4165,4167,4169,4170,4174,4175,4183,4208,4335,5064,5108,5156,5163,5212,5215,5238,5262,5279,5281,5315,5327,5342,5361,5397,5405,5430,5467,5477,5681,5682,5683,5686,5688,5689,5849,5850,5853,5854,5855,5861,5864,5869,5871,5880,5881,5882,5883,5884,5885,5896,5899,5903,5904,5908,5910,5911,5919,5920,5923,5924,5925,5927,5928,5929,5930,5933,5938,5939,5940,5941,5942,5943,5944,5945,5946,5947,5948,5949,5950,5993,5995,5996,"
    };
    this.ChangeOdds = function(c) {
        if (isNaN(c)) {
            return
        }
        var b = OddsFormat.ChangeOdds.arguments;
        var a = (b.length > 1) ? b[1] : "0";
        var d = OddsFormat.OddsFixId();
        if (d.indexOf("," + a + ",") == -1) {
            return parseFloat(c).toFixed(2)
        }
        return OddsFormat.OddsFunc(GbPlatform.Idx.options.oddstype, c)
    };
    this.OddsFunc = function(c, a) {
        var b = a;
        switch (c) {
            case "00006":
            case "00001":
                b = a;
                break;
            case "00002":
                b = a - 1;
                break;
            case "00003":
                if (1 < a && a < 2) {
                    b = a - 1
                } else {
                    if (a >= 2) {
                        b = -1 / (a - 1)
                    }
                }
                break;
            case "00008":
            case "00004":
                if (1 < a && a <= 2) {
                    b = (-100 / (a - 1)).toFixed(2)
                } else {
                    if (a > 2) {
                        b = ((a - 1) * 100).toFixed(2)
                    }
                }
                break;
            case "00005":
                if (1 < a && a <= 2) {
                    b = (-1 / (a - 1)).toFixed(2)
                } else {
                    if (a > 2) {
                        b = (a - 1).toFixed(2)
                    }
                }
                break;
            case "00007":
                b = OddsFormat.reduce(((a - 1).toFixed(2) * 100).toFixed(2), 100);
                break
        }
        return (c == "00007") ? b : parseFloat(b).toFixed(((c == "00004" || c == "00008") ? 0 : 2))
    };
    this.reduce = function(h, k) {
        var f;
        var e = h;
        var d = k;
        while (d != 0) {
            f = e % d;
            e = d;
            d = f
        }
        var c = (h / e).toString() + "/" + (k / e).toString();
        $.each(OddsFormat.FractionalJSON, veachFunc);
        for (var g = 0; g < OddsFormat.FractionalJSON.length; g++) {
            var j = OddsFormat.FractionalJSON[g];
            if (j.Name == c) {
                c = j.Value;
                break
            }
        }
        f = null;
        e = null;
        d = null;
        return c
    }
};