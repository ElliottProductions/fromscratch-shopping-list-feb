import { checkAuth, logout, createTask, getTasks, completeTask, deleteTask, deleteAll } from '../fetch-utils.js';

const inputForm = document.getElementById('input-form');
checkAuth();

const taskDiv = document.querySelector('.listdiv');

const logoutButton = document.getElementById('logout');
const loadingSpinner = document.querySelector('.loading');
const deleteButton = document.getElementById('delete');

window.addEventListener('load', async ()=> {
    await displayTasks();
    loadingSpinner.classList.add('invisible');
});

logoutButton.addEventListener('click', () => {
    logout();
});

inputForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
   
    const data = new FormData(inputForm);
    await createTask(data.get('task-input'), data.get('hour-input'), data.get('minute-input'), data.get('second-input'));
    
    taskDiv.textContent = '';
    await displayTasks();
    inputForm.reset();

});

deleteButton.addEventListener('click', async ()=>{
    await deleteAll();
    await displayTasks();
});

async function displayTasks(){
    loadingSpinner.classList.remove('invisible');
    taskDiv.textContent = '';
    const allTasks = await getTasks();

    for (let task of allTasks){
        loadingSpinner.classList.remove('invisible');
        const newTaskEl = renderTask(task);


        newTaskEl.addEventListener('click', async ()=>{
            loadingSpinner.classList.add('invisible');
            if (task.is_bought){
                newTaskEl.remove();
                await deleteTask(task);
                await displayTasks();
            } else {
                newTaskEl.classList.add('task-done');
                await completeTask(task);
                await displayTasks();
            }

        });

        if (task.is_bought){
            newTaskEl.classList.add('task-done');
        }

        taskDiv.append(newTaskEl);
        
    }
    
    loadingSpinner.classList.add('invisible');
}

function renderTask(aTask){
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-class');
    const taskText = document.createElement('p');

    taskText.textContent = `${aTask.product} at ${aTask.time}`;
    taskDiv.append(taskText);

    return taskDiv;

}
