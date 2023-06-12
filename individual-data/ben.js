const userObject = {
    userName: "BenjiSmith1990",
    firstName:  "Ben" ,
    lastName: "Smith" ,
    email: "thisisanemailaddress@gmail.com",
    password: "MyPaSwOrD!",
    profilePicture: "https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/turtle-2815539-1280_ver_1.png",
    languages: [
      {
        language: "English",
        proficiency: "Fluent",
      },
    ],
    calendar: [
      {
        id: 1599558745885212599841265899214855,
        text: "Graduation",
        start: "2023-06-13T11:30:00",
        end: "2023-06-13T14:30:00",
      },
    ],
    topicsToLearn: [
      {
        subject: "Math",
        proficiency: "Subpar",
      },
    ],
    aboutMe: "Loveable goofball",
    isTeacher: false,
  }

  const teacherObject = {
    userName: "MrTeacher",
    firstName: "Margin",
    lastName: "Bottom",
    email: "imateachersemail@gmail.com",
    password: "ThIsIsApAsSwOrD",
    profilePicture: "https://jappliedecologyblog.files.wordpress.com/2022/01/picture2-2.jpg?w=1200",
    languages: [
      {
        language: "English",
        proficiency: "Fluent",
      },
      {
        language: "Spanish",
        proficiency: "Que",
      }
    ],
    calendar: [
      {
        id: 1599558745885212599841265899214855,
        text: "Graduation",
        start: "2023-06-13T11:30:00",
        end: "2023-06-13T14:30:00",
      },
      {
        id: 15995587458852125998412658992148494855,
        text: "Handing Out Scrolls",
        start: "2023-06-13T11:30:00",
        end: "2023-06-13T14:30:00",
      }
    ],
    topicsToLearn: [
      {
        subject: "I know everything",
        proficiency: "Mongod",
      },
    ],
    aboutMe: "Know it all",
    isTeacher: true,
    teacher: {
      isPremium: true,
      courses: [
        {
          course_id: {
            type: ObjectId,
            required: true,
            default: () => new ObjectId(),
          },
          courseName: "How to be a Mongod",
          courseCatergory: "Coding",
          hourlyRate: 50,
          courseImage: "https://miro.medium.com/v2/resize:fit:960/0*HgOI-QuJ9TN7oeXD.jpg",
          rating: 5,
          description: "Learn to be a god like me",
        },
      ],
      articles: [
        {
          article_id: {
            type: ObjectId,
            required: true,
            default: () => new ObjectId(),
          },
          article_title: "Mongod Tutorial",
          article_img: "https://coralogix.com/wp-content/uploads/2023/03/MongoDB-1000X1000.png",
          article_body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
          created_by: "MrTeacher",
          
          comments: [
            {
              comment_body: "I feel like a right Mongod now!",
              created_by: "BenjiSmith1990",
              comment_id: {
                type: ObjectId,
                required: true,
                default: () => new ObjectId(),
              },
            },
          ],
        },
      ],
      rating: 5,
      qualifications: "All the Quals",
      website: "www.iamgoogle.com",
      reviews: [
        {
          review_id: {
            type: ObjectId,
            required: true,
            default: () => new ObjectId(),
          },
          createdBy: "BenjiSmith1990",
          rating: 4,
          body: "Wowzers",
        },
      ],
    },
  }