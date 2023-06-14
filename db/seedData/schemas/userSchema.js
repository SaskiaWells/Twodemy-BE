const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	profilePicture: { type: String, required: true },
	languages: [
		{
			language: { type: String, required: true },
			fluency: { type: String, required: true },
		},
	],
	calendar: [
		{
			id: { type: Number },
			text: { type: String },
			start: { type: String },
			end: { type: String },
		},
	],
	topicsToLearn: [
		{
			subject: { type: String },
			proficiency: { type: String },
		},
	],
	aboutMe: { type: String },
	isTeacher: { type: Boolean, default: false },
	teacher: {
		isPremium: { type: Boolean, default: false },
		courses: [
			{
				courseName: { type: String },
				courseCategory: { type: String },
				hourlyRate: { type: Number },
				courseImage: { type: String },
				rating: { type: Number },
				description: { type: String },
				discountMultiplier: { type: Number, default: 1 },
			},
		],
		articles: [
			{
				article_title: { type: String },
				article_category: { type: String },
				article_img: {
					type: String,
					default:
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlwx5GmYVcbMwo1Fr2dvRX0deJrULElW70Jw&usqp=CAU",
				},
				article_body: { type: String },
				created_by: { type: String },
				created_at: { type: Date, default: Date.now },
				votes: [{ vote: { type: Number }, user_id: { type: Number } }],
				comments: [
					{
						comment_body: { type: String },
						created_by: { type: String },
						created_at: { type: Date, default: Date.now },
						votes: [{ vote: { type: Number }, user_id: { type: Number } }],
					},
				],
			},
		],
		rating: { type: Number },
		qualifications: { type: String },
		website: { type: String },
		reviews: [
			{
				createdBy: { type: String },
				createdAt: { type: Date, default: Date.now },
				rating: { type: Number },
				body: { type: String },
			},
		],
	},
});

module.exports = userSchema;
