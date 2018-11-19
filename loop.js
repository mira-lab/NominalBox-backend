

function f() {
  console.log("Tick");
  setTimeout(f, 1000);
}

setTimeout(f, 1000);
