(function() {
  let processTree = document.getElementsByTagName('pre')[0].innerText.split('\n').slice(0,1452);

  let initialNode = processTree.find((x) => x.split(' ')[0] === "veboyvy");
  console.log(initialNode);
 /*  processTree.forEach(function(process) {
    let weight = process.split('(')[1].split(')')[0];
    console.log(weight);

  }); */
})();

function Node(parent, weight, childrens) {
  this.parent = parent || null;  
  this.weight = weight || 0;
  this.childrens = childrens || [];
}

function createNodes(process) {
  
  let node = new Node(parent, weight, childrens);
  return node;
}