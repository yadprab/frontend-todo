//todo function
const todoFn = () => {
  //get theme switcher button
  const themeSwitcher = document.querySelector("#theme--changer");

  //get inner value for change icon
  const icon = themeSwitcher.innerHTML;

  //get header to change background
  const header = document.querySelector("header");

  const themeObj = {
    head: "",
    body: "",
    icon: "",
  };
  //get theme function
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

  //sun icon function
  const sunIcon = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" style="pointer-events: none;"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>   `;
  };

  setTheme(header, themeSwitcher);

  formFn();

  generateTodo();

  //click function for theme switcher
  themeSwitcher.addEventListener("click", getTheme);
};

const setTheme = (headerChange, button) => {
  if (localStorage.getItem("theme") === null) {
    return;
  } else {
    const themeData = JSON.parse(localStorage.getItem("theme"));

    const { head, body, icon } = themeData;

    headerChange.className = head;

    document.body.className = body;

    button.innerHTML = icon;
  }
};

const formFn = () => {
  //get form
  const form = document.querySelector("form");

  const submitFn = (e) => {
    //prevent default actions
    e.preventDefault();

    const input = form.querySelector("input").value;

    input.trim() == "" ? window.alert("enter the value") : setTodo(input);

    form.reset();

    location.reload();
  };

  form.addEventListener("submit", submitFn);
};

const setTodo = (val) => {
  const stateObj = {
    value: val,
    state: "new",
  };
  if (localStorage.getItem("todo") === null) {
    const todoArr = [];
    todoArr.push(stateObj);

    localStorage.setItem("todo", JSON.stringify(todoArr));
  } else {
    const updateTodo = JSON.parse(localStorage.getItem("todo"));

    updateTodo.push(stateObj);

    localStorage.setItem("todo", JSON.stringify(updateTodo));
  }
};

const generateTodo = () => {
  const ul = document.querySelector("ul");

  const total = document.querySelector(".total--area");

  const filterSection = document.querySelector("#outer--filter");

  if (localStorage.getItem("todo") === null) {
    return;
  }

  const todoData = JSON.parse(localStorage.getItem("todo"));

  ul.insertAdjacentHTML("afterbegin", generateHtml(todoData));

  total.classList.remove("show");

  filterSection.classList.remove("show");

  checked();

  completedData();

  removeTask();
};

const generateHtml = (data) => {
  return data
    .map((tasks) => {
      return `
   <li class=${tasks.state}>
      <section class="tasks--section">
                        <section class="check--box">
                            <label for="check" id="checkbox" class=''></label>
                            <input type="checkbox" name="check" id="check">
                           
                        </section>
                        <p>${tasks.value}</p>

                        <button id="remove--button" aria-label="remove task">
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                       </button>

                    </section>
     </li>
   

   
  
    
    
    `;
    })
    .join("");
};

const checked = () => {
  const check = document.querySelectorAll("#checkbox");

  let state = false;

  const checkFn = (e, index) => {
    e.stopPropagation();
    const parent = e.target.parentElement.parentElement.parentElement;

    parent.classList.toggle("checked");

    updateState(state, index, parent);

    completedData();
  };

  check.forEach((box, index) =>
    box.addEventListener("click", (e) => {
      checkFn(e, index);
    })
  );
};

const updateState = (state, index, parent) => {
  const currentState = parent.classList.contains("checked") ? !state : state;

  const changeState = JSON.parse(localStorage.getItem("todo"));

  if (currentState) {
    changeState[index].state = "checked";
    localStorage.setItem("todo", JSON.stringify(changeState));
  } else {
    changeState[index].state = "new";
    localStorage.setItem("todo", JSON.stringify(changeState));
  }
};

const completedData = () => {
  const li = document.querySelectorAll("li:not(.total--area)");

  const small = document.querySelector("small");

  const liArr = [...li];

  const filtered = liArr.filter(
    (list) =>
      !list.classList.contains("checked") && !list.classList.contains("remove")
  );

  small.textContent = `${filtered.length} items left`;
};

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

const updateRemove = (parent, index, state) => {
  const currentState = parent.classList.contains("remove") ? state : !state;

  const changermState = JSON.parse(localStorage.getItem("todo"));

  if (currentState) {
    changermState[index].state = "remove";

    localStorage.setItem("todo", JSON.stringify(changermState));
  }
};
//main function
window.addEventListener("DOMContentLoaded", todoFn);
