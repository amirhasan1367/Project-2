module.exports = function(sequelize, Datatypes) {
    var Queue = sequelize.define("Queue", {
      rideId: {
        type: Datatypes.INTEGER
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