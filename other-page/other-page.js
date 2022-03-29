import { checkAuth, logout, createTask, getTasks } from '../fetch-utils.js';

const inputForm = document.getElementById('input-form');
checkAuth();

const taskDiv = document.querySelector('.listdiv');

const logoutButton = document.getElementById('logout');



logoutButton.addEventListener('click', () => {
    logout();
});

inputForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
   
    const data = new FormData(inputForm);
    await createTask(data.get('task-input'), data.get('hour-input'), data.get('minute-input'), data.get('second-input'));
    
    displayTasks();

});

async function displayTasks(){
    taskDiv.textContent = '';

    const allTasks = await getTasks();

    for(let task of allTasks){
        const newTaskEl = renderTask(task);
    };


}

function renderTask(aTask){
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('.task-class');

}