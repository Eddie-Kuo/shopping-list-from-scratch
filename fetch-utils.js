const SUPABASE_URL = 'https://wiqzbpedlnmcfdxbyqay.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcXpicGVkbG5tY2ZkeGJ5cWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA2MDcxMDQsImV4cCI6MTk3NjE4MzEwNH0.Fr6hrIqsda4aanZRvmxv9-nHHlYyVuZ1SWOx0IU2Vzg';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }
    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}


/* Data functions */
// function to send items to supabase 
export async function addItem(thing) {
    const response = await client.from('list').insert(thing);
    return checkError(response); 
}

// function to retrieve all the items from supabase 
export async function getList() {
    const response = await client.from('list').select('*');
    return checkError(response);
}
// function for the user to update the item on supabase as complete
export async function updateItem(id) {
    const response = await client.from('list').update({ bought: true }).match({ id });
    return response;
}
// function to delete all the items on supabase
export async function deleteList() {
    const response = await client.from('list').delete('*').match({ user_id: client.auth.user().id });
    return checkError(response);
}