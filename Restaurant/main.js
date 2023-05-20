async function onSubmission(event){
    try{
        event.preventDefault();
        let obj = {
            Amount: event.target.price.value,
            Description: event.target.orders.value,
            TableNum : document.getElementById('table').value
        } 
        let postResponse = axios.post('http://localhost:4000/add-orders',obj)
        let val = await postResponse;
        
        showOnScreen(val.data.orderDetails);
        
    }
    catch(err){
        console.log(err);
    }
}

async function showOnScreen(obj){
    try{
        const parent = document.getElementById(obj.table);
        const child = document.createElement('li');
        child.textContent = obj.amount+'-'+obj.description;

        const delButton = document.createElement('input');
        delButton.type = 'button';
        delButton.value = 'Delete';
        delButton.onclick = async() =>{
        let deleteResponse = axios.delete(`http://localhost:4000/delete-orders/${obj.id}`)  
        let val = await deleteResponse;
            try{
                parent.removeChild(child);
            }
            catch(err){
                console.log(err);
            }
        }
        parent.appendChild(child);
        child.appendChild(delButton);
    }
    catch(err){
        console.log(err);
    }
}

async function refresh()
{
    window.addEventListener('DOMContentLoaded', async() => {
        let response = axios.get('http://localhost:4000/get-orders')
        let val = await response;
        try{
            for(var i=0; i<val.data.allOrders.length; i++)
            {
                showOnScreen(val.data.allOrders[i]);
            }
        }
        catch(err)
        {
            console.log(err);
        }
        
    })
}
refresh();
