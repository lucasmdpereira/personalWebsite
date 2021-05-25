function start(){
    let skills= takeChecked();
    skillGraph(skills);
}

function drawFigure(nOfVertices,centerCanvasX,centerCanvasY,graph,x,y){
    
    if (nOfVertices == 1){
        graph.beginPath();
        graph.moveTo(centerCanvasX, centerCanvasY);
        graph.lineTo(x[0]+centerCanvasX, y[0]+centerCanvasY);
    }

    else{
        graph.beginPath();
        for (i=0; i < nOfVertices; i++){
            if (i == 0){
                graph.moveTo(x[i]+centerCanvasX, y[i]+centerCanvasY);
            }
            else
                graph.lineTo(x[i]+centerCanvasX, y[i]+centerCanvasY);
        }   
    }
    
}

function drawGuideLine(graph, centerCanvasX, centerCanvasY, maxPoints, iteration){
    let xPosition= centerCanvasX;
    for (let i=0; i <= maxPoints; i++){
        if (i == 0){

        }else{
            graph.textAlign= "right";
            graph.textBaseline = "middle";
            graph.font= '18.5px serif';
            xPosition += Math.round(iteration);
            graph.fillText('°', xPosition+3, centerCanvasY+5);
            graph.font= '16px serif';
            graph.fillText((i*100/maxPoints), xPosition-7, centerCanvasY+2);
        }

    }   
}

function skillGraph(skills){
    
    let g = document.getElementById("myCanvas");
    let zoomAdjust= 80;
    const graph = g.getContext("2d");
    const centerCanvasX= g.width/2;
    const centerCanvasY= g.height/2;
    const maxRadius= (g.height/2)-zoomAdjust;
    const nOfVertices= skills.Grade.length;

    g.width= g.width;
    graph.fillStyle = "rgba(0, 0, 0, 0)";    
    graph.fillRect(0, 0, g.width, g.height);
    graph.fillStyle = "rgba(0, 0, 0, 1)";  

    const maxPoints= 5;
    let radius= maxRadius;
    const iteration= radius/maxPoints;
    let [x0,y0]=[[],[]];
    let Spacing= 70;
    
    //Monta referência
    for (let i=0; i < maxPoints; i++){
        [x0, y0]= getReferenceVertices(nOfVertices,radius);
        drawFigure(nOfVertices,centerCanvasX,centerCanvasY,graph,x0,y0);
        graph.closePath();
        graph.lineWidth= 0.75;
        graph.strokeStyle= "rgba(117, 117, 117, 1)"
        graph.stroke();

        // Escreve nome da skill
        if (i == 0){
            for (let j=0; j < skills.Name.length; j++)
            {
                [x0, y0]= getReferenceVertices(nOfVertices,radius+Spacing);
                graph.textAlign= "center";
                graph.textBaseline = "middle";
                graph.font= '26px serif';
                graph.fillText(skills.Name[j], x0[j]+centerCanvasX-5, y0[j]+centerCanvasY);
            }
        }
        

        if (x0.length <= 2){
            break;
        }     
 
        radius= (radius - iteration);

    } 

    //Monta eixo de referência
    radius= maxRadius;
    drawGuideLine(graph, centerCanvasX, centerCanvasY, maxPoints, iteration);
    
    
    //Monta gráfico com notas.
    let [x, y]= getVertices(nOfVertices,maxRadius,skills);
    graph.fillStyle = "rgba(4, 130, 117, 0.75)";
    graph.strokeStyle= "rgba(7, 83, 75, 0.75)"
    drawFigure(nOfVertices,centerCanvasX,centerCanvasY,graph,x,y)
    graph.closePath();
    graph.fill();
    graph.lineWidth= 3;
    graph.stroke();
    
    
}

function takeChecked() { 
    const elements = document.getElementsByClassName('habilidades__check');
    let skillName=[];
    let skillGrade=[];
    const stop= elements.length;
    for(let i= 0, j=0; i < stop; i++){
        if(elements[i].checked){
            skillName[j]=  elements[i].name;
            skillGrade[j]=  elements[i].value;
            j++;
            
        }    
    }

    
    return {Name: skillName,
            Grade: skillGrade};

} 

function getReferenceVertices(nOfVertices,maxRadius){
    let mod0=[];
    let arg0=[];
    const angularDif= 360/nOfVertices;
    //Reference vectors
    for (i= 0; i < nOfVertices; i++){
        //Calcular vértices em polar
        mod0[i]=maxRadius;
        if (i == 0)
            arg0[i]= 0;
        else
            arg0[i]= arg0[i-1]+angularDif;
        }
    verticesPoints= polarToRadian(mod0,arg0);

    return verticesPoints;
}

function getVertices(nOfVertices,maxRadius,skills){
    let mod=[];
    let arg=[];
    let verticesPoints=[];
    const angularDif= 360/nOfVertices;
    //Vectors according to skills
    for (i= 0; i < nOfVertices; i++){
        //Calcular vértices em polar
         mod[i]=skills.Grade[i]*maxRadius;
         if (i == 0)
             arg[i]= 0;
         else
             arg[i]= arg[i-1]+angularDif;
    }

    
    verticesPoints= polarToRadian(mod,arg);

    return verticesPoints;

}

function polarToRadian(mod,arg){
    const stop= mod.length;
    let x=[];
    let y=[];
    let argRad=[];

    for (i=0; i < stop; i++){
        argRad[i]= arg[i]*(Math.PI/180);
        x[i]=Math.cos(argRad[i])*mod[i];
        y[i]=Math.sin(argRad[i])*mod[i];
    }

    return [x,y];

}


  