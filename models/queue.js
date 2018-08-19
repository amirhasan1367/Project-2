module.exports = function(sequelize, Datatypes) {
    var Queue = sequelize.define("Queue", {
      rideId: {
        type: Datatypes.STRING,
        allowNull: false
      }
    });
  

  
    Queue.associate = function(models) {
/*       Queue.belongsTo(models.Customers, {
        foreignKey: {
          allowNull: false
        }
      }); */
    };
    return Queue;
  };