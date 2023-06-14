const studentCadenObject = {
  userName: "Emmy",
  firstName: "Fion",
  lastName: "Guan",
  email: "emmyemail@email.com",
  password: "Pfion1",
  profilePicture:
    "https://static.vecteezy.com/system/resources/previews/009/665/304/non_2x/cute-kitty-cat-head-cartoon-element-free-png.png",
  languages: [
    { language: "English", proficiency: "Fluent" },
    { language: "German", proficiency: "Scheisse" },
  ],
  calendar: [
    {
      text: "Sleep Day",
      start: "2022-10-01T11:30:00",
      end: "2022-10-01T14:30:00",
    },
  ],
  topicsToLearn: [
    {
      subject: "coding",
      proficiency: "beginner",
    },
  ],
  aboutMe: "I am a cat(I think)",
  isTeacher: false,
};

const teacherCadenObject = {
  userName: "CadenGG",
  firstName: "Karlie",
  lastName: "Guan",
  email: "caden@email.com",
  password: "Passwordcaden0",
  profilePicture:
    "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  languages: [
    { language: "English", proficiency: "Fluent" },
    { language: "Cantonese", proficiency: "Fluent" },
  ],
  calendar: [
    {
      text: "Lunch Day",
      start: "2023-11-01T11:30:00",
      end: "2023-11-01T14:30:00",
    },
  ],
  topicsToLearn: [
    {
      subject: "hunting",
      proficiency: "beginner",
    },
  ],
  aboutMe: "I am a boss of human",
  isTeacher: true,
  teacher: {
    courses: [
      {
        courseName: "survive outside",
        courseCategory: "cooking",
        hourlyRate: 10,
        courseImage:
          "https://cdn.shopify.com/s/files/1/1583/5739/files/blog-hunter_large.jpg?v=1483641733",
        rating: 4.7,
        description: "understand the basics of the domestic cat's diet",
      },
    ],
    rating: 4.5,
    qualifications: "none",
    website: "www.cadenwebsite.com",
    reviews: [
      {
        createdBy: "Karlie",
        createdAt: "2022-07-12T07:00:00",
        rating: 3.5,
        body: "I look forward to the wet meat version!",
      },
    ],
    articles: [
      {
        article_title:
          "Doc & Phoebe’s Indoor Hunting Feeder review by Anita Kelsey",
        article_body:
          "Initially I was a little hesitant to review the product because I advocate a cat’s natural diet to be meat, being obligate carnivores and I also come from the school of thought, after continued research into dry biscuits and dental care, that a dry food diet does not clean teeth to prevent the build up of plaque in a way that would prevent dental issues (only a regular professional clean by a vet or home cleaning (good luck with that one!!!) keeps cat’s teeth in tip top condition).",
        created_by: "Caden",
        comments: [
          {
            comment_body: "Niccce",
            created_by: "Emmy",
          },
        ],
      },
    ],
  },
};
