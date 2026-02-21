import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Heart, MapPin, DollarSign, ChevronRight, ArrowLeft,
  Clock, Building, Zap, CheckCircle2, Plus, Star, Users,
  Briefcase, TrendingUp, Filter, X, BookmarkCheck, Sparkles
} from 'lucide-react';

interface Opportunity {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  match: number;
  applied: boolean;
  saved: boolean;
  type: string;
  modality: string;
  experience: string;
  posted: string;
  applicants: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  aboutCompany: string;
  companySize: string;
  companyFunding: string;
  companyIndustry: string;
  process: string[];
  tags: string[];
  urgent: boolean;
}

interface OpportunitiesPageProps {
  isDark: boolean;
}

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Internacional',
    logo: 'TC',
    location: 'Remoto (México/LATAM)',
    salary: '$25,000 - $35,000 MXN',
    match: 95,
    applied: false,
    saved: true,
    type: 'Tiempo completo',
    modality: 'Remoto',
    experience: '3-5 años',
    posted: 'Hace 2 días',
    applicants: 24,
    description: 'Buscamos un desarrollador frontend senior apasionado por crear experiencias de usuario excepcionales. Trabajarás en productos SaaS de alta escala utilizados por millones de usuarios en todo el mundo. Serás parte de un equipo de ingeniería de clase mundial donde la innovación y la calidad son prioridad.',
    responsibilities: [
      'Liderar el desarrollo de nuevas características del producto usando React, TypeScript y Next.js',
      'Colaborar con diseñadores para implementar interfaces pixel-perfect y animaciones fluidas',
      'Optimizar el rendimiento del frontend y mejorar métricas de Core Web Vitals',
      'Mentoría técnica a desarrolladores junior y mid-level del equipo',
      'Participar en code reviews y establecer mejores prácticas de desarrollo',
      'Contribuir al design system interno utilizado por 8 equipos de producto'
    ],
    requirements: [
      '4+ años de experiencia con React y ecosistema moderno de JavaScript',
      'Dominio de TypeScript, Next.js, y herramientas de estado (Redux, Zustand, etc.)',
      'Experiencia con sistemas de diseño, Tailwind CSS, y metodologías CSS-in-JS',
      'Conocimientos sólidos en optimización de rendimiento y accesibilidad web',
      'Experiencia trabajando en equipos ágiles con Git/GitHub',
      'Inglés avanzado para colaboración con equipo global'
    ],
    niceToHave: [
      'Experiencia con testing (Jest, React Testing Library, Playwright)',
      'Conocimientos de backend con Node.js o Python',
      'Contribuciones a proyectos open source',
      'Experiencia con GraphQL y Apollo Client'
    ],
    benefits: [
      'Salario competitivo de $25K-$35K MXN mensuales',
      'Trabajo 100% remoto con horarios flexibles',
      '20 días de vacaciones + días libres en tu cumpleaños',
      'Presupuesto anual de $15K para equipo y home office',
      'Seguro de gastos médicos mayores para ti y dependientes',
      'Capacitación y certificaciones pagadas ($2K USD/año)',
      'Stock options después de 1 año'
    ],
    aboutCompany: 'TechCorp es una empresa líder en soluciones SaaS con más de 500 empleados distribuidos globalmente. Nuestros productos son utilizados por más de 5 millones de usuarios en 120 países. Valoramos la innovación, la diversidad y el equilibrio vida-trabajo. Hemos sido reconocidos como "Best Place to Work" por 3 años consecutivos.',
    companySize: '500+ empleados',
    companyFunding: 'Serie C — $50M USD',
    companyIndustry: 'SaaS / Productividad',
    process: [
      'Entrevista inicial con Recursos Humanos (30 min)',
      'Reto técnico take-home (2-3 horas)',
      'Entrevista técnica con el equipo (1 hora)',
      'Entrevista final con Engineering Manager (45 min)'
    ],
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    urgent: true
  },
  {
    id: 2,
    title: 'UX/UI Product Designer',
    company: 'DesignHub Studio',
    logo: 'DH',
    location: 'Híbrido - CDMX',
    salary: '$20,000 - $30,000 MXN',
    match: 88,
    applied: true,
    saved: false,
    type: 'Tiempo completo',
    modality: 'Híbrido',
    experience: '2-4 años',
    posted: 'Hace 1 semana',
    applicants: 67,
    description: 'Únete a nuestro equipo de diseño para crear productos digitales que impacten positivamente la vida de miles de usuarios. Trabajarás en proyectos para startups de alto crecimiento y empresas Fortune 500. Buscamos diseñadores con un ojo crítico para el detalle y pasión por resolver problemas complejos a través del diseño.',
    responsibilities: [
      'Diseñar experiencias de usuario end-to-end desde investigación hasta entrega a desarrollo',
      'Crear wireframes, prototipos interactivos y diseños de alta fidelidad en Figma',
      'Conducir sesiones de research con usuarios y análisis de métricas de usabilidad',
      'Colaborar estrechamente con PMs y desarrolladores en un equipo multidisciplinario',
      'Mantener y evolucionar el design system de la compañía',
      'Presentar propuestas de diseño a stakeholders y clientes'
    ],
    requirements: [
      '3+ años de experiencia en diseño de productos digitales',
      'Portfolio robusto demostrando proceso de diseño y pensamiento crítico',
      'Dominio experto de Figma, con experiencia en componentes y auto-layout',
      'Conocimientos sólidos de principios de UX, patrones de interacción y accesibilidad',
      'Experiencia con metodologías de research (entrevistas, testing de usabilidad)',
      'Excelentes habilidades de comunicación y presentación'
    ],
    niceToHave: [
      'Conocimientos básicos de HTML/CSS para handoff efectivo',
      'Experiencia con herramientas de prototipado avanzado (Principle, ProtoPie)',
      'Familiaridad con motion design y After Effects',
      'Experiencia diseñando para web, iOS y Android'
    ],
    benefits: [
      'Salario base + bono por cumplimiento de objetivos',
      'Esquema híbrido: 3 días remoto, 2 días en oficina (Condesa)',
      'Horarios flexibles de entrada (8am-11am)',
      'Budget anual para conferencias de diseño',
      'MacBook Pro + pantalla externa 4K',
      'Viernes sociales y team building mensual',
      'Vales de despensa y fondo de ahorro'
    ],
    aboutCompany: 'DesignHub es un estudio boutique de diseño especializado en productos digitales. Hemos ayudado a más de 50 startups a lanzar y escalar sus productos. Somos un equipo pequeño (15 personas) pero muy talentoso, reconocido por Awwwards y otras plataformas de diseño.',
    companySize: '15 empleados',
    companyFunding: 'Bootstrapped / Rentable',
    companyIndustry: 'Diseño / Consultoría',
    process: [
      'Portfolio review y screening call (30 min)',
      'Presentación de caso de estudio (45 min)',
      'Design challenge colaborativo (2 horas)',
      'Coffee chat con el equipo'
    ],
    tags: ['Figma', 'UX Research', 'Design Systems', 'Prototyping'],
    urgent: false
  },
  {
    id: 3,
    title: 'Backend Engineer (Node.js)',
    company: 'DataFlow Technologies',
    logo: 'DF',
    location: 'CDMX - Polanco',
    salary: '$30,000 - $40,000 MXN',
    match: 82,
    applied: true,
    saved: true,
    type: 'Tiempo completo',
    modality: 'Presencial',
    experience: '3-5 años',
    posted: 'Hace 3 días',
    applicants: 45,
    description: 'Estamos construyendo la siguiente generación de herramientas de análisis de datos en tiempo real. Buscamos un backend engineer para diseñar y escalar sistemas que procesen millones de eventos por minuto. Nuestro stack es moderno y estamos abiertos a innovar con nuevas tecnologías.',
    responsibilities: [
      'Diseñar e implementar APIs RESTful y GraphQL de alto rendimiento',
      'Desarrollar microservicios escalables con Node.js, TypeScript y NestJS',
      'Optimizar queries de bases de datos y pipelines de procesamiento de datos',
      'Implementar sistemas de caching, queues y real-time processing',
      'Garantizar la seguridad, monitoring y observabilidad de los servicios',
      'Documentar APIs y contribuir a la arquitectura del sistema'
    ],
    requirements: [
      '4+ años de experiencia con Node.js en producción',
      'Expertise en TypeScript, Express/NestJS, y arquitecturas de microservicios',
      'Experiencia con PostgreSQL, MongoDB, Redis y message queues (RabbitMQ/Kafka)',
      'Conocimiento profundo de REST APIs, GraphQL y autenticación (JWT, OAuth)',
      'Experiencia con Docker, CI/CD y cloud providers (AWS/GCP)',
      'Mentalidad DevOps y experiencia con monitoring (DataDog, New Relic)'
    ],
    niceToHave: [
      'Experiencia con tecnologías de streaming (Kafka, Apache Flink)',
      'Conocimientos de arquitecturas event-driven',
      'Experiencia con Kubernetes y orquestación de contenedores',
      'Background en optimización de algoritmos y estructuras de datos'
    ],
    benefits: [
      'Salario muy competitivo ($30K-$40K) + bonos trimestrales',
      'Oficinas premium en Polanco con snacks y comida incluida',
      'Seguro de gastos médicos mayores para ti y tu familia',
      '20 días de vacaciones desde el primer año',
      'Presupuesto de $20K para setup de home office',
      'Clases de inglés in-company',
      'Programa de mentorship y growth path claro'
    ],
    aboutCompany: 'DataFlow es una empresa de tecnología en etapa de crecimiento con $10M USD en funding Serie A. Nuestros clientes incluyen Bancos, Fintechs y E-commerce líderes en LATAM. Equipo de 80 personas, 30% de ellos ingenieros. Cultura de innovación y aprendizaje continuo.',
    companySize: '80 empleados',
    companyFunding: 'Serie A — $10M USD',
    companyIndustry: 'Data Analytics / FinTech',
    process: [
      'Tech screening con recruiter (30 min)',
      'Coding challenge (sistema de diseño + implementación)',
      'System design interview (1 hora)',
      'Cultural fit con Tech Lead y CTO',
      'Oferta en 3-5 días hábiles'
    ],
    tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    urgent: false
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    logo: 'SX',
    location: 'Remoto - México',
    salary: '$22,000 - $32,000 MXN',
    match: 90,
    applied: false,
    saved: false,
    type: 'Tiempo completo',
    modality: 'Remoto',
    experience: '2-3 años',
    posted: 'Hace 1 día',
    applicants: 12,
    description: 'Startup early-stage (Serie A) buscando el miembro #5 del equipo tech. Oportunidad única de tener alto impacto y ownership sobre decisiones técnicas. Construirás features end-to-end que usarán miles de usuarios. Si buscas crecimiento acelerado y equity, esta posición es para ti.',
    responsibilities: [
      'Desarrollar features completas desde frontend hasta backend y base de datos',
      'Participar activamente en decisiones de arquitectura y elección de stack',
      'Colaborar directamente con founders en definición de roadmap de producto',
      'Escribir código limpio, testeado y documentado',
      'Ayudar a construir la cultura de ingeniería desde los primeros días',
      'Implementar analytics, A/B tests y métricas de producto'
    ],
    requirements: [
      '2+ años de experiencia full stack (no importa tanto el stack específico)',
      'Sólidos fundamentals en JavaScript/TypeScript tanto frontend como backend',
      'Experiencia con al menos un framework moderno (React, Vue, o similar)',
      'Conocimientos de bases de datos SQL y NoSQL',
      'Git, CI/CD básico, y deploy a producción',
      'Inglés intermedio-avanzado'
    ],
    niceToHave: [
      'Experiencia en startups o ambientes de rápido crecimiento',
      'Ownership de proyectos propios (side projects, open source)',
      'Versatilidad: capacidad de trabajar en mobile, infra, o lo que se necesite',
      'Actitud proactiva y ganas de aprender constantemente'
    ],
    benefits: [
      'Equity significativo (0.5-1.5% de la empresa)',
      '100% remoto con reuniones async-first',
      'Horarios ultra flexibles (resultados > horas)',
      'Budget ilimitado para herramientas y aprendizaje',
      'Retiros trimestrales del equipo (ya fuimos a Tulum y Oaxaca)',
      'Ambiente relajado, sin micromanagement'
    ],
    aboutCompany: 'StartupXYZ está revolucionando la educación financiera en LATAM. Tenemos $2M en funding, 5K usuarios activos creciendo 30% MoM. Equipo de 12 personas, súper talentoso y apasionado. Cultura remota-first con valores de transparencia y ownership.',
    companySize: '12 personas',
    companyFunding: 'Serie A — $2M USD',
    companyIndustry: 'EdTech / FinTech',
    process: [
      'Intro call con founder (30 min)',
      'Pair programming session (1 hora, ambiente relajado)',
      'Chat con 1-2 miembros del equipo',
      'Referencia check',
      'Offer call'
    ],
    tags: ['Full Stack', 'React', 'Node.js', 'Startup'],
    urgent: true
  },
  {
    id: 5,
    title: 'Product Designer',
    company: 'InnovateLab',
    logo: 'IL',
    location: 'Guadalajara',
    salary: '$23,000 - $33,000 MXN',
    match: 85,
    applied: false,
    saved: false,
    type: 'Tiempo completo',
    modality: 'Híbrido',
    experience: '2-4 años',
    posted: 'Hace 5 días',
    applicants: 38,
    description: 'Laboratorio de innovación dentro de empresa Fortune 500 mexicana. Diseñarás productos 0→1 que eventualmente se implementan a escala corporativa. Libertad creativa con respaldo de empresa establecida. Ambiente de startup con estabilidad de corporativo.',
    responsibilities: [
      'Liderar proyectos de diseño de producto desde concepto hasta MVP',
      'Facilitar workshops de design thinking con stakeholders',
      'Crear prototipos funcionales de alta fidelidad para validación',
      'Colaborar con equipos de desarrollo en implementación de diseños',
      'Presentar propuestas a nivel directivo y evangelizar diseño centrado en usuario',
      'Definir métricas de éxito y medir el impacto del diseño'
    ],
    requirements: [
      '3+ años diseñando productos digitales',
      'Portfolio que demuestre pensamiento estratégico y ejecución',
      'Expertise en Figma, Adobe Creative Suite',
      'Experiencia facilitando workshops y presentando a executives',
      'Metodologías de design thinking, lean UX, y design sprints',
      'Excelente comunicación visual y verbal'
    ],
    niceToHave: [
      'MBA o maestría en diseño/innovación',
      'Experiencia en consultoría o agencias',
      'Skills de ilustración o motion design',
      'Bilingüe (español-inglés)'
    ],
    benefits: [
      'Salario + prestaciones superiores a las de ley',
      'Híbrido flexible (oficinas en Zapopan)',
      'Fondo de ahorro 13%',
      'Seguro de gastos médicos mayores',
      'Aguinaldo de 30 días',
      'Capacitación y conferencias internacionales',
      'Ambiente de startup con estabilidad de corporativo'
    ],
    aboutCompany: 'InnovateLab es el brazo de innovación digital de un corporativo líder en México. Operamos como una startup dentro del corporativo: equipos pequeños, autonomía, y rápida experimentación. Hemos lanzado 15 productos en 3 años con impacto en millones de usuarios.',
    companySize: '25 personas (lab) / 10K+ (corporativo)',
    companyFunding: 'Corporativo',
    companyIndustry: 'Innovación / Enterprise',
    process: [
      'Screening + portfolio review',
      'Caso práctico de diseño (take-home)',
      'Presentación de caso ante panel',
      'Entrevista cultural con el equipo',
      'Validación de referencias'
    ],
    tags: ['Product Design', 'Figma', 'Design Thinking', 'UX'],
    urgent: false
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    logo: 'CT',
    location: 'Remoto (LATAM)',
    salary: '$28,000 - $38,000 MXN',
    match: 78,
    applied: false,
    saved: true,
    type: 'Tiempo completo',
    modality: 'Remoto',
    experience: '3-6 años',
    posted: 'Hace 4 días',
    applicants: 29,
    description: 'Empresa de consultoría cloud-native busca DevOps engineer para proyectos de clientes enterprise. Trabajarás con las últimas tecnologías en AWS/GCP/Azure ayudando a empresas a modernizar su infraestructura. Cada proyecto es diferente, lo que te permitirá crecer técnicamente de forma acelerada.',
    responsibilities: [
      'Diseñar y mantener infraestructura cloud usando IaC (Terraform, CloudFormation)',
      'Implementar y optimizar pipelines de CI/CD con GitHub Actions, GitLab CI, Jenkins',
      'Gestionar clusters de Kubernetes en producción',
      'Automatizar procesos de deployment, scaling, y monitoring',
      'Trabajar con equipos de desarrollo para mejorar prácticas DevOps',
      'Crear documentación técnica y runbooks para operaciones'
    ],
    requirements: [
      '4+ años de experiencia en roles de DevOps/SRE/Platform Engineering',
      'Expertise en al menos un cloud provider (AWS preferido)',
      'Experiencia sólida con Docker y Kubernetes',
      'Dominio de Terraform u otras herramientas de IaC',
      'Scripting en Bash, Python, o Go',
      'Conocimientos de networking, seguridad y observabilidad',
      'Inglés avanzado (trabajo con clientes US)'
    ],
    niceToHave: [
      'Certificaciones cloud (AWS Solutions Architect, CKA)',
      'Experiencia con service mesh (Istio, Linkerd)',
      'Background en desarrollo de software',
      'Experiencia en ambientes multi-cloud'
    ],
    benefits: [
      'Salario de $28K-$38K + bonos por proyecto completado',
      '100% remoto desde cualquier país de LATAM',
      'Certificaciones pagadas (AWS, Kubernetes, etc.)',
      'MacBook Pro + budget para equipamiento',
      'Días libres ilimitados (política de confianza)',
      'Exposición a proyectos enterprise de alto nivel',
      'Oportunidades de viajar a eventos tech internacionales'
    ],
    aboutCompany: 'CloudTech es una consultora especializada en transformación digital y migración a cloud. Nuestros clientes incluyen bancos, telecom, y retail enterprise. Equipo distribuido de 150 personas en 12 países de LATAM. Cultura de aprendizaje continuo y certificación constante.',
    companySize: '150 empleados',
    companyFunding: 'Rentable / Private',
    companyIndustry: 'Cloud Consulting / DevOps',
    process: [
      'Tech screening (arquitectura cloud y troubleshooting)',
      'Live coding/scripting session',
      'System design para infraestructura',
      'Cultural fit con el equipo',
      'Referencias técnicas'
    ],
    tags: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
    urgent: false
  },
  {
    id: 7,
    title: 'Mobile Developer (React Native)',
    company: 'FinFlow',
    logo: 'FF',
    location: 'Remoto - LATAM',
    salary: '$26,000 - $36,000 MXN',
    match: 87,
    applied: false,
    saved: false,
    type: 'Tiempo completo',
    modality: 'Remoto',
    experience: '2-4 años',
    posted: 'Hace 6 horas',
    applicants: 8,
    description: 'Fintech en rápido crecimiento busca un mobile developer para liderar el desarrollo de nuestra app bancaria usada por más de 200K usuarios. Buscamos alguien que combine excelencia técnica con sensibilidad por la experiencia del usuario en productos financieros.',
    responsibilities: [
      'Desarrollar y mantener la app móvil en React Native para iOS y Android',
      'Implementar flujos de pago, KYC y onboarding siguiendo estándares de seguridad',
      'Optimizar rendimiento de la app y reducir tiempos de carga',
      'Integrar SDKs de third-party (analytics, push notifications, biometrics)',
      'Colaborar con el equipo de diseño para crear experiencias mobile-first',
      'Participar en releases, testing y monitoring post-deployment'
    ],
    requirements: [
      '3+ años con React Native en producción (apps publicadas en stores)',
      'Experiencia con TypeScript, Redux/Zustand y React Navigation',
      'Conocimiento de APIs nativas de iOS y Android',
      'Experiencia con CI/CD mobile (Fastlane, App Center, EAS)',
      'Entendimiento de seguridad en apps financieras',
      'Inglés intermedio-avanzado'
    ],
    niceToHave: [
      'Experiencia en fintech o banca digital',
      'Conocimiento de Swift/Kotlin para módulos nativos',
      'Experiencia con testing E2E (Detox, Appium)',
      'Familiaridad con regulaciones financieras (PCI-DSS)'
    ],
    benefits: [
      'Salario competitivo + bonos por performance',
      '100% remoto con flexibilidad total de horario',
      'iPhone + Android device para testing',
      'Presupuesto de educación de $1.5K USD/año',
      'ESOP (Employee Stock Options)',
      'Seguro médico integral',
      '25 días de vacaciones'
    ],
    aboutCompany: 'FinFlow es una fintech mexicana que está democratizando el acceso a servicios financieros. Con más de 200K usuarios activos y $5M en transacciones mensuales, estamos creciendo 40% trimestral. Equipo de 45 personas con oficinas en CDMX pero 100% remote-friendly.',
    companySize: '45 empleados',
    companyFunding: 'Serie A — $8M USD',
    companyIndustry: 'FinTech / Banca Digital',
    process: [
      'Screening técnico (30 min)',
      'Reto técnico: mini-app en React Native (take-home, 4h)',
      'Code review del reto + entrevista técnica (1h)',
      'Entrevista cultural con Engineering Manager',
      'Oferta en 48 horas'
    ],
    tags: ['React Native', 'TypeScript', 'Mobile', 'FinTech'],
    urgent: true
  },
  {
    id: 8,
    title: 'Data Scientist / ML Engineer',
    company: 'NeuraLabs AI',
    logo: 'NL',
    location: 'Híbrido - Monterrey',
    salary: '$35,000 - $50,000 MXN',
    match: 72,
    applied: false,
    saved: false,
    type: 'Tiempo completo',
    modality: 'Híbrido',
    experience: '3-5 años',
    posted: 'Hace 3 días',
    applicants: 19,
    description: 'Laboratorio de inteligencia artificial aplicada busca un Data Scientist para desarrollar modelos de ML que resuelvan problemas reales en industria. Trabajarás en proyectos de NLP, Computer Vision y sistemas de recomendación para clientes enterprise en manufactura, retail y salud.',
    responsibilities: [
      'Desarrollar e iterar modelos de Machine Learning para producción',
      'Diseñar pipelines de datos end-to-end (ingesta, procesamiento, feature engineering)',
      'Realizar análisis exploratorio y comunicar insights a stakeholders no-técnicos',
      'Implementar experimentos A/B y evaluar métricas de modelos',
      'Colaborar con ingenieros de software para integrar modelos en productos',
      'Mantenerse actualizado en research y aplicar papers relevantes'
    ],
    requirements: [
      'Maestría en CS, Matemáticas, Estadística o campo relacionado',
      '3+ años de experiencia aplicando ML en producción',
      'Dominio de Python, scikit-learn, PyTorch/TensorFlow',
      'Experiencia con SQL, Pandas, y herramientas de visualización',
      'Conocimiento de MLOps (MLflow, Weights & Biases, etc.)',
      'Habilidad para comunicar resultados técnicos a audiencias no-técnicas'
    ],
    niceToHave: [
      'Publicaciones en conferencias top (NeurIPS, ICML, ACL)',
      'Experiencia con LLMs y prompt engineering',
      'Conocimientos de Spark/Databricks para big data',
      'Experiencia desplegando modelos en cloud (SageMaker, Vertex AI)'
    ],
    benefits: [
      'El salario más competitivo del mercado para ML en México',
      'Híbrido: 2 días en oficina (Monterrey) + 3 remoto',
      'GPU cluster dedicado para experimentación',
      'Presupuesto para conferencias internacionales',
      'Seguro de gastos médicos mayores premium',
      'Bono anual por performance + profit sharing',
      'Sabbatical de 1 mes cada 3 años'
    ],
    aboutCompany: 'NeuraLabs es un laboratorio de IA fundado por ex-investigadores de Google y MIT. Desarrollamos soluciones de ML aplicado para empresas líderes en México y LATAM. Equipo de 30 personas, 80% con maestría o doctorado. Ambiente de investigación con impacto comercial real.',
    companySize: '30 empleados',
    companyFunding: 'Serie B — $15M USD',
    companyIndustry: 'Inteligencia Artificial / ML',
    process: [
      'Screening técnico + revisión de portfolio/publicaciones',
      'Reto de ML (análisis de dataset + modelado, take-home)',
      'Presentación del reto + preguntas técnicas profundas',
      'Entrevista con co-founders',
      'Oferta en 1 semana'
    ],
    tags: ['Python', 'Machine Learning', 'PyTorch', 'NLP'],
    urgent: false
  }
];

const modalityOptions = ['Todos', 'Remoto', 'Híbrido', 'Presencial'];
const experienceOptions = ['Todos', '0-2 años', '2-4 años', '3-5 años', '3-6 años'];

export function OpportunitiesPage({ isDark }: OpportunitiesPageProps) {
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalityFilter, setModalityFilter] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set([2, 3]));
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set([1, 3, 6]));

  const border = isDark ? 'border-[#333]' : 'border-[#eaeaea]';
  const text = isDark ? 'text-white' : 'text-black';
  const textMuted = isDark ? 'text-[#888]' : 'text-[#666]';
  const textFaint = isDark ? 'text-[#555]' : 'text-[#999]';
  const hoverBg = isDark ? 'hover:bg-[#111]' : 'hover:bg-[#f5f5f5]';
  const cardBg = isDark ? 'bg-[#0a0a0a]' : 'bg-white';
  const inputBg = isDark ? 'bg-[#111]' : 'bg-[#fafafa]';

  const filteredOpportunities = opportunities.filter(job => {
    const matchesSearch = searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesModality = modalityFilter === 'Todos' || job.modality === modalityFilter;
    const matchesSaved = !savedOnly || savedJobs.has(job.id);
    return matchesSearch && matchesModality && matchesSaved;
  });

  const toggleSaved = (id: number) => {
    setSavedJobs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleApplied = (id: number) => {
    setAppliedJobs(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const getMatchColor = (match: number) => {
    if (match >= 90) return 'text-emerald-400';
    if (match >= 80) return 'text-purple-400';
    return isDark ? 'text-[#888]' : 'text-[#666]';
  };

  const getMatchBg = (match: number) => {
    if (match >= 90) return isDark ? 'bg-emerald-500/10' : 'bg-emerald-50';
    if (match >= 80) return isDark ? 'bg-purple-500/10' : 'bg-purple-50';
    return isDark ? 'bg-[#1a1a1a]' : 'bg-[#f5f5f5]';
  };

  if (selectedOpportunity !== null) {
    const job = opportunities.find(o => o.id === selectedOpportunity);
    if (!job) return null;
    const isApplied = appliedJobs.has(job.id);
    const isSaved = savedJobs.has(job.id);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedOpportunity(null)}
          className={`flex items-center gap-2 text-xs ${textMuted} ${hoverBg} px-2 py-1.5 rounded-md transition-colors -ml-2`}
        >
          <ArrowLeft className="w-3 h-3" />
          Volver a oportunidades
        </button>

        {/* Job Header Card */}
        <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${isDark ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#f0f0f0] text-[#666]'}`} style={{ fontFamily: 'monospace' }}>{job.logo}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className={`text-xl ${text} tracking-tight`}>{job.title}</h1>
                  {job.urgent && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Urgente
                    </span>
                  )}
                </div>
                <p className={`text-sm ${textMuted} mb-2`}>{job.company}</p>
                <div className={`flex flex-wrap items-center gap-3 text-xs ${textFaint}`}>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.type}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.posted}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {job.applicants} aplicantes</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleSaved(job.id)}
              className={`p-2 rounded-md transition-colors ${isSaved ? 'text-purple-500' : `${textFaint} ${hoverBg}`}`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {job.tags.map(tag => (
              <span key={tag} className={`px-2.5 py-1 rounded-md text-[10px] ${isDark ? 'bg-[#1a1a1a] text-[#aaa]' : 'bg-[#f0f0f0] text-[#555]'}`}>{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => !isApplied && toggleApplied(job.id)}
              className={`flex-1 px-4 py-2.5 rounded-md text-sm transition-colors ${isApplied ? `${isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}` : 'bg-purple-500 text-white hover:bg-purple-600'}`}
            >
              {isApplied ? '✓ Ya aplicaste' : 'Aplicar ahora'}
            </button>
            <div className={`px-4 py-2.5 rounded-md border ${border} flex items-center gap-2`}>
              <Sparkles className={`w-4 h-4 ${getMatchColor(job.match)}`} />
              <span className={`text-sm ${text}`}>{job.match}% match</span>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`p-4 rounded-lg border ${border} ${cardBg}`}>
            <DollarSign className={`w-4 h-4 ${textFaint} mb-2`} />
            <div className={`text-sm ${text} mb-0.5`}>{job.salary}</div>
            <div className={`text-[10px] ${textFaint}`}>Salario mensual</div>
          </div>
          <div className={`p-4 rounded-lg border ${border} ${cardBg}`}>
            <Building className={`w-4 h-4 ${textFaint} mb-2`} />
            <div className={`text-sm ${text} mb-0.5`}>{job.modality}</div>
            <div className={`text-[10px] ${textFaint}`}>Modalidad</div>
          </div>
          <div className={`p-4 rounded-lg border ${border} ${cardBg}`}>
            <TrendingUp className={`w-4 h-4 ${textFaint} mb-2`} />
            <div className={`text-sm ${text} mb-0.5`}>{job.experience}</div>
            <div className={`text-[10px] ${textFaint}`}>Experiencia requerida</div>
          </div>
        </div>

        {/* Description */}
        <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
          <h2 className={`text-sm ${text} mb-3`}>Descripción del puesto</h2>
          <p className={`text-xs ${textMuted} leading-relaxed`}>{job.description}</p>
        </div>

        {/* Responsibilities */}
        <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
          <h2 className={`text-sm ${text} mb-3`}>Responsabilidades</h2>
          <ul className="space-y-2">
            {job.responsibilities.map((resp, i) => (
              <li key={i} className={`flex items-start gap-2 text-xs ${textMuted}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
          <h2 className={`text-sm ${text} mb-3`}>Requisitos</h2>
          <ul className="space-y-2">
            {job.requirements.map((req, i) => (
              <li key={i} className={`flex items-start gap-2 text-xs ${textMuted}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-1.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nice to Have */}
        <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
          <h2 className={`text-sm ${text} mb-3`}>Deseable (Nice to have)</h2>
          <ul className="space-y-2">
            {job.niceToHave.map((item, i) => (
              <li key={i} className={`flex items-start gap-2 text-xs ${textMuted}`}>
                <Plus className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
          <h2 className={`text-sm ${text} mb-3`}>Beneficios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {job.benefits.map((benefit, i) => (
              <div key={i} className={`flex items-start gap-2 text-xs ${textMuted}`}>
                <Star className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* About Company */}
        <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
          <h2 className={`text-sm ${text} mb-3`}>Sobre la empresa</h2>
          <p className={`text-xs ${textMuted} leading-relaxed mb-4`}>{job.aboutCompany}</p>
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-md ${isDark ? 'bg-[#111]' : 'bg-[#f5f5f5]'}`}>
              <div className={`text-[10px] ${textFaint} mb-1`}>Tamaño</div>
              <div className={`text-xs ${text}`}>{job.companySize}</div>
            </div>
            <div className={`p-3 rounded-md ${isDark ? 'bg-[#111]' : 'bg-[#f5f5f5]'}`}>
              <div className={`text-[10px] ${textFaint} mb-1`}>Funding</div>
              <div className={`text-xs ${text}`}>{job.companyFunding}</div>
            </div>
            <div className={`p-3 rounded-md ${isDark ? 'bg-[#111]' : 'bg-[#f5f5f5]'}`}>
              <div className={`text-[10px] ${textFaint} mb-1`}>Industria</div>
              <div className={`text-xs ${text}`}>{job.companyIndustry}</div>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
          <h2 className={`text-sm ${text} mb-3`}>Proceso de selección</h2>
          <div className="space-y-3">
            {job.process.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                  {i + 1}
                </div>
                <span className={`text-xs ${textMuted} pt-1`}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className={`p-6 rounded-lg border ${border} ${cardBg} sticky bottom-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs ${text} mb-0.5`}>¿Interesado en esta posición?</p>
              <p className={`text-[10px] ${textFaint}`}>Envía tu aplicación en menos de 2 minutos</p>
            </div>
            <button
              onClick={() => !isApplied && toggleApplied(job.id)}
              className={`px-6 py-2.5 rounded-md text-sm transition-colors ${isApplied ? `${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}` : 'bg-purple-500 text-white hover:bg-purple-600'}`}
            >
              {isApplied ? '✓ Ya aplicaste' : 'Aplicar ahora'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className={`text-lg ${text} tracking-tight`}>Oportunidades</h1>
          <p className={`text-xs ${textMuted}`}>{filteredOpportunities.length} posiciones disponibles</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 flex-1 px-3 py-2.5 rounded-lg border ${border} ${inputBg} focus-within:border-purple-500/50 transition-colors`}>
            <Search className={`w-4 h-4 ${textFaint}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por puesto, empresa o tecnología..."
              className={`flex-1 text-xs bg-transparent ${text} placeholder:${textMuted} focus:outline-none`}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className={`p-0.5 rounded ${textFaint} hover:${text}`}>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-xs transition-colors ${showFilters ? 'border-purple-500/50 text-purple-400' : `${border} ${textMuted}`} ${hoverBg}`}
          >
            <Filter className="w-3.5 h-3.5" />
            Filtros
          </button>
          <button
            onClick={() => setSavedOnly(!savedOnly)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-xs transition-colors ${savedOnly ? 'border-purple-500/50 text-purple-400' : `${border} ${textMuted}`} ${hoverBg}`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            Guardados
          </button>
        </div>

        {/* Filter bar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <div className={`flex items-center gap-3 p-3 rounded-lg border ${border} ${cardBg}`}>
                <span className={`text-[10px] ${textFaint} flex-shrink-0`}>Modalidad:</span>
                <div className="flex items-center gap-1.5">
                  {modalityOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setModalityFilter(opt)}
                      className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${modalityFilter === opt
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        : `${isDark ? 'text-[#888]' : 'text-[#666]'} ${hoverBg}`
                        }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Opportunities list */}
      <div className="space-y-2">
        {filteredOpportunities.length === 0 ? (
          <div className={`p-12 text-center rounded-lg border ${border} ${cardBg}`}>
            <Search className={`w-8 h-8 mx-auto mb-3 ${textFaint}`} />
            <p className={`text-sm ${text} mb-1`}>No se encontraron oportunidades</p>
            <p className={`text-xs ${textMuted}`}>Intenta ajustar tus filtros o buscar otro término</p>
          </div>
        ) : (
          filteredOpportunities.map((job) => {
            const isApplied = appliedJobs.has(job.id);
            const isSaved = savedJobs.has(job.id);
            return (
              <div
                key={job.id}
                onClick={() => setSelectedOpportunity(job.id)}
                className={`p-4 rounded-lg border ${border} ${hoverBg} transition-all cursor-pointer group ${isDark ? 'hover:border-[#444]' : 'hover:border-[#ddd]'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-[11px] flex-shrink-0 ${isDark ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#f0f0f0] text-[#666]'}`} style={{ fontFamily: 'monospace' }}>{job.logo}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className={`text-sm ${text}`}>{job.title}</span>
                        <span className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded ${getMatchBg(job.match)} ${getMatchColor(job.match)}`}>{job.match}% match</span>
                        {job.urgent && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 flex items-center gap-0.5">
                            <Zap className="w-2.5 h-2.5" /> Urgente
                          </span>
                        )}
                        {isApplied && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Aplicado ✓</span>
                        )}
                      </div>
                      <span className={`text-xs ${textMuted}`}>{job.company}</span>
                      <div className={`flex items-center gap-3 mt-1.5 text-[10px] ${textFaint} flex-wrap`}>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.posted}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {job.applicants}</span>
                      </div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.tags.map(tag => (
                          <span key={tag} className={`px-1.5 py-0.5 rounded text-[9px] ${isDark ? 'bg-[#1a1a1a] text-[#777]' : 'bg-[#f0f0f0] text-[#888]'}`}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSaved(job.id); }}
                      className={`p-1.5 rounded-md transition-colors ${isSaved ? 'text-purple-500' : `${textFaint} ${hoverBg}`}`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); if (!isApplied) toggleApplied(job.id); }}
                      className={`px-3 py-1.5 rounded-md text-xs transition-colors ${isApplied ? `${isDark ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#f0f0f0] text-[#666]'}` : 'bg-purple-500 text-white hover:bg-purple-600'}`}
                    >
                      {isApplied ? 'Aplicado' : 'Aplicar'}
                    </button>
                    <ChevronRight className={`w-3.5 h-3.5 ${textFaint} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
