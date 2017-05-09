var dMax;
var h,w;
var rw, rh;
var slider;
var hough_picture = []
function setup() {
  h = 720;
  w = 720;
  createCanvas(1440, 720);
  background(0);
  stroke(255);
  fill(255);
  line(720,360,1440,360);
  line(720+w/2, 0, 720+w/2, h);

  dMax = sqrt(pow(720,2) + pow(720,2));
  text(dMax.toString(),720+w/2, 0, 720+w/2, 20);
  text("-" + dMax.toString(),720+w/2, h-20, 720+w/2, h-20);
  for (i = h; i >= 0; i-=30 ){
    text(i.toString(), 0 , i ,0, i);
    text(i.toString(), i , 0 ,i, 50);
    line(0,i, w, i );
    line(i,0, i, h );
  }
  for (i = 0; i <= 180; i+=10){
    text((i-90).toString(), (i*4)+720, h/2, (i*4)+720, h/2 );
  }

  for (i =0; i <= 180; i++){
    hough_picture[i] = [];
    for (j = 0; j < dMax*2; j++){
      hough_picture[i][j] = 0;
    }
  }
}


function draw() {

}

var hough_line = [];

var min_p, max_p;

function mouseClicked(){

  angleMode(DEGREES);
  var x = mouseX;
  var y = mouseY;
  if ((x < w) && (y < h)){
    var texty = x.toString() + " " + y.toString();
      text(texty , x , y, x, y);
      point(x,y);

      for (theta = 0; theta <= 180; theta++){
        var p =x*cos(theta-90) + y*sin(theta-90);
        hough_line[theta] = p;
        var o = round(p + dMax);

        hough_picture[theta][o] += 1;
      }
      var min_p = min(hough_line);
      var max_p = max(hough_line);

      for (theta = 1; theta <= 180; theta++){

        line((theta-1)*4+w, hough_line[theta-1],(theta)*4+w, hough_line[theta])
        stroke(255,255,255,75)
        //point(theta*4 + w, hough_line[theta]*1.5);
      }




}
}

function keyPressed(){

  for (i =0; i <= 180; i++){
    hough_picture[i] = [];
    for (j = 0; j < dMax*2; j++){
      if (hough_picture[i][j] > 5){
        var t = round(j-dMax);
        ellipse(i-90,t,20,20);

      }
    }
  }

}
