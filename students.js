// CLASSES

class Student{
    constructor(name, surnameP, surnameM, age){
        this.name = name;
        this.surnameP = surnameP;
        this.surnameM = surnameM;
        this.age = age;
        this.grades = [];
    }

}

class StudentGrade{
    constructor(subject,grade){
        this.subject = subject;
        this.grade = grade;
    }
}

