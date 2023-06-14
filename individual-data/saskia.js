const teacherObj = {
  userName: "I_teach_cool_things",
  firstName: "Saskia",
  lastName: "Wells",
  email: "emailemail@gmail.com",
  password: "securePassword",
  profilePicture: "https://m.media-amazon.com/images/I/71YElaLt6lL.jpg",
  languages: [
    {
      language: "English",
      proficiency: "i have spoken it my whole damn life",
    },
  ],
  aboutMe: "this is something about me",
  isTeacher: true,
  teacher: {
    isPremium: true,
    courses: [
      {
        courseName: "How to be Saskia 101",
        courseCategory: "lifestyle",
        hourlyRate: 100,
        courseImage:
          "https://media.newyorker.com/photos/590968866552fa0be682f3d7/master/w_2560%2Cc_limit/110627_r21011_g2048.jpg",
        rating: 0,
        description:
          "if you are unfortunate enough to read this article i commend you",
      },
    ],
    rating: 4,
    qualifications: "some",
    website: "www.teacher.com",
    reviews: [
      {
        createdBy: "im_not_like_other_students",
        rating: 0,
        body: "didnt get enough armpit scratches",
      },
    ],
  },
};

const studentObj = {
  userName: "im_not_like_other_students",
  firstName: "Archie",
  lastName: "Wells",
  email: "Imacat@gmail.com",
  password: "meow",
  profilePicture:
    "https://files.slack.com/files-tmb/T01KPE0QGCD-F052YA8H6MR-83d765d79b/img_7814_720.jpg",
  languages: [
    {
      language: "Cat",
      proficiency: "fluent",
    },
  ],
  topicsToLearn: [
    {
      subject: "English",
      proficiency: "GCSE",
    },
  ],
  aboutMe:
    "Hi Im Archie the cat, i live in newcastle and i spend most of my days sleeping an eating. Occasianally, I yell at my owners because I dont get armpit scratches, but they deserve it because I am a prince and they are my servants",
};
