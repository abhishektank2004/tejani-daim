var xhr;
var xhr1;
var xhr2;
var xhr3;

function wishlist() {
  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/update_wishlist",
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (data) {
      $("#wishlistcounter").html(data);
      $(".wishlistcounter1").html(data);
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
}

function biddata_count() {
  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/update_bidlist",
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (data) {
      $("#bidcounter").html(data);
      $(".bidcounter1").html(data);
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
}

function start_value() { }

function reserve_bid() {
  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/reserve_bid",
    success: function (data) { },
  });
}

$(document).ready(function () {
  wishlist();
  biddata_count();

  reserve_bid();
  $(".jvbdfuygfdab").attr("disabled", "disabled");
});

$(document).on("keyup", ".forfotpasse", function () {
  var value = $(this).val();

  if ($(this).val() == "") {
    $(".jvbdfuygfdab").attr("disabled", "disabled");
    $("#forgoterrormsg").html("Enter Email or Username");
  } else {
    $.ajax({
      type: "POST",
      url: base_url3 + "forget/check_user",
      data: {
        value: value,
      },
      success: function (data) {
        if (data == 0) {
          $(".forfotpasse").css("border-color", "tomato");
          $(".jvbdfuygfdab").attr("disabled", "disabled");
          $("#forgoterrormsg").html("Invalid Email or Username");
        }

        if (data == 1) {
          $(".forfotpasse").css("border-color", "green");
          $(".jvbdfuygfdab").removeAttr("disabled", "disabled");
          $("#forgoterrormsg").html("");
        }
      },
    });
  }
});

// searchpage js

$(document).on("click", ".addtowishliststone", function () {
  var stoneid = $(this).data("ref-id");
  var datastatus = $(this).data("status");

  if ($(this).hasClass("is-like")) {
    $.ajax({
      type: "POST",
      url: base_url3 + "bidingsearch/delete_wishlist",
      data: {
        stoneid: stoneid,
      },
      beforeSend: function () {
        $("#ajaxloaderoverlay").removeClass("is-hide");
      },
      success: function (data) {
        $("#wishlistid" + stoneid)
          .addClass("far")
          .removeClass("fas");
        $("#wishlistid" + stoneid).removeClass("is-like");
        wishlist();
      },
      complete: function () {
        $("#ajaxloaderoverlay").addClass("is-hide");
      },
    });
  } else {
    $.ajax({
      type: "POST",
      url: base_url3 + "bidingsearch/addto_wishlist",
      data: {
        stoneid: stoneid,
      },
      beforeSend: function () {
        $("#ajaxloaderoverlay").removeClass("is-hide");
      },
      success: function (data) {
        $("#wishlistid" + stoneid)
          .addClass("fas")
          .removeClass("far");
        $("#wishlistid" + stoneid).addClass("is-like");
        wishlist();
      },
      complete: function () {
        $("#ajaxloaderoverlay").addClass("is-hide");
      },
    });
  }
});

$(document).on("click change", ".updatebidpercent", function () {
  $(this).addClass("selected");
  var dataid = $(this).data("id");
  var dataval = $(this).val();
  var mainbidpercent = $(this).data("bid-percent");
  var carat = $("#diamondcaret" + dataid).html();
  var rapprice = $("#rappriceforcal" + dataid).html();
  var totalprice = $("#caltotalbidpri" + dataid).html();

  if (dataval != "") {
    var viper = (parseFloat(rapprice) * parseFloat(dataval)) / 100;
    var mortal = parseFloat(rapprice) + parseFloat(viper);
    var famt = mortal * carat;
    var diffprice = parseFloat(mainbidpercent) - parseFloat(dataval);

    $("#openbidpopup" + dataid).removeClass("selected");

    d = new Date();
    $.ajax({
      type: "POST",
      url: base_url3 + "bidingsearch/matchvalue?t_" + d.getTime(),
      data: {
        val: dataval,
        datapercent: mainbidpercent,
        dashid1: dataid,
      },
      success: function (result) {
        if (result == "1") {
          $("#calculatebidctsval" + dataid)
            .html(parseFloat(mortal).toFixed(2))
            .addClass("filled");
          $("#calculatebidamtval" + dataid)
            .html(parseFloat(famt).toFixed(2))
            .addClass("filled");
          $("#calcdifebidamt" + dataid)
            .html(parseFloat(diffprice).toFixed(2))
            .addClass("filled");
          $(".openbidpopup").removeAttr("disabled", "disabled");
          $("#updatebidpercent" + dataid).css("background", "transparent");
        }
        if (result == "0") {
          $("#calculatebidctsval" + dataid).html("");
          $("#calculatebidamtval" + dataid).html("");
          $("#calcdifebidamt" + dataid).html("");
          $(".openbidpopup").attr("disabled", "disabled");
        }
      },
    });
  } else {
    $(this).val(parseFloat($v1) + parseFloat($step));
    $("#calculatebidctsval" + dataid).html("");
    $("#calculatebidamtval" + dataid).html("");
    $("#calcdifebidamt" + dataid).html("");
    $(".openbidpopup").attr("disabled", "disabled");
  }
});

$(document).on("mouseup", ".updatebidpercent", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($v1);
  }
  // $(this).val(parseFloat($v1) + parseFloat($step));
});

$(document).on("mousedown", ".updatebidpercent", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($v1);
  }
  // $(this).val(parseFloat($v1) - parseFloat($step));
});

$(document).on("keyup", ".updatebidpercent", function () {
  // $(this).addClass('selected');
  $(this).addClass("selected");
  var dataid = $(this).data("id");
  var dataval = $(this).val();
  var mainbidpercent = $(this).data("bid-percent");
  var carat = $("#diamondcaret" + dataid).html();
  var rapprice = $("#rappriceforcal" + dataid).html();
  var totalprice = $("#caltotalbidpri" + dataid).html();

  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    // $(this).val($min);
  }
  // $(this).val(parseFloat($v1) + parseFloat($step));

  if (dataval != "") {
    var viper = (parseFloat(rapprice) * parseFloat(dataval)) / 100;
    var mortal = parseFloat(rapprice) + parseFloat(viper);
    var famt = mortal * carat;
    var diffprice = parseFloat(mainbidpercent) - parseFloat(dataval);

    $("#openbidpopup" + dataid).removeClass("selected");

    $.ajax({
      type: "POST",
      url: base_url3 + "bidingsearch/matchvalue",
      data: {
        val: dataval,
        datapercent: mainbidpercent,
        dashid1: dataid,
      },
      success: function (result) {
        // console.log(result);
        if (result == "1") {
          $("#calculatebidctsval" + dataid)
            .html(parseFloat(mortal).toFixed(2))
            .addClass("filled");
          $("#calculatebidamtval" + dataid)
            .html(parseFloat(famt).toFixed(2))
            .addClass("filled");
          $("#calcdifebidamt" + dataid)
            .html(parseFloat(diffprice).toFixed(2))
            .addClass("filled");
          $(".openbidpopup").removeAttr("disabled", "disabled");
          $("#updatebidpercent" + dataid).css("background", "transparent");
        }
        if (result == "0") {
          $("#calculatebidctsval" + dataid).html("");
          $("#calculatebidamtval" + dataid).html("");
          $("#calcdifebidamt" + dataid).html("");
          $(".openbidpopup").attr("disabled", "disabled");
          // alert("Please fill data in range.");
          $("#updatebidpercent" + dataid).css("background", "#ff6969");
        }
      },
    });
  } else {
    $("#calculatebidctsval" + dataid).html("");
    $("#calculatebidamtval" + dataid).html("");
    $("#calcdifebidamt" + dataid).html("");
    $(".openbidpopup").attr("disabled", "disabled");
  }
});

$(document).on("keydown", ".updatebidpercent", function (event) {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    // $(this).val($min);
  }
  // $(this).val(parseFloat($v1) - parseFloat($step));
  if (event.which == 13) {
    var dataid = $(this).data("id");
    var dataval = $(this).val();
    var mainbidpercent = $(this).data("bid-percent");
    var carat = $("#diamondcaret" + dataid).html();
    var rapprice = $("#rappriceforcal" + dataid).html();
    var totalprice = $("#caltotalbidpri" + dataid).html();

    $("#openbidpopup" + dataid).removeClass("selected");

    if (dataval != "") {
      var viper = (parseFloat(rapprice) * parseFloat(dataval)) / 100;
      var mortal = parseFloat(rapprice) + parseFloat(viper);
      var famt = mortal * carat;
      var diffprice = parseFloat(mainbidpercent) - parseFloat(dataval);
      $.ajax({
        type: "POST",
        url: base_url3 + "bidingsearch/matchvalue",
        data: {
          val: dataval,
          datapercent: mainbidpercent,
          dashid1: dataid,
        },
        success: function (result) {
          if (result == "1") {
            $("#calculatebidctsval" + dataid)
              .html(parseFloat(mortal).toFixed(2))
              .addClass("filled");
            $("#calculatebidamtval" + dataid)
              .html(parseFloat(famt).toFixed(2))
              .addClass("filled");
            $("#calcdifebidamt" + dataid)
              .html(parseFloat(diffprice).toFixed(2))
              .addClass("filled");
            $(".openbidpopup").removeAttr("disabled", "disabled");
            $("#updatebidpercent" + dataid).css("background", "transparent");
          }
          if (result == "0") {
            $("#calculatebidctsval" + dataid).html("");
            $("#calculatebidamtval" + dataid).html("");
            $("#calcdifebidamt" + dataid).html("");
            $(".openbidpopup").attr("disabled", "disabled");
            alert("Please fill data in range.");
          }
        },
      });
    } else {
      $("#calculatebidctsval" + dataid).html("");
      $("#calculatebidamtval" + dataid).html("");
      $("#calcdifebidamt" + dataid).html("");
      $(".openbidpopup").attr("disabled", "disabled");
    }

    return false;
  }
});

$(document).on("click", "#termsofusenot", function () {
  $('#bidforupcoming').fadeIn(1000);
  // $("#bidforupcoming").css("display", "block");
});

$(document).on("click", ".closeupcoming", function () {
  $("#bidforupcoming").css("display", "none");
});

$(document).on("click", "#bidall", function () {
  $(".bidingmodel").css("display", "block");
  var chkArray = [];
  $(".s1check").each(function () {
    if ($(this).is(":checked")) {
      chkArray.push($(this).data("id"));
    }
  });

  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/biddingdata",
    data: {
      selected: chkArray,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (result) {
      $("#loaddata").html(result);
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

$(document).on("keyup", "#loaddata tr td #biddisc", function () {
  var val = $(this).val();
  var dataid = $(this).data("id");
  var carat = $("#percarat" + dataid).html();
  var rapprice = $("#raprate" + dataid).html();
  var viper = (parseFloat(rapprice) * parseFloat(val)) / 100;
  var mortal = parseFloat(rapprice) + parseFloat(viper);
  var famt = mortal * carat;
  var datapercent = $(this).data("percent");

  if (val == "") {
    $("#bidctc" + dataid).val("");
    $("#famt" + dataid).html("");
  }
  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/matchvalue",
    data: {
      val: val,
      datapercent: datapercent,
      dashid1: dataid,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (data) {
      if (data == "0") {
        $(".thispercent" + dataid).css({
          "border-color": "red",
          background: "rgba(250, 15, 38, 0.4)",
        });
        $("#bidctc" + dataid).val("");
        $("#famt" + dataid).html("");
        $("#biderrormsg" + dataid).html("input required between criteria");
      }
      if (data == "1") {
        $(".thispercent" + dataid).css({
          "border-color": "#ccc",
          background: "none",
        });
        $("#biderrormsg" + dataid).html("");
        $("#bidctc" + dataid).val(mortal);
        $("#famt" + dataid).html(Math.round(famt));
      }
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

$(document).on("click", ".closebiding", function () {
  $(".confirmbidingmodel").css("display", "none");
  $(".bidingmodel").css("display", "none");
});

$(document).on("click", "#btnbidclose", function () {
  $(".bidingmodel").css("display", "none");
});

function ajaxloader() {
  $("#ajaxloaderoverlay").addClass("is-hide");
}

$(document).on("click", ".openslotpopup", function () {
  $(".slotbookmodel").css("display", "block");
});

$(document).on("click", ".closeslot", function () {
  $(".slotbookmodel").css("display", "none");
});

$(document).on("click", ".cancelslotbtn", function () {
  $(".slotbookmodel").css("display", "none");
});

$(document).on("click", ".cdhbhjcdsh", function () {
  var dataid = $(this).parent().data("id");
  $("#" + dataid)
    .addClass("active")
    .siblings()
    .removeClass("active");
});

$(document).on("click", ".biddingcheck", function () {
  var id = $(this).data("id");
  if ($(this).hasClass("ckeck_diamond")) {
    $(this).removeClass("ckeck_diamond");
    $("#calculatebidctsval" + id).removeClass("checked");
    $("#calculatebidamtval" + id).removeClass("checked");
    $("#calcdifebidamt" + id).removeClass("checked");
    $("#updatebidpercent" + id).removeClass("checked");
  } else {
    $(this).addClass("ckeck_diamond");
    $("#calculatebidctsval" + id).addClass("checked");
    $("#calculatebidamtval" + id).addClass("checked");
    $("#calcdifebidamt" + id).addClass("checked");
    $("#updatebidpercent" + id).addClass("checked");
  }
});

$(document).on("change", ".biddingcheck", function () {
  var a = $("input[type='checkbox'].biddingcheck");
  if (a.length == a.filter(":checked").length) {
    $("#checkAll.mycheckall_diamond").prop("checked", true);
    $("#checkAll.mycheckall_diamond").addClass("checkall_selected");
  } else {
    $("#checkAll.mycheckall_diamond").prop("checked", false);
    $("#checkAll.mycheckall_diamond").removeClass("checkall_selected");
  }
});

$(document).on("change", "#checkAll.mycheckall_diamond", function () {
  if ($(this).hasClass("checkall_selected")) {
    $(this).removeClass("checkall_selected");
    $(".biddingcheck").each(function () {
      var id = $(this).data("id");
      $(this).removeClass("ckeck_diamond");
      $("#calculatebidctsval" + id).removeClass("checked");
      $("#calculatebidamtval" + id).removeClass("checked");
      $("#calcdifebidamt" + id).removeClass("checked");
      $("#updatebidpercent" + id).removeClass("checked");
    });
  } else {
    $(this).addClass("checkall_selected");
    $(".biddingcheck").each(function () {
      var id = $(this).data("id");
      $(this).addClass("ckeck_diamond");
      $("#calculatebidctsval" + id).addClass("checked");
      $("#calculatebidamtval" + id).addClass("checked");
      $("#calcdifebidamt" + id).addClass("checked");
      $("#updatebidpercent" + id).addClass("checked");
    });
  }
});

$(document).on("click", ".openbidpopup", function () {
  var addbidarr = [];
  var inputval = [];
  var cbidcts = [];
  var cbidamt = [];
  var cbdd = [];
  var skvals = $(this)
    .parent()
    .prev()
    .prev()
    .prev()
    .prev()
    .find(".updatebidpercent")
    .val();
  var skvals1 = $(this)
    .parent()
    .prev()
    .prev()
    .prev()
    .prev()
    .find(".updatebidpercent")
    .data("val");
  console.log(skvals);
  console.log(skvals1);
  if (parseFloat(skvals1) && parseFloat(skvals)) {
    if (parseFloat(skvals1) == parseFloat(skvals)) {
      alert("Please Change Value");
      return false;
    }
  }
  $(".updatebidpercent.selected.checked").each(function () {
    if ($(".updatebidpercent.selected.checked").val() != "") {
      addbidarr.push($(this).data("id"));
      inputval.push($(this).val());
    }
  });

  $(".calculatebidctsval.filled.checked").each(function () {
    cbidcts.push($(this).html());
  });

  $(".calculatebidamtval.filled.checked").each(function () {
    cbidamt.push($(this).html());
  });

  $(".calcdifebidamt.filled.checked").each(function () {
    cbdd.push($(this).html());
  });

  if ($(this).hasClass("selected")) {
    alert("Please Change Value");
  } else {
    if (addbidarr != "") {
      $.ajax({
        type: "POST",
        url: base_url3 + "bidingsearch/confirm_save",
        data: {
          addbidarr: addbidarr,
          inputval: inputval,
          cbidcts: cbidcts,
          cbidamt: cbidamt,
          cbdd: cbdd,
        },
        beforeSend: function () {
          $("#ajaxloaderoverlay").removeClass("is-hide");
        },
        success: function (result) {
          if (result == 0) {
            alert("Please change value.");
          } else {
            $("#loaddataebid").html(result);
            $("#confirmbidingmodel").css("display", "block");
            $.ajax({
              type: "POST",
              url: base_url3 + "bidingsearch/fetch_lab_ceritificate",
              data: {
                addbidarr: addbidarr,
              },
              dataType: "json",
              success: function (result) {
                if (result.gia == "1") {
                  $("#giacerselect").css("display", "block");
                  $(".giatermsvalue").addClass("active");
                }
                if (result.igi == "2") {
                  $("#hrdigiselect").css("display", "block");
                  $(".igihrdtermsval").addClass("active");
                }
              },
            });
          }
        },
        error: function () {
          $("#requireloginmmodel").css("display", "block");
        },
        complete: function () {
          $("#ajaxloaderoverlay").addClass("is-hide");
        },
      });
    } else {
      alert("Please select minimum 1 stone for bidding.");
    }
  }
});

$(document).on("click", "#cancelbidforus", function () {
  var sendid = [];
  var sendbiddisc = [];
  var sendbidcts = [];
  var sendbidamt = [];
  var sendbiddiff = [];

  $(".modifysendatacval").each(function () {
    sendid.push($(this).data("id"));
  });

  $(".modifysendfinaldisc").each(function () {
    sendbiddisc.push($(this).data("value"));
  });

  $(".modifysendfinalcts").each(function () {
    sendbidcts.push($(this).data("value"));
  });

  $(".modifysendfinalamt").each(function () {
    sendbidamt.push($(this).data("value"));
  });

  $(".modifysenddiffamt").each(function () {
    sendbiddiff.push($(this).data("value"));
  });

  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/modify_bidding",
    data: {
      sendid: sendid,
      sendbiddisc: sendbiddisc,
      sendbidcts: sendbidcts,
      sendbidamt: sendbidamt,
      sendbiddiff: sendbiddiff,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (result) {
      $("#confirmbidingmodel").css("display", "none");
      $("#bidingmodel").css("display", "block");
      $("#loaddataif").html(result);
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

var findnull = 0;

$(document).on("click", ".btnmatchall", function () {
  var subid = [];
  var subdisc = [];
  var subcts = [];
  var subfmt = [];
  var subdiff = [];

  $("input[name=subbiddisc]").each(function () {
    if ($(this).val() == "") {
      findnull = 1;
      $(this).attr("placeholder", "Required");
      $(this).addClass("warning");
    } else {
      findnull = 0;
      $(this).attr("placeholder", "");
      $(this).removeClass("warning");
    }
  });
  if (findnull == 1) {
    return false;
  }
  if (findnull == 0) {
    $(".ausctssid").each(function () {
      subid.push($(this).data("id"));
    });

    $(".pcbuustgdidss").each(function () {
      subdisc.push($(this).val());
    });

    $(".tsssiddcts").each(function () {
      subcts.push($(this).html());
    });

    $(".tsssiddamt").each(function () {
      subfmt.push($(this).html());
    });

    $(".tsssidddiff").each(function () {
      subdiff.push($(this).html());
    });

    $.ajax({
      type: "POST",
      url: base_url3 + "bidingsearch/senddata",
      data: {
        subid: subid,
        subdisc: subdisc,
        subcts: subcts,
        subfmt: subfmt,
        subdiff: subdiff,
      },
      beforeSend: function () {
        $("#ajaxloaderoverlay").removeClass("is-hide");
      },
      success: function (data) {
        $("#bidingmodel").css("display", "none");
        $("#confirmbidingmodel").css("display", "block");
        $("#loaddataebid").html(data);
      },
      complete: function () {
        $("#ajaxloaderoverlay").addClass("is-hide");
      },
    });
  }
});

$(document).on("change", ".pcbuustgdidss", function () {
  var dashid = $(this).data("id");
  var dashval = $(this).val();
  var maindiscval = $(this).data("discount-val");
  var dashcaret = $("#modifycaretid" + dashid).html();
  var dashrapprice = $("#modifyrapprice" + dashid).html();
  var dashtotalprice = $("#modifytotalamt" + dashid).html();

  var dashviper = (parseFloat(dashrapprice) * parseFloat(dashval)) / 100;
  var dashmortal = parseFloat(dashrapprice) + parseFloat(dashviper);
  var dashfamt = dashmortal * dashcaret;
  var dashdiffprice = parseFloat(maindiscval) - parseFloat(dashval);

  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/matchvalue",
    data: {
      val: dashval,
      datapercent: maindiscval,
      dashid1: dashid,
    },
    success: function (result) {
      if (result == "1") {
        $(this).addClass("selected");
        $("#tsssiddcts" + dashid).html(parseFloat(dashmortal).toFixed(2));
        $("#tsssiddamt" + dashid).html(parseFloat(dashfamt).toFixed(2));
        $("#tsssidddiff" + dashid).html(parseFloat(dashdiffprice).toFixed(2));
        $(".btnmatchall").removeAttr("disabled", "disabled");
        $("#pcbuustgdidss" + dashid).css("background", "transparent");
      }
      if (result == "0") {
        $("#tsssiddcts" + dashid).html("");
        $("#tsssiddamt" + dashid).html("");
        $("#tsssidddiff" + dashid).html("");
        $(".btnmatchall").attr("disabled", "disabled");
      }
    },
  });
});

$(document).on("keyup", ".pcbuustgdidss", function () {
  var dashid = $(this).data("id");
  var dashval = $(this).val();
  var maindiscval = $(this).data("discount-val");
  var dashcaret = $("#modifycaretid" + dashid).html();
  var dashrapprice = $("#modifyrapprice" + dashid).html();
  var dashtotalprice = $("#modifytotalamt" + dashid).html();

  var dashviper = (parseFloat(dashrapprice) * parseFloat(dashval)) / 100;
  var dashmortal = parseFloat(dashrapprice) + parseFloat(dashviper);
  var dashfamt = dashmortal * dashcaret;
  var dashdiffprice = parseFloat(maindiscval) - parseFloat(dashval);

  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/matchvalue",
    data: {
      val: dashval,
      datapercent: maindiscval,
      dashid1: dashid,
    },
    success: function (result) {
      if (result == "1") {
        $(this).addClass("selected");
        $("#tsssiddcts" + dashid).html(parseFloat(dashmortal).toFixed(2));
        $("#tsssiddamt" + dashid).html(parseFloat(dashfamt).toFixed(2));
        $("#tsssidddiff" + dashid).html(parseFloat(dashdiffprice).toFixed(2));
        $(".btnmatchall").removeAttr("disabled", "disabled");
        $("#pcbuustgdidss" + dashid).css("background", "transparent");
      }
      if (result == "0") {
        $("#tsssiddcts" + dashid).html("");
        $("#tsssiddamt" + dashid).html("");
        $("#tsssidddiff" + dashid).html("");
        $(".btnmatchall").attr("disabled", "disabled");
        $("#pcbuustgdidss" + dashid).css("background", "#ff6969");
      }
    },
  });
});

$(document).on("keydown", ".pcbuustgdidss", function (event) {
  if (event.which == 13) {
    var dashid = $(this).data("id");
    var dashval = $(this).val();
    var maindiscval = $(this).data("discount-val");
    var dashcaret = $("#modifycaretid" + dashid).html();
    var dashrapprice = $("#modifyrapprice" + dashid).html();
    var dashtotalprice = $("#modifytotalamt" + dashid).html();

    var dashviper = (parseFloat(dashrapprice) * parseFloat(dashval)) / 100;
    var dashmortal = parseFloat(dashrapprice) + parseFloat(dashviper);
    var dashfamt = dashmortal * dashcaret;
    var dashdiffprice = parseFloat(maindiscval) - parseFloat(dashval);
    $.ajax({
      type: "POST",
      url: base_url3 + "bidingsearch/matchvalue",
      data: {
        val: dashval,
        datapercent: maindiscval,
        dashid1: dashid,
      },
      success: function (result) {
        if (result == "1") {
          $("#tsssiddcts" + dashid).html(parseFloat(dashmortal).toFixed(2));
          $("#tsssiddamt" + dashid).html(parseFloat(dashfamt).toFixed(2));
          $("#tsssidddiff" + dashid).html(parseFloat(dashdiffprice).toFixed(2));
          $(".btnmatchall").removeAttr("disabled", "disabled");
          $("#pcbuustgdidss" + dashid).css("background", "transparent");
        }
        if (result == "0") {
          $("#tsssiddcts" + dashid).html("");
          $("#tsssiddamt" + dashid).html("");
          $("#tsssidddiff" + dashid).html("");
          $(".btnmatchall").attr("disabled", "disabled");
          // alert("Please fill data in range.");
          $("#pcbuustgdidss" + dashid).css("background", "#ff6969");
        }
      },
    });
    return false;
  }
});

function update_data(page = "") {
  var var_form_data = $("#search_form1").serialize();

  //alert(var_form_data)
  //var_form_data = "<?php echo $para; ?> ";

  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch",
    data: var_form_data,
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (result) {
      $("#ajaxloaderoverlay").addClass("is-hide");
      //alert(result)

      $("#table_cont1").html(result);
      // console.log($('#invtable tbody tr').length);
      // table_cont visible
      $("#table_cont1").css("display", "block");
      $("#search_form1").css("display", "none");
      $("#currencyFilter1").css("display", "block");

      //$('#invtable').DataTable();
      //invTable();
      var table11 = $("#invtable").DataTable({
        searching: false,
        lengthChange: false,
        scrollY: 410,
        scrollX: true,
        autoWidth: true,
        pageLength: 30,
        aoColumnDefs: [
          {
            bSortable: false,
            aTargets: [0],
          },
        ],
      });
      $("#invtable_wrapper th:nth-child(3)").click();
      table11.page(parseInt(page) - parseInt(1)).draw(false);
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
      $("#invtable_wrapper th:nth-child(3)").click();
    },
  });

  $("#invtable_wrapper th:nth-child(3)").click();
}

$(document).on("click", "#confirmbidusof", function () {
  var conids = [];
  var condisc = [];
  var concts = [];
  var confamt = [];
  var condiff = [];
  var auto_bid = [];
  var billtype = $(".billtypevalue").val();
  var giatype = $(".giatermsvalue.active").val();
  var igitype = $(".igihrdtermsval.active").val();

  $(".modifysendatacval").each(function () {
    conids.push($(this).data("id"));
  });

  $(".autobiddischas").each(function () {
    auto_bid.push($(this).val());
  });

  $(".modifysendfinaldisc").each(function () {
    condisc.push($(this).data("value"));
  });

  $(".modifysendfinalcts").each(function () {
    concts.push($(this).data("value"));
  });

  $(".modifysendfinalamt").each(function () {
    confamt.push($(this).data("value"));
  });

  $(".modifysenddiffamt").each(function () {
    condiff.push($(this).data("value"));
  });

  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/insert_bid_data",
    data: {
      conids: conids,
      condisc: condisc,
      concts: concts,
      confamt: confamt,
      condiff: condiff,
      billtype: billtype,
      giatype: giatype,
      igitype: igitype,
      auto_bid: auto_bid,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (data) {
      var hy = $(".paginate_button.active a").data("dt-idx");
      update_data(hy);
      biddata_count();

      // console.log(data);
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

// my-bidding page

$(document).on("click", ".viewmybidding", function () {
  var dataid = $(this).data("id");
  var best = $("#bestbidrankpisnfh" + dataid).html();
  $.ajax({
    type: "POST",
    url: base_url3 + "mybidding/mybiddingdata",
    data: {
      dataid: dataid,
      best: best,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (result) {
      $("#myyloaddata").html(result);
      $("#myyybidingmodel").css("display", "block");
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

$(document).on(" mouseup", ".myupdatebidding", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($min);
  }
});
$(document).on(" mousedown", ".myupdatebidding", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($min);
  }
});

$(document).on("change click", ".myupdatebidding", function () {
  var dashid1 = $(this).data("id");
  var dashval1 = $(this).val();
  var maindisc = $(this).data("discount-value");
  var dashcaret1 = $("#mybidcaret" + dashid1).html();
  var dashrapprice1 = $("#mybidrapprice" + dashid1).html();
  var dashtotalprice1 = $("#mybidtotalprice" + dashid1).html();

  var dashviper1 = (parseFloat(dashrapprice1) * parseFloat(dashval1)) / 100;
  var dashmortal1 = parseFloat(dashrapprice1) + parseFloat(dashviper1);
  var dashfamt1 = dashmortal1 * dashcaret1;
  var dashdiffprice1 = parseFloat(maindisc) - parseFloat(dashval1);

  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/matchvalue",
    data: {
      val: dashval1,
      datapercent: maindisc,
      dashid1: dashid1,
    },
    success: function (result) {
      if (result == "1") {
        $("#mybiddingcts" + dashid1).html(parseFloat(dashmortal1).toFixed(2));
        $("#mybiddingamt" + dashid1).html(parseFloat(dashfamt1).toFixed(2));
        $("#mybiddingdiff" + dashid1).html(
          parseFloat(dashdiffprice1).toFixed(2)
        );
        $("#myupdatemybid").removeAttr("disabled", "disabled");
        $("#myupdatebidding" + dashid1).css("background", "transparent");
      }
      if (result == "0") {
        $("#mybiddingcts" + dashid1).html("");
        $("#mybiddingamt" + dashid1).html("");
        $("#mybiddingdiff" + dashid1).html("");
        $("#myupdatemybid").attr("disabled", "disabled");
      }
    },
  });
});

$(document).on("keydown", ".myupdatebidding", function (event) {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    // $(this).val($min);
  }
  if (event.which == 13) {
    var dashid1 = $(this).data("id");
    var dashval1 = $(this).val();
    var maindisc = $(this).data("discount-value");
    var dashcaret1 = $("#mybidcaret" + dashid1).html();
    var dashrapprice1 = $("#mybidrapprice" + dashid1).html();
    var dashtotalprice1 = $("#mybidtotalprice" + dashid1).html();

    var dashviper1 = (parseFloat(dashrapprice1) * parseFloat(dashval1)) / 100;
    var dashmortal1 = parseFloat(dashrapprice1) + parseFloat(dashviper1);
    var dashfamt1 = dashmortal1 * dashcaret1;
    var dashdiffprice1 = parseFloat(maindisc) - parseFloat(dashval1);
    $.ajax({
      type: "POST",
      url: base_url3 + "bidingsearch/matchvalue",
      data: {
        val: dashval1,
        datapercent: maindisc,
        dashid1: dashid1,
      },
      success: function (result) {
        if (result == "1") {
          $("#mybiddingcts" + dashid1).html(parseFloat(dashmortal1).toFixed(2));
          $("#mybiddingamt" + dashid1).html(parseFloat(dashfamt1).toFixed(2));
          $("#mybiddingdiff" + dashid1).html(
            parseFloat(dashdiffprice1).toFixed(2)
          );
          $("#myupdatemybid").removeAttr("disabled", "disabled");
          $("#myupdatebidding" + dashid1).css("background", "transparent");
        }
        if (result == "0") {
          $("#mybiddingcts" + dashid1).html("");
          $("#mybiddingamt" + dashid1).html("");
          $("#mybiddingdiff" + dashid1).html("");
          $("#myupdatemybid").attr("disabled", "disabled");
          alert("Please fill data in range.");
        }
      },
    });
    return false;
  }
});

$(document).on("keyup", ".myupdatebidding", function (event) {
  // if (event.which == 13) {

  var dashid1 = $(this).data("id");
  var dashval1 = $(this).val();
  var maindisc = $(this).data("discount-value");
  var dashcaret1 = $("#mybidcaret" + dashid1).html();
  var dashrapprice1 = $("#mybidrapprice" + dashid1).html();
  var dashtotalprice1 = $("#mybidtotalprice" + dashid1).html();

  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    // $(this).val($min);
  }

  if (dashval1 != "") {
    var dashviper1 = (parseFloat(dashrapprice1) * parseFloat(dashval1)) / 100;
    var dashmortal1 = parseFloat(dashrapprice1) + parseFloat(dashviper1);
    var dashfamt1 = dashmortal1 * dashcaret1;
    var dashdiffprice1 = parseFloat(maindisc) - parseFloat(dashval1);

    $.ajax({
      type: "POST",
      url: base_url3 + "bidingsearch/matchvalue",
      data: {
        val: dashval1,
        datapercent: maindisc,
        dashid1: dashid1,
      },
      success: function (result) {
        if (result == "1") {
          $("#mybiddingcts" + dashid1).html(parseFloat(dashmortal1).toFixed(2));
          $("#mybiddingamt" + dashid1).html(parseFloat(dashfamt1).toFixed(2));
          $("#mybiddingdiff" + dashid1).html(
            parseFloat(dashdiffprice1).toFixed(2)
          );
          $("#myupdatemybid").removeAttr("disabled", "disabled");
          $("#myupdatebidding" + dashid1).css("background", "transparent");
        }
        if (result == "0") {
          $("#mybiddingcts" + dashid1).html("");
          $("#mybiddingamt" + dashid1).html("");
          $("#mybiddingdiff" + dashid1).html("");
          $("#myupdatemybid").attr("disabled", "disabled");
          // alert("Please fill data in range.");
          $("#myupdatebidding" + dashid1).css("background", "#ff6969");
        }
      },
    });
  } else {
    $("#mybiddingcts" + dashid1).html("");
    $("#mybiddingamt" + dashid1).html("");
    $("#mybiddingdiff" + dashid1).html("");
    $("#myupdatemybid").attr("disabled", "disabled");
  }
  return false;
  // }
});

$(document).on("click", "#myupdatemybid", function () {
  var sendid = $(".mybiddatamodif").data("id");
  var sendpid = $(".mybiddatamodif").data("pid");
  var senddisc = $(".myupdatebidding").val();
  var senddisc1 = $(".myupdatebidding").data("val");
  var sendcts = $(".mybiddingcts").html();
  var sendfmt = $(".mybiddingamt").html();
  var senddiff = $(".mybiddingdiff").html();
  // var auto_bid = $('.autobiddisc').val();

  var biltype = $(".billtypevaluee").val();
  var termsid = $(".typevalii").val();
  if (senddisc == senddisc1) {
    alert("Please change value..");
    return false;
  }
  $.ajax({
    type: "POST",
    url: base_url3 + "mybidding/match_value_bidding",
    data: {
      sendpid: sendpid,
      senddisc: senddisc,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (data) {
      if (data == 0) {
        alert("This bid is alredy done by another user.");
      }
      if (data == 1) {
        $.ajax({
          type: "POST",
          url: base_url3 + "mybidding/sendupdatedata",
          data: {
            sendid: sendid,
            senddisc: senddisc,
            sendcts: sendcts,
            sendfmt: sendfmt,
            senddiff: senddiff,
            termsid: termsid,
            biltype: biltype,
            // auto_bid: auto_bid
          },
          beforeSend: function () {
            $("#ajaxloaderoverlay").removeClass("is-hide");
          },
          success: function (data) {
            // window.location.reload();
            // console.log(data);
            $("#myyybidingmodel").css("display", "none");
            $("#viperopinthechat").html(data);
            $("#confirmpdatemodel").css("display", "block");
          },
          complete: function () {
            $("#ajaxloaderoverlay").addClass("is-hide");
          },
        });
      }
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

$(document).on("click", "#bnfodhfnduygfd", function () {
  var sendid = $("#cbvtdasagjvtr").data("id");
  var senddiff = $("#cbvtdasagjvtr").data("diff");
  var termsid = $("#cbvtdasagjvtr").data("term-id");
  var biltype = $("#cbvtdasagjvtr").data("bill-type");
  var auto_bid = $("#cbvtdasagjvtr").data("autobid");
  var sendpid = $("#cbvtdasagjvtr").data("pid");

  var senddisc = $("#lastupddisc").html();
  var sendcts = $("#lastupdcts").html();
  var sendfmt = $("#lastychdbs").html();

  $.ajax({
    type: "POST",
    url: base_url3 + "mybidding/updatedata",
    data: {
      sendid: sendid,
      senddisc: senddisc,
      sendcts: sendcts,
      sendfmt: sendfmt,
      senddiff: senddiff,
      termsid: termsid,
      biltype: biltype,
      auto_bid: auto_bid,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (data) {
      window.location.reload();
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

// wishlist page

$(document).on("click", "#addwishlisttpbid", function () {
  var dataid = $(this).data("id");
  var best = $("#wishlistbestrank" + dataid).html();
  $.ajax({
    type: "POST",
    url: base_url3 + "wishlist/mywishlist",
    data: {
      dataid: dataid,
      best: best,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (result) {
      $("#wishlistadddata").html(result);
      $("#mywishlistmodel").css("display", "block");
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

$(document).on("mouseup", ".wishlistbidding", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($min);
  }
  // $(this).val(parseFloat($v1) + parseFloat($step));
});
$(document).on("mousedown", ".wishlistbidding", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($min);
  }
  // $(this).val(parseFloat($v1) - parseFloat($step));
});

$(document).on("change click", ".wishlistbidding", function () {
  var dashid1 = $(this).data("id");
  var dashval1 = $(this).val();
  var maindisc = $(this).data("discount-value");
  var dashcaret1 = $("#mybidcaret" + dashid1).html();
  var dashrapprice1 = $("#mybidrapprice" + dashid1).html();
  var dashtotalprice1 = $("#mybidtotalprice" + dashid1).html();

  var dashviper1 = (parseFloat(dashrapprice1) * parseFloat(dashval1)) / 100;
  var dashmortal1 = parseFloat(dashrapprice1) + parseFloat(dashviper1);
  var dashfamt1 = dashmortal1 * dashcaret1;
  var dashdiffprice1 = parseFloat(maindisc) - parseFloat(dashval1);

  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/matchvalue",
    data: {
      val: dashval1,
      datapercent: maindisc,
      dashid1: dashid1,
    },
    success: function (result) {
      if (result == "1") {
        $("#wishlistcts" + dashid1).html(parseFloat(dashmortal1).toFixed(2));
        $("#wishlistamt" + dashid1).html(parseFloat(dashfamt1).toFixed(2));
        $("#wishlistdiff" + dashid1).html(
          parseFloat(dashdiffprice1).toFixed(2)
        );
        $(".btnaddbidwish").removeAttr("disabled", "disabled");
      }
      if (result == "0") {
        $("#wishlistcts" + dashid1).html("");
        $("#wishlistamt" + dashid1).html("");
        $("#wishlistdiff" + dashid1).html("");
        $(".btnaddbidwish").attr("disabled", "disabled");
        alert("Fill data in range.");
      }
    },
  });
});

$(document).on("keyup", ".wishlistbidding", function () {
  var dashid1 = $(this).data("id");
  var dashval1 = $(this).val();
  var maindisc = $(this).data("discount-value");
  var dashcaret1 = $("#mybidcaret" + dashid1).html();
  var dashrapprice1 = $("#mybidrapprice" + dashid1).html();
  var dashtotalprice1 = $("#mybidtotalprice" + dashid1).html();

  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
  }
  // $(this).val(parseFloat($v1) + parseFloat($step));

  if (dashval1 != "") {
    var dashviper1 = (parseFloat(dashrapprice1) * parseFloat(dashval1)) / 100;
    var dashmortal1 = parseFloat(dashrapprice1) + parseFloat(dashviper1);
    var dashfamt1 = dashmortal1 * dashcaret1;
    var dashdiffprice1 = parseFloat(maindisc) - parseFloat(dashval1);

    $.ajax({
      type: "POST",
      url: base_url3 + "bidingsearch/matchvalue",
      data: {
        val: dashval1,
        datapercent: maindisc,
        dashid1: dashid1,
      },
      success: function (result) {
        if (result == "1") {
          $("#wishlistcts" + dashid1).html(parseFloat(dashmortal1).toFixed(2));
          $("#wishlistamt" + dashid1).html(parseFloat(dashfamt1).toFixed(2));
          $("#wishlistdiff" + dashid1).html(
            parseFloat(dashdiffprice1).toFixed(2)
          );
          $(".btnaddbidwish").removeAttr("disabled", "disabled");
        }
        if (result == "0") {
          $("#wishlistcts" + dashid1).html("");
          $("#wishlistamt" + dashid1).html("");
          $("#wishlistdiff" + dashid1).html("");
          $(".btnaddbidwish").attr("disabled", "disabled");
          alert("Fill data in range.");
        }
      },
    });
  } else {
    $("#wishlistcts" + dashid1).html("");
    $("#wishlistamt" + dashid1).html("");
    $("#wishlistdiff" + dashid1).html("");
    $(".btnaddbidwish").attr("disabled", "disabled");
  }
});

$(document).on("keydown", ".wishlistbidding", function (event) {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
  }
  // $(this).val(parseFloat($v1) - parseFloat($step));
  if (event.which == 13) {
    var dashid1 = $(this).data("id");
    var dashval1 = $(this).val();
    var maindisc = $(this).data("discount-value");
    var dashcaret1 = $("#mybidcaret" + dashid1).html();
    var dashrapprice1 = $("#mybidrapprice" + dashid1).html();
    var dashtotalprice1 = $("#mybidtotalprice" + dashid1).html();

    var dashviper1 = (parseFloat(dashrapprice1) * parseFloat(dashval1)) / 100;
    var dashmortal1 = parseFloat(dashrapprice1) + parseFloat(dashviper1);
    var dashfamt1 = dashmortal1 * dashcaret1;
    var dashdiffprice1 = parseFloat(maindisc) - parseFloat(dashval1);
    $.ajax({
      type: "POST",
      url: base_url3 + "bidingsearch/matchvalue",
      data: {
        val: dashval1,
        datapercent: maindisc,
        dashid1: dashid1,
      },
      success: function (result) {
        if (result == "1") {
          $("#wishlistcts" + dashid1).html(parseFloat(dashmortal1).toFixed(2));
          $("#wishlistamt" + dashid1).html(parseFloat(dashfamt1).toFixed(2));
          $("#wishlistdiff" + dashid1).html(
            parseFloat(dashdiffprice1).toFixed(2)
          );
          $(".btnaddbidwish").removeAttr("disabled", "disabled");
        }
        if (result == "0") {
          $("#wishlistcts" + dashid1).html("");
          $("#wishlistamt" + dashid1).html("");
          $("#wishlistdiff" + dashid1).html("");
          $(".btnaddbidwish").attr("disabled", "disabled");
          alert("Please fill data in range.");
        }
      },
    });
    return false;
  }
});

$(document).on("click", ".btnaddbidwish", function () {
  var conids = [$(".mybiddatamodif").data("id")];
  var skcondisc = $(".wishlistbidding").val();
  var skcondisc1 = $(".wishlistbidding").data("val");
  var condisc = [$(".wishlistbidding").val()];
  var concts = [$(".wishlistcts").html()];
  var confamt = [$(".wishlistamt").html()];
  var condiff = [$(".wishlistdiff").html()];
  var auto_bid = [$(".wishautobid").val()];

  var billtype = $(".billtypevaluee").val();
  var giatype = $(".typevalii").val();
  var igitype = $(".typevalii2").val();
  if (skcondisc == skcondisc1) {
    alert("Please Change value..");
    return false;
  }
  if (
    parseFloat($(".wishautobid").val()) <=
    parseFloat($(".wishlistbidding").val())
  ) {
    alert("Auto Bid cannot be same or less than Bid Discount");
  } else {
    if (condisc != "") {
      $.ajax({
        type: "POST",
        url: base_url3 + "wishlist/match_value_bid",
        data: {
          conids: conids,
          condisc: condisc,
        },
        beforeSend: function () {
          $("#ajaxloaderoverlay").removeClass("is-hide");
        },
        success: function (data) {
          if (data == 0) {
            alert("Please change value.");
          }
          if (data == 1) {
            $.ajax({
              type: "POST",
              url: base_url3 + "bidingsearch/insert_bid_data",
              data: {
                conids: conids,
                condisc: condisc,
                concts: concts,
                confamt: confamt,
                condiff: condiff,
                billtype: billtype,
                giatype: giatype,
                igitype: igitype,
                auto_bid: auto_bid,
              },
              beforeSend: function () {
                $("#ajaxloaderoverlay").removeClass("is-hide");
              },
              success: function (data) {
                window.location.reload();
              },
              complete: function () {
                $("#ajaxloaderoverlay").addClass("is-hide");
              },
            });
          }
          if (data == 2) {
            alert("Stone already Sold...");
          }
        },
        complete: function () {
          $("#ajaxloaderoverlay").addClass("is-hide");
        },
      });
    } else {
      alert("Please Bid Something..");
    }
  }
});

$(document).on("mouseup", ".autobiddisc", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($v1);
  }
});

$(document).on("mousedown", ".autobiddisc", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($v1);
  }
});

$(document).on("click", ".editautobiddata", function () {
  var id = $(this).data("id");
  $.ajax({
    type: "POST",
    url: base_url3 + "mybidding/sendautobidata",
    data: {
      id: id,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (data) {
      $("#mortalmodel").html(data);
      $("#updateautobidmodel").fadeIn();
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

$(document).on("click", "#closeautobidmodel", function () {
  $("#updateautobidmodel").fadeOut();
});

$(document).on("click", "#updateautobiddatabtn", function () {
  var id = $("#oijdnfyfvcc").data("id");
  var value = $(".myupdatebidautod").val();
  $.ajax({
    type: "POST",
    url: base_url3 + "mybidding/updateautobidata",
    data: {
      id: id,
      value: value,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (data) {
      if (data == 0) {
        alert("Bid Discount and Auto Bid cannot be same.");
      }
      if (data == 1) {
        window.location.reload();
      }
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

$(document).on("mouseup", ".myupdatebidautod", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($v1);
  }
});

$(document).on("mousedown", ".myupdatebidautod", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($v1);
  }
});

$(document).on("click", ".search_autobid_edit", function () {
  var id = $(this).data("id");
  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/sendautobidata",
    data: {
      id: id,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (data) {
      $("#search_mortalmodel").html(data);
      $("#search_updateautobidmodel").fadeIn();
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

$(document).on("click", "#search_closeautobidmodel", function () {
  $("#search_updateautobidmodel").fadeOut();
});

$(document).on("click", "#search_updateautobiddatabtn", function () {
  var id = $("#search_oijdnfyfvcc").data("id");
  var value = $(".search_myupdatebidautod").val();
  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/updateautobidata",
    data: {
      id: id,
      value: value,
    },
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (data) {
      if (data == 0) {
        alert("Bid Discount and Auto Bid cannot be same.");
      }
      if (data == 1) {
        var hy = $(".paginate_button.active a").data("dt-idx");
        update_data(hy);
      }
      console.log(data);
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
});

$(document).on("mouseup", ".search_myupdatebidautod", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($v1);
  }
});

$(document).on("mousedown", ".search_myupdatebidautod", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($v1);
  }
});

// bidding confirm-e-bid

$(document).on("mouseup", ".autobiddischas", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($v1);
  }
});

$(document).on("mousedown", ".autobiddischas", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
    $(this).val($v1);
  }
});

$(document).on("keyup change", ".autobiddischas", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
  }
  var dash_id = $(this).data("id");
  $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/fetch_match_autobid",
    data: {
      val: $v1,
      dash_id: dash_id,
      datapercent: $min,
    },
    success: function (result) {
      if (result == 0) {
        $("#autobiddischas" + dash_id).css("background", "rgb(255 105 105)");
        $("#confirmbidusof").attr("disabled", "disabled");
        $.ajax({
          type: "POST",
          url: base_url3 + "bidingsearch/autobid_matchvalue",
          data: {
            val: $v1,
            dash_id: dash_id,
            datapercent: $min,
          },
          success: function (result) {
            if (result == 0) {
              $("#autobiddischas" + dash_id).css(
                "background",
                "rgb(255 105 105)"
              );
              $("#confirmbidusof").attr("disabled", "disabled");
            }
            if (result == 1) {
              $("#autobiddischas" + dash_id).css("background", "transparent");
              $("#confirmbidusof").removeAttr("disabled", "disabled");
            }
          },
        });
      }
      if (result == 1) {
        $("#autobiddischas" + dash_id).css("background", "rgb(255 105 105)");
        $("#confirmbidusof").attr("disabled", "disabled");
      }
    },
  });
});

$(document).on("keyup change", ".search_myupdatebidautod", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
  }
  var dash_id = $(this).data("id");
  if (xhr) {
    xhr.abort();
  }
  xhr = $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/fetch_match_autobid",
    data: {
      val: $v1,
      dash_id: dash_id,
      datapercent: $min,
    },
    success: function (result) {
      if (result == 0) {
        if (xhr1) {
          xhr1.abort();
        }
        xhr1 = $.ajax({
          type: "POST",
          url: base_url3 + "bidingsearch/autobid_matchvalue",
          data: {
            val: $v1,
            dash_id: dash_id,
            datapercent: $min,
          },
          success: function (result) {
            if (result == 0) {
              $(".search_myupdatebidautod").css(
                "background",
                "rgb(255 105 105)"
              );
              $("#search_updateautobiddatabtn").attr("disabled", "disabled");
            }
            if (result == 1) {
              $(".search_myupdatebidautod").css("background", "transparent");
              $("#search_updateautobiddatabtn").removeAttr(
                "disabled",
                "disabled"
              );
            }
          },
        });
      }
      if (result == 1) {
        $(".search_myupdatebidautod").css("background", "rgb(255 105 105)");
        $("#search_updateautobiddatabtn").attr("disabled", "disabled");
      }
    },
  });
});

$(document).on("keyup change", ".myupdatebidautod", function () {
  $v1 = $(this).val();
  $min = $(this).attr("min");
  $step = $(this).attr("step");
  if (!$v1) {
    $v1 = $min;
  }
  var dash_id = $(this).data("id");
  var datapercent = $(this).data("discount-value");
  if (xhr) {
    xhr.abort();
  }
  xhr = $.ajax({
    type: "POST",
    url: base_url3 + "bidingsearch/fetch_match_autobid",
    data: {
      val: $v1,
      dash_id: dash_id,
      datapercent: $min,
    },
    success: function (result) {
      if (result == 0) {
        if (xhr1) {
          xhr1.abort();
        }
        xhr1 = $.ajax({
          type: "POST",
          url: base_url3 + "bidingsearch/autobid_matchvalue",
          data: {
            val: $v1,
            dash_id: dash_id,
            datapercent: $min,
          },
          success: function (result) {
            if (result == 0) {
              $(".myupdatebidautod").css("background", "rgb(255 105 105)");
              $("#updateautobiddatabtn").attr("disabled", "disabled");
            }
            if (result == 1) {
              $(".myupdatebidautod").css("background", "transparent");
              $("#updateautobiddatabtn").removeAttr("disabled", "disabled");
            }
          },
        });
      }
      if (result == 1) {
        $(".myupdatebidautod").css("background", "rgb(255 105 105)");
        $("#updateautobiddatabtn").attr("disabled", "disabled");
      }
    },
  });

  // $.ajax({
  //     type: "POST",
  //     url: base_url3 + "bidingsearch/autobid_matchvalue",
  //     data: {
  //         val: $v1,
  //         dash_id: dash_id,
  //         datapercent: $min
  //     },
  //     success: function(result) {
  //         if (result == 0) {
  //             $('.myupdatebidautod').css('background', 'rgb(255 105 105)');
  //             $('#updateautobiddatabtn').attr('disabled', 'disabled');
  //         }
  //         if (result == 1) {
  //             $('.myupdatebidautod').css('background', 'transparent');
  //             $('#updateautobiddatabtn').removeAttr('disabled', 'disabled');
  //         }
  //     },
  // });
});

// var hy = $(".paginate_button.active a").data("dt-idx");
//             update_data(hy);

$(document).on("click", "#refreshbiddingall", function () {
  $("#ajaxloaderoverlay").addClass("is-hide");
  var hy = $(".paginate_button.active a").data("dt-idx");
  update_data(hy);
});

$(document).on("click", "#refreshinventoryall", function () {
  $("#ajaxloaderoverlay").addClass("is-hide");
  var hy = $(".paginate_button.active a").data("dt-idx");
  update_inventory_data(hy);
});

function update_inventory_data(page = "") {
  var var_form_data = $("#search_form").serialize();
  $.ajax({
    type: "POST",
    url: base_url3 + "diamondsearch",
    data: var_form_data,
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (result) {
      $("#ajaxloaderoverlay").addClass("is-hide");
      //alert(result)

      $("#table_cont").html(result);
      // console.log($('#invtable tbody tr').length);
      // table_cont visible
      $("#table_cont1").css("display", "block");
      $("#search_form").css("display", "none");
      $("#currencyFilter").css("display", "block");

      //$('#invtable').DataTable();
      //invTable();
      var table11 = $("#invtable").DataTable({
        searching: false,
        lengthChange: false,
        scrollY: 410,
        scrollX: true,
        pageLength: 30,
        aoColumnDefs: [
          {
            bSortable: false,
            aTargets: [0],
          },
        ],
      });
      table11.page(parseInt(page) - parseInt(1)).draw(false);
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
}

$(document).on("click", "#huibsghggg_bcudvs", function () {
  $.ajax({
    type: "POST",
    url: base_url3 + "contact/home_inquiry",
    data: $("#homeinquiryform").serialize(),
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (data) {
      if (data == 1) {
        $(".errroebcdsgsd").html("Subscribed successfully!!");
        $("input").val("");
        $(".skdfhi1").fadeIn();
        $(".skdfhi").hide();
      } else {
        $(".errroebcdsgsd").html("Something wrong...!");
      }
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
  return false;
});
