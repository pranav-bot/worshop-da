let data;
let months;

let currentYear = 0;
let currentMonth = 0;

let prevAnmoly = 0;

function preload(){
  data = loadTable("giss_data.csv",'csv',"header")

}
function setup() {  
  createCanvas(600, 600);
  console.log(data.getRowCount());
  console.log(data.getColumnCount());
  let row =   data.getRow(0)
  months = ["Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec","Jan", "Feb"]
}

function draw() {
  
  background(0);
  translate(width / 2, height / 2);
  textAlign(CENTER, CENTER);
  textSize(16);
  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, 125 * 2);
  fill(255);
  noStroke();
  text("0°", 125 + 10, 0);

  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, 200 * 2);
  fill(255);
  noStroke();
  text("1°", 200 + 10, 0);

  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, 500);

  for (let i = 0; i < months.length; i++) {
    noStroke();
    fill(255);
    textSize(24);
    let angle = map(i, 0, months.length, 0, TWO_PI);
    push();
    let x = 264 * cos(angle);
    let y = 264 * sin(angle);
    translate(x, y);
    rotate(angle + PI / 2);
    text(months[i], 0, 0);
    pop();
  }
  let row = data.getRow(currentYear)
  let year = row.get("Year")
  textAlign(CENTER,CENTER);
  text(year, 0,0);
  
  noFill();
  stroke(255);
  let firstValue = true;
  for(let j=0;j<currentYear;j++){ 
    let row = data.getRow(j)
    // let year = row.get("Year");
    // textAlign(CENTER,CENTER);
    // text(year, 0, 0);
    let totalMonths = months.length;
    if(j==currentYear-1){
      totalMonths = currentMonth;
    }
  for(let i=0;i<totalMonths;i++){
    let anamoly = row.get(months[i]);
    if(anamoly!== '***'){
      anamoly = parseFloat(anamoly)
    let angle = map(i,0,months.length,0,TWO_PI) - PI/2;
    let pr = map(prevAnmoly, 0,1,125,200)
    let r = map(anamoly, 0,1,125,200)
    let x = r* cos(angle);
    let y = r* sin(angle);
    let x1 = pr* cos(angle-PI/6);
    let y1 = pr* sin(angle-PI/6);

    
    if (!firstValue) {
      let avg = (anamoly + prevAnmoly) * 0.5;
      let cold = color(0, 0, 255);
      let warm = color(255, 0, 0);
      let zero = color(255);
      let lineColor = zero;
      if (avg < 0) {
        lineColor = lerpColor(zero, cold, abs(avg));
      } else {
        lineColor = lerpColor(zero, warm, abs(avg));
      }

      stroke(lineColor);
      line(x, y, x1, y1);
    }
    firstValue = false;
    prevAnmoly = anamoly;
  }
 
  
}
}
currentMonth = currentMonth + 1;
  if (currentMonth == months.length) {
    currentMonth = 0;
    currentYear = currentYear + 1;
    if (currentYear == data.getRowCount()) {
      noLoop();
    }
  }
}
