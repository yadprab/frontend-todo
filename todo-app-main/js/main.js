//todo function
const todoFn = ()=>{

//get theme switcher button
const themeSwitcher = document.querySelector('#theme--changer');

//get inner value for change icon
const icon = themeSwitcher.innerHTML;

//get header to change background
const header = document.querySelector('header');

const themeObj = {
   head: '',
   body:'',
   icon:'',
}
//get theme function
const getTheme =(e)=>{
//prevent default actions
e.preventDefault();

//get current body class
const themeClass = document.body.className;

//switch case for changing theme
switch (themeClass){
    
case 'light':
//change header class    
header.classList.add('dark--header');
//body class dark        
document.body.className= 'dark';
//change icon         
themeSwitcher.innerHTML = sunIcon();
//update theme object
themeObj.head = header.className;
themeObj.body = document.body.className;
themeObj.icon = themeSwitcher.innerHTML;
//now set item as this object 
localStorage.setItem('theme', JSON.stringify(themeObj))
       
break;     

default:
 //remove header class     
 header.classList.remove('dark--header');
 //body class light       
document.body.className= 'light';
//change to default icon       
themeSwitcher.innerHTML = icon;
//update theme object
themeObj.head = header.className;
themeObj.body = document.body.className;
themeObj.icon = themeSwitcher.innerHTML;
//now set item as updated object         
localStorage.setItem('theme', JSON.stringify(themeObj))
   
break;

       
}





}

//sun icon function
const sunIcon = ()=>{

return`<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" style="pointer-events: none;"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>   `


} 


formFn();

setTheme(header, themeSwitcher);


 generateTodo();


//click function for theme switcher
themeSwitcher.addEventListener('click', getTheme);
}

const setTheme = (headerChange, button)=>{

 if (localStorage.getItem('theme')===null) {
return;
}
else{
const themeData = JSON.parse(localStorage.getItem('theme'));

const {head, body,icon}= themeData;

headerChange.className = head

document.body.className = body;

button.innerHTML = icon
     

}

}


const formFn = ()=>{

//get form
const form = document.querySelector('form');

const submitFn = (e)=>{
//prevent default actions
e.preventDefault();

const input = form.querySelector('input').value;

input.trim() ==''?window.alert('enter the value'):setTodo(input);


form.reset();

 
 generateTodo();

}





form.addEventListener('submit', submitFn);
}

const setTodo = (val)=>{

if (localStorage.getItem('todo')===null) {
  const todoArr = []
  todoArr.push(val);
  
  localStorage.setItem('todo', JSON.stringify(todoArr));
}else{
 const updateTodo = JSON.parse(localStorage.getItem('todo'));

 updateTodo.push(val);

 localStorage.setItem('todo', JSON.stringify(updateTodo));
 
 generateTodo();

}


}


const generateTodo =()=>{
const container = document.querySelector('.container');

const ul = container.querySelector('ul');

const total = document. querySelector('.total--area');

const small = total.querySelector('small');
if (localStorage.getItem('todo')===null) {
  return;  
}

const todoData = JSON.parse(localStorage.getItem('todo'));


ul.insertAdjacentHTML('afterbegin', generateHtml(todoData))

total.classList.remove('show')

small.textContent = `${todoData.length} items left`
}


const generateHtml = (data)=>{

  return data.map(tasks=>{

    return `
   <li>
      <section class="tasks--section">
                        <section class="check--box">
                            <label for="check" id="checkbox"></label>
                            <input type="checkbox" name="check" id="check">
                           
                        </section>
                        <p>${tasks}</p>

                        <button id="remove--button" aria-label="remove task">
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                       </button>

                    </section>
     </li>
   

   
  
    
    
    `



  }).join('');

}







//main function
window.addEventListener('DOMContentLoaded', todoFn);