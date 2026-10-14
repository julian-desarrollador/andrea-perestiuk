# Notas para charlar con Andrea

La página pública sigue siendo la carta de presentación. Historia clínica, odontograma, prestaciones y consentimiento son del consultorio: Andrea entra con clave y el paciente no los ve. Las fotos del consultorio sí pueden ir a la web.

Primera versión armada con lo que Andrea ya mandó.

- En la página pública hay tres fotos del consultorio, las más amplias. La tarjeta donde figura Alejandra Indart no se publicó.
- En `/consultorio` entra ella con clave. Ahí están las fichas, el odontograma, el catálogo de prestaciones y las hojas de consentimiento para imprimir.
- El catálogo arranca con los aranceles mínimos del PDF al 1 de julio de 2026. El valor del consultorio empieza igual a ese mínimo, para que lo edite. Los implantes no están en el PDF: los agrega ella.
- Las hojas de consentimiento de esta versión son implante, cirugía bucal y endodoncia.
- Las fichas, cada precio y cada foto de una firma se guardan por separado en la carpeta `data/` de la computadora que corre la página. Todo pasa por `src/lib/consultorio/store.ts`. Cuando se pase a MongoDB, el cambio queda en ese archivo. Las fotos van a necesitar un lugar aparte, como GridFS o un almacenamiento de archivos. No van a la web pública.

## Historia clínica

Una ficha por paciente: nombre, documento, fecha de nacimiento, teléfono, domicilio, un contacto familiar, antecedentes, motivo de consulta y la fecha en que se empezó la ficha. Cada visita tiene fecha. Al abrirla, lo primero es anotar la de hoy. En la lista se ve la última visita, y se puede buscar por nombre o por documento. La visita de hoy se puede escribir y quitar. Las de días anteriores se leen y no se editan desde la página. El odontograma y los consentimientos firmados viven dentro de esa ficha.

No es un sistema de gestión completo. No hay turnos, obra social ni facturación. Tampoco es una historia clínica inalterable: quien tenga acceso al archivo de datos puede cambiar las visitas. No hay foliado, no queda copia de cómo estaba el odontograma antes de cada cambio, y no hay un botón para entregarle una copia al paciente.

## Odontograma

Dentro de la ficha, un esquema de las 32 piezas. En cada una se puede marcar lo habitual: sana, caries, ausente, restauración, endodoncia, corona, implante. Sirve para ver el estado de una mirada y para imprimirlo junto con la ficha.

Es un mapa, no un odontograma completo. Cada pieza lleva una sola marca, escrita en el botón. Los cuadrantes dicen de qué lado del paciente están. No hay caras del diente ni dientes de leche, y al cambiar una marca no queda la anterior. La lista impresa sigue el orden de la boca, del 18 al 38.

## Prestaciones y valores

Andrea preguntó si los valores se cargan o ya vienen puestos. Las dos cosas.

El PDF [docs/ARANCELES ODONT MINIMOS AL 01-07-26.pdf](ARANCELES%20ODONT%20MINIMOS%20AL%2001-07-26.pdf) tiene 4 páginas de aranceles mínimos al 1 de julio de 2026. Eso no es la lista de precios de ella: es un piso de referencia. En el espacio privado, el catálogo arranca cargado con esas prestaciones y ese mínimo, y cada una tiene además el valor que ella cobra, para editarlo, agregar prácticas o sacar las que no hace.

Esos números no se publican en la web.

## Consentimiento informado

Para las prácticas más complejas, una hoja para imprimir: qué práctica es, en qué consiste, riesgos en lenguaje claro, y lugar para la firma y la fecha del paciente. Se firma en papel. Andrea guarda el escaneo en la ficha.

Cuáles hojas armar queda abierto hasta que mande el detalle de especialidades. Candidatas, si ella las confirma: implantes, cirugía, endodoncia.

## Fotos del consultorio

En [public/consultorio](../public/consultorio) hay 23 fotos del WhatsApp y una de una tarjeta. Son del sillón, la lámpara y el ambiente, no de pacientes. Varias muestran el consultorio desordenado (papeles, microondas, cajas). Para la página se eligen pocas, las más amplias y prolijas, y se ubican en la zona de fotos que hoy son solo frases.

La tarjeta impresa dice «Od. Andrea Perestiuk» y también «Od. Alejandra R. Indart». Esa imagen no va a la web hasta preguntarle a Andrea si Alejandra forma parte del consultorio. La página hoy habla en singular, de ella sola.

## Orden para cuando se decida construir

1. Elegir y publicar unas fotos del consultorio.
2. Espacio privado con clave, vacío, solo para ella.
3. Catálogo de prestaciones a partir del PDF, con valor propio editable.
4. Hojas de consentimiento para imprimir.
5. Ficha del paciente y, adentro, el odontograma.

## Para preguntarle a Andrea

- Si Alejandra Indart atiende ahí o la tarjeta es vieja.
- Cuando mande las especialidades, cuáles prácticas complejas quieren consentimiento.
- Si el valor que cobra parte del mínimo del PDF o si prefiere cargar solo las prácticas que ella hace.
- Si atiende chicos seguido. Si es así, hay que sumar los dientes de leche.
- Cómo marca en la ficha de papel: si es por cara del diente, con rojo y azul.
- Si usaba algún programa antes, cuál, y si le quedaron fichas ahí para pasar.
