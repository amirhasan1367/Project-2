module.exports = function (sequelize, DataTypes) {
    var Confirmation = sequelize.define("Confirmation", {
        rideName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        confNo: {
            type: DataTypes.INTEGER,
            defaultValue: false
        }
    });
    Confirmation.associate = function(models) {
/*         Ticket.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
              }
        }) */
      };
  return Confirmation;
};