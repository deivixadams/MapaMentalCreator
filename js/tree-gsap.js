const svg = d3.select("#tree");
const width  = +svg.attr("width")  || window.innerWidth;
const height = +svg.attr("height") || window.innerHeight;
const gLink = svg.append("g").attr("class","links");
const gNode = svg.append("g").attr("class","nodes");

const treeLayout = d3.tree().size([height - 100, width - 200]);
let root;

// Carga el JSON y arranca
d3.json("data/pav3.json").then(data => {
  root = d3.hierarchy(data);
  root.x0 = height / 2;
  root.y0 = 100;
  // colapsa todos los hijos inicialmente
  root.children.forEach(collapse);
  update(root);
});

// Colapsa recursivamente
function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

function update(source) {
  // calcula layout
  const treeData = treeLayout(root);

  const nodes = treeData.descendants();
  const links = treeData.links();

  // ===== LINKS =====
  const linkSel = gLink.selectAll("path.link")
    .data(links, d => d.target.data.title);

  // EXIT
  linkSel.exit().remove();

  // ENTER
  const linkEnter = linkSel.enter().append("path")
    .attr("class","link")
    .attr("d", d => {
      // inicia la línea en el source original (para animar)
      const o = {x: source.x0, y: source.y0};
      return diagonal({source:o, target:o});
    });

  // UPDATE + ENTER
  const linkMerge = linkEnter.merge(linkSel);

  // Animación GSAP para trazar la línea hacia su posición final
  linkMerge.each(function(d) {
    const path = this;
    const finalD = diagonal(d);
    gsap.fromTo(path, { attr: { d: diagonal({source:d.source, target:d.source})} },
                      { attr: { d: finalD }, duration: 0.6, ease: "power2.out" });
  });

  // ===== NODES =====
  const nodeSel = gNode.selectAll("g.node")
    .data(nodes, d => d.data.title);

  // EXIT
  nodeSel.exit().remove();

  // ENTER
  const nodeEnter = nodeSel.enter().append("g")
    .attr("class","node")
    .attr("transform", d => `translate(${source.y0},${source.x0})`)
    .on("click", (_, d) => {
      // toggle
      if (d.children) { d._children = d.children; d.children = null; }
      else          { d.children = d._children; d._children = null; }
      update(d);
    });

  nodeEnter.append("circle")
    .attr("r", 1e-6);


    nodeEnter.append("text")
    .attr("dy", "0.35em")                    // centrado verticalmente
    .attr("x",  d => d._children ? -25 : 25)  // 25px a izquierda o derecha
    .style("text-anchor", d => d._children ? "end" : "start")
    .text(d => d.data.title);
    



  // UPDATE + ENTER
  const nodeMerge = nodeEnter.merge(nodeSel);

  // ANIMA círculos y texto hacia su nueva posición
  nodeMerge.each(function(d) {
    const el = d3.select(this);
    gsap.to(el.node(), {
      attr: { transform: `translate(${d.y},${d.x})` },
      duration: 0.6,
      ease: "power2.out"
    });
    gsap.fromTo(el.select("circle").node(),
      { r: 1e-6 },
      { r: 6, duration: 0.4, ease: "bounce.out", delay: 0.2 }
    );
  });

  // guarda posiciones para la próxima transición
  nodes.forEach(d => { d.x0 = d.x; d.y0 = d.y; });
}

// Genera una curva horizontal
function diagonal(d) {
  return d3.linkHorizontal()
           .x(d => d.y)
           .y(d => d.x)(d);
}
