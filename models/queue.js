module.exports = function(sequelize, Datatypes) {
    var Queue = sequelize.define("Queue", {
      TotalWaitMin: {
        type: Datatypes.INTEGER
      }
    });
  
    Queue.associate = function(models) {
      Queue.belongsTo(models.Rides, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    Queue.associate = function(models) {
/*       Queue.belongsTo(models.Customers, {
        foreignKey: {
          allowNull: false
        }
      }); */
    };
    return Queue;
  };