window.addEventListener('DOMContentLoaded', async() => {
    const response = await axios.get('http://localhost:4000/expense/get-expenses')
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
            let obj = {
            Expenses : event.target.Amount.value,
            Description : event.target.Reason.value,
            Category : document.getElementById('categories').value
            }
            let postResponse = await axios.post('http://localhost:4000/expense/add-expenses',obj)
            
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
            let deleteResponse = await axios.delete(`http://localhost:4000/expense/delete-expenses/${obj.id}`)
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


    