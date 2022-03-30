const SUPABASE_URL = 'https://gzbapigubbswkhmpkmou.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YmFwaWd1YmJzd2tobXBrbW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc4Nzk0NTMsImV4cCI6MTk2MzQ1NTQ1M30.4fqkZViMQGidqxI8xltReNok9umY5rBiZ0lrBWSVBks';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

export async function createTask(taskName, taskHour, taskMinute, taskSecond){
    const response = await client
        .from('shopping-list')
        .insert({ product: taskName,
            time:`${taskHour}:${taskMinute}:${taskSecond}`,
            is_bought: false });
    
    return response;

}

export async function getTasks(){
    const response = await client
        .from('shopping-list')
        .select('*')
        .order('time', { ascending: true });
   
    return response.body;

}

export async function completeTask(theTask){
    const response = await client
        .from('shopping-list')
        .update({ is_bought: true })
        .match({ id: theTask.id });
}
// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }

export async function deleteTask(theTask){
    await client
        .from('shopping-list')
        .delete()
        .match({ id: theTask.id });
}

export async function deleteAll(){

    await client
        .from('shopping-list')
        .delete()
        .match({ user_id: client.auth.user().id });
        
}


