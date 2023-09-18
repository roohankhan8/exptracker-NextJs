
import axios from "axios"
import { dateFormat, showToastMessage } from '@/helpers'

export const deleteExp = async (_id) => {
    try {
        const response = await axios.delete(
            `/api/deleteExp?expId=${_id}`
        );
        showToastMessage('delete')
        getExpenses()
    } catch (error) {
        console.log(error.message);
    }
}