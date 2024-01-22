document.getElementById("studentList").addEventListener('submit', function (event){
    event.preventDefault();
})
let students = JSON.parse(localStorage.getItem("student")) || [];
renderStudents(students);
function renderStudents(array){
    let html = "";
    for (let i = 0; i < array.length; i++) {
        if(!array[i].status){
            html +=
            `
            <tr>
                <th>${i+1}</th>
                <th>${array[i].name}</th>
                <th>${array[i].email}</th>
                <th>${array[i].phone}</th>
                <th>${array[i].country}</th>
                <th>${array[i].gender}</th>
                <th><button onclick="editItem('${array[i].name}')">Edit</button></th>
                <th><button onclick="deleteItem('${array[i].name}')">Delete</button></th>
            </tr>
            `
        }
    }
    document.getElementById("tbody").innerHTML=html;
}
function deleteItem(name){
    let students = JSON.parse(localStorage.getItem("student")) || [];
    let result = students.findIndex((item, index, array) =>{
        return item.name == name;
    });
    students.splice(result, 1);
    localStorage.clear();
    localStorage.setItem("student", JSON.stringify(students));
    renderStudents(students);
}
function editItem(name){
    let students = JSON.parse(localStorage.getItem("student")) || [];
    let result = students.findIndex((item, index, array) =>{
        return item.name == name;
    });
    students[result].isEditing = true;
    localStorage.setItem("student", JSON.stringify(students));
    window.location.href = "index.html";
}
function sortByName(){
    let students = JSON.parse(localStorage.getItem("student")) || [];
    students.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if(nameA < nameB){
            return -1;
        }
        if(nameA > nameB){
            return 1;
        }
        return 0;
    });
    localStorage.clear();
    localStorage.setItem("student", JSON.stringify(students));
    renderStudents(students);
}
function searchItem()
{
    let students = JSON.parse(localStorage.getItem("student")) || [];
    let searchList = [];
    let searchInput = document.getElementById("search").value;
    let result = students.filter((item, index, array) => {
        return item.name.startsWith(searchInput);
    });
    
    for (let i = 0; i < students.length; i++) {
        if(students[i].name == searchInput){
            searchList.push(students[i]);
        }
    }
    renderStudents(result);
}