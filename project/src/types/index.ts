export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'hod' | 'dean' | 'security' | 'alumni';
  department?: string;
}

export interface SafetyIncident {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'pending' | 'under_review' | 'resolved';
  timestamp: string;
  reportedBy: string;
  photos?: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Project {
  id: string;
  title: string;
  abstract: string;
  objectives: string[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  studentId: string;
  mentorId: string;
  progress: number;
  documents: ProjectDocument[];
}

export interface ProjectDocument {
  id: string;
  title: string;
  type: 'report' | 'code' | 'presentation';
  url: string;
  uploadedAt: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'lab' | 'projector' | 'meeting_room';
  capacity?: number;
  location: string;
  available: boolean;
}

export interface LostItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'lost' | 'found' | 'claimed';
  reportedBy: string;
  timestamp: string;
  photo?: string;
}