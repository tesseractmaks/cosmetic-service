var st = document.createElement("link");
st.setAttribute("rel","stylesheet");
st.setAttribute("href","callme/callme.css");
document.body.appendChild(st);

$(function(){
$("#viewform").click(function(){
        $("#callmeform").slideToggle("slow");
    });

$("#viewform").hover(
  function () {
    $(this).addClass("callmeform_hover");
  },
  function () {
    $(this).removeClass("callmeform_hover");
  }
);

});

function show()
{
     $.ajax({
       type: "GET",
       url: "send.php",
       data: {cphone: $("#cphone").val(), cname: $("#cname").val()},
       success: function(html){
           $("#callme_result").html(html);
           setTimeout( function(){ $("#callme_result").slideToggle("slow"); }, 3000);
       }
     });
}

$(document).ready(function(){
    $(".btn").click(function(){
        show();
    });
});