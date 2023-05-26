window.addEventListener('DOMContentLoaded', async() => {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:4000/expense/get-expenses', { headers: {'Authorization' : token}})
    const premiumresponse = await axios.get('http://localhost:4000/purchase/premiummembership',{headers: {'Authorization': token}})
    try{
        for(let i=0; i<response.data.allExpenses.length; i++)
        {
            showOnScreen(response.data.allExpenses[i]);
        }
    }
    catch(err){
        console.log(err);
    }
    
})

async function onsignup(event)
    {
        try{
            event.preventDefault();
            const token = localStorage.getItem('token')
            let obj = {
            Expenses : event.target.Amount.value,
            Description : event.target.Reason.value,
            Category : document.getElementById('categories').value,
            }
            let postResponse = await axios.post('http://localhost:4000/expense/add-expenses',obj, {headers: {'Authorization': token}})
            
                showOnScreen(postResponse.data.expenseDetails)
        } 
        catch(err){
            console.log(err)
        }        
    }

async function showOnScreen(obj)
    {
        try{
            const parent = document.getElementById('items');
            const child = document.createElement('li');
            child.textContent = obj.amount+'-'+obj.description+'-'+obj.category;

            const delButton = document.createElement('input');
            delButton.type = 'button';
            delButton.value = 'Delete';
            delButton.onclick = async() => {
                const token = localStorage.getItem('token')
                let deleteResponse = await axios.delete(`http://localhost:4000/expense/delete-expenses/${obj.id}`,{headers: {'Authorization': token}})
                try{
                    parent.removeChild(child);
                }
                catch(err){
                    console.log(err)
                }
            }
            child.appendChild(delButton);
            parent.appendChild(child);
        }
        catch(err){
            console.log(err)
        }
    }

document.getElementById('rzp-button').onclick = async function(e) {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:4000/purchase/premiummembership',{headers: {'Authorization': token}})
    console.log(response);
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response){
            await axios.post('http://localhost:4000/purchase/updatetransactionstatus',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            },{headers: {'Authorization': token}})
        
            alert('You are a premium user now!!!')
            const element = document.getElementById('rzp-button')
            element.remove();
            document.getElementById('premiumUser').innerHTML += 'You are a premium User'
        }
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault()

    rzp1.on('payment.failed', function(response){
        console.log(response)
        alert('Something went wrong')
    })
}


    