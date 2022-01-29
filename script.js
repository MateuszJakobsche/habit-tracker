//habitModify
var btnOpenModifyWin = $(".js-openHabitModify");
var btnCloseModifyWin = $(".js-closeHabitModify");
var btnDeleteModifyWin = $(".js-deleteHabitModify");
var btnSaveModifyWin = $(".js-saveHabitModify");

var modifyWin = $(".js-habitModify");

function closeModifyWin() {
  modifyWin.removeClass("isVisible");
  $("body").removeClass("overlay");
}

btnOpenModifyWin.on("click", function() {
  modifyWin.addClass("isVisible");
  $("body").addClass("overlay");
});

btnCloseModifyWin.on("click", function() {
  closeModifyWin();
});

btnDeleteModifyWin.on("click", function() {
  var inputName = $("input[name=name]").val();
  
  let habits = localStorage.getItem("habitlist");
  let test = 0;
  for (let i = 0; i < habitList.getInstance().ListOfHabits.length; i++ ){
    if (habitList.getInstance().ListOfHabits[i] == inputName){
      if(habits.startsWith(inputName)){
        habits = habits.replace(inputName + "\n",'');
      }
      else{
        habits = habits.replace("\n" + inputName,'');
      }
      localStorage.setItem("habitlist", habits);
      location.reload();
      test = 1;
    }
  }
  if(test == 0){
    alert(inputName + " habit doesn't exist\nperhaps there is a typo?");
  }
});

btnSaveModifyWin.on("click", function() {
  var inputName = $("input[name=name]").val();
  
  let habits = localStorage.getItem("habitlist") + "\n" + inputName;
  localStorage.setItem("habitlist", habits);
  location.reload();
});

//global variables
var monthEl = $(".c-main");
var dataCel = $(".c-cal__cel");
var dateObj = new Date();

var todayBtn = $(".c-today__btn");
var addBtn = $(".js-event__add");
var saveBtn = $(".js-event__save");
var closeBtn = $(".js-event__close");
var winCreator = $(".js-event__creator");
var inputDate = $(this).data();

function formatDate() {
  var formatDateObj = new Date(),
  formatMonth = '' + (formatDateObj.getMonth() + 1),
  formatDay = '' + formatDateObj.getDate(),
  formatYear = formatDateObj.getFullYear();

  if (formatMonth.length < 2) 
  formatMonth = '0' + formatMonth;
  if (formatDay.length < 2) 
  formatDay = '0' + formatDay;

  return [formatYear, formatMonth, formatDay].join('-');
}

today = formatDate();
// ------ functions control -------

//button of the current day
todayBtn.on("click", function() {
  if (month < indexMonth) {
    var step = indexMonth - month;
    movePrev(step, true);
  } else if (month > indexMonth) {
    var step = month - indexMonth;
    moveNext(step, true);
  }
});

//higlight the cel of current day
dataCel.each(function() {
  if ($(this).data("day") === today) {
    $(this).addClass("isToday");
    fillEventSidebar($(this));
  }
});

//window event creator
addBtn.on("click", function() {
  winCreator.addClass("isVisible");
  $("body").addClass("overlay");
  dataCel.each(function() {
    if ($(this).hasClass("isSelected")) {
      today = $(this).data("day");
      document.querySelector('input[type="date"]').value = today;
    } else {
      document.querySelector('input[type="date"]').value = today;
    }
  });
});
closeBtn.on("click", function() {
  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
});
saveBtn.on("click", function() {
  var inputName = $("input[name=name]").val();
  var inputDate = $("input[name=date]").val();
  var inputNotes = $("textarea[name=notes]").val();
  var inputTag = $("select[name=tags]")
    .find(":selected")
    .text();

  dataCel.each(function() {
    if ($(this).data("day") === inputDate) {
      if (inputName != null) {
        $(this).attr("data-name", inputName);
      }
      if (inputNotes != null) {
        $(this).attr("data-notes", inputNotes);
      }
      $(this).addClass("event");
      if (inputTag != null) {
        $(this).addClass("event--" + inputTag);
      }
      fillEventSidebar($(this));
    }
  });

  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
  $("#addEvent")[0].reset();
});

//fill sidebar event info
function fillEventSidebar(self) {
  $(".c-aside__event").remove();
  var thisName = self.attr("data-name");
  var thisNotes = self.attr("data-notes");
  var thisImportant = self.hasClass("event--important");
  var thisBirthday = self.hasClass("event--birthday");
  var thisFestivity = self.hasClass("event--festivity");
  var thisEvent = self.hasClass("event");
  
  switch (true) {
    case thisImportant:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--important'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
    case thisBirthday:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--birthday'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
    case thisFestivity:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--festivity'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
    case thisEvent:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event'>" +
        thisName +
        " <span> • " +
        thisNotes +
        "</span></p>"
      );
      break;
   }
};
function modifyCountingArray(array){
  let string = "";
  for(let i = 0; i < 12; i++){
    string= string + array[i].toString() + "\n";
  }
  localStorage.setItem("countingArray : "+selectedHabit, string);
}

dataCel.on("click", function() {
  var thisEl = $(this);
  var thisId = this.id;
  //alert(thisId);
  if (thisEl.hasClass("isSelected")) {
    thisEl.removeClass("isSelected");
    localStorage.removeItem(thisId);
    selectedHabitArray.MonthCountOfDays[indexMonth-1] = selectedHabitArray.MonthCountOfDays[indexMonth-1] - 1;
    modifyCountingArray(selectedHabitArray.MonthCountOfDays);
  }
  else {
    thisEl.addClass("isSelected");
    localStorage.setItem(thisId, "1");

    selectedHabitArray.MonthCountOfDays[indexMonth-1] = selectedHabitArray.MonthCountOfDays[indexMonth-1] + 1;
    modifyCountingArray(selectedHabitArray.MonthCountOfDays);
  }
});

// 喂 do notatek
// dataCel.on("dblclick", function() {
//   var thisEl = $(this);
//   var thisDay = $(this)
//   .attr("data-day")
//   .slice(8);
//   var thisMonth = $(this)
//   .attr("data-day")
//   .slice(5, 7);

//   fillEventSidebar($(this));

//   $(".c-aside__num").text(thisDay);
//   $(".c-aside__month").text(monthText[thisMonth - 1]);

//   dataCel.removeClass("isSelected");
//   thisEl.addClass("isSelected");
// });

//function for move the months
function moveNext(fakeClick, indexNext) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "-=100%"
    });
    $(".c-paginator__month").css({
      left: "-=100%"
    });
    switch (true) {
      case indexNext:
        indexMonth += 1;
        break;
    }
  }
}
function movePrev(fakeClick, indexPrev) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "+=100%"
    });
    $(".c-paginator__month").css({
      left: "+=100%"
    });
    switch (true) {
      case indexPrev:
        indexMonth -= 1;
        break;
    }
  }
}

//months paginator
function buttonsPaginator(buttonId, mainClass, monthClass, next, prev) {
  switch (true) {
    case next:
      $(buttonId).on("click", function() {
        if (indexMonth >= 2) {
          $(mainClass).css({
            left: "+=100%"
          });
          $(monthClass).css({
            left: "+=100%"
          });
          indexMonth -= 1;
        }
        return indexMonth;
      });
      break;
    case prev:
      $(buttonId).on("click", function() {
        if (indexMonth <= 11) {
          $(mainClass).css({
            left: "-=100%"
          });
          $(monthClass).css({
            left: "-=100%"
          });
          indexMonth += 1;
        }
        return indexMonth;
      });
      break;
  }
}

buttonsPaginator("#next", monthEl, ".c-paginator__month", false, true);
buttonsPaginator("#prev", monthEl, ".c-paginator__month", true, false);

//launch function to set the current month
moveNext(indexMonth - 1, false);

//fill the sidebar with current day
$(".c-aside__num").text(day);
$(".c-aside__month").text(monthText[month - 1]);