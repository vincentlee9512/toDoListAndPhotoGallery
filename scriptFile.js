var itemList= [];
var cateList=["reminder", "grocery", "appointment", "bills"];
var colorList=["#4285F4","#34A853","#FBBC05","#EA4335"];

function startup(){
    if(localStorage['cateList'] === undefined){
        updateCateList();
        console.log("here");
    }else{
        cateList = JSON.parse(localStorage['cateList']);
        console.log(cateList);
    }

    if(localStorage['colorList'] === undefined){
        updateColorList();
        console.log("here1");
    }else{
        colorList = JSON.parse(localStorage['colorList']);
        console.log(colorList);
    }

    if(cateList.length > 4){
        for(var i=4; i<cateList.length; i++){
            var newCate = cateList[i];
            var newOption = document.createElement("option");
            newOption.value = newCate;
            var node = document.createTextNode(newCate);
            newOption.appendChild(node);

            var selection = document.getElementById("selection");
            selection.appendChild(newOption);
        }
    }

    if(localStorage['itemList'] === undefined){
        updateStorage();
    }else{
        itemList = JSON.parse(localStorage['itemList']);
        console.log(itemList);
        rearrangement();
    }

}



function checkStorage() {
    if(typeof (Storage) === "undefined"){
        document.getElementById("warning").innerHTML = "Warning: Your browser does not support storage feature";
        document.getElementById("warning").style.backgroundColor = "#962a21";
        document.getElementById("warning").style.padding = "1rem";
    }
}

function updateStorage() {
    localStorage.setItem('itemList', JSON.stringify(itemList));
}

function updateCateList(){
    localStorage.setItem("cateList", JSON.stringify(cateList));
}

function updateColorList() {
    localStorage.setItem("colorList", JSON.stringify(colorList));
}


function createItem(){

    var item = {};
    item.name=document.getElementById("event").value;

    item.description=document.getElementById("description").value;
    item.deadline=document.getElementById("deadline").value;
    item.category=document.getElementById("selection").value;
    item.status="Incomplete";
    item.time=Date();
    itemList.push(item);
    updateStorage();

    var newLi = createDisplayPattern(item);
    var list = document.getElementById("wholeList");
    list.appendChild(newLi);


    clearInput();
}


function removeItem(item){
    var loca = itemList.indexOf(item);
    var newList = [];
    console.log(loca);


    for(var i=0; i<itemList.length; i++){
        console.log(i);
        if(i === loca){}
        else{
            newList.push(itemList[i]);
        }
    }
    itemList = newList;
    rearrangement();
    updateStorage();
}

function clearInput(){
    document.getElementById("event").value="";
    document.getElementById("description").value="";
    document.getElementById("deadline").value="";
}

function sortList() {
    var approach = document.getElementById("sortingSelection").value;

    if(approach==="timeAddedFirst"){
        itemList.sort(function (a,b) {
            if(a.time < b.time){
                return -1;
            }else{
                return 1;
            }
        });
    }else if(approach==="timeAddedLast"){
        itemList.sort(function (a,b) {
            if(a.time < b.time){
                return 1;
            }else{
                return -1;
            }
        });
    }else if(approach==="deadlineFirst"){
        itemList.sort(function (a,b) {
            if(a.deadline < b.deadline){
                return -1;
            }else{
                return 1;
            }
        });
    }else if(approach==="deadlineLast"){
        itemList.sort(function (a,b) {
            if(a.deadline < b.deadline){
                return 1;
            }else{
                return -1;
            }
        });
    }else if(approach==="CategoryFirst"){
        itemList.sort(function (a,b) {
            if(a.category < b.category){
                return -1;
            }else{
                return 1;
            }
        });
    }else if(approach==="CategoryLast"){
        itemList.sort(function (a,b) {
            if(a.category < b.category){
                return 1;
            }else{
                return -1;
            }
        });
    }else if(approach==="IncompleteFirst"){
        var newList = [];

        for(var i=0; i<itemList.length; i++){
            var item = itemList[i];
            if(item.status==="Incomplete"){
                newList.unshift(item);
            }else{
                newList.push(item);
            }
        }
        itemList=newList;

    }else if(approach==="CompleteFirst"){
        var newList1 = [];

        for(var i=0; i<itemList.length; i++){
            var item1 = itemList[i];
            if(item1.status==="Incomplete"){
                newList1.push(item1);
            }else{
                newList1.unshift(item1);
            }
        }
        itemList=newList1;

    }else{
        document.write("something wrong happened");
    }

    updateStorage();
    rearrangement();
}


function rearrangement(){
    var list = document.getElementById("wholeList");
    list.innerHTML = "";

    for(var i=0; i<itemList.length; i++){
        var pattern = createDisplayPattern(itemList[i]);

        list.appendChild(pattern);
    }
}

function createCate(){
    var newCate = document.getElementById("category").value;
    var newColor = document.getElementById("color").value;

    if(cateList.indexOf(newCate) !== -1){
        window.alert("This category exists");
        return;
    }

    if(colorList.indexOf(newColor) !== -1){
        window.alert("This color is used for other category");
        return;
    }

    cateList.push(newCate);
    colorList.push(newColor);

    var newOption = document.createElement("option");
    newOption.value = newCate;
    var node = document.createTextNode(newCate);
    newOption.appendChild(node);

    var selection = document.getElementById("selection");
    selection.appendChild(newOption);

    updateCateList();
    updateColorList();
    clearCateInput();
    console.log(4);
}

function clearCateInput(){
    document.getElementById("category").value = "";
    document.getElementById("color").value = "#000000";
}

function createDisplayPattern(item) {
    var newLi = document.createElement("li");
    if(cateList.indexOf(item.category) === -1){
        window.alert("Choose a valid category");
        clearInput();
        return;
    }else{
        var loca = cateList.indexOf(item.category);
        newLi.style.backgroundColor = colorList[loca];
    }


    var dl = document.createElement("dl");
    var dt = document.createElement("dt");
    var nameNode = document.createTextNode(item.name);
    dt.appendChild(nameNode);

    var ddDes = document.createElement("dd");
    var desNode = document.createTextNode("- Description: "+item.description);
    ddDes.appendChild(desNode);

    var ddDeadline = document.createElement("dd");
    var deadlineNode = document.createTextNode("- Deadline: "+item.deadline);
    ddDeadline.appendChild(deadlineNode);

    var ddCate = document.createElement("dd");
    var cateNode = document.createTextNode("- Category: " + item.category);
    ddCate.appendChild(cateNode);

    var ddStatus = document.createElement("dd");
    var statusNode = document.createTextNode("- Status: " + item.status);
    ddStatus.appendChild(statusNode);

    var ddDate = document.createElement("dd");
    var dateNode = document.createTextNode("- Create At: " + item.time);
    ddDate.appendChild(dateNode);

    var ddButton = document.createElement("dd");
    var completeButton = document.createElement("button");
    var buttonNode = document.createTextNode("Complete!");
    completeButton.appendChild(buttonNode);
    completeButton.onclick=function () {
        var loca = itemList.indexOf(item);
        item.status="Completed";

        var node = document.createTextNode("- status: " + item.status);
        ddStatus.replaceChild(node,ddStatus.childNodes[0]);
        ddStatus.style.backgroundColor = "#962a21";
        ddStatus.style.fontFamily="Arial";

        var node2 = document.createTextNode("");
        ddButton.replaceChild(node2,ddButton.childNodes[0]);

        itemList[loca] = item;

        updateStorage();
    };
    if(item.status === "Completed"){
        ddStatus.style.backgroundColor = "#962a21";
    }else{
        ddButton.appendChild(completeButton);
    }

    var ddRmButton = document.createElement("dd");
    var rmButton = document.createElement("button");
    var rmButtonNode = document.createTextNode("Remove this Item");
    rmButton.appendChild(rmButtonNode);
    ddRmButton.appendChild(rmButton);
    ddRmButton.onclick = function () {
        var confirm = prompt("Please enter \"remove\" to DELETE this item");

        if(confirm === "remove"){
            removeItem(item);
        }else{
            window.alert("The enter is not \"remove\" ");
        }
    };


    dl.appendChild(dt);
    dl.appendChild(ddDes);
    dl.appendChild(ddDeadline);
    dl.appendChild(ddCate);
    dl.appendChild(ddStatus);
    dl.appendChild(ddDate);
    dl.appendChild(ddButton);
    dl.appendChild(ddRmButton);
    newLi.appendChild(dl);


    return newLi;
}
