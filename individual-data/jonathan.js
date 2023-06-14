const userSchema = [
  {
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
          course_id: {
            type: ObjectId,
            required: true,
            default: () => new ObjectId(),
          },
          courseName: "advanced waffle",
          courseCategory: "cooking",
          hourlyRate: 1,
          courseImage:
            "https://media.istockphoto.com/id/185266029/photo/waffles-with-fruit-and-maple-syrup-on-a-marble-counter.jpg?s=612x612&w=0&k=20&c=YkBBzuSLisdHiECgS_NHN6gOyOMN6exADFk-RIlfKtI=",
          rating: 1,
          description: "this waffle is very tasty but it talks too much",
        },
      ],
      articles: [
        {
          article_id: {
            type: ObjectId,
            required: true,
            default: () => new ObjectId(),
          },
          article_title: "The link between Baudrillard and Torok's Phantom",
          article_body:
            "Jean Baudrillard and Toroks Phantom are two distinct concepts from different domains. Jean Baudrillard was a prominent French sociologist and philosopher known for his theories on postmodernism, simulacra, and hyperreality. Toroks Phantom, on the other hand, is a theoretical construct proposed by Dr. Zoltan Torok in the field of theoretical physics.\nJean Baudrillard's ideas revolve around the notion of hyperreality, where he argues that our contemporary society is characterized by the simulation and proliferation of signs and symbols that create a simulated reality divorced from the original referents. His work explores the ways in which symbols, images, and representations shape our perception of reality and contribute to the dissolution of the boundaries between reality and illusion.\nToroks Phantom, on the other hand, is a concept within the realm of theoretical physics that extends our understanding of space-time. It proposes the existence of 'phantom space' alongside our observable space-time, suggesting the possibility of alternative dimensions or hidden aspects of the universe that are currently beyond our perception and comprehension.\nWhile both Baudrillard's ideas and Toroks Phantom touch upon the nature of reality, they approach the subject from different perspectives and disciplines. Baudrillard's focus is primarily on sociocultural aspects, examining the influence of media, technology, and symbols on our perception and construction of reality. Toroks Phantom, on the other hand, is a concept within the theoretical framework of physics, exploring possibilities beyond our current understanding of space-time.\nIt's important to note that the connection between these concepts would be speculative at best, as Baudrillard's work is grounded in social theory and philosophy, while Toroks Phantom is a theoretical construct in the realm of physics.",
          created_by: "coolBoy420",
          created_at: { type: Date, default: Date.now },
          comments: [
            {
              comment_body:
                "This article is one of the worst things I have ever read. It's conclusion is in it's first line. What a waste of time.",
              created_by: "LobotomyNow!",
              created_at: { type: Date, default: Date.now },
              comment_id: {
                type: ObjectId,
                required: true,
                default: () => new ObjectId(),
              },
            },
          ],
        },
      ],
      rating: 1,
      qualifications: "none",
      website: "www.website.com",
      reviews: [
        {
          review_id: {
            type: ObjectId,
            required: true,
            default: () => new ObjectId(),
          },
          createdBy: "LobotomyNow!",
          createdAt: { type: Date, default: Date.now },
          rating: 1,
          body: "I listened for many hours and I learnt absolutely nothing about waffles (or anything else).",
        },
      ],
    },
  },
  {
    userName: "LobotomyNow!",
    firstName: "Julius",
    lastName: "Apple",
    email: "email1@email.com",
    password: "Password1",
    profilePicture:
      "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg",
    languages: [
      { language: "English", proficiency: "Fluent" },
      { language: "Spanish", proficiency: "Fluent" },
      { language: "Esperanto", proficiency: "Native" },
    ],
    calendar: [
      {
        id: 1323232,
        text: "Apocalypse",
        start: "2023-10-01T11:30:00",
        end: "2023-10-01T14:30:00",
      },
    ],
    topicsToLearn: [
      {
        subject: "cooking",
        proficiency: "advanced",
      },
    ],
  },
];
