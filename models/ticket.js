module.exports = function (sequelize, DataTypes) {
    var Ticket = sequelize.define("Ticket", {
        ticket_no: {
            type: DataTypes.STRING,
            allowNull: false
        },
        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    Ticket.associate = function(models) {
/*         Ticket.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
              }
        }) */
      };
  return Ticket;
};

