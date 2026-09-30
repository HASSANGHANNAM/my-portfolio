export type ProjectType = 'جامعي' | 'عمل' | 'تدريب' | 'شخصي';

export interface Project {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  projectType: ProjectType;
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
  skillsCovered: string[];
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  bio: string;
  education: string;
  socialLinks: {
    Email: string;
    LinkedIn: string;
    GitHub: string;
    WhatsApp: string;
    Telegram: string;
  };
  cvUrl: string;
}