const users = [
	{
		_id: "648ac42475c58ca8fbe8b6d7",
		userName: "BenjiSmith1990",
		firstName: "Ben",
		lastName: "Smith",
		email: "thisisanemailaddress@gmail.com",
		password: "MyPaSwOrD!",
		profilePicture:
			"https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/turtle-2815539-1280_ver_1.png",
		languages: [
			{
				language: "English",
				fluency: "Fluent",
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
				subject: "Maths",
				proficiency: "Subpar",
			},
		],
		aboutMe: "Loveable goofball",
		isTeacher: false,
	},
	{
		userName: "MrTeacher",
		firstName: "Margin",
		lastName: "Bottom",
		email: "imateachersemail@gmail.com",
		password: "ThIsIsApAsSwOrD",
		profilePicture:
			"https://jappliedecologyblog.files.wordpress.com/2022/01/picture2-2.jpg?w=1200",
		languages: [
			{
				language: "English",
				fluency: "Fluent",
			},
			{
				language: "Spanish",
				fluency: "Que",
			},
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
			},
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
					courseName: "How to be a Mongod",
					courseCategory: "Coding",
					hourlyRate: 50,
					courseImage:
						"https://miro.medium.com/v2/resize:fit:960/0*HgOI-QuJ9TN7oeXD.jpg",
					rating: 5,
					description: "Learn to be a god like me",
				},
			],
			articles: [
				{
					article_title: "Mongod Tutorial",
					article_category: "cooking",
					article_img:
						"https://coralogix.com/wp-content/uploads/2023/03/MongoDB-1000X1000.png",
					article_body:
						"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
					created_by: "MrTeacher",

					comments: [
						{
							comment_body: "I feel like a right Mongod now!",
							created_by: "BenjiSmith1990",
						},
					],
				},
			],
			rating: 5,
			qualifications: "All the Quals",
			website: "www.iamgoogle.com",
			reviews: [
				{
					createdBy: "BenjiSmith1990",
					rating: 4,
					body: "Wowzers",
				},
			],
		},
	},
	{
		userName: "coolBoy420",
		firstName: "Jonathan",
		lastName: "Bean",
		email: "email@email.com",
		password: "Password1",
		profilePicture:
			"https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg",
		languages: [
			{ language: "English", fluency: "Fluent" },
			{ language: "German", fluency: "Scheisse" },
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
				subject: "Maths",
				proficiency: "Prodigy",
			},
		],
		aboutMe: "I am a human (i think)",
		isTeacher: true,
		teacher: {
			courses: [
				{
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
					article_title: "The link between Baudrillard and Torok's Phantom",
					article_category: "Literary Theory",
					article_body:
						"Jean Baudrillard and Toroks Phantom are two distinct concepts from different domains. Jean Baudrillard was a prominent French sociologist and philosopher known for his theories on postmodernism, simulacra, and hyperreality. Toroks Phantom, on the other hand, is a theoretical construct proposed by Dr. Zoltan Torok in the field of theoretical physics.\nJean Baudrillard's ideas revolve around the notion of hyperreality, where he argues that our contemporary society is characterized by the simulation and proliferation of signs and symbols that create a simulated reality divorced from the original referents. His work explores the ways in which symbols, images, and representations shape our perception of reality and contribute to the dissolution of the boundaries between reality and illusion.\nToroks Phantom, on the other hand, is a concept within the realm of theoretical physics that extends our understanding of space-time. It proposes the existence of 'phantom space' alongside our observable space-time, suggesting the possibility of alternative dimensions or hidden aspects of the universe that are currently beyond our perception and comprehension.\nWhile both Baudrillard's ideas and Toroks Phantom touch upon the nature of reality, they approach the subject from different perspectives and disciplines. Baudrillard's focus is primarily on sociocultural aspects, examining the influence of media, technology, and symbols on our perception and construction of reality. Toroks Phantom, on the other hand, is a concept within the theoretical framework of physics, exploring possibilities beyond our current understanding of space-time.\nIt's important to note that the connection between these concepts would be speculative at best, as Baudrillard's work is grounded in social theory and philosophy, while Toroks Phantom is a theoretical construct in the realm of physics.",
					created_by: "coolBoy420",
					comments: [
						{
							comment_body:
								"This article is one of the worst things I have ever read. It's conclusion is in it's first line. What a waste of time.",
							created_by: "LobotomyNow!",
						},
					],
				},
			],
			rating: 1,
			qualifications: "none",
			website: "www.website.com",
			reviews: [
				{
					createdBy: "LobotomyNow!",
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
			{ language: "English", fluency: "Fluent" },
			{ language: "Spanish", fluency: "Fluent" },
			{ language: "Esperanto", fluency: "Native" },
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
	{
		userName: "Emmy",
		firstName: "Fion",
		lastName: "Guan",
		email: "emmyemail@email.com",
		password: "Pfion1",
		profilePicture:
			"https://static.vecteezy.com/system/resources/previews/009/665/304/non_2x/cute-kitty-cat-head-cartoon-element-free-png.png",
		languages: [
			{ language: "English", fluency: "Fluent" },
			{ language: "German", fluency: "Scheisse" },
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
	},
	{
		userName: "CadenGG",
		firstName: "Karlie",
		lastName: "Guan",
		email: "caden@email.com",
		password: "Passwordcaden0",
		profilePicture:
			"https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
		languages: [
			{ language: "English", fluency: "Fluent" },
			{ language: "Cantonese", fluency: "Fluent" },
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
					article_category: "Quantum Physics",
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
	},
	{
		userName: "juniorDev",
		firstName: "Tom",
		lastName: "Dev",
		email: "dev@juniordev.com",
		password: "juniordev123",
		profilePicture:
			"https://images.freeimages.com/images/large-previews/7df/2848-x-2136-pixels-9-5-x-7-1-300dpi-2720-kbytes-jpg-1387455.jpg",
		languages: [
			{
				language: "English",
				fluency: "Fluent",
			},
		],
		calendar: [],
		topicsToLearn: [
			{
				subject: "Coding",
				proficiency: "Beginner",
			},
		],
		aboutMe: "I'm a junior dev",
	},
	{
		userName: "musicTeacher",
		firstName: "Daniel",
		lastName: "Roberts",
		email: "drmusic@email.com",
		password: "musicteacher123",
		profilePicture:
			"https://images.freeimages.com/images/large-previews/e5c/guitarist-1155888.jpg",
		languages: [
			{
				language: "English",
				fluency: "Fluent",
			},
			{
				language: "French",
				fluency: "Merde",
			},
		],
		isTeacher: true,
		teacher: {
			articles: [
				{
					article_title: "Basics of music",
					article_category: "Music",
					article_body: "Music is often in 4/4 timing ...",
				},
			],
			rating: 2,
			qualifications: "Grade 5 piano",
			website: "www.google.co.uk",
		},
	},
	{
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
				fluency: "fluent",
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
	},
	{
		userName: "I_teach_cool_things",
		firstName: "Saskia",
		lastName: "Wells",
		email: "emailemail@gmail.com",
		password: "securePassword",
		profilePicture: "https://m.media-amazon.com/images/I/71YElaLt6lL.jpg",
		languages: [
			{
				language: "English",
				fluency: "i have spoken it my whole damn life",
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
	},
];
module.exports = users;
