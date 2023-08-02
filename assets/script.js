$(function () {
    // Function to apply the past, present, or future class to each time block
    function updateTimeBlocks() {
      const currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        const blockHour = parseInt($(this).attr("id").split("-")[1]);
  
        if (blockHour < currentHour) {
          $(this).addClass("past").removeClass("present future");
        } else if (blockHour === currentHour) {
          $(this).addClass("present").removeClass("past future");
        } else {
          $(this).addClass("future").removeClass("past present");
        }
      });
    }
  
    // Function to load saved events from local storage
    function loadSavedEvents() {
      for (let i = 9; i <= 17; i++) {
        const savedEvent = localStorage.getItem("event-" + i);
        if (savedEvent) {
          $("#hour-" + i + " .description").val(savedEvent);
        }
      }
    }
  
    // Function to save events to local storage
    function saveEvent() {
      const hour = $(this).parent().attr("id").split("-")[1];
      const eventText = $(this).siblings(".description").val();
  
      if (eventText.trim() !== "") {
        localStorage.setItem("event-" + hour, eventText);
      } else {
        localStorage.removeItem("event-" + hour);
      }
    }
  
    // Event listener for save button clicks
    $(".saveBtn").on("click", saveEvent);
  
    // Call the functions to initialize the page
    updateTimeBlocks();
    loadSavedEvents();
  
    // Function to display the current date at the top of the calendar
    function displayCurrentDate() {
      const currentDate = dayjs().format("dddd, MMMM D, YYYY");
      $("#currentDay").text(currentDate);
    }
  
    displayCurrentDate();
  });