-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('student', 'instructor')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT, -- Could be Markdown or HTML
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    progress INTEGER DEFAULT 0, -- Percentage or number of lessons completed
    grade DECIMAL(5, 2), -- Optional grade
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);

-- Chat Messages (AI Tutor)
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sender VARCHAR(50) CHECK (sender IN ('user', 'ai')) NOT NULL,
    context_course_id INTEGER REFERENCES courses(id), -- Context of the chat (optional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Community Messages (Student-Teacher Chat)
CREATE TABLE IF NOT EXISTS community_messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mock Data / Seed
INSERT INTO users (name, email, password_hash, role) VALUES
('Instructor Alice', 'alice@example.com', 'hashed_password_123', 'instructor'),
('Student Bob', 'bob@example.com', 'hashed_password_456', 'student')
ON CONFLICT (email) DO NOTHING;

INSERT INTO courses (title, description, instructor_id) VALUES
('Introduction to React', 'Learn the basics of React.js including components, state, and props.', 1),
('Advanced Node.js', 'Master backend development with Node.js and Express.', 1)
ON CONFLICT DO NOTHING;
