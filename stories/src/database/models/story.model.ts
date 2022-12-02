import { DataTypes } from "sequelize";
import { connection as sequelize } from "../connections/connectionsManager";

export const Story = sequelize.define("Story", {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    userId: {
        allowNull: false,
        type: DataTypes.STRING(24),
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    impressions: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
});