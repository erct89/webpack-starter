import '../css/componentes.css';

const saludar = nombre => {
  console.log(`Creando etiqueta h1`);

  const h1 = document.createElement('h1');
  h1.innerText = `Hola ${nombre}`;

  document.body.append(h1);
};

export { saludar };
