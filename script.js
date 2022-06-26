var n = [], td, list = [], stuArr = [];

$(function(){
  $(document).on('click', '.start01', function(event) {
    $(this).attr("style", "display:none");
    var ids = parseInt($(this).attr('id').substring(5));
    $("#stop" + ids).attr("style", "display:block")
    td = setInterval(function () 
    {
      n[ids]++;
      var m = parseInt(n[ids] / 3600)
      var s = parseInt(n[ids] / 60 % 60);
      var M = parseInt(n[ids] % 60);
      $("#display" + ids).html(toDub(m) + ":" + toDub(s) + ":" + toDub(M))
    }, 1000 / 60);
    return list.push({"ids":ids,"time":td});
  });

  $(document).on('click', '.stop01', function(event) {
    $(this).attr("style", "display:none");
    var ids = parseInt($(this).attr('id').substring(4));
    $("#start" + ids).attr("style", "display:block");
  
    $.each(list, function(index, val) {
       if(ids == val.ids){
        clearInterval(val.time);
       }
    });
  });
  
  $(document).on('click', '.reset01', function(event) {
    var ids = parseInt($(this).attr('id').substring(5));
    $("#start" + ids).attr("style", "display:block")
    $("#stop" + ids).attr("style", "display:none")
    $.each(list, function(index, val) {
      if(ids == val.ids){
       clearInterval(val.time);
      }
   });
    $("#display" + ids).html("00:00:00")
    n[ids] = 0
  });
})

function addStu() {
  l = $("#stuAddList").attr("len")
  $("#stuAddList").after('<div class="col-sm-8" id="stuDiv' + l + '"><div class="input-group has-validation"><div class="input-group"><span class="input-group-text">学生姓名</span><input type="text" class="form-control" id="username' + l + '"></div></div></div><div class="col-sm-3" id="stuDel' + l + '"><button type="button" onclick="delStu(this)" class="btn btn-outline-danger" id="del' + l + '">删除</button></div>') 
  $("#stuAddList").attr("len", parseInt(l) + 1)
}

function delStu(temp) {
  id = temp.id.substring(3)
  $("#stuDiv" + id).remove()
  $("#stuDel" + id).remove()
}

function addAllStu() {
  n = []
  stuArr = []
  l = $("#stuAddList").attr("len")
  
  for(let i = 0; i < parseInt(l) + 1; i++) {
    stuName = $("#username" + i).val()
    if(stuName != null && stuName != "") {
      stuArr.push(stuName)
      n.push(0)
    }  
  }
  getAllStuTime(stuArr)
}

function getAllStuTime(stuArr) {
  $("#showStuTime").empty()
  for(let i = 0, len = stuArr.length; i < len; i++) {
    $("#showStuTime").append('<div class="col"><div class="card shadow-sm"><h2 style="margin:0px auto;">' + stuArr[i] + '</h2><div style="margin:0px auto;"><h1 id="display' + i + '">00:00:00</h1></div><div class="card-body" style="margin:0px auto;"><div class="d-flex justify-content-between align-items-center"><div class="btn-group" role="group" aria-label="Basic outlined example"><button type="button" class="btn btn-outline-success start01" style="display:block" id="start' + i + '"><i class="bi bi-play"></i> 开始</button><button type="button" class="btn btn-outline-warning stop01" style="display:none" id="stop' + i + '"><i class="bi bi-pause"></i> 暂停</button><button type="button" class="btn btn-outline-danger reset01" id="reset' + i + '"><i class="bi bi-stop-fill"></i> 重置</button></div></div></div></div></div>')
  }
  allstop()
}

function toDub(n){
  return n < 10 ? "0" + n : "" + n
}

function allstart() {
  $(".start01").attr("style", "display:none");
  $(".stop01").attr("style", "display:block");
  for(let i = 0, len = stuArr.length; i < len; i++) {
    td = setInterval(function () 
    {
      n[i]++;
      var m = parseInt(n[i] / 3600)
      var s = parseInt(n[i] / 60 % 60);
      var M = parseInt(n[i] % 60);
      $("#display" + i).html(toDub(m) + ":" + toDub(s) + ":" + toDub(M))
    }, 1000 / 60);
    list.push({"ids":i,"time":td});
  }
}

function allstop() {
  $(".start01").attr("style", "display:block");
  $(".stop01").attr("style", "display:none");
  $.each(list, function(index, val) {
    clearInterval(val.time);
  });
}

function allreset() {
  $(".start01").attr("style", "display:block");
  $(".stop01").attr("style", "display:none");
  $.each(list, function(index, val) {
    clearInterval(val.time);
  });
  for(let i = 0, len = stuArr.length; i < len; i++) {
    $("#display" + i).html("00:00:00")
    n[i] = 0
  }
}

function loadStuList() {
  $(".col-sm-8").remove()
  for(let i = 0, len = stuArr.length; i < len; i++) {
    $("#stuAddList").after('<div class="col-sm-8" id="stuDiv' + i + '"><div class="input-group has-validation"><div class="input-group"><span class="input-group-text">学生姓名</span><input type="text" class="form-control" id="username' + i + '"></div></div></div><div class="col-sm-3" id="stuDel' + i + '"><button type="button" onclick="delStu(this)" class="btn btn-outline-danger" id="del' + i + '">删除</button></div>') 
  }
  for(let i = 0, len = stuArr.length; i < len; i++) {
    $("#username" + i).val(stuArr[i])
  }
}