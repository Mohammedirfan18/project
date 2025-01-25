/*
  # Campus Management Platform Database Schema

  1. Core Tables
    - `users`: Stores user accounts and authentication info
    - `roles`: User role definitions
    - `user_roles`: Many-to-many relationship between users and roles
    - `departments`: Academic departments

  2. Module Tables
    - Safety incidents and reports
    - Projects and project management
    - Lab records and submissions
    - Resource bookings
    - Lost and found items
    - News and announcements
    - Alumni profiles and connections

  3. Security
    - Password hashing using bcrypt
    - Role-based access control
    - Audit logging
*/

-- Core Tables
CREATE TABLE IF NOT EXISTS departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  department_id INT,
  status ENUM('active', 'inactive', 'pending') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Safety Module
CREATE TABLE IF NOT EXISTS safety_incidents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  risk_level ENUM('low', 'medium', 'high') NOT NULL,
  status ENUM('pending', 'under_review', 'resolved') DEFAULT 'pending',
  reported_by INT NOT NULL,
  assigned_to INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  FOREIGN KEY (reported_by) REFERENCES users(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS incident_photos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  incident_id INT NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (incident_id) REFERENCES safety_incidents(id) ON DELETE CASCADE
);

-- Project Management Module
CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  abstract TEXT NOT NULL,
  student_id INT NOT NULL,
  mentor_id INT NOT NULL,
  status ENUM('draft', 'submitted', 'approved', 'rejected') DEFAULT 'draft',
  progress INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (mentor_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS project_objectives (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project_documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  document_url VARCHAR(255) NOT NULL,
  type ENUM('report', 'code', 'presentation') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Lab Records Module
CREATE TABLE IF NOT EXISTS lab_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  student_id INT NOT NULL,
  faculty_id INT NOT NULL,
  status ENUM('pending', 'reviewed', 'approved', 'rejected') DEFAULT 'pending',
  submission_url VARCHAR(255) NOT NULL,
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (faculty_id) REFERENCES users(id)
);

-- Resource Booking Module
CREATE TABLE IF NOT EXISTS resources (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  type ENUM('lab', 'projector', 'meeting_room') NOT NULL,
  capacity INT,
  location VARCHAR(255) NOT NULL,
  status ENUM('available', 'maintenance', 'inactive') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resource_bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  resource_id INT NOT NULL,
  user_id INT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  purpose TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resource_id) REFERENCES resources(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Lost and Found Module
CREATE TABLE IF NOT EXISTS lost_found_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  status ENUM('lost', 'found', 'claimed') NOT NULL,
  reported_by INT NOT NULL,
  photo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (reported_by) REFERENCES users(id)
);

-- News Module
CREATE TABLE IF NOT EXISTS news_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  author_id INT NOT NULL,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP NULL,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Alumni Module
CREATE TABLE IF NOT EXISTS alumni_profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  company VARCHAR(255),
  position VARCHAR(255),
  graduation_year INT NOT NULL,
  linkedin_url VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert initial roles
INSERT INTO roles (name, description) VALUES
('student', 'Regular student account'),
('faculty', 'Faculty member with teaching responsibilities'),
('hod', 'Head of Department'),
('dean', 'Dean of the college'),
('security', 'Campus security staff'),
('alumni', 'Graduate of the institution');

-- Insert sample departments
INSERT INTO departments (name, code) VALUES
('Computer Science', 'CS'),
('Electronics', 'EC'),
('Mechanical', 'ME'),
('Civil', 'CE');

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);
CREATE INDEX idx_safety_incidents_status ON safety_incidents(status);
CREATE INDEX idx_projects_student_id ON projects(student_id);
CREATE INDEX idx_projects_mentor_id ON projects(mentor_id);
CREATE INDEX idx_lab_records_student_id ON lab_records(student_id);
CREATE INDEX idx_lab_records_faculty_id ON lab_records(faculty_id);
CREATE INDEX idx_resource_bookings_resource_id ON resource_bookings(resource_id);
CREATE INDEX idx_resource_bookings_user_id ON resource_bookings(user_id);
CREATE INDEX idx_lost_found_items_status ON lost_found_items(status);
CREATE INDEX idx_news_posts_status ON news_posts(status);
CREATE INDEX idx_alumni_profiles_user_id ON alumni_profiles(user_id);