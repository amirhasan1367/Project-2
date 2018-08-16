module.exports = function(sequelize, DataTypes) {
    var Ride = sequelize.define("Ride", {
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      RunTimeSec: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    Ride.associate = function(models) {
/*       Rides.hasMany(models.Queue, {
        onDelete: "cascade"
      }); */
    };
    return Ride;
  };