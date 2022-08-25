
import { checkAuth, signOutUser } from './fetch-utils.js';
import { addItem, getList, updateItem, deleteList} from './fetch-utils.js';

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

//form
formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(formEl);

    await addItem({ 
        item: data.get('item'), 
        quantity: data.get('quantity') });

    formEl.reset();
});