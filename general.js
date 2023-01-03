
//GENERAL FUNCTIONS

//PARA ORDENAR ARREGLOS POR NOMBRE
function sortByName(a,b){
    let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
    if(fa < fb) {
        return -1;
    }
    else if (fa > fb) {
        return 1;
    }
    return 0;
};

function sortBySurnameP(a,b){
    let fa = a.surnameP.toLowerCase(),
        fb = b.surnameP.toLowerCase();
    if(fa < fb) {
        return -1;
    }
    else if (fa > fb) {
        return 1;
    }
    return 0;
};

function sortBySubject(a,b){
    let fa = a.subject.toLowerCase(),
        fb = b.subject.toLowerCase();
    if(fa < fb) {
        return -1;
    }
    else if (fa > fb) {
        return 1;
    }
    return 0;
};

//PARA ORDENAR POR CALIFICACIONES EL ARREGLO DE ALUMNOS (ENROLLED STUDENTS)
//(ARREGLO DE OBJETOS CON UN ARREGLO DE GRADES). DESCENDENTE

function sortByGradeD(a,b){
        let selectedSubject = document.getElementById('choose-subject-1');
        let subjectIdA = a.grades.findIndex((subject) => subject.subject == selectedSubject.value);
        let subjectIdB = b.grades.findIndex((subject) => subject.subject == selectedSubject.value);
        let fa, fb;
        if(subjectIdA < 0){
            fa = 0;
        }
        else{
            fa = parseFloat(a.grades[subjectIdA].grade);
        }
        if(subjectIdB < 0){
            fb = 0;
        }
        else{
            fb = parseFloat(b.grades[subjectIdB].grade);
        }
        if(fa > fb) {
            return -1;
        }
        else if (fa < fb) {
            return 1;
        }
        return 0;
};

//PARA ORDENAR ARREGLO DE CALIFICACIONES DE CADA MATERIA (GRADES)
//(ARREGLO DE OBJETOS CON PROPIEDAD GRADE). DESCENDENTE

function sortByGradeDGrades(a,b){
        let fa = parseFloat(a.grade),
            fb = parseFloat(b.grade);
        if(fa > fb) {
            return -1;
        }
        else if (fa < fb) {
            return 1;
        }
        return 0;
};

//PARA ORDENAR POR CALIFICACIONES EL ARREGLO DE ALUMNOS
//(ARREGLO DE OBJETOS CON UN ARREGLO DE GRADES). ASCENDENTE

function sortByGradeA(a,b){
        let selectedSubject = document.getElementById('choose-subject-1');
        let subjectIdA = a.grades.findIndex((subject) => subject.subject == selectedSubject.value);
        let subjectIdB = b.grades.findIndex((subject) => subject.subject == selectedSubject.value);
        let fa, fb;
        if(subjectIdA < 0){
            fa = 0;
        }
        else{
            fa = parseFloat(a.grades[subjectIdA].grade);
        }
        if(subjectIdB < 0){
            fb = 0;
        }
        else{
            fb = parseFloat(b.grades[subjectIdB].grade);
        }
        if(fa < fb) {
            return -1;
        }
        else if (fa > fb) {
            return 1;
        }
        return 0;
};

//PARA ORDENAR ARREGLO DE CALIFICACIONES DE CADA MATERIA (GRADES)
//(ARREGLO DE OBJETOS CON PROPIEDAD GRADE). ASCENDENTE

function sortByGradeAGrades(a,b){
    let fa = parseFloat(a.grade),
        fb = parseFloat(b.grade);
    if(fa < fb) {
        return -1;
    }
    else if (fa > fb) {
        return 1;
    }
    return 0;
};

//PARA ACTUALIZAR SELECT DE MATERIAS
function updateSubjectSelect(){
    const subjectSelect = document.getElementById("choose-subject");
    let subjectSelectLength = subjectSelect.options.length -1;
    for(let i=subjectSelectLength; i >= 0; i--){
        subjectSelect.remove(i);
    }
    school.subjectsArray.forEach(subject =>
        subjectSelect.add(
            new Option(subject.name)
        )
    );
    const subjectSelect1 = document.getElementById("choose-subject-1");
    let subjectSelectLength1 = subjectSelect1.options.length -1;
    for(let i=subjectSelectLength1; i >= 0; i--){
        subjectSelect1.remove(i);
    }
    school.subjectsArray.forEach(subject =>
        subjectSelect1.add(
            new Option(subject.name)
        )
    );
}

// PARA BUSCAR ESTUDIANTES POR NOMBRE O APELLIDO
function busquedaBinariaPersona(arreglo, nombre, propiedad){
    
    let min = 0;
    let max = arreglo.length-1; //Posicion maxima
    let mitad;
    let arregloIndices = [];

    while(min <= max){ // min != max
        mitad = Math.floor( (min + max)/2);
        if(nombre == arreglo[mitad][propiedad]){
            let indiceEncontrado = mitad;
            while(arreglo[mitad] != undefined && nombre == arreglo[mitad][propiedad]){
                arregloIndices.push(mitad);
                mitad++;
            }
            mitad = indiceEncontrado-1;
            while(arreglo[mitad] != undefined && nombre == arreglo[mitad][propiedad]){
                arregloIndices.push(mitad);
                mitad--;
            }
            break;
        }else if(nombre > arreglo[mitad][propiedad]){
            //Tomaras el lado derecho (indices mayores)
            min = mitad + 1;
        }else {
            //Tomaras el lado izquierdo (indices menores)
            max = mitad - 1;
        }
    }
    arregloIndices.sort((a,b) => a-b);
    return arregloIndices;
}

//PARA BUSCAR EXISTENCIA DE VALOR DE PROPIEDAD EN OBJETO DENTRO DE ARREGLO
function containsObject(value,array){
    for(let i = 0; i < array.length; i++){
        if(Object.values(array[i]).includes(value)){
           return i; 
        }
    }
    return -1;
}

// CALCULAR PROMEDIO DE CALIFICACIONES DE UN ARREGLO

function gradeAverage(array){
    let sum = 0;
    let average = 0;
    array.forEach(element => sum += parseFloat(element.grade));
    average = sum/array.length;
    return average;
}

// CALCULAR PROMEDIO DE CALIFICACIONES DE UN ARREGLO DE OBJETOS GRADE

function gradesArrayAverage(objectArray){
    let sum = 0;
    let average = 0;
    let onlyGradesArray = [];
    objectArray.forEach(object => onlyGradesArray.push(object.grade));
    onlyGradesArray.forEach(element => sum += parseFloat(element));
    average = sum/onlyGradesArray.length;
    return average;
}

function findIfCredentialsExist(array,name,surnameP,surnameM){
    for (let i=0; i<array.length;i++){
        if(array[i].name === name && array[i].surnameP === surnameP && array[i].surnameM === surnameM){
            return true;
        }
    }
    return false;
}

//FUNCION PARA MOSTRAR EL ARREGLO DE OBJETOS DE ESTUDIANTES PREDETERMINADOS PARA HACER PRUEBAS
function showDefaultSchoolStudents(studentArray){
    const testStudentsCard = document.getElementById("test-students-card-list");
    const testStudentsCard1 = document.getElementById("test-students-card-list-1");
    studentArray.forEach(student => {
        let studentInfo = document.createElement("li");
        let studentInfo2 = document.createElement("li");
        studentInfo.innerHTML = student.name + " " + student.surnameP + " " + student.surnameM;
        studentInfo2.innerHTML = student.name + " " + student.surnameP + " " + student.surnameM;
        testStudentsCard.appendChild(studentInfo);
        testStudentsCard1.appendChild(studentInfo2);
    });
}




updateSubjectSelect();
school.studentArray.sort(sortByName);
school.subjectsArray.sort(sortByName);
showDefaultSchoolStudents(school.studentArray);


//bugs to fix (not in the scope of this project):
//1. To order in asc or desc every student must be graded, or else the function doesnt work
//2. 