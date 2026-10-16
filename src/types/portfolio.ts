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
  // التعديل هنا: اقتصر الـ media على الصور فقط
  media: {
    images: {
      url: string;
      caption: string;
    }[];
  };
  // التعديل هنا: الـ links أصبحت تستوعب الروابط، الفيديوهات، والملفات بشكل موحد
  links: {
    label: string;
    url: string;
    type?: string;
  }[];
}

export interface SkillCategory {
  layer: 'Practical Skills' | 'Theoretical Knowledge';
  categoryName: string;
  skills: string[];
}

export interface Certificate {
  id: string;
  category: 'Academic' | 'Programming Advices' | 'Achievements';
  title: string;
  issuer: string;
  issueDate: string;
  imageUrl?: string; // أصبحت اختيارية بعد اعتماد الـ images بالكامل
  images?: {
    url: string;
    caption: string;
  }[];
  documentUrl?: string;
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