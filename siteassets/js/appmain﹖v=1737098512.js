$(window).load(function () {
  $(".loader").fadeOut("slow");
});

$(document).ready(function () {
  //haresh poriya  background-color:orange;
  // document.getElementById('myModal4').style.display = "block";

  $(".haresh,.mr1per select").on("click change", function () {
    var maintype = $(".giventypethis").data("type");
    // console.log(maintype);
    //$(".haresh").click(function(){
    //$(document).bind('click', ".haresh", function() {
    var rowid = $(this).attr("rowid");
    var valid = $(this).attr("valid");
    //alert(typeof rowid)

    if (rowid == "normal" || typeof rowid == "undefined") {
      $(this).addClass("hareshactive");
      $(this).attr("rowid", "clicked");
      //$('#'+valid).attr('checked','checked');
      $("#" + valid).prop("checked", true);
    } else {
      $(this).removeClass("hareshactive");
      $(this).attr("rowid", "normal");
      //$('#'+valid).removeAttr('checked');
      $("#" + valid).prop("checked", false);
    }

    if (maintype == "1") {
      var var_form_data1 = $("#search_form").serialize();
      $.ajax({
        type: "POST",
        url: siteHost + "inventorycount",
        data: var_form_data1,
        beforeSend: function () {
          $("#countdiamondmsg1").addClass("loading");
          $("#cabyaaaas1").addClass("loaderifdd");
          $("#bidddmsgyyy1").html("Please Wait..");
        },
        success: function (data) {
          if (data >= 500) {
            $("a#viewButton.viewbtnminefor").css({
              "pointer-events": "none",
              opacity: "0.8",
            });
            $("#countdiamondmsg1").addClass("error");
            $("#countdiamondmsg1").removeClass("success");
            $("#bidddmsgyyy1").html(
              "(More than 500 Diamonds Found. Please narrow the search criteria.)"
            );
          } else {
            $("a#viewButton.viewbtnminefor").css({
              "pointer-events": "unset",
              opacity: "1",
            });
            $("#countdiamondmsg1").addClass("success");
            $("#countdiamondmsg1").removeClass("error");
            $("#bidddmsgyyy1").html("(" + data + " Diamonds Found)");
          }
          if ($(".haresh").hasClass("hareshactive")) {
          } else {
            $("#bidddmsgyyy1").html("");
          }
        },
        complete: function () {
          $("#countdiamondmsg1").removeClass("loading");
          $("#cabyaaaas1").removeClass("loaderifdd");
        },
      });
    }

    //$(this).addClass('hareshactive');

    if (maintype == "2") {
      var var_form_data = $("#search_form1").serialize();
      $.ajax({
        type: "POST",
        url: siteHost + "biddingcount",
        data: var_form_data,
        beforeSend: function () {
          $("#countdiamondmsg").addClass("loading");
          $("#cabyaaaas").addClass("loaderifdd");
          $("#bidddmsgyyy").html("Please Wait..");
        },
        success: function (data) {
          // console.log(data);
          if (data >= 500) {
            $("a#viewButton1.viewbtnminefor").css({
              "pointer-events": "none",
              opacity: "0.8",
            });
            $("#countdiamondmsg").addClass("error");
            $("#countdiamondmsg").removeClass("success");
            $("#bidddmsgyyy").html(
              "(More than 500 Diamonds Found. Please narrow the search criteria.)"
            );
          } else {
            $("a#viewButton1.viewbtnminefor").css({
              "pointer-events": "unset",
              opacity: "1",
            });
            $("#countdiamondmsg").addClass("success");
            $("#countdiamondmsg").removeClass("error");
            $("#bidddmsgyyy").html("(" + data + " Diamonds Found)");
          }
          if ($(".haresh").hasClass("hareshactive")) {
          } else {
            $("#bidddmsgyyy").html("");
          }
        },
        complete: function () {
          $("#countdiamondmsg").removeClass("loading");
          $("#cabyaaaas").removeClass("loaderifdd");
        },
      });
    }
  });

  /*$('.hareshactive').on('click', function() {
    //$(".hareshactive").click(function(){
    //$(document).bind('click', ".hareshactive", function() {
    	$(this).removeClass('hareshactive');
    	$(this).addClass('haresh');
    });*/

  $("#example").DataTable();
});

function s1() {
  //alert('jjj');

  $("#stock_id").val("");
  $("table#stable tbody").html("");

  //var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  //var checkboxes = document.querySelectorAll('input[name="s1"]');

  var checkboxes = document.getElementsByClassName("s1check");

  if (document.getElementById("checkAll").checked) {
    var stockdata = "";
    var courbt = 0;

    for (var i = 0; i < checkboxes.length; i++) {
      //if (checkboxes[i] != source)
      checkboxes[i].checked = true;
      if (i > -1 && checkboxes[i].checked) {
        courbt = parseInt(courbt) + parseInt(1);
        var record = checkboxes[i].value;
        var recordData = record.split("||");
        var stockid = recordData[0];
        var shape = recordData[1];
        var carat = recordData[2];
        var diameter = recordData[3];
        var color = recordData[4];
        var certif = recordData[5];
        var rap = recordData[6];
        var discount = recordData[7];
        var Price = recordData[8];
        var totalPrice = recordData[9];
        stockdata += stockid + ",";

        var markup =
          "<tr>" +
          '<td style="color:#000; font-size:13px;">' +
          parseInt(courbt) +
          "</td>" +
          '<td style="color:#000; font-size:13px;">' +
          stockid +
          "</td>" +
          '<td style="color:#000; font-size:13px;">' +
          shape +
          "</td>" +
          '<td style="color:#000; font-size:13px;">' +
          color +
          "</td>" +
          '<td style="color:#000; font-size:13px;">' +
          diameter +
          "</td>" +
          '<td style="color:#000; font-size:13px;">' +
          carat +
          "</td>" +
          '<td style="color:#000; font-size:13px;">' +
          certif +
          "</td>" +
          '<td style="color:#000; font-size:13px;">' +
          rap +
          "</td>" +
          '<td style="color:#000; font-size:13px;">' +
          discount +
          "</td>" +
          '<td style="color:#000; font-size:13px;">' +
          Price +
          "</td>" +
          '<td style="color:#000; font-size:13px;">' +
          totalPrice +
          "</td>" +
          "</tr>";
        $("table#stable tbody").append(markup);
      }
    }
    $("#stock_id").val(stockdata);
  } else {
    for (var i = 0; i < checkboxes.length; i++) {
      //if (checkboxes[i] != source)
      checkboxes[i].checked = false;
    }
    //empty
    $("#stock_id").val("");
    $("table#stable tbody").html("");
  }
}

function s100(thisData) {
  //alert(thisData);

  var thisRecordData = thisData.split("||");
  $("#stock_id").val("");
  $("table#stable tbody").html("");

  //var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  //var checkboxes = document.querySelectorAll('input[name="s1"]');
  var checkboxes = document.getElementsByClassName("s1check");

  /*if(document.getElementById('checkAll').checked)
    {*/

  var stockdata = "";
  var courbt = 0;
  for (var i = 0; i < checkboxes.length; i++) {
    //if (checkboxes[i] != source)
    //console.log(checkboxes.checked);
    //alert(checkboxes[i].checked + " => " + i)

    if (i > -1 && checkboxes[i].checked) {
      var record = checkboxes[i].value;
      var recordData = record.split("||");
      var stockid = recordData[0];

      //alert(thisRecordData[0]+ " => " + stockid )
      /*if( thisRecordData[0] != stockid )
            {*/
      //alert('if')
      courbt = parseInt(courbt) + parseInt(1);
      checkboxes[i].checked = true;
      var shape = recordData[1];
      var carat = recordData[2];
      var diameter = recordData[3];
      var color = recordData[4];
      var certif = recordData[5];
      var rap = recordData[6];
      var discount = recordData[7];
      var Price = recordData[8];
      var totalPrice = recordData[9];
      stockdata += stockid + ",";

      var markup =
        "<tr>" +
        '<td style="color:#000; font-size:13px;">' +
        parseInt(courbt) +
        "</td>" +
        '<td style="color:#000; font-size:13px;">' +
        stockid +
        "</td>" +
        '<td style="color:#000; font-size:13px;">' +
        shape +
        "</td>" +
        '<td style="color:#000; font-size:13px;">' +
        color +
        "</td>" +
        '<td style="color:#000; font-size:13px;">' +
        diameter +
        "</td>" +
        '<td style="color:#000; font-size:13px;">' +
        carat +
        "</td>" +
        '<td style="color:#000; font-size:13px;">' +
        certif +
        "</td>" +
        '<td style="color:#000; font-size:13px;">' +
        rap +
        "</td>" +
        '<td style="color:#000; font-size:13px;">' +
        discount +
        "</td>" +
        '<td style="color:#000; font-size:13px;">' +
        Price +
        "</td>" +
        '<td style="color:#000; font-size:13px;">' +
        totalPrice +
        "</td>" +
        "</tr>";

      $("table#stable tbody").append(markup);
      //}
    }
  }
  $("#stock_id").val(stockdata);

  /*}
    else
    {
    	for (var i = 0; i < checkboxes.length; i++) {
    	//if (checkboxes[i] != source)
    		checkboxes[i].checked = false;
    	}
    	//empty
    	$('#stock_id').val('');
    	$("table#stable tbody").html('');
    }*/
}

//$('#bu1').click(function() {

$("body").delegate("#bu1,.close", "click", function () {
  document.getElementById("myModal").style.display = "none";
});

//$('#bu2').click(function() {
$("body").delegate("#bu2,.close1", "click", function () {
  document.getElementById("myModal1").style.display = "none";
});

$("body").delegate("#btnCan,.close", "click", function () {
  document.getElementById("myModal3").style.display = "none";
});

$("body").delegate("#myBtn", "click", function () {
  document.getElementById("myModal").style.display = "block";
});

$("body").delegate("#myBtn3", "click", function () {
  document.getElementById("myModal3").style.display = "block";
});

//$('#myBtn1').click(function() {
$("body").delegate("#myBtn1", "click", function () {
  document.getElementById("myModal1").style.display = "block";
});

$("body").delegate("#viewButton", "click", function () {
  var var_form_data = $("#search_form").serialize();
  //alert(var_form_data)
  //var_form_data = "<?php echo $para; ?> ";
  $.ajax({
    type: "POST",
    url: siteHost + "diamondsearch",
    data: var_form_data,
    beforeSend: function () {
      $("#ajaxloaderoverlay").removeClass("is-hide");
    },
    success: function (result) {
      $("#ajaxloaderoverlay").addClass("is-hide");
      //alert(result)
      $("#table_cont").html(result);
      // table_cont visible
      $("#table_cont").css("display", "block");
      $("#search_form").css("display", "none");
      $("#currencyFilter").css("display", "block");
      //$('#invtable').DataTable();
      //invTable();
      $("#ajaxloaderoverlay").addClass("is-hide");
      var table10 = $("#invtable").DataTable({
        searching: false,
        lengthChange: false,
        scrollY: 410,
        scrollX: true,
        pageLength: 50,
        aoColumnDefs: [
          {
            bSortable: false,
            aTargets: [0],
          },
        ],
      });
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
    },
  });
  $("#ajaxloaderoverlay").addClass("is-hide");
});

//search_btn

$("body").delegate("#search_btn", "click", function () {
  $("#table_cont").css("display", "none");
  $("#search_form").css("display", "block");
  $("#currencyFilter").css("display", "none");
});

$("body").delegate("#viewButton1", "click", function () {
  var var_form_data = $("#search_form1").serialize();

  //alert(var_form_data)
  //var_form_data = "<?php echo $para; ?> ";

  $.ajax({
    type: "POST",
    url: siteHost + "bidingsearch",
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
        pageLength: 50,
        aoColumnDefs: [
          {
            bSortable: false,
            aTargets: [0],
          },
        ],
      });
      $("#ajaxloaderoverlay").addClass("is-hide");
      $("#invtable_wrapper th:nth-child(3)").click();
    },
    complete: function () {
      $("#ajaxloaderoverlay").addClass("is-hide");
      $("#invtable_wrapper th:nth-child(3)").click();
    },
  });

  $("#invtable_wrapper th:nth-child(3)").click();
});

$("body").delegate("#search_btn1", "click", function () {
  $("#table_cont1").css("display", "none");
  $("#search_form1").css("display", "block");
  $("#currencyFilter1").css("display", "none");
});

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal

if (btn) {
  btn.onclick = function () {
    modal.style.display = "block";
  };
}

// When the user clicks on <span> (x), close the modal
if (span) {
  span.onclick = function () {
    modal.style.display = "none";
  };
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Get the modal
var modal1 = document.getElementById("myModal1");
// Get the button that opens the modal

var btn = document.getElementById("myBtn1");

// Get the <span> element that closes the modal

var span = document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal

if (btn) {
  btn.onclick = function () {
    modal1.style.display = "block";
  };
}

// When the user clicks on <span> (x), close the modal

if (span) {
  span.onclick = function () {
    modal1.style.display = "none";
  };
}

// When the user clicks anywhere outside of the modal, close it

window.onclick = function (event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
};

//m3

// Get the modal

var modal3 = document.getElementById("myModal3");

// Get the button that opens the modal

var btn = document.getElementById("myBtn3");

// Get the <span> element that closes the modal

var span = document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal

if (btn) {
  btn.onclick = function () {
    modal3.style.display = "block";
  };
}

// When the user clicks on <span> (x), close the modal

if (span) {
  span.onclick = function () {
    modal3.style.display = "none";
  };
}

// When the user clicks anywhere outside of the modal, close it

window.onclick = function (event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
};

function trimSpace(x) {
  var emptySpace = / /g;

  var trimAfter = x.replace(emptySpace, "");

  return trimAfter;
}

function emailValidate(incomingString, defaultValue) {
  if (
    trimSpace(incomingString).length == 0 ||
    incomingString.search(
      /[\_\-\d]*[A-Za-z]+[\w\_\-]*[\@][\d]*[A-Za-z]+[\w\-]*[\.][A-Za-z]+/g
    ) == -1 ||
    incomingString == defaultValue
  ) {
    return false;
  } else {
    return true;
  }
}

function buyRequest() {
  //alert('dfgdfg');

  var siteurl = siteHost;

  var name = jQuery("#name").val();

  //alert(name);

  var Mobile_No = jQuery("#Mobile_No").val();

  var City = jQuery("#City").val();

  var email = jQuery("#email").val();

  var Details = jQuery("#Details").val();

  if (name == "") {
    alert("Please enter your name");

    jQuery("#name").focus();

    return false;
  }

  if (Mobile_No == "") {
    alert("Please enter mobile");

    jQuery("#Mobile_No").focus();

    return false;
  }

  if (isNaN(Mobile_No)) {
    alert("Enter the valid Mobile Number.");

    document.getElementById("Mobile_No").focus();

    return false;
  }

  if (
    document.getElementById("Mobile_No").value.length < 10 ||
    document.getElementById("Mobile_No").value.length > 10
  ) {
    alert("Your Mobile Number must be 1 to 10 Integers");

    document.getElementById("Mobile_No").focus();

    return false;
  }

  if (City == "") {
    alert("Please enter your City");

    jQuery("#City").focus();

    return false;
  }

  if (email == "") {
    alert("Please enter your email");

    jQuery("#email").focus();

    return false;
  }

  if (email != "" && !emailValidate(email)) {
    alert("Please enter a valid E-mail ID");

    jQuery("#email").focus();

    return false;
  }

  if (Details == "") {
    alert("Please enter your Details");

    jQuery("#Details").focus();

    return false;
  } else {
    var aFormData = jQuery("#buyReqForm").serialize();

    var url = siteurl + "ajax/addBuyRequest";

    //$('#casteBox').html(ajaxLoader6);

    jQuery.ajax({
      url: url,

      data: aFormData,

      cache: false,

      type: "POST",

      success: function (response) {
        alert(response);

        if (response == "Buy Request sent successfully.") {
          document.getElementById("buyReqForm").reset();
        }
      },
    });
  }
}

function stockQueryRequest() {
  //alert('dfgdfg');

  var siteurl = siteHost;

  var name = jQuery("#name1").val();

  //alert(name);

  var Mobile_No = jQuery("#Mobile_No1").val();

  var City = jQuery("#City1").val();

  var email1 = jQuery("#email1").val();

  var Details = jQuery("#Details1").val();

  var stock_id = jQuery("#stock_id").val();

  if (stock_id == "") {
    alert("Please choose your stock");

    return false;
  }

  if (name == "") {
    alert("Please enter your name");

    jQuery("#name1").focus();

    return false;
  }

  if (Mobile_No == "") {
    alert("Please enter mobile");

    jQuery("#Mobile_No1").focus();

    return false;
  }

  if (isNaN(Mobile_No)) {
    alert("Enter the valid Mobile Number.");

    document.getElementById("Mobile_No1").focus();

    return false;
  }

  if (
    document.getElementById("Mobile_No1").value.length < 10 ||
    document.getElementById("Mobile_No1").value.length > 10
  ) {
    alert("Your Mobile Number must be 1 to 10 Integers");

    document.getElementById("Mobile_No1").focus();

    return false;
  }

  if (City == "") {
    alert("Please enter your City");

    jQuery("#City1").focus();

    return false;
  }

  if (email1 == "") {
    alert("Please enter your email");

    jQuery("#email1").focus();

    return false;
  }

  if (email1 != "" && !emailValidate(email1)) {
    alert("Please enter a valid E-mail ID");

    jQuery("#email1").focus();

    return false;
  }

  if (Details == "") {
    alert("Please enter your Details");

    jQuery("#Details1").focus();

    return false;
  } else {
    var aFormData = jQuery("#stockQueryReqForm").serialize();

    var url = siteurl + "ajax/addStockQuery";

    //$('#casteBox').html(ajaxLoader6);

    jQuery.ajax({
      url: url,

      data: aFormData,

      cache: false,

      type: "POST",

      success: function (response) {
        alert(response);

        if (response == "Stock Query Request sent successfully.") {
          document.getElementById("buyReqForm").reset();
        }
      },
    });
  }
}

/*jQuery(document).ready(function() {


    


} );*/

function invTable() {
  var table10 = $("#invtable").DataTable({
    searching: false,

    lengthChange: false,

    scrollY: 410,

    scrollX: true,

    pageLength: 50,

    aoColumnDefs: [
      {
        bSortable: false,

        aTargets: [0],
      },
    ],
  });
}

function f10() {
  var v1 = jQuery("#adv-search").attr("valid");

  if (v1 == "adv") {
    jQuery("#adv-search").css("display", "block");

    jQuery("#adv-search").attr("valid", "basic");

    jQuery("#sp").text("Hide Advanced Options");
  } else {
    jQuery("#adv-search").css("display", "none");

    jQuery("#adv-search").attr("valid", "adv");

    jQuery("#sp").text("Show Advanced Options");
  }
}

function selectSize() {
  //alert('hi')

  //var checkboxes = document.querySelectorAll('input[name="caratOption"]');

  var checkboxes = document.getElementsByClassName("caratOption");

  var f1 = "";

  var t1 = "";

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      var rowNum = checkboxes[i].value;

      //alert(record)	//txtfromID19 //txttoID19

      f1 += jQuery("#txtfromID" + rowNum).val() + ",";

      t1 += jQuery("#txttoID" + rowNum).val() + ",";

      //var recordData = record.split('||');
    }
  }

  //f1 = f1.substring(0, f1.length-1);

  //t1 = t1.substring(0, t1.length-1);

  jQuery("#fromvalue").val(f1);

  jQuery("#tovalue").val(t1);

  document.getElementById("myModal3").style.display = "none";

  //var checkboxes = document.getElementsByName('caratOption');

  /*for (var i = 0; i < checkboxes.length; i++) {


    	if( checkboxes[i].checked )


    	{	


    		var rowNum = checkboxes[i].value;


    		//alert(record)	//txtfromID19 //txttoID19			


    		var f1 = jQuery('#txtfromID' + rowNum).val();


    		var t1 = jQuery('#txttoID' + rowNum).val();


    		//var recordData = record.split('||');


    		jQuery('#fromvalue').val(f1);


    		jQuery('#tovalue').val(t1);


    		document.getElementById('myModal3').style.display = "none";


    	}


    }*/
}
