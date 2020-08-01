const Testimonial = require("../models/Testimoniales");

exports.mostrarTestimoniales = async (req, res) => {
  const testimoniales = await Testimonial.findAll();
  res.render("testimoniales", {
    pagina: "Testimoniales",
    testimoniales,
  });
};

exports.agregarTestimonial = async (req, res) => {
  // validacion de los campos del formulario
  let { nombre, email, mensaje } = req.body;

  let errores = [];
  if (!nombre) {
    errores.push({ mensaje: "Agrega tu Nombre" });
  }
  if (!email) {
    errores.push({ mensaje: "Agrega tu Email" });
  }
  if (!mensaje) {
    errores.push({ mensaje: "Agrega tu Mensaje" });
  }

  // revisar por errores
  if (errores.length > 0) {
    // muestra la vista con errores
    const testimoniales = await Testimonial.findAll();
    res.render("testimoniales", {
      errores,
      nombre,
      email,
      mensaje,
      pagina: "Testimoniales",
      testimoniales,
    });
  } else {
    // se almacenan los datos en la base de datos
    Testimonial.create({
      nombre,
      email,
      mensaje,
    })
      .then((testimonial) => res.redirect("/testimoniales"))
      .catch((error) => console.log(error));
  }
};
