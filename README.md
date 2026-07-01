Relaciones del Modelo de Datos de EcoVolt
1. Definición de las relaciones entre entidades
Relación entre Usuarios y Conectores (Muchos a Muchos)

En EcoVolt, un mismo usuario puede utilizar diferentes conectores a lo largo del tiempo, mientras que cada conector puede ser utilizado por distintos usuarios en diferentes reservas.

Esta asociación se administra mediante la entidad Reserva, la cual no solo enlaza ambas tablas, sino que también almacena información necesaria para la gestión del servicio.

Información registrada en la reserva:

Fecha de la reserva.
Hora de inicio.
Hora de finalización.
Tiempo de uso.
Estado de la reserva.
Valor total del servicio.
Relación entre Estaciones y Conectores (Uno a Muchos)

Cada estación de carga dispone de uno o varios conectores disponibles para los vehículos eléctricos.

Por esta razón, una estación puede estar vinculada a múltiples conectores, mientras que cada conector pertenece únicamente a una estación.

Cuando una estación deja de existir en el sistema, todos los conectores asociados son eliminados automáticamente para evitar registros sin relación.

Relación entre Usuarios y Reservas (Uno a Muchos)

Cada usuario tiene la posibilidad de realizar varias reservas durante el uso de la plataforma.

Sin embargo, una reserva solo puede estar asociada a un único usuario, permitiendo mantener un historial individual de cada cliente.

Relación entre Conectores y Reservas (Uno a Muchos)

Un conector puede ser utilizado en numerosas reservas realizadas en diferentes fechas y horarios.

Cada registro de reserva corresponde exclusivamente a un conector específico.

Mientras existan reservas relacionadas, el conector no podrá eliminarse del sistema para conservar la integridad de la información.

Relación entre Conectores y Técnicos (Muchos a Muchos)

Los procesos de mantenimiento requieren que un técnico pueda intervenir distintos conectores, así como que un mismo conector reciba mantenimiento por parte de diferentes técnicos.

Esta relación se implementa mediante la entidad Mantenimiento, encargada de registrar cada intervención técnica.

Los datos almacenados incluyen:

Fecha de la revisión.
Observaciones realizadas por el técnico.
2. Política de eliminación de registros
Restricción en la relación Usuario – Reserva – Conector

Para proteger el historial de utilización de la plataforma, se aplica la política RESTRICT.

Esto significa que un usuario o un conector no podrán eliminarse mientras existan reservas asociadas.

De esta manera se evita perder información relacionada con el uso del servicio.

Usuario.belongsToMany(Conector, {
    through: Reserva,
    foreignKey: "usuarioId",
    otherKey: "conectorId",
    onDelete: "RESTRICT"
});

Conector.belongsToMany(Usuario, {
    through: Reserva,
    foreignKey: "conectorId",
    otherKey: "usuarioId",
    onDelete: "RESTRICT"
});
Eliminación en cascada entre Estaciones y Conectores

Los conectores dependen directamente de una estación de carga.

Por ello se implementa la opción CASCADE, de modo que al eliminar una estación también desaparezcan automáticamente todos sus conectores relacionados.

Estacion.hasMany(Conector, {
    foreignKey: {
        name: "estacionId",
        allowNull: false
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Conector.belongsTo(Estacion, {
    foreignKey: "estacionId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Esta configuración garantiza que no existan conectores registrados sin una estación válida.

Eliminación en cascada para el historial de mantenimiento

Los registros de mantenimiento únicamente tienen sentido cuando existe tanto el conector como el técnico responsable.

Por esta razón, si alguno de estos elementos es eliminado, también se eliminan automáticamente los mantenimientos asociados.

Conector.belongsToMany(Tecnico, {
    through: Mantenimiento,
    foreignKey: "conectorId",
    onDelete: "CASCADE"
});

Tecnico.belongsToMany(Conector, {
    through: Mantenimiento,
    foreignKey: "tecnicoId",
    onDelete: "CASCADE"
});

Con esta estrategia se evita conservar registros técnicos que ya no poseen una referencia válida.

3. Entidades de Asociación

El modelo incorpora dos tablas intermedias para representar relaciones de muchos a muchos y almacenar información adicional.

Reserva

Relaciona los usuarios con los conectores y registra los datos correspondientes a cada sesión de carga, como la fecha, horario, duración, estado y costo generado.

Mantenimiento

Vincula a los técnicos con los conectores y permite conservar el historial de inspecciones, reparaciones y observaciones realizadas sobre cada equipo.

4. Modelo Entidad–Relación

El diagrama MER del sistema EcoVolt está conformado por las siguientes entidades principales:

Usuarios
Estaciones
Conectores
Reservas
Técnicos

<img width="1181" height="593" alt="MERnuevo" src="https://github.com/user-attachments/assets/31dc36d3-b3c2-479f-931e-796d69e39078" />


Mantenimientos

Estas entidades conforman una estructura relacional que facilita la administración de usuarios, estaciones de carga, reservas y procesos de mantenimiento, garantizando consistencia, integridad referencial y una gestión eficiente de la información
