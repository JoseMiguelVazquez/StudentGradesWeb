class School{
    constructor(name){
        this.name = name;
        this.subjectsArray = [];
        this.studentArray = [];
    }

    studentRegister(){
        const registerForm = document.getElementById("register-form");
        const studentName = document.getElementById("register-name");
        const surnameOne = document.getElementById("register-surname-1");
        const surnameTwo = document.getElementById("register-surname-2");
        const age = document.getElementById("register-age");
        this.studentArray.push(new Student(studentName.value, surnameOne.value, surnameTwo.value, parseInt(age.value)));
        this.studentArray.sort(sortByName);
        console.log(this.studentArray);
        registerForm.reset();
    }

    subjectRegister(){
        const subjectForm = document.getElementById("subject-form");
        const subject = document.getElementById("register-subject");
        const professor = document.getElementById("register-professor");
        const subjectSelect = document.getElementById("choose-subject").options;
        const subjectSelect1 = document.getElementById("choose-subject-1").options;
        this.subjectsArray.push(new Subject(subject.value, professor.value));
        this.subjectsArray.sort(sortByName);
        subjectSelect.add(new Option(subject.value));
        subjectSelect1.add(new Option(subject.value));
        updateSubjectSelect();
        console.log(this.subjectsArray);
        subjectForm.reset();
        }

    getSubject(id){
        const selectedSubject = document.getElementById(id).value;
        const subjectIndex = this.subjectsArray.findIndex((subject) => subject.name == selectedSubject);
        return subjectIndex;
    }

    findStudent(array,idInput,nameRadio,idSelect){
        const studentName = document.getElementById(idInput).value;
        const radio = document.getElementsByName(nameRadio);
        const studentSelect = document.getElementById(idSelect);
        let studentIndexes = [];
        for(let index = studentSelect.options.length -1;index >= 0; index--){
            studentSelect.remove(index);
        }
        if(radio[0].checked){//por apellido paterno
            array.sort(sortBySurnameP);
            studentIndexes = busquedaBinariaPersona(array,studentName,"surnameP");
        }
        else if (radio[1].checked){//por Nombre
            array.sort(sortByName);
            studentIndexes = busquedaBinariaPersona(array,studentName,"name");
        }
        if(studentIndexes.length == 0){
            alert("No se encontró el Alumno, intente escribir su nombre con mayúsculas y puntuación exacta");
        }
        else{
            studentIndexes.forEach(studentIndex =>
                studentSelect.add(
                    new Option(studentIndex + " - " + this.studentArray[studentIndex].name + " " + this.studentArray[studentIndex].surnameP + " " + this.studentArray[studentIndex].surnameM)
                )
            );
        }
        
        // const studentIndex = this.studentArray.findIndex((student) => student.name == studentName); //hacerlo con busqueda binaria?
        // console.log(studentIndex);
        // return studentIndex;
    }

    getStudent(selectId){
        const selectedStudent = document.getElementById(selectId).value;
        let studentIndex = selectedStudent.split(" ")[0];
        return this.studentArray[studentIndex];
    }

    showStudentInfo(student){
        const studentSubjectsGrades = document.getElementById("student-subjects-grades");
        let studentNameGrade = student.name + " " + student.surnameP + " " + student.surnameM;
        studentSubjectsGrades.innerHTML = `<h3>${studentNameGrade}</h3>
                                        <p class="d-inline col-6"><strong>Materia</strong></p>
                                        <p class="d-inline col-6 text-end"><strong>Calificación</strong></p>`;
        student.grades.forEach((subject) => {
            let gradeListDiv = document.createElement("div");
            gradeListDiv.classList.add("row");
            gradeListDiv.innerHTML = `<p class="d-inline col-6">${subject.subject}</p>
                            <p class="d-inline col-6 text-end">${subject.grade}</p>`;
            studentSubjectsGrades.appendChild(gradeListDiv);
        }
        );
        let average = document.createElement("h4");
        average.classList.add("row");
        average.innerHTML = `<h4 class="d-inline col-12 text-end">Promedio del Alumno: ${gradesArrayAverage(student.grades)}</h4>`;
        studentSubjectsGrades.appendChild(average);
        console.log(gradesArrayAverage(student.grades));
    }
}



// VARIABLES
let school = new School("Escuela");

school.studentArray = [
    new Student("Pedro","Vazquez","Ramirez",28), new Student("Rodrigo","Martinez","Mancera",27),
    new Student("Dario","Sosa","Villa",26), new Student("Sebastian","Franco","Hidalgo",30),
    new Student("Sergio","Diaz","Ortuño",30), new Student("Diego","Espejel","Visconti",31),
    new Student("Dario","Vargas","Fernandez",28)
];

school.subjectsArray = [
    new Subject("Computer Science","Jesua Lujan"), new Subject("Javascript","David Maya")
];


