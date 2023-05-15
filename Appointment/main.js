// window.addEventListener('DOMContentLoaded', () => {
//     axios.get('https://crudcrud.com/api/87e226f6b3474adc8e60a8db310859a6/appointmentdata')
//     .then((response) => {
//         for(var i=0; i<response.data.length; i++)
//         {
//             showOnScreen(response.data[i]);
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })


function onsignup(event)
    {
        event.preventDefault();
        let obj = {
        Name : event.target.Username.value,

        Email : event.target.email.value,

        Number : event.target.phonenum.value
        }
        axios.post('https://localhost:3000/user/add-user',obj)
        .then((response) => {
            showOnScreen(response.data)
            //console.log(response);
        })
        .catch((error) => {
            document.body.innerHTML = document.body.innerHTML + "<h2>Error in Execution</h2>"
            console.log(error);
        })
        //localStorage.setItem(obj.Email, JSON.stringify(obj));
        //showOnScreen(obj);
    }
function showOnScreen(obj)
    {
        const parent = document.getElementById('items');
        const child = document.createElement('li');
        child.textContent = obj.Name+'-'+obj.Email+'-'+obj.Number;

        const editButton = document.createElement('input');
        const delButton = document.createElement('input');
        delButton.type = 'button';
        delButton.value = 'Delete';
        delButton.onclick = () => {
            //localStorage.removeItem(obj.Email);
            axios.delete(`https://crudcrud.com/api/87e226f6b3474adc8e60a8db310859a6/appointmentdata/${obj._id}`)
            .then((response) =>{
                parent.removeChild(child);
            })
            .catch((err) => {
                console.log("error")
            })
            
        }
        child.appendChild(delButton);
        parent.appendChild(child);

        editButton.type = 'button';
        editButton.value = 'Edit';
        editButton.onclick = () =>{
            //localStorage.removeItem(obj.Email);
            document.getElementById('name').value = obj.Name;
            document.getElementById('mail').value = obj.Email;
            document.getElementById('num').value = obj.Number;
            axios.delete(`https://crudcrud.com/api/87e226f6b3474adc8e60a8db310859a6/appointmentdata/${obj._id}`)
            .then((response) =>{
                parent.removeChild(child);
            })
            .catch((err) => {
                console.log("error")
            })
        }
        child.appendChild(editButton);
        parent.appendChild(child);
    }
