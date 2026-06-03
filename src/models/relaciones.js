

Usuario.belongsToMany(Conector, {
  through: Reserva,
  foreignKey: 'id_usuario'
});

Conector.belongsToMany(Usuario, {
  through: Reserva,
  foreignKey: 'id_conector'
});

Estacion.hasMany(Conector, {
  foreignKey: 'id_estacion'
});

Conector.belongsTo(Estacion, {
  foreignKey: 'id_estacion'
});