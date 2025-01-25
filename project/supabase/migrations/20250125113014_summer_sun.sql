-- Insert sample users with hashed passwords (password is 'password123' for all users)
INSERT INTO users (email, password_hash, first_name, last_name, department_id, status) VALUES
('admin@example.com', '$2b$10$rw5kpGxBwJy7wJz5k5tK5e8d5s5kF5s5kF5s5kF5s', 'Admin', 'User', 1, 'active'),
('student@example.com', '$2b$10$rw5kpGxBwJy7wJz5k5tK5e8d5s5kF5s5kF5s5kF5s', 'John', 'Doe', 1, 'active'),
('faculty@example.com', '$2b$10$rw5kpGxBwJy7wJz5k5tK5e8d5s5kF5s5kF5s5kF5s', 'Jane', 'Smith', 1, 'active'),
('hod@example.com', '$2b$10$rw5kpGxBwJy7wJz5k5tK5e8d5s5kF5s5kF5s5kF5s', 'Robert', 'Johnson', 1, 'active'),
('security@example.com', '$2b$10$rw5kpGxBwJy7wJz5k5tK5e8d5s5kF5s5kF5s5kF5s', 'Mike', 'Security', 1, 'active'),
('alumni@example.com', '$2b$10$rw5kpGxBwJy7wJz5k5tK5e8d5s5kF5s5kF5s5kF5s', 'Sarah', 'Alumni', 1, 'active');

-- Assign roles to users
INSERT INTO user_roles (user_id, role_id) VALUES
(1, (SELECT id FROM roles WHERE name = 'faculty')),
(2, (SELECT id FROM roles WHERE name = 'student')),
(3, (SELECT id FROM roles WHERE name = 'faculty')),
(4, (SELECT id FROM roles WHERE name = 'hod')),
(5, (SELECT id FROM roles WHERE name = 'security')),
(6, (SELECT id FROM roles WHERE name = 'alumni'));

-- Insert sample resources
INSERT INTO resources (name, type, capacity, location) VALUES
('Computer Lab A', 'lab', 30, 'Building 1, Floor 2'),
('Conference Room 1', 'meeting_room', 15, 'Building 2, Floor 1'),
('Projector Set 1', 'projector', NULL, 'IT Department');

-- Insert sample safety incidents
INSERT INTO safety_incidents (title, description, location, risk_level, reported_by) VALUES
('Broken Street Light', 'Street light near Building B is not working', 'Building B Entrance', 'medium', 2);

-- Insert sample projects
INSERT INTO projects (title, abstract, student_id, mentor_id) VALUES
('AI Security System', 'Developing an AI-based security system for campus', 2, 3);

-- Insert sample lab records
INSERT INTO lab_records (title, subject, student_id, faculty_id, submission_url) VALUES
('Digital Electronics Lab 1', 'Digital Electronics', 2, 3, 'https://example.com/lab1.pdf');

-- Insert sample lost and found items
INSERT INTO lost_found_items (title, description, category, location, status, reported_by) VALUES
('Blue Backpack', 'Nike backpack with laptop and books', 'Bags', 'Library', 'lost', 2);

-- Insert sample news posts
INSERT INTO news_posts (title, content, category, author_id, status) VALUES
('Annual Tech Symposium', 'Join us for the biggest tech event of the year', 'Events', 3, 'published');

-- Insert sample alumni profiles
INSERT INTO alumni_profiles (user_id, company, position, graduation_year, linkedin_url) VALUES
(6, 'Google', 'Senior Software Engineer', 2020, 'https://linkedin.com/in/sarahalumni');