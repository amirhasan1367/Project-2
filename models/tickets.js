module.exports = function (sequelize, DataTypes) {
    var Ticket = sequelize.define("Ticket", {
        ticket_no: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
    return Ticket;
};
