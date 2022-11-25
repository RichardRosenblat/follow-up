"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Stories", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            userId: {
                allowNull: false,
                type: Sequelize.STRING(24),
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            content: {
                type: Sequelize.STRING,
                defaultValue: "",
            },
            impressions: {
                defaultValue: 0,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable("Stories");
    },
};
