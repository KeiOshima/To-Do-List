window.addEventListener('load', () => {
    todolist = JSON.parse(localStorage.getItem('todolist')) || [];
    const nameinput = document.querySelector('#name');
    const newTodoform = document.querySelector('#new-To-Do');

    const username = localStorage.getItem('username') || '';
    nameinput.value = username;

    nameinput.addEventListener('change',  e => {
        localStorage.setItem('username', e.target.value);
    })

    newTodoform.addEventListener('submit', e => {
         e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todolist.push(todo);

        localStorage.setItem('todolist', JSON.stringify(todolist));

        e.target.reset();

        DisplayToDo()
    }) 

    DisplayToDo()
}) 

function DisplayToDo (){
    const ShowToDo = document.querySelector('#To-Do-list');
    ShowToDo.innerHTML = "";


    todolist.forEach(todo => {
        const ToDoItem = document.createElement('div');
        ToDoItem.classList.add('To-Do-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const removeButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
           

        if (todo.category == 'personal'){
            span.classList.add('personal');
        }
        else if(todo.category == 'urgent'){
            span.classList.add('urgent');
        }
        else if(todo.category == 'school'){
            span.classList.add('school');
        }
        else if(todo.category == 'chores'){
            span.classList.add('chores');
        }
        else if(todo.category == 'to_do_next_week'){
            span.classList.add('to_do_next_week');
        }
        else{
            span.classList.add('business');
        }

        content.classList.add('To-Do-contents');
        actions.classList.add('actions'); 
        edit.classList.add('edit');
        removeButton.classList.add('remove');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        removeButton.innerHTML = 'Remove';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(removeButton);
        ToDoItem.appendChild(label);
        ToDoItem.appendChild(content);
        ToDoItem.appendChild(actions);
       
        ShowToDo.appendChild(ToDoItem);

          

        if(todo.done){
            ToDoItem.classList.add('done');
        }

        input.addEventListener('change', (e) =>{
            todo.done = e.target.checked;
            localStorage.setItem('todolist', JSON.stringify(todolist));

            if (todo.done){
                ToDoItem.classList.add('done');
            } else{
                ToDoItem.classList.remove('done');
            }

            DisplayToDo()

        })

        edit.addEventListener('click', (e) =>{
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) =>{
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todolist', JSON.stringify(todolist));
                DisplayToDo()
            })
        })

        removeButton.addEventListener('click', (e) =>{
            todolist = todolist.filter(t => t != todo);
            localStorage.setItem('todolist', JSON.stringify(todolist));
            DisplayToDo()
            alert("keep up the good work")
        })






    });
}



months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let x = new Date();
let y = x.getFullYear();
let z = x.getMonth();
let v = x.getDate();
document.getElementById("date").innerHTML = v + " " + months[z] + " " + y;

function currentTime(){
    setTimeout(function() {
        let time = new Date();
        const n = time.toLocaleTimeString();
        document.getElementById("time").innerHTML = n;
        currentTime();
    }, 1000)
    
}

currentTime();


  