// src/content.ts
// Single Source of Truth for Shruti Dixit's Portfolio
// Strict adherence to verified resume facts — no invented metrics or claims

export interface CaseStudyData {
  overview: string;
  problem: string;
  approach: string;
  tools: string;
  build: string;
  outcome: string;
  whatIdImproveNext?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  shortTitle: string;
  categories: string[];
  tech: string[];
  description: [string, string];
  leftColumns?: [string, string];
  rightColumns?: [string, string];
  leftTile: string;
  rightTile: string;
  mockupType: 'ml-dashboard' | 'bi-dashboard' | 'nlp-pipeline';
  screenshotUrl?: string;
  screenshotAlt?: string;
  caseStudy: CaseStudyData;
}

export type EditorialSpreadData = ProjectData;

export interface CertificationData {
  id: string;
  title: string;
  category: string;
  issuer: string;
  date: string;
  badge: string;
  badgeImageUrl?: string;
}

export const PERSONAL_INFO = {
  name: "Shruti Dixit",
  headlineName: "SHRUTI DIXIT",
  monogram: "SD",
  title: "Data Analyst, Power BI Developer, ML Practitioner",
  location: "Uttar Pradesh, India",
  email: "shrutidixit9125@gmail.com",
  phone: "+91 9125792541",
  linkedin: "https://www.linkedin.com/in/shruti-dixit-3023512b5",
  github: "https://github.com/Shrutidix",
  githubUsername: "Shrutidix",
  resumeUrl: "./resume.pdf",
  summary:
    "Data Analyst and Machine Learning practitioner skilled in SQL, Python, Power BI, and Advanced Excel. I build interactive KPI dashboards, automated data pipelines, and predictive models that turn complex business data into clear, actionable insights.",
  aboutQuote:
    "Data only creates true value when it helps teams make clear, confident business decisions.",
  aboutBio:
    "I am a results-focused Data Analyst and Machine Learning practitioner skilled in SQL, Python, Power BI, and Advanced Excel. I specialize in building end-to-end data pipelines, predictive models, and intuitive dashboards that transform complex numbers into simple, actionable visual insights.",
  closingQuote: "Let's turn your data into decisions.",
  roles: [
    "Data Analyst",
    "Power BI Developer",
    "ML Practitioner",
    "SQL & Python Analyst"
  ],
};

export const CURRENTLY_EXPLORING = [
  { topic: "Generative AI Architectures", context: "Applied deep learning & transformer workflows" },
  { topic: "Transformer Frameworks", context: "Hugging Face pipelines & TensorFlow integration" },
  { topic: "Prompt Engineering & Benchmarking", context: "Structured data extraction & NLP evaluation" },
];

export const TOOL_MARQUEE = [
  "Python", "SQL", "Power BI", "DAX", "Power Query", "Tableau",
  "Excel", "Scikit-learn", "Streamlit", "SHAP", "NLTK", "Pandas", "NumPy"
];

export const ISSUER_MARQUEE = [
  "NASSCOM FutureSkills Prime",
  "AWS Academy",
  "IBM Developer Skills Network",
  "IT-ITES Sector Skills Council",
  "SR Group of Institutions"
];

export const BENTO_FACTS = [
  {
    id: "education",
    label: "Education",
    title: "B.Tech (Expected 2027)",
    institution: "SR Group of Institute of Management and Technology",
    location: "Uttar Pradesh, India",
    cgpa: 7.52,
    maxCgpa: 10,
    tag: "ACADEMIC",
  },
  {
    id: "location",
    label: "Location",
    title: "Uttar Pradesh, India",
    subtext: "India",
    tag: "BASE",
  },
  {
    id: "focus",
    label: "Focus Areas",
    items: [
      "Exploratory Data Analysis (EDA)",
      "Feature Engineering",
      "Natural Language Processing (NLP)",
      "Statistical Modeling"
    ],
    tag: "METHODOLOGY",
  },
  {
    id: "certs-count",
    label: "Certifications",
    count: 5,
    subtext: "NASSCOM Gold Category, AWS Academy & IBM Credentials",
    tag: "CREDENTIALS",
  },
  {
    id: "projects-count",
    label: "Key Projects",
    count: 3,
    subtext: "Predictive Analytics, Star Schema & NLP Classification",
    tag: "PORTFOLIO",
  },
];

export const HOW_I_WORK_STEPS = [
  { id: "question", icon: "search", name: "Question", detail: "Understand the core business problem and identify the key KPIs to track." },
  { id: "clean", icon: "filter", name: "Clean", detail: "Clean messy data, remove duplicates, handle missing values, and prepare structured tables." },
  { id: "model", icon: "database", name: "Model", detail: "Build reliable statistical models, organized database schemas, and predictive algorithms." },
  { id: "visualise", icon: "barchart", name: "Visualise", detail: "Design clear, interactive charts, graphs, and executive dashboards." },
  { id: "deliver", icon: "send", name: "Deliver", detail: "Deliver actionable insights through web apps and automated Power BI reports." },
];

export const TOOL_CATEGORIES_CONSTELLATION = [
  {
    category: "SQL & Databases",
    id: "sql",
    color: "#22D3EE",
    tools: ["PostgreSQL", "MySQL", "Relational Design", "CTEs", "Window Functions", "Normalization"]
  },
  {
    category: "Business Intelligence",
    id: "bi",
    color: "#FFB020",
    tools: ["Power BI", "DAX", "Power Query ETL", "Star Schema", "Tableau", "Advanced Excel"]
  },
  {
    category: "Python & Data Science",
    id: "python",
    color: "#7E9387",
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "EDA"]
  },
  {
    category: "ML & NLP",
    id: "ml",
    color: "#7C5CFF",
    tools: ["Scikit-learn", "Random Forest", "Gradient Boosting", "SHAP", "TF-IDF", "NLTK"]
  },
  {
    category: "Developer Tools",
    id: "tools",
    color: "#D9C3A3",
    tools: ["Git", "GitHub", "Streamlit", "Plotly", "Jupyter", "VS Code"]
  }
];

export const SKILL_FLIP_CARDS = [
  {
    id: "databases",
    title: "Databases & Querying",
    categoryKey: "databases",
    skills: [
      "SQL (PostgreSQL, MySQL)",
      "Relational Database Design",
      "Joins",
      "Window Functions",
      "CTEs",
      "Aggregations",
      "Data Normalization",
    ],
  },
  {
    id: "bi",
    title: "Business Intelligence",
    categoryKey: "bi",
    skills: [
      "Power BI",
      "DAX",
      "Power Query",
      "Tableau",
      "Advanced Excel (Pivot Tables, XLOOKUP, Dynamic Arrays, Data Modeling)",
    ],
  },
  {
    id: "programming",
    title: "Programming & Data Science",
    categoryKey: "programming",
    skills: [
      "Python (Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn)",
      "Statistical Analysis",
      "Feature Engineering",
      "EDA",
    ],
  },
  {
    id: "aiml",
    title: "AI/ML & NLP",
    categoryKey: "aiml",
    skills: [
      "Linear/Logistic Regression",
      "Decision Trees",
      "Random Forest",
      "Gradient Boosting",
      "SHAP",
      "TF-IDF",
      "NLTK",
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    categoryKey: "tools",
    skills: [
      "Git",
      "GitHub",
      "Jupyter Notebook",
      "Google Colab",
      "VS Code",
      "Streamlit",
      "Plotly",
      "Joblib",
    ],
  },
];

export const ALL_SKILL_TAGS = [
  { name: "SQL (PostgreSQL, MySQL)", category: "databases" },
  { name: "Relational Database Design", category: "databases" },
  { name: "Joins & Window Functions", category: "databases" },
  { name: "CTEs & Aggregations", category: "databases" },
  { name: "Data Normalization", category: "databases" },
  { name: "Power BI", category: "bi" },
  { name: "DAX Formulas", category: "bi" },
  { name: "Power Query ETL", category: "bi" },
  { name: "Tableau", category: "bi" },
  { name: "Advanced Excel", category: "bi" },
  { name: "Pivot Tables & XLOOKUP", category: "bi" },
  { name: "Star Schema Modeling", category: "bi" },
  { name: "Python", category: "programming" },
  { name: "Pandas & NumPy", category: "programming" },
  { name: "Matplotlib & Seaborn", category: "programming" },
  { name: "Scikit-learn", category: "programming" },
  { name: "Statistical Analysis", category: "programming" },
  { name: "Feature Engineering", category: "programming" },
  { name: "EDA (Exploratory Data Analysis)", category: "programming" },
  { name: "Linear/Logistic Regression", category: "aiml" },
  { name: "Decision Trees & Random Forest", category: "aiml" },
  { name: "Gradient Boosting", category: "aiml" },
  { name: "SHAP Explainability", category: "aiml" },
  { name: "TF-IDF Vectorization", category: "aiml" },
  { name: "NLTK", category: "aiml" },
  { name: "Git & GitHub", category: "tools" },
  { name: "Jupyter Notebook & Colab", category: "tools" },
  { name: "VS Code", category: "tools" },
  { name: "Streamlit", category: "tools" },
  { name: "Plotly", category: "tools" },
  { name: "Joblib", category: "tools" },
];

export const SKILL_CATEGORIES = [
  { id: "all", label: "All Skills" },
  { id: "databases", label: "Databases & SQL" },
  { id: "bi", label: "Power BI & Excel" },
  { id: "programming", label: "Python & Data Science" },
  { id: "aiml", label: "AI/ML & NLP" },
  { id: "tools", label: "Developer Tools" },
];

export const PROJECT_FILTERS = [
  "All",
  "Machine Learning",
  "Power BI & ETL",
  "NLP & Text Mining",
  "Predictive Analytics",
];

export const EDITORIAL_PROJECTS: EditorialSpreadData[] = [
  {
    id: "academic-risk-system",
    title: "AI-Driven Academic Risk & Student Retention System",
    shortTitle: "Student Retention AI",
    categories: ["Machine Learning", "Predictive Analytics"],
    tech: ["Python", "Scikit-learn", "Streamlit", "Plotly", "SHAP"],
    description: [
      "Cleans and organizes student academic data including grades, attendance, and assignment history without data errors.",
      "Trained and tested multiple machine learning models to forecast student retention risks."
    ],
    leftColumns: [
      "Cleans and organizes student academic data including grades, attendance, and assignment history without data errors.",
      "Trained and tested multiple machine learning models to forecast student retention risks."
    ],
    rightColumns: [
      "Built an interactive web app with clear visual charts so educators can upload class rosters and see instant predictions.",
      "Identifies key factors flagged by models so teachers can step in with timely guidance before exams."
    ],
    leftTile: "SHAP Explainability",
    rightTile: "5-Fold CV",
    mockupType: "ml-dashboard",
    screenshotUrl: "./images/academic-retention-dashboard.svg",
    screenshotAlt: "Academic Risk Prediction Dashboard Screenshot",
    caseStudy: {
      overview: "A predictive analytics system built to identify students who may need extra academic support before final semester exams.",
      problem: "Traditional academic oversight only catches struggling students after they fail, making timely interventions difficult.",
      approach: "Built clean data pipelines to process student history, attendance, and scores, then trained machine learning algorithms with cross-validation.",
      tools: "Python, Scikit-learn, Streamlit, Plotly, Pandas, NumPy, SHAP",
      build: "Constructed an interactive web dashboard where teachers can view single-student summaries or upload full class rosters for instant analysis.",
      outcome: "Gives educators clear, actionable early warnings to provide personalized academic support and improve student retention.",
      whatIdImproveNext: ""
    }
  },
  {
    id: "maven-market-bi",
    title: "Maven Market Executive Sales & Retail Intelligence Dashboard",
    shortTitle: "Maven Market Intelligence",
    categories: ["Power BI & ETL"],
    tech: ["Power BI", "DAX", "Power Query"],
    description: [
      "Tracks sales revenue, profit margins, and customer transaction trends across international supermarket stores.",
      "Automated the data cleaning process to combine sales records, inventory lists, and customer profiles into one clean model."
    ],
    leftColumns: [
      "Tracks sales revenue, profit margins, and customer transaction trends across international supermarket stores.",
      "Automated the data cleaning process to combine sales records, inventory lists, and customer profiles into one clean model."
    ],
    rightColumns: [
      "Calculated custom business KPIs including Total Sales, Profit Margins, and Inventory Shelf Life.",
      "Designed interactive reports with clickable filters, trend charts, and breakdown trees to spot revenue opportunities."
    ],
    leftTile: "Star Schema",
    rightTile: "DAX KPIs",
    mockupType: "bi-dashboard",
    screenshotUrl: "./images/maven-market-dashboard.svg",
    screenshotAlt: "Maven Market Executive Power BI Dashboard Screenshot",
    caseStudy: {
      overview: "An executive Power BI dashboard tracking store revenue, product margins, and transaction trends across retail chains.",
      problem: "Disorganized spreadsheets made it hard for managers to spot which stores or products were losing money or running out of stock.",
      approach: "Used Power Query to clean and structure raw transaction data into an organized relational Star Schema data model.",
      tools: "Power BI, DAX, Power Query, Data Modeling, Decomposition Trees.",
      build: "Wrote DAX calculation formulas for sales, profit, and product turnover, and built interactive dashboards with drill-down views.",
      outcome: "Gave retail leaders an automated dashboard to track store performance, reduce wasted inventory, and increase profit margins.",
      whatIdImproveNext: ""
    }
  },
  {
    id: "fake-news-nlp",
    title: "Automated Fake News Detection & NLP Classification Pipeline",
    shortTitle: "Fake News NLP Pipeline",
    categories: ["NLP & Text Mining", "Machine Learning"],
    tech: ["Python", "NLP", "Scikit-learn", "NLTK", "TF-IDF"],
    description: [
      "Processes article headlines and text, stripping out noise and analyzing word frequencies to spot deceptive patterns.",
      "Trained machine learning classifiers to distinguish between real news and false stories."
    ],
    leftColumns: [
      "Processes article headlines and text, stripping out noise and analyzing word frequencies to spot deceptive patterns.",
      "Trained machine learning classifiers to distinguish between real news and false stories."
    ],
    rightColumns: [
      "Engineered an automated language processing pipeline that scans news articles and flags deceptive content.",
      "Evaluated model precision and recall metrics to ensure balanced and reliable classification."
    ],
    leftTile: "TF-IDF",
    rightTile: "F1-Score",
    mockupType: "nlp-pipeline",
    screenshotUrl: "./images/fake-news-nlp-pipeline.svg",
    screenshotAlt: "Fake News NLP Classifier Evaluation Screenshot",
    caseStudy: {
      overview: "An automated text-processing pipeline designed to identify misleading and fabricated news articles.",
      problem: "The rapid spread of online misinformation requires fast, automated classification beyond simple keyword checks.",
      approach: "Built clean text processing pipelines to normalize vocabulary using NLTK and TF-IDF, then trained supervised classifiers on news datasets.",
      tools: "Python, Scikit-learn, NLTK, TF-IDF Vectorization, Pandas, NumPy.",
      build: "Developed an end-to-end classification system that scores incoming articles based on linguistic patterns and reliability.",
      outcome: "Delivered a reliable classifier that helps analyze and identify misleading articles with measured precision and recall.",
      whatIdImproveNext: ""
    }
  }
];

export const PROJECTS_DATA = EDITORIAL_PROJECTS;

export const EXPERIENCE_ITEM = {
  role: "Virtual Intern, Generative AI & Data Analytics",
  company: "IBM Developer Skills Network (via FSP)",
  period: "Jun 2026 – Aug 2026",
  location: "Virtual / Remote",
  badge: "VIRTUAL INTERNSHIP",
  bullets: [
    "Applied workflows using Generative AI architectures, deep learning models and transformer frameworks (Hugging Face, TensorFlow)",
    "Structured prompt-engineering and data-manipulation strategies for unstructured data extraction, summarization and model benchmarking",
    "Evaluated model outputs across NLP and analytical tasks to find bottlenecks and improve prompt response quality"
  ],
  stack: ["Generative AI", "Hugging Face", "TensorFlow", "Transformer Frameworks", "Prompt Engineering", "NLP"]
};

export const CERTIFICATIONS: CertificationData[] = [
  {
    id: "cert-1",
    title: "Exploratory Data Analysis",
    category: "Gold Category Assessment (70%+ score)",
    issuer: "NASSCOM FutureSkills Prime & IT-ITES SSC",
    date: "Aug 2026",
    badge: "GOLD 70%+",
    badgeImageUrl: "./images/badges/badge-nasscom-gold.svg"
  },
  {
    id: "cert-2",
    title: "AWS Academy Graduate: Machine Learning Foundations",
    category: "Cloud ML & Algorithmic Modeling",
    issuer: "AWS Academy",
    date: "Jan 2026",
    badge: "AWS GRADUATE",
    badgeImageUrl: "./images/badges/badge-aws-ml.svg"
  },
  {
    id: "cert-3",
    title: "AWS Academy Graduate: Generative AI Foundations",
    category: "Foundation Models & Workflows",
    issuer: "AWS Academy",
    date: "Mar 2026",
    badge: "AWS GRADUATE",
    badgeImageUrl: "./images/badges/badge-aws-genai.svg"
  },
  {
    id: "cert-4",
    title: "Digital Application Fundamentals - STEM",
    category: "Gold Category Assessment",
    issuer: "NASSCOM FutureSkills Prime & IT-ITES SSC",
    date: "Jul 2026",
    badge: "GOLD STEM",
    badgeImageUrl: "./images/badges/badge-nasscom-stem.svg"
  },
  {
    id: "cert-5",
    title: "Virtual Internship in Generative AI (FSP)",
    category: "Generative AI & Analytical Workflows",
    issuer: "IBM Developer Skills Network / IBM Mooc",
    date: "Aug 2026",
    badge: "IBM CREDENTIAL",
    badgeImageUrl: "./images/badges/badge-ibm-genai.svg"
  },
];

export const EDUCATION_RECORD = {
  degree: "B.Tech",
  institution: "SR Group of Institute of Management and Technology",
  location: "Uttar Pradesh, India",
  expectedYear: "Expected 2027",
  cgpa: "7.52 / 10",
  cgpaVal: 7.52,
};
