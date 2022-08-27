
import { checkAuth, signOutUser } from './fetch-utils.js';
import { addItem, getList, updateItem, deleteList } from './fetch-utils.js';

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

//DOM Elements

const formEl = document.querySelector('.form');
const listEl = document.querySelector('.list');
const deleteButton = document.querySelector('.delete-button');

//form
formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(formEl);

    await addItem({ 
        item: data.get('item'), 
        quantity: data.get('quantity') });

    formEl.reset();
    displayItems();
});

//display items
// need to render the items and then display them on the list

async function handleComplete(item) {
    await updateItem(item.id);
    displayItems();
}

function renderItems(item, handleComplete) {
    const div = document.createElement('div');
    const pTag = document.createElement('p');

    
    div.classList.add(item.bought ? 'bought' : 'incomplete');
    
    div.classList.add('list-item');
    pTag.textContent = `${item.quantity} x ${item.item}`;
    
    
    div.append(pTag);

    div.addEventListener('click', () => {
        handleComplete(item);
    });

    return div;
}


async function displayItems() {
    listEl.innerHTML = '';

    const list = await getList();
    for (let item of list) {
        const listItem = renderItems(item, handleComplete);
        listEl.append(listItem);
    }
}
displayItems();

deleteButton.addEventListener('click', async () => {
    await deleteList();
    displayItems();
});
