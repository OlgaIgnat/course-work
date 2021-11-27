// Реализуйте класс Student (Студент) и Teacher (Учитель), который будет наследоваться от класса User, 
// Этот класс должен иметь следующие свойства: name (имя, наследуется от User), surname (фамилия, наследуется от User), year (год поступления в вуз). 
// Класс должен иметь метод getFullName() (наследуется от User), с помощью которого можно вывести одновременно имя и фамилию студента. 
// Также класс должен иметь метод getCourse(), который будет выводить текущий курс студента (от 1 до 5). Курс вычисляется так: нужно от текущего года отнять год поступления в вуз. Текущий год получите самостоятельно


// User
// -	Name
// -	Surname
// -	Status (учитель или студент)
// -	getFullName() метод

// Student
// -	 Наследует все свойства USER
// -	 Свои свойства: Year – год поступления
// -	 getCourse() – вывод текущего курса

// Teacher
// -	Наследует все свойства USER
// -	+ свои свойства – предмет (может быть несколько!) и зарплата
// -	Метод getCourse() – выводит все предметы, которые преподает
// Можно добавлять свои методы и параметры

// class User {
//     constructor(data){
//        this.name = data.name;
//        this.surname = data.surname;
//        this.status = data.status;
//     }
//     getFullName() {
//         if(!this.name || !this.surname || !this.status){
//             alert("Вы ввели не все данные!");
//             return
//         }else{
//         document.write(this.status + ": " + this.surname+ "  " + this.name + "<br>")
//         }
//     }
// }

// let user = new User({name:"Ольга", surname: "Игнатюк", status: "Абитуриент"});
// console.log (user);
// user.getFullName();
// document.write("----------------------------------------------------------------" + "<br>")

// class Student extends User {
//     constructor(data){
//         super(data);
//         this.year = data.year;
//     }
//     getCourse(){
//         let dateNow = new Date();
//         let yearNow = dateNow.getFullYear();
//         let courseNum = +yearNow - +this.year + 1;
//         if(+courseNum > 5 || !this.year){
//             alert("Год начала обучения введен неверно! Введите 4-х значное число. ");
//             return
//         }else{
//         document.write("Обучается на "+ +courseNum + " курсе" + "<br>")}
//     }

// }

// let student = new Student({name:"Мария", surname: "Петрова", status: "Студент", year: "2021"});
// console.log (student);
// student.getFullName();
// student.getCourse();
// document.write("----------------------------------------------------------------" + "<br>")

// class Teacher extends User{
//     constructor(data){
//         super(data);
//         this.subject = data.subject;
//         this.salary = data.salary;
//     }
//     getCourse(){
//         let subjectArr = this.subject.split(",")
//         document.write("Предметы: "+ " <br>") 
//         for(let i=0;i<subjectArr.length;i++){
//             document.write( (i+1) + ")" + subjectArr[i] + "<br>")
//         }
//     }
//     getSalary(){
//         document.write("Зарплата : " + +this.salary + "<br>");  
//     }   

// }

// let teacher = new Teacher({name:"Анна", surname: "Иванова", status: "Преподаватель", subject: "английский, математика, экономика, история", salary: "1000"});
// console.log (teacher);
// teacher.getFullName();
// teacher.getCourse();
// teacher.getSalary();
// document.write("----------------------------------------------------------------" + "<br>") 
//----------------------------------------------------------------------------------------------------------------------


class User{
    constructor(id,
        name, email, address, phone){
            this.datauser = {id,
                name, email, address, phone};
    }
    edit(newInfo){        
       this.datauser = {id: this.datauser.id,
                        name: newInfo.name || this.datauser.name,
                        email: newInfo.email || this.datauser.email,
                        address: newInfo.address || this.datauser.address,
                        phone: newInfo.phone || this.datauser.phone 
                     }        
    }

    get info(){
        return this.datauser;
    }

    get (){
        return this.data ;  
    }
}


class Contacts{
    constructor(){
        this.data = [];
    }
    
    add(name, email, address, phone, idNew){        
        let id;
        (this.data.length==0) ? id=1 : id=this.data[this.data.length-1].datauser.id+1;
        id = idNew || id;
        let newUser = new User(id,
                name, email, address, phone);
        this.data.push(newUser);        
    }

    edit(id, newInfo){        
        let index = this.data.findIndex(elem=> +elem.datauser.id=== +id);
        console.log(id, newInfo);
        this.data[index].edit(newInfo);
    }
    
    remove(id){
        this.data = this.data.filter( elem=> elem.datauser.id!=id);
    }

    removeAll() {
        this.data = [];
    }

    getInfo(id){
        let index = this.data.findIndex(elem=> elem.datauser.id===id);
        console.log(this.data[index].get)
    }    
        
    get(){
        return this.data;
    }
        
}


class ContactsApp extends Contacts{
    constructor(data){
        super(data);
        this.apiData();        
    }
    createContacts () {             
        let contactsTable =  document.querySelector(".contacts-table");
    
        contactsTable.classList.add("active");
        
        let table= contactsTable.querySelector("tbody");     
        table.innerHTML = " ";    
        console.log(this.data);
        this.data.forEach((user, index)=>{
           let stringTable = document.createElement("tr");                    
            stringTable.innerHTML = `
            <td>${user.datauser.id}</td>
            <td>${user.datauser.name}</td>
            <td>${user.datauser.email}</td>
            <td>${user.datauser.address.city || user.datauser.address}</td>
            <td>${user.datauser.phone}</td>
            
            <td><button class="pencil" data-index="${index}" onClick="editContact(${user.datauser.id})"></button></td>
            <td><button class="basket" data-index="${index}" onClick="deleteContact(${user.datauser.id})" ></button></td>
            `
        table.appendChild(stringTable);       
        
        });
    }

    setStorage(){
         localStorage.setItem("users", JSON.stringify(this.data));
    }

    getStorage(){
        let localUsersData =  JSON.parse(localStorage.getItem("users")); 
         if(localUsersData && localUsersData.length > 0) {
            localUsersData.forEach(element =>{
                this.add(element.datauser.name, element.datauser.email, element.datauser.address, element.datauser.phone, element.datauser.id)
            }) 
         }
    }
    async apiData(){        
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) return;

        let Apidata = await response.json();
        //console.log(Apidata, response.status);
        //console.log(Apidata[1].username);
        //console.log(this.data);        
        if (this.data.length==0){                        
            Apidata.forEach((user,index) =>{
                //console.log(Apidata[index].username);
                addUserContact(Apidata[index].username, Apidata[index].email, Apidata[index].address, Apidata[index].phone);                
            })
        };

    };
    
}  


let getInfoForm = function(){
    let form = document.querySelector("#contactForm");
    let userName = document.querySelector("#inputName").value;
    let email = document.querySelector("#inputEmail").value;
    let address = document.querySelector("#inputAddress").value;
    let phone = document.querySelector("#inputPhone").value;
    
    if(!userName ||  userName.value == " "){
        document.querySelector("#inputName").classList.add("red");}       

    if(!email ||  email.value == " "){
        document.querySelector("#inputEmail").classList.add("red");}     
    
    if(!address ||  address.value == " "){
        document.querySelector("#inputAddress").classList.add("red");}         
    
    if(!phone ||  phone.value == " "){
            document.querySelector("#inputPhone").classList.add("red");
            return false;
    }else    
        addUserContact(userName, email, address, phone);
        form.reset();
       
        document.querySelector("#inputName").classList.remove("red");
        document.querySelector("#inputEmail").classList.remove("red");
        document.querySelector("#inputAddress").classList.remove("red");
        document.querySelector("#inputPhone").classList.remove("red");
};



let addUserContact = function(userName, email, address, phone){  
    contactList.add(userName, email, address, phone);   
    //alert("Contact added successfully!");    
    contactList.createContacts();    
    contactList.setStorage();
};

let clearContact = function(){
    document.querySelector("#inputName").value = "";
    document.querySelector("#inputEmail").value = "";
    document.querySelector("#inputAddress").value = "";
    document.querySelector("#inputPhone").value = "";
}

let showContacts = function(){    
    contactList.getStorage();
    contactList.createContacts();
  
};
let deleteContact = function(index){
    contactList.remove(index);
    contactList.createContacts();
    contactList.setStorage();
};

let editContact = function(id){    
    document.querySelector("#buttonEditContact").dataset.id = id;
    document.querySelector(".contacts_notes_edit").classList.add("active");
    //console.log(array.User.datauser);
    let name = document.querySelector("#inputName_edit"); 
    let email = document.querySelector("#inputEmail_edit"); 
    let address = document.querySelector("#inputAddress_edit"); 
    let phone = document.querySelector("#inputPhone_edit");    

    let user = contactList.data.filter(user =>{
        if(+user.datauser.id == +id) return user;
    })

    name.value = user[0].datauser.name; 
    email.value = user[0].datauser.email;
    address.value = user[0].datauser.address; 
    phone.value = user[0].datauser.phone;   
};

let editNewContact = function(){    
    let id = document.querySelector("#buttonEditContact").dataset.id;    
    newInfo={
        name: document.querySelector("#inputName_edit").value,
        email: document.querySelector("#inputEmail_edit").value,
        address: document.querySelector("#inputAddress_edit").value,
        phone: document.querySelector("#inputPhone_edit").value
    }   
    contactList.edit(id,newInfo);   
    contactList.createContacts();
    contactList.setStorage();   
    document.querySelector("#buttonEditContact").removeAttribute("dataset.id");
    document.querySelector(".contacts_notes_edit").classList.remove("active");
    let formEdit = document.querySelector("#contactFormEdit");
    formEdit.reset();
}

let contactList = new ContactsApp();
showContacts();


//let contact = new Contacts;
// contact.add("1", "Anna", "anna@gmail", "Brest", "1000000");
// contact.add("2", "Olga", "olga@gmail", "Minsk", "2000000");
// contact.add("3", "Mary", "mary@gmail", "Gomel", "3000000");
// contact.remove("3");
// console.log(contact);
 
//contactList.add("Anna", "anna@gmail", "Brest", "1000000");
//contactList.add("Bob", "bob@gmail", "Berlin", "2000000");
//console.log(contactList)
//contactList.edit(1,{name: "ГришинNew", email: "text@mail.ruNEW",address: "VitebskNEW",phone: "+375NEW"});
// contactList.add("Mary", "mary@gmail", "Gomel", "3000000");
//console.log(contactList);


//document.querySelector("#buttonCreateContact").addEventListener('click', getInfoForm);
//let buttonShow = document.querySelector("#buttonShowContacts");
//buttonShow.addEventListener("click", showContacts)
