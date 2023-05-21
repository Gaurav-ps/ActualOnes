async function onsignup(event){
    try{
        event.preventDefault();
        let obj = {
            Name: event.target.username.value,
            Email: event.target.useremail.value,
            Password: event.target.password.value
        }
        let getResponse = axios.get('http://localhost:4000/users/')
        let getValues = await getResponse
        let flag = true;
        for(let i=0; i<getValues.data.existingUsers.length; i++){
            
            if(getValues.data.existingUsers[i].name == obj.Name && getValues.data.existingUsers[i].email == obj.Email)
            {
                flag = false;
                alert('User Already Exists')
                break;
            } 
        }
        if(flag){
            let postResponse = axios.post('http://localhost:4000/users/signup',obj)
            let val = await postResponse;
            console.log(val.data.userDetails)
        }    
        
        //showOnScreen(val.data.orderDetails);
    }
    catch(err){
        console.log(err);
    }
}

// async function showOnScreen(obj){
//     try{
//         const parent = document.getElementById(obj.table);
//         const child = document.createElement('li');
//         child.textContent = `Rs${obj.amount}-${obj.description}-${obj.table}`;

//         const delButton = document.createElement('input');
//         delButton.type = 'button';
//         delButton.value = 'Delete';
//         delButton.onclick = async() =>{
//         let deleteResponse = axios.delete(`http://localhost:4000/delete-orders/${obj.id}`)  
//         let val = await deleteResponse;
//             try{
//                 parent.removeChild(child);
//             }
//             catch(err){
//                 console.log(err);
//             }
//         }
//         parent.appendChild(child);
//         child.appendChild(delButton);
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// async function refresh()
// {
//     window.addEventListener('DOMContentLoaded', async() => {
//         let response = axios.get('http://localhost:4000/users/get-orders')
//         let val = await response;
//         try{
//             for(var i=0; i<val.data.allOrders.length; i++)
//             {
//                 showOnScreen(val.data.allOrders[i]);
//             }
//         }
//         catch(err)
//         {
//             console.log(err);
//         }
        
//     })
// }
// refresh();
