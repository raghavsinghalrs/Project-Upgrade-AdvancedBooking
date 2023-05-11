var f_n  = document.getElementById('name');
var m_id = document.getElementById('mail');
var btn = document.getElementById('submit');
var list = document.getElementById('output_screen');

list.addEventListener('click',delete_details);
list.addEventListener('click',edit_details);
btn.addEventListener('click',show_details);
function show_details(e){
    e.preventDefault();
    result = {
        'Name':f_n.value,
        'mail_id':m_id.value,
    };
    axios.post("https://crudcrud.com/api/3d3a93165ece43e5a2d3e3f4fcc2a5fe/bookingsdata",result)
        .then((res)=>{
            console.log(res);
            var li = document.createElement('li');
            x = res.data._id
            li.id = x
            li.appendChild(document.createTextNode(f_n.value));
            li.appendChild(document.createTextNode(' - '));
            li.appendChild(document.createTextNode(m_id.value));
            li.appendChild(document.createTextNode(' '));
            var edit = document.createElement('button');
            edit.id='edit';
            edit.textContent='Edit Button'
            edit.style.borderColor = "green";
            li.appendChild(edit);
            var dte = document.createElement('button');
            dte.id='del';
            dte.textContent='Delete Button';
            dte.style.borderColor = "red";
            li.appendChild(dte);
            list.appendChild(li);
        })
        .catch((err)=>{
            console.log(err);
        });
    //var object = JSON.stringify(result);
    //localStorage.setItem(m_id.value,object);
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/3d3a93165ece43e5a2d3e3f4fcc2a5fe/bookingsdata")
        .then((res)=>{
            for(let i=0;i<res.data.length;i++){
                var li = document.createElement('li');
                li.id = res.data[i]._id
                li.appendChild(document.createTextNode(res.data[i].Name));
                li.appendChild(document.createTextNode(' - '));
                li.appendChild(document.createTextNode(res.data[i].mail_id));
                li.appendChild(document.createTextNode(' '));
                var edit = document.createElement('button');
                edit.id='edit';
                edit.textContent='Edit Button'
                edit.style.borderColor = "green";
                li.appendChild(edit);
                var dte = document.createElement('button');
                dte.id='del';
                dte.textContent='Delete Button';
                dte.style.borderColor = "red";
                li.appendChild(dte);
                list.appendChild(li);
        }
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    
})
function delete_details(e){
    if (e.target.id=='del'){
        if(confirm('Are you sure?')){
            var x = e.target.parentElement;
            // console.log(x.childNodes);
            // item0 = x.childNodes[0].data;
            // item1 = x.childNodes[2].data;
            list.removeChild(x);
            axios.delete(`https://crudcrud.com/api/3d3a93165ece43e5a2d3e3f4fcc2a5fe/bookingsdata/${x.id}`)
                .then(()=>{
                    console.log('Successfully deleted');
                })
                .catch((err)=>{
                    console.log(err);
                })
            // localStorage.removeItem(item1);
        }
    }
}

function edit_details(e){
    if (e.target.id=='edit'){
        var x = e.target.parentElement;
        f_n.value=x.childNodes[0].data;
        m_id.value=x.childNodes[2].data;
        axios.delete(`https://crudcrud.com/api/3d3a93165ece43e5a2d3e3f4fcc2a5fe/bookingsdata/${x.id}`)
            .then(()=>{
                console.log('deleted previous entry');
            })
            .catch((err)=>{
                console.log(err);
        })
        list.removeChild(x);
        //localStorage.removeItem(x.childNodes[2].data);
    }   
}
