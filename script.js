$(function () {
    // Get the current date and display it in the header
    const currentDate = dayjs().format("dddd, MMMM D");
    $("#currentDay").text(currentDate);
  
    // Add a listener for click events on the save button.
    $(".saveBtn").on("click", function () {
      // Get the description text from the textarea
      const description = $(this).siblings(".description").val();
  
      // Get the id of the parent time-block div (e.g., "hour-9", "hour-10", etc.)
      const timeBlockId = $(this).parent().attr("id");
  
      // Save the user input in local storage using the time block id as the key
      localStorage.setItem(timeBlockId, description);
    });
  
    // Function to apply the past, present, or future class to each time block
    function updateTimeBlocks() {
      // Get the current hour in 24-hour format
      const currentHour = dayjs().hour();
  
      // Loop through each time-block div
      $(".time-block").each(function () {
        const timeBlockId = parseInt($(this).attr("id").split("-")[1]);
  
        // Add or remove classes based on the comparison between the current hour and the time-block hour
        if (timeBlockId < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (timeBlockId === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
  
    // Call the function to update time blocks initially
    updateTimeBlocks();
  
    // Retrieve user input from local storage and set the values of the corresponding textarea elements
    $(".time-block").each(function () {
      const timeBlockId = $(this).attr("id");
      const description = localStorage.getItem(timeBlockId);
      $(this).find(".description").val(description);
    });
  });