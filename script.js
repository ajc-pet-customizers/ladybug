var features = new Map();
features.set("color",["white","white"]);
features.set("antennae","classic");
features.set("shape","round");
features.set("eye","circle");
features.set("pattern","spot");

setColorButtons("color_grid"); 
setEyeButtons();
setOtherButtons();

updateColor("white");
updateSecondary("white");
updateEye("circle");
updatePattern("spot");
updateShape("round");
updateAntennae("classic");

document.getElementById("save").addEventListener("click", function() { mergeImages("save"); } );
document.getElementById("new_tab").addEventListener("click", function() { mergeImages("new_tab"); } );
document.getElementById("randomize").addEventListener("click", function() { randomize(); } );
document.getElementById("bg_contrast").addEventListener("click", function() { flip_bg(); } );
light = true;

var myVar;
function loaded() {
  myVar = setTimeout(showPage, 2500);
}

function showPage() {
  document.getElementById("loading_container").style.display = "none";
}

function randomize() {
  var features = [["dark red", "light red", "dark pink", "light pink", "dark purple", "light purple", "black", "white", "dark blue", "teal", "burple", "yellow", "dark green", "medium green", "lime", "mint", "dark brown", "light brown", "orange", "mustard"],["oval","angry","circle","diamond","quarter","tired"],["round","box","teardrop","dorito"],["spot","square","stripe","triangle"],["classic","zigzag","dot","line"]];
  var randoms = []

  for (var i = 0; i < features.length; i++) {
    if (i==0) {
      randoms.push(features[i][Math.floor(Math.random()*features[i].length)])
    }
    randoms.push(features[i][Math.floor(Math.random()*features[i].length)]);
  }
  updateColor(randoms[0]);
  updateSecondary(randoms[1]);
  updateEye(randoms[2]);
  updateShape(randoms[3]);
  updatePattern(randoms[4]);
  updateAntennae(randoms[5]);
}

function flip_bg() {
  if (!light) {
    document.getElementById("ladybug_container").style.backgroundImage = "url('misc_assets/light bg.png'"+")";
  }
  else {
    document.getElementById("ladybug_container").style.backgroundImage = "url('misc_assets/dark bg.png'"+")";
  }
  light = !light;
}

function setColorButtons(className) {
var colorNames = ["dark red", "light red", "dark pink", "light pink", "dark purple", "light purple", "black", "white", "dark blue", "teal", "burple", "yellow", "dark green", "medium green", "lime", "mint", "dark brown", "light brown", "orange", "mustard"];
var colorRGBs = [[173, 16, 16], [235, 64, 64], [236, 90, 218], [255, 166, 255], [138, 53, 224], [167, 93, 255], [42, 42, 42], [255, 255, 255], [53, 116, 255], [82, 216, 231], [112, 112, 254], [255, 255, 0], [1, 149, 30], [53, 187, 79], [156, 231, 44], [218, 254, 163], [170, 84, 0], [198, 147, 69], [245, 122, 0], [255, 212, 9]];
for (var i = 0; i < colorNames.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "color_grid_button";
  b.id = colorNames[i]+"1";
  b.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_1").appendChild(b);
  b.addEventListener("click", function() { updateColor(this.id.substring(0,this.id.length - 1)) } );

  var b2 = document.createElement("BUTTON");
  b2.className = "color_grid_button";
  b2.id = colorNames[i]+"2";
  b2.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_2").appendChild(b2);
  b2.addEventListener("click", function() { updateSecondary(this.id.substring(0,this.id.length - 1)) } );
  }
}

function setEyeButtons() {
var eyeAssets = ["circle","diamond","oval","quarter","angry","tired"];

for (var i = 0; i < eyeAssets.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "cell_button";
  b.id = ""+eyeAssets[i];
  b.style.backgroundImage = "url('button_assets/"+eyeAssets[i]+" cell.png'"+")";
  b.addEventListener("click", function() { updateEye(this.id) } );
  document.getElementsByClassName("eye_panel_div")[0].appendChild(b);
  }
}

function setOtherButtons() {
var shape = ["round","box","teardrop","dorito"];
var antennae = ["dot","line","zigzag","classic"];
var patterns = ["spot","square","triangle","stripe"];
for (var i = 0; i < 4; i++) {
  var h = document.createElement("BUTTON");
  h.className = "cell_button";
  h.id = ""+antennae[i];
  h.style.backgroundImage = "url('button_assets/"+antennae[i]+" cell.png'"+")";
  h.addEventListener("click", function() { updateAntennae(this.id) } );
  document.getElementsByClassName("other_panel_div")[0].appendChild(h);

  var p = document.createElement("BUTTON");
  p.className = "cell_button";
  p.id = ""+patterns[i];
  p.style.backgroundImage = "url('button_assets/"+patterns[i]+" cell.png'"+")";
  p.addEventListener("click", function() { updatePattern(this.id) } );
  document.getElementsByClassName("other_panel_div")[0].appendChild(p);

  var a = document.createElement("BUTTON");
  a.className = "cell_button";
  a.id = ""+shape[i];
  a.style.backgroundImage = "url('button_assets/"+shape[i]+" cell.png'"+")";
  document.getElementsByClassName("other_panel_div")[0].appendChild(a);
  a.addEventListener("click", function() { updateShape(this.id) } );
  }
}

function updateBorders(buttonId, newButtonId) {
  var oldB = document.getElementById(buttonId);
  var newB = document.getElementById(newButtonId);
  if (oldB != null && newB != null) {
    oldB.style.outline = "none";
    newB.style.outline = "0.3vw solid #FBB148";
    oldB.style.zIndex = 0;
    newB.style.zIndex = 1000;
  }
}

//Functions for color/feature updating below
function updateColor(newColor) {
  document.getElementById("elytra").src = "ladybug_assets/elytra/"+features.get("shape")+"/"+newColor+".png";
  updateBorders(features.get("color")[0]+"1",newColor+"1");
  features.set("color",[newColor,features.get("color")[1]]);
}

function updateSecondary(newColor) {
  updateBorders(features.get("color")[1]+"2",newColor+"2");
  features.set("color",[features.get("color")[0],newColor]);
  updateEye(features.get("eye"));
}

function updateEye(newEye) {
  document.getElementById("eye").src = "ladybug_assets/eye/"+newEye+"/"+features.get("color")[1]+".png";
  updateBorders(features.get("eye"),newEye);
  features.set("eye",newEye);
}

function updatePattern(newPattern) {
  document.getElementById("pattern").src = "ladybug_assets/pattern/"+features.get("shape")+"/"+newPattern+".png";
  updateBorders(features.get("pattern"),newPattern);
  features.set("pattern",newPattern);
}

function updateAntennae(newAntennae) {
  document.getElementById("antennae").src = "ladybug_assets/antennae/"+features.get("shape")+"/"+newAntennae+".png";
  updateBorders(features.get("antennae"),newAntennae);
  features.set("antennae",newAntennae);
}

function updateShape(newShape) {
  updateBorders(features.get("shape"),newShape);
  features.set("shape",newShape);
  updateAntennae(features.get("antennae"));
  updatePattern(features.get("pattern"));
  updateColor(features.get("color")[0]);
  document.getElementById("base").src = "ladybug_assets/base/"+newShape+".png";
  document.getElementById("shine").src = "ladybug_assets/shine/"+newShape+".png";
  document.getElementById("watermark").src = "ladybug_assets/watermark/"+newShape+".png";
}

function mergeImages(type) {
  var c = document.getElementById("ladybug_canvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, ladybug_canvas.width, ladybug_canvas.height);

  var base = new Image();
  var elytra = new Image();
  var pattern = new Image();
  var shine = new Image();
  var eye = new Image();
  var antennae = new Image();
  var watermark = new Image();

  base.src = document.getElementById("base").src;
  base.onload = function() {
    ctx.drawImage(base, 0, 0);
    elytra.src = document.getElementById("elytra").src;
    elytra.onload = function() {
      ctx.drawImage(elytra, 0, 0);
      pattern.src = document.getElementById("pattern").src;
      pattern.onload = function() {
        ctx.drawImage(pattern, 0, 0);
        shine.src = document.getElementById("shine").src;
        shine.onload = function() {
          ctx.drawImage(shine, 0, 0);
          eye.src = document.getElementById("eye").src;
          eye.onload = function() {
            ctx.drawImage(eye, 0, 0);
            antennae.src = document.getElementById("antennae").src;
            antennae.onload = function() {
              ctx.drawImage(antennae, 0, 0);
              watermark.src = document.getElementById("watermark").src;
              watermark.onload = function() {
                ctx.drawImage(watermark, 0, 0);
                var image = ladybug_canvas.toDataURL("image/png");
                if (type == "new_tab") {
                  var newTab = window.open();
                  newTab.document.write('<img src="' + image + '" width="1000" height="1000"/>');
                } else {
                  var a = document.createElement('a');
                  a.href = image;
                  a.download = "ladybug.png";
                  a.click();
                }

              }
            }
          }
        }
      }
    }
  }


}
