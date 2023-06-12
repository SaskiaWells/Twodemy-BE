const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
await mongoose.connect("mongodb://127.0.0.1:27017/mockdb");

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
proficiency: { type: String, required: true },
},
],
calendar: [
{
id: { type: number },
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
course_id: { type: Number },
courseName: { type: String },
courseCatergory: { type: String },
hourlyRate: { type: Number },
courseImage: { type: String },
rating: { type: Number },
description: { type: String },
discountMultiplier: { type: Number, default: 1 },
},
],
rating: { type: Number },
qualifications: { type: String },
website: { type: String },
reviews: [
{
createdBy: { type: String },
createdAt: { type: Date },
rating: { type: Number },
body: { type: String },
},
],
},
});

const User = mongoose.model("User", userSchema);

const userObject = {
userName: "coolBoy420",
firstName: "Jonathan",
lastName: "Bean",
email: "email@email.com",
password: "Password1",
profilePicture:
"https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg",
languages: [
{ language: "English", proficiency: "Fluent" },
{ language: "German", proficiency: "Scheisse" },
],
calendar: [
{
id: 1,
text: "Big Day",
start: "2023-10-01T11:30:00",
end: "2023-10-01T14:30:00",
},
],
topicsToLearn: [
{
subject: "coding",
proficiency: "beginner",
},
],
aboutMe: "I am a human (i think)",
isTeacher: true,
teacher: {
courses: [
{
course_id: 1,
courseName: "advanced waffle",
courseCatergory: "cooking",
hourlyRate: 0,
courseImage:
"https://media.istockphoto.com/id/185266029/photo/waffles-with-fruit-and-maple-syrup-on-a-marble-counter.jpg?s=612x612&w=0&k=20&c=YkBBzuSLisdHiECgS_NHN6gOyOMN6exADFk-RIlfKtI=",
rating: 1,
description:
"this waffle is very tasty and will not talk back (much)",
},
],
rating: 2,
qualifications: "none",
website: "www.website.com",
reviews: [
{
createdBy: "Ben",
createdAt: "1534/06/09",
rating: 3.5,
body: "I've had better German waffles",
},
],
},
};
const me = new User(userObject);

await me.save();
}

Articles
createdBy - String, required ref user
createdAt - String, required
Body - String, Required
Votes - Number, required, default 0
Comment - [{
createdBy - String, required ref user,
createdAt - Date, required,
Body - String, required
Votes - [{
user_id : -1|0|1
}]
}]
