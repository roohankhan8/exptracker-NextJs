
import { toast } from 'react-toastify';

const showToastMessage = (action) => {
    if (action == 'delete') {
        toast.info('Expense Deleted!', {
            position: toast.POSITION.TOP_RIGHT
        });
    } 
    else if (action == 'update') {
        toast.info('Expense Updated!', {
            position: toast.POSITION.TOP_RIGHT
        });
    } 
    else if (action == 'add') {
        toast.success('Expense Added!', {
            position: toast.POSITION.TOP_RIGHT
        });
    } 
    else if (action == 'invalid amount') {
        toast.error('Add Amount!', {
            position: toast.POSITION.TOP_RIGHT
        });
    } 
};

export default showToastMessage