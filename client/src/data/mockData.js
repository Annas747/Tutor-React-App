export const userData = {
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    email: "alex.j@example.com",
    role: "Student",
    stats: {
        coursesCompleted: 4,
        hoursLearned: 126,
        points: 8540,
        streak: 12
    }
};

export const courses = [
    {
        id: 1,
        title: "Complete React Developer in 2024",
        instructor: "Andrei Neagoie",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        progress: 75,
        totalLessons: 42,
        completedLessons: 31,
        category: "Development",
        difficulty: "Intermediate",
        rating: 4.8
    },
    {
        id: 2,
        title: "Python for Data Science and Machine Learning",
        instructor: "Jose Portilla",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        progress: 30,
        totalLessons: 85,
        completedLessons: 25,
        category: "Data Science",
        difficulty: "Advanced",
        rating: 4.9
    },
    {
        id: 3,
        title: "UX/UI Design Masterclass",
        instructor: "Mizko",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        progress: 0,
        totalLessons: 24,
        completedLessons: 0,
        category: "Design",
        difficulty: "Beginner",
        rating: 4.7
    }
];

export const activities = [
    { id: 1, type: "completion", message: "Completed Lesson 4 in React Developer", time: "2 hours ago" },
    { id: 2, type: "quiz", message: "Scored 90% in JavaScript Basics Quiz", time: "1 day ago" },
    { id: 3, type: "enrollment", message: "Enrolled in UX/UI Design Masterclass", time: "2 days ago" }
];
