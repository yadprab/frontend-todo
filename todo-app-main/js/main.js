//1.1 todo function main function
const todoFn = () => {
  //get theme switcher button
  const themeSwitcher = document.querySelector("#theme--changer");

  //get inner value for change icon
  const icon = themeSwitcher.innerHTML;

  //get header to change background
  const header = document.querySelector("header");

  //create an object for setting theme
  const themeObj = {
    head: "",
    body: "",
    icon: "",
  };

  // 1.3get theme function to get user selection
  const getTheme = (e) => {
    //prevent default actions
    e.preventDefault();

    //get current body class
    const themeClass = document.body.className;

    //switch case for changing theme
    switch (themeClass) {
      case "light":
        //change header class
        header.classList.add("dark--header");
        //body class dark
        document.body.className = "dark";
        //change icon
        themeSwitcher.innerHTML = sunIcon();
        //update theme object
        themeObj.head = header.className;
        themeObj.body = document.body.className;
        themeObj.icon = themeSwitcher.innerHTML;
        //now set item as this object
        localStorage.setItem("theme", JSON.stringify(themeObj));

        break;

      default:
        //remove header class
        header.classList.remove("dark--header");
        //body class light
        document.body.className = "light";
        //change to default icon
        themeSwitcher.innerHTML = icon;
        //update theme object
        themeObj.head = header.className;
        themeObj.body = document.body.className;
        themeObj.icon = themeSwitcher.innerHTML;
        //now set item as updated object
        localStorage.setItem("theme", JSON.stringify(themeObj));

        break;
    }
  };

  // 1.3.1 sun icon function
  const sunIcon = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" style="pointer-events: none;"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>   `;
  };

  setTheme(header, themeSwitcher); //calling set theme to update storage

  formFn(); // calling form function to update user input

  generateTodo(); // calling generate todo that generates html to update storage

  // 1.2 click function for theme switcher
  themeSwitcher.addEventListener("click", getTheme);
};

//2.0 set theme to update storage
const setTheme = (headerChange, button) => {
  //checking local storage to avoid errors
  if (localStorage.getItem("theme") === null) {
    return; // if doesn't exists return
  } else {
    //if exists get the object
    const themeData = JSON.parse(localStorage.getItem("theme"));

    const { head, body, icon } = themeData; //destructuring the object

    headerChange.className = head; //now set the bg for respective theme

    document.body.className = body; //now set the theme that user selected

    button.innerHTML = icon; //now set the icon for respective theme
  }
};

//3.0 now get user input for the tasks that user entered
const formFn = () => {
  //get form element
  const form = document.querySelector("form");

  const submitFn = (e) => {
    e.preventDefault(); //prevent default actions

    const input = form.querySelector("input").value; //get the input value

    //if user submits without value show an alert else call function 4.0
    input.trim() == "" ? window.alert("enter the value") : setTodo(input);

    form.reset(); //clear input filed

    location.reload(); // to update from storage more about this in function 5.0
  };

  form.addEventListener("submit", submitFn); //3.1 submit event to get the input
};

//4.0 set user input to the storage
const setTodo = (val) => {
  //todo  object with state
  const stateObj = {
    value: val, //input value
    state: "new", //current state new task or active one
  };
  //checking storage whether it contains todo item
  if (localStorage.getItem("todo") === null) {
    const todoArr = []; // if not create an array

    todoArr.push(stateObj); //push the current object

    localStorage.setItem("todo", JSON.stringify(todoArr)); //set it to the local storage
  } else {
    //if already exist just get the array
    const updateTodo = JSON.parse(localStorage.getItem("todo"));

    updateTodo.push(stateObj); //update array for each input

    localStorage.setItem("todo", JSON.stringify(updateTodo)); // set updated array to the ls
  }
};

//5.0 function to generate html
const generateTodo = () => {
  const ul = document.querySelector("ul"); //get ul element

  const total = document.querySelector(".total--area"); //get total area element to add dynamic numbers

  const filterSection = document.querySelector("#outer--filter"); //get filter section

  const msg = document.querySelector("#message"); // get message section

  //checking it to avoid error
  if (localStorage.getItem("todo") === null) {
    return;
  }

  const todoData = JSON.parse(localStorage.getItem("todo")); // if exists get the array

  //**generate html using fun 5.1 based on values.

  //** note:insertAdjacentHTML  prints everything  thats why we need to reload

  ul.insertAdjacentHTML("afterbegin", generateHtml(todoData));

  //{after user submits show all the sections including message}//
  total.classList.remove("show");

  filterSection.classList.remove("show");

  msg.classList.remove("show");

  checked(); //fun 6.0 for completed tasks

  completedData(); //fun  7.0 for dynamic numbers section

  removeTask(); //fun 8.0 for remove tasks

  clear(); //fun 9.0 for clear completed tasks

  filterTasksArea(); //fun 10.0 for filter tasks

  dragAndDrop(); //fun 11.0 for drag and drop functionality
};

//5.1 html function // set state as class and index for d&d
const generateHtml = (data) => {
  return data
    .map((tasks, index) => {
      return `
  <li class="${tasks.state}" data-index="${index}" id="list">
  <section class="tasks--section" draggable="true">
    <section class="check--box">
      <label for="check" id="checkbox" class=""></label>
      <input type="checkbox" name="check" id="check" />
    </section>
    <p>${tasks.value}</p>

    <button id="remove--button" aria-label="remove task">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          fill="#494C6B"
          fill-rule="evenodd"
          d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
        />
      </svg>
    </button>
  </section>
</li>


   
  
    
    
    `;
    })
    .join("");
};

//6.0 checked fun for tasks
const checked = () => {
  const check = document.querySelectorAll("#checkbox"); //get custom checkbox label

  let state = false; //checked state is false

  const checkFn = (e, index) => {
    e.stopPropagation();
    const parent = e.target.parentElement.parentElement.parentElement; //get parent ele based on your html

    parent.classList.toggle("checked"); // add checked class

    updateState(state, index, parent); // to update we need an function 6.1

    completedData(); //calling function 7.0 to update each entry
  };

  // add events for  each check boxes
  check.forEach((box, index) =>
    box.addEventListener("click", (e) => {
      checkFn(e, index);
    })
  );
};

//6.1 update checked state
const updateState = (state, index, parent) => {
  // after add class checking if it contains or not if then change state
  const currentState = parent.classList.contains("checked") ? !state : state;

  const changeState = JSON.parse(localStorage.getItem("todo")); //get the todo array form ls

  //if state true update state(based on your class name) else default state
  if (currentState) {
    changeState[index].state = "checked";
    localStorage.setItem("todo", JSON.stringify(changeState));
  } else {
    changeState[index].state = "new";
    localStorage.setItem("todo", JSON.stringify(changeState));
  }
};

// 7.0 to add dynamic numbers
const completedData = () => {
  const li = document.querySelectorAll("li:not(.total--area)"); //get all the li except filter section

  const small = document.querySelector("small"); //small element for dynamic numbers

  const liArr = [...li]; //create an array from node list

  //filter out the task that doesn't checked or removed
  const filtered = liArr.filter(
    (list) =>
      !list.classList.contains("checked") && !list.classList.contains("remove")
  );

  small.textContent = `${filtered.length} items left`; //set the filtered length for the items left
};

//8.0 to remove tasks similar to fun 6.0
const removeTask = () => {
  const remove = document.querySelectorAll("#remove--button");

  let removedState = true;
  const removeFn = (e, index) => {
    const target = e.target.parentElement.parentElement;

    target.classList.add("remove");

    updateRemove(target, index, removedState);

    completedData();
  };

  remove.forEach((button, index) =>
    button.addEventListener("click", (e) => {
      removeFn(e, index);
    })
  );
};
//8.1 to update removed similar func as 6.1
const updateRemove = (parent, index, state) => {
  const currentState = parent.classList.contains("remove") ? state : !state;

  const changermState = JSON.parse(localStorage.getItem("todo"));

  if (currentState) {
    changermState[index].state = "remove";

    localStorage.setItem("todo", JSON.stringify(changermState));
  }
};

//9.0 for clear completed function similar to checked
const clear = () => {
  const clear = document.querySelector("#clear");

  const liArr = document.querySelectorAll("li:not(.total--area)");

  const arr = [...liArr];
  const clearFn = (e) => {
    e.preventDefault();

    const checkedArr = arr.filter((checked) =>
      checked.classList.contains("checked")
    );

    checkedArr.length === 0
      ? ""
      : checkedArr.forEach((li) => li.classList.add("remove"));

    updateClear(checkedArr);
  };

  clear.addEventListener("click", clearFn);
};

// 9.1 update clear
/*
this is little different compared to 6.1
update function because we removed or adding 
single ele but here we're removing bunch of 
tasks so get from local storage map through it 
change the state it returns an array and update it 
*/
const updateClear = (arr) => {
  if (arr.length === 0) {
    return;
  } else {
    const updateC = JSON.parse(localStorage.getItem("todo")).map((tasks) => {
      if (tasks.state == "checked") {
        tasks.state = "remove";
      }

      return tasks;
    });

    localStorage.setItem("todo", JSON.stringify(updateC));
  }
};

//10.0 filter tasks
/* 
get the all three buttons
add event and & remove the active class
get the id send it o fun 10.1*/
const filterTasksArea = () => {
  const filterArea = document.querySelectorAll(".filter--section");

  const buttons = [...filterArea].map((area) =>
    area.querySelectorAll("button")
  );

  const filterFn = (e) => {
    buttons.forEach((area) =>
      area.forEach((button) => button.classList.remove("active"))
    );
    e.target.classList.add("active");
    filterTasks(e.target.id);
  };

  buttons.forEach((area) =>
    area.forEach((button) => button.addEventListener("click", filterFn))
  );
};

/* 10.1 based on id filter the tasks
by checking the class  */
const filterTasks = (id) => {
  const liArr = document.querySelectorAll("li:not(.total--area)");

  const arr = [...liArr];

  if (liArr.length == 0 || liArr === null) {
    return;
  }
  switch (id) {
    case "active":
      arr.filter((tasks) =>
        !tasks.classList.contains("checked") &&
        !tasks.classList.contains("remove")
          ? (tasks.style.display = "block")
          : (tasks.style.display = "none")
      );

      break;
    case "completed":
      arr.filter((tasks) =>
        tasks.classList.contains("checked")
          ? (tasks.style.display = "block")
          : (tasks.style.display = "none")
      );

      break;

    default:
      arr.filter((tasks) =>
        tasks.classList.contains("checked") || tasks.classList.contains("new")
          ? (tasks.style.display = "block")
          : (tasks.style.display = "none")
      );
      break;
  }
};

//11.o drag and drop function
const dragAndDrop = () => {
  const list = document.querySelectorAll("li:not(.total--area)");

  const tasksSection = document.querySelectorAll(".tasks--section");

  let startIndex;
  if (list.length === 0 || list === null) {
    return;
  }

  const dragStartFn = (e) => {
    startIndex = e.target.closest("li").getAttribute("data-index");
  };

  tasksSection.forEach((sect) =>
    sect.addEventListener("dragstart", dragStartFn)
  );

  list.forEach((list) => {
    list.addEventListener("dragover", overFn, { capture: true });
    list.addEventListener(
      "drop",
      (e) => {
        dropFn(e, startIndex);
      },
      { capture: true }
    );
    list.addEventListener("dragenter", enterFn, { capture: true });
    list.addEventListener("dragleave", leaveFn, { capture: true });
  });
};

const overFn = (e) => {
  e.preventDefault();
};

const dropFn = (e, start) => {
  e.stopPropagation();

  const endIndex = e.target.getAttribute("data-index");

  endIndex === null ? "" : swapFn(start, endIndex);
  e.target.id == "list" ? e.target.classList.remove("over") : "";
};

const enterFn = (e) => {
  e.stopPropagation();
  e.target.id == "list" ? e.target.classList.add("over") : "";
};

const leaveFn = (e) => {
  e.stopPropagation();
  e.target.id == "list" ? e.target.classList.remove("over") : "";
};

const swapFn = (start, end) => {
  const list = document.querySelectorAll("li:not(.total--area)");

  const lists = [...list];
  const itemOne = lists[start].querySelector(".tasks--section");

  const itemTwo = lists[end].querySelector(".tasks--section");

  list[start].appendChild(itemTwo);

  list[end].appendChild(itemOne);
};

window.addEventListener("DOMContentLoaded", todoFn); //1.main function
