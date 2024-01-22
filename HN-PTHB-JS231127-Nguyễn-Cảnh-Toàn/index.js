let isEditing = false;
renderStudent();
class Student{
    constructor(name, email, phone, country, gender, isEditing){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.country = country;
        this.gender = gender;
        this.isEditing = isEditing;
    }
    addStudent(students){
        students.push(this);
    }
    editStudent(students, index){
        students[index].name = document.getElementById("name").value;
        students[index].email = document.getElementById("email").value;
        students[index].phone = document.getElementById("phone").value;
        students[index].country = document.getElementById("country").value;
        students[index].gender = document.querySelector('input[name="gender"]:checked').value;
        students[index].isEditing = false;
    }
    validate() {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let country = document.getElementById("country").value;

        if (!name.trim()) {
            alert("Họ và tên không được để trống.");
            return false;
        }

        // Add email validation
        if (!validateEmail(email)) {
            alert("Email không đúng định dạng.");
            return false;
        }

        // Add phone validation
        if (!validatePhone(phone)) {
            alert("Số điện thoại không đúng định dạng.");
            return false;
        }

        if (!country.trim()) {
            alert("Quê quán không được để trống.");
            return false;
        }

        return true;
    }
}
function renderStudent(){
    let students = JSON.parse(localStorage.getItem("student")) || [];
    if(students[0] != null){
        let check = students.findIndex((item, index, array) =>{
            return item.isEditing == true;
        });
        if(check != -1){
            isEditing = true;
            document.getElementById("name").value = students[check].name;
            document.getElementById("email").value = students[check].email;
            document.getElementById("phone").value = students[check].phone;
            document.getElementById("country").value = students[check].country;
            let gender = students[check].gender;
            document.querySelector(`input[name="gender"][value="${gender}"]`).checked = true;
        }else{
            document.querySelector('input[name="gender"][value="nam"]').checked = true;
        }
    }
}
function Save(e){
    e.preventDefault();
    if (!validateForm()) {
        return;
    }
    let students = JSON.parse(localStorage.getItem("student")) || [];
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let country = document.getElementById("country").value;
    let gender = document.querySelector('input[name="gender"]:checked').value;

    let student = new Student(name, email, phone, country, gender, isEditing);
    if(students[0] != null && isEditing != false){
        let index = students.findIndex((item, index, array) =>{
            return item.isEditing == true;
        });
        student.editStudent(students, index);
        localStorage.setItem("student", JSON.stringify(students));
        isEditing = false;
        window.location.href = "danhsachhocvien.html";
    }
    else{
        student.addStudent(students);
        localStorage.setItem("student", JSON.stringify(students));
    }
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(03|05|07|08|09)+([0-9]{8})$/;
    return phoneRegex.test(phone);
}

function validateForm() {
    let student = new Student();
    return student.validate();
}