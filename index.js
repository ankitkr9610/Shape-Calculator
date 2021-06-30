class Shape{
    createShape(type){
        switch(type){
            case "rectangle": return new Rectangle();
            case "circle": return new Circle();
            case "square": return new Square();
            case "ellipse": return new Ellipse();
            default: console.log("Cannot create shape:" + type);
        }               
    }
}

class Rectangle{
    constructor(){
        this.variable=["length","breadth"];
    }
    getArea(length, breadth){
        return length*breadth;
    }
}

class Circle{
    constructor(){
        this.variable=["diameter"];
    }
    getArea(diameter){
        return (Math.PI*diameter*diameter/4);
    }
}

class Square{
    constructor(){
        this.variable=["side"];
    }
    getArea(side){
        return side*side;
    }
}

class Ellipse{
    constructor(){
        this.variable=["minor-Axis","major-Axis"];
    }
    getArea(minorAxis, majorAxis){
        return (Math.PI*minorAxis*majorAxis);
    }
}

let shapeCreator = new Shape();
let choice, input1, input2;
let selectedShape;

function goToStep2(){
    let shapes = document.querySelectorAll('input');
    for(shape of shapes){
        console.log(shape);
        if(shape.checked){
            choice = shape.id;
        }
    }

    if(choice == undefined){
        alert('Please select a shape');
    }
    else{
        //hide the step1 div
        document.getElementById("step1").style.display="none";

        //show the step2 div
        document.getElementById("step2").style.display="block";

        //add the custom line
        document.getElementById("step2-para").innerHTML = `You have selected a <b>${choice}</b>, please input the required variables.`;

        //add custom textbox to get the variables
        selectedShape = shapeCreator.createShape(choice);
        input1 = selectedShape.variable[0];
        input2 = selectedShape.variable[1];
        document.getElementById("step2-div").innerHTML = selectedShape.variable.length > 1 ? 
                                                        `<label for="${input1} class="shape-variable"><b>${input1[0].toUpperCase()+input1.slice(1)}</b>:</label> <input type="textbox" class="variable" name="inputs" id="${input1}"></input></br>
                                                        <label for="${input2}" class="shape-variable"><b>${input2[0].toUpperCase()+input2.slice(1)}</b>:</label> <input type="textbox" class="variable" name="inputs" id="${input2}"></input>`
                                                        :`<label for="${input1}" class="shape-variable"><b>${input1[0].toUpperCase()+input1.slice(1)}</b>:</label> <input type="textbox" class="variable" name="inputs" id="${input1}"></input></br>`

    }

}

function goToStep3(){
    //read the input
    inputs=document.getElementsByName('inputs');
    let areaVariable = [];
    let area;
    for(input of inputs){
        areaVariable.push(input.value);
    }

    //hide the step2 div
    document.getElementById("step2").style.display = "none";

    //show the step3 div
    document.getElementById("step3").style.display = "block";

    //calculate the area 
    area = selectedShape.getArea(...areaVariable);

    //add the custom para
    document.getElementById("step3-para").innerHTML = `You have selected a <b>${choice}</b> with ${input1} ${areaVariable[0]}${areaVariable.length>1 ? ' and ' + input2 + ' ' + areaVariable[1] + '.':'.'} Below is your result:`
    
    //add the result
    document.getElementById('result').innerHTML=`The Area is ${area.toFixed(2)}`;
}