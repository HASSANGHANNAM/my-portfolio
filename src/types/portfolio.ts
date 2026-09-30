export type ProjectType = 'Academic' | 'Professional' | 'Training' | 'Personal';

export interface Project {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  projectType: ProjectType;
  problem?: string;
  solution?: string;
  architecture?: string;
  challenges?: string[];
  keyHighlights: string[];
  techStack: string[];
  detailedSections: {
    heading: string;
    content: string;
  }[];
  media: {
    images: {
      url: string;
      caption: string;
    }[];
    videos: {
      url: string;
      caption: string;
      embed?: boolean;
    }[];
    files: {
      name: string;
      url: string;
    }[];
  };
  links: {
    label: string;
    url: string;
  }[];
}

export interface SkillCategory {
  categoryName: string;
  skills: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  imageUrl: string;
  images?: {
    url: string;
    caption: string;
  }[];
  skillsCovered: string[];
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  bio: string;
  education: string;
  socialLinks: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    codeforces: string;
    location: string;
    locationUrl: string;
  };
  cvUrl: string;
}