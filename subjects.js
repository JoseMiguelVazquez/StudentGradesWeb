// CLASSES

class Subject{
    constructor(name, professor){
        this.name = name;
        this.professor = professor;
        this.enrolledStudents = [];
        this.grades = [];
    }

    enrollStudent(){
        const selectedStudent = document.getElementById("choose-student").value;
        let enrolledStudentIndex = selectedStudent.split(" ")[0];
        let studentName = school.studentArray[enrolledStudentIndex].name;
        let studentSurnameP = school.studentArray[enrolledStudentIndex].surnameP;
        let studentSurnameM = school.studentArray[enrolledStudentIndex].surnameM;
        if(findIfCredentialsExist(this.enrolledStudents,studentName,studentSurnameP,studentSurnameM)){

        }
        else{
            this.enrolledStudents.push(school.studentArray[enrolledStudentIndex]);
        }
        alert(`Alumno: ${studentName} ${studentSurnameP} ${studentSurnameM} Inscrito en: ${this.name}`);
        console.log(this.name);
        console.log(this.enrolledStudents);
    }

    updateStudentList(){
        const enrolledStudentList = document.getElementById("enrolled-student-list");
        enrolledStudentList.innerHTML = `<h4>Materia: ${this.name}</h4>
                                        <h4>Profesor: ${this.professor}`;
        this.enrolledStudents.forEach((student,index) => {
            let studentName = this.enrolledStudents[index].name + this.enrolledStudents[index].surnameP + this.enrolledStudents[index].surnameM;
            let listDiv = document.createElement("div");
            listDiv.classList.add("row");
            listDiv.innerHTML = `<p class="d-inline col-4 col-md-3">${student.name}</p>
                            <p class="d-inline col-4 col-md-3">${student.surnameP}</p>
                            <p class="d-inline col-4 col-md-3">${student.surnameM}</p>
                            <div class="row mb-3 col-10 col-sm-6 col-lg-3">
                                <input type="number" min="0" max="10" placeholder="0" class="form-control form-control-sm d-inline w-25 col-6" id="grade-${index}">
                                <button type="button" class="btn btn-primary d-inline w-75 col-6" onclick="school.subjectsArray[school.getSubject('choose-subject-1')].assignGrade(${index})">Calificar</button>
                            </div>`;
            enrolledStudentList.appendChild(listDiv);
            let gradeInput = document.getElementById(`grade-${index}`);
            let subIndex = containsObject(studentName,this.grades);
            if(subIndex > -1){
                gradeInput.value = this.grades[subIndex].grade;
            }
        }
        );
    }

    assignGrade(index){
        const grade = document.getElementById(`grade-${index}`).value;
        let studentName = this.enrolledStudents[index].name + this.enrolledStudents[index].surnameP + this.enrolledStudents[index].surnameM;
        if(containsObject(studentName,this.grades)> -1){
            this.grades[index].grade = grade;
            let subIndex = containsObject(this.name,this.enrolledStudents[index].grades);
            console.log(subIndex);
            this.enrolledStudents[index].grades[subIndex].grade = grade;
        }
        else {
            this.grades.push(new SubjectGrade(studentName,grade));
            this.enrolledStudents[index].grades.push(new StudentGrade(this.name, grade));
        }
        this.enrolledStudents[index].grades.sort(sortBySubject);
        //alert("Alumno Calificado");
        console.log(this.grades);
        console.log(this.enrolledStudents);
    }

    groupAverage(){
        let averageSpan = document.getElementById("average-span");
        if(this.grades.length > 0){
            averageSpan.innerHTML = gradeAverage(this.grades);
        }  
    }

    gradeArrangeD(){
        this.enrolledStudents.sort(sortByGradeD);
        this.grades.sort(sortByGradeDGrades);
        console.log(this.grades);
        console.log(this.enrolledStudents);
        this.updateStudentList();
    }

    gradeArrangeA(){
        this.enrolledStudents.sort(sortByGradeA);
        this.grades.sort(sortByGradeAGrades);
        console.log(this.grades);
        console.log(this.enrolledStudents);
        this.updateStudentList();
    }

}

class SubjectGrade{
    constructor(studentName,grade){
        this.studentName = studentName;
        this.grade = grade;
    }
}
