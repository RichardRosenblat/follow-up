"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Story extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(_models) {
			// define association here
		}
	}
	Story.init(
		{
			userId: DataTypes.STRING,
			title: DataTypes.STRING,
			content: DataTypes.STRING,
			impressions: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Story",
		}
	);
	return Story;
};
