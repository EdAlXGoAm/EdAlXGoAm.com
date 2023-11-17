// crear los elementos de JSX para los botones
const buttons = [];
for (let i = 0; i < numButtons; i++) {
  const color = buttonColors[i % buttonColors.length];
  buttons.push(
    <div key={i} className="col-xl-2 d-flex justify-content-center" style={{backgroundColor: color}}>
      <div className="card"
        style={{
          width: "100%",
          margin: "10px",
          padding: "10px",
          border: "1px solid black",
          borderRadius: "10px"}}>
        <div className="row mb-3">
          <div className='col' style={{ display: 'flex', justifyContent: 'space-between' }}> {/* row for the fold button and the lock button */}
            <button className="btn btn-primary">Nuevo Pedido</button>
            <button className="btn btn-primary">Nuevo Pedido</button>
          </div>
        </div>
        <div className="row mb-3">
          <div className='col' style={{ display: 'flex', justifyContent: 'space-between' }}> {/* row for the fold button and the lock button */}
            <button className="btn btn-primary">Nuevo Pedido</button>
            <button className="btn btn-primary">Nuevo Pedido</button>
          </div>
        </div>
        <div className="row mb-3">
          <div className='col'>
            <div className="comanda" 
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid black",
                borderRadius: "10px"
              }}>
              <div className="card-body">
                <button className="btn btn-primary">Nuevo Pedido</button>
                <h5 className="card-title">Comanda</h5>
                <p className="card-text">Comanda de prueba</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


<div className="row">
<div className="col">
  <h1>Comandas</h1>
</div>
</div>
<div className="row" style={{ backgroundColor: "black" }}>
{buttons} {/* renderizar los botones */}
</div>


<div>
  <div class="custom-control custom-switch mb-3">
    <input type="checkbox" class="custom-control-input" id="toggleBurguerAll_undefined">
    <label class="custom-control-label" for="toggleBurguerAll_undefined">Con todo</label>
  </div>
  <div>
    <div>
      <input type="checkbox" id="toggleBurguerAll_undefined_opcion_0" class="tu-clase-aqui">
      <label for="toggleBurguerAll_undefined_opcion_0">&nbsp;Lechuga</label>
    </div>
    <div>
      <input type="checkbox" id="toggleBurguerAll_undefined_opcion_1" class="tu-clase-aqui">
      <label for="toggleBurguerAll_undefined_opcion_1">&nbsp;Jitomate</label>
    </div>
    <div>
      <input type="checkbox" id="toggleBurguerAll_undefined_opcion_2" class="tu-clase-aqui">
      <label for="toggleBurguerAll_undefined_opcion_2">&nbsp;Cebolla Caramelizada</label>
    </div>
    <div>
      <input type="checkbox" id="toggleBurguerAll_undefined_opcion_3" class="tu-clase-aqui">
      <label for="toggleBurguerAll_undefined_opcion_3">&nbsp;Mayonesa</label>
    </div>
    <div>
      <input type="checkbox" id="toggleBurguerAll_undefined_opcion_4" class="tu-clase-aqui">
      <label for="toggleBurguerAll_undefined_opcion_4">&nbsp;Mostaza</label>
    </div>
    <div>
      <input type="checkbox" id="toggleBurguerAll_undefined_opcion_5" class="tu-clase-aqui">
      <label for="toggleBurguerAll_undefined_opcion_5">&nbsp;Catsup</label>
    </div>
    <div>
      <input type="checkbox" id="toggleBurguerAll_undefined_opcion_6" class="tu-clase-aqui">
      <label for="toggleBurguerAll_undefined_opcion_6">&nbsp;Chiles</label>
    </div>
  </div>
</div>
